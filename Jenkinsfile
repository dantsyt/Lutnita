pipeline {
  agent any
  environment {
    NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
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
