import os
import time

import mysql.connector


def connect_to_mysql():
    db_name = os.environ.get("MYSQL_DATABASE", "ml_cicd")
    config = {
        "host": os.environ.get("MYSQL_HOST", "mysql"),
        "port": int(os.environ.get("MYSQL_PORT", "3306")),
        "user": os.environ.get("MYSQL_USER", "root"),
        "password": os.environ.get("MYSQL_PASSWORD", ""),
    }

    for attempt in range(30):
        try:
            conn = mysql.connector.connect(**config)
            cursor = conn.cursor()
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{db_name}`")
            conn.commit()
            cursor.close()
            conn.close()

            db_config = {**config, "database": db_name}
            conn = mysql.connector.connect(**db_config)
            cursor = conn.cursor()
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS predictions (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    sepal_length FLOAT,
                    sepal_width FLOAT,
                    petal_length FLOAT,
                    petal_width FLOAT,
                    prediction VARCHAR(100)
                )
                """
            )
            conn.commit()
            cursor.close()
            conn.close()
            print("MySQL Database & Table Created Successfully!")
            return
        except mysql.connector.Error:
            if attempt == 29:
                raise
            time.sleep(2)


connect_to_mysql()
