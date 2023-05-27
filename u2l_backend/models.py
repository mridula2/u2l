from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class user_details(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    user_role = db.Column(db.String(50))
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    def __init__(self, email, password, user_role, created_at,updated_at):
        self.email = email
        self.password = password
        self.user_role = user_role
        self.created_at = created_at
        self.updated_at = updated_at

class project_details(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_name = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('user_details.id'))
    project_client = db.Column(db.String(50))
    project_manager = db.Column(db.String(50))
    file_name = db.Column(db.String(50))
    file_size = db.Column(db.Float)
    analysis_status = db.Column(db.String(50))
    created_at = db.Column(db.DateTime)
    user_details = db.relationship('user_details', backref=db.backref('project_details', lazy=True))

    def __init__(self, project_name, email, user_id, project_client, project_manager, file_name, file_size, analysis_status, created_at):
        self.project_name = project_name
        self.email = email
        self.user_id = user_id
        self.project_client = project_client
        self.project_manager = project_manager
        self.file_name = file_name
        self.file_size = file_size
        self.analysis_status = analysis_status
        self.created_at = created_at

class os_details(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_name = db.Column(db.String(50), unique=True, nullable=False)
    source_os = db.Column(db.String(50))
    source_os_version = db.Column(db.String(50))
    target_os = db.Column(db.String(50))
    target_os_version = db.Column(db.String(50))
    
    def __init__(self, project_name, source_os, source_os_version, target_os, target_os_version):
        self.project_name = project_name
        self.source_os = source_os
        self.source_os_version = source_os_version
        self.target_os = target_os
        self.target_os_version = target_os_version

class analysis_type(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_name = db.Column(db.String(50), unique=True, nullable=False)
    analysis_type = db.Column(db.String(50))
    
    def __init__(self, project_name, analysis_type):
        self.project_name = project_name
        self.analysis_type = analysis_type

class analysis_java(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_name = db.Column(db.String(50), unique=True, nullable=False)
    analysis_id = db.Column(db.Integer, db.ForeignKey('analysis_type.id'))
    source_jdk = db.Column(db.String(50))
    target_jdk = db.Column(db.String(50))
    source_jsp = db.Column(db.String(50))
    target_jsp = db.Column(db.String(50))
    source_servlet = db.Column(db.String(50))
    target_servlet = db.Column(db.String(50))
    analysis_type = db.relationship('analysis_type', backref=db.backref('analysis_java', lazy=True))
    

    def __init__(self, project_name, analysis_id, source_jdk, target_jdk, source_jsp, target_jsp, source_servlet, target_servlet):
        self.project_name = project_name
        self.analysis_id = analysis_id
        self.source_jdk = source_jdk
        self.target_jdk = target_jdk
        self.source_jsp = source_jsp
        self.target_jsp = target_jsp
        self.source_servlet = source_servlet
        self.target_servlet = target_servlet

class analysis_c(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_name = db.Column(db.String(50), unique=True, nullable=False)
    analysis_id = db.Column(db.Integer, db.ForeignKey('analysis_type.id'))
    source_compiler = db.Column(db.String(50))
    target_compiler = db.Column(db.String(50))
    source_compiler_version = db.Column(db.String(50))
    target_compiler_version = db.Column(db.String(50))
    source_oracle_version = db.Column(db.String(50))
    target_oracle_version = db.Column(db.String(50))
    analysis_type = db.relationship('analysis_type', backref=db.backref('analysis_c', lazy=True))
    

    def __init__(self, project_name, analysis_id, source_compiler, target_compiler, source_compiler_version, target_compiler_version, source_oracle_version, target_oracle_version):
        self.project_name = project_name
        self.analysis_id = analysis_id
        self.source_compiler = source_compiler
        self.target_compiler = target_compiler
        self.source_compiler_version = source_compiler_version
        self.target_compiler_version = target_compiler_version
        self.source_oracle_version = source_oracle_version
        self.target_oracle_version = target_oracle_version

class analysis_shell(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_name = db.Column(db.String(50), unique=True, nullable=False)
    analysis_id = db.Column(db.Integer, db.ForeignKey('analysis_type.id'))
    source_shell = db.Column(db.String(50))
    target_shell = db.Column(db.String(50))
    source_shell_version = db.Column(db.String(50))
    target_shell_version = db.Column(db.String(50))
    analysis_type = db.relationship('analysis_type', backref=db.backref('analysis_shell', lazy=True))

    def __init__(self, project_name, analysis_id, source_shell, target_shell, source_shell_version, target_shell_version):
        self.project_name = project_name
        self.analysis_id = analysis_id
        self.source_shell = source_shell
        self.target_shell = target_shell
        self.source_shell_version = source_shell_version
        self.target_shell_version = target_shell_version

class analysis_status(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_name = db.Column(db.String(50), unique=True, nullable=False)
    analysis_id = db.Column(db.String(50))
    email = db.Column(db.String(50))
    analysis_status = db.Column(db.String(50))
    file_name = db.Column(db.String(50))
    file_size = db.Column(db.Integer)
    analysis_start_time = db.Column(db.DateTime)
    analysis_end_time = db.Column(db.DateTime)

    def __init__(self, project_name, analysis_id, email, analysis_status, file_name, file_size, analysis_start_time, analysis_end_time):
        self.project_name = project_name
        self.analysis_id = analysis_id
        self.email = email
        self.analysis_status = analysis_status
        self.file_name = file_name
        self.file_size = file_size
        self.analysis_start_time = analysis_start_time
        self.analysis_end_time = analysis_end_time                          

