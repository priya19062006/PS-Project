from flask import Flask, render_template, request
import joblib
import numpy as np
import mysql.connector

app = Flask(__name__)

# Load trained model
model = joblib.load("model.pkl")

# Iris class names
classes = ["Iris Setosa", "Iris Versicolor", "Iris Virginica"]


@app.route("/")
def home():

    conn = mysql.connector.connect(
        host="mysql",
        user="root",
        password="priya19",
        database="ml_cicd"
    )

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

    return render_template(
        "index.html",
        history=history
    )


@app.route("/predict", methods=["POST"])
def predict():

    sepal_length = float(request.form["sepal_length"])
    sepal_width = float(request.form["sepal_width"])
    petal_length = float(request.form["petal_length"])
    petal_width = float(request.form["petal_width"])

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

    # Connect MySQL
    conn = mysql.connector.connect(
        host="mysql",
        user="root",
        password="priya19",
        database="ml_cicd"
    )

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
        result
    )

    cursor.execute(sql, values)
    conn.commit()

    # Get latest history
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

    return render_template(
        "index.html",
        prediction=result,
        confidence=confidence,
        flower_image=flower_image,
        history=history
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)