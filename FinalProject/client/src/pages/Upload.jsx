import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Upload() {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (!localStorage.getItem("token")) {
    alert("You need to login first !");
    return navigate("/register");
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    let [hours = 0, minutes = 0, seconds = 0] = duration.split(":").map(Number);

    if (seconds >= 60) {
      minutes = +Math.floor(seconds / 60);
      seconds %= 60;
    }

    if (minutes >= 60) {
      hours = +Math.floor(minutes / 60);
      minutes %= 60;
    }

    const durationObject = {};
    if (hours > 0) durationObject.hours = hours;
    if (minutes > 0) durationObject.minutes = minutes;
    durationObject.seconds = seconds || seconds;

    const videoData = {
      title,
      videoUrl,
      duration: { hours, minutes, seconds },
      description,
      userId: user.id,
      username: user.username,
    };

    try {
      const response = await fetch("http://localhost:8000/api/videos/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        console.log("Upload failed: ", data.message);
      } else {
        console.log("Upload success: ", data.message);
        alert("Upload success !");
        navigate("/allVideos");
      }
    } catch (err) {
      setError("Something went wrong !\nTry again later !");
      console.error("Error uploading video: ", err);
    }
  };

  return (
    <div>
      <h1 className="title">Upload</h1>
      <form onSubmit={handleUpload}>
        <div className="inputField">
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="inputField">
          <input
            type="text"
            value={videoUrl}
            placeholder="URL (YouTube Video)"
            onChange={(e) => setVideoUrl(e.target.value)}
            required
          />
        </div>
        <div className="inputField">
          <input
            type="text"
            value={duration}
            placeholder="Duration (H:M:S)"
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div className="inputField">
          <input
            type="text"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="submitButton" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
}
