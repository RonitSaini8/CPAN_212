import User from "../models/user.js";
import Video from "../models/video.js";

const upload = async (req, res) => {
  const { title, description, videoUrl, duration, userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found !" });
    }
    const newVideo = new Video({
      title,
      description,
      videoUrl,
      duration,
      user: user._id,
    });
    await newVideo.save();
    res.json({ message: "Video uploaded successfully !", video: newVideo });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Video upload failed :(" });
  }
};

const all = async (req, res) => {
  try {
    const videos = await Video.find().populate("user", "username email");
    res.json({ videos });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch videos !" });
  }
};

const fetchVideo = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id).populate("user", "username email");
    if (!video) {
      return res.status(400).json({ message: "Video not found !" });
    }
    res.json({ video });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch video !" });
  }
};

const addComment = async (req, res) => {
  const { videoId } = req.params;
  const { userId, username, text } = req.body;

  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(400).json({ message: "Video not found !" });
    }
    const user = await findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found !" });
    }
    video.comments.push({ userId: user._id, username, text });

    await video.save();
    res.json({ message: "Comment added successfully !", video });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add comment !" });
  }
};

const fetchComments = async (req, res) => {
  const { videoId } = req.params;

  try {
    const video = await Video.findById(videoId).populate(
      "comments.userId",
      "username"
    );
    if (!video) {
      return res.status(400).json({ message: "Video not found !" });
    }
    res.json({ comments: video.comments });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch comments !" });
  }
};

export default {
  upload,
  all,
  fetchVideo,
  addComment,
  fetchComments,
};
