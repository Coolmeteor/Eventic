from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from config import SECRET_KEY
from profiles.routes import profile_bp
from auth.routes import auth_bp  
from event.routes import event_bp
from ticket.routes import ticket_bp
from payment.routes import payment_bp
from event.statsroutes import stats_bp
from flask_cors import CORS
from datetime import timedelta

##################################################################################
from test.routes import test_bp # For test. Must be deleted when release
##################################################################################

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = SECRET_KEY
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30) # flask default is 30 days
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=15) # flask default is 15 minutes
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]  # Check tokens in Cookies
app.config["JWT_COOKIE_SECURE"] = True  # Cookies sent and received via https connection
app.config["JWT_COOKIE_CSRF_PROTECT"] = True    # Enable CSRF protection
app.config["JWT_ACCESS_COOKIE_NAME"] = "access_token"   # Re-define the default name of access token in Cookies
app.config["JWT_REFRESH_COOKIE_NAME"] = "refresh_token" # Re-define the default name of refresh token in Cookies
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app, supports_credentials=True)
@app.route("/")
def home():
    return "<h1>你已经正常打开,you open</h1>"

app.register_blueprint(profile_bp, url_prefix="/profile")
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(event_bp, url_prefix="/event")
app.register_blueprint(stats_bp, url_prefix="/stats")
app.register_blueprint(ticket_bp, url_prefix="/ticket")
app.register_blueprint(payment_bp, url_prefix="/payment")

##################################################################################
app.register_blueprint(test_bp, url_prefix="") # Must be deleted when release
##################################################################################


if __name__ == "__main__":
    app.run(debug=True)


