from flask import jsonify, request
from db.db_connect import get_db_connection 
from datetime import datetime, timedelta, timezone
import psycopg2.extras
from .services import get_creator_id
from flask_jwt_extended import ( decode_token,)
from jwt import ExpiredSignatureError
from dateutil.relativedelta import relativedelta

def validate_token():
    """
    Validate an access token in cookie
    """
    access_token = request.cookies.get("access_token")
    
    if not access_token:
        print("Token Error")
        return {"error": "Missing access token", "code": 401}
    try:
        decoded_token = decode_token(access_token)
        identity = decoded_token["sub"]
        return {"identity": identity, "code": 200}
        
    
    except ExpiredSignatureError as e:
        return {"error": 'Signiture has expired', "code": 401}
    except Exception as e:
        return {"error": f'JWT Error: {str(e)}', "code": 401}
    
    
'''
Get stats list
'''
def get_stats_list(identity):
    limitedLimit = 20
    
    # Fetch creator_id from access_token
    id = get_creator_id(identity)
    if(id["code"] != 200):
        return jsonify(id), id["code"]
    creator_id = id["creator_id"]
    

    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
            query = """
                SELECT 
                    e.id,
                    e.name,
                    e.start_date AS date,
                    e.max_participants AS total_num,
                    e.max_participants - COALESCE(SUM(p.quantity), 0) AS rem_num,
                    COALESCE(SUM(p.quantity), 0) AS sold_num,
                    COALESCE(SUM(p.total_price), 0) AS sales,
                    ROUND(COALESCE(SUM(p.total_price), 0) * 0.9, 2) AS profit
                FROM events e
                LEFT JOIN tickets t ON e.id = t.event_id
                LEFT JOIN purchases p ON t.id = p.ticket_id
                WHERE e.creator_id = %s
                GROUP BY e.id, e.name, e.start_date, e.max_participants, e.current_participants
                ORDER BY e.start_date DESC;
            """
            
            cursor.execute(query, (creator_id,))

            stats = cursor.fetchall()

    return stats

def get_stats(stats_list):
    sold_num = 0
    rem_num = 0
    sales = 0
    profit = 0
    total_num = 0
    for stats in stats_list:
        sold_num += stats["sold_num"]
        rem_num += stats["rem_num"]
        total_num += stats["total_num"]
        sales += stats["sales"]
        profit += stats["profit"]
    return {
        "id": 0, 
        "name": "Total",
        "sold_num": sold_num, 
        "rem_num": rem_num, 
        "total_num": total_num, 
        "sales": round(float(sales), 2), 
        "profit": round(float(profit), 2)
    }

def get_daily_chart(email):
    """
    Compute hourly sales based on purchase time for organizer's events.
    """
    sql = """
        SELECT
            DATE_PART('hour', p.purchase_date) AS hour,
            SUM(p.total_price) AS total_sales
        FROM purchases p
        JOIN tickets t ON p.ticket_id = t.id
        JOIN events e ON t.event_id = e.id
        JOIN users u ON e.creator_id = u.id
        WHERE
            u.email = %s AND u.is_org = true
        GROUP BY hour
        ORDER BY hour;
    """

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(sql, (email,))
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    hourly_sales = {hour: 0 for hour in range(24)}

    for row in rows:
        hour = int(row[0])  # DATE_PART returns float
        sales = float(row[1])
        hourly_sales[hour] = round(sales, 2)

    chart_data = [{"hour": hour, "sales": hourly_sales[hour]} for hour in range(24)]
    return chart_data

def get_weekly_chart(email):
    """
    Compute total sales grouped by day of week (Mon - Sun)
    """
    sql = """
        SELECT 
            TO_CHAR(p.purchase_date, 'Dy') AS dow,
            SUM(p.total_price) AS total_sales
        FROM purchases p
        JOIN tickets t ON p.ticket_id = t.id
        JOIN events e ON t.event_id = e.id
        JOIN users u ON e.creator_id = u.id
        WHERE u.email = %s AND u.is_org = true
        GROUP BY dow
    """

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(sql, (email,))
    rows = cursor.fetchall()
    cursor.close()
    conn.close()


    dow_sales = {
        'Mon': 0.0, 'Tue': 0.0, 'Wed': 0.0,
        'Thu': 0.0, 'Fri': 0.0, 'Sat': 0.0, 'Sun': 0.0
    }

    for row in rows:
        dow = row[0].strip()  # e.g., 'Mon'
        sales = float(row[1])
        if dow in dow_sales:
            dow_sales[dow] = round(sales, 2)

    chart_data = [{'dow': dow, 'sales': dow_sales[dow]} for dow in dow_sales]
    return chart_data

def get_chart_data(email, start_date, interval):
    # create SQL query to get chart data
    if start_date:
        start_date = truncate_to_unit(start_date.replace(tzinfo=None), interval)
        start_date_clause = f"AND p.purchase_date >= '{start_date.isoformat()}'"
    else:
        start_date_clause = ""

    if interval == 'day':
        interval_clause = "date_trunc('day', p.purchase_date)"
    elif interval == 'week':
        interval_clause = "date_trunc('week', p.purchase_date)"
    elif interval == 'month':
        interval_clause = "date_trunc('month', p.purchase_date)"
        

    sql =f"""
        SELECT 
            EXTRACT(EPOCH FROM {interval_clause}) * 1000 AS date,
            SUM(p.total_price) AS total_sales
        FROM purchases p
        JOIN tickets t ON p.ticket_id = t.id
        JOIN events e ON t.event_id = e.id
        JOIN users u ON e.creator_id = u.id
        WHERE 
            u.email = %s
            AND u.is_org = true
            {start_date_clause}
        GROUP BY {interval_clause}
        ORDER BY {interval_clause};
    """


    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute(sql, (email,))
            rows = cursor.fetchall()

    chart_data = [{"interval": int(row[0]), "sales": round(float(row[1]), 2)} for row in rows]
    
    
    if start_date:
        start_date = truncate_to_unit(start_date.replace(tzinfo=None), interval)
        chart_data = fill_missing_intervals(chart_data, start_date, interval)
    return chart_data

def fill_missing_intervals(chart_data, start_date, interval):
    """
        Fill the data with no sales in chart data
    """
    
    
    data_dict = {
        truncate_to_unit(datetime.fromtimestamp(int(round(d["interval"])) / 1000, tz=timezone.utc), interval): d["sales"]
        for d in chart_data
    }
    
    filled = []
    
    end = truncate_to_unit(datetime.now().replace(tzinfo=timezone.utc), interval)
    current = truncate_to_unit(start_date.replace(tzinfo=timezone.utc), interval)
    
    

    
    while current <= end:
        timestamp = int(current.timestamp() * 1000)
        
        sales = data_dict.get(current, 0.0)
        filled.append({"interval": timestamp, "sales": round(sales, 2)})
        
        
        if interval == "day":
            current += timedelta(days=1)
        elif interval == "week":
            current += timedelta(weeks=1)
        elif interval == "month":
            current += relativedelta(months=1)
        else:
            raise ValueError("Invalid interval")
    
    return filled

def truncate_to_unit(dt, unit):
        if unit == "day":
            return dt.replace(hour=0, minute=0, second=0, microsecond=0)
        elif unit == "week":
            return (dt - timedelta(days=dt.weekday())).replace(hour=0, minute=0, second=0, microsecond=0)
        elif unit == "month":
            return dt.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        else:
            raise ValueError("Invalid interval")