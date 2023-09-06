from celery_setup import celery
from utils import testing_task

if __name__ == '__main__':
    celery.worker_main()
