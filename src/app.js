const http = require("http");
const PORT = 3000;

const { logger } = require("./util/logger");

const { register } = require("./userManagement/register");
const { login } = require("./userManagement/login");

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error}`);
  process.exit(1);
});

const server = http.createServer((req, res) => {
  let body = "";

  req
    .on("data", (chunk) => {
      body += chunk;
    })
    .on("end", () => {
      body = body.length > 0 ? JSON.parse(body) : {};

      const contentType = { "Content-Type": "application/json" };

      if (req.url.startsWith("/register")) {
        switch (req.method) {
          case "POST":
            // console.log("POST REQUEST");
            const { username, password } = body;

            const result = register(username, password);

            if (result === `${username} is not available.`) {
              res.writeHead(400, contentType);
              res.end(
                JSON.stringify({
                  message: result,
                })
              );
            } else {
              res.writeHead(201, contentType);
              res.end(JSON.stringify(result));
            }
            break;
          default:
            res.writeHead(404, contentType);
            res.end(JSON.stringify({ message: "Invalid Endpoint" }));
            break;
        }
      } else if (req.url.startsWith("/login")) {
        let username = req.url.split("/")[2];

        switch (req.method) {
          case "POST":
            // console.log("POST REQUEST");
            const { password } = body;

            const result = login(username, password);

            if (result === `Invalid Credentials`) {
              res.writeHead(400, contentType);
              res.end(
                JSON.stringify({
                  message: result,
                })
              );
            } else {
              res.writeHead(201, contentType);
              res.end(JSON.stringify(result));
            }
            break;
          default:
            res.writeHead(404, contentType);
            res.end(JSON.stringify({ message: "Invalid Endpoint" }));
            break;
        }
      } else {
        res.writeHead(404, contentType);
        res.end(JSON.stringify({ message: "Invalid Endpoint" }));
      }
    });

  /*if (req.method === "GET" && req.url === "/api/data") {
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

          if (result === `User ${data.username} has been created.`) {
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: result }));
          } else {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: result }));
          }
        });
        break;
        case "/api/login":
        req.on("end", () => {
          const data = JSON.parse(body);

          const result = login(data.username, data.password);

          if (result === `${data.username} has successfully logged in.`) {
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
  }*/
});

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
