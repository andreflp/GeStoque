import express, { static } from 'express';
const port = process.env.PORT;
const app = express();

app.use(static(__dirname + "/dist/"));
app.get(/.*/, function (req, res) {
  res.sendfile(__dirname + "/dist/index.html")
});
app.listen(port);

console.log("Server started...");
