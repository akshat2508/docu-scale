# AWS ECR Phase — Cloud Container Registry Integration

## Objective

The objective of this phase was to transition the project from a fully local Kubernetes and Docker environment into a cloud-integrated DevOps workflow using Amazon Elastic Container Registry (ECR).

Until this phase, Kubernetes deployments relied on locally built Docker images stored inside the local Docker daemon. While this setup worked for local development and testing, it could not support production-style deployments because external Kubernetes clusters cannot access images stored on a developer’s machine.

To solve this limitation, Amazon ECR was introduced as a centralized cloud-based Docker image registry.

This phase focused on:
- AWS IAM setup
- AWS CLI configuration
- ECR repository creation
- Docker image tagging
- Docker image push workflows
- cloud image management

By the end of this phase:
- Docker images were successfully pushed to AWS ECR
- cloud-based image storage was established
- the project became ready for EKS deployment
- the architecture transitioned toward production-style cloud infrastructure

This phase marked the beginning of the cloud-native DevOps workflow.

---

## Why Amazon ECR Was Introduced

Local Docker images are only accessible from the local machine where they are built.

This creates major limitations because:
- Kubernetes clusters running in the cloud cannot access local images
- CI/CD pipelines require centralized image storage
- production deployments need globally accessible container registries
- scalable infrastructure requires standardized image repositories

Amazon Elastic Container Registry (ECR) was introduced to solve these issues.

---

## Benefits of Using ECR

### Centralized Image Storage

Docker images became centrally stored inside AWS cloud infrastructure.

---

### Cloud Deployment Readiness

ECR prepared the project for:
- AWS EKS deployment
- CI/CD integration
- automated infrastructure pipelines

---

### Secure Container Registry

ECR provides:
- authentication
- access control
- secure image storage
- AWS IAM integration

---

### Production Workflow Alignment

Using ECR aligned the project with real-world DevOps workflows used in modern cloud-native deployments.

---

## AWS IAM Setup

AWS Identity and Access Management (IAM) was configured to securely manage permissions required for ECR operations.

### IAM User Creation

A dedicated IAM user was created specifically for DevOps and CLI operations.

The IAM user was granted permissions for:
- ECR repository management
- image push operations
- AWS CLI authentication

For simplicity during development and learning, broad administrative permissions were temporarily used.

### Important DevOps Note

In production environments:
- least privilege IAM policies should be implemented
- permissions should be scoped minimally
- access should follow security best practices

This project intentionally used broader permissions to simplify learning and infrastructure setup.

---

## AWS CLI Setup

The AWS CLI was installed and configured locally to enable interaction with AWS services directly from the terminal.

### AWS CLI Installation

AWS CLI installation was verified using:

```bash
aws --version
```

---

### AWS CLI Configuration

AWS credentials were configured using:

```bash
aws configure
```

Configuration included:
- AWS Access Key
- AWS Secret Access Key
- AWS region
- output format

---

### Verification

AWS connectivity was verified using:

```bash
aws sts get-caller-identity
```

This confirmed:
- successful authentication
- valid IAM configuration
- working AWS CLI setup

---

## Amazon ECR Setup

Dedicated ECR repositories were created for storing Docker images.

### ECR Repository Responsibilities

Repositories were used to:
- store frontend images
- store backend images
- support cloud-based deployments
- enable Kubernetes image pulling

---

### Backend Repository Creation

The backend ECR repository was created using:

```bash
aws ecr create-repository --repository-name docu-backend
```

---

### Frontend Repository Creation

The frontend ECR repository was created using:

```bash
aws ecr create-repository --repository-name docu-frontend
```

---

## Docker Authentication with ECR

Docker authentication was required before pushing images to AWS ECR.

Authentication command:

```bash
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
```

This command:
- authenticated Docker with AWS ECR
- enabled secure image push operations
- established registry access

---

## Docker Image Tagging

Docker images were tagged before pushing to ECR.

### Why Tagging Was Required

Tagging connects:
- local Docker images
to:
- remote ECR repositories

Without proper tagging, Docker cannot identify the target cloud repository.

---

### Backend Image Tagging

```bash
docker tag backend-image:latest <account-id>.dkr.ecr.<region>.amazonaws.com/docu-backend:latest
```

---

### Frontend Image Tagging

```bash
docker tag frontend-image:latest <account-id>.dkr.ecr.<region>.amazonaws.com/docu-frontend:latest
```

---

## Docker Image Push

