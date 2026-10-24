import joblib
import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

MIN_ACCURACY = 0.90  # pipeline fails if the model is worse than this


def load_model():
    return joblib.load("model.pkl")


def test_model_file_loads():
    model = load_model()
    assert hasattr(model, "predict")


def test_model_accuracy_above_threshold():
    iris = load_iris()
    _, X_test, _, y_test = train_test_split(
        iris.data, iris.target, test_size=0.2, random_state=42
    )
    accuracy = load_model().score(X_test, y_test)
    assert accuracy >= MIN_ACCURACY, f"Accuracy too low: {accuracy:.2f}"


def test_known_samples_predict_correct_class():
    model = load_model()
    samples = np.array([
        [5.1, 3.5, 1.4, 0.2],  # setosa
        [6.0, 2.9, 4.5, 1.5],  # versicolor
        [6.9, 3.1, 5.4, 2.1],  # virginica
    ])
    assert list(model.predict(samples)) == [0, 1, 2]
