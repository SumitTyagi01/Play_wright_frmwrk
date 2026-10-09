pipeline {
    agent any

    parameters {
        string(
            name: 'EMAIL_RECIPIENT',
            defaultValue: '',
            description: 'Email address to receive the Playwright test result and report'
        )
    }

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
            script {
                def reportArchive = ''
                if (fileExists('playwright-report/index.html')) {
                    if (isUnix()) {
                        sh 'tar -czf playwright-report.tar.gz -C playwright-report .'
                        reportArchive = 'playwright-report.tar.gz'
                    } else {
                        powershell '''
                            Compress-Archive -Path 'playwright-report/*' `
                                -DestinationPath 'playwright-report.zip' -Force
                        '''
                        reportArchive = 'playwright-report.zip'
                    }
                }

                archiveArtifacts(
                    artifacts: 'playwright-report/**,playwright-report.zip,playwright-report.tar.gz,allure-results/**,test-results/**',
                    allowEmptyArchive: true
                )

                if (params.EMAIL_RECIPIENT?.trim()) {
                    def emailConfig = [
                        to: params.EMAIL_RECIPIENT,
                        subject: "Playwright ${currentBuild.currentResult}: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        body: """Playwright build result: ${currentBuild.currentResult}

Job: ${env.JOB_NAME}
Build: #${env.BUILD_NUMBER}
Build URL: ${env.BUILD_URL}
HTML report: ${reportArchive ? "${env.BUILD_URL}artifact/${reportArchive}" : 'No HTML report was generated.'}

The HTML report is also attached when it was generated.
"""
                    ]
                    if (reportArchive) {
                        emailConfig.attachmentsPattern = reportArchive
                    }
                    emailext emailConfig
                } else {
                    echo 'EMAIL_RECIPIENT is empty; skipping the result email.'
                }
            }
        }
    }
}
