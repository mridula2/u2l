USERPASS = "mysql+pymysql://root:Password#123@"
BASEDIR = "localhost:3306"
DBNAME = "/u2l_db"
SQLALCHEMY_DATABASE_URI = USERPASS + BASEDIR + DBNAME
SQLALCHEMY_TRACK_MODIFICATIONS = False