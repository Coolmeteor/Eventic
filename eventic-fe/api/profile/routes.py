from flask import Blueprint, request, jsonify, make_response
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, decode_token
import psycopg2.extras
from db.db_connect import get_test_connection

profile_bp = Blueprint("profile", __name__)
bcrypt = Bcrypt()
    
# This is just to create a localStorage for debugging
# Not necessarry for the actual server API
@profile_bp.route("/testUser", methods=["POST"])
def get_test_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    if not email or not password:
        return jsonify({"error": "Empty"}), 400
    
    try:
        with get_test_connection() as conn:
            with conn.cursor() as cursor:
                cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
                cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
                user = cursor.fetchone()
    except Exception as e:
        return jsonify({"error": f"Error: {str(e)}"})
    
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
        return jsonify({"error": "email or password is wrong"}), 401

# Load the corresponding user when the profile page read
@profile_bp.route("/authorization", methods=["GET"])
def authorization():
    access_token = request.cookies.get("access_token")
    
    if not access_token:
        print("Token Error")
        return jsonify({"error": "Missing access token"}), 401
    
    try:
        decoded_token = decode_token(access_token)
        identity = decoded_token["sub"]
        
        with get_test_connection() as conn:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
                cursor.execute("SELECT * FROM users WHERE email = %s", (identity,))
                user = cursor.fetchone()

    except Exception as e:
        return jsonify({"error": f'JWT Error: {str(e)}'}), 401
    
    if user:
        return jsonify({"user": user}), 200
    else:
        return jsonify({"error": "User not found"}), 404

# Change the user_name
@profile_bp.route("/change-username", methods=["PATCH"])
def change_name():
    data = request.get_json()
    new_name = data.get("user_name")
    
    if not new_name:
        return jsonify({"error": "New username is needed"}), 400
    
    access_token = request.cookies.get("access_token")
    
    if not access_token:
        return jsonify({"error": "Missing access token"}), 401
    
    try:
        decoded_token = decode_token(access_token)
        identity = decoded_token["sub"]
        
        
        with get_test_connection() as conn:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
                
                cursor.execute("SELECT * FROM users WHERE email = %s", (identity,))
                user = cursor.fetchone()
                
                if user["user_name"] == new_name:
                    return ({"error": f"You tried the same name"}), 400
                
                update_query = """
                    UPDATE users
                    SET user_name = %s
                    WHERE email = %s
                """
                cursor.execute(update_query, (new_name, identity))
                conn.commit()
                
                # Re-fetch altered user
                cursor.execute("SELECT * FROM users WHERE email = %s FOR UPDATE", (identity,))
                user = cursor.fetchone()
                
                
        return jsonify({
            "message": "Username is updated",
            "user": user
        }), 200
    
    except Exception as e:
        return jsonify({"error": f"Username update error: {str(e)}"}), 500

# Change the password
@profile_bp.route("/change-password", methods=["PATCH"])
def change_password():
    data = request.get_json()
    current_pass = data.get("current_password")
    new_pass = data.get("new_password")
    
    if not new_pass or not current_pass:
        return jsonify({"error": "New password and current password are needed"}), 400
    
    # Get the access_token from the sent cookie
    access_token = request.cookies.get("access_token")
    
    # Authorize the current userpassword first and then update 
    try:
        
        decoded_token = decode_token(access_token)
        identity = decoded_token["sub"]
    
        with get_test_connection() as conn:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
                cursor.execute("SELECT * FROM users WHERE email = %s", (identity,))
                user = cursor.fetchone()
                
                if not user:
                    return jsonify({"error": f"User not found"}), 404

                if not bcrypt.check_password_hash(user["passwd_hash"], current_pass):
                    return jsonify({"error": "Password is not correct"}), 400
                
                if new_pass == current_pass:
                    return jsonify({"error": "Current password and new password are identical"}), 400
                
                hashed_pass = bcrypt.generate_password_hash(new_pass).decode("utf-8")
                # Change password
                update_query = """
                    UPDATE users
                    SET passwd_hash = %s
                    WHERE email = %s
                """
                cursor.execute(update_query, (hashed_pass, identity))
                conn.commit()
                
                cursor.execute("SELECT * FROM users WHERE email = %s FOR UPDATE", (identity,))
                user = cursor.fetchone()
                        
        # Recreate token for security
        access_token = create_access_token(identity=user["email"])
        
        # Apply new access_token to httpOnly cookie
        response = make_response(
            jsonify({
                "message": "Password is updated",
                "user": user
            }), 200
        )
        response.set_cookie("access_token", access_token, httponly=True, secure=True, samesite="Strict")
        
        return response
                    
    except Exception as e:
        return jsonify({"error": f"Password update error: {str(e)}"}), 500

