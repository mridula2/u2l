from flask import Blueprint, jsonify, request, Response
from utils import *
from models import *
import datetime
import os
import subprocess
import shutil
import pandas as pd
from openpyxl import load_workbook
import re
import numpy as np
import zipfile
import openpyxl

authentication_controller = Blueprint('authentication', __name__)

tool_analysis_type = ''
PJHOME = ''
APNAME = ''
file_name = ''
yMD = ''
hMS = ''
hM = ''
db_username = ''
db_password_encrypt = ''

@authentication_controller.route('/login', methods=['POST'])
def authentication():
    json_data = request.get_json()
    print(json_data)
    form_email = json_data['email']
    form_password = json_data['password']

    if form_email and validate_email(form_email):
        user_data_validate = user_details.query.filter_by(email=form_email).first()
        print(user_data_validate)
        if user_data_validate:
            if user_data_validate.password == form_password:
                return jsonify({'message': 'authentication success'}), 200
            else:
                return jsonify({'message': 'authentication failed'}), 401
    else:
        return jsonify({'message': 'Invalid Email Id!'}), 401 

@authentication_controller.route('/signup', methods=['POST'])
def signup():
    json_data = request.get_json()
    print(json_data)
    form_email = json_data['email']
    form_password = json_data['password']
    form_first_name = json_data['first_name']
    form_last_name = json_data['last_name']
    form_role = json_data['role']
    roles = ["delivery", "pursuit", "customer", "admin"]
    if form_role.lower() not in roles:
      error_message = {'error' :"Invalid role type"}
      return jsonify(error_message), 404

    if form_email and validate_email(form_email):
        user_data_validate = user_details.query.filter_by(email=form_email).first()
        if user_data_validate:
            return jsonify({'message': 'Email Already Exsists !!'}), 401
        else:
            #( email, password, first_name, last_name, user_role, created_at,updated_at)
            cur_date = datetime.datetime.now()
            new_user = user_details(form_email, form_password, form_first_name, form_last_name, form_role, cur_date, cur_date)
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'message': 'SignUp Successfull'}), 200
    else:
        return jsonify({'message': 'Invalid Email Id!'}), 401

