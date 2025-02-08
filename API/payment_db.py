from utils import get_db_connect

def save_payment(user_id, ticket_id):
    with get_db_connect() as conn:
        cursor = conn.cursor()
        sql = 'INSERT INTO payments (user_id, ticket_id, status) values (?,?,?)'
        cursor.execute(sql, (user_id, ticket_id, 'registered'))
        conn.commit()

        last_row_id = cursor.lastrowid
        print(f"Last inserted payment row ID: {last_row_id}")

        # search saved data
        cursor.execute("SELECT * FROM payments WHERE id = ?", (last_row_id,))
        row = cursor.fetchone()
        return dict(row)


def get_payment_info(id):
    with get_db_connect() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * from payments where id = ?", [id])
        row = cursor.fetchone()
        if row is None:
            return None
    return dict(row)  

def charge_payment(id):
    with get_db_connect() as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE payments SET status='charged' where id = ?", [id])
        conn.commit()

def check_in_payment(id):
    with get_db_connect() as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE payments SET status='checked_in' where id = ?", [id])
        conn.commit()