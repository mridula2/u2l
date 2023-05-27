import re
import pandas as pd
from openpyxl import load_workbook

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
