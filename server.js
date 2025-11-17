const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const options = {
  key: fs.readFileSync(path.join(__dirname, "ssl", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "ssl", "cert.pem")),
};

const server = https.createServer(options, app);

const io = require("socket.io")(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // TODO: Nanti tulis logic di sini
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
