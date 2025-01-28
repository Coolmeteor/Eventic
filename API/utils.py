
import hashlib
import sqlite3
from flask import jsonify

def hash_pass(password, salt):
    md5_hash = hashlib.md5()
    md5_hash.update(password.encode('utf-8'))
    md5_result = md5_hash.hexdigest()

    md5_hash.update((md5_result + salt).encode('utf-8'))
    md5_result = md5_hash.hexdigest()
    return md5_result

def get_db_connect():
    conn = sqlite3.connect('app.db')
    conn.row_factory = sqlite3.Row
    return conn