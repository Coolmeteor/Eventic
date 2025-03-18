from flask import Blueprint, send_file
from flask_bcrypt import Bcrypt
import qrcode
import io


test_bp = Blueprint("test", __name__)
bcrypt = Bcrypt()

@test_bp.route("/get-qr", methods=["GET"])
def get_qr():
    qr = qrcode.make("example_qr_code")
    img_io = io.BytesIO()
    qr.save(img_io, "PNG")
    img_io.seek(0)
    
    return send_file(img_io, mimetype="image/png")