import React, { useEffect, useState } from "react";
import axios from "axios";

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/api/resumes/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setResumes(response.data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Uploaded Resumes</h2>
      {resumes.length === 0 ? (
        <p>No resumes uploaded yet.</p>
      ) : (
        <ul className="list-disc pl-6">
          {resumes.map((resume) => (
            <li key={resume.id}>
              <a
                href={resume.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {resume.file_name || resume.file.split("/").pop()}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResumeList;
