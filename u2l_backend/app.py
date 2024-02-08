from flask import Flask
from flask_cors import CORS
from config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS
from models import *
from controllers import authentication_controller
from flask_jwt_extended import JWTManager
from utils import insert_user_details_task
from flask_sse import sse

app = Flask(__name__)
CORS(app)

app.register_blueprint(authentication_controller)
app.config['REDIS_URL'] = 'redis://localhost:6379/0'

app.register_blueprint(sse, url_prefix="/stream")

app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = SQLALCHEMY_TRACK_MODIFICATIONS

app.config["JWT_SECRET_KEY"] = "u2l-secret-key"
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600 # 30 minutes in seconds

db.init_app(app)

jwt = JWTManager(app)

with app.app_context():
    db.create_all()

app.app_context().push()

insert_user_details_task('admin@hpe.com', 'UGFzc3dvcmRAMTIz', 'admin', 'admin', 'admin')

if __name__ == '__main__':
    app.run(debug=True)
