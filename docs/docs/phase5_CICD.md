# Phase 5 — CI/CD Automation using GitHub Actions, Jenkins, ECR and EKS

# Objective

The objective of this phase was to automate the deployment lifecycle of the Docu-scale application using a complete CI/CD pipeline.

The pipeline performs the following tasks automatically:

* Detects code pushes to the GitHub repository
* Builds updated Docker images
* Pushes images to AWS Elastic Container Registry (ECR)
* Triggers Jenkins deployment pipeline automatically
* Deploys the latest version to Amazon EKS using Kubernetes
* Verifies deployment status after rollout

---

# Technologies Used

| Technology               | Purpose                          |
| ------------------------ | -------------------------------- |
| GitHub Actions           | Continuous Integration (CI)      |
| Jenkins                  | Continuous Deployment (CD)       |
| Docker                   | Containerization                 |
| Amazon ECR               | Container image registry         |
| Amazon EKS               | Kubernetes cluster               |
| kubectl                  | Kubernetes deployment management |
| NGINX Ingress Controller | External traffic routing         |
| AWS EC2                  | Jenkins hosting server           |

---

# CI/CD Architecture

```text
Developer Pushes Code
          ↓
GitHub Actions (CI)
  - Build Docker Images
  - Push Images to ECR
          ↓
Trigger Jenkins Pipeline
          ↓
Jenkins CD Pipeline
  - Apply Kubernetes Manifests
  - Restart Deployments
          ↓
Amazon EKS Cluster
          ↓
NGINX Ingress
          ↓
Public Application URL
```

---

# Step 1 — Jenkins Installation on Ubuntu EC2

The Jenkins server was hosted on an Ubuntu EC2 instance.

## Commands Used

```bash
sudo apt update && sudo apt upgrade -y

sudo apt install fontconfig openjdk-21-jdk -y

curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key | sudo tee \
/usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
/etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update

sudo apt install jenkins -y

sudo systemctl enable jenkins
sudo systemctl start jenkins
sudo systemctl status jenkins
```

---

# Screenshots to Add

* EC2 instance running
* Jenkins service status
* Jenkins initial setup page
* Jenkins dashboard
* Security Group inbound rules for port 8080

---

# Step 2 — Jenkins and EKS Authentication Setup

Initially, Jenkins failed to deploy to EKS because the Jenkins user did not have Kubernetes configuration access.

The kubeconfig and AWS credentials were copied to the Jenkins user.

## Commands Used

```bash
sudo mkdir -p /var/lib/jenkins/.kube
sudo cp /home/ubuntu/.kube/config /var/lib/jenkins/.kube/config
sudo chown -R jenkins:jenkins /var/lib/jenkins/.kube
```

AWS credentials were also copied:

```bash
sudo mkdir -p /var/lib/jenkins/.aws
sudo cp -r /home/ubuntu/.aws/* /var/lib/jenkins/.aws/
sudo chown -R jenkins:jenkins /var/lib/jenkins/.aws
```

## Verification Commands

```bash
sudo -u jenkins kubectl get nodes
sudo -u jenkins kubectl get pods -A
```

---

# Screenshots to Add

* Successful `kubectl get nodes`
* Successful `kubectl get pods -A`
* Jenkins terminal access screenshots

---

# Step 3 — Jenkins Pipeline Creation

A Jenkins Declarative Pipeline was created for deployment automation.

## Jenkinsfile

```groovy
pipeline {

    agent any

    stages {

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
```

---

# Important Issues Faced and Resolved

## 1. Jenkinsfile Case Sensitivity Issue

Problem:

Jenkins could not detect the pipeline file because the file was named `jenkinsfile` instead of `Jenkinsfile`.

Solution:

```bash
git mv jenkinsfile temp
git mv temp Jenkinsfile
```

---

## 2. Branch Configuration Error

Problem:

Jenkins attempted to checkout the `master` branch while the repository used `main`.

Solution:

Updated Jenkins pipeline branch configuration to use `main`.

---

## 3. Kubernetes Authentication Error

Problem:

Jenkins failed with:

```text
Authentication required
```

Cause:

The Jenkins user lacked Kubernetes and AWS authentication.

Solution:

Copied kubeconfig and AWS credentials to Jenkins user.

---

## 4. Deployment Not Updating

Problem:

Application UI changes were not reflected after deployment.

Cause:

Kubernetes reused cached `latest` images.

Solution:

