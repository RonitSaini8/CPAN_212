import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import recipeRouter from "./routers/recipes_router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

console.log(process.env.MONGODB_URI);

app.use(cors({
    origin: `http://localhost:5173`
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/recipes', recipeRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'API route not found' });
  });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.error("MongoDB connection error:", error));