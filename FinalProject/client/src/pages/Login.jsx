import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    try {
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        console.log("Login failed: ", data.message);
      } else {
        localStorage.setItem("token", data.token);
        alert("Login Success !");
        console.log("Login success: ", data.message);
        navigate("/");
      }
    } catch (error) {
      setError("Something went wrong! Try again later.");
      console.log("Error logging in: ", error);
    }
  };

  return (
    <div>
      <h1 className="title">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="inputField">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="inputField">
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="submitButton" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
