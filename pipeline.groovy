node {
    stage('Clone repository') {
        deleteDir()
        checkout scm
    }
    stage('Build'){
        sh('docker build -t precifique . --no-cache')
    }
   
    stage('Start'){
        sh('docker-compose down && docker-compose up -d')
    }
}