from sqlalchemy import create_engine

USERPASS = "mysql+pymysql://root:Password#123@"
BASEDIR = "localhost:3306"
DBNAME = "/u2l_db"
SQLALCHEMY_DATABASE_URI = USERPASS + BASEDIR  + DBNAME
SQLALCHEMY_TRACK_MODIFICATIONS = False

engine = create_engine(SQLALCHEMY_DATABASE_URI)
engine.execute("CREATE DATABASE IF NOT EXISTS {}".format('u2l_db'))

database_exists = engine.dialect.has_schema(engine, DBNAME)

if database_exists:
    print("Database already exists.")
else:
    print("Database does not exist.")

