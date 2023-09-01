from celery import Celery

celery = Celery(
    'celeryTaskWorker',
    broker='redis://localhost:6379/0',
    backend='redis://localhost:6379/0',
    include=['utils']
)
celery.conf.update(
    result_expires=3600,
    task_serializer='json',
    result_serializer='json',
    accept_content=['json'],
    worker_log_level='DEBUG'
)
