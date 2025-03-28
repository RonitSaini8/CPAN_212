const http = require("http")
const fs = require("fs")

const app = http.createServer((req, res) => { // (() => {})
    if (req.url === "/") {
        res.end ("Hello server !")
    } else if (req.url === "/homepage") {
        let webpage = fs.readFileSync("homepage.html")
        res.end (webpage)
    } else if (req.url === "/about") {
        let webpage = fs.readFileSync("about.html")
        res.end (webpage)
    } else if (req.url === "/contact") {
        let webpage = fs.readFileSync("contact.html")
        res.end (webpage)
    } else if (req.url === "/login") {
        let webpage = fs.readFileSync("login.html")
        res.end (webpage)
    } else {
        {res.end ("Error 404 - Page not found")}
    } 
});

let PORT = 8000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});  

// note: I apologize for not using the HTML folder but 
// I found the second part had worked when I had taken
// the HTML files out of the HTML folder and instead 
// bunched them with the .js files in Lab 1