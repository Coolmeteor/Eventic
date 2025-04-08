import json
import time
from db.db_connect import get_db_connection 
from datetime import datetime  

'''
Get stats list
'''
def get_stats_list(email):
    limitedLimit = 20

    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
        SELECT 
        e.id, e.name, s.sold_num, s.rem_num, e.max_participants as total_num, s.date, s.sales, s.profit 
        FROM events e, eventstats s, users u
        WHERE e.id=s.event_id 
        AND e.creator_id = u.id
        AND u.email=%s 
        AND u.is_org=true
        ORDER BY s.date DESC
    """
    
    cursor.execute(query, (email,))

    events = cursor.fetchall()

    event_list = []
    for row in events:
        event = dict(zip([desc[0] for desc in cursor.description], row))

        # 保留两位小数
        event["sales"] = round(float(event["sales"]), 2)
        event["profit"] = round(float(event["profit"]), 2)

        # 转换 date 为时间戳（秒）
        if isinstance(event["date"], datetime):
            event["date"] = int(event["date"].timestamp())

        event_list.append(event)

    cursor.close()
    conn.close()

    return event_list

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
    stats = get_stats_list(email)

    hourly_sales = {hour: [0, 0] for hour in range(24)}
    # calculate sales
    for event in stats:
        hour = event['date'].hour
        sales = float(event['sales'])
        
        # add sales 
        hourly_sales[hour][0] += sales
        hourly_sales[hour][1] += 1  # event count

    chart_data = []
    for hour in range(24):
        chart_data.append({'hour': hour, 'sales': round(hourly_sales[hour][0], 2)})
    return chart_data

def get_weekly_daily_chart(email):
    stats = get_stats_list(email)

    dow_sales = {
        'Mon': [0, 0],
        'Tue': [0, 0],
        'Wed': [0, 0],
        'Thu': [0, 0],
        'Fri': [0, 0],
        'Sat': [0, 0],
        'Sun': [0, 0]
    }
    for event in stats:
        # weekly date name
        dow = event['date'].strftime('%a')
        sales = float(event['sales'])
        
        # add sales 
        dow_sales[dow][0] += sales
        dow_sales[dow][1] += 1

    # 生成 chart_data 列表
    chart_data = []
    for dow, (total_sales, event_count) in dow_sales.items():
        chart_data.append({
            'dow': dow,
            'sales': round(total_sales, 2)
        })
    return chart_data

def get_chart_data(email, start_date, interval):
    # create SQL query to get chart data
    if start_date:
        start_date_clause = f"AND date >= '{start_date.isoformat()}'"
    else:
        start_date_clause = ""

    if interval == 'day':
        interval_clause = "date_trunc('day', date)"
    elif interval == 'week':
        interval_clause = "date_trunc('week', date)"
    elif interval == 'month':
        interval_clause = "date_trunc('month', date)"

    sql = f"""
    SELECT 
        EXTRACT(EPOCH FROM {interval_clause}) * 1000 AS date,  -- 转换为毫秒级时间戳
        SUM(sales) AS total_sales
    FROM 
        eventstats s, events e, users u
    WHERE 
        e.id=s.event_id 
        AND e.creator_id = u.id
        AND u.email=%s 
        AND u.is_org=true
        {start_date_clause}
    GROUP BY 
        {interval_clause}
    ORDER BY 
        {interval_clause};
    """

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(sql, (email,))
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    # format results into a list 
    res = []
    for row in rows:
        # Convert the timestamp from milliseconds to a datetime object
        res.append([datetime.fromtimestamp(float(row[0]) / 1000.0), float(row[1])])

    chart_data = [{"date": int(row[0].timestamp()), "sales": round(row[1], 2)} for row in res]
    return chart_data
