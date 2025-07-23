import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobList from './components/JobList';
import JobMatch from './components/JobMatch';
import ResumeList from './components/ResumeList';
import ResumeMatchAllJobs from './components/ResumeMatchAllJobs';
import PostJobForm from './components/PostJobForm';
import UploadResume from './components/UploadResume';
import OnlineJobs from './components/OnlineJobs';
import MatchOnlineJobs from './components/MatchOnlineJobs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/match" element={<JobMatch />} />
        <Route path="/post-job" element={<PostJobForm />} />
        <Route path="/resumes" element={<ResumeList />} />
        <Route path="/match-resume" element={<ResumeMatchAllJobs />} />
        <Route path="/online-jobs" element={<OnlineJobs />} />
        <Route path ="/match-online-jobs" element = {<MatchOnlineJobs />} />
      </Routes>
    </Router>
  );
}
export default App;