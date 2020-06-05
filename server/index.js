const fs = require("fs");
const http = require("http");
const url = require("url");
const path = require("path");

const port = 9001;

const server = http.createServer((req, res) => {
  var pathname = url.parse(req.url).pathname;
  if (pathname == "/") {
    pathname = "/index.html";
  }
  const fullPath = path.resolve(__dirname, "../dist/" + pathname);
  var extname = path.extname(fullPath);
  const contentType = getMime(extname);
  res.headers = {
    "content-type": contentType
  };
  res.statusCode = 200;
  // res.end(fs.readFileSync());
  fs.readFile(fullPath, (err, data) => {
    if (err) {
      return page404(res);
    }
    res.end(data);
  });
});
server.listen(port, () => {
  console.log("server is running at " + port);
});

function getMime(extname) {
  switch (extname) {
    case ".html":
      return "text/html";
    case ".jpg":
      return "image/jpg";
    case ".css":
      return "text/css";
  }
}

function page404(res) {
  res.statusCode = 404;
  res.headers = {
    "content-type": "text/html"
  };
  res.end(fs.readFileSync("../dist/404.html"));
}
