import express from "express";
import cors from "cors";
import multer from "multer";

// Grab info, parse file, save file in a destination + set filename !!

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads/')
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now();
      cb(null, uniquePrefix + file.fieldname)
    }
  });
  
  const upload = multer({ storage: storage })
 
const app = express();
const PORT = process.env.PORT || 8000;
 
// middleware
app.use(cors());
app.use(express.urlencoded({extended:true})); // Plain HTML forms
app.use(express.json()); // Accepts JSON data

 
// routes
app.get("/", (req, res) => {
  // console.log(req);
  res.send("Welcome to our server");
});

app.get("/data", (req, res) => {
    // console.log(req);
    res.json({
        name: "Ronit",
        password: "password",
        username: "RonitS"
    });
  });

  app.post("/login", (req, res) => {
    console.log(req.body);
    res.json("Information !!")
  });

  app.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.json("i got the file !!");
  })
 
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});

// npm i multer

/*

React --> 
  Server --> 
    /image --> 
      Parse for req.body with multer 
        --> save the file 
          --> we got it

*/