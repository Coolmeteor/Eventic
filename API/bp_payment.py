from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from request_utils import resp_json
from request_utils import check_form
from payment_db import get_payment_info, charge_payment, check_in_payment


bp = Blueprint('payment', __name__, url_prefix='/payment')

@bp.put('charge/<int:id>')
@jwt_required()
def charge(id):
    payment = get_payment_info(id)
    if payment is None:
        return resp_json(1, f"Payment id {id} does not exists.")
    
    charge_payment(id)
    return resp_json(0, f"Payment with id {id} is charged.")

@bp.put('check_in/<int:id>')
@jwt_required()
def check_in(id):
    payment = get_payment_info(id)
    if payment is None:
        return resp_json(1, f"Payment id {id} does not exists.")
    if payment['status'] == 'registered':
        return resp_json(1, "Payment is not charged.")
    check_in_payment(id)
    return resp_json(0, f"Payment with id {id} is checked in.")