After tagging, images were pushed to AWS ECR.

### Backend Push

```bash
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/docu-backend:latest
```

---

### Frontend Push

```bash
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/docu-frontend:latest
```

---

## Cloud Image Verification

After pushing images successfully:
- repositories were verified in AWS Console
- image tags were validated
- cloud registry accessibility was confirmed

This ensured that:
- Kubernetes clusters could later pull images from ECR
- deployments would no longer depend on local Docker images

---

## Architecture Transition

This phase marked an important infrastructure transition.

### Previous Workflow

```text
Local Docker Images
    ↓
Local Kubernetes Cluster
```

### New Workflow

```text
Docker Build
    ↓
AWS ECR
    ↓
Cloud Kubernetes Deployment
```

This transition moved the project significantly closer to production-grade DevOps architecture.

---

## AWS and Docker Commands Used

### Verify AWS CLI

```bash
aws --version
```

---

### Configure AWS CLI

```bash
aws configure
```

---

### Verify AWS Identity

```bash
aws sts get-caller-identity
```

---

### Create ECR Repository

```bash
aws ecr create-repository --repository-name docu-backend
```

---

### Authenticate Docker with ECR

```bash
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
```

---

### Tag Docker Images

```bash
docker tag backend-image:latest <ecr-repository-url>
```

---

### Push Docker Images

```bash
docker push <ecr-repository-url>
```

---

## Challenges Faced

### AWS Authentication Issues

Initial authentication failures occurred because AWS credentials were incorrectly configured.

This issue was resolved by:
- reconfiguring AWS CLI credentials
- verifying IAM permissions
- validating region configuration

---

### Docker Push Authorization Errors

Docker initially failed to push images because authentication with ECR had expired.

This issue was resolved by:
- re-running ECR login commands
- refreshing Docker authentication tokens

---

### Repository Naming Mistakes

Some Docker image pushes initially failed due to incorrect ECR repository URLs and image tagging mistakes.

This issue was resolved by:
- correcting repository names
- verifying ECR repository URIs
- rebuilding image tags

---

### Region Configuration Problems

Some AWS commands initially failed because of mismatched AWS region configuration.

This issue was resolved by:
- explicitly defining AWS regions
- updating AWS CLI configuration

---

## Key Learnings

- Learned how cloud container registries work
- Understood the role of Amazon ECR in DevOps workflows
- Gained experience configuring AWS IAM users
- Learned AWS CLI authentication workflows
- Practiced Docker image tagging and cloud pushes
- Understood the difference between local and cloud image storage
- Learned how Kubernetes clusters retrieve cloud-hosted images
- Gained hands-on experience with production-style deployment workflows
- Prepared infrastructure for EKS and CI/CD integration

---

## Future Improvements

- Deploy workloads into AWS EKS
- Implement GitHub Actions CI/CD pipelines
- Introduce Jenkins automation
- Automate Docker image builds
- Add image vulnerability scanning
- Implement Infrastructure as Code
- Configure automated Kubernetes deployments

---



### AWS CLI Verification


```bash
aws sts get-caller-identity
```

---

### ECR Repository Creation


```bash
aws ecr create-repository --repository-name docu-backend
```

---

### ECR Repositories in AWS Console

- docu-backend repository
- docu-frontend repository

![alt text](./screenshots/aws_ecr_registory.png)


---

### Docker Login Success
```bash
aws ecr get-login-password --region eu-north-1 | \
docker login --username AWS --password-stdin 084847996093.dkr.ecr.eu-north-1.amazonaws.com
```

-> run this command
---

### Docker Push Success


```bash
docker push <ecr-repository-url>
```

![alt text](./screenshots/docker_build_and_push.png)


---

### Pushed Images in AWS Console

![alt text](./screenshots/aws_ecr_registory.png.png)

---



## Conclusion

This phase successfully transitioned the project from a purely local Docker workflow into a cloud-integrated container deployment architecture using Amazon ECR.

Docker images were successfully stored inside AWS cloud infrastructure, enabling future Kubernetes clusters and CI/CD pipelines to retrieve images independently of the local development environment.

Important cloud-native DevOps concepts such as IAM authentication, AWS CLI configuration, centralized image storage, Docker registry workflows, and cloud deployment preparation were explored in depth during this phase.

The completion of this phase established the foundation for future AWS EKS deployment, Jenkins integration, GitHub Actions automation, and fully automated cloud-native DevOps pipelines.