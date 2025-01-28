
# auth.py
from flask import Blueprint, jsonify, request, make_response
from request_utils import resp_json
from request_utils import check_form
from account_db import find_account_by_name, find_account_by_email, save_account, check_account


bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/test', methods=('GET', 'POST'))
def test():
    return '<h1>Register</h1>'

@bp.route('register', methods=('POST',))
def register():
    params = check_form(['name', 'email', 'password'], request)
    if params['code'] == 1:
        return resp_json(1, params['message'])
    acc = params['data']
    old = find_account_by_name(acc['name'])
    if old is not None:
        return resp_json(1, 'User name alread exists.')
    old = find_account_by_email(acc['email'])
    if old is not None:
        return resp_json(1, 'User email alread exists.')
    
    save_account(acc['name'], acc['email'], acc['password'])
    account = find_account_by_email(acc['email'])
    return resp_json(0, account)

@bp.post('login')
def login():
    params = check_form(['email', 'password'], request)
    if params['code'] == 1:
        return resp_json(1, params['message'])
    acc = params['data']
    checked = check_account(acc['email'], acc['password'])
    if checked is None:
        return resp_json(1, 'Email or password wrong.')
    else:
        return resp_json(0, checked)