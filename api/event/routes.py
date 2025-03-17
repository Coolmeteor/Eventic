from flask import Blueprint, request, jsonify
from .services import create_event, get_all_events, get_event, update_event, delete_event, search_events

event_bp = Blueprint("event", __name__)  # 这里不设 `url_prefix`，在 `app.py` 里配置

@event_bp.route("/events", methods=["POST"])
def create_event_route():
    """ 创建新事件 """
    data = request.json
    required_fields = ["name", "description", "media", "tags", "category", "start_date",
                       "end_date", "location_string", "location_long", "location_lat",
                       "visibility", "max_participants", "pricing", "creator_id"]

    if not all(k in data for k in required_fields):
        return jsonify({"error": "缺少必要字段"}), 400

    event_id = create_event(data)
    return jsonify({"message": "事件创建成功", "event_id": event_id}), 201

@event_bp.route("/events", methods=["GET"])
def get_all_events_route():
    """ 获取所有事件 """
    return jsonify(get_all_events()), 200

@event_bp.route("/events/<int:event_id>", methods=["GET"])
def get_event_route(event_id):
    """ 获取指定事件 """
    event = get_event(event_id)
    if event:
        return jsonify(event), 200
    return jsonify({"error": "Event not found."}), 404

@event_bp.route("/events/<int:event_id>", methods=["PUT"])
def update_event_route(event_id):
    """ 更新事件 """
    data = request.json
    if update_event(event_id, data):
        return jsonify({"message": "事件更新成功"}), 200
    return jsonify({"error": "事件未找到"}), 404

@event_bp.route("/events/<int:event_id>", methods=["DELETE"])
def delete_event_route(event_id):
    """ 删除事件 """
    if delete_event(event_id):
        return jsonify({"message": "事件删除成功"}), 200
    return jsonify({"error": "事件未找到"}), 404


@event_bp.route("/recommendation", methods=["GET"])
def recommendation():
    """ recommend events """
    return jsonify(get_all_events()), 200

@event_bp.route("/search", methods=["GET"])
def search():
    """ filter events """
    data = request.json
    if 'name' not in data:
        data['name'] = ''
    if 'order' not in data:
        data['order'] = 'created_at'

    return jsonify(search_events(data)), 200