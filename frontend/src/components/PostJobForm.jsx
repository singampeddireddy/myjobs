import React, { useState } from 'react';
import axios from 'axios';

function PostJobForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills_required, setSkillsRequired] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/jobs/', {
        title,
        description,
        skills_required
      });
      setMessage('✅ Job posted successfully!');
      setTitle('');
      setDescription('');
      setSkillsRequired('');
    } catch (error) {
      setMessage('❌ Failed to post job');
      console.error('Post job error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-2xl border border-purple-200">
        <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-10 drop-shadow-md">
          📢 Post a New Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">Job Title</label>
            <input
              type="text"
              placeholder="e.g., Backend Developer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">Job Description</label>
            <textarea
              placeholder="Describe the job role, responsibilities, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">Skills Required</label>
            <input
              type="text"
              placeholder="e.g., Python, React, Django"
              value={skills_required}
              onChange={(e) => setSkillsRequired(e.target.value)}
              className="w-full px-4 py-2 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 text-white text-lg font-bold py-3 rounded-xl shadow-md transition-transform duration-200"
          >
            🚀 Submit Job
          </button>

          {message && (
            <p
              className={`mt-4 text-center text-lg font-semibold ${
                message.includes('successfully') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default PostJobForm;
