import re
import pandas as pd
import openpyxl
from openpyxl import load_workbook
from models import *
from datetime import datetime
import smtplib

def validate_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

def generate_workbook(df, save_location,sheet):
    book = load_workbook(save_location)
    writer = pd.ExcelWriter(save_location, engine='openpyxl') 
    writer.book = book
    writer.sheets = dict((ws.title, ws) for ws in book.worksheets)
    df.to_excel(writer, sheet_name=sheet, index=True)
    writer.save()

def sheet_transfer(source_sheet, target_sheet, startrow, startcol, source_file, dest_file):
    file = source_file
    df = pd.read_excel(file, sheet_name=source_sheet, engine='openpyxl')
    output_file = dest_file
    book = load_workbook(output_file)
    writer = pd.ExcelWriter(output_file, engine='openpyxl', mode='a')
    writer.book = book
    writer.sheets = dict((ws.title, ws) for ws in book.worksheets)
    df.to_excel(writer, sheet_name=target_sheet, index=False, startrow=startrow, startcol=startcol, header=False)
    writer.save()

def insert_user_details(email, password, first_name, last_name, user_role):
    user = user_details.query.filter_by(email=email).first()
    if user:
        return
    current_time = datetime.utcnow()
    new_user = user_details(email, password, first_name, last_name, user_role, current_time, current_time)
    db.session.add(new_user)
    db.session.commit()

def fetch_store_java_data(form_project_name, form_application_name, filepath, filepath_percentage):

    # filepath = './java_inventory_report.xlsx'
    # filepath_percentage = './java_report.xlsx'

    sheet_names = ['OS Analysis Details', 'Compilation Error Report', 'Import Class Report', 'JDK Anaylsis Details', 'Import JSP Report', 'Compilation Warning Report']
    wb = load_workbook(filename=filepath_percentage, read_only=True, data_only=True)

    no_of_artefacts = []
    count_of_ids = 0
    total_count_of_ids = 0
    for sheet_name in sheet_names:
        sheet = wb[sheet_name]
        count_of_ids = 0

        if sheet.max_row < 2:
            continue

        for row in sheet.iter_rows(min_row=2, values_only=True):
            if row[0] is not None:
                count_of_ids += 1
                total_count_of_ids +=1

        no_of_artefacts.append({sheet_name: count_of_ids})
    print(no_of_artefacts)    

    sheetName = 'Source Code Inventory'
    print('F1')
    selected_cols = ['Actual Nr of Lines', 'Nr Blank Lines', 'Nr Commented Lines', 'Total Nr LoC']
    print('F2')
    wb = openpyxl.load_workbook(filepath)
    print('F3')
    ws = wb[sheetName]
    print('F4')
    data = ws.values
    print('F5')
    cols = next(data)[0:]
    print('F6')
    df = pd.DataFrame(data, columns=cols)[selected_cols]
    print('Before Numeric')
    df = df.apply(pd.to_numeric, errors='coerce')
    column_sums = df.sum()
    print('After Numeric')
    print(df)

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
    percentage = (total_count_of_ids/total_no_of_lines) * 100
    rounded_percentage = round(percentage, 2)

    # Store each value into the database
    data_entry = java_data(
        inventory_sums_actual_nr_of_lines=column_sums['Actual Nr of Lines'],
        project_name = form_project_name,
        application_name = form_application_name,
        inventory_sums_nr_blank_lines=column_sums['Nr Blank Lines'],
        inventory_sums_nr_commented_lines=column_sums['Nr Commented Lines'],
        inventory_sums_total_nr_loc=column_sums['Total Nr LoC'],
        no_of_artefacts_os_analysis_details=no_of_artefacts[0]['OS Analysis Details'],
        no_of_artefacts_compilation_error_report=no_of_artefacts[1]['Compilation Error Report'],
        no_of_artefacts_import_class_report=no_of_artefacts[2]['Import Class Report'],
        no_of_artefacts_jdk_analysis_details=no_of_artefacts[3]['JDK Anaylsis Details'],
        no_of_artefacts_import_jsp_report=no_of_artefacts[4]['Import JSP Report'],
        no_of_artefacts_compilation_warning_report=no_of_artefacts[5]['Compilation Warning Report'],
        artefacts_count_type=counts_list[0]['Type'],
        artefacts_count_number=counts_list[0]['number'],
        percent=rounded_percentage
    )

    db.session.add(data_entry)
    db.session.commit()

def send_email(user_info):
    email_subject = 'New request for HPE Code Assessment Suite!'
    email_body = 'There has been a request for HPE Code Assessment Suite!\n\n'
    
    for key, value in user_info.items():
        email_body += f'{key.capitalize()}: {value}\n'
    
    # Connect to the email server
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()

    server.login('pratikjwani@gmail.com', 'zakxdvbnwrpjoxfb')

    email_message = f'Subject: {email_subject}\n\n{email_body}'

    # pratik-jayawant.wani@hpe.com
    # joy.pahari@hpe.com
    # mridula.krishnamurthy@hpe.com

    server.sendmail('pratikjwani@gmail.com', 'pratik-jayawant.wani@hpe.com', email_message)

    server.quit()