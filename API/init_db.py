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
event_stat = [
    'DROP TABLE IF EXISTS events;',
    '''CREATE TABLE events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        start_date TEXT NOT NULL,
        end_date TEXT NOT NULL,
        location TEXT,
        organizer TEXT NOT NULL,
        status TEXT CHECK(status IN ('draft', 'published', 'completed')),
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );'''
]
ticket_stat = [
    'DROP TABLE IF EXISTS tickets;',
    '''CREATE TABLE tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id INTEGER NOT NULL,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        sold INTEGER DEFAULT 0,
        status TEXT CHECK(status IN ('available', 'sold_out')),
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );'''
]
payment_stat = [
    'DROP TABLE IF EXISTS payments;',
    '''CREATE TABLE payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        ticket_id INTEGER NOT NULL,
        status TEXT CHECK(status IN ('registered', 'charged', 'checked_in')),
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );'''
]
feedback_stat = [
    'DROP TABLE IF EXISTS feedback;',
    '''CREATE TABLE feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        payment_id INTEGER NOT NULL,
        rating INTEGER CHECK(rating BETWEEN 1 AND 5),
        comment TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );'''
]
table_statements = [
    account_statements, event_stat, ticket_stat, payment_stat, feedback_stat
]

for tables in table_statements:
    for statement in tables:
        print('statement: ', statement)
        c.execute(statement)
print ("database inited.")
conn.commit()
conn.close()
