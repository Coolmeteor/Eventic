
import json
import time
from db.db_connect import get_db_connection 
from datetime import datetime  
import psycopg2
import psycopg2.extras



def create_event(data):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        
       
        start_date = datetime.utcfromtimestamp(data["start_date"] / 1000)  # 转换为 Python 的 datetime
        end_date = datetime.utcfromtimestamp(data["end_date"] / 1000)
        
        created_at = datetime.utcnow()
        updated_at = datetime.utcnow()

        cursor.execute("""
            INSERT INTO events (name, description, media, tags, category, start_date, end_date, 
                               location_string, location_long, location_lat, visibility, 
                               max_participants, current_participants, pricing, creator_id, 
                               created_at, updated_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id;
        """, (
            data["name"], data["description"], data["media"], data["tags"], data["category"],
            start_date, end_date,
            data["location_string"], data["location_long"], data["location_lat"],
            data["visibility"], data["max_participants"], 0, data["pricing"], data["creator_id"],
            created_at, updated_at
        ))

        event_id = cursor.fetchone()[0]
        conn.commit()

     
        return {"message": "event create sucess"}, 201


def get_all_events():
    """ 获取所有事件 """
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM events")
    events = cursor.fetchall()

    # 确保返回的 `events` 是一个列表
    event_list = []
    for row in events:
        event_list.append(dict(zip([desc[0] for desc in cursor.description], row)))

    cursor.close()
    conn.close()

    return event_list  # 确保返回的是一个列表，而不是单个整数


def get_event(event_id):
    
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM events WHERE id = %s", (event_id,))
    event = cursor.fetchone()
    
    
    column_names = [desc[0] for desc in cursor.description]

    cursor.close()
    conn.close()

    if event:
        event_dict = dict(zip(column_names, event))

        
        for field in ["start_date", "end_date", "created_at", "updated_at"]:
            if isinstance(event_dict.get(field), datetime):
                event_dict[field] = int(event_dict[field].timestamp() * 1000)

        return event_dict  

    return None  # 确保返回 None 而不是整数
def update_event(event_id, data):
    """ 更新事件 """
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE events
            SET name = %s, description = %s, media = %s, tags = %s, category = %s, start_date = %s,
                end_date = %s, location_string = %s, location_long = %s, location_lat = %s, 
                visibility = %s, max_participants = %s, pricing = %s, updated_at = %s
            WHERE id = %s
        """, (
            data["name"], data["description"], json.dumps(data["media"]), json.dumps(data["tags"]),
            data["category"], data["start_date"], data["end_date"], data["location_string"],
            data["location_long"], data["location_lat"], data["visibility"],
            data["max_participants"], data["pricing"], int(time.time()), event_id
        ))
        conn.commit()
        return cursor.rowcount > 0

def delete_event(event_id):
    """ 删除事件 """
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM events WHERE id = %s", (event_id,))
        conn.commit()
        return cursor.rowcount > 0

def search_events(data):
    """ search events """
    with get_db_connection() as conn:
        cursor = conn.cursor()
        sort_direction = "DESC"
        query = sql.SQL("SELECT * FROM events WHERE name Like {a} ORDER BY {b} {c}").format(
            a=sql.Literal('%'+data["name"]+'%'), 
            b=sql.Identifier(data["order"]),
            c=sql.SQL(sort_direction)
        )
        cursor.execute(query)
        rows = cursor.fetchall()
        column_names = [desc[0] for desc in cursor.description]
        return [convert_to_dict(row, column_names) for row in rows]
