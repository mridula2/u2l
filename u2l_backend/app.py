from flask import Flask
from flask_cors import CORS
from config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS
from models import *
from controllers import authentication_controller
from flask_jwt_extended import JWTManager
from utils import insert_user_details_task

app = Flask(__name__)
CORS(app)

app.register_blueprint(authentication_controller)

app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = SQLALCHEMY_TRACK_MODIFICATIONS

app.config["JWT_SECRET_KEY"] = "u2l-secret-key"

db.init_app(app)

jwt = JWTManager(app)

with app.app_context():
    db.create_all()

app.app_context().push()

insert_user_details_task('admin@hpe.com', 'UGFzc3dvcmRAMTIz', 'admin', 'admin', 'admin')

if __name__ == '__main__':
    app.run(debug=True)
