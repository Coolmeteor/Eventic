from flask import Blueprint, jsonify, request, make_response
from request_utils import resp_json
from request_utils import check_form
from event_db import save_event, publish_event, search_event


bp = Blueprint('event', __name__, url_prefix='/event')

@bp.post('create')
def create():
    params = check_form(['name', 'description', 'start_date', 'end_date', 'location', 'organizer'], request)
    if params['code'] == 1:
        return resp_json(1, params['message'])
    event = params['data']
    
    saved = save_event(event)
    return resp_json(0, saved)

@bp.put('publish/<int:id>')
def publich(id):
    publish_event(id)
    return resp_json(0, f"Event with id {id} published.")

@bp.get('search')
def search():
    name = request.args.get('name', default='')
    events = search_event(name)
    return resp_json(0, events)