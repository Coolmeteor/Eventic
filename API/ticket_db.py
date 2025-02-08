from utils import get_db_connect

def save_ticket(ticket):
    e = ticket
    with get_db_connect() as conn:
        cursor = conn.cursor()
        sql = 'INSERT INTO tickets (event_id, price, quantity, status) values (?,?,?,?)'
        cursor.execute(sql, (e['event_id'], e['price'], e['quantity'], 'available'))
        conn.commit()

        last_row_id = cursor.lastrowid
        print(f"Last inserted ticket row ID: {last_row_id}")

        # search saved data
        cursor.execute("SELECT * FROM tickets WHERE id = ?", (last_row_id,))
        row = cursor.fetchone()
        return dict(row)
    
def get_ticket_info(id):
    with get_db_connect() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * from tickets where id = ?", [id])
        row = cursor.fetchone()
        if row is None:
            return None
    return dict(row)