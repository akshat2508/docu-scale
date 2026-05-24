# Phase 6 — AWS S3 Storage Integration

# Objective

The objective of this phase was to integrate Amazon S3 storage into the Docu-scale project for cloud-based file storage.

Previously, uploaded files were only processed temporarily using multer memory storage. In this phase, uploaded files were permanently stored in AWS S3 and their URLs were saved in PostgreSQL.

---

# Technologies Used

| Technology         | Purpose                      |
| ------------------ | ---------------------------- |
| Amazon S3          | Cloud object storage         |
| AWS IAM            | Permission management        |
| AWS SDK v3         | Backend S3 integration       |
| Kubernetes Secrets | Secure credential management |
| Multer             | File upload handling         |
| PostgreSQL         | File metadata storage        |

---

# Updated Upload Flow

```text
Frontend
   ↓
Express Backend
   ↓
Multer Memory Storage
   ↓
AWS S3 Upload
   ↓
Store S3 URL in PostgreSQL
```

---

# Step 1 — Create S3 Bucket

An S3 bucket was created for storing uploaded files.

## Bucket Name

```text
docu-scale-storage
```

The bucket was configured for public file access for project demonstration purposes.

---

# S# AWS CONSOLE
![alt text](screenshots/s3_dashboard.png)


---

# Step 2 — Configure Public Access

The bucket public access block settings were disabled.

## Bucket Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadAccess",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::docu-scale-storage/*"
    }
  ]
}
```

This policy enabled public access to uploaded files.



---

# Step 3 — Create IAM User

A dedicated IAM user was created for backend upload operations.

## IAM User

```text
docu-scale-s3-user
```

## IAM Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::docu-scale-storage/*"
    }
  ]
}
```

---

# S3 Bucket policy
![alt text](screenshots/s3_bucket_policy.png)

---

# Step 4 — Kubernetes Secret Configuration

AWS credentials were securely stored using Kubernetes Secrets instead of pushing them to GitHub.

## Secret Creation Command

```bash
kubectl create secret generic aws-secret \
  --from-literal=AWS_ACCESS_KEY_ID=YOUR_KEY \
  --from-literal=AWS_SECRET_ACCESS_KEY=YOUR_SECRET \
  --from-literal=AWS_REGION=eu-north-1 \
  --from-literal=AWS_BUCKET_NAME=docu-scale-storage \
  -n docu-scale
```

---

# Kubernetes secrets for s3

* Kubernetes secret creation command
* Successful secret creation output
![alt text](screenshots/secrets_ss.png)
---

# Step 5 — Backend Deployment Update

The backend deployment YAML was updated to load AWS credentials securely from Kubernetes Secrets.

## Environment Variables

```yaml
env:
  - name: AWS_ACCESS_KEY_ID
    valueFrom:
      secretKeyRef:
        name: aws-secret
        key: AWS_ACCESS_KEY_ID

  - name: AWS_SECRET_ACCESS_KEY
    valueFrom:
      secretKeyRef:
        name: aws-secret
        key: AWS_SECRET_ACCESS_KEY

  - name: AWS_REGION
    valueFrom:
      secretKeyRef:
        name: aws-secret
        key: AWS_REGION

  - name: AWS_BUCKET_NAME
    valueFrom:
      secretKeyRef:
        name: aws-secret
        key: AWS_BUCKET_NAME
```

---

# Screenshots to Add

* Backend deployment YAML
* Kubernetes deployment configuration

---

# Step 6 — Install AWS SDK

The AWS SDK for S3 integration was installed in the backend.

## Installation Command

```bash
npm install @aws-sdk/client-s3
```

---

# Step 7 — Update Backend Upload Route

The upload route was modified to upload files directly to Amazon S3.

## Features Implemented

* File upload using multer memory storage
* Upload file buffer to S3
* Generate public file URL
* Store S3 URL in PostgreSQL
* Return uploaded file URL in API response

---

# Screenshots to Add

* Updated upload route code
* Successful file upload response
* S3 uploaded objects list
* Uploaded file preview in browser

---

# Final Workflow

```text
User Uploads File
        ↓
Frontend Sends Request
        ↓
Backend Receives File
        ↓
Multer Stores File in Memory
        ↓
Backend Uploads File to S3
        ↓
S3 Generates Public File URL
        ↓
PostgreSQL Stores File URL
        ↓
Frontend Receives Uploaded File URL
```

---

# Conclusion

This phase successfully integrated AWS S3 storage into the Docu-scale platform.

The system now supports:

* Cloud-based file storage
* Secure AWS credential handling
* Public file access through S3 URLs
* Persistent file management
* Scalable object storage architecture
* Kubernetes-based secret management

This integration improved scalability, reliability, and cloud-native architecture of the application.
