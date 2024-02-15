const http = require("http");
const PORT = 3000;

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