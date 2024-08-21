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
        always {
		script {
                def summary = "Build: ${currentBuild.result}\n" +
                              "Tests: ${env.BUILD_URL}testReport\n" +
                              "Code Analysis: ${env.BUILD_URL}sonar/"

                publishChecks name: 'Build and Test Results',
                              title: 'Build Report',
                              summary: summary,
                              text: 'Detailed build and test results',
                              conclusion: currentBuild.result == 'SUCCESS' ? 'SUCCESS' : 'FAILURE',
                              detailsURL: "${env.BUILD_URL}"
            }
            // emailext(
            //     to: 'ashutoshbhatt992@gmail.com',
            //     subject: "Build Status: ${currentBuild.result}",
            //     body: """Build Status: ${currentBuild.result}\n\nTest Results:\n${env.BUILD_URL}testReport\n\nCode Analysis Results:\n${env.BUILD_URL}sonar/""",
            //     attachLog: true,
            //     compressLog: true
            // )
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
