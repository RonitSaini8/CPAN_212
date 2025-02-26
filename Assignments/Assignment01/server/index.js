import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

const education = [
    { institution: "Louise Arbour Secondary School", degree: "Ontario Secondary School Diploma", year: 2023, status: "Completed" },
    { institution: "Humber College", degree: "Computer Programming Diploma", year: 2025, status: "In-Progress" }
];

const experience = [
    { role: "Cashier", company: "Foot Locker", year: 2024 },
    { role: "Software Developer", company: "Lyft", year: 2025}
];

const overview = "I am a software developer with minor experience in software development in practical use looking to gain more experience.";

app.use(cors());

app.get("/", (req, res) => {
    res.send("Routes: '/getEdu', '/getExp', '/getOverview'")
});

app.get("/getEdu", (req, res) => {
    res.json(education);
});

app.get("/getExp", (req, res) => {
    res.json(experience);
});

app.get("/getOverview", (req, res) => {
    res.json(overview)
})

app.listen(PORT, () => {
    console.log(`localhost:${PORT}`);
}) 