from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from config import SECRET_KEY
from auth.routes import auth_bp  
from flask_cors import CORS
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = SECRET_KEY
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)
@app.route("/")
def home():
    return "<h1>你已经正常打开,you open</h1>"

app.register_blueprint(auth_bp, url_prefix="/auth")


if __name__ == "__main__":
    app.run(debug=True)


