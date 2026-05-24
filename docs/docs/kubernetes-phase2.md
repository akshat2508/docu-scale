# Kubernetes Phase 2 — Backend, PostgreSQL, and Multi-Service Kubernetes Architecture

## Objective

The objective of this phase was to expand the Kubernetes environment from a single frontend deployment into a complete multi-service architecture consisting of frontend, backend, and PostgreSQL services.

This phase focused on implementing production-style Kubernetes orchestration concepts such as:
- namespace isolation
- backend deployments
- PostgreSQL deployments
- Kubernetes Services
- internal pod communication
- backend-database networking
- operational debugging workflows

While the previous phase focused mainly on Kubernetes fundamentals and frontend deployment, this phase introduced realistic distributed system communication inside Kubernetes.

The primary goals of this phase included:
- deploying backend services into Kubernetes
- deploying PostgreSQL inside the cluster
- enabling backend-postgres communication
- organizing resources using namespaces
- practicing operational debugging
- understanding Kubernetes internal networking

By the end of this phase:
- all application services were deployed successfully
- backend services communicated with PostgreSQL internally
- workloads were isolated using namespaces
- Kubernetes Services enabled service discovery
- debugging and operational workflows were established

This phase closely resembled real-world Kubernetes deployment practices used in production DevOps environments.

---

## Multi-Service Kubernetes Architecture

The Kubernetes cluster now contained multiple interconnected services.

### Architecture Components

### Frontend Deployment

The frontend deployment handled:
- user interface rendering
- browser communication
- API interaction with backend services

The frontend application was exposed externally using a NodePort Service.

---

### Backend Deployment

The backend deployment handled:
- REST API requests
- business logic execution
- database communication
- application processing

The backend service communicated internally with PostgreSQL using Kubernetes Services and DNS-based service discovery.

---

### PostgreSQL Deployment

The PostgreSQL deployment provided:
- relational database functionality
- persistent application storage
- structured query handling

The PostgreSQL service remained internally accessible within the cluster using ClusterIP networking.

---

### Kubernetes Services

Services were used to:
- expose deployments
- provide stable networking endpoints
- enable pod communication
- support service discovery

---

## Namespace Configuration

A dedicated Kubernetes namespace was introduced to isolate all project resources.

### Why Namespaces Were Used

Namespaces improve:
- workload organization
- resource isolation
- operational clarity
- cluster maintainability

The namespace created for the project was:

```text
docu-scale
```

Namespace creation command:

```bash
kubectl create namespace docu-scale
```

Namespace verification:

```bash
kubectl get namespaces
```

All Kubernetes resources were deployed inside this namespace.

---

## Backend Deployment

The backend service was deployed using Kubernetes Deployment manifests.

### Backend Deployment Responsibilities

The deployment handled:
- backend pod creation
- replica management
- automatic recovery
- workload orchestration

Backend deployment verification:

```bash
kubectl get deployments -n docu-scale
```

Detailed deployment inspection:

```bash
kubectl describe deployment backend -n docu-scale
```

---

## PostgreSQL Deployment

PostgreSQL was deployed as a Kubernetes-managed workload.

### PostgreSQL Responsibilities

The PostgreSQL deployment handled:
- relational data storage
- persistent application data
- backend query execution

PostgreSQL pods were verified using:

```bash
kubectl get pods -n docu-scale
```

---

## Kubernetes Services

Kubernetes Services enabled communication between workloads.

### Service Types Used

### ClusterIP Service

ClusterIP was used for:
- backend-postgres communication
- internal networking
- secure service communication

The PostgreSQL service remained internal to the cluster.

---

### NodePort Service

NodePort was used to:
- expose frontend services externally
- enable browser access
- support local Kubernetes testing

Service verification:

```bash
kubectl get svc -n docu-scale
```

---

## Backend-PostgreSQL Communication

One of the most important objectives of this phase was establishing communication between the backend API and PostgreSQL database inside Kubernetes.

### Internal Kubernetes Networking

Kubernetes automatically provides:
- internal DNS resolution
- service discovery
- stable networking endpoints

Instead of using localhost, the backend connected to PostgreSQL using the Kubernetes Service name.

Example:

```text
postgres-service
```

This allowed:
- reliable service communication
- scalable networking
- pod replacement resilience
- dynamic infrastructure support

---

## Pod Communication

Kubernetes networking enabled communication between Pods across deployments.

### Communication Flow

```text
Frontend Pod
    ↓
Backend Service
    ↓
PostgreSQL Service
```

This architecture simulated production-style distributed application communication.

