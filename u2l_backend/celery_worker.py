from celery_setup import celery, init_app
from utils import testing_task
from flask import Flask

app = Flask(__name__)

if __name__ == '__main__':
    init_app(app)
    celery.worker_main()
