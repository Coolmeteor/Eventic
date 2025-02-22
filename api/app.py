from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from config import SECRET_KEY
from profile.routes import profile_bp
from auth.routes import auth_bp  
from flask_cors import CORS
from datetime import timedelta


app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = SECRET_KEY
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30) # flask default is 30 days
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=15) # flask default is 15 minutes
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app, supports_credentials=True)
@app.route("/")
def home():
    return "<h1>你已经正常打开,you open</h1>"

app.register_blueprint(profile_bp, url_prefix="/profile")
app.register_blueprint(auth_bp, url_prefix="/auth")


if __name__ == "__main__":
    app.run(debug=True)


