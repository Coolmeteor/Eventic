from flask import Blueprint, request, jsonify, make_response
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    create_access_token, create_refresh_token,
    verify_jwt_in_request, decode_token,
    unset_jwt_cookies, set_access_cookies, set_refresh_cookies
)
from jwt import ExpiredSignatureError
from flask_jwt_extended.exceptions import NoAuthorizationError, CSRFError
import psycopg2.extras
from db.db_connect import get_db_connection
from exceptions import UserIdNotFoundFromTokenError

def get_orders_by_token(access_token):
    decoded_token = decode_token(access_token)
    identity = decoded_token["sub"]
    
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
            cursor.execute("SELECT * FROM users WHERE email = %s", (identity,))
            user = cursor.fetchone()
            if user:
                user_id = user["id"]
            else:
                raise UserIdNotFoundFromTokenError()
            
            data = get_orders_by_user_id(user_id, cursor)
            
    return data

            
            
            
def get_orders_by_user_id(user_id, cursor):
    query = """
        SELECT 
            p.*,
            t.*
        FROM purchases p
        JOIN tickets t ON p.ticket_id = t.id
        WHERE p.user_id = %s
        ORDER BY p.purchase_date DESC;
    """
    
    cursor.execute(query, (user_id,))
    
    results = cursor.fetchall()
    
    purchases = []
    tickets = []
    
    for row in results:
        purchases.append({
            "id": row["id"],
            "user_id": row["user_id"],
            "ticket_id": row["ticket_id"],
            "quantity": row["quantity"],
            "unit_price": row["unit_price"],
            "total_price": row["total_price"],
            "purchase_date": row["purchase_date"]
        })
        
        tickets.append({
            "id": row["id"],
            "event_id": row["event_id"],
            "is_valid": row["is_valid"],
            "created_at": row["created_at"]
        })
        
    
    return {
        "purchases": purchases, 
        "tickets": tickets,
        "message": 'Orders fetched successfully'
    }
    