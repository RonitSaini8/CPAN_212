import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to the lab router !!")
})

// /lab/name

router.get("/name", (req, res) => {
    res.send("Ronit Saini")
})

// /lab/greeting

router.get("/greeting", (req, res) => {
    res.send("HEY !")
})

router.get("/add/:x/:y", (req, res) => {
    let x = parseFloat(req.params.x);
    let y = parseFloat(req.params.y);
    res.send(`${x + y}`)
})

router.get("/calculate/:a/:b/:operation", (req, res) => {
    let a = parseFloat(req.params.a);
    let b = parseFloat(req.params.b)
    switch (req.params.operation) {
        case "+":
        res.send(`${a + b}`)
        break;
        case "-":
        res.send(`${a - b}`)
        break;
        case "*":
        res.send(`${a * b}`)
        break;
        case "/" || "%2F":
        res.send(`${a / b}`)
        break;
        default: ("wrong operation BUDDY")
            break;
    }
})

export default router;

// OR module.exports router