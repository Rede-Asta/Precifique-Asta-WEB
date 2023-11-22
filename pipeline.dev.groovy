node {
    stage('Clone repository') {
        deleteDir()
        checkout scm
    }
    stage('Build'){
        sh('docker build -t devprecifique . --no-cache')
    }
   
    stage('Start'){
        sh('docker-compose -f docker-compose.dev down && docker-compose -f docker-compose.dev up -d')
    }
}
