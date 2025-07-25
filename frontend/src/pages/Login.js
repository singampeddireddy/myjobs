import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from '../api/api'; // Use the central API instance
import { useAuth } from '../context/AuthContext'; // Use the AuthContext for state management

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from context

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const res = await API.post("/login/", {
        username,
        password,
      });
      // CRITICAL FIX: Use the login function to update the app's state
      login(res.data.token);
      navigate("/home"); // Navigate to the homepage
    } catch (err) {
      // FIX: Display error message on the page instead of using alert()
      const errorMessage = err.response?.data?.detail || "Login failed. Please check your credentials.";
      setError(errorMessage);
    }
  };

  // This UI is now consistent with the main project's theme
  return (
    <div className="login-page-container">
        <h1 className="login-logo">HireWise</h1>
        <div className="login-card">
            <h2>Welcome Back</h2>
            <form onSubmit={handleLogin}>
                <div className="login-form-group">
                    <label className="login-form-label">Username</label>
                    <input className="login-form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="login-form-group">
                    <label className="login-form-label">Password</label>
                    <input className="login-form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="login-btn">Sign In</button>
                {error && <p className="login-error-message">{error}</p>}
            </form>
            <p className="login-form-link">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    </div>
  );
};

export default Login;