import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

const clientLogos = [
  { name: "Google", color: "#4285F4", url: "https://cdn.worldvectorlogo.com/logos/google-icon.svg" },
  { name: "Meta", color: "#0668E1", url: "https://cdn.worldvectorlogo.com/logos/meta-1.svg" },
  { name: "Amazon", color: "#FF9900", url: "https://cdn.worldvectorlogo.com/logos/amazon-icon.svg" },
  { name: "Microsoft", color: "#00A4EF", url: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg" },
  { name: "Netflix", color: "#E50914", url: "https://cdn.worldvectorlogo.com/logos/netflix-3.svg" },
  { name: "Spotify", color: "#1DB954", url: "https://cdn.worldvectorlogo.com/logos/spotify-2.svg" },
  { name: "Slack", color: "#4A154B", url: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg" },
  { name: "Discord", color: "#5865F2", url: "https://cdn.worldvectorlogo.com/logos/discord-6.svg" },
];

export default function Testimonials({ profile }: any) {
  const [allTestimonials, setAllTestimonials] = useState<any[]>([]);
  const [displayedTestimonials, setDisplayedTestimonials] = useState<any[]>([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState<any | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await api.get('/testimonials');
      const data = res.data;
      setAllTestimonials(data);
      // Initial 4
      setDisplayedTestimonials(data.slice(0, 4));
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  useEffect(() => {
    if (allTestimonials.length <= 4 || isPaused || selectedTestimonial) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalTime = (profile?.testimonialTimer || 5) * 1000;

    timerRef.current = setInterval(() => {
      const pool = allTestimonials.filter(t => !displayedTestimonials.find(dt => dt._id === t._id));
      if (pool.length === 0) return;

      const randomPoolIndex = Math.floor(Math.random() * pool.length);
      const newTestimonial = pool[randomPoolIndex];

      const randomDisplayIndex = Math.floor(Math.random() * 4);

      setDisplayedTestimonials(prev => {
        const next = [...prev];
        next[randomDisplayIndex] = newTestimonial;
        return next;
      });
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [allTestimonials, displayedTestimonials, isPaused, selectedTestimonial, profile?.testimonialTimer]);

  return (
    <section className="py-24 px-[4%] bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
            <h2 className="font-serif italic text-2xl text-gray-900">Trusted by Global Leaders</h2>
          </div>
          <div className="hidden md:block text-sm font-mono text-gray-400 uppercase tracking-widest">
            // 04 CLIENT FEEDBACK
          </div>
        </div>

        {/* Logo Carousel */}
        <div className="relative mb-24 overflow-hidden py-10 border-y border-gray-100">
          <motion.div
            className="flex gap-20 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              <div key={i} className="flex items-center gap-3 group cursor-pointer">
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="h-8 w-auto object-contain transition-all duration-300 filter grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <span className="text-xl font-bold tracking-tighter text-gray-300 group-hover:text-gray-900 transition-colors">
                  {logo.name}
                </span>
              </div>
            ))}
          </motion.div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {displayedTestimonials.map((t, i) => (
              <motion.div
                key={t._id}
                layoutId={t._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedTestimonial(t)}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const ripple = e.currentTarget.querySelector('[data-ripple]') as HTMLElement;
                  if (ripple) {
                    // Position the circle at the entry point (offset by half its size so center lands on cursor)
                    ripple.style.left = `${x - 1000}px`;
                    ripple.style.top = `${y - 1000}px`;
                    // Reset scale instantly, then animate to full
                    ripple.style.transition = 'none';
                    ripple.style.transform = 'scale(0)';
                    // Force reflow so the reset takes effect before the animation
                    void ripple.offsetWidth;
                    ripple.style.transition = 'transform 1.6s cubic-bezier(0.22, 1, 0.36, 1)';
                    ripple.style.transform = 'scale(1)';
                  }
                }}
                onMouseLeave={(e) => {
                  const ripple = e.currentTarget.querySelector('[data-ripple]') as HTMLElement;
                  if (ripple) {
                    ripple.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    ripple.style.transform = 'scale(0)';
                  }
                }}
                className="relative bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 overflow-hidden group cursor-pointer flex flex-col"
                style={{ height: '300px' }}
              >
                {/* Expanding circle — starts from mouse entry, fills entire card */}
                <div
                  data-ripple
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    width: 2000,
                    height: 2000,
                    backgroundColor: t.color || '#6366f1',
                    opacity: 0.06,
                    transform: 'scale(0)',
                  }}
                />

                <div className="relative z-10 flex flex-col flex-1 min-h-0">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="relative">
                      <img
                        src={t.avatar || 'https://via.placeholder.com/150'}
                        alt={t.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg"
                        referrerPolicy="no-referrer"
                      />
                      <div
                        className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white font-bold"
                        style={{ backgroundColor: t.color }}
                      >
                        "
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-gray-900">{t.name}</h4>
                      <p className="text-gray-500 text-sm font-medium">{t.role}</p>
                    </div>
                  </div>
                  {(() => {
                    const words = t.content ? t.content.trim().split(/\s+/) : [];
                    const isLong = words.length > 20;
                    const preview = isLong ? words.slice(0, 20).join(' ') + '...' : t.content;
                    return (
                      <p className="text-gray-700 leading-relaxed text-lg font-medium">
                        "{preview}"
                        {isLong && (
                          <span className="ml-1 text-sm font-semibold text-indigo-500 cursor-pointer whitespace-nowrap">
                            Read more →
                          </span>
                        )}
                      </p>
                    );
                  })()}

                  <div className="mt-8 flex gap-1">
                    {[...Array(t.rating || 5)].map((_, star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal View */}
      <AnimatePresence>
        {selectedTestimonial && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTestimonial(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              layoutId={selectedTestimonial._id}
              className="relative bg-white w-full max-w-3xl p-8 md:p-16 rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-all z-20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l18 18" />
                </svg>
              </button>

              <div
                className="absolute top-0 left-0 w-full h-2"
                style={{ backgroundColor: selectedTestimonial.color }}
              ></div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                  <img
                    src={selectedTestimonial.avatar || 'https://via.placeholder.com/150'}
                    alt={selectedTestimonial.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-center md:text-left">
                    <h4 className="font-bold text-3xl text-gray-900 mb-2">{selectedTestimonial.name}</h4>
                    <p className="text-indigo-600 font-bold tracking-widest uppercase text-sm">{selectedTestimonial.role}</p>
                    <div className="mt-4 flex justify-center md:justify-start gap-1">
                      {[...Array(selectedTestimonial.rating || 5)].map((_, star) => (
                        <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -top-10 -left-6 text-[120px] font-serif text-gray-100 select-none pointer-events-none">"</span>
                  <p className="text-gray-800 leading-relaxed text-2xl font-medium italic relative z-10">
                    {selectedTestimonial.content}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}