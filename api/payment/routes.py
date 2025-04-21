from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from db.db_connect import get_db_connection
import psycopg2.extras
from .services import *

payment_bp = Blueprint("payment", __name__)

# Save payment function, exposed as an API endpoint
@payment_bp.route("/create-payment", methods=["POST"])
def save_payment_route():
    data = request.get_json()
    
    res = validate_token()
    if(res["code"] != 200):
        return jsonify(res), res["code"]
    identity = res["identity"]
    
    # Fetch user_id from access_token
    id = get_user_id(identity)
    if(id["code"] != 200):
        return jsonify(id), id["code"]
    user_id = id["user_id"]
    
    ticket_id = data.get("ticket_id")
    
    if not user_id or not ticket_id:
        return jsonify({"error": "User ID and ticket ID are required"}), 400
    
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
                sql = 'INSERT INTO payments (user_id, ticket_id) VALUES (%s, %s) RETURNING id'
                cursor.execute(sql, (user_id, ticket_id))
                last_row_id = cursor.fetchone()["id"]
                conn.commit()

                # search saved data
                cursor.execute("SELECT * FROM payments WHERE id = %s", (last_row_id,))
                row = cursor.fetchone()

        return jsonify({
            "message": "Payment saved successfully",
            "payment": row
        }), 201

    except Exception as e:
        return jsonify({"error": f"Error saving payment: {str(e)}"}), 500

# Get payment info by ID
@payment_bp.route("/get-payment-info/<int:id>", methods=["GET"])
@jwt_required()
def get_payment_info_route(id):
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
                cursor.execute("SELECT * FROM payments WHERE id = %s", (id,))
                row = cursor.fetchone()
                if row is None:
                    return jsonify({"error": "Payment not found"}), 404
                return jsonify({"payment": row}), 200
    except Exception as e:
        return jsonify({"error": f"Error fetching payment info: {str(e)}"}), 500

# Charge payment
@payment_bp.route("/charge-payment", methods=["PATCH"])
@jwt_required()
def charge_payment_route():
    data = request.get_json()
    payment_id = data.get("payment_id")
    
    if not payment_id:
        return jsonify({"error": "Payment ID is required"}), 400
    
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("UPDATE payments SET status='charged' WHERE id = %s", (payment_id,))
                conn.commit()
            return jsonify({"message": "Payment status changed to charged"}), 200
    except Exception as e:
        return jsonify({"error": f"Error charging payment: {str(e)}"}), 500

# Check-in payment
@payment_bp.route("/check-in-payment", methods=["PATCH"])
@jwt_required()
def check_in_payment_route():
    data = request.get_json()
    payment_id = data.get("payment_id")
    
    if not payment_id:
        return jsonify({"error": "Payment ID is required"}), 400
    
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("UPDATE payments SET status='checked_in' WHERE id = %s", (payment_id,))
                conn.commit()
            return jsonify({"message": "Payment status changed to checked in"}), 200
    except Exception as e:
        return jsonify({"error": f"Error checking in payment: {str(e)}"}), 500

# Change payment status
@payment_bp.route("/change-payment-status", methods=["PATCH"])
@jwt_required()
def change_payment_status():
    data = request.get_json()
    payment_id = data.get("payment_id")
    new_status = data.get("new_status")

    if not payment_id or not new_status:
        return jsonify({"error": "Payment ID and new status are required"}), 400

    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
                cursor.execute("SELECT * FROM payments WHERE id = %s", (payment_id,))
                payment = cursor.fetchone()

                if not payment:
                    return jsonify({"error": "Payment not found"}), 404

                cursor.execute("UPDATE payments SET status = %s WHERE id = %s", (new_status, payment_id))
                conn.commit()

                cursor.execute("SELECT * FROM payments WHERE id = %s", (payment_id,))
                updated_payment = cursor.fetchone()

                return jsonify({
                    "message": "Payment status updated successfully",
                    "payment": updated_payment
                }), 200

    except Exception as e:
        return jsonify({"error": f"Error updating payment status: {str(e)}"}), 500

