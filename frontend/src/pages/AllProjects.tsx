import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function AllProjects() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/projects')
            .then(res => setProjects(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <main className="bg-white min-h-screen pt-24 pb-20 px-[4%]">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-16 flex items-end justify-between">
                    <div>
                        <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">All Work</p>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900">Projects</h1>
                    </div>
                    <Link
                        to="/#work"
                        className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black transition-colors"
                    >
                        <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        Back home
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, i) => (
                        <div
                            key={project._id}
                            className="group rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative h-64 bg-gray-100 overflow-hidden">
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-xs font-mono font-bold text-gray-500">
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h2>
                                <p className="text-gray-500 leading-relaxed text-sm flex-1 mb-6">{project.description}</p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.techLogos?.map((logo: string, j: number) => (
                                        <img key={j} src={logo} alt="tech" className="h-6 object-contain grayscale" />
                                    ))}
                                    {!project.techLogos?.length && project.tags?.map((tag: string, j: number) => (
                                        <span key={j} className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-600 uppercase tracking-wider">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="text-center py-32 text-gray-400">No projects yet.</div>
                )}
            </div>
        </main>
    );
}
