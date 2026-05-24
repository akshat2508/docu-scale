# Kubernetes Phase 1 — Frontend Deployment and Kubernetes Fundamentals

## Objective

The objective of this phase was to introduce Kubernetes orchestration concepts and deploy the frontend application into a local Kubernetes cluster. This phase focused on understanding Kubernetes fundamentals such as Pods, Deployments, Services, NodePort exposure, and pod communication.

This phase marked the transition from standalone Docker containers to Kubernetes-managed workloads. The frontend application was deployed using Kubernetes manifests, exposed through a NodePort service, and verified through browser access.

The primary goals of this phase included:
- understanding Kubernetes architecture
- learning declarative deployments
- managing Pods and Services
- exposing applications using NodePort
- understanding pod networking and communication
- practicing kubectl-based operations

By the end of this phase:
- frontend workloads were successfully deployed
- Kubernetes Services exposed the application externally
- pod communication concepts were understood
- basic Kubernetes operational workflows were established

---

## Kubernetes Concepts Introduced

### Pods

Pods are the smallest deployable units in Kubernetes and are responsible for running application containers.

In this phase:
- frontend containers were deployed inside Pods
- Pods handled runtime execution and networking

Pod verification command:

```bash
kubectl get pods
```

---

### Deployments

Deployments were used to manage frontend Pods declaratively.

Deployment responsibilities included:
- pod creation
- replica management
- rolling updates
- self-healing behavior

Deployment verification:

```bash
kubectl get deployments
```

---

### Services

Services were introduced to expose frontend Pods and provide stable networking endpoints.

Without Services:
- Pods receive temporary IP addresses
- direct access becomes unreliable

Services solved this issue by providing:
- stable communication endpoints
- load balancing
- pod discovery

---

### NodePort Service

A NodePort Service was used to expose the frontend application externally.

### Why NodePort Was Used

NodePort enables:
- browser access to Kubernetes applications
- external testing during development
- communication from outside the cluster

The frontend application became accessible using:

```text
<Node-IP>:<NodePort>
```

Service verification command:

```bash
kubectl get svc
```

---

## Frontend Deployment

The frontend application was deployed into Kubernetes using YAML manifests.

### Frontend Deployment Responsibilities

The deployment handled:
- frontend container execution
- replica creation
- restart automation
- workload management

The deployment ensured the frontend application remained continuously available inside the cluster.

---

## Pod Communication

This phase introduced the concept of pod networking and Kubernetes internal communication.

### Kubernetes Networking Features

Kubernetes networking provides:
- pod-to-pod communication
- internal DNS resolution
- service discovery
- isolated cluster networking

Although only the frontend service was externally exposed during this phase, the internal communication model of Kubernetes was explored for future backend integration.

---

## kubectl Commands Used

### View Pods

```bash
kubectl get pods
```

### View Services

```bash
kubectl get svc
```

### View Deployments

```bash
kubectl get deployments
```

### Apply Kubernetes Resources

```bash
kubectl apply -f .
```

### View Logs

```bash
kubectl logs <pod-name>
```

### Describe Pods

```bash
kubectl describe pod <pod-name>
```

### Delete Resources

```bash
kubectl delete -f .
```

---

## Challenges Faced

### Pod Startup Delays

Some frontend Pods initially remained in pending states due to image pulling and cluster resource initialization delays.

This issue was resolved by:
- verifying image availability
- checking cluster resources
- restarting deployments

---

### Service Accessibility Issues

The frontend application initially could not be accessed externally due to incorrect NodePort configuration.

The issue was resolved by:
- correcting Service YAML configuration
- verifying exposed ports
- restarting Services

---

### Port Mapping Conflicts

Conflicts occurred between local ports and Kubernetes service ports.

This issue was resolved by:
- updating NodePort assignments
- reconfiguring service exposure settings

---

## Key Learnings

- Learned Kubernetes Pod architecture
- Understood Deployments and replica management
- Learned how Services expose workloads
- Understood NodePort-based application exposure
- Practiced kubectl operational commands
- Learned Kubernetes networking fundamentals
- Gained experience deploying frontend workloads using manifests
- Understood declarative infrastructure concepts

---

## Future Improvements

- Deploy backend services into Kubernetes
- Introduce PostgreSQL database deployment
- Implement namespace isolation
- Configure internal service communication
- Move toward production-style orchestration

---

## Screenshots to Include

### Running Pods

Paste screenshot of:

```bash
kubectl get pods
```

---

### Kubernetes Services

Paste screenshot of:

```bash
kubectl get svc
```

---

### Frontend Running Through Kubernetes
![alt text](./screenshots/frontend.png)
---



### Deployment Verification


```bash
kubectl get deployments
```

---

## Conclusion

This phase successfully introduced Kubernetes orchestration concepts and deployed the frontend application into a local Kubernetes environment. Important concepts such as Pods, Deployments, Services, NodePort exposure, and Kubernetes networking were explored through practical implementation.

The successful frontend deployment established the foundation for more advanced multi-service Kubernetes architectures involving backend services, databases, namespaces, and internal service communication in later phases.