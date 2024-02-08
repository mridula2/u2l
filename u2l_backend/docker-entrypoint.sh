#!/bin/bash
python3 app.py &
celery -A celery_setup worker --loglevel=info -n celeryTaskWorker

