import express from "express";
import videoController from "../controllers/video_controller.js";

const videoRouter = express.Router();

videoRouter.post("/upload", videoController.upload);
videoRouter.get("/all", videoController.all);
videoRouter.get("/fetchVideo/:id", videoController.fetchVideo);
videoRouter.post("/addComment/:videoId", videoController.addComment);
videoRouter.get("/allComments/:videoId", videoController.fetchComments);

export default videoRouter;
