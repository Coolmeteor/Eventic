from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from db.db_connect import get_db_connection
import psycopg2.extras

payment_bp = Blueprint("payment", __name__)

# Save payment function, exposed as an API endpoint
@payment_bp.route("/save-payment", methods=["POST"])
@jwt_required()
def save_payment_route():
    data = request.get_json()
    user_id = data.get("user_id")
    ticket_id = data.get("ticket_id")
    
    if not user_id or not ticket_id:
        return jsonify({"error": "User ID and ticket ID are required"}), 400
    
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
                sql = 'INSERT INTO payments (user_id, ticket_id, status) VALUES (%s, %s, %s) RETURNING id'
                cursor.execute(sql, (user_id, ticket_id, 'registered'))
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
@jwt_required()
def get_cart_items():
    current_user = get_jwt_identity()
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
            cursor.execute(
                "SELECT * FROM payments WHERE user_id = %s AND status = 'cart'", 
                (current_user,)
            )
            tickets = cursor.fetchall()
            return jsonify({"cart": tickets}), 200
    except Exception as e:
        return jsonify({"error": f"Error fetching cart items: {str(e)}"}), 500


# --- Remove unpurchased ticket from cart ---
@payment_bp.route("/cart/remove/<int:payment_id>", methods=["DELETE"])
@jwt_required()
def remove_cart_item(payment_id):
    current_user = get_jwt_identity()
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "DELETE FROM payments WHERE id = %s AND user_id = %s AND status = 'cart'", 
                (payment_id, current_user)
            )
            if cursor.rowcount == 0:
                return jsonify({"error": "Item not found or not in cart"}), 404
            conn.commit()
            return jsonify({"message": "Ticket removed from cart"}), 200
    except Exception as e:
        return jsonify({"error": f"Error removing cart item: {str(e)}"}), 500


# --- Purchase all items in cart for current user ---
@payment_bp.route("/cart/purchase", methods=["PATCH"])
@jwt_required()
def purchase_cart():
    current_user = get_jwt_identity()
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "UPDATE payments SET status = 'purchased' WHERE user_id = %s AND status = 'cart'", 
                (current_user,)
            )
            updated_rows = cursor.rowcount
            if updated_rows == 0:
                return jsonify({"message": "No cart items to purchase"}), 404
            conn.commit()
            return jsonify({"message": f"{updated_rows} cart items purchased"}), 200
    except Exception as e:
        return jsonify({"error": f"Error purchasing cart items: {str(e)}"}), 500
