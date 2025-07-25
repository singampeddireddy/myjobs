import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import context for logout

const HomePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout function from context

  const handleLogout = () => {
    // CRITICAL FIX: Use the central logout function to clear state
    logout();
    navigate('/'); // Redirect to login page after logout
  };

  // This UI is now the sophisticated scrolling homepage
  return (
    <div className="page-content">
        {/* Section 1: Upload Resume */}
        <section className="page-section">
            <div className="content-wrapper">
                <div className="section-grid">
                    <div className="section-content">
                        <h1>Optimize your resume for ATS scanners.</h1>
                        <p>Get invited to more interviews. Our checker simulates an ATS scan to ensure your resume always gets into the hands of a human recruiter.</p>
                        <Link to="/upload" className="btn btn-primary">Upload Your Resume</Link>
                    </div>
                    <div className="section-image">
                        <div className="section-visual-card">
                            <h3>ATS Score Analysis</h3>
                            <div className="card-stat"><span className="label">Overall Score</span><span className="value">87/100</span></div>
                            <div className="card-stat"><span className="label">Keywords</span><span className="value">92%</span></div>
                            <div className="card-stat"><span className="label">Formatting</span><span className="value">Good</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* You can add all the other sections here just like in the main project... */}
        
        {/* Example Logout Button (should be in a footer) */}
        <div style={{textAlign: 'center', padding: '2rem'}}>
            <button onClick={handleLogout} className="btn btn-primary" style={{backgroundColor: '#c53030'}}>
                Logout
            </button>
        </div>
    </div>
  );
};

export default HomePage;