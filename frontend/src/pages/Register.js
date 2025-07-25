// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// IMPORTANT FIX #1: We must import the authentication context to log the user in.
// This assumes your friend has a similar AuthContext file to the one we created.
import { useAuth } from '../context/AuthContext'; 

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // IMPORTANT FIX #2: Get the login function from the context.
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try { // Added a try...catch block for better error handling
        const response = await fetch('https://myjobs-55hd.onrender.com/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email }),
        });

        const data = await response.json();

        if (response.ok) {
            // --- CRITICAL FIX #3 ---
            // Instead of just saving the token, we use the login function.
            // This updates the application's state so it knows the user is authenticated.
            login(data.token);
            
            // Navigate to the main homepage after successful login.
            navigate('/'); 
        } else {
            // IMPROVEMENT #1: Display a cleaner, more user-friendly error message.
            // This will turn an error like {"username":["user already exists"]} into "user already exists".
            const errorMessage = Object.values(data).join(' ');
            setError(errorMessage);
        }
    } catch (err) {
        // This catches network errors if the server can't be reached.
        setError('Registration failed. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-600 via-yellow-100 to-orange-400">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required // Email should likely be required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 rounded hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">
            Error: {error}
          </p>
        )}

        <p className="mt-4 text-center text-sm text-gray-700">
          Already have an account?{" "}
          {/* FIX #4: The link should point to /login, not the homepage (/). */}
          <Link to="/login" className="text-orange-600 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;