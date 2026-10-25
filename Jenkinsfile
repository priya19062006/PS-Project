// CI/CD pipeline for: Integrating Machine Learning Model with CI/CD Pipelines
// Works on both Windows (bat) and Linux/Mac (sh) Jenkins.

// docker compose project name. Keep it equal to your project folder name
// (lowercase) so Jenkins reuses your existing mysql container and data volume.
def COMPOSE_PROJECT = 'ml-cicd-project'

def run(String cmd) {
    if (isUnix()) { sh cmd } else { bat cmd }
}

def py() {
    return isUnix() ? 'venv/bin/python' : 'venv\\Scripts\\python'
}

pipeline {
    agent any

    triggers {
        pollSCM('H/1 * * * *')
    }

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {

        // ---------------- CONTINUOUS INTEGRATION ----------------

        stage('Install Dependencies') {
            steps {
                run('python -m venv venv')
                run("${py()} -m pip install --upgrade pip")
                run("${py()} -m pip install -r requirements.txt")
            }
        }

        stage('Train Model') {
            steps {
                run("${py()} train.py")
            }
        }

        stage('Test Model & App') {
            steps {
                run("${py()} -m pytest tests -v --junitxml=test-results.xml")
            }
            post {
                always {
                    junit allowEmptyResults: true, testResults: 'test-results.xml'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                withCredentials([string(credentialsId: 'mysql-root-password', variable: 'MYSQL_ROOT_PASSWORD')]) {
                    run("docker compose -p ${COMPOSE_PROJECT} build flask-app")
                }
            }
        }

        // ---------------- CONTINUOUS DEPLOYMENT ----------------

        stage('Deploy') {
            steps {
                withCredentials([string(credentialsId: 'mysql-root-password', variable: 'MYSQL_ROOT_PASSWORD')]) {
                    run("docker compose -p ${COMPOSE_PROJECT} up -d")
                }
            }
        }

        stage('Health Check') {
            steps {
                retry(5) {
                    sleep(time: 10, unit: 'SECONDS')
                    run('curl -f http://localhost:5000/')
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline passed: model tested, image built, app deployed at http://localhost:5000'
        }
        failure {
            echo 'Pipeline failed. Check the stage logs above.'
        }
    }
}
