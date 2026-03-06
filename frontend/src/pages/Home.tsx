import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

export default function Home() {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState([]);
  const [apiLoaded, setApiLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (apiLoaded && location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [apiLoaded, location.hash]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes] = await Promise.all([
          api.get('/profile'),
          api.get('/projects')
        ]);
        setProfile(profileRes.data);
        setProjects(projectsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Continue rendering even if API fails
      } finally {
        setApiLoaded(true);
      }
    };
    fetchData();
  }, []);

  if (!apiLoaded) return <Loader />;

  return (
    <main className="bg-white text-[#141414]">
      <Hero profile={profile} />
      <Projects projects={projects} />
      <About profile={profile} />
      <Testimonials profile={profile} />
      <Contact profile={profile} />
      <Footer profile={profile} />
    </main>
  );
}
