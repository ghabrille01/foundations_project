import { http } from "http";
const PORT = 3000;

import { logger } from "./util/logger";

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error}`);
  process.exit(1);
});

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/data") {
    
  } else if (req.method === "POST" && req.url === "/api/create") {
    
  } else if (req.method === "PUT" && req.url === "/api/update") {
    
  } else if (req.method === "DELETE" && req.url === "/api/delete") {
  } else {
    // Not matching any endpoints
    res.writeHead(404, { "Content-Type": "application/json" });
    let data = { error: "Not Found" };
    res.end(JSON.stringify(data));
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});