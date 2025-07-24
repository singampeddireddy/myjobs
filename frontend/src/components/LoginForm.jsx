import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      alert("Login failed: " + err.response?.data?.detail || "Unknown error");
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('/spooky-bg.png')`,
        fontFamily: "'Creepster', cursive",
      }}
    >
      <div className="bg-black/70 backdrop-blur-sm shadow-2xl rounded-2xl p-10 max-w-md w-full border-2 border-pink-400">
        <h1 className="text-4xl text-center text-pink-500 mb-6 drop-shadow-md">
          🎃 Welcome Back!
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            className="p-3 rounded bg-white/80 border border-pink-300 placeholder-gray-800 font-sans"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="p-3 rounded bg-white/80 border border-pink-300 placeholder-gray-800 font-sans"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-pink-600 text-white font-semibold py-2 rounded hover:bg-pink-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-white text-sm text-center mt-4 font-sans">
          New here?{" "}
          <Link to="/register" className="text-pink-300 underline hover:text-white">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
