import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", (req, res) => {
    // 1) Parse incoming information
    const {email, password} = req.body;

    // Hash the information
    // Run the command: npm i bcryptjs
    bcrypt.hash(password, 10)
    .then((hashedPassword) => {
        let newUser = new User({
            email,
            password: hashedPassword
        });
        newUser
        .save()
        .then(() => {
            res.json({message: "Account registered !"})
        })
        .catch((err) => {
            console.log(err);
            return res.json({message: "Email already in use !"})
        })
    })
    .catch((err) => {
        console.log(err);
        return res.json({message: "Could not complete the transaction !"});
    });
});

router.post("/login", (req, res) => {
    const {email, password} = req.body;

    User.findOne({email: email}, {password: false}) // Result: {} or {user_acc} | False could also be 0 
    .then((user_account) => {
        if (!user_account) {
            return res.json({message: "Could not find user account !"});
        }
        // Compare passwords
        bcrypt
        .compare(password, user_account.password)
        .then((isMatched) => { // If it succeeds, it could mean true or false
            if(!isMatched) {
                return res.status(400).json({message: "Invalid Password !"});
            }
            return res.json("Login Successful !");
        }) 
        .catch((err) => {
            console.log(err);
            return res.status(500).json({message: "Could not complete request !"});
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({message: "Could not complete request !"});
    });
});

// Read
router.get("/fetch-all", (req, res) => {
    // Find
    // let filters = {};
    // if (req.query.title) {
    //     filters.title = req.query.title;
    // }
    // User.find(filters, {password: false})
    User.find()
    .then((result) => {console.log(result)})
    res.end();
})

router.get("/itm:/id", (req, res) => {
    User.findById(req.params.id)
    .then((result) => {console.log(result)})
    // User.findByIdUpdate({id_value}, {updated key:values})
    User.findByUpdateDelete({id_value})
    res.end();
})

export default router;