from flask import Flask
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.secret_key = b'dev'
jwt = JWTManager(app)