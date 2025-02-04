from flask import Flask
import bp_auth
import bp_event

app = Flask(__name__)
app.secret_key = b'dev'
app.register_blueprint(bp_auth.bp)
app.register_blueprint(bp_event.bp)

