import pymysql

def get_connection():
    return pymysql.connect(
        host="localhost",
        user="root",         # your MySQL username
        password="12345",  
        database="task_manager",
        cursorclass=pymysql.cursors.DictCursor
    )
