from flask import Blueprint, request, jsonify
import pytz
import psycopg2
import psycopg2.extras
from datetime import datetime, timedelta
from db.db_connect import get_db_connection
from .statsservices import validate_token
from .statsservices import get_stats_list, get_stats, get_chart_data, get_daily_chart, get_weekly_chart

stats_bp = Blueprint("stats", __name__)  



@stats_bp.route("/get-stats-list", methods=["GET"])
def get_stats_list_req():
    """ get stats list """
    res = validate_token()
    if(res["code"] != 200):
        return jsonify(res), res["code"]
    identity = res["identity"]
        
    stats_list = get_stats_list(identity)
    total_stats = get_stats(stats_list)

    return jsonify({
        "message": "Stats list retrieved successfully",
        "stats_data": stats_list,
        "total_stats": total_stats
    }), 200
    
    
@stats_bp.route("/get-chart", methods=["POST"])
def get_chart_req():
    res = validate_token()
    if(res["code"] != 200):
        return jsonify(res), res["code"]
    identity = res["identity"]

    
    data = request.json
    duration = data.get('duration', 'all')
    interval = data.get('interval', 'day')

    now = datetime.now()

    start_date = None
    if duration == 'threeWeeks':
        start_date = now - timedelta(weeks=3)
    elif duration == 'threeMonths':
        start_date = now - timedelta(days=90)  # use 90 days for 3 months
    elif duration == 'oneYear':
        start_date = now - timedelta(days=365)
    elif duration == 'threeYears':
        start_date = now - timedelta(days=(365*3))
    else:  # 'all'
        raise ValueError 
        
    if start_date:
        start_date = start_date.replace(tzinfo=None)

    chart_data = get_chart_data(identity, start_date, interval)
    return jsonify({
        "message": "Chart retrieved successfully",
        "chart_data": chart_data,
    }), 200

@stats_bp.route("/get-daily-chart", methods=["GET"])
def get_daily_chart_req():
    
    res = validate_token()
    if(res["code"] != 200):
        return jsonify(res), res["code"]
    identity = res["identity"]

    chart_data = get_daily_chart(identity)
    return jsonify({
        "message": "Daily chart retrieved successfully",
        "chart_data": chart_data,
    }), 200

@stats_bp.route("/get-weekly-chart", methods=["GET"])
def get_weekly_daily_chart_req():
    res = validate_token()
    if(res["code"] != 200):
        return jsonify(res), res["code"]
    identity = res["identity"]

    chart_data = get_weekly_chart(identity)
    return jsonify({
        "message": "Weekly daily chart retrieved successfully",
        "chart_data": chart_data,
    }), 200
    
@stats_bp.route("/get-events", methods=["GET"])
def get_org_events_req():
    res = validate_token()
    if res["code"] != 200:
        return jsonify(res), res["code"]
    identity = res["identity"]
    
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
            idQuery = """
                SELECT U.id
                FROM users U
                WHERE U.email = %s
            """
            cursor.execute(idQuery, (identity,))
            user = cursor.fetchone()
            
            if not user:
                return jsonify({"error": f'User not found'}), 404
            
            creator_id = user["id"]
            
            eventQuery = """
                SELECT *
                FROM events
                WHERE creator_id = %s
            """    
            
            cursor.execute(eventQuery, (creator_id,))
            
            events = cursor.fetchall()
            
            if not events:
                return jsonify({"error": f'No event found'}) , 200
            
    return jsonify({
        "events": events,
        "message": "Events for the organizer fetched",
    }), 200
    
