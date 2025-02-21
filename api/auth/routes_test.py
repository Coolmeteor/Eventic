from flask import Blueprint, request, jsonify, make_response
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, decode_token
import psycopg2.extras
from db.db_connect import get_db_connection

auth_t_bp = Blueprint("auth_t", __name__)
bcrypt = Bcrypt()

@auth_t_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    if not email or not password:
        return jsonify({"error": "Information needed"}), 400
    
    try:        
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
                cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
                user = cursor.fetchone()
                
                if user and bcrypt.check_password_hash(user["passwd_hash"], password):
                    access_token = create_access_token(identity=email)
                    response = make_response(
                        jsonify({
                            "message": "Successfully logged in",
                            "user": user
                        }), 200
                    )
                    response.set_cookie("access_token", access_token, httponly=True, secure=True, samesite="Strict")
                    
                    return response

                else:
                    return jsonify({"error": "email or password wrong"}), 401
    except Exception as e:
        return jsonify({"error": f'Error: {str(e)}'}), 500
    

@auth_t_bp.route("/logout", methods=["POST"])
def logout():
    response = make_response(jsonify({"message": "Logged out seccessfully"}), 200)
    
    response.set_cookie("access_token", "", httponly=True, secure=True, samesite="Strict", max_age=0)

    return response
    