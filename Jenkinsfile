pipeline {
    agent any

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Branch to build')
    }

    environment {
        NODEJS_HOME = tool name: 'Node-Tool', type: 'NodeJSInstallation'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
        SONARQUBE_SCANNER_HOME = tool name: 'SonarQube Scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
    }

    stages {
        stage('Display Environment Variables') {
            steps {
                // Display all environment variables
                sh 'printenv'

                // Specifically display the NODEJS_HOME variable
                sh 'echo $NODEJS_HOME'
                sh 'echo $PATH'
            }
        }
        stage('Checkout') {
            steps {
                git branch: "${params.BRANCH_NAME}", url: 'https://github.com/Arch-Dev-V1/inventory_mgmt_example.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                dir('inventory_mgmt_example/server') {
                    sh 'npm install'
                }
            }
        }
        stage('Log Tests') {
            steps {
                dir('inventory_mgmt_example/server') {
                    sh 'npm test'
                }
            }
        }
    }

    post {
        always {
             node("Record Tests") {
                // Ensure the 'junit' step runs in a proper context with a valid FilePath
                junit 'reports/**/*.xml'
                archiveArtifacts artifacts: '**/target/*.jar', allowEmptyArchive: true
                cleanWs()
            }
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
