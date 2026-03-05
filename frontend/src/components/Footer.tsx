import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Footer({ profile }: any) {
    const currentYear = new Date().getFullYear();
    const footerRef = useRef(null);
    const isInView = useInView(footerRef, { once: true, margin: '-50px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    };

    const socialLinks = [
        {
            name: 'LinkedIn',
            url: profile?.socialLinks?.linkedin,
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            ),
        },
        {
            name: 'Facebook',
            url: profile?.socialLinks?.facebook,
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
        },
        {
            name: 'Instagram',
            url: profile?.socialLinks?.instagram,
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
        },
    ];

    const navLinks = [
        { label: 'Work', href: '/#work' },
        { label: 'About', href: '/#about' },
        { label: 'Testimonials', href: '/#testimonials' },
        { label: 'Contact', href: '/#contact' },
        { label: 'All Projects', href: '/projects', isRoute: true },
    ];

    return (
        <footer ref={footerRef} className="relative bg-[#060606] text-white overflow-hidden" style={{ overflowAnchor: 'none' }}>
            {/* Gradient divider line at top */}
            <div className="mx-[4%] h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />

            {/* Subtle ambient glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/[0.03] rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="px-[4%] py-16 md:py-20"
            >
                <div className="max-w-6xl mx-auto">
                    {/* Main footer grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
                        {/* Brand column */}
                        <motion.div variants={itemVariants} className="md:col-span-5">
                            <div className="flex items-center gap-3 mb-6">
                                {profile?.navbarLogo ? (
                                    <img src={profile.navbarLogo} alt="Logo" className="h-8 object-contain brightness-0 invert" />
                                ) : (
                                    <div className="flex gap-1">
                                        {[...Array(3)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={isInView ? { height: 32 } : {}}
                                                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                                className="w-1.5 bg-white transform -skew-x-12 rounded-sm"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-8">
                                {profile?.aboutText?.slice(0, 120) ||
                                    'Building intelligent automation and AI workflows that help businesses operate smarter and scale faster.'}
                                {profile?.aboutText?.length > 120 ? '...' : ''}
                            </p>

                            {/* Social icons */}
                            <div className="flex items-center gap-3">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.url || '#'}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.name}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-10 h-10 rounded-full border border-gray-800/80 flex items-center justify-center text-gray-600 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-400"
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Navigation links */}
                        <motion.div variants={itemVariants} className="md:col-span-3 md:col-start-7">
                            <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-gray-600 mb-6">Navigation</h4>
                            <ul className="space-y-3.5">
                                {navLinks.map((link) => (
                                    <li key={link.label}>
                                        {link.isRoute ? (
                                            <Link
                                                to={link.href}
                                                className="text-gray-500 hover:text-white transition-all duration-300 text-sm font-medium flex items-center gap-2.5 group"
                                            >
                                                <span className="w-0 h-px bg-gradient-to-r from-indigo-500 to-violet-500 group-hover:w-5 transition-all duration-400" />
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <a
                                                href={link.href}
                                                className="text-gray-500 hover:text-white transition-all duration-300 text-sm font-medium flex items-center gap-2.5 group"
                                            >
                                                <span className="w-0 h-px bg-gradient-to-r from-indigo-500 to-violet-500 group-hover:w-5 transition-all duration-400" />
                                                {link.label}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Contact column */}
                        <motion.div variants={itemVariants} className="md:col-span-3">
                            <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-gray-600 mb-6">Contact</h4>
                            <div className="space-y-4">
                                <a
                                    href={`mailto:${profile?.email || 'hello@mehedi.dev'}`}
                                    className="text-gray-500 hover:text-indigo-400 transition-colors duration-300 text-sm font-medium block break-all"
                                >
                                    {profile?.email || 'hello@mehedi.dev'}
                                </a>
                            </div>

                            <div className="mt-8">
                                <Link
                                    to="/admin/login"
                                    className="group text-gray-700 hover:text-gray-400 transition-colors duration-300 text-[11px] font-mono uppercase tracking-[0.2em] flex items-center gap-2"
                                >
                                    Admin
                                    <svg
                                        className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom bar */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-16 pt-8 border-t border-gray-800/40 flex flex-col md:flex-row justify-between items-center gap-4"
                    >
                        <p className="text-gray-700 text-xs font-mono tracking-wider">
                            © {currentYear} {profile?.name || 'Mehedi Hassan'}. All rights reserved.
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-gray-800 rounded-full" />
                            <p className="text-gray-800 text-xs font-mono tracking-wider">
                                Designed & Built with precision
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </footer>
    );
}