# Get all payments
@payment_bp.route("/all-payments", methods=["GET"])
@jwt_required()
def get_all_payments():
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
                cursor.execute("SELECT * FROM payments")
                payments = cursor.fetchall()

                if not payments:
                    return jsonify({"message": "No payments found"}), 404

                return jsonify({"payments": payments}), 200

    except Exception as e:
        return jsonify({"error": f"Error fetching payments: {str(e)}"}), 500

# Get current user's payments
@payment_bp.route("/user-payments", methods=["GET"])
@jwt_required()
def get_user_payments():
    current_user = get_jwt_identity()
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
                cursor.execute("SELECT * FROM payments WHERE user_id = %s", (current_user,))
                user_payments = cursor.fetchall()

                if not user_payments:
                    return jsonify({"message": "No payments found for this user"}), 404

                return jsonify({"payments": user_payments}), 200

    except Exception as e:
        return jsonify({"error": f"Error fetching user payments: {str(e)}"}), 500


# --- Get all unpurchased cart tickets for current user ---
@payment_bp.route("/cart", methods=["GET"])
def get_cart_items():
    res = validate_token()
    if(res["code"] != 200):
        return jsonify(res), res["code"]
    identity = res["identity"]
    
    # Fetch user_id from access_token
    id = get_user_id(identity)
    if(id["code"] != 200):
        return jsonify(id), id["code"]
    user_id = id["user_id"]
    
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
            cursor.execute(
                "SELECT purchase_id FROM payments WHERE user_id = %s AND status = 'cart'", 
                (user_id,)
            )
            purchases = cursor.fetchall()
            
            purchase_ids = [row["purchase_id"] for row in purchases]
            
            if not purchase_ids:
                return jsonify({
                    "cart_events": [],
                    "quantities": [],
                    "message": "Cart is empty."
                }), 200
            
            event_query = """
                SELECT
                    e.*,
                    SUM(p.quantity) AS total_quantity
                FROM events e
                JOIN tickets t ON e.id = t.event_id
                JOIN purchases p ON p.ticket_id = t.id
                WHERE p.id = ANY(%s)
                GROUP BY e.id
            """
            cursor.execute(event_query, (purchase_ids,))
            events_with_quantity = cursor.fetchall()
            
            events = []
            quantities = []
            
            for row in events_with_quantity:
                event = row.copy()
                quantity = event.pop("total_quantity", 0)
                
                events.append(event)
                quantities.append(quantity)
            
            
            return jsonify({
                "cart_events": events, 
                "quantities": quantities,
                "message": "Cart events and quantities are fetched succesfully."
            }), 200
            
    except Exception as e:
        return jsonify({"error": f"Error fetching cart items: {str(e)}"}), 500

# --- Add payment to cart
@payment_bp.route("/cart/add", methods=["POST"])
def add_cart_item():
    """
        request body:
        [
            event_id,
            quantity,
            unit_price
        ]
    """
    data = request.get_json()
    event_id = data["event_id"]
    quantity = data["quantity"]
    unit_price = data["unit_price"]
    total_price = quantity * unit_price
    
    res = validate_token()
    if(res["code"] != 200):
        return jsonify(res), res["code"]
    identity = res["identity"]
    
    # Fetch user_id from access_token
    id = get_user_id(identity)
    if(id["code"] != 200):
        return jsonify(id), id["code"]
    user_id = id["user_id"]
    
    # Create ticket, purchase, and cart-status payment, respectively
    # ticket
    try:
        ticket_query = """
            INSERT INTO tickets (event_id, is_valid)
            VALUES (%s, %s)
            RETURNING id;
        """
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
                cursor.execute(ticket_query, (event_id, False, ))
                ticket = cursor.fetchone()
                
                if not ticket:
                    return jsonify({
                        "error": "Failed to create ticket",
                    }), 500
        # purchase
        ticket_id = ticket["id"]
        
        purchase_query = """
            INSERT INTO purchases (user_id, ticket_id, quantity, unit_price, total_price)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id;
        """
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
                cursor.execute(purchase_query, (user_id, ticket_id, quantity, unit_price, total_price,))
                purchase = cursor.fetchone()
                
        # add cart payment
        purchase_id = purchase["id"]
        add_cart_query = """
            INSERT INTO payments (purchase_id, payment_method, status, paid_amount, user_id)
            VALUES (%s, %s, %s, %s, %s)
        """
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
                cursor.execute(add_cart_query, (purchase_id, 'None', 'cart', total_price, user_id,))
        
        return jsonify({"message": "Item added to cart"}), 200
    except Exception as e:
        return jsonify({"error": f'Internal error {str(e)}'}), 500
    

