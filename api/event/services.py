
import json
import time
from db.db_connect import get_db_connection 
from datetime import datetime  
from psycopg2 import sql


def convert_to_dict(row, column_names):
    """ convert row to dict """
    return dict(zip(column_names, row))

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
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM events")
        rows = cursor.fetchall()
        column_names = [desc[0] for desc in cursor.description]
        return [convert_to_dict(row, column_names) for row in rows]


def get_event(event_id):
    """ 获取指定事件 """
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM events WHERE id = %s", (event_id,))
        row = cursor.fetchone()
        column_names = [desc[0] for desc in cursor.description]
        return convert_to_dict(row, column_names) if row else None

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
