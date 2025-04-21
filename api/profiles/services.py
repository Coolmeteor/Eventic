from flask_jwt_extended import (
    decode_token
)
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
    
    
def get_upcoming_orders_by_token(access_token):
    
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
            
            data = get_upcoming_orders_by_user_id(user_id, cursor)
            
    return data


def get_upcoming_orders_by_user_id(user_id, cursor):
    query = """
        SELECT 
            p.*,
            t.*
        FROM purchases p
        JOIN tickets t ON p.ticket_id = t.id
        JOIN events e ON t.event_id = e.id
        WHERE p.user_id = %s
            AND e.start_date >= CURRENT_DATE
            AND e.start_date <= CURRENT_DATE + INTERVAL '1 month'
        ORDER BY e.start_date ASC;
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