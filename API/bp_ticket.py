from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from request_utils import resp_json
from request_utils import check_form
from ticket_db import save_ticket, get_ticket_info
from event_db import get_event_info
from payment_db import save_payment


bp = Blueprint('ticket', __name__, url_prefix='/ticket')

@bp.post('create')
def create():
    params = check_form(['event_id', 'price', 'quantity'], request)
    if params['code'] == 1:
        return resp_json(1, params['message'])
    ticket = params['data']

    if get_event_info(ticket['event_id']) is None:
        return resp_json(1, f"Event id {ticket['event_id']} does not exist.")
    
    saved = save_ticket(ticket)
    return resp_json(0, saved)

@bp.post('register')
@jwt_required()
def register():
    user_id = get_jwt_identity()
    print('register user id ', user_id)
    params = check_form(['ticket_id'], request)
    if params['code'] == 1:
        return resp_json(1, params['message'])
    payment = params['data']


    if get_ticket_info(payment['ticket_id']) is None:
        return resp_json(1, f"Ticket id {payment['ticket_id']} does not exist.")
    
    saved = save_payment(user_id, int(payment['ticket_id']))
    return resp_json(0, saved)
