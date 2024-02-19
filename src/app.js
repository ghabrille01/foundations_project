const http = require("http");
const PORT = 3000;

const { logger } = require("./util/logger");

const { register } = require("./userManagement/register");

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error}`);
  process.exit(1);
});

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/data") {
  } else if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    switch (req.url) {
      case "/api/register":
        req.on("end", () => {
          const data = JSON.parse(body);

          const result = register(data.username, data.password);

          if (result === `User ${username} has been created.`) {
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: result }));
          } else {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: result }));
          }
        });
        break;
      default:
        break;
    }
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