# Change email
@profile_bp.route("/change-email", methods=["PATCH"])
def change_email():
    data = request.get_json()
    password = data.get("password")
    new_email = data.get("new_email")
    
    if not password or not new_email:
        return jsonify({"error": "Information needed"}), 400
    
    # Get the access_token from the sent cookie
    access_token = request.cookies.get("access_token")
    
    # Authorize the current userpassword first and then update 
    try:
        
        decoded_token = decode_token(access_token)
        identity = decoded_token["sub"]
    
        with get_test_connection() as conn:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
                cursor.execute("SELECT * FROM users WHERE email = %s", (identity,))
                user = cursor.fetchone()
                
                if not user:
                    return jsonify({"error": f"User not found"}), 404
                
                if not bcrypt.check_password_hash(user["passwd_hash"], password):
                    return jsonify({"error": "Password is not correct"}), 400
                
                # Change email
                update_query = """
                    UPDATE users
                    SET email = %s
                    WHERE email = %s
                """
                cursor.execute(update_query, (new_email, identity))
                conn.commit()
                
                cursor.execute("SELECT * FROM users WHERE id = %s FOR UPDATE", (user["id"],))
                user = cursor.fetchone()
                        
        # Return new JWT token and user for security
        access_token = create_access_token(identity=user["email"])
        
        # Apply new access_token to httpOnly cookie
        response = make_response(
            jsonify({
                "message": "Password is updated",
                "user": user
            }), 200
        )
        response.set_cookie("access_token", access_token, httponly=True, secure=True, samesite="Strict")
        
        return response
                    
    except Exception as e:
        return jsonify({"error": f"Password update error: {str(e)}"}), 500
    
# Change phone
@profile_bp.route("/change-phone", methods=["PATCH"])
def change_phone():
    data = request.get_json()
    password = data.get("password")
    new_phone = data.get("new_phone")
    
    if not password or not new_phone:
        return jsonify({"error": "Information needed"}), 400
    
    # Get the access_token from the sent cookie
    access_token = request.cookies.get("access_token")
    
    # Authorize the current userpassword first and then update 
    try:
        
        decoded_token = decode_token(access_token)
        identity = decoded_token["sub"]
    
        with get_test_connection() as conn:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
                cursor.execute("SELECT * FROM users WHERE email = %s", (identity,))
                user = cursor.fetchone()
                
                if not user:
                    return jsonify({"error": f"User not found"}), 404
                
                if not bcrypt.check_password_hash(user["passwd_hash"], password):
                    return jsonify({"error": "Password is not correct"}), 400
                
                # Change email
                update_query = """
                    UPDATE users
                    SET phone = %s
                    WHERE email = %s
                """
                cursor.execute(update_query, (new_phone, identity))
                conn.commit()
                
                cursor.execute("SELECT * FROM users WHERE email = %s FOR UPDATE", (identity,))
                user = cursor.fetchone()
                        
        # Return new JWT token and user for security
        access_token = create_access_token(identity=user["email"])
        
        # Apply new access_token to httpOnly cookie
        response = make_response(
            jsonify({
                "message": "Phone number is updated",
                "user": user
            }), 200
        )
        response.set_cookie("access_token", access_token, httponly=True, secure=True, samesite="Strict")
        
        return response
                    
    except Exception as e:
        return jsonify({"error": f"Phone number update error: {str(e)}"}), 500
    