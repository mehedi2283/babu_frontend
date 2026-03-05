import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from './api';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AllProjects from './pages/AllProjects';
import Navbar from './components/Navbar';
import Loader from './components/Loader';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await api.get('/auth/me');
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      }

      try {
        const res = await api.get('/profile');
        setProfile(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }

      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      <div className="bg-white min-h-screen text-[#141414] font-sans">
        <Routes>
          <Route path="/" element={<><Navbar profile={profile} /><Home /></>} />
          <Route path="/projects" element={<><Navbar profile={profile} /><AllProjects /></>} />
          <Route path="/admin/login" element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminLogin setAuth={setIsAuthenticated} />} />
          <Route path="/admin/dashboard" element={isAuthenticated ? <AdminDashboard setAuth={setIsAuthenticated} /> : <Navigate to="/admin/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
