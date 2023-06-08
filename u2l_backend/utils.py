import re
import pandas as pd
from openpyxl import load_workbook
from datetime import datetime
from models import *

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


def insert_user_details(email, password, first_name, last_name, user_role):
    user = user_details.query.filter_by(email=email).first()
    print('inside insert_user_details()')
    if user:
        print('user present !!')
        return
    print('creating user !!')
    current_time = datetime.utcnow()
    new_user = user_details(email, password, first_name, last_name,
                            user_role, current_time, current_time)
    db.session.add(new_user)
    db.session.commit()
