pipeline {
  agent any
  stages {
    steps('Checkout') {
      checkout scm
    }
  }
  stage('Install Dependencies') {
    steps {
      sh 'npm install'
    }
  }
}