---

## kubectl Commands Used

### View Pods

```bash
kubectl get pods -n docu-scale
```

### View Services

```bash
kubectl get svc -n docu-scale
```

### View Deployments

```bash
kubectl get deployments -n docu-scale
```

### Apply Kubernetes Resources

```bash
kubectl apply -f .
```

### View Pod Logs

```bash
kubectl logs <pod-name> -n docu-scale
```

### Describe Pods

```bash
kubectl describe pod <pod-name> -n docu-scale
```

### Execute Commands Inside Pods

```bash
kubectl exec -it <pod-name> -n docu-scale -- sh
```

### Delete Resources

```bash
kubectl delete -f .
```

---

## Operational Debugging

Operational debugging became a major focus during this phase.

Several kubectl commands were used to troubleshoot:
- backend connectivity issues
- PostgreSQL startup failures
- pod crashes
- service exposure problems
- networking configuration issues

### Debugging Commands Used

### View Logs

```bash
kubectl logs <pod-name> -n docu-scale
```

### Describe Resources

```bash
kubectl describe pod <pod-name> -n docu-scale
```

### Verify Services

```bash
kubectl get svc -n docu-scale
```

These workflows simulated real-world Kubernetes operational debugging practices.

---

## Challenges Faced

### Backend-PostgreSQL Communication Failure

The backend service initially failed to connect to PostgreSQL because localhost was incorrectly used inside Kubernetes configuration.

This issue occurred because:
- localhost inside a Pod refers only to that Pod
- backend and PostgreSQL were running in separate Pods

The issue was resolved by:
- replacing localhost with Kubernetes Service names
- updating environment variables
- verifying ClusterIP networking

---

### Pod Restart Issues

Some Pods repeatedly restarted due to:
- incorrect environment variables
- startup timing issues
- database readiness delays

This issue was resolved by:
- analyzing pod logs
- correcting deployment manifests
- restarting deployments

---

### Namespace Deployment Mistakes

Some workloads were accidentally deployed into the default namespace during early deployment attempts.

The issue was resolved by:
- explicitly defining namespaces
- organizing manifests properly
- redeploying workloads

---

### Service Exposure Problems

NodePort accessibility issues initially prevented frontend access from the browser.

This issue was resolved through:
- correcting Service YAML configuration
- verifying port mappings
- restarting services

---

## Key Learnings

- Learned how Kubernetes manages multi-service architectures
- Understood namespace-based resource isolation
- Practiced backend-database communication inside Kubernetes
- Learned Kubernetes internal DNS-based service discovery
- Gained experience with operational debugging workflows
- Learned how Services provide stable networking endpoints
- Practiced deployment inspection and troubleshooting
- Understood distributed system communication inside Kubernetes
- Learned production-style orchestration workflows
- Prepared the application for cloud-native deployment

---

## Future Improvements

- Move workloads to managed cloud Kubernetes services
- Push Docker images to cloud registries
- Implement CI/CD automation
- Add Persistent Volume Claims
- Introduce Ingress Controllers
- Implement monitoring and observability
- Add Horizontal Pod Autoscaling
- Improve Kubernetes security practices

---

## Screenshots to Include

### Namespace Verification

Paste screenshot of:

```bash
kubectl get namespaces
```

---

### Running Pods

Paste screenshot of:

```bash
kubectl get pods -n docu-scale
```

---

### Kubernetes Services

Paste screenshot of:

```bash
kubectl get svc -n docu-scale
```

---

### Backend Logs

Paste screenshot of:

```bash
kubectl logs <backend-pod-name> -n docu-scale
```

---

### Deployment Verification

![alt text](./screenshots/full-cluster.png)

```bash
kubectl get deployments -n docu-scale
```

---

### Full Cluster Verification

```bash
kubectl get all -n docu-scale
```

---

### Frontend Running Through Kubernetes

![alt text](./screenshots/frontend.png)

---

### Backend and PostgreSQL Communication Success

![alt text](./screenshots/backend.png)

---

## Conclusion

This phase successfully transformed the Kubernetes environment into a production-style multi-service architecture. Frontend, backend, and PostgreSQL services were deployed and managed independently using Kubernetes Deployments and Services inside a dedicated namespace.

Important cloud-native concepts such as namespace isolation, internal service communication, Kubernetes networking, operational debugging, and distributed system orchestration were explored in depth during this phase.

The completion of this phase established a strong foundation for future cloud deployment workflows involving AWS ECR, EKS, CI/CD automation, Jenkins integration, and scalable infrastructure management.