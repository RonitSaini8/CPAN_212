import dotenv from "dotenv";
import express from "express"; // (needs "type": "module", in package.json)

// const express = require("express")
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000; // if process.env.PORT isn't found, it will default to 8000

// GPPD (Get, Put, Post, Delete) is similar to CRUD (Create, Read, Update, Delete)

app.get("/", (req, res) => { 
    res.send("Welcome to the server - GET !!")
});

app.post("/", (req, res) => { 
    res.send("Welcome to the server - POST !!")
});

app.put("/", (req, res) => { 
    res.send("Welcome to the server - PUT !!")
});

app.delete("/", (req, res) => { 
    res.send("Welcome to the server - DELETE !!")
});

// (youtube link)
// DOMAIN /endpoint
// 1h:3000/watch(link)

app.get("/watch", (req, res) => {
    console.log("URL call:")
    console.log(req.url)
    console.log("Method call:")
    console.log(req.method)
    console.log("Headers call:")
    console.log(req.headers)
    console.log("Query call:")
    console.log(req.query)
    console.log("Params call:")
    console.log(req.params)
    console.log("Body call:")
    console.log(req.body)
    res.send("Welcome to the watch list !")
})

app.get("/itm/:itemID", (req, res) => {
    console.log("Query call:")
    console.log(req.query)
    console.log("Params call:")
    console.log(req.params)
    res.send("Welcome to the item list !")
})

// %2B == + (in a URL)
// %25 == % (in a URL)

app.listen(PORT, () => { // .listen keeps app running in the background
    console.log(`http://localhost:${PORT}`)
})