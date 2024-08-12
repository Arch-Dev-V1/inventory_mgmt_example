pipeline {
    agent any

    tools {
  	    nodejs 'Node-Tool'
	}
    
    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Branch to build')
    }

    stages {
        stage('Display Environment Variables') {
            steps {
                // Display all environment variables
                sh 'node --version'
                sh 'npm --version'
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
	stage('Run Tests') {
            steps {
                dir('inventory_mgmt_example/server') {
                    sh 'npm test'
                }
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
