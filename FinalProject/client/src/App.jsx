import {
  // useNavigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useState } from "react";
import { UserProvider /*UserContext*/ } from "./context/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Results from "./pages/Results";
import Upload from "./pages/Upload";
import AllVideos from "./pages/AllVideos";
import Video from "./pages/Video";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const token = localStorage.getItem("token");
  // const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logout Success !");
    window.location.reload();
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5173/search?q=${query}`);
    const data = await response.json();
    console.log("Search results: ", data);
    // navigate("/results");
  };

  return (
    <UserProvider>
      <Router>
        <div>
          <header>
            <h1 className="gogotube">GoGoTube !</h1>
            <nav>
              <a href="/">Home</a> |<a href="/profile">Profile</a> |
              {!token ? (
                <>
                  <a href="/login">Login</a> | <a href="/register">Register</a>
                </>
              ) : (
                <>
                  <span onClick={handleLogout} className="logout">
                    Logout
                  </span>{" "}
                  | <a href="/upload">Upload</a>
                </>
              )}
              | <a href="/allVideos">All Videos</a>
            </nav>
            <div className="search-form">
              <form onSubmit={handleSearch}>
                <input
                  className="Search"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search here .."
                  required
                />
              </form>
              <button type="submit" className="searchButton">
                <a href="results">Search</a>
              </button>
            </div>
          </header>

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/results" element={<Results />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/allvideos" element={<AllVideos />} />
              <Route path="/video/:id" element={<Video />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}
