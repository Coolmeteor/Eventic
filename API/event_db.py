from utils import get_db_connect


def save_event(event):
    e = event
    with get_db_connect() as conn:
        cursor = conn.cursor()
        sql = 'INSERT INTO events (name, description, start_date, end_date, location, organizer, status) values (?,?,?,?,?,?,?)'
        cursor.execute(sql, (e['name'], e['description'], e['start_date'], e['end_date'], e['location'], e['organizer'], 'draft'))
        conn.commit()

        last_row_id = cursor.lastrowid
        print(f"Last inserted event row ID: {last_row_id}")

        # search saved data
        cursor.execute("SELECT * FROM events WHERE id = ?", (last_row_id,))
        row = cursor.fetchone()
        return dict(row)

def publish_event(id):
    with get_db_connect() as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE events SET status='published' where id = ?", [id])
        conn.commit()

def search_event(name):
    with get_db_connect() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * from events where name like ?", [f'%{name}%'])
        rows = cursor.fetchall()
    events = []
    for row in rows:
        events.append(dict(row))
    return events