# --- Remove unpurchased ticket from cart ---
@payment_bp.route("/cart/delete", methods=["DELETE"])
def delete_cart_item():
    res = validate_token()
    if(res["code"] != 200):
        return jsonify(res), res["code"]
    identity = res["identity"]
    
    # Fetch user_id from access_token
    id = get_user_id(identity)
    if(id["code"] != 200):
        return jsonify(id), id["code"]
    user_id = id["user_id"]
    
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                # Get corresponding purchases and tickets
                cursor.execute("""
                    SELECT p.id AS purchase_id, p.ticket_id
                    FROM purchases p
                    JOIN payments pay ON p.id = pay.purchase_id
                    WHERE p.user_id = %s AND pay.status = 'cart'
                """, (user_id,))
                rows = cursor.fetchall()
                if not rows:
                    return jsonify({"message": "No cart items to delete"}), 200

                purchase_ids = [row[0] for row in rows]
                ticket_ids = [row[1] for row in rows]

                # Delete payments
                cursor.execute("""
                    DELETE FROM payments
                    WHERE purchase_id = ANY(%s)
                """, (purchase_ids,))

                # Delete purchases
                cursor.execute("""
                    DELETE FROM purchases
                    WHERE id = ANY(%s)
                """, (purchase_ids,))

                # Delete tickets
                cursor.execute("""
                    DELETE FROM tickets
                    WHERE id = ANY(%s)
                """, (ticket_ids,))

                conn.commit()
        return jsonify({"message": "Cart items deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": f"Failed to delete cart items: {str(e)}"}), 500


# --- Purchase all items in cart for current user ---
@payment_bp.route("/cart/purchase", methods=["PATCH"])
def purchase_cart():
    res = validate_token()
    if(res["code"] != 200):
        return jsonify(res), res["code"]
    identity = res["identity"]
    
    # Fetch user_id from access_token
    id = get_user_id(identity)
    if(id["code"] != 200):
        return jsonify(id), id["code"]
    user_id = id["user_id"]
    
    
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
            payment_query = """
                UPDATE payments pay
                SET status = 'purchased'
                FROM purchases p
                WHERE pay.user_id = %s AND pay.status = 'cart' AND p.id = pay.purchase_id
                RETURNING p.ticket_id;
            """
            cursor.execute(
                payment_query, 
                (user_id,)
            )
            updated_tickets = cursor.fetchall()
            
            if not updated_tickets:
                return jsonify({"message": "No cart items to purchase"}), 404
            conn.commit()
            
            ticket_ids = [row["ticket_id"] for row in updated_tickets]
            
            
            query = """
                UPDATE tickets
                SET is_valid = true
                WHERE id = ANY(%s)
            """
            cursor.execute(query, (ticket_ids,))
            
            conn.commit()
            
            
            return jsonify({"message": f"{len(updated_tickets)} cart items purchased"}), 200
    except Exception as e:
        return jsonify({"error": f"Error purchasing cart items: {str(e)}"}), 500
