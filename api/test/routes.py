from flask import Blueprint, send_file, request, jsonify
from flask_bcrypt import Bcrypt
import qrcode
import io
import hashlib
import psycopg2

from db.db_connect import get_db_connection


test_bp = Blueprint("test", __name__)
bcrypt = Bcrypt()

@test_bp.route("/ticket/gen-qr/<int:ticket_id>", methods=["GET"])
def gen_qr(ticket_id):
    # Make hashed id
    hashed_id = hashlib.sha256(str(ticket_id).encode()).hexdigest()
    short_hashed = hashed_id[:10]
    
    qr = qrcode.make(short_hashed)
    img_io = io.BytesIO()
    qr.save(img_io, "PNG")
    img_io.seek(0)
    
    return send_file(img_io, mimetype="image/png")

@test_bp.route("/ticket/validate", methods=["GET"])
def validate():
    read_qr = request.args.get("qr")
    
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
                query = """
                    SELECT ticket.id
                    FROM ticket
                """
                cursor.execute(query)
                tickets = cursor.fetchall()
                
                for ticket in tickets:
                    # Generate hashed id to validate
                    valid_hashed_id = hashlib.sha256(str(ticket.id).encode()).hexdigest()
                    short_valid_hashed = valid_hashed_id[:10]
                    if short_valid_hashed == read_qr:
                        return jsonify({
                            "message": "Ticket is valid",
                        }) , 200
                # If there is no matching ticket id
                return jsonify({
                    "message": "Ticket is invalid",
                }), 404
    except Exception as e:
        return jsonify({"error": f"Internal error: {str(e)}"}), 500