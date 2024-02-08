import logging
from celery import Celery

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

celery = Celery(
    'celeryTaskWorker',
    broker='redis://localhost:6379/0',
    backend='redis://localhost:6379/0',
    include=['utils', 'tasks']
)

def init_app(app):
    celery.conf.update(
        result_expires=3600,
        task_serializer='json',
        result_serializer='json',
        accept_content=['json'],
        worker_log_level='DEBUG'
    )
    celery.conf.app = app