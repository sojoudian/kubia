# kubia

A tiny Node.js web server that replies with the pod's hostname. Used in CLO835 to demo pods, replicas, and load balancing.

## Files

- `app.js` — the server (port 8080, also `/healthz` and `/readyz`)
- `Dockerfile` — builds the image on Node 24
- `kubia.yaml` — ReplicaSet
- `deployment.yaml` — Deployment

## Build and push

```bash
docker build -t maziar/kubia:1.0 .
docker push maziar/kubia:1.0
```

## Run on Kubernetes

```bash
kubectl apply -f deployment.yaml
kubectl get pods -o wide
```

Hit it a few times and you'll see different hostnames as the requests land on different pods.
