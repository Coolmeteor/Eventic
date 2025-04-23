from flask import Blueprint, send_file, request, jsonify
from flask_bcrypt import Bcrypt
import qrcode
import io
import hashlib
import psycopg2
import psycopg2.extras
from flask_jwt_extended import (
    verify_jwt_in_request, decode_token
)
from flask_jwt_extended.exceptions import NoAuthorizationError

from db.db_connect import get_db_connection
import traceback




ticket_bp = Blueprint("ticket", __name__)
bcrypt = Bcrypt()

@ticket_bp.route("/authorize-user-ticket/<int:ticket_id>", methods=["GET"])
def authroize_user_ticket(ticket_id):
    '''
        Check if the ticket is bought by the user trying to access ticket
        - Example request body
        {
            method: "GET",
            credentials: "include",
        }
    '''
    # Verify user using access token
    try:
        verify_jwt_in_request()
    except NoAuthorizationError:
        return jsonify({"error": 'Invalid access_token'})
    
    access_token = request.cookies.get("access_token")
    decoded_token = decode_token(access_token)
    identity = decoded_token["sub"]
    
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
            cursor.execute("SELECT * FROM users WHERE email = %s", (identity,))
            user = cursor.fetchone()
            
            if not user:
                return jsonify({"error": f"User not found"}), 404
            
            user_id = user["id"]
            
            query = """
                SELECT p.user_id
                FROM purchases p
                WHERE p.ticket_id = %s
            """
            cursor.execute(query, (ticket_id,))
            
            result = cursor.fetchone()
            
            if not result:
                return jsonify({"error": f'Ticket is invalid or missing.'}), 404
            
            right_user_id = result["user_id"]
            
            if right_user_id != user_id:
                return jsonify({"error": f'User is forbidden for this ticket'}), 403
            
    return jsonify({"message": "Ticket-User authorization successed"}), 200


@ticket_bp.route("/get-qr/<int:ticket_id>", methods=["GET"])
def gen_qr(ticket_id):
    '''
        Generate QR is user and ticket are linked.
        - Example request body
        {
            method: "GET",
            credentials: "include",
        }
    '''
    # Verify user using access token
    try:
        verify_jwt_in_request()
    except NoAuthorizationError:
        return jsonify({"error": 'Invalid access_token'}), 401
    
    access_token = request.cookies.get("access_token")
    decoded_token = decode_token(access_token)
    identity = decoded_token["sub"]
    
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
            cursor.execute("SELECT * FROM users WHERE email = %s", (identity,))
            user = cursor.fetchone()
            
            if not user:
                return jsonify({"error": f"User not found"}), 404
            
            user_id = user["id"]
            
            query = """
                SELECT p.user_id
                FROM purchases p
                WHERE p.ticket_id = %s
            """
            cursor.execute(query, (ticket_id,))
            
            result = cursor.fetchone()
            
            cursor.execute(
                "SELECT * FROM tickets WHERE id = %s",
                (ticket_id,)
            )
            
            ticket = cursor.fetchone()
            
            if not result:
                return jsonify({"error": f'Ticket is invalid or missing.'}), 404
            
            right_user_id = result["user_id"]
            
            if right_user_id != user_id:
                return jsonify({"error": f'User is forbidden for this ticket'}), 403
            
    # Make hashed id
    hashed_id = hashlib.sha256(str(ticket_id).encode()).hexdigest()
    short_hashed = hashed_id[:10]
    extra_hash = hashlib.sha256(str(ticket["event_id"]).encode()).hexdigest()
    extra_short_hash = extra_hash[:10]
    
    qr = qrcode.make(short_hashed + extra_short_hash)
    img_io = io.BytesIO()
    qr.save(img_io, "PNG")
    img_io.seek(0)
    
    return send_file(img_io, mimetype="image/png")

@ticket_bp.route("/validate", methods=["GET"])
def validate():
    '''
        Validate QR
        - Example url 
        ${API}/ticket/validate?qr={qr_value}&event_id={event_id}
        - Example request body
        {
            method: "GET",
            credentials: "include",
        }
        
    '''
    read_qr = request.args.get("qr")
    event_id = request.args.get("event_id")
    
    if event_id is None:
        return jsonify({"error": "Missing event_id"}), 400
    try:
        event_id = int(event_id)
    except ValueError:
        return jsonify({"error": "Invalid event_id"}), 400
    
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
                query = """
                    SELECT *
                    FROM tickets
                """
                cursor.execute(query)
                tickets = cursor.fetchall()
                
                for ticket in tickets:
                    # Generate hashed id to validate
                    valid_hashed_id = hashlib.sha256(str(ticket["id"]).encode()).hexdigest()
                    short_valid_hashed = valid_hashed_id[:10]
                    extra_hash = hashlib.sha256(str(ticket["event_id"]).encode()).hexdigest()
                    extra_short_hash = extra_hash[:10]
                    
                    hash = short_valid_hashed + extra_short_hash
                    
                    if hash == read_qr:
                        if event_id == ticket["event_id"]:
                            
                            cursor.execute(
                                "SELECT quantity FROM purchases WHERE ticket_id=%s",
                                (ticket["id"],)
                            )
                            result = cursor.fetchone()
                            quantity = result["quantity"] if result else None
                            
                            
                            return jsonify({
                                "message": "Ticket is valid",
                                "quantity": quantity
                            }) , 200
                        else:
                            return jsonify({
                                "error": "This ticket is not for chosen event",
                            }), 403
                # If there is no matching ticket id
                return jsonify({
                    "message": "Ticket is invalid.",
                }), 404
    except Exception as e:
        return jsonify({"error": f"Internal error: {str(e)}"}), 500
    
@ticket_bp.route("/get-event/<int:ticket_id>", methods=["GET"])
def get_event(ticket_id):
    '''
        Get event info using ticket id
        - Example request body
        {
            method: "GET",
        }
        or no body
    '''
    
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
                query = """
                    SELECT e.*
                    FROM events e
                    JOIN tickets t ON t.id = %s
                    WHERE t.event_id = e.id
                """
                
                cursor.execute(query, (ticket_id,))
                event = cursor.fetchone()
                
                if not event:
                    return jsonify({"error": "Event for the ticket not found"}), 404
                
                return jsonify({
                    "event": event,
                    "message": "Event fetched"
                }), 200
    except Exception as e:
        return jsonify({"error": f"Internal error: {str(e)}"}), 500
