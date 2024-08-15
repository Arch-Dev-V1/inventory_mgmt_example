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
                //git branch: "${params.BRANCH_NAME}", url: 'https://github.com/Arch-Dev-V1/inventory_mgmt_example.git'
		checkout scm
            }
        }
	stage('Install Dependencies') {
            steps {
                 sh 'npm install'
            }
        }
	stage('Run Tests') {
            steps {
                sh 'npm test'
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
