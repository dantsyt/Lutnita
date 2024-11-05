pipeline {
agent {
    docker {
            image 'alpine:3.12.0'
            args '-u root'
        }
    }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Install Dependencies') {
      steps {
      sh 'npm install'
      }
    }  
  }
}
