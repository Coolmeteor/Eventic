import pytest
import psycopg2
from Payments.accessPaymentTable import query_payments, insert_payment 

def test_insert_and_query():
    # test data
    test_purchase_id = 2
    test_user_id = 1
    test_payment_method = 'wechat'
    test_transaction_id = 'TESTTXN12345'
    test_paid_amount = 50.00
    
    # insert test
    insert_payment(test_purchase_id, test_user_id, test_payment_method, test_transaction_id, test_paid_amount)
    
    # check whether success
    records = query_payments(test_user_id)
    # based on the returned records to find the test_transaction_id's record
    assert any(record[4] == test_transaction_id for record in records)

# def test_dummy():
#     assert True
