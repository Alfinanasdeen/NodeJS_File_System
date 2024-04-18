const http = require("http");
const fs = require("fs");
const path = require("path");

const hostname = '0.0.0.0';
const port = 3000;
const folderPath = "./textFiles";

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/createFile") {
    createFile(req, res);
  } else if (method === "GET" && url === "/getFiles") {
    getFiles(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Function to create a text file with current timestamp
function createFile(req, res) {
  const currentDate = new Date();
  const timestamp = currentDate.toISOString().replace(/:/g, "-"); 
  const fileName = `${timestamp}.txt`;
  const filePath = path.join(folderPath, fileName);
  const fileContent = currentDate.toString();

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error("Error creating file:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error creating file");
      return;
    }
    console.log("File created successfully:", filePath);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("File created successfully");
  });
}

// Function to retrieve all text files in a particular folder
function getFiles(req, res) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error reading folder");
      return;
    }
    console.log("Files found:", files);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(files));
  });
}

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
