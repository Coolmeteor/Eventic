from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
import psycopg2.extras
from db.db_connect import get_db_connection

# 初始化蓝图 & Bcrypt
auth_bp = Blueprint("auth", __name__)
bcrypt = Bcrypt()
@auth_bp.route("/test", methods=["GET"])
def test():
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


# 📌 用户注册 API
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    user_name = data.get("user_name")
    email = data.get("email")
    phone = data.get("phone", None)  # 默认为 None
    date_of_birth = data.get("date_of_birth", None)  # 默认为 None
    sex = data.get("sex", None)  # 默认为 None
    password = data.get("password")

    # 校验字段是否为空
    if not user_name or not email or not password:
        return jsonify({"error": "所有字段都必须填写"}), 400

    passwd_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
          # 🔹 先检查数据库是否已有相同的用户名或邮箱
        cursor.execute("SELECT * FROM users WHERE user_name = %s OR email = %s", (user_name, email))
        existing_user = cursor.fetchone()
        if existing_user:
            return jsonify({"error": "用户名或邮箱已存在，请换一个"}), 409

        # 🔹 如果没有重复数据，插入用户
        cursor.execute(
            """
            INSERT INTO users (user_name, email, passwd_hash, phone, date_of_birth, sex) 
            VALUES (%s, %s, %s, %s, %s, %s)
            """,
            (user_name, email, passwd_hash, phone, date_of_birth, sex)
        )
        conn.commit()
        return jsonify({"message": "注册成功"}), 201
    except Exception as e:
        return jsonify({"error": f"数据库错误: {str(e)}"}), 500
    finally:
        conn.close()

# 📌 用户登录 API
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "cant empty"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    if user and bcrypt.check_password_hash(user["passwd_hash"], password):
        access_token = create_access_token(identity=email)
        return jsonify({
            "message": "登录成功",
            "access_token": access_token,
            "user": {
                "id": user["id"],
                "user_name": user["user_name"],
                "email": user["email"],
                "phone": user["phone"],
                "date_of_birth": str(user["date_of_birth"]),
                "sex": user["sex"]
            }
        }), 200
    else:
        return jsonify({"error": "email or pasw wrong"}), 401
