from flask import Flask
from flask_cors import CORS
from config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS
from controllers import authentication_controller
from models import *
from utils import insert_user_details

app = Flask(__name__)
CORS(app)

app.register_blueprint(authentication_controller)

app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = SQLALCHEMY_TRACK_MODIFICATIONS

db.init_app(app)

with app.app_context():
    db.create_all()

app.app_context().push()

insert_user_details('admin@hpe.com', 'UGFzc3dvcmRAMTIz', 'admin', 'admin', 'admin')

if __name__ == '__main__':
    app.run(debug=True)
