# kubia

A tiny Node.js web server that replies with the pod's hostname. Used in CLO835 to demo pods, replicas, and load balancing.

## Files

- `app.js` — the server (port 8080, also `/healthz` and `/readyz`)
- `Dockerfile` — builds the image on Node 24
- `kubia.yaml` — ReplicaSet
- `deployment.yaml` — Deployment

## Build and push

```bash
docker build -t maziar/kubia:0.1 .
docker push maziar/kubia:0.1
```

## Version tags for the rollout lab

The image replies `This is <VERSION> running in pod <name>` when `VERSION` is set.
Without it, the reply stays `You've hit <name>`.

```bash
docker buildx build --platform linux/amd64,linux/arm64 --build-arg VERSION=v1 -t maziar/kubia:v1 --push .
docker buildx build --platform linux/amd64,linux/arm64 --build-arg VERSION=v2 -t maziar/kubia:v2 --push .
```

## Run on Kubernetes

```bash
kubectl apply -f deployment.yaml
kubectl get pods -o wide
```

Hit it a few times and you'll see different hostnames as the requests land on different pods.
