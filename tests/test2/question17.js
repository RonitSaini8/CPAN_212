const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
 
 
// middlelware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 
const routeTestLog = (req, res, next) => {
    const testValidation = req.query.test_validation;
    console.log(`Test validation: ${testValidation}`);
    console.log(`Route: ${req.originalUrl}`);
    console.log(`Timestamp: ${new Date().toString()}`);
    next();
}
 
// routes
app.get("/", (req, res)=>{
    res.send("Welcome to our server")
})
 
app.get("/route_test", routeTestLog, (req, res) => {
    res.send("Welcome to route_test")
})
 
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
 
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});