@authentication_controller.route('/analysis', methods=['POST'])
def upload():
    try:
        file = request.files['file_name']

        form_project_name = request.form['project_name']
        form_project_client = request.form['project_client']
        form_project_manager = request.form['project_manager']
        global tool_analysis_type
        tool_analysis_type = request.form['analysis_type']

        form_source_os = request.form['source_os']
        form_source_os_version = request.form['source_os_version']
        form_target_os = request.form['target_os']
        form_target_os_version = request.form['target_os_version']


        if(tool_analysis_type == 'Java'):
            tool_analysis_type = 'javaanalysis'
            form_source_jdk = request.form['source_jdk']
            form_target_jdk = request.form['target_jdk']
            form_source_jsp = request.form['source_jsp']
            form_target_jsp = request.form['target_jsp']
            form_source_servlet = request.form['source_servlet']
            form_target_servlet = request.form['target_servlet']
        elif(tool_analysis_type == 'C'):
            tool_analysis_type = 'canalysis'
            form_source_compiler = request.form['source_compiler']
            form_target_compiler = request.form['target_compiler']
            form_source_compiler_version = request.form['source_compiler_version']
            form_target_compiler_version = request.form['target_compiler_version']
            # form_source_oracle_version = request.form['source_oracle_version']
            # form_target_oracle_version = request.form['target_oracle_version']
        # elif(tool_analysis_type == 'C/C++/Pro*C'):
        #     tool_analysis_type = 'canalysis'
        #     form_source_compiler = request.form['source_compiler']
        #     form_target_compiler = request.form['target_compiler']
        #     form_source_compiler_version = request.form['source_compiler_version']
        #     form_target_compiler_version = request.form['target_compiler_version']
        #     form_source_oracle_version = request.form['source_oracle_version']
        #     form_target_oracle_version = request.form['target_oracle_version']
        elif(tool_analysis_type == 'Shell'):  
            tool_analysis_type = 'shellanalysis'
            form_source_shell = request.form['source_shell']
            form_target_shell = request.form['target_shell']
            form_source_shell_version = request.form['source_shell_version']
            form_target_shell_version = request.form['target_shell_version']


        analysis_types = ['javaanalysis', 'canalysis', 'shellanalysis']
        if tool_analysis_type not in analysis_types:
            error_message = {'error' :"Invalid analysis type"}
            return jsonify(error_message), 404

        cur_date = datetime.datetime.now()
    
        global file_name
        file_name = file.filename
        temp_tuple = os.path.splitext(file_name)
        if temp_tuple[1] != '.zip':
            error_message = {'error' :"Upload .zip files only"}
            return jsonify(error_message), 404
        file_name = temp_tuple[0]

        year_month_day = str(cur_date).split(" ")
        global yMD
        yMD = year_month_day[0].replace("-", "")

        hour_min_sec = os.path.splitext(year_month_day[1])
        global hMS
        hMS = hour_min_sec[0].replace(":", "")

        file_name = file_name + "_" + yMD + "_" + hMS 
        directory = './projects/' + file_name
        os.makedirs(directory)
        file.save(os.path.join(directory, file_name +'.zip'))

        file_size_bytes = os.stat(directory +'/'+ file_name + '.zip').st_size
        file_size_mb = round(file_size_bytes/(1024*1024), 3)

        try:
            source_dir = '/usr/u2l/u2l_backend/'
            source_dir_report = '/usr/u2l/u2l_backend/report_templates/'
            dest_dir = directory
            source_path = os.path.join(source_dir, 'U2L')
            dest_path = os.path.join(dest_dir, 'U2L')
            shutil.copytree(source_path, dest_path)  
            
            if(tool_analysis_type == 'javaanalysis'):
                source_path = os.path.join(source_dir, 'Java')
                dest_path = os.path.join(dest_dir, 'Java')
                shutil.copytree(source_path, dest_path)

                source_path = os.path.join(source_dir_report, 'java_report.xlsx')
                dest_path = os.path.join(dest_dir, 'java_report.xlsx')
                shutil.copy(source_path, dest_path)

                source_path = os.path.join(source_dir_report, 'java_inventory_report.xlsx')
                dest_path = os.path.join(dest_dir, 'java_inventory_report.xlsx')
                shutil.copy(source_path, dest_path)

            elif(tool_analysis_type == 'shellanalysis'):
                source_path = os.path.join(source_dir_report, 'shell_report.xlsx')
                dest_path = os.path.join(dest_dir, 'shell_report.xlsx')
                shutil.copy(source_path, dest_path)

                source_path = os.path.join(source_dir_report, 'shell_inventory_report.xlsx')
                dest_path = os.path.join(dest_dir, 'shell_inventory_report.xlsx')
                shutil.copy(source_path, dest_path)

            elif(tool_analysis_type == 'canalysis'):
                source_path = os.path.join(source_dir_report, 'c_report.xlsx')
                dest_path = os.path.join(dest_dir, 'c_report.xlsx')
                shutil.copy(source_path, dest_path)

                source_path = os.path.join(source_dir_report, 'c_inventory_report.xlsx')
                dest_path = os.path.join(dest_dir, 'c_inventory_report.xlsx')
                shutil.copy(source_path, dest_path)
        
        except Exception as e:
            response = jsonify({'error': str(e)})
            response.status_code = 500
            return response 

        #storing values in db project_details table
        db_project_details = project_details(form_project_name, 'admin@hpe.com', 1, form_project_client, form_project_manager, file_name, file_size_mb, 'analysis started', cur_date)
        db.session.add(db_project_details)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': 'project_details : Project name already exists'}), 409

        #storing values in db analysis_type table
        db_analysis_type = analysis_type(form_project_name, tool_analysis_type)
        db.session.add(db_analysis_type)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': 'analysis_type : Project name already exists'}), 409

        #storing values in db os_details table
        db_os_details = os_details(form_project_name, form_source_os, form_source_os_version, form_target_os, form_target_os_version)
        db.session.add(db_os_details)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': 'os_details : Project name already exists'}), 409
        
        #storing values in db analysis_status table
        analysis_start_time = datetime.datetime.now()
        analysis_end_time = datetime.datetime.now()
        db_analysis_status = analysis_status(form_project_name, db_analysis_type.id, 'admin@hpe.com', 'analysis started', file_name, file_size_mb, analysis_start_time, analysis_end_time)
        db.session.add(db_analysis_status)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': 'analysis_status : Project name already exists'}), 409

        # Execute U2LTool_Install.sh Script
        script_path = './projects/' + file_name + '/U2L/U2LTool_Install.sh'
    
        if(db_analysis_type.analysis_type == 'javaanalysis'):
            db_analysis_java = analysis_java(form_project_name, db_analysis_type.id, form_source_jdk, form_target_jdk, form_source_jsp, form_target_jsp, form_source_servlet, form_target_servlet)
            db.session.add(db_analysis_java)
            db.session.commit()
            file_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/java-vfunction_' + yMD + '_' + hMS
        elif(db_analysis_type.analysis_type == 'canalysis'):
            db_analysis_c = analysis_c(form_project_name, db_analysis_type.id, form_source_compiler, form_target_compiler, form_source_compiler_version, form_target_compiler_version, form_source_oracle_version, form_target_oracle_version)
            db.session.add(db_analysis_c)
            db.session.commit()
            file_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/c-vfunction_' + yMD + '_' + hMS
        elif(db_analysis_type.analysis_type == 'shellanalysis'):
            db_analysis_shell = analysis_shell(form_project_name, db_analysis_type.id, form_source_shell, form_target_shell, form_source_shell_version, form_target_shell_version)
            db.session.add(db_analysis_shell)
            db.session.commit()
            file_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/shell-vfunction_' + yMD + '_' + hMS

        try:
            command = ['sh', script_path, file_path, tool_analysis_type]
            process = subprocess.Popen(command, stdout=subprocess.PIPE)
            output = process.communicate()[0].decode().strip()
            lines = output.split('\n')
            print(lines)
            print('\nTool Installation Completed !!') 
        except Exception as e:
            return jsonify({'error': str(e)})

        global PJHOME
        PJHOME = lines[5].split(':')[1]
        global APNAME
        APNAME = lines[6].split(':')[1]
        
        # Export 'PJHOME' & 'APNAME' variables
        os.environ['PJHOME'] = PJHOME
        os.environ['APNAME'] = APNAME

        # Copy source code to java/c/shell analysis directory
        source_path = '/usr/u2l/u2l_backend/projects/' + file_name +'/'+ file_name + '.zip'

        try:
            if(tool_analysis_type == 'javaanalysis'):
                destination_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/java-vfunction_'+ yMD + '_' + hMS +'/work/javaanalysis/'
            elif(tool_analysis_type == 'canalysis'):
                destination_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/c-vfunction_'+ yMD + '_' + hMS +'/work/canalysis/'
            elif(tool_analysis_type == 'shellanalysis'):
                destination_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/shell-vfunction_'+ yMD + '_' + hMS +'/work/shellanalysis/'
            shutil.unpack_archive(source_path, destination_path, 'zip')
            
        except Exception as e:
            response = jsonify({'error': str(e)})
            response.status_code = 500
            return response

        # Execute U2LTool_Analysis.sh Script for c/shell analysis
        try:
            if(tool_analysis_type == 'canalysis' or tool_analysis_type == 'shellanalysis'):
                script_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/U2LTool_Analysis.sh'

                form_source_jdk = request.form.get('source_jdk', '\n')
                form_target_jdk = request.form.get('target_jdk', '\n')
                form_source_jsp = request.form.get('source_jsp', '\n')
                form_target_jsp = request.form.get('target_jsp', '\n')
                form_source_servlet = request.form.get('source_servlet', '\n')
                form_target_servlet = request.form.get('target_servlet', '\n')

                command = ['sh', script_path, PJHOME, APNAME, form_source_jdk, form_target_jdk, form_source_jsp, form_target_jsp, form_source_servlet, form_target_servlet]
                process = subprocess.Popen(command, stdout=subprocess.PIPE)
                output = process.communicate()[0].decode().strip()
                lines = output.split('\n')
                print(lines)
                print(output)
                print('\nCompleted running U2LTool_Analysis.sh')
        
        except Exception as e:
            return jsonify({'error': str(e)})
        
        # Execute U2LTool_Analysis.sh Script for java analysis
        if(tool_analysis_type == 'javaanalysis'):
            try:

                script_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/U2LTool_Analysis.sh'

                command = ['sh', script_path, PJHOME, APNAME]
                process = subprocess.Popen(command, stdout=subprocess.PIPE)
                process.wait()
                output = process.communicate()[0].decode().strip()

                print('\nCompleted running U2LTool_Analysis.sh')
            
            except Exception as e:
                return jsonify({'error': str(e)})

            # To run the javaanalysis scripts
            # Export 'PJHOME' variable
            PJHOME = '/usr/u2l/u2l_backend/projects/' + file_name + '/Java'
            os.environ['PJHOME'] = PJHOME

            # Run javaSourceDiscovery.sh scriptPassword@123

            try:
                script_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/Java/javaSourceDiscovery.sh'
                code_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/java-vfunction_'+ yMD + '_' + hMS +'/work/javaanalysis/'
                command = ['sh', script_path, code_path]
                process = subprocess.Popen(command, stdout=subprocess.PIPE)
                output = process.communicate()[0].decode().strip()
                lines = output.split('\n')
                print(lines)
                print('\nCompleted running javaSourceDiscovery.sh')
            except Exception as e:
                return jsonify({'error': str(e)})    

            # Run javaRulesScan.sh script
            try:
                script_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/Java/javaRulesScan.sh'
                code_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/java-vfunction_'+ yMD + '_' + hMS +'/work/javaanalysis/'
                command = ['sh', script_path, code_path]
                process = subprocess.Popen(command, stdout=subprocess.PIPE)
                output = process.communicate()[0].decode().strip()
                lines = output.split('\n')
                print(lines)
                print('\nCompleted running javaRulesScan.sh')
            except Exception as e:
                return jsonify({'error': str(e)})   

            # Run javaRulesRemedy.sh script
            try:
                script_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/Java/javaRulesRemedy.sh'
                code_path = '/usr/u2l/u2l_backend/projects/' + file_name + 'U2L/java-vfunction_'+ yMD + '_' + hMS +'/work/javaanalysis/'
                command = subprocess.Popen(['bash', script_path, code_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                output = command.communicate()[0].decode().strip()
                lines = output.split('\n')
                print(lines)
                print('Completed running javaRulesRemedy.sh')
            except Exception as e:
                return jsonify({'error': str(e)})

            # Run javaFrameworkScan.sh script
            try:
                script_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/Java/javaFrameworkScan.sh'
                code_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/java-vfunction_'+ yMD + '_' + hMS +'/work/javaanalysis/'
                framework_type = 'Spring'
                command = ['sh', script_path, code_path, framework_type]
                process = subprocess.Popen(command, stdout=subprocess.PIPE)
                output = process.communicate()[0].decode().strip()
                lines = output.split('\n')
                print(lines)
                print('\nCompleted running javaFrameworkScan.sh\n')
            except Exception as e:
                return jsonify({'error': str(e)})
        
            try:

                print("Moving texts files !!!")
                source_dir = '/usr/u2l/u2l_backend/'
                destination_dir = '/usr/u2l/u2l_backend/projects/' + file_name + '/'

                if not os.path.exists(source_dir):
                    return 'Source directory does not exist', 400
                if not os.path.exists(destination_dir):
                    return 'Destination directory does not exist', 400

                files_to_transfer = os.listdir(source_dir)

                for filename in files_to_transfer:
                    if os.path.isfile(os.path.join(source_dir, filename)):
                        file_extension = os.path.splitext(filename)[1]
                        if file_extension == '.txt' or not file_extension:
                            try:
                                os.rename(os.path.join(source_dir, filename), os.path.join(destination_dir, filename))
                            except FileNotFoundError:
                                continue
            except Exception as e:
                return jsonify({'error': str(e)})    

        # Converting logs into dataframes and generating reports
        try:

            if(tool_analysis_type == 'javaanalysis'):

                yyyy_mmdd = yMD[:4] + '-' + yMD[4:]
                
                # Convert javaSourceScanRemedy into .csv
                javaSourceScanRemedy = '/usr/u2l/u2l_backend/projects/' + file_name + '/javaSourceScanRemedy'
                if os.path.isfile(javaSourceScanRemedy) and os.path.getsize(javaSourceScanRemedy) > 0:
                    df = pd.read_csv(javaSourceScanRemedy, sep='\t', header=None, index_col=None, error_bad_lines=False, warn_bad_lines=True)
                    df.columns = ['RULE ID', 'FILE NAME', 'LINE NUMBER', 'REMEDY']
                    df.index = df.index + 1
                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/java_report.xlsx'

                    generate_workbook(df, save_location,'javaSourceScanRemedy')

                # Convert javaSourceCode2Remedy into .csv
                javaSourceCode2Remedy = '/usr/u2l/u2l_backend/projects/' + file_name + '/javaSourceCode2Remedy'
                if os.path.isfile(javaSourceCode2Remedy) and os.path.getsize(javaSourceCode2Remedy) > 0:
                    df = pd.read_csv(javaSourceCode2Remedy, sep='\t|:', header=None, index_col=None, error_bad_lines=False, warn_bad_lines=True)
                    df.columns = ['RULE ID', 'FILE NAME', 'LINE NUMBER', 'REMEDY']
                    df.index = df.index + 1
                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/java_report.xlsx'

                    generate_workbook(df, save_location,'javaSourceCode2Remedy')

                # Convert javaAffectedSourceInformation files into .csv
                javaAffectedSourceInformation = '/usr/u2l/u2l_backend/projects/' + file_name + '/javaAffectedSourceInformation'
                if os.path.isfile(javaAffectedSourceInformation) and os.path.getsize(javaAffectedSourceInformation) > 0:
                    df = pd.read_csv(javaAffectedSourceInformation, sep='\t', header=None, index_col=None, error_bad_lines=False, warn_bad_lines=True)
                    df.columns = ['FILE NAME', 'LINE NUMBER', 'AFFECTED CODE']
                    df.index = df.index + 1
                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/java_report.xlsx'

                    generate_workbook(df, save_location,'javaAffectedSourceInformation')
                
                # Convert javacIssue.log files into .csv
                javacIssue_dir_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/java-vfunction_'+ yMD + '_' + hMS + '/log/' + tool_analysis_type + '/java/javacLog/' + yyyy_mmdd + '/javacIssue.log'
                if os.path.isfile(javacIssue_dir_path) and os.path.getsize(javacIssue_dir_path) > 0:
                    df = pd.read_csv(javacIssue_dir_path, sep=':', header=None, index_col=None, error_bad_lines=False, warn_bad_lines=True)
                    df.columns = ['FILE NAME', 'LINE NUMBER', 'COMMAND', 'ERROR MESSAGE']
                    df.index = df.index + 1
                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/java_report.xlsx'

                    generate_workbook(df, save_location,'Compilation Error Report')

                # Convert javacWarnings.list files into .csv
                javacWarnings_dir_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/java-vfunction_'+ yMD + '_' + hMS + '/log/' + tool_analysis_type + '/java/javacLog/' + yyyy_mmdd + '/javacWarnings.list'
                if os.path.isfile(javacWarnings_dir_path) and os.path.getsize(javacWarnings_dir_path) > 0:
                    df = pd.read_csv(javacWarnings_dir_path, sep=':', header=None, index_col=None, error_bad_lines=False, warn_bad_lines=True)
                    df.index = df.index + 1
                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/java_report.xlsx'

                    generate_workbook(df, save_location,'Compilation Warning Report')

                # Convert import_lines.out
                importLines_dir_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/java-vfunction_'+ yMD + '_' + hMS + '/log/' + tool_analysis_type + '/java/import/' + yyyy_mmdd + '/import_lines.out'
                if os.path.isfile(importLines_dir_path) and os.path.getsize(importLines_dir_path) > 0:
                    df = pd.read_csv(importLines_dir_path, sep='\t', header=None, index_col=None, error_bad_lines=False, warn_bad_lines=True)
                    df.columns = ['IMPORTS', 'FILE NAME', 'LINE NUMBER']
                    df.index = df.index + 1
                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/java_report.xlsx'

                    generate_workbook(df, save_location,'Import Class Report')

                # Convert import_lines_jsp.out
                importLinesJsp_dir_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/java-vfunction_'+ yMD + '_' + hMS + '/log/' + tool_analysis_type + '/java/import/' + yyyy_mmdd + '/import_lines_jsp.out'
                if os.path.isfile(importLinesJsp_dir_path) and os.path.getsize(importLinesJsp_dir_path) > 0:
                    df = pd.read_csv(importLinesJsp_dir_path, sep='\t', header=None, index_col=None, error_bad_lines=False, warn_bad_lines=True)
                    df.index = df.index + 1
                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/java_report.xlsx'

                    generate_workbook(df, save_location,'Import JSP Report')

                # Convert OS_diff.out
                OSDiff_dir_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/java-vfunction_'+ yMD + '_' + hMS + '/log/' + tool_analysis_type + '/java/versiondiff/' + yyyy_mmdd + '/OS_diff.out'
                if os.path.isfile(OSDiff_dir_path) and os.path.getsize(OSDiff_dir_path) > 0:
                    df = pd.read_csv(OSDiff_dir_path, sep='\s+', engine='python', header=None, index_col=None, error_bad_lines=False, warn_bad_lines=True)
                    df.columns = ['Column1', 'FILE NAME', 'LINE NUMBER', 'SOURCE CODE']
                    df = df.drop(columns=['Column1'])
                    df.index = df.index + 1
                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/java_report.xlsx'

                    generate_workbook(df, save_location,'OS Analysis Details')

                # Convert jdk_diff.out
                jdkDiff_dir_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/java-vfunction_'+ yMD + '_' + hMS + '/log/' + tool_analysis_type + '/java/versiondiff/' + yyyy_mmdd + '/jdk_diff.out'
                if os.path.isfile(jdkDiff_dir_path) and os.path.getsize(jdkDiff_dir_path) > 0:
                    df = pd.read_csv(jdkDiff_dir_path, sep='\s+', engine='python', header=None, index_col=None, error_bad_lines=False, warn_bad_lines=True)
                    df = df.drop(columns=['Column1'])
                    df.index = df.index + 1
                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/java_report.xlsx'

                    generate_workbook(df, save_location,'JDK Anaylsis Details')
                
                #Source Code Inventory
                regex = r'^.*$'
                source_code_java_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/java-vfunction_'+ yMD + '_' + hMS + '/log/' + tool_analysis_type + '/Log_Source_Analysis_' + yMD + '.log'
                print(source_code_java_path)
                if os.path.isfile(source_code_java_path) and os.path.getsize(source_code_java_path) > 0:
                    
                    with open(source_code_java_path, 'r') as f:
                        data = f.read()
                    lines = data.split('\n')
                    log_entries = []
                    for line in lines:
                        match = re.match(regex, line)
                        if match:
                            log_entries.append(match.group())
                    df = pd.DataFrame(log_entries, columns=['log_message'])

                    start_str = '###########  Execution 0001_stepcounter Starts  ###########'
                    end_str = '###########  Execution 0001_stepcounter Ends ###########'
                    start_df = df[df['log_message'].str.contains(start_str)]
                    end_df = df[df['log_message'].str.contains(end_str)]

                    start_index = start_df.index[0]
                    end_index = end_df.index[0]
                    extracted_df = df.iloc[start_index+1:end_index]

                    result_df = extracted_df[extracted_df['log_message'].str.startswith('./')]
                    result_df[['Directory', 'Type', 'col2', 'Actual Nr of Lines', 'Nr Blank Lines', 'Nr Commented Lines', 'Total Nr LoC']] = result_df['log_message'].str.split(',', expand=True)
                    result_df = result_df.replace(r'^\s*$', np.nan, regex=True)
                    result_df = result_df.dropna(subset=['Actual Nr of Lines', 'Nr Blank Lines', 'Nr Commented Lines', 'Total Nr LoC'])
                    result_df = result_df.drop(['log_message', 'col2'], axis=1)
                    result_df = result_df.reset_index(drop=True)
                    result_df.index += 1

                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/java_report.xlsx'

                    generate_workbook(result_df, save_location,'Source Code Inventory')

                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/java_inventory_report.xlsx'

                    generate_workbook(result_df, save_location,'Source Code Inventory')

            elif(tool_analysis_type == 'canalysis'):

                yyyy_mmdd = yMD[:4] + '-' + yMD[4:]

                # Convert stk-YYYY-MMDD-detail.log
                stk_dir_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/c-vfunction_' + yMD + '_' + hMS + '/log/' + tool_analysis_type + '/stk/' + yyyy_mmdd + '/stk-' + yyyy_mmdd + '-detail.log'
                if os.path.isfile(stk_dir_path) and os.path.getsize(stk_dir_path) > 0:
                    df = pd.read_csv(stk_dir_path, sep=':', engine='python', header=None, index_col=None, error_bad_lines=False, warn_bad_lines=True)
                    df.index = df.index + 1
                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/c_report.xlsx'

                    generate_workbook(df, save_location,'STK Analysis Detail')

                # Convert 64bit_C_reportlog
                bitC_dir_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/c-vfunction_' + yMD + '_' + hMS + '/log/' + tool_analysis_type + '/checkanalysis/64bit_C_reportlog'
                if os.path.isfile(bitC_dir_path) and os.path.getsize(bitC_dir_path) > 0:
                    df = pd.read_csv(bitC_dir_path, sep=':', engine='python', header=None, index_col=None, error_bad_lines=False, warn_bad_lines=True)
                    df.columns = ['FILE PATH', 'LINE NUMBER', 'SOURCE CODE', 'Column4', 'Column5']
                    df = df.drop(columns=['Column4', 'Column5'])
                    df.index = df.index + 1
                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/c_report.xlsx'

                    generate_workbook(df, save_location,'64-bit Analysis Detail')

                # Convert endian_C_reportlog
                endian_dir_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/c-vfunction_' + yMD + '_' + hMS + '/log/' + tool_analysis_type + '/checkanalysis/endian_C_reportlog'
                if os.path.isfile(endian_dir_path) and os.path.getsize(endian_dir_path) > 0:
                    df = pd.read_csv(endian_dir_path, sep=':', engine='python', header=None, index_col=None, error_bad_lines=False, warn_bad_lines=True)
                    df.columns = ['FILE PATH', 'LINE NUMBER', 'SOURCE CODE']
                    df.index = df.index + 1
                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/c_report.xlsx'

                    generate_workbook(df, save_location,'Endianness Analysis Detail')

                # Convert char-array.out
                charArray_dir_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/c-vfunction_' + yMD + '_' + hMS + '/log/' + tool_analysis_type + '/charinv/' + yyyy_mmdd + '/char-array.out'
                if os.path.isfile(charArray_dir_path) and os.path.getsize(charArray_dir_path) > 0:
                    df = pd.read_csv(charArray_dir_path, sep='\t', engine='python', header=None, index_col=None, error_bad_lines=False, warn_bad_lines=True)
                    df.columns = ['FILE PATH', 'LINE NUMBER', 'SOURCE CODE']
                    df.index = df.index + 1
                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/c_report.xlsx'

                    generate_workbook(df, save_location,'String-Mem Analysis Detail')

                # Convert Log_Envcheck_CFiles_YYYY-MMDD.log
                envCheck_dir_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/c-vfunction_' + yMD + '_' + hMS + '/log/' + tool_analysis_type + '/Log_Envcheck_CFiles_' + yyyy_mmdd + '.log'
                if os.path.isfile(envCheck_dir_path) and os.path.getsize(envCheck_dir_path) > 0:
                    df = pd.read_csv(envCheck_dir_path, sep=':', engine='python', header=None, index_col=None, error_bad_lines=False, warn_bad_lines=True)
                    df.columns = ['FILE PATH', 'LINE NUMBER', 'SOURCE CODE']
                    df.index = df.index + 1
                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/c_report.xlsx'

                    generate_workbook(df, save_location,'ExecutionEnv Analysis Detail')


                #Source Code Inventory
                regex = r'^.*$'
                source_code_c_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/c-vfunction_' + yMD + '_' + hMS + '/log/' + tool_analysis_type + '/Log_Source_Analysis_' + yMD + '.log'
                if os.path.isfile(source_code_c_path) and os.path.getsize(source_code_c_path) > 0:
                    with open(source_code_c_path, 'r') as f:
                        data = f.read()
                    lines = data.split('\n')
                    log_entries = []
                    for line in lines:
                        match = re.match(regex, line)
                        if match:
                            log_entries.append(match.group())
                    df = pd.DataFrame(log_entries, columns=['log_message'])

                    start_str = '###########  Execution 0001_stepcounter Starts  ###########'
                    end_str = '###########  Execution 0001_stepcounter Ends ###########'
                    start_df = df[df['log_message'].str.contains(start_str)]
                    end_df = df[df['log_message'].str.contains(end_str)]

                    start_index = start_df.index[0]
                    end_index = end_df.index[0]
                    extracted_df = df.iloc[start_index+1:end_index]

                    result_df = extracted_df[extracted_df['log_message'].str.startswith('./')]
                    result_df[['Directory', 'Type', 'col2', 'Actual Nr of Lines', 'Nr Blank Lines', 'Nr Commented Lines', 'Total Nr LoC']] = result_df['log_message'].str.split(',', expand=True)
                    result_df = result_df.replace(r'^\s*$', np.nan, regex=True)
                    result_df = result_df.dropna(subset=['Actual Nr of Lines', 'Nr Blank Lines', 'Nr Commented Lines', 'Total Nr LoC'])
                    result_df = result_df.drop(['log_message', 'col2'], axis=1)
                    result_df = result_df.reset_index(drop=True)
                    result_df.index += 1

                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/c_report.xlsx'

                    generate_workbook(result_df, save_location,'Source Code Inventory')


                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/c_inventory_report.xlsx'

                    generate_workbook(result_df, save_location,'Source Code Inventory')

            elif(tool_analysis_type == 'shellanalysis'):
            
                yyyy_mmdd = yMD[:4] + '-' + yMD[4:]

                # Convert ksh_env_common.txt
                ksh_env_common_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/shell-vfunction_' + yMD + '_' + hMS + '/log/' + tool_analysis_type + '/shell/env/' + yyyy_mmdd + '/ksh_env_common.txt'
                if os.path.isfile(ksh_env_common_path) and os.path.getsize(ksh_env_common_path) > 0:
                    df = pd.read_csv(ksh_env_common_path, sep='\t', engine='python', header=None, index_col=None, error_bad_lines=False, warn_bad_lines=True)
                    df.columns = ['Column1', 'FILE NAME', 'LINE NUMBER', 'SOURCE CODE']
                    df = df.drop(columns=['Column1'])
                    df.index = df.index + 1
                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/shell_report.xlsx'

                    generate_workbook(df, save_location,'OS Specific ENV Var Details')

                # Convert ksh_filepath_common.txt
                ksh_filepath_common_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/shell-vfunction_' + yMD + '_' + hMS + '/log/' + tool_analysis_type + '/shell/env/' + yyyy_mmdd + '/ksh_filepath_common.txt'
                if os.path.isfile(ksh_filepath_common_path) and os.path.getsize(ksh_filepath_common_path) > 0:
                    df = pd.read_csv(ksh_filepath_common_path, sep='\t', engine='python', header=None, index_col=None, error_bad_lines=False, warn_bad_lines=True)
                    df.columns = ['Column1', 'FILE NAME', 'LINE NUMBER', 'SOURCE CODE']
                    df = df.drop(columns=['Column1'])
                    df.index = df.index + 1
                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/shell_report.xlsx'

                    generate_workbook(df, save_location,'OS Specific File Path Details')

                # Convert ksh_parsed_uniq.out
                ksh_parsed_uniq_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/shell-vfunction_' + yMD + '_' + hMS + '/log/' + tool_analysis_type + '/shell/parse/' + yyyy_mmdd + '/ksh_parsed_uniq.out'
                if os.path.isfile(ksh_parsed_uniq_path) and os.path.getsize(ksh_parsed_uniq_path) > 0:
                    df = pd.read_csv(ksh_parsed_uniq_path, sep='\t', engine='python', header=None, index_col=None, error_bad_lines=False, warn_bad_lines=True)
                    df.columns = ['Column1', 'Column2', 'COMMAND', 'Column4', 'FILE NAME', 'LINE NUMBER', 'SOURCE CODE']
                    df = df.drop(columns=['Column1', 'Column2', 'Column4'])
                    df.index = df.index + 1
                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/shell_report.xlsx'

                    generate_workbook(df, save_location,'Command and option Details')

                # Convert ksh_shebang.txt
                ksh_shebang_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/shell-vfunction_' + yMD + '_' + hMS + '/log/' + tool_analysis_type + '/shell/shebang/' + yyyy_mmdd + '/ksh_shebang.txt'
                if os.path.isfile(ksh_shebang_path) and os.path.getsize(ksh_shebang_path) > 0:
                    with open(ksh_shebang_path, 'r') as f:
                        lines = f.readlines()
                    data = []
                    prev_column1 = None
                    for line in lines:
                        split_line = line.strip().split('#!')
                        if split_line[0].strip():
                            prev_column1 = split_line[0].strip()
                        data.append([prev_column1, '#!' + split_line[1].strip() if len(split_line) > 1 else ''])
                    df = pd.DataFrame(data, columns=['column1', 'column2']).dropna()
                    df['column2'] = df.groupby(df.index // 2)['column2'].transform(lambda x: x.iloc[1])
                    df.columns = ['FILE NAME', 'SOURCE CODE']
                    df.index = df.index + 1
                    df = df.drop(df[df.index % 2 == 0].index).reset_index(drop=True)

                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/shell_report.xlsx'

                    generate_workbook(df, save_location,'Shebang Line Analysis')

                # Convert ksh_heredocument.txt
                ksh_heredocument_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/shell-vfunction_' + yMD + '_' + hMS + '/log/' + tool_analysis_type + '/shell/syntax/' + yyyy_mmdd + '/ksh_heredocument.txt'
                if os.path.isfile(ksh_heredocument_path) and os.path.getsize(ksh_heredocument_path) > 0:
                    df = pd.read_csv(ksh_heredocument_path, sep='\t', engine='python', header=None, index_col=None, error_bad_lines=False, warn_bad_lines=True)
                    df.columns = ['Column1', 'FILE NAME', 'LINE NUMBER', 'SOURCE CODE']
                    df = df.drop(columns=['Column1'])
                    df.index = df.index + 1
                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/shell_report.xlsx'

                    generate_workbook(df, save_location,'Heredoc Analysis')

                # Source Code Inventory
                regex = r'^.*$'
                source_code_shell_path = '/usr/u2l/u2l_backend/projects/' + file_name + '/U2L/shell-vfunction_' + yMD + '_' + hMS + '/log/' + tool_analysis_type + '/Log_Source_Analysis_' + yMD + '.log'
                if os.path.isfile(source_code_shell_path) and os.path.getsize(source_code_shell_path) > 0:
                    with open(source_code_shell_path, 'r') as f:
                        data = f.read()
                    lines = data.split('\n')
                    log_entries = []
                    for line in lines:
                        match = re.match(regex, line)
                        if match:
                            log_entries.append(match.group())
                    df = pd.DataFrame(log_entries, columns=['log_message'])

                    start_str = '###########  Execution 0001_stepcounter Starts  ###########'
                    end_str = '###########  Execution 0001_stepcounter Ends ###########'
                    start_df = df[df['log_message'].str.contains(start_str)]
                    end_df = df[df['log_message'].str.contains(end_str)]

                    start_index = start_df.index[0]
                    end_index = end_df.index[0]
                    extracted_df = df.iloc[start_index+1:end_index]

                    result_df = extracted_df[extracted_df['log_message'].str.startswith('./')]
                    result_df[['Directory', 'Type', 'col2', 'Actual Nr of Lines', 'Nr Blank Lines', 'Nr Commented Lines', 'Total Nr LoC']] = result_df['log_message'].str.split(',', expand=True)
                    result_df = result_df.replace(r'^\s*$', np.nan, regex=True)
                    result_df = result_df.dropna(subset=['Actual Nr of Lines', 'Nr Blank Lines', 'Nr Commented Lines', 'Total Nr LoC'])
                    result_df = result_df.drop(['log_message', 'col2'], axis=1)
                    result_df = result_df.reset_index(drop=True)
                    result_df.index += 1

                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/shell_report.xlsx'

                    generate_workbook(result_df, save_location,'Source Code Inventory')

                    save_location = '/usr/u2l/u2l_backend/projects/' + file_name + '/shell_inventory_report.xlsx'
                    
                    generate_workbook(result_df, save_location,'Source Code Inventory')

        except Exception as e:
            return jsonify({'error': str(e)})
    
    except Exception as e:
            analysis_end_time = datetime.datetime.now()
            # if db_project_details is not None:
            #     db_project_details.analysis_status = 'analysis failed'
            #     db.session.commit()
            # if db_analysis_status is not None:
            #     db_analysis_status.analysis_status = 'analysis failed'
            #     db_analysis_status.analysis_start_time = analysis_start_time
            #     db_analysis_status.analysis_end_time = analysis_end_time
            #     db.session.commit()
            return jsonify({'message': 'analysis failed', 'error': e}), 401
    
    analysis_end_time = datetime.datetime.now()
    if db_project_details is not None:
        db_project_details.analysis_status = 'analysis successful'
        db.session.commit()
    if db_analysis_status is not None:
        db_analysis_status.analysis_status = 'analysis successful'
        db_analysis_status.analysis_start_time = analysis_start_time
        db_analysis_status.analysis_end_time = analysis_end_time
        db.session.commit()
    return jsonify({'message': 'analysis successful'}), 200

@authentication_controller.route('/projects/<query_email>', methods=['GET']) #{email}
def projects(query_email):
    
    query = project_details.query.filter_by(email=query_email)
    json_project_details = []
    for row in query.all():
        row_dict = {}
        for column in row.__table__.columns:
            row_dict[column.name] = str(getattr(row, column.name))
        json_project_details.append(row_dict)

    return jsonify({'project_details': json_project_details}), 200

@authentication_controller.route('/report/<query_project_name>', methods=['GET']) #{project_name} excel reports zip
def report(query_project_name):

    query = project_details.query.filter_by(project_name=query_project_name, email='admin@hpe.com')
    print(query.first().file_name)
    fileName = query.first().file_name

    query = analysis_type.query.filter_by(project_name=query_project_name)
    analysisType = query.first().analysis_type
    print(analysisType)

    if analysisType == 'javaanalysis':      
        file1_path = '/usr/u2l/u2l_backend/projects/'+ fileName +'/java_inventory_report.xlsx'
        file2_path = '/usr/u2l/u2l_backend/projects/'+ fileName +'/java_report.xlsx'
    elif analysisType == 'canalysis':
        file1_path = '/usr/u2l/u2l_backend/projects/'+ fileName +'/c_inventory_report.xlsx'
        file2_path = '/usr/u2l/u2l_backend/projects/'+ fileName +'/c_report.xlsx'
    elif analysisType == 'shellanalysis':
        file1_path = '/usr/u2l/u2l_backend/projects/'+ fileName +'/shell_inventory_report.xlsx'
        file2_path = '/usr/u2l/u2l_backend/projects/'+ fileName +'/shell_report.xlsx'

    if not os.path.exists(file1_path):
        return 'File 1 not found', 404
    if not os.path.exists(file2_path):
        return 'File 2 not found', 404
    
    zip_buffer = zipfile.ZipFile('files.zip', 'w', zipfile.ZIP_DEFLATED)
    zip_buffer.write(file1_path, os.path.basename(file1_path))
    zip_buffer.write(file2_path, os.path.basename(file2_path))
    zip_buffer.close()

    os.chmod('files.zip', 0o777)

    return Response(
        open('files.zip', 'rb').read(),
        # mimetype='application/zip',
        headers={
            'Content-Disposition': 'attachment;filename=files.zip',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/zip',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
    )

@authentication_controller.route('/configuration/<query_file_name>', methods=['GET'])
def export_configuration_file(query_file_name):

    if query_file_name == 'Code Delivery Guidelines-V0.4':      
        file_path = '/usr/u2l/u2l_backend/media/'+ query_file_name +'.docx'
    if query_file_name == 'HPE U2L Questionnaire-light':      
        file_path = '/usr/u2l/u2l_backend/media/'+ query_file_name +'.xls'

    if not os.path.exists(file_path):
        return 'File not found', 404
    
    zip_buffer = zipfile.ZipFile('files.zip', 'w', zipfile.ZIP_DEFLATED)
    zip_buffer.write(file_path, os.path.basename(file_path))
    zip_buffer.close()

    os.chmod('files.zip', 0o777)

    return Response(
        open('files.zip', 'rb').read(),
        # mimetype='application/zip',
        headers={
            'Content-Disposition': 'attachment;filename=files.zip',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/zip',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
    )    

@authentication_controller.route('/pdf/<query_project_name>', methods=['GET']) #{project_name} pdf generation
def pdf(query_project_name):

    query = project_details.query.filter_by(project_name=query_project_name)
    json_project_details = []
    for row in query.all():
        row_dict = {}
        for column in row.__table__.columns:
            row_dict[column.name] = str(getattr(row, column.name))
        json_project_details.append(row_dict)

    fileName = query.first().file_name

    query = os_details.query.filter_by(project_name=query_project_name)
    json_os_details = []
    for row in query.all():
        row_dict = {}
        for column in row.__table__.columns:
            row_dict[column.name] = str(getattr(row, column.name))
        json_os_details.append(row_dict)

    query = analysis_type.query.filter_by(project_name=query_project_name)
    json_analysis_type = []
    for row in query.all():
        row_dict = {}
        for column in row.__table__.columns:
            row_dict[column.name] = str(getattr(row, column.name))
        json_analysis_type.append(row_dict)

    analysisType = query.first().analysis_type
    print(analysisType)
    sheetName = 'Source Code Inventory'
    selected_cols = ['Actual Nr of Lines', 'Nr Blank Lines', 'Nr Commented Lines', 'Total Nr LoC']

    if analysisType == 'javaanalysis':      
        filepath = '/usr/u2l/u2l_backend/projects/'+ fileName +'/java_inventory_report.xlsx'
        filepath_percentage = '/usr/u2l/u2l_backend/projects/'+ fileName +'/java_report.xlsx'

        sheet_names = ['OS Analysis Details', 'Compilation Error Report', 'Import Class Report', 'JDK Anaylsis Details', 'Import JSP Report', 'Compilation Warning Report']
        wb = load_workbook(filename=filepath_percentage, read_only=True, data_only=True)
        sheets = [wb[sheet_name] for sheet_name in sheet_names]
        count_of_ids = 0
        for sheet in sheets:
            if sheet.max_row < 2:
                continue
            for row in sheet.iter_rows(min_row=2, values_only=True):
                if row[0] is not None:
                    count_of_ids += 1

    elif analysisType == 'canalysis':
        filepath = '/usr/u2l/u2l_backend/projects/'+ fileName +'/c_inventory_report.xlsx'
        filepath_percentage = '/usr/u2l/u2l_backend/projects/'+ fileName +'/c_report.xlsx'

        sheet_names = ['STK Analysis Detail', '64-bit Analysis Detail', 'Endianness Analysis Detail', 'String-Mem Analysis Detail', 'ExecutionEnv Analysis Detail']
        wb = load_workbook(filename=filepath_percentage, read_only=True, data_only=True)
        sheets = [wb[sheet_name] for sheet_name in sheet_names]
        count_of_ids = 0
        for sheet in sheets:
            if sheet.max_row < 2:
                continue
            for row in sheet.iter_rows(min_row=2, values_only=True):
                if row[0] is not None:
                    count_of_ids += 1

    elif analysisType == 'shellanalysis':
        filepath = '/usr/u2l/u2l_backend/projects/'+ fileName +'/shell_inventory_report.xlsx'
        filepath_percentage = '/usr/u2l/u2l_backend/projects/'+ fileName +'/shell_report.xlsx'

        sheet_names = ['OS Specific ENV Var Details', 'OS Specific File Path Details', 'Command and option Details', 'Shebang Line Analysis', 'Heredoc Analysis']
        wb = load_workbook(filename=filepath_percentage, read_only=True, data_only=True)
        sheets = [wb[sheet_name] for sheet_name in sheet_names]
        count_of_ids = 0
        for sheet in sheets:
            if sheet.max_row < 2:
                continue
            for row in sheet.iter_rows(min_row=2, values_only=True):
                if row[0] is not None:
                    count_of_ids += 1

    wb = openpyxl.load_workbook(filepath)
    ws = wb[sheetName]
    data = ws.values
    cols = next(data)[0:]
    df = pd.DataFrame(data, columns=cols)[selected_cols]
    df = df.apply(pd.to_numeric, errors='coerce')
    column_sums = df.sum()


    sheetName = 'Source Code Inventory'
    selected_cols = ['Type']
    wb = openpyxl.load_workbook(filepath)
    ws = wb[sheetName]
    data = ws.values
    cols = next(data)[0:]
    df = pd.DataFrame(data, columns=cols)[selected_cols]
    type_counts = df['Type'].value_counts().reset_index()
    counts = type_counts.rename(columns={'index': 'Type', 'Type': 'number'})
    counts_list = counts.to_dict('records')

    total_no_of_lines = column_sums['Total Nr LoC']
    percentage = (count_of_ids/total_no_of_lines) * 100
    rounded_percentage = round(percentage, 2)

    return jsonify({'project_details': json_project_details, 'os_details': json_os_details, 'analysis_type': json_analysis_type, 'chart1': column_sums.to_dict(), 'chart2' : counts_list, 'percent' : rounded_percentage}), 200    
