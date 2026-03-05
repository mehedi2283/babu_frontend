import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

function DeleteModal({ isOpen, onClose, onConfirm, title, message }: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative bg-[#12131c] border border-white/10 p-6 rounded-2xl shadow-2xl w-full max-w-sm"
          >
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 border border-red-500/20">
              <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-white/60 mb-6">{message}</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => { onConfirm(); onClose(); }}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function AdminDashboard({ setAuth }: any) {
  const [theme, setTheme] = useState(localStorage.getItem('adminTheme') || 'dark');
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [profile, setProfile] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('adminTheme', theme);
  }, [theme]);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
  };

  useEffect(() => {
    fetchProjects();
    fetchTestimonials();
    fetchProfile();
  }, []);

  const fetchProjects = async () => { const res = await api.get('/projects'); setProjects(res.data); };
  const fetchTestimonials = async () => { const res = await api.get('/testimonials'); setTestimonials(res.data); };
  const fetchProfile = async () => { const res = await api.get('/profile'); setProfile(res.data); };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    navigate('/');
  };

  const tabs = [
    { id: 'projects', label: 'Projects', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z', count: projects.length },
    { id: 'testimonials', label: 'Clients', icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z', count: testimonials.length },
    { id: 'profile', label: 'Settings', icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  return (
    <div className="min-h-screen bg-[#0c0d14]">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 right-6 z-[100] px-5 py-3.5 rounded-2xl backdrop-blur-xl border flex items-center gap-3 shadow-2xl ${notification.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}
          >
            <div className={`w-2 h-2 rounded-full animate-pulse ${notification.type === 'success' ? 'bg-emerald-400' : 'bg-red-400'}`} />
            <span className="font-medium text-sm">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-[#12131c]/80 backdrop-blur-2xl border-b border-white/[0.06] sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 h-16 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <span className="text-lg font-bold text-white/90 tracking-tight">Studio</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/[0.06]">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/70'
                    }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-violet-500/20 rounded-lg"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tab.icon} /></svg>
                  <span className="relative z-10">{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`relative z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${activeTab === tab.id ? 'bg-violet-500/30 text-violet-300' : 'bg-white/[0.06] text-white/30'}`}>{tab.count}</span>
                  )}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            <button onClick={handleLogout} className="text-sm font-medium text-gray-500 hover:text-red-500 dark:text-white/40 dark:hover:text-red-400 px-4 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300 flex items-center gap-2 border border-transparent dark:hover:border-red-500/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Mobile tabs */}
      <div className="md:hidden flex gap-1 p-2 mx-4 mt-4 bg-white/[0.04] rounded-xl border border-white/[0.06]">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-2.5 rounded-lg text-xs font-medium transition-all ${activeTab === tab.id ? 'bg-violet-500/20 text-violet-300 border border-violet-500/20' : 'text-white/40'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <main className="max-w-[1600px] mx-auto px-6 lg:px-10 py-8">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
            {activeTab === 'projects' ? (
              <ProjectsManager projects={projects} refresh={fetchProjects} editingProject={editingProject} setEditingProject={setEditingProject} notify={showNotification} />
            ) : activeTab === 'testimonials' ? (
              <TestimonialsManager testimonials={testimonials} refresh={fetchTestimonials} editingTestimonial={editingTestimonial} setEditingTestimonial={setEditingTestimonial} notify={showNotification} />
            ) : (
              <ProfileManager profile={profile} refresh={fetchProfile} notify={showNotification} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

/* ─── Input helper ─── */
const inputClass = "w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/90 placeholder-white/20 focus:border-violet-500/40 focus:bg-violet-500/[0.04] focus:ring-2 focus:ring-violet-500/10 outline-none transition-all text-sm";
const labelClass = "text-[11px] font-semibold text-white/30 uppercase tracking-widest";

function ProjectsManager({ projects, refresh, editingProject, setEditingProject, notify }: any) {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [uploading, setUploading] = useState(false);
  const [techLogos, setTechLogos] = useState<string[]>([]);
  const [stats, setStats] = useState<{ label: string, value: string, description: string }[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (editingProject) {
      setValue('title', editingProject.title);
      setValue('description', editingProject.description);
      setValue('link', editingProject.link);
      setValue('tags', editingProject.tags.join(', '));
      setValue('imageUrl', editingProject.imageUrl);
      setTechLogos(editingProject.techLogos || []);
      setStats(editingProject.stats || []);
    } else { reset(); setTechLogos([]); setStats([]); }
  }, [editingProject, setValue, reset]);

  const onSubmit = async (data: any) => {
    const payload = { ...data, tags: (data.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean), techLogos, stats };
    try {
      if (editingProject) { await api.put(`/projects/${editingProject._id}`, payload); notify('Project updated!'); }
      else { await api.post('/projects', payload); notify('Project published!'); }
      reset(); setTechLogos([]); setStats([]); setEditingProject(null); refresh();
    } catch { notify('Failed to save project', 'error'); }
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0]; if (!file) return;
    const formData = new FormData(); formData.append('image', file); setUploading(true);
    try { const res = await api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }); setValue('imageUrl', res.data.url); }
    catch { console.error('Upload failed'); } finally { setUploading(false); }
  };

  const handleTechLogoUpload = async (e: any) => {
    const file = e.target.files[0]; if (!file) return;
    const formData = new FormData(); formData.append('image', file); setUploading(true);
    try { const res = await api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }); setTechLogos([...techLogos, res.data.url]); }
    catch { console.error('Upload failed'); } finally { setUploading(false); }
  };

  const addStat = () => setStats([...stats, { label: '', value: '', description: '' }]);
  const updateStat = (i: number, field: string, val: string) => { const s = [...stats]; (s[i] as any)[field] = val; setStats(s); };
  const removeStat = (i: number) => setStats(stats.filter((_, idx) => idx !== i));
  const removeTechLogo = (i: number) => setTechLogos(techLogos.filter((_, idx) => idx !== i));

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try { await api.delete(`/projects/${deleteId}`); notify('Project deleted'); refresh(); }
    catch { notify('Failed to delete', 'error'); }
    setDeleteId(null);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
      />
      {/* Form */}
      <div className="xl:col-span-5">
        <div className="bg-white/[0.03] backdrop-blur-xl p-7 rounded-2xl border border-white/[0.06] sticky top-24">
          <div className="flex items-center gap-3 mb-7">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${editingProject ? 'bg-amber-500/15' : 'bg-violet-500/15'}`}>
              <svg className={`w-5 h-5 ${editingProject ? 'text-amber-400' : 'text-violet-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={editingProject ? 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' : 'M12 4v16m8-8H4'} />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-white/90">{editingProject ? 'Edit Project' : 'New Project'}</h3>
              <p className="text-xs text-white/30">{editingProject ? 'Update details' : 'Create a new entry'}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className={labelClass}>Title</label>
              <input {...register('title', { required: true })} className={inputClass} placeholder="e.g. AI Lead Gen" />
            </div>
            <div className="space-y-1.5">
              <label className={labelClass}>Description</label>
              <textarea {...register('description', { required: true })} rows={3} className={inputClass + ' resize-none'} placeholder="Describe the project..." />
            </div>
            <div className="space-y-1.5">
              <label className={labelClass}>Live Link</label>
              <input {...register('link')} className={inputClass} placeholder="https://..." />
            </div>
            <div className="space-y-1.5">
              <label className={labelClass}>Tags</label>
              <input {...register('tags')} className={inputClass} placeholder="React, Node.js, AI" />
            </div>

            {/* Image Upload */}
            <div className="space-y-1.5">
              <label className={labelClass}>Cover Image</label>
              {watch('imageUrl') ? (
                <div className="relative group rounded-xl overflow-hidden border border-white/[0.08]">
                  <img src={watch('imageUrl')} alt="Preview" className="w-full h-36 object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer px-4 py-2 bg-white/10 backdrop-blur rounded-lg text-sm font-medium text-white hover:bg-white/20 transition border border-white/10">
                      Change <input type="file" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center h-28 border-2 border-dashed border-white/10 rounded-xl hover:border-violet-500/40 hover:bg-violet-500/[0.04] transition-all">
                  <svg className="w-7 h-7 text-white/20 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className="text-xs text-white/30 font-medium">Click to upload</span>
                  <input type="file" onChange={handleImageUpload} className="hidden" />
                </label>
              )}
              <input {...register('imageUrl', { required: true })} type="hidden" />
              {uploading && <p className="text-xs text-violet-400 animate-pulse font-medium">⬆ Uploading...</p>}
            </div>

            {/* Tech Logos */}
            <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
              <label className={labelClass}>Tech Stack</label>
              <div className="flex flex-wrap gap-2">
                {techLogos.map((logo, i) => (
                  <div key={i} className="relative group">
                    <img src={logo} alt="Tech" className="h-10 w-auto border border-white/[0.08] p-1.5 rounded-lg bg-white/[0.03]" />
                    <button type="button" onClick={() => removeTechLogo(i)} className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                  </div>
                ))}
                <label className="cursor-pointer h-10 w-10 border-2 border-dashed border-white/10 rounded-lg flex items-center justify-center hover:border-violet-500/40 transition-all">
                  <span className="text-lg text-white/20">+</span>
                  <input type="file" onChange={handleTechLogoUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
              <div className="flex justify-between items-center">
                <label className={labelClass}>Stats</label>
                <button type="button" onClick={addStat} className="text-xs font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Add
                </button>
              </div>
              {stats.map((stat, i) => (
                <div key={i} className="space-y-2 p-3 bg-white/[0.02] rounded-xl border border-white/[0.06]">
                  <div className="flex gap-2 items-center">
                    <input placeholder="Value" value={stat.value} onChange={(e) => updateStat(i, 'value', e.target.value)} className={inputClass} />
                    <input placeholder="Label" value={stat.label} onChange={(e) => updateStat(i, 'label', e.target.value)} className={inputClass} />
                    <button type="button" onClick={() => removeStat(i)} className="text-red-400/60 hover:text-red-400 p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                  </div>
                  <input placeholder="Description" value={stat.description} onChange={(e) => updateStat(i, 'description', e.target.value)} className={inputClass} />
                </div>
              ))}
            </div>

            <div className="pt-4 flex gap-3">
              <button type="submit" className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-violet-500/20 transition-all active:scale-[0.98]">
                {editingProject ? '✓ Update' : '↑ Publish'}
              </button>
              {editingProject && (
                <button type="button" onClick={() => { setEditingProject(null); reset(); setTechLogos([]); setStats([]); }} className="px-5 py-3.5 border border-white/[0.08] rounded-xl text-sm font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.04] transition-all">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Project Cards */}
      <div className="xl:col-span-7 space-y-3">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-white/20 uppercase tracking-[0.2em]">Projects ({projects.length})</h3>
        </div>
        {projects.length === 0 && (
          <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] p-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.04] flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" /></svg>
            </div>
            <p className="text-white/40 font-medium">No projects yet</p>
            <p className="text-white/20 text-sm mt-1">Create your first project</p>
          </div>
        )}
        {projects.map((project: any) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/[0.03] p-4 rounded-2xl border border-white/[0.06] flex gap-4 items-center group hover:border-violet-500/20 hover:bg-violet-500/[0.02] transition-all duration-300"
          >
            <img src={project.imageUrl} alt={project.title} className="w-24 h-18 object-cover rounded-xl bg-white/[0.04] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white/90 truncate">{project.title}</h4>
              <p className="text-white/30 text-xs line-clamp-1 mt-0.5">{project.description}</p>
              <div className="flex gap-1.5 mt-2">
                {project.techLogos?.slice(0, 4).map((logo: string, i: number) => (
                  <img key={i} src={logo} className="h-4 w-auto opacity-40" alt="tech" />
                ))}
              </div>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => setEditingProject(project)} className="p-2.5 text-white/30 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </button>
              <button onClick={() => setDeleteId(project._id)} className="p-2.5 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TestimonialsManager({ testimonials, refresh, editingTestimonial, setEditingTestimonial, notify }: any) {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (editingTestimonial) {
      setValue('name', editingTestimonial.name);
      setValue('role', editingTestimonial.role);
      setValue('content', editingTestimonial.content);
      setValue('avatar', editingTestimonial.avatar);
      setValue('color', editingTestimonial.color);
      setValue('rating', editingTestimonial.rating);
    } else { reset(); setValue('color', '#8B5CF6'); setValue('rating', 5); }
  }, [editingTestimonial, setValue, reset]);

  const onSubmit = async (data: any) => {
    try {
      if (editingTestimonial) { await api.put(`/testimonials/${editingTestimonial._id}`, data); notify('Testimonial updated!'); }
      else { await api.post('/testimonials', data); notify('Testimonial added!'); }
      reset(); setEditingTestimonial(null); refresh();
    } catch { notify('Failed to save testimonial', 'error'); }
  };

  const handleAvatarUpload = async (e: any) => {
    const file = e.target.files[0]; if (!file) return;
    const formData = new FormData(); formData.append('image', file); setUploading(true);
    try { const res = await api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }); setValue('avatar', res.data.url); }
    catch { console.error('Upload failed'); } finally { setUploading(false); }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try { await api.delete(`/testimonials/${deleteId}`); notify('Testimonial deleted'); refresh(); }
    catch { notify('Failed to delete', 'error'); }
    setDeleteId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Client"
        message="Are you sure you want to delete this client testimonial? This action cannot be undone."
      />
      {/* Form */}
      <div className="lg:col-span-5">
        <div className="bg-white/[0.03] backdrop-blur-xl p-7 rounded-2xl border border-white/[0.06] sticky top-24">
          <div className="flex items-center gap-3 mb-7">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${editingTestimonial ? 'bg-amber-500/15' : 'bg-cyan-500/15'}`}>
              <svg className={`w-5 h-5 ${editingTestimonial ? 'text-amber-400' : 'text-cyan-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={editingTestimonial ? 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' : 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'} />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-white/90">{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <p className="text-xs text-white/30">{editingTestimonial ? 'Update client feedback' : 'Add client feedback'}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className={labelClass}>Client Name</label>
              <input {...register('name', { required: true })} className={inputClass} placeholder="e.g. Maria Gomez" />
            </div>
            <div className="space-y-1.5">
              <label className={labelClass}>Role / Company</label>
              <input {...register('role', { required: true })} className={inputClass} placeholder="Marketing Director, Acme Corp" />
            </div>
            <div className="space-y-1.5">
              <label className={labelClass}>Testimonial</label>
              <textarea {...register('content', { required: true })} rows={4} className={inputClass + ' resize-none'} placeholder="What did they say?" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={labelClass}>Accent Color</label>
                <div className="flex items-center gap-3">
                  <input {...register('color')} type="color" className="w-10 h-10 p-0.5 bg-transparent border border-white/[0.08] rounded-lg cursor-pointer" />
                  <span className="text-xs text-white/20">{watch('color') || '#8B5CF6'}</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>Rating (1-5)</label>
                <input {...register('rating')} type="number" min="1" max="5" className={inputClass} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className={labelClass}>Avatar</label>
              <div className="flex items-center gap-4">
                {watch('avatar') ? (
                  <div className="relative group">
                    <img src={watch('avatar')} alt="Avatar" className="w-14 h-14 rounded-full object-cover border-2 border-violet-500/30" />
                    <label className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <input type="file" onChange={handleAvatarUpload} className="hidden" />
                    </label>
                  </div>
                ) : (
                  <label className="cursor-pointer w-14 h-14 border-2 border-dashed border-white/10 rounded-full flex items-center justify-center hover:border-violet-500/40 transition-all">
                    <svg className="w-5 h-5 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <input type="file" onChange={handleAvatarUpload} className="hidden" />
                  </label>
                )}
                <input {...register('avatar')} type="hidden" />
                {uploading && <p className="text-xs text-violet-400 animate-pulse">Uploading...</p>}
              </div>
            </div>
            <div className="pt-4 flex gap-3">
              <button type="submit" className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-violet-500/20 transition-all active:scale-[0.98]">
                {editingTestimonial ? '✓ Update' : '+ Add Testimonial'}
              </button>
              {editingTestimonial && (
                <button type="button" onClick={() => { setEditingTestimonial(null); reset(); }} className="px-5 py-3.5 border border-white/[0.08] rounded-xl text-sm font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.04] transition-all">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Testimonial Cards */}
      <div className="lg:col-span-7 space-y-3">
        <h3 className="text-xs font-bold text-white/20 uppercase tracking-[0.2em] mb-4">Client Feedback ({testimonials.length})</h3>
        {testimonials.map((t: any) => (
          <motion.div
            key={t._id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/[0.03] p-5 rounded-2xl border border-white/[0.06] group hover:border-violet-500/20 hover:bg-violet-500/[0.02] transition-all duration-300"
          >
            <div className="flex gap-4 items-start">
              <img src={t.avatar || 'https://via.placeholder.com/150'} alt={t.name} className="w-12 h-12 object-cover rounded-full border-2 border-white/[0.08] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-sm font-bold text-white/90">{t.name}</h4>
                  <div className="flex gap-0.5">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                </div>
                <p className="text-white/30 text-xs mb-2">{t.role}</p>
                <p className="text-white/50 text-sm line-clamp-2 italic leading-relaxed">"{t.content}"</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <button onClick={() => setEditingTestimonial(t)} className="p-2 text-white/30 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button onClick={() => setDeleteId(t._id)} className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProfileManager({ profile, refresh, notify }: any) {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [uploading, setUploading] = useState(false);
  const [logos, setLogos] = useState<{ name: string, imageUrl: string }[]>([]);
  const [clientLogos, setClientLogos] = useState<{ name: string, imageUrl: string }[]>([]);

  useEffect(() => {
    if (profile) {
      setValue('heroTitle', profile.heroTitle);
      setValue('heroSubtitle', profile.heroSubtitle);
      setValue('navbarLogo', profile.navbarLogo);
      setValue('aboutText', profile.aboutText);
      setValue('profileImage', profile.profileImage);
      setValue('email', profile.email);
      setValue('socialLinks.linkedin', profile.socialLinks?.linkedin);
      setValue('socialLinks.facebook', profile.socialLinks?.facebook);
      setValue('socialLinks.instagram', profile.socialLinks?.instagram);
      setValue('testimonialTimer', profile.testimonialTimer || 5);
      setLogos(profile.logos || []);
      setClientLogos(profile.clientLogos || []);
    }
  }, [profile, setValue]);

  const onSubmit = async (data: any) => {
    try { await api.put('/profile', { ...data, logos, clientLogos }); refresh(); notify('Settings saved!'); }
    catch { notify('Failed to save settings', 'error'); }
  };

  const handleImageUpload = async (e: any, field: string) => {
    const file = e.target.files[0]; if (!file) return;
    const formData = new FormData(); formData.append('image', file); setUploading(true);
    try { const res = await api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }); setValue(field, res.data.url); }
    catch { console.error('Upload failed'); } finally { setUploading(false); }
  };

  const handleLogoUpload = async (e: any) => {
    const file = e.target.files[0]; if (!file) return;
    const formData = new FormData(); formData.append('image', file); setUploading(true);
    try { const res = await api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }); setLogos([...logos, { name: '', imageUrl: res.data.url }]); }
    catch { console.error('Upload failed'); } finally { setUploading(false); }
  };

  const handleClientLogoUpload = async (e: any) => {
    const file = e.target.files[0]; if (!file) return;
    const formData = new FormData(); formData.append('image', file); setUploading(true);
    try { const res = await api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }); setClientLogos([...clientLogos, { name: '', imageUrl: res.data.url }]); }
    catch { console.error('Upload failed'); } finally { setUploading(false); }
  };

  const updateLogoName = (i: number, name: string) => { const l = [...logos]; l[i].name = name; setLogos(l); };
  const removeLogo = (i: number) => setLogos(logos.filter((_, idx) => idx !== i));

  const updateClientLogoName = (i: number, name: string) => { const l = [...clientLogos]; l[i].name = name; setClientLogos(l); };
  const removeClientLogo = (i: number) => setClientLogos(clientLogos.filter((_, idx) => idx !== i));

  return (
    <div className="bg-white/[0.03] backdrop-blur-xl p-8 rounded-3xl border border-white/[0.06] max-w-4xl mx-auto">
      <h3 className="text-xl font-bold mb-8 text-white/90">Profile & Brand Settings</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* Main Info */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest border-b border-white/[0.06] pb-2">Hero Section</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5"><label className={labelClass}>Hero Title</label><input {...register('heroTitle')} className={inputClass} /></div>
            <div className="space-y-1.5"><label className={labelClass}>Hero Subtitle</label><input {...register('heroSubtitle')} className={inputClass} /></div>
          </div>
        </div>

        {/* Global branding */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest border-b border-white/[0.06] pb-2">Branding & Contact</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5"><label className={labelClass}>Contact Email</label><input {...register('email')} className={inputClass} /></div>
            <div className="space-y-1.5"><label className={labelClass}>Testimonial Timer (sec)</label><input {...register('testimonialTimer')} type="number" className={inputClass} /></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelClass}>Navbar Logo</label>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                {watch('navbarLogo') ? <img src={watch('navbarLogo')} className="h-10 w-auto bg-white/10 p-2 rounded-lg" alt="logo" /> : <div className="h-10 w-10 bg-white/[0.04] rounded-lg"></div>}
                <label className="cursor-pointer text-xs font-semibold bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors">Change <input type="file" onChange={e => handleImageUpload(e, 'navbarLogo')} className="hidden" /></label>
              </div>
            </div>
            <div className="space-y-2">
              <label className={labelClass}>About Image</label>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                {watch('profileImage') ? <img src={watch('profileImage')} className="h-10 w-10 object-cover rounded-lg" alt="profile" /> : <div className="h-10 w-10 bg-white/[0.04] rounded-lg"></div>}
                <label className="cursor-pointer text-xs font-semibold bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors">Change <input type="file" onChange={e => handleImageUpload(e, 'profileImage')} className="hidden" /></label>
              </div>
            </div>
          </div>
        </div>

        {/* About text */}
        <div className="space-y-1.5">
          <label className={labelClass}>About Text</label>
          <textarea {...register('aboutText')} rows={4} className={inputClass + ' resize-none'} />
        </div>

        {/* Socials */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest border-b border-white/[0.06] pb-2">Social Links</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5"><label className={labelClass}>LinkedIn</label><input {...register('socialLinks.linkedin')} className={inputClass} placeholder="https://..." /></div>
            <div className="space-y-1.5"><label className={labelClass}>Facebook</label><input {...register('socialLinks.facebook')} className={inputClass} placeholder="https://..." /></div>
            <div className="space-y-1.5"><label className={labelClass}>Instagram</label><input {...register('socialLinks.instagram')} className={inputClass} placeholder="https://..." /></div>
          </div>
        </div>

        {/* Tool Logos */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest border-b border-white/[0.06] pb-2">Skill / Tool Logos</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {logos.map((logo, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] group">
                <img src={logo.imageUrl} className="w-8 h-8 object-contain bg-white/5 p-1 rounded-lg" />
                <input value={logo.name} onChange={e => updateLogoName(i, e.target.value)} placeholder="Name" className="flex-1 bg-transparent text-sm text-white/80 outline-none" />
                <button type="button" onClick={() => removeLogo(i)} className="text-red-400 opacity-0 group-hover:opacity-100 p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
            ))}
            <label className="cursor-pointer flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-white/10 hover:border-violet-500/40 hover:bg-violet-500/[0.04] transition-colors text-white/30 hover:text-white/60 font-medium text-sm">
              + Add Logo <input type="file" onChange={handleLogoUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Client / Company Logos */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest border-b border-white/[0.06] pb-2">Client / Company Logos</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {clientLogos.map((logo, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] group">
                <img src={logo.imageUrl} className="w-8 h-8 object-contain bg-white/5 p-1 rounded-lg" />
                <input value={logo.name} onChange={e => updateClientLogoName(i, e.target.value)} placeholder="Name" className="flex-1 bg-transparent text-sm text-white/80 outline-none" />
                <button type="button" onClick={() => removeClientLogo(i)} className="text-red-400 opacity-0 group-hover:opacity-100 p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
            ))}
            <label className="cursor-pointer flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-white/10 hover:border-violet-500/40 hover:bg-violet-500/[0.04] transition-colors text-white/30 hover:text-white/60 font-medium text-sm">
              + Add Client Logo <input type="file" onChange={handleClientLogoUpload} className="hidden" />
            </label>
          </div>
        </div>

        <button type="submit" disabled={uploading} className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-base hover:shadow-lg hover:shadow-violet-500/20 transition-all active:scale-[0.99] disabled:opacity-50 mt-4">
          {uploading ? 'Uploading media...' : 'Save All Settings'}
        </button>
      </form>
    </div>
  );
}
