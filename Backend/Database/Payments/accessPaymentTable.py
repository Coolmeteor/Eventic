import psycopg2

def query_payments(user_id):
    try:
        # connect to database
        conn = psycopg2.connect(
            dbname = "evmgmt",
            user= "yi_li",
            password= "7098940",
            host= "g1evmgt.postgres.database.azure.com",
            port= "5432",
        )
        # create a cursor object
        cursor = conn.cursor()
        
        # serach require user payment records by using user_id
        query = """
        SELECT id, purchase_id, user_id, payment_method, transaction_id, status, paid_amount, created_at
        FROM payments
        WHERE user_id = %s;
        """
        cursor.execute(query, (user_id,)) 
        records = cursor.fetchall()
        print("results：")
        for record in records:
            print("Payment ID:", record[0])
            print("Purchase ID:", record[1])
            print("User ID:", record[2])
            print("Payment Method:", record[3])
            print("Transaction ID:", record[4])
            print("Status:", record[5])
            print("Paid Amount:", record[6])
            print("Created At:", record[7])
            print("-" * 40)
        if records is None:
            return []
        return records
        
        
    
    except Exception as e:
        print("查询过程中出错:", e)
    finally:
        # close cursor and stop connecting to database
        if cursor:
            cursor.close()
        if conn:
            conn.close()

def insert_payment(purchase_id, user_id, payment_method, transaction_id, paid_amount):
    try:
        conn = psycopg2.connect(
            dbname = "evmgmt",
            user= "yi_li",
            password= "7098940",
            host= "g1evmgt.postgres.database.azure.com",
            port= "5432",
        )
        cursor = conn.cursor()
        
        # example
        insert_query = """
        INSERT INTO payments (purchase_id, user_id, payment_method, transaction_id, status, paid_amount, created_at, updated_at)
        VALUES (%s, %s, %s, %s, %s, %s, NOW(), NOW());
        """
        # initial status: pending
        cursor.execute(insert_query, (purchase_id, user_id, payment_method, transaction_id, 'pending', paid_amount))
        
        
        conn.commit()
        print("insert successfully")
    
    except Exception as e:
        if conn:
            conn.rollback()  # if fail
        print("insert failed:", e)
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

if __name__ == "__main__":
    # example
    user_id_input = input("input user id to check record：")
    query_payments(user_id_input)
    
    # example: insert one payment record（changes required in the future）
    # insert_payment(2, 1, 'wechat', 'TXN123456789', 99.99)
