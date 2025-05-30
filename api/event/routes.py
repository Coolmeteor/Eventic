from flask import Blueprint, request, jsonify
from .services import ( 
    create_event, get_all_events, get_event, get_happening_soon_events, get_new_events, 
    get_recommended_events, search_events, update_event, delete_event,  get_creator_id
)
from .statsservices import validate_token

event_bp = Blueprint("event", __name__)  # 这里不设 `url_prefix`，在 `app.py` 里配置



@event_bp.route("/create", methods=["POST"])
def create_event_route():
    """ 创建新事件 """
    res = validate_token()
    if(res["code"] != 200):
        return jsonify(res), res["code"]
    identity = res["identity"]
    
    # Fetch creator_id from access_token
    id = get_creator_id(identity)
    if(id["code"] != 200):
        return jsonify(id), id["code"]
    creator_id = id["creator_id"]
    
    data = request.json
    data["creator_id"] = creator_id
    
    
    required_fields = ["name", "description", "media", "tags", "category", "start_date",
                       "end_date", "location_string", "location_long", "location_lat",
                       "visibility", "max_participants", "pricing", "creator_id"]

    if not all(k in data for k in required_fields):
        return jsonify({"error": "missing words"}), 400

    event_id = create_event(data)
    return jsonify({"message": "create success", "event_id": event_id}), 201

@event_bp.route("/events", methods=["GET"])
def get_all_events_route():
    """ 获取所有事件 """
    events = get_all_events()
    if isinstance(events, list): 
        return jsonify(events), 200
    else:
        return jsonify({"error": "data error"}), 500

@event_bp.route("/events/<int:event_id>", methods=["GET"])
def get_event_route(event_id):
    
    event = get_event(event_id)

    if event:
        return jsonify(event), 200
    else:
        return jsonify({"error": "not found"}), 404
    
@event_bp.route("/update/<int:event_id>", methods=["PUT"])
def update_event_route(event_id):
    """ 更新事件 """
    data = request.json
    if update_event(event_id, data):
        return jsonify({"message": "update success"}), 200
    return jsonify({"error": "cant find"}), 404

@event_bp.route("/delete/<int:event_id>", methods=["DELETE"])
def delete_event_route(event_id):
    """ 删除事件 """
    if delete_event(event_id):
        return jsonify({"message": "delete "}), 200
    return jsonify({"error": "cant find"}), 404

@event_bp.route("/search", methods=["POST"])
def search():
    """ filter events """
    data = request.json
    if 'name' not in data:
        data['name'] = ''
    if 'sortType' not in data:
        data['sortType'] = 'created_at'

    return jsonify(search_events(data)), 200

'''
currently this is set to not allow more than 20 events to be retrieved
'''
@event_bp.route("/recommendation/<int:event_count>", methods=["GET"])
def get_recommendation_route(event_count):
    
    events = get_recommended_events(event_count)

    if isinstance(events, list): 
        return jsonify(events), 200
    else:
        return jsonify({"error": "data error"}), 500
    

'''
get recently posted events. Storted by date posted
'''
@event_bp.route("/new_postings", methods=["GET"])
def get_new_event_route():
    
    events = get_new_events()

    if isinstance(events, list): 
        return jsonify(events), 200
    else:
        return jsonify({"error": "data error"}), 500
    

'''
get events that are happening soon. 
This basically start date or end date > current date
'''
@event_bp.route("/happening_soon", methods=["GET"])
def get_happening_soon_route():
    
    events = get_happening_soon_events()

    if isinstance(events, list): 
        return jsonify(events), 200
    else:
        return jsonify({"error": "data error"}), 500
    