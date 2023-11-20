node {
    stage('Clone repository') {
        deleteDir()
        checkout scm
    }
    stage('Build'){
        sh('docker build -t fase2 . --no-cache')
    }
   
    stage('Start'){
        sh('docker-compose -f docker-composefase2.yml down && docker-compose -f docker-composefase2.yml up -d')
    }
}