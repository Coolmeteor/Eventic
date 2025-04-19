
import json
import time
from db.db_connect import get_db_connection 
from datetime import datetime  
import psycopg2
import psycopg2.extras
from psycopg2 import sql



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

'''
Get personalized event recommendations

NOTE: Currently this just gets 5 events and there is no algorithm
'''
def get_recommended_events(limit):
    limitedLimit = 20

    # no api abuse lol
    if limit < limitedLimit:
        limitedLimit = limit

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM events LIMIT " + str(limitedLimit))
    events = cursor.fetchall()

    event_list = []
    for row in events:
        event_list.append(dict(zip([desc[0] for desc in cursor.description], row)))

    cursor.close()
    conn.close()

    return event_list

'''
Get most recently posted events
'''
def get_new_events():
    limitedLimit = 7

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM events WHERE visibility = 'public' ORDER BY created_at DESC LIMIT " + str(limitedLimit))
    events = cursor.fetchall()

    event_list = []
    for row in events:
        event_list.append(dict(zip([desc[0] for desc in cursor.description], row)))

    cursor.close()
    conn.close()

    return event_list

'''
Get events that start soon or is currently ongoing
'''
def get_happening_soon_events():
    limitedLimit = 7

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM events WHERE visibility = 'public' AND (start_date > NOW() or end_date > NOW()) ORDER BY start_date ASC LIMIT " + str(limitedLimit))
    events = cursor.fetchall()

    event_list = []
    for row in events:
        event_list.append(dict(zip([desc[0] for desc in cursor.description], row)))

    cursor.close()
    conn.close()

    return event_list


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
        with conn.cursor() as cursor:
            conditions = [sql.SQL("name ILIKE {name}").format(name=sql.Literal('%' + data["name"] + '%'))]
            if "priceMin" in data and data["priceMin"]:
                conditions.append(sql.SQL("pricing >= {min_price}").format(min_price=sql.Literal(data["priceMin"])))
            if "priceMax" in data and data["priceMax"]:
                conditions.append(sql.SQL("pricing <= {max_price}").format(max_price=sql.Literal(data["priceMax"])))
            if "category" in data and data["category"]:
                conditions.append(sql.SQL("category = {cat}").format(cat=sql.Literal(data["category"])))
            
            where_clause = sql.SQL(" AND ").join(conditions)
            
            sort_direction = "DESC" if data["ascending"] == False else "ASC"
            sort_type = sort_types[data["sortType"]]
            
            query = sql.SQL(
                "SELECT * FROM events WHERE {where} ORDER BY {sort_col} {direction}"
            ).format(
                    where=where_clause,
                    sort_col=sql.Identifier(sort_type),
                    direction=sql.SQL(sort_direction)
            )
            
            cursor.execute(query)
            
            rows = cursor.fetchall()
            
            column_names = [desc[0] for desc in cursor.description]
            
            return [convert_to_dict(row, column_names) for row in rows]
    
sort_types = {
    "name": "name",
    "price": "pricing",
    "date": "created_at",
}
def convert_to_dict(row, column_names):
    return {column_names[i]: row[i] for i in range(len(column_names))}
    
def get_creator_id(identity):
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
            query = """
                SELECT *
                FROM users
                WHERE email = %s
            """
            
            cursor.execute(query, (identity,))
            user = cursor.fetchone()
            
            if not user:
                return {
                    "error": "Organizer not found",
                    "code": 404
                }
                
            if user["is_org"] == False:
                return {
                    "error": "This account is not organizer account",
                    "code": 401,
                }
            
            creator_id = user["id"]
            
            return {
                "creator_id": creator_id,
                "code": 200,
            }
