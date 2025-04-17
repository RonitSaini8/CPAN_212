import { Link } from "react-router-dom";

export default function Home() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logout Success !");
    window.location.reload();
  };

  return (
    <div>
      <h1 className="title">Home</h1>
      <nav>
        {!token ? (
          <>
            <Link to="/register" className="homeButton">
              Register
            </Link>{" "}
            |{" "}
            <Link to="/login" className="homeButton">
              Login
            </Link>
          </>
        ) : (
          <>
            <span onClick={handleLogout} className="homeButton logout">
              Logout
            </span>{" "}
            |{" "}
            <Link to="/upload" className="homeButton">
              Upload
            </Link>{" "}
            |{" "}
            <Link to="/allVideos" className="homeButton">
              All Videos
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}
