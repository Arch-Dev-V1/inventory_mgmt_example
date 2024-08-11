pipeline {
    agent any

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Branch to build')
    }

    stages {
        stage('Display Environment Variables') {
            steps {
                // Display all environment variables
                sh 'printenv'

                // Specifically display the NODEJS_HOME variable
                sh 'echo $env.NODEJS_HOME'
            }
        }
        stage('Checkout') {
            steps {
                git branch: "${params.BRANCH_NAME}", url: 'https://github.com/Arch-Dev-V1/inventory_mgmt_example.git'
            }
        }
    }

    post {
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
