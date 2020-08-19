const fs = require("fs");
const http = require("http");
const url = require("url");

const laptopData = JSON.parse(
  fs.readFileSync(`${__dirname}/data/data.json`, "utf-8")
);

const server = http.createServer((req, res) => {
  // URLs & IDs
  const requrl = url.parse(req.url, true);
  const pathName = requrl.pathname;
  const id = requrl.query.id;

  // Home page or products page route
  if (pathName === "/products" || pathName === "/") {
    res.writeHead(200, { "Content-type": "text/html" });

    fs.readFile(
      `${__dirname}/templates/overview.html`,
      "utf-8",
      (err, data) => {
        let output = data;

        fs.readFile(
          `${__dirname}/templates/card.html`,
          "utf-8",
          (err, data) => {
            const cardsOutput = laptopData
              .map((el) => {
                return replaceTemplate(data, el);
              })
              .join("");

            output = output.replace("{%CARDS%}", cardsOutput);

            res.end(output);
          }
        );
      }
    );

    // Single procuct page route
  } else if (pathName === "/laptop") {
    res.writeHead(200, { "Content-type": "text/html" });

    fs.readFile(`${__dirname}/templates/laptop.html`, "utf-8", (err, data) => {
      const laptop = laptopData[id];
      const output = replaceTemplate(data, laptop);

      res.end(output);
    });
  } else if (/\.(jpg|jpeg|png|ico|gif)$/i.test(pathName)) {
    fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
      res.writeHead(200, { "Content-type": "image/jpg" });

      res.end(data);
    });
  }
  // 404 Error Message
  else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("URL not found : ( ");
  }
});

server.listen(3000, "127.0.0.1", () => {});

const replaceTemplate = (originalHtml, laptop) => {
  let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
  output = output.replace(/{%IMAGE%}/g, laptop.image);
  output = output.replace(/{%PRICE%}/g, laptop.price);
  output = output.replace(/{%SCREEN%}/g, laptop.screen);
  output = output.replace(/{%CPU%}/g, laptop.cpu);
  output = output.replace(/{%STORAGE%}/g, laptop.storage);
  output = output.replace(/{%RAM%}/g, laptop.ram);
  output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
  output = output.replace(/{%ID%}/g, laptop.id);

  return output;
};
