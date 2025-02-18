import psycopg2
from config import DB_CONFIG

def get_db_connection():
    """ 获取数据库连接 """
    conn = psycopg2.connect(**DB_CONFIG)
    return conn
