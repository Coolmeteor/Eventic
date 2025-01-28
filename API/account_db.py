
import sqlite3
from utils import hash_pass
from utils import get_db_connect

conn = sqlite3.connect('app.db')

c = conn.cursor()

def clear_user(info):
    if 'password' in info:
        del info['password']
    return info

def find_account(name, email):
    account = find_account_by_name(name)
    if account is None:
        return find_account_by_email(email)
    else:
        return account

def find_account_by_name(name, clear = True):
    with get_db_connect() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, email, password FROM account where name = ?", [name])
        row = cursor.fetchone()
        if row is None:
            return None
    account = dict(row)
    print('name account', account)
    if clear:
        return clear_user(account)
    return account

def find_account_by_email(email, clear = True):
    with get_db_connect() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, email, password FROM account where email = ?", [email])
        row = cursor.fetchone()
        if row is None: 
            return None
    account = dict(row)
    print('email account', account)
    if clear:
        return clear_user(account)
    return account

def save_account(name, email, password):
    with get_db_connect() as conn:
        cursor = conn.cursor()
        sql = 'INSERT INTO account (name, email, password) values (?, ?, ?)'
        cursor.execute(sql, (name, email, hash_pass(password, email)))
        conn.commit()

def check_account(email, password):
    acc = find_account_by_email(email, False)
    if acc is None:
        return None
    password_hash = hash_pass(password, email)
    if password_hash != acc['password']:
        return None
    return clear_user(acc)