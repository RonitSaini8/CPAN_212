import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/user_router.js";
import videoRouter from "./routers/video_router.js";

dotenv.config();
console.log(process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(
    "Home Page !! (/api/users -> /all, /fetchUser/:id || /api/videos -> /all, /fetchVideo/:id, /allComments/:videoId)"
  );
});

app.use("/api/users", userRouter);
app.use("/api/videos", videoRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully !");
  })
  .catch((err) => {
    console.error("MongoDB connection error: ", err);
  });

app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});

app.use("*", (req, res) => {
  res.status(404).send("Page not found !!");
});
