from flask import Flask
import auth


app = Flask(__name__)
if __name__ == '__main__':
    app.run(debug=True)
app.secret_key = b'dev'
app.register_blueprint(auth.bp)

