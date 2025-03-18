
import json
import time
from db.db_connect import get_db_connection 
from datetime import datetime  
import psycopg2
import psycopg2.extras



def create_event(data):
    """ 插入新事件 """
    with get_db_connection() as conn:
        cursor = conn.cursor()
        try:
            start_date = datetime.strptime(data["start_date"], "%Y-%m-%d %H:%M:%S")
            end_date = datetime.strptime(data["end_date"], "%Y-%m-%d %H:%M:%S")
        except ValueError:
            return {"error": "must be YYYY-MM-DD HH:MM:SS"}, 400
       
        created_at = datetime.utcnow()
        updated_at = datetime.utcnow()
        cursor.execute("""
            INSERT INTO events (name, description, media, tags, category, start_date, end_date,
                                location_string, location_long, location_lat, visibility,
                                max_participants, current_participants, pricing, creator_id, created_at, updated_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            data["name"], data["description"],  
            "{" + ",".join(f'"{x}"' for x in data["media"]) + "}",
            "{" + ",".join(f'"{x}"' for x in data["tags"]) + "}",
            data["category"], start_date, end_date, 
            data["location_string"], data["location_long"], data["location_lat"], 
            data["visibility"], data["max_participants"], 0, 
            data["pricing"], data["creator_id"], 
            created_at, updated_at  # 这里使用转换后的 `created_at` 和 `updated_at`
        ))
        
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
    """ 获取指定事件 """
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM events WHERE id = %s", (event_id,))
    event = cursor.fetchone()

    cursor.close()
    conn.close()

    if event:
        return dict(zip([desc[0] for desc in cursor.description], event))
    else:
        return None  # 确保返回 None 而不是整数


def update_event(event_id, data):
    """ 更新事件 """
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE events
            SET name = ?, description = ?, media = ?, tags = ?, category = ?, start_date = ?,
                end_date = ?, location_string = ?, location_long = ?, location_lat = ?, 
                visibility = ?, max_participants = ?, pricing = ?, updated_at = ?
            WHERE id = ?
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
        cursor.execute("DELETE FROM events WHERE id = ?", (event_id,))
        conn.commit()
        return cursor.rowcount > 0
