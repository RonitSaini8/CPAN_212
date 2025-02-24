import express from 'express';

const app = express();
const PORT = proccess.env.PORT || 8080;

app.fetch("/fetch", (req, res) => {
    console.log("fetch !!")
})

app.save("/save", (req, res) => {
    console.log("save !!")
})

app.delete("/delete", (req, res) => {
    console.log("delete !!")
})

app.listen(PORT, () => {
    console.log(`localhost:${PORT}`);
}) 