const auth = (req, res, next) => {
    if (req.query.username === "Ronit") {
        next();
    } else {
        res.send("Access not allowed !!!");
        // res.redirect("localhost:8000/");
        // res.json({message: "You are not the correct user !\nLogin as the correct user !"});
    }
};

export default auth;