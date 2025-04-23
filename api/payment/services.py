from flask import jsonify, request
from db.db_connect import get_db_connection 
from datetime import datetime, timedelta, timezone
import psycopg2.extras
from flask_jwt_extended import ( decode_token,)
from jwt import ExpiredSignatureError
from dateutil.relativedelta import relativedelta

def validate_token():
    """
    Validate an access token in cookie
    """
    access_token = request.cookies.get("access_token")
    
    if not access_token:
        print("Token Error")
        return {"error": "Missing access token", "code": 401}
    try:
        decoded_token = decode_token(access_token)
        identity = decoded_token["sub"]
        return {"identity": identity, "code": 200}
        
    
    except ExpiredSignatureError as e:
        return {"error": 'Signiture has expired', "code": 401}
    except Exception as e:
        return {"error": f'JWT Error: {str(e)}', "code": 401}
    
def get_user_id(identity):
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
            query = """
                SELECT *
                FROM users
                WHERE email = %s
            """
            
            cursor.execute(query, (identity,))
            user = cursor.fetchone()
            
            if not user:
                return {
                    "error": "User not found",
                    "code": 404
                }
            
            user_id = user["id"]
            
            return {
                "user_id": user_id,
                "code": 200,
            }