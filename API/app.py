from flask import render_template
from flask_swagger_ui import get_swaggerui_blueprint

import bp_auth
import bp_event
import bp_ticket
import bp_payment

from app_base import app

# Config Swagger UI
SWAGGER_URL = '/api/docs'
API_URL = 'http://127.0.0.1:5000/static/openapi.yaml'
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "System API"
    },
)

@swaggerui_blueprint.get('source')
def index():
    with open('static/openapi.yaml', 'r', encoding='utf-8') as f:
        yaml_content = f.read()
    
    return render_template('yaml.html', yaml_content=yaml_content)


app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

app.register_blueprint(bp_auth.bp)
app.register_blueprint(bp_event.bp)
app.register_blueprint(bp_ticket.bp)
app.register_blueprint(bp_payment.bp)

