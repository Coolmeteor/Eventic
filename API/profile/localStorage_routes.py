# from flask import Blueprint, request, jsonify, make_response
# from flask_bcrypt import Bcrypt
# from flask_jwt_extended import create_access_token, jwt_required, decode_token
# import psycopg2.extras
# from db.db_connect import get_test_connection

# profile_bp = Blueprint("profile", __name__)
# bcrypt = Bcrypt()
    
# # This is just to create a localStorage for debugging
# # Not necessarry for 
# @profile_bp.route("/testUser", methods=["POST"])
# def get_test_user():
#     data = request.get_json()
#     email = data.get("email")
#     password = data.get("password")
    
#     if not email or not password:
#         return jsonify({"error": "Empty"}), 400
    
#     try:
#         with get_test_connection() as conn:
#             with conn.cursor() as cursor:
#                 cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
#                 cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
#                 user = cursor.fetchone()
#     except Exception as e:
#         return jsonify({"error": f"Error: {str(e)}"})
    
#     if user and bcrypt.check_password_hash(user["passwd_hash"], password):
#         access_token = create_access_token(identity=email)
#         return jsonify({
#             "message": "Succesfully logged in",
#             "access_token": access_token,
#             "user": user
#         }), 200
#     else:
#         return jsonify({"error": "email or pasw wrong"}), 401


# # Load the corresponding user when the profile page read
# @profile_bp.route("/authorization", methods=["GET"])
# @jwt_required()
# def profile():
#     identity = get_jwt_identity()
#     try:
#         with get_test_connection() as conn:
#             with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
#                 cursor.execute("SELECT * FROM users WHERE email = %s", (identity,))
#                 user = cursor.fetchone()
#     except Exception as e:
#         print(f'JWT Error: {str(e)}')
#         return jsonify({"error": f"Error: {str(e)}"}), 500
    
#     if user:
#         return jsonify({"user": user}), 200
#     else:
#         return jsonify({"error": "User not found"}), 404




# @profile_bp.route("/change-username", methods=["PATCH"])
# @jwt_required()
# def change_name():
#     data = request.get_json()
#     new_name = data.get("user_name")
    
#     if not new_name:
#         return jsonify({"error": "New username is needed"}), 400
    
#     identity = get_jwt_identity()
    
#     try:
#         with get_test_connection() as conn:
#             with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
                
#                 cursor.execute("SELECT * FROM users WHERE email = %s", (identity,))
#                 user = cursor.fetchone()
                
#                 if user["user_name"] == new_name:
#                     return ({"error": f"You tried the same name"}), 400
                
#                 update_query = """
#                     UPDATE users
#                     SET user_name = %s
#                     WHERE email = %s
#                 """
#                 cursor.execute(update_query, (new_name, identity))
#                 conn.commit()
                
#                 # Re-fetch altered user
#                 cursor.execute("SELECT * FROM users WHERE email = %s FOR UPDATE", (identity,))
#                 user = cursor.fetchone()
                
                
#         return jsonify({
#             "message": "Username is updated",
#             "user": user
#         }), 200
    
#     except Exception as e:
#         return jsonify({"error": f"Username update error: {str(e)}"}), 500
    


    
# @profile_bp.route("/change-password", methods=["PATCH"])
# @jwt_required()
# def change_password():
#     data = request.get_json()
#     current_pass = data.get("current_password")
#     new_pass = data.get("new_password")
    
#     if not new_pass or not current_pass:
#         return jsonify({"error": "New password and current password are needed"}), 400
    
#     identity = get_jwt_identity()
    
#     # Authorize the current userpassword first and then update 
#     try:
#         with get_test_connection() as conn:
#             with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
#                 cursor.execute("SELECT * FROM users WHERE email = %s", (identity,))
#                 user = cursor.fetchone()
                
#                 if user:
#                     if bcrypt.check_password_hash(user["passwd_hash"], current_pass):
#                         if new_pass == current_pass:
#                             return jsonify({"error": "Current password and new password is identical"}), 400
#                         hashed_pass = bcrypt.generate_password_hash(new_pass).decode("utf-8")
#                         # Change password
#                         with get_test_connection() as conn:
#                             with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
#                                 update_query = """
#                                     UPDATE users
#                                     SET passwd_hash = %s
#                                     WHERE email = %s
#                                 """
#                                 cursor.execute(update_query, (hashed_pass, identity))
#                                 conn.commit()
                                
#                                 cursor.execute("SELECT * FROM users WHERE email = %s FOR UPDATE", (identity,))
#                                 user = cursor.fetchone()
                                
#                         # Return new JWT token and user for security
#                         access_token = create_access_token(identity=user["email"])
#                         return jsonify({
#                             "message": "Password is updated",
#                             "access_token": access_token,
#                             "user": user
#                         }), 200
#                     else:
#                         return jsonify({"error": "Password is not correct"}), 500
#                 else:
#                     return jsonify({"error": f"User not found"}), 500
    
#     except Exception as e:
#         return jsonify({"error": f"Password update error: {str(e)}"}), 500
    

# @profile_bp.route("/change-email", methods=["PATCH"])
# @jwt_required()
# def change_email():
#     data = request.get_json()
#     new_email = data.get("new_email")
#     password = data.get("password")
    
#     if not new_email or not password:
#         return jsonify({"error": "New email is needed"}), 400
    
#     identity = get_jwt_identity()
    
#     try:
#         with get_test_connection() as conn:
#             with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
                
#                 cursor.execute("SELECT * FROM users WHERE email = %s", (identity,))
#                 user = cursor.fetchone()
#                 if bcrypt.check_password_hash(user["passwd_hash"], password):
#                     if user["email"] == new_email:
#                         return ({"error": f"You tried the same email"}), 400
                    
#                     update_query = """
#                         UPDATE users
#                         SET email = %s
#                         WHERE email = %s
#                     """
#                     cursor.execute(update_query, (new_email, identity))
#                     conn.commit()
                    
#                     # Re-fetch altered user
#                     cursor.execute("SELECT * FROM users WHERE id = %s FOR UPDATE", (user["id"],))
#                     user = cursor.fetchone()
#                 else:
#                     return ({"error": f"Password is not correct"}), 400
                
                
#         # Recreate a JWT token for security
#         access_token = create_access_token(identity=user["email"])
#         return jsonify({
#             "message": "Email is updated",
#             "access_token": access_token,
#             "user": user
#         }), 200
    
#     except Exception as e:
#         return jsonify({"error": f"Email update error: {str(e)}"}), 500
    
