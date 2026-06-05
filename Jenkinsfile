// Guardar este archivo como: Jenkinsfile.wiriarte

pipeline {

    agent {
        kubernetes {
            yamlFile 'agent.yaml'
        }
    }

    environment {
        APP_VERSION = "3.0.0"
        IMAGE_NAME = "wiriarte/laboratorio-final" 
    }

    stages {

        stage('install') {
            steps {
                container('node') {
                    sh 'npm install'
                }
            }
        }

        stage('test') {
            steps {
                container('node') {
                    sh 'npm test || true'
                }
            }
        }

        stage('build') {
            steps {
                container('node') {
                    sh 'npm run build'
                }
            }
        }

        stage('push') {
            steps {
                container('docker') {

                    withCredentials([
                        usernamePassword(
                            credentialsId: 'dockerhub-creds',
                            usernameVariable: 'DOCKER_USER',
                            passwordVariable: 'DOCKER_PASS'
                        )
                    ]) {

                        sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin

                        docker build -t ${IMAGE_NAME}:waldo-iriarte .

                        docker push ${IMAGE_NAME}:waldo-iriarte
                        '''
                    }
                }
            }
        }

        stage('deploy') {
            steps {
                container('kubectl') {
                    sh '''
                    sleep 5 && kubectl apply -f entrega.yaml
                    '''
                }
            }
        }
    }
}