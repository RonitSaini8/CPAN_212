import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Video = () => {
  const navigate = useNavigate();
  const [video, setVideo] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserId(decodedToken.userId);
    }

    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}api/videos/fetchVideo/${id}`
        );
        const data = await response.json();
        console.log("Fetched video data:", data);
        setVideo(data);
      } catch (err) {
        console.error("Error fetching video details: ", err);
      }
    };
    fetchVideoDetails();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Do you want to delete this video?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}api/videos/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Video Deleted!");
        navigate("/allVideos");
      } else {
        alert("Failed to delete video.");
      }
    } catch (err) {
      console.error("Error while deleting video: ", err);
    }
  };

  if (!video) return <div>Loading...</div>;

  return (
    <div>
      <div className="videoPlayer">
        <video controls src={video.videoUrl} width="1000" height="600"></video>
      </div>
      <h1>{video.title || "No Title Available"}</h1>
      <h2>{video.description || "No Description Available"}</h2>
      <h3>
        {video.hours || video.minutes || video.seconds
          ? `${video.hours || 0}h ${video.minutes || 0}m ${video.seconds || 0}s`
          : "Duration not available"}
      </h3>
      <h4>{video.user?.username || "Anonymous"}</h4>
      {isAuthenticated && userId === video.userId && (
        <div className="deleteButton">
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Video;
