import express from "express"; // If using common JS (Default)
import logger from "./middleware/logger.js";
import auth from "./middleware/auth.js";
import cors from "cors;"

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Middleware
app.use (express.urlencoded({extended: true}));
app.use (express.json());
app.use (logger); // appwide

// const checkIfLoggedIn = () => {
// 
// }

// Routes
app.get ("/profile", auth, (req, res) => {
    res.send("Welcome to your profile page Ronit !!");
});

app.get ("/01", (req, res) => { // get, post, put, delete
    // Do something - middleware
    // Do something else - also middleware
    res.send("Welcome to the server - 01 !!");
});

app.get ("/02", (req, res) => {
    res.send("Welcome to the server - 02 !!");
});

app.listen (PORT, () => {
    console.log(`localhost:${PORT}`);
});

app.use ("", (req, res) => {
    res.status(404).send("Page not found !!");
});