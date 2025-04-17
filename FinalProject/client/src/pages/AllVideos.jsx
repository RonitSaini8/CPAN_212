import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllVideos = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}api/videos/all`
        );
        const data = await response.json();
        setVideos(data);
        console.log("Fetched videos: ", data);
        if (Array.isArray(data.videos)) {
          setVideos(data.videos);
        } else {
          console.error("No videos in the array :", data.videos);
        }
      } catch (err) {
        console.error("An error occured while fetching videos: ", err);
      }
    };
    fetchVideos();
  }, []);

  console.log("Server URL:", import.meta.env.VITE_SERVER_URL);

  return (
    <div className="allVideos">
      {videos.length === 0 ? (
        <>
          <h1>No Videos Available !</h1>
          <p>Upload a video below:</p>
          <a href="/upload">Upload</a>
        </>
      ) : (
        <div className="videoList">
          {videos.map((video) => (
            <div
              key={video._id}
              className="videoCard"
              onClick={() => navigate(`/video/${video._id}`)}
            >
              <h3>{video.title}</h3>
              <h4>{video.hours || video.minutes || video.seconds}</h4>
              <h4>{video.user?.username || "Anonymous"}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllVideos;
