# Phase 1 — Local Development Environment Setup

## Objective

The objective of this phase was to establish a stable and reproducible local development environment for the full-stack application before moving into containerization and orchestration. This phase focused on setting up all required development tools, frameworks, and dependencies needed for backend development, frontend development, database integration, and Kubernetes-based deployment preparation.

A strong local development setup is an essential part of modern DevOps workflows because it ensures consistency across environments and reduces configuration-related issues during deployment. This phase also served as the foundation for future Dockerization, Kubernetes orchestration, cloud deployment, and CI/CD automation.

The setup process included installation and configuration of development tools such as Docker, Kubernetes CLI tools, Node.js runtime, package managers, and source control systems. Additionally, the frontend and backend applications were configured and verified locally to ensure proper communication between services before proceeding to containerization.

This phase established the base architecture and development workflow for the entire project lifecycle.

---

## Project Architecture Overview

The application follows a modern full-stack architecture consisting of a frontend client application, a backend REST API server, and a PostgreSQL database for persistent data storage.

### Architecture Components

- Frontend Application
  - Built using Next.js
  - Responsible for rendering the user interface
  - Handles client-side interactions and API communication

- Backend Application
  - Built using Node.js and Express.js
  - Provides REST API endpoints
  - Handles authentication, business logic, and database communication

- Database
  - PostgreSQL database used for persistent storage
  - Stores application data and relational records

- Kubernetes and Docker Preparation
  - Local Kubernetes environment prepared for orchestration
  - Docker setup prepared for containerization workflow

The frontend communicates with the backend using HTTP APIs, while the backend communicates with PostgreSQL for database operations.

---

## Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| Node.js | Backend runtime environment |
| Express.js | REST API framework |
| PostgreSQL | Relational database |
| Docker | Containerization platform |
| Kubernetes | Container orchestration |
| kubectl | Kubernetes cluster management |
| Git | Version control |
| GitHub | Source code hosting |
| Docker Desktop | Local container runtime |
| Minikube / Kind | Local Kubernetes cluster |

---

## Environment Setup

### Node.js Installation

Node.js was installed to support both frontend and backend JavaScript runtime execution. The installation was verified using terminal commands to ensure the correct runtime version was available.

### Docker Installation

Docker Desktop was installed to provide local container runtime support. Docker enables packaging applications and dependencies into portable containers, ensuring consistency across environments.

Docker installation was verified using the following command:

```bash
docker --version
```

### Kubernetes CLI Setup

The Kubernetes command-line utility `kubectl` was installed to manage Kubernetes resources and interact with the local Kubernetes cluster.

Verification command:

```bash
kubectl version --client
```

### Local Kubernetes Cluster Setup

A local Kubernetes cluster was configured using Minikube/Kind to simulate a production-style orchestration environment on the local machine.

The cluster setup enabled:
- Pod management
- Service communication
- Deployment orchestration
- Namespace isolation
- Replica scaling

### Git and GitHub Setup

Git was configured for source control management and connected to a GitHub repository for version tracking and collaboration.

---

## Local Application Execution

After completing environment setup, both frontend and backend applications were executed locally to verify successful configuration.

### Backend Execution

The backend server was started using Node.js and verified through API testing.

Backend responsibilities included:
- Handling API requests
- Managing database communication
- Serving application logic

### Frontend Execution

The frontend application was started using the Next.js development server and accessed through the browser.

Frontend responsibilities included:
- Rendering user interfaces
- Consuming backend APIs
- Managing client-side routing

### Database Connectivity Verification

Database connections were tested to ensure successful communication between the backend application and PostgreSQL.

---

## Commands Used

### Verify Node.js

```bash
node -v
npm -v
```

### Verify Docker

```bash
docker --version
docker ps
```

### Verify Kubernetes Tools

```bash
kubectl version --client
```

### Start Frontend

```bash
npm run dev
```

### Start Backend

```bash
npm start
```

### Verify Kubernetes Cluster

```bash
kubectl get nodes
```

---

## Challenges Faced

Several challenges were encountered during the environment setup phase.

### Dependency Version Conflicts

Some packages required specific runtime versions, leading to dependency mismatches during installation. This issue was resolved by aligning package versions and reinstalling dependencies.

### Docker Runtime Issues

Initial Docker setup issues occurred due to Docker Desktop startup failures and daemon initialization delays. Restarting Docker services and verifying system permissions resolved the issue.

### Kubernetes Context Configuration

The Kubernetes CLI initially pointed to incorrect contexts, preventing cluster communication. The issue was resolved by reconfiguring the active Kubernetes context.

### Port Conflicts

Some services attempted to use ports already occupied by other applications running locally. Port mappings were adjusted to resolve conflicts.

---

## Key Learnings

- Understood the importance of reproducible local development environments
- Learned how frontend and backend services communicate in a full-stack architecture
- Gained experience configuring Docker and Kubernetes development tools
- Learned how local Kubernetes clusters simulate production orchestration environments
- Practiced troubleshooting dependency conflicts and runtime configuration issues
- Understood the role of containerization preparation in DevOps workflows

---

## Future Improvements

- Move from local development execution to fully containerized deployment
- Automate setup using Docker Compose and shell scripts
- Integrate cloud-native infrastructure services
- Implement CI/CD pipelines for automated deployment workflows
- Introduce Infrastructure as Code practices for environment provisioning





```bash
docker --version
```

### Kubernetes Verification

```bash
kubectl get nodes
```

### Frontend Running

![alt text](./screenshots/frontend.png)
### Backend Logs

![alt text](./screenshots/backend.png)


---

## Conclusion

This phase successfully established the foundational development environment required for the project. All required tools, frameworks, and services were installed and verified successfully. The frontend, backend, and database systems were configured for local execution, creating a stable base for future containerization and Kubernetes orchestration phases.

The completion of this phase enabled the transition into Docker-based containerization and later cloud-native deployment workflows.