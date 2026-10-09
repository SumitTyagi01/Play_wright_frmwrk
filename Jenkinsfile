pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Install dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm ci'
                        sh 'npx playwright install --with-deps chromium'
                    } else {
                        bat 'npm ci'
                        bat 'npx playwright install chromium'
                    }
                }
            }
        }

        stage('Run tests for all accounts') {
            steps {
                withCredentials([string(
                    credentialsId: 'playwright-test-accounts',
                    variable: 'TEST_ACCOUNTS'
                )]) {
                    script {
                        if (isUnix()) {
                            sh 'npx playwright test'
                        } else {
                            bat 'npx playwright test'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, allure-results/**, test-results/**',
                allowEmptyArchive: true
        }
    }
}
