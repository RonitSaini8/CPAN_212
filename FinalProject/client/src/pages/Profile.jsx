import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Profile() {
  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/users/fetchUser/${user.id}`
        );
        const data = await response.json();

        if (response.ok) {
          setUserData(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(
          <div>
            <p>Failed to fetch user !</p>
            <p>Please create a new account or log in to an existing one.</p>
            <a href="/register">Register</a> | <a href="/login">Login</a>
          </div>
        );
        console.error("Error fetching user: ", err);
      }
    };

    fetchUser();
  }, [user, navigate]);

  if (!userData)
    return (
      <div>
        <h1>{error ? error : "Loading..."}</h1>
      </div>
    );

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>Bio: {userData.bio ? userData.bio : "No bio provided."}</p>
    </div>
  );
}
