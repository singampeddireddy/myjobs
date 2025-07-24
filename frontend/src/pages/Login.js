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
        backgroundImage: `url('/spooky-bg.png')`, // Place this image in `public/spooky-bg.png`
        fontFamily: "'Creepster', cursive",
      }}
    >
      <div className="bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-10 max-w-md w-full border border-white/20">
        <h1 className="text-4xl text-center text-pink-600 mb-6 drop-shadow-md">
          Welcome Back 👻
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            className="p-3 rounded bg-white/80 border border-pink-300 placeholder-gray-800"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="p-3 rounded bg-white/80 border border-pink-300 placeholder-gray-800"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-pink-600 text-white py-2 rounded shadow hover:bg-pink-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-white text-sm text-center mt-4">
          New here?{" "}
          <Link to="/register" className="text-pink-300 underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
