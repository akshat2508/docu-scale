pipeline {

    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/akshat2508/docu-scale.git'
            }
        }

        stage('Deploy to EKS') {
            steps {
                sh 'kubectl apply -f k8s/namespace.yaml'
                sh 'kubectl apply -f k8s/postgres/'
                sh 'kubectl apply -f k8s/backend/'
                sh 'kubectl apply -f k8s/frontend/'
                sh 'kubectl rollout restart deployment backend -n docu-scale'
                sh 'kubectl rollout restart deployment frontend -n docu-scale'
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'kubectl get pods -n docu-scale'
            }
        }
    }
}