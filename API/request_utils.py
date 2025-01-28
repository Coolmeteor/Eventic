from flask import request, jsonify


def resp_data(code, data):
    return {'code':code, 'data':data}
def resp_json(code, data):
    return jsonify({'code':code, 'data':data})


def check_json(param_list, req, method='POST'):
    data = req.get_json()
    if data is None:
        return {'code':1, 'message':'Param is required.'}
    params = {}
    for param in param_list:
        value = data.get(param)
        if value is None:
            return {'code':1, 'message':f'Param {param} is required.'}
        else:
            params[param] = value
    return resp_data(0, params)


def check_form(param_list, req, method='POST'):
    params = {}
    for param in param_list:
        value = request.form.get(param)
        if value is None:
            return {'code':1, 'message':f'Param {param} is required.'}
        else:
            params[param] = value
    return resp_data(0, params)