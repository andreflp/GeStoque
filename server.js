const express = require('express');
const port = process.env.PORT || 8081;
const app = express();

app.use(express.static(__dirname + "/dist/"));
app.get(/.*/, function (req, res) {
  res.sendfile(__dirname + "/dist/index.html")
});
server.listen(port, function () {
  console.log("App is running on port " + port);
});

console.log("Server started...");
