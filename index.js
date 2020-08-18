const fs = require("fs");

const laptopData = JSON.parse(
  fs.readFileSync(`${__dirname}/data/data.json`, "utf-8")
);

console.log(laptopData);
