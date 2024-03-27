FROM mysql
RUN chown -R mysql:root /var/lib/mysql/


ENV MYSQL_DATABASE=$MYSQL_DATABASE
ENV MYSQL_USER=$MYSQL_USER
ENV MYSQL_PASSWORD=$MYSQL_PASSWORD
ENV MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD

ADD data.sql /etc/mysql/data.sql
RUN sed -i \
        -e  's/MYSQL_DATABASE/'$MYSQL_DATABASE'/g' \
        -e  's/MYSQL_USER/'$MYSQL_USER'/g'  \
        -e  's/MYSQL_PASSWORD/'$MYSQL_PASSWORD'/g' \
        /etc/mysql/data.sql 
RUN cp /etc/mysql/data.sql /docker-entrypoint-initdb.d

EXPOSE 3306