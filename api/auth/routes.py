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


auth_bp = Blueprint("auth", __name__)
bcrypt = Bcrypt()
@auth_bp.route("/test", methods=["GET"])
def test():
    """_summary_
        To test the connection between the backend and frontend.
    Returns:
        The list of users in html format
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, user_name, email, phone, date_of_birth, sex FROM users")
        users = cursor.fetchall()
        conn.close()

        
        html_content = "<h2>user list</h2><table border='1'><tr><th>ID</th><th>user name</th><th>Email</th><th>phone</th><th>birthday</th><th>F/M</th></tr>"
        for user in users:
            html_content += f"<tr><td>{user[0]}</td><td>{user[1]}</td><td>{user[2]}</td><td>{user[3]}</td><td>{user[4]}</td><td>{user[5]}</td></tr>"
        html_content += "</table>"

        return html_content
    except Exception as e:
        return f"<h3>database wrong: {str(e)}</h3>"



@auth_bp.route("/register", methods=["POST"])
def register():
    """_summary_
        Insert new user of the send information to the database.
    Returns:
        Jsonifyied message with cookie
    """
    data = request.get_json()
    user_name = data.get("user_name")
    email = data.get("email")
    phone = data.get("phone", None)  # 默认为 None
    date_of_birth = data.get("date_of_birth", None)  # 默认为 None
    sex = data.get("sex", None)  # 默认为 None
    password = data.get("password")
    is_org = data.get("is_org")

    
    if not user_name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    passwd_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
                existing_user = cursor.fetchone()
                if existing_user:
                    return jsonify({"error": "Email already in use"}), 409

                
                cursor.execute(
                    """
                    INSERT INTO users (user_name, email, passwd_hash, phone, date_of_birth, sex, is_org) 
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    """,
                    (user_name, email, passwd_hash, phone, date_of_birth, sex, is_org)
                )
                conn.commit()
        
        # Create both access_token and refresh_token
        access_token = create_access_token(identity=email)
        refresh_token = create_refresh_token(identity=email)
        
        response = make_response(jsonify({"message": "Registration success"}), 201)
        
        # Set both tokens in cookie
        set_access_cookies(response, access_token)
        set_refresh_cookies(response, refresh_token)
        
        return response
    except Exception as e:
        return jsonify({"error": f"Internal error: {str(e)}"}), 500


@auth_bp.route("/login", methods=["POST"])
def login():
    """_summary_
        Authorize with the send email and password.
    Returns:
        Jsonified message and user data with cookie.
    """
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
                    # Create tokens
                    access_token = create_access_token(identity=email)
                    refresh_token = create_refresh_token(identity=email)
                    
                    response = make_response(
                        jsonify({
                            "message": "Successfully logged in",
                            "user": user
                        }), 200
                    )
                    
                    # Set cookies
                    set_access_cookies(response, access_token)
                    set_refresh_cookies(response, refresh_token)
                    
                    return response

                else:
                    return jsonify({"error": "Email or password wrong"}), 401
    except Exception as e:
        return jsonify({"error": f'Internal error: {str(e)}'}), 500
    

@auth_bp.route("/logout", methods=["POST"])
def logout():
    """_summary_
        Log out by deleting access_token and refresh_token in cookie
    Returns:
        Jsonified message and cookie to disable the tokens stored in the browser
    """
    response = make_response(jsonify({"message": "Logged out seccessfully"}), 200)
    
    unset_jwt_cookies(response)
    
    return response

@auth_bp.route("/refresh", methods=["POST"])
def refresh():
    """_summary_
        Using refresh_token, create a new access token.
        Ideally, I want to store one refresh token for each user to virtualy disable the used refresh token.
        In the current implementation, once the refresh token is stolen, the attacker can keep accessing with the refresh token.
    Returns:
        Jsonifyed message with cookie of new tokens
    """
    refresh_token = request.cookies.get("refresh_token")
    
    if not refresh_token:
        return jsonify({"error": "Missing refresh token"}), 401
    
    try:
        # Verify refresh token and obtain identity key
        verify_jwt_in_request(refresh=True)
        decoded_token = decode_token(refresh_token)
        identity = decoded_token["sub"]
        
        # Create new access token
        new_access_token = create_access_token(identity=identity)
        
        response = make_response(jsonify({"message": "Token refreshed"}), 200)
        set_access_cookies(response, new_access_token)

        return response
    except NoAuthorizationError:
        return jsonify({"error": 'Invalid refresh token.'}), 401
    except ExpiredSignatureError as e:
        return jsonify({"error": f'Signiture has expired'}), 401
    except Exception as e:
        return jsonify({"error": f'Internal error: {str(e)}'}), 500
    
@auth_bp.route("/check-auth", methods=["POST"])
def check_auth():
    """_summary_
        Check the authorization status using access_token and refresh_token.
    Returns:
        _type_: _description_
    """
    try:
        # Verify access token first and obtain identity key if it's available
        verify_jwt_in_request() # Verify only access_token, not refresh_token
        
        response = make_response(   # Store in response for future modifications just in case
            jsonify({"message": "Login status: Logged in"}), 200
        )
        
        return response
    except (ExpiredSignatureError, CSRFError): # Exception raised when access token has expired
        try:
            # Verify refresh token and re-create access token if it's verified
            verify_jwt_in_request(refresh=True)
            
            refresh_token = request.cookies.get("refresh_token")
            if not refresh_token:
                return jsonify({"error": "Missing refresh token"}), 401
            
            
            decoded_token = decode_token(refresh_token)
            identity = decoded_token["sub"]
            
            new_access_token = create_access_token(identity=identity)
            
            response = make_response(
                jsonify({"message": "Login status: Logged in. New access_token created."}), 200
            )
            set_access_cookies(response, new_access_token)
            
            return response
        except CSRFError:
            return jsonify({"error": 'CSRF token mismatch (refresh)'}), 403
        except NoAuthorizationError:
            return jsonify({"error": 'Invalid refresh token.'}), 401
        except ExpiredSignatureError as refresh_ese:
            return jsonify({"error": f'Signiture of both token has expired'}), 401
        except Exception as e:
            return jsonify({"error": f'Internal error: {str(e)}'}), 500
        
