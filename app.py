import os
import time
from math import isfinite

from flask import Flask, render_template, request
import joblib
import mysql.connector
import numpy as np

app = Flask(__name__)


def get_db_config():
    return {
        "host": os.environ.get("MYSQL_HOST", "mysql"),
        "port": int(os.environ.get("MYSQL_PORT", "3306")),
        "user": os.environ.get("MYSQL_USER", "root"),
        "password": os.environ.get("MYSQL_PASSWORD", ""),
        "database": os.environ.get("MYSQL_DATABASE", "ml_cicd"),
    }


def ensure_database_ready():
    db_name = os.environ.get("MYSQL_DATABASE", "ml_cicd")
    config = get_db_config()
    server_config = {k: v for k, v in config.items() if k != "database"}

    for attempt in range(30):
        try:
            conn = mysql.connector.connect(**server_config)
            cursor = conn.cursor()
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{db_name}`")
            conn.commit()
            cursor.close()
            conn.close()

            conn = mysql.connector.connect(**config)
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
            return
        except mysql.connector.Error:
            if attempt == 29:
                raise
            time.sleep(2)


# Load trained model
model = joblib.load("model.pkl")

# Iris class names
classes = ["Iris Setosa", "Iris Versicolor", "Iris Virginica"]
measurement_ranges = {
    "sepal_length": (4.3, 7.9),
    "sepal_width": (2.0, 4.4),
    "petal_length": (1.0, 6.9),
    "petal_width": (0.1, 2.5),
}


@app.route("/")
def home():
    history = []

    try:
        conn = mysql.connector.connect(**get_db_config())
        cursor = conn.cursor()

        cursor.execute("""
            SELECT
            sepal_length,
            sepal_width,
            petal_length,
            petal_width,
            prediction
            FROM predictions
            ORDER BY id DESC
            LIMIT 10
        """)

        history = cursor.fetchall()

        cursor.close()
        conn.close()
    except mysql.connector.Error:
        history = []

    return render_template(
        "index.html",
        history=history
    )


@app.route("/predict", methods=["POST"])
def predict():

    try:
        measurements = [
            float(request.form[field])
            for field in measurement_ranges
        ]
    except (KeyError, ValueError):
        return render_template(
            "index.html",
            error="Enter numeric measurements within Iris ranges.",
        ), 400

    if not all(
        isfinite(value) and minimum <= value <= maximum
        for value, (minimum, maximum) in zip(
            measurements, measurement_ranges.values()
        )
    ):
        return render_template(
            "index.html",
            error=(
                "Measurements must be within Iris ranges: sepal length 4.3-7.9 cm, "
                "sepal width 2.0-4.4 cm, petal length 1.0-6.9 cm, "
                "and petal width 0.1-2.5 cm."
            ),
        ), 400

    sepal_length, sepal_width, petal_length, petal_width = measurements

    # Prepare input
    features = np.array([[sepal_length, sepal_width, petal_length, petal_width]])

    # Predict
    prediction = model.predict(features)[0]
    result = classes[prediction]

    # Flower image
    if result == "Iris Setosa":
        flower_image = "images/setosa.jpg"
    elif result == "Iris Versicolor":
        flower_image = "images/versicolor.jpg"
    else:
        flower_image = "images/virginica.jpg"

    # Confidence
    probability = model.predict_proba(features)
    confidence = round(np.max(probability) * 100, 2)

    history = []

    try:
        conn = mysql.connector.connect(**get_db_config())
        cursor = conn.cursor()

        sql = """
        INSERT INTO predictions
        (sepal_length, sepal_width, petal_length, petal_width, prediction)
        VALUES (%s, %s, %s, %s, %s)
        """

        values = (
            sepal_length,
            sepal_width,
            petal_length,
            petal_width,
            result,
        )

        cursor.execute(sql, values)
        conn.commit()

        cursor.execute("""
            SELECT
            sepal_length,
            sepal_width,
            petal_length,
            petal_width,
            prediction
            FROM predictions
            ORDER BY id DESC
            LIMIT 10
        """)

        history = cursor.fetchall()

        cursor.close()
        conn.close()
    except mysql.connector.Error:
        history = []

    return render_template(
        "index.html",
        prediction=result,
        confidence=confidence,
        flower_image=flower_image,
        history=history
    )


if __name__ == "__main__":
    ensure_database_ready()
    app.run(host="0.0.0.0", port=5000, debug=True)