from flask import Blueprint, request, jsonify
from .services import create_event, get_all_events, get_event, get_recommended_events, update_event, delete_event

event_bp = Blueprint("event", __name__)  # 这里不设 `url_prefix`，在 `app.py` 里配置

@event_bp.route("/create", methods=["POST"])
def create_event_route():
    """ 创建新事件 """
    data = request.json
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
    
@event_bp.route("/events/<int:event_id>", methods=["PUT"])
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

@event_bp.route("/search", methods=["GET"])
def search():
    """ filter events """
    data = request.json
    if 'name' not in data:
        data['name'] = ''
    if 'order' not in data:
        data['order'] = 'created_at'

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