Added:

```yaml
imagePullPolicy: Always
```

and rollout restart commands:

```bash
kubectl rollout restart deployment frontend -n docu-scale
kubectl rollout restart deployment backend -n docu-scale
```

---

# Screenshots to Add

* Jenkins pipeline configuration
* Jenkins console logs
* Successful deployment logs
* Rollout restart logs
* Failed logs and fixes (optional but recommended)

---

# Step 4 — GitHub Actions CI Workflow

GitHub Actions was used for Continuous Integration.

The workflow automatically:

* Builds frontend and backend Docker images
* Pushes images to AWS ECR
* Triggers Jenkins deployment pipeline

---

# GitHub Actions Workflow

File:

```text
.github/workflows/ci.yml
```

## Workflow Configuration

```yaml
name: Build and Push Docker Images

on:
  push:
    branches:
      - main

jobs:

  build-and-push:
    runs-on: ubuntu-latest

    steps:

      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}

      - name: Login to Amazon ECR
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build Backend Image
        run: |
          docker buildx build \
          --platform linux/amd64 \
          -t ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/docu-backend:latest \
          ./backend --load

      - name: Push Backend Image
        run: |
          docker push \
          ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/docu-backend:latest

      - name: Build Frontend Image
        run: |
          docker buildx build \
          --platform linux/amd64 \
          -t ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/docu-frontend:latest \
          ./frontend --load

      - name: Push Frontend Image
        run: |
          docker push \
          ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/docu-frontend:latest

      - name: Trigger Jenkins Deployment
        run: |
          curl -X POST "${{ secrets.JENKINS_URL }}/job/docu-scale-pipeline/build?token=deploy123" \
          --user "${{ secrets.JENKINS_USER }}:${{ secrets.JENKINS_API_TOKEN }}"
```

---

# GitHub Secrets Used

| Secret Name           | Purpose                    |
| --------------------- | -------------------------- |
| AWS_ACCESS_KEY_ID     | AWS Authentication         |
| AWS_SECRET_ACCESS_KEY | AWS Authentication         |
| AWS_REGION            | AWS Region                 |
| AWS_ACCOUNT_ID        | ECR Repository Access      |
| JENKINS_URL           | Jenkins Server URL         |
| JENKINS_USER          | Jenkins Authentication     |
| JENKINS_API_TOKEN     | Jenkins API Authentication |

---

# Screenshots to Add

* GitHub Actions workflow file
* GitHub Actions successful pipeline run
* GitHub repository secrets page
* Docker image push logs
* Jenkins automatic trigger after CI

---

# Step 5 — ECR Image Management

Docker images were stored in AWS Elastic Container Registry.

Separate repositories were maintained for:

* Backend
* Frontend

Images were automatically pushed after every commit.

---

# Screenshots to Add

* ECR repositories
* Pushed Docker images
* Image tags
* Repository details page

---

# Step 6 — Kubernetes Deployment Verification

Deployment verification was performed using Kubernetes commands.

## Commands Used

```bash
kubectl get pods -n docu-scale
kubectl get svc -A
kubectl get ingress -n docu-scale
```

---

# NGINX Ingress Load Balancer

The application was exposed publicly using the NGINX Ingress Controller.

Example Load Balancer URL:

```text
http://<aws-load-balancer-url>
```

---

# Screenshots to Add

* `kubectl get pods -n docu-scale`
* `kubectl get svc -A`
* `kubectl get ingress -n docu-scale`
* AWS ELB endpoint
* Live deployed website

---

# Final Automated Workflow

The final implementation achieved fully automated CI/CD deployment.

## Final Workflow

```text
Developer Pushes Code
          ↓
GitHub Actions Builds Images
          ↓
Docker Images Pushed to ECR
          ↓
GitHub Actions Triggers Jenkins
          ↓
Jenkins Deploys to EKS
          ↓
Kubernetes Updates Application
          ↓
Application Available Through AWS Load Balancer
```

---

# Conclusion

This phase successfully implemented a cloud-native DevOps deployment architecture using AWS services, Kubernetes orchestration, Jenkins automation, and GitHub Actions CI.

The system now supports:

* Automated container builds
* Automated image registry management
* Automated deployment to Kubernetes
* Scalable cloud-native architecture
* End-to-end CI/CD automation
* Public application exposure through AWS Load Balancer

This setup significantly reduced manual deployment effort and improved deployment reliability and scalability.
