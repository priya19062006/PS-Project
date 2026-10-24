from unittest.mock import MagicMock, patch

import pytest

import app as flask_app


@pytest.fixture
def client():
    flask_app.app.config["TESTING"] = True
    return flask_app.app.test_client()


def fake_db():
    """Fake MySQL connection so tests don't need a running database."""
    conn = MagicMock()
    cursor = MagicMock()
    cursor.fetchall.return_value = []
    conn.cursor.return_value = cursor
    return conn, cursor


def test_home_page_loads(client):
    conn, _ = fake_db()
    with patch.object(flask_app.mysql.connector, "connect", return_value=conn):
        response = client.get("/")
    assert response.status_code == 200


def test_predict_returns_result_and_saves_to_db(client):
    conn, cursor = fake_db()
    form = {
        "sepal_length": "5.1",
        "sepal_width": "3.5",
        "petal_length": "1.4",
        "petal_width": "0.2",
    }
    with patch.object(flask_app.mysql.connector, "connect", return_value=conn):
        response = client.post("/predict", data=form)
    assert response.status_code == 200
    assert b"Setosa" in response.data
    conn.commit.assert_called_once()
    assert cursor.execute.called
