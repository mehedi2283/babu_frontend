import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Contact({ profile }: any) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  const inputFields = [
    { name: 'name', label: 'Your Name', type: 'text' },
    { name: 'email', label: 'Email Address', type: 'email' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 md:py-40 px-[4%] bg-[#1a1a1a] text-white overflow-hidden"
      style={{ overflowAnchor: 'none' }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-br from-indigo-600/[0.06] via-violet-600/[0.04] to-transparent rounded-full blur-[150px]" />
        {/* Accent glow bottom-right */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/[0.04] rounded-full blur-[120px]" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Floating orbs */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-[15%] w-2 h-2 bg-indigo-500/40 rounded-full blur-[1px]"
        />
        <motion.div
          animate={{ y: [15, -15, 15], x: [5, -5, 5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-40 left-[10%] w-1.5 h-1.5 bg-violet-400/30 rounded-full blur-[1px]"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="mb-20 md:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_14px_rgba(99,102,241,0.7)] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-gray-500">
              Get in touch
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-[-0.03em]">
            Let's create
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              something amazing
            </span>{' '}
            together.
          </h2>
          <p className="mt-6 text-gray-500 text-lg max-w-xl leading-relaxed">
            Have a project in mind? I'd love to hear about it. Drop me a message and let's explore how we can work together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          {/* Form — 3 columns */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <form className="space-y-0" onSubmit={handleSubmit}>
              {inputFields.map((field) => (
                <div key={field.name} className="relative group py-2">
                  <label
                    className={`absolute left-0 transition-all duration-300 pointer-events-none font-medium ${focused === field.name || formData[field.name as keyof typeof formData]
                      ? 'text-[11px] text-indigo-400 -top-1 font-mono uppercase tracking-[0.15em]'
                      : 'text-base text-gray-600 top-6'
                      }`}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-transparent border-b border-gray-800 py-6 text-lg text-white focus:outline-none transition-colors duration-500 focus:border-gray-600"
                  />
                  {/* Animated underline */}
                  <div
                    className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 transition-all duration-700 ease-out ${focused === field.name ? 'w-full' : 'w-0'
                      }`}
                  />
                </div>
              ))}

              {/* Message textarea */}
              <div className="relative group py-2">
                <label
                  className={`absolute left-0 transition-all duration-300 pointer-events-none font-medium ${focused === 'message' || formData.message
                    ? 'text-[11px] text-indigo-400 -top-1 font-mono uppercase tracking-[0.15em]'
                    : 'text-base text-gray-600 top-6'
                    }`}
                >
                  Tell me about your project
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent border-b border-gray-800 py-6 text-lg text-white focus:outline-none resize-none transition-colors duration-500 focus:border-gray-600"
                />
                <div
                  className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 transition-all duration-700 ease-out ${focused === 'message' ? 'w-full' : 'w-0'
                    }`}
                />
              </div>

              {/* Submit button */}
              <div className="pt-10">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative overflow-hidden bg-white text-[#0a0a0a] px-10 py-4 rounded-full text-base font-semibold transition-all duration-500 hover:shadow-[0_8px_40px_rgba(99,102,241,0.25)]"
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">
                    {submitted ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Message Sent!
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Info sidebar — 2 columns */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            {/* Email card */}
            <div className="group p-6 rounded-2xl border border-gray-800/60 bg-white/[0.015] backdrop-blur-sm hover:border-indigo-500/30 hover:bg-white/[0.03] transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-600">Email</span>
              </div>
              <a
                href={`mailto:${profile?.email || 'hello@mehedi.dev'}`}
                className="text-lg font-medium text-gray-300 hover:text-indigo-400 transition-colors duration-300 break-all"
              >
                {profile?.email || 'hello@mehedi.dev'}
              </a>
            </div>

            {/* Social links card */}
            <div className="p-6 rounded-2xl border border-gray-800/60 bg-white/[0.015] backdrop-blur-sm hover:border-indigo-500/30 hover:bg-white/[0.03] transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-600">Connect</span>
              </div>
              <div className="flex flex-col gap-1">
                {[
                  {
                    name: 'LinkedIn',
                    url: profile?.socialLinks?.linkedin,
                    icon: (
                      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    ),
                  },
                  {
                    name: 'Facebook',
                    url: profile?.socialLinks?.facebook,
                    icon: (
                      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    ),
                  },
                  {
                    name: 'Instagram',
                    url: profile?.socialLinks?.instagram,
                    icon: (
                      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link flex items-center justify-between py-3 px-4 -mx-4 rounded-xl hover:bg-white/[0.04] transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600 group-hover/link:text-indigo-400 transition-colors duration-300">
                        {social.icon}
                      </span>
                      <span className="text-gray-400 font-medium group-hover/link:text-white transition-colors duration-300">
                        {social.name}
                      </span>
                    </div>
                    <svg
                      className="w-4 h-4 text-gray-700 group-hover/link:text-indigo-400 transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <motion.div
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] w-fit"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
              </span>
              <span className="text-sm font-medium text-emerald-300/90">Available for new projects</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
