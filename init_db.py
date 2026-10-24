import mysql.connector

conn = mysql.connector.connect(
    host="localhost",      # Agar Windows MySQL use karna ho
    user="root",
    password="priya19",
)

cursor = conn.cursor()

cursor.execute("CREATE DATABASE IF NOT EXISTS ml_cicd")
cursor.execute("USE ml_cicd")

cursor.execute("""
CREATE TABLE IF NOT EXISTS predictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sepal_length FLOAT,
    sepal_width FLOAT,
    petal_length FLOAT,
    petal_width FLOAT,
    prediction VARCHAR(100)
)
""")

conn.commit()

cursor.close()
conn.close()

print("MySQL Database & Table Created Successfully!")