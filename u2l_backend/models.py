from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import UniqueConstraint

db = SQLAlchemy()

class user_details(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    user_role = db.Column(db.String(50))
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    def __init__(self, email, password, first_name, last_name, user_role, created_at,updated_at):
        self.email = email
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.user_role = user_role
        self.created_at = created_at
        self.updated_at = updated_at

class project_details(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_name = db.Column(db.String(50), nullable=False)
    application_name = db.Column(db.String(50), nullable=False)
    task_id = db.Column(db.String(200))
    email = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('user_details.id'))
    project_client = db.Column(db.String(50))
    project_manager = db.Column(db.String(50))
    file_name = db.Column(db.String(50))
    file_size = db.Column(db.Float)
    analysis_status = db.Column(db.String(50))
    created_at = db.Column(db.DateTime)
    user_details = db.relationship('user_details', backref=db.backref('project_details', lazy=True))

    __table_args__ = (
    UniqueConstraint('project_name', 'application_name'),
    )

    def __init__(self, project_name,application_name, task_id, email, user_id, project_client, project_manager, file_name, file_size, analysis_status, created_at):
        self.project_name = project_name
        self.application_name = application_name
        self.task_id = task_id
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
    project_name = db.Column(db.String(50), nullable=False)
    application_name = db.Column(db.String(50), nullable=False)
    source_os = db.Column(db.String(50))
    source_os_version = db.Column(db.String(50))
    target_os = db.Column(db.String(50))
    target_os_version = db.Column(db.String(50))

    __table_args__ = (
    UniqueConstraint('project_name', 'application_name'),
    )
    
    def __init__(self, project_name, application_name, source_os, source_os_version, target_os, target_os_version):
        self.project_name = project_name
        self.application_name = application_name
        self.source_os = source_os
        self.source_os_version = source_os_version
        self.target_os = target_os
        self.target_os_version = target_os_version

class analysis_type(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_name = db.Column(db.String(50), nullable=False)
    application_name = db.Column(db.String(50), nullable=False)
    analysis_type = db.Column(db.String(50))

    __table_args__ = (
    UniqueConstraint('project_name', 'application_name'),
    )
    
    def __init__(self, project_name, application_name, analysis_type):
        self.project_name = project_name
        self.application_name = application_name
        self.analysis_type = analysis_type

class analysis_java(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_name = db.Column(db.String(50), nullable=False)
    application_name = db.Column(db.String(50), nullable=False)
    analysis_id = db.Column(db.Integer, db.ForeignKey('analysis_type.id'))
    source_jdk = db.Column(db.String(50))
    target_jdk = db.Column(db.String(50))
    source_jsp = db.Column(db.String(50))
    target_jsp = db.Column(db.String(50))
    source_servlet = db.Column(db.String(50))
    target_servlet = db.Column(db.String(50))
    analysis_type = db.relationship('analysis_type', backref=db.backref('analysis_java', lazy=True))
    
    __table_args__ = (
    UniqueConstraint('project_name', 'application_name'),
    )

    def __init__(self, project_name, application_name, analysis_id, source_jdk, target_jdk, source_jsp, target_jsp, source_servlet, target_servlet):
        self.project_name = project_name
        self.application_name = application_name
        self.analysis_id = analysis_id
        self.source_jdk = source_jdk
        self.target_jdk = target_jdk
        self.source_jsp = source_jsp
        self.target_jsp = target_jsp
        self.source_servlet = source_servlet
        self.target_servlet = target_servlet

class analysis_c(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_name = db.Column(db.String(50), nullable=False)
    application_name = db.Column(db.String(50), nullable=False)
    analysis_id = db.Column(db.Integer, db.ForeignKey('analysis_type.id'))
    source_compiler = db.Column(db.String(50))
    target_compiler = db.Column(db.String(50))
    source_compiler_version = db.Column(db.String(50))
    target_compiler_version = db.Column(db.String(50))
    source_pre_compiler = db.Column(db.String(50))
    target_pre_compiler = db.Column(db.String(50))
    source_pre_compiler_version = db.Column(db.String(50))
    target_pre_compiler_version = db.Column(db.String(50))
    analysis_type = db.relationship('analysis_type', backref=db.backref('analysis_c', lazy=True))
    
    __table_args__ = (
    UniqueConstraint('project_name', 'application_name'),
    )

    def __init__(self, project_name, application_name, analysis_id, source_compiler, target_compiler, source_compiler_version, target_compiler_version, source_pre_compiler, target_pre_compiler, source_pre_compiler_version, target_pre_compiler_version):
        self.project_name = project_name
        self.application_name = application_name
        self.analysis_id = analysis_id
        self.source_compiler = source_compiler
        self.target_compiler = target_compiler
        self.source_compiler_version = source_compiler_version
        self.target_compiler_version = target_compiler_version
        self.source_pre_compiler = source_pre_compiler
        self.target_pre_compiler = target_pre_compiler
        self.source_pre_compiler_version = source_pre_compiler_version
        self.target_pre_compiler_version = target_pre_compiler_version

class analysis_shell(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_name = db.Column(db.String(50), nullable=False)
    application_name = db.Column(db.String(50), nullable=False)
    analysis_id = db.Column(db.Integer, db.ForeignKey('analysis_type.id'))
    source_shell = db.Column(db.String(50))
    target_shell = db.Column(db.String(50))
    source_shell_version = db.Column(db.String(50))
    target_shell_version = db.Column(db.String(50))
    analysis_type = db.relationship('analysis_type', backref=db.backref('analysis_shell', lazy=True))

    __table_args__ = (
    UniqueConstraint('project_name', 'application_name'),
    )

    def __init__(self, project_name, application_name, analysis_id, source_shell, target_shell, source_shell_version, target_shell_version):
        self.project_name = project_name
        self.application_name = application_name
        self.analysis_id = analysis_id
        self.source_shell = source_shell
        self.target_shell = target_shell
        self.source_shell_version = source_shell_version
        self.target_shell_version = target_shell_version

class analysis_status(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_name = db.Column(db.String(50), nullable=False)
    application_name = db.Column(db.String(50), nullable=False)
    analysis_id = db.Column(db.String(50))
    email = db.Column(db.String(50))
    analysis_status = db.Column(db.String(50))
    file_name = db.Column(db.String(50))
    file_size = db.Column(db.Integer)
    analysis_start_time = db.Column(db.DateTime)
    analysis_end_time = db.Column(db.DateTime)

    __table_args__ = (
    UniqueConstraint('project_name', 'application_name'),
    )

    def __init__(self, project_name, application_name, analysis_id, email, analysis_status, file_name, file_size, analysis_start_time, analysis_end_time):
        self.project_name = project_name
        self.application_name = application_name
        self.analysis_id = analysis_id
        self.email = email
        self.analysis_status = analysis_status
        self.file_name = file_name
        self.file_size = file_size
        self.analysis_start_time = analysis_start_time
        self.analysis_end_time = analysis_end_time                          

class source_code_inventory(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_name = db.Column(db.String(50), nullable=False)
    application_name = db.Column(db.String(50), nullable=False)
    artefact_type = db.Column(db.String(50))
    no_of_artefacts = db.Column(db.String(50))
    no_of_loc = db.Column(db.String(50))
    total_lines = db.Column(db.String(50))

    def __init__(self, project_name, application_name, artefact_type, no_of_artefacts, no_of_loc, total_lines):
        self.project_name = project_name
        self.application_name = application_name
        self.artefact_type = artefact_type
        self.no_of_artefacts = no_of_artefacts
        self.no_of_loc = no_of_loc
        self.total_lines = total_lines

class migration_summary(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_name = db.Column(db.String(50), nullable=False)
    application_name = db.Column(db.String(50), nullable=False)
    no_of_artefacts = db.Column(db.String(50))
    artefacts_impacted = db.Column(db.String(50))
    no_of_loc = db.Column(db.String(50))
    lines_impacted = db.Column(db.String(50))

    def __init__(self, project_name, application_name, no_of_artefacts, artefacts_impacted, no_of_loc, lines_impacted):
        self.project_name = project_name
        self.application_name = application_name
        self.no_of_artefacts = no_of_artefacts
        self.artefacts_impacted = artefacts_impacted
        self.no_of_loc = no_of_loc
        self.lines_impacted = lines_impacted

class artefacts_summary(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_name = db.Column(db.String(50), nullable=False)
    application_name = db.Column(db.String(50), nullable=False)
    migration_area = db.Column(db.String(50))
    no_of_artefacts = db.Column(db.String(50))
    no_of_loc = db.Column(db.String(50))

    def __init__(self, project_name, application_name, migration_area, no_of_artefacts, no_of_loc):
        self.project_name = project_name
        self.application_name = application_name
        self.migration_area = migration_area
        self.no_of_artefacts = no_of_artefacts
        self.no_of_loc = no_of_loc

class java_data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_name = db.Column(db.String(50))
    application_name = db.Column(db.String(50))
    inventory_sums_actual_nr_of_lines = db.Column(db.Integer)
    inventory_sums_nr_blank_lines = db.Column(db.Integer)
    inventory_sums_nr_commented_lines = db.Column(db.Integer)
    inventory_sums_total_nr_loc = db.Column(db.Integer)
    no_of_artefacts_os_analysis_details = db.Column(db.Integer)
    no_of_artefacts_compilation_error_report = db.Column(db.Integer)
    no_of_artefacts_import_class_report = db.Column(db.Integer)
    no_of_artefacts_jdk_analysis_details = db.Column(db.Integer)
    no_of_artefacts_import_jsp_report = db.Column(db.Integer)
    no_of_artefacts_compilation_warning_report = db.Column(db.Integer)
    artefacts_count_type = db.Column(db.String(50))
    artefacts_count_number = db.Column(db.Integer)
    percent = db.Column(db.Float)

    __table_args__ = (
    UniqueConstraint('project_name', 'application_name'),
    )

class contact_us(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(50))
    contact_number = db.Column(db.String(50))
    message = db.Column(db.String(50))
    created_at = db.Column(db.DateTime)

    def __init__(self, first_name, last_name, email, contact_number, message, created_at):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.contact_number = contact_number
        self.message = message
        self.created_at = created_at

class analysis_summary_java(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_name = db.Column(db.String(50))
    application_name = db.Column(db.String(50))
    compilation_warning_na = db.Column(db.Integer)
    compilation_warning_nl = db.Column(db.Integer)
    os_analysis_na = db.Column(db.Integer)
    os_analysis_nl = db.Column(db.Integer)
    source_scan_remedy_na = db.Column(db.Integer)
    source_scan_remedy_nl = db.Column(db.Integer)
    affected_framework_na = db.Column(db.Integer)
    affected_framework_nl = db.Column(db.Integer)
    nr_of_artefacts = db.Column(db.Integer)
    imapacted_artefacts = db.Column(db.Integer)
    nr_of_loc = db.Column(db.Integer)
    impacted_nr_of_loc = db.Column(db.Integer)

    def __init__(self, project_name, application_name, compilation_warning_na, compilation_warning_nl, os_analysis_na, os_analysis_nl, source_scan_remedy_na, source_scan_remedy_nl, affected_framework_na, affected_framework_nl, nr_of_artefacts, imapacted_artefacts, nr_of_loc, impacted_nr_of_loc):
        self.project_name = project_name
        self.application_name = application_name
        self.compilation_warning_na = compilation_warning_na
        self.compilation_warning_nl = compilation_warning_nl
        self.os_analysis_na = os_analysis_na
        self.os_analysis_nl = os_analysis_nl
        self.source_scan_remedy_na = source_scan_remedy_na
        self.source_scan_remedy_nl = source_scan_remedy_nl
        self.affected_framework_na = affected_framework_na
        self.affected_framework_nl = affected_framework_nl
        self.nr_of_artefacts = nr_of_artefacts
        self.imapacted_artefacts = imapacted_artefacts
        self.nr_of_loc = nr_of_loc
        self.impacted_nr_of_loc = impacted_nr_of_loc

class celery_job_details(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_name = db.Column(db.String(50))
    application_name = db.Column(db.String(50))
    task_id = db.Column(db.String(100))
    task_status = db.Column(db.String(20))
    task_logs = db.Column(db.String(500))

    def __init__(self, project_name, application_name, task_id, task_status, task_logs):
        self.project_name = project_name
        self.application_name = application_name
        self.task_id = task_id
        self.task_status = task_status
        self.task_logs = task_logs

class celery_logs(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    task_id = db.Column(db.String(100))
    task_status = db.Column(db.String(20))
    task_log = db.Column(db.String(500))

    def __init__(self, task_id, task_status, task_log):
        self.task_id = task_id
        self.task_status = task_status
        self.task_log = task_log        

class MiddlewareComponent(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    key = db.Column(db.String(255), unique=True, nullable=False)
    middleware_component = db.Column(db.String(255), nullable=False)
    stack = db.Column(db.String(50), nullable=False)
    stack_current_version = db.Column(db.String(50), nullable=False)
    stack_upgraded_version = db.Column(db.String(50), nullable=False)
    recommendation = db.Column(db.Text)

    def __init__(self, key, middleware_component, stack, stack_current_version, stack_upgraded_version, recommendation):
        self.key = key
        self.middleware_component = middleware_component
        self.stack = stack
        self.stack_current_version = stack_current_version
        self.stack_upgraded_version = stack_upgraded_version
        self.recommendation = recommendation

class Package(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    url = db.Column(db.String(200))
    versions = db.relationship('Version', backref='package', lazy=True, cascade="all, delete-orphan", passive_deletes=True)

class Version(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    version = db.Column(db.String(20))
    package_id = db.Column(db.Integer, db.ForeignKey('package.id', ondelete='CASCADE'), nullable=False)  