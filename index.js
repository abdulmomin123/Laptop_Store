const fs = require("fs");
const http = require("http");
const url = require("url");

const laptopData = JSON.parse(
  fs.readFileSync(`${__dirname}/data/data.json`, "utf-8")
);

const server = http.createServer((req, res) => {
  const requrl = url.parse(req.url, true);
  const pathName = requrl.pathname;
  const id = requrl.query.id;

  if (pathName === "/products" || pathName === "/") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end("The Products Page");
  } else if (pathName === "/laptop" && id < laptopData.length) {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(`The Laptop Page for laptop no ${id}`);
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("URL not found : ( ");
  }
});

server.listen(3000, "127.0.0.1", () => {});
