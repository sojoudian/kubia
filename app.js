import { createServer } from "node:http";
import { hostname } from "node:os";

const PORT = process.env.PORT ?? 8080;            // 3. configurable port

const server = createServer((req, res) => {
  console.log(`${req.method} ${req.url} from ${req.socket.remoteAddress}`);

  if (req.url === "/healthz" || req.url === "/readyz") {   // 2. health endpoints
    return res.writeHead(200).end("ok\n");
  }

  res.writeHead(200, { "content-type": "text/plain" }).end(`You've hit ${hostname()}\n`);
});

server.on("error", (err) => {                     // 5. server error handling
  console.error("server error:", err.message);
  process.exit(1);
});

server.listen(PORT, () => console.log(`Kubia server listening on :${PORT} (${hostname()})`));

for (const signal of ["SIGTERM", "SIGINT"]) {     // 1. graceful shutdown
  process.on(signal, () => {
    console.log(`${signal} received, shutting down`);
    server.close(() => process.exit(0));
  });
}
