const express = require("express");
const app = express();
const PORT = 8000;
 
const logger = (req, res) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toUTCString();
  console.log(`[${formattedDate}] ${req.method} ${req.originalUrl}`);
  next();
};
 
app.get("/", logger, (req, res) => {
  res.send("hello world");
});
 
app.use((req, res) => {
  res.status(404).send("Page not Found");
});
 
app.listen(PORT, () => {
  console.log(`open to http://127.0.0.1:${PORT}`);
});