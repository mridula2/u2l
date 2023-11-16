# Use CentOS as the base image
FROM centos:7
USER root

ENV LC_CTYPE=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8

# Install Python
RUN yum install -y python3 python3-pip python3-devel

# Install additional dependencies
RUN yum install -y java-11-openjdk \
    dos2unix ksh perl unzip \
    make automake gcc gcc-c++ kernel-devel \
    python3-setuptools
RUN yum install -y unzip tar gzip curl
RUN yum install -y file
RUN java -version

RUN mkdir -p /usr/u2l/u2l_backend


COPY . /usr/u2l/u2l_backend/

WORKDIR /usr/u2l/u2l_backend
RUN chmod -R 777 .
RUN pip3 install --no-cache-dir --upgrade pip setuptools wheel
RUN pip3 install --no-cache-dir --upgrade -r requirements.txt

RUN pip3 install celery redis

CMD ["celery", "-A", "celery_setup", "worker", "--loglevel=info", "-n", "celeryTaskWorker"]

