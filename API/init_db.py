#!/usr/bin/python

import sqlite3
from utils import hash_pass

conn = sqlite3.connect('app.db')
print ("database connected.")
c = conn.cursor()


account_statements = [
    'DROP TABLE IF EXISTS account;',
    '''CREATE TABLE account (
        id INTEGER PRIMARY KEY  AUTOINCREMENT,
        name TEXT NOT NULL,
        email TET NOT NULL,
        password TEXT NOT NULL
    );''',
    f"INSERT INTO account (name, email, password) VALUES ('a', 'a', '{hash_pass('a', 'a')}' );"
]
table_statements = [
    account_statements
]

for tables in table_statements:
    for statement in tables:
        print('statement: ', statement)
        c.execute(statement)
print ("database inited.")
conn.commit()
conn.close()