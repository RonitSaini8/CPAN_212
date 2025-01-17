const http = require("http")
const app = http.createServer((req, res) => { // (() => {})
    if (req.url === "/") {
        res.end("Hello !")
    }
    else if (req.url === "/details") {
        res.end("Details !")
    }
    else if (req.url === "/login") {
        res.end("Login !")
    }
    else if (req.url === "/homepage") {
        res.end("Homepage !")
    }
    else if (req.url === "/about") {
        res.end ("About !")
    }
    else if (req.url === "/contact_us") {
        res.end ("Contact us !")
    }
    else if (req.url === "/fetch_data") {
        res.end("Fetch Data !")
    }
    else {
        res.end ("Page not found !  ")
    }
})
app.listen(8000)
