import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import api from '../api';

function topForDepth(depth: number): number {
    if (depth <= 0) return 140; // Top offset for the AllProjects page
    if (depth === 1) return 100;
    if (depth === 2) return 60;
    return 30;
}

function AllProjectCard({
    project,
    index,
    total,
    sectionProgress,
}: {
    project: any;
    index: number;
    total: number;
    sectionProgress: MotionValue<number>;
}) {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const scale = useTransform(scrollYProgress, [0, 0.4, 0.5, 1], [0.92, 1, 1, 0.99]);

    const depthRange: number[] = [];
    const darkenRange: number[] = [];
    if (total <= 1) {
        depthRange.push(0, 1);
        darkenRange.push(0, 0);
    } else {
        for (let front = 0; front < total; front++) {
            const p = front / (total - 1);
            const depth = Math.max(0, front - index);
            depthRange.push(p);
            darkenRange.push(Math.min(depth * 0.12, 0.35));
        }
    }
    const darkenOpacity = useTransform(sectionProgress, depthRange, darkenRange);

    const inputRange: number[] = [];
    const outputRange: number[] = [];
    if (total <= 1) {
        inputRange.push(0, 1);
        outputRange.push(140, 140);
    } else {
        for (let front = 0; front < total; front++) {
            const p = front / (total - 1);
            const depth = Math.max(0, front - index);
            inputRange.push(p);
            outputRange.push(topForDepth(depth));
        }
    }
    const stickyTop = useTransform(sectionProgress, inputRange, outputRange);

    return (
        <motion.div
            ref={ref}
            style={{
                position: 'sticky',
                top: stickyTop,
                height: '100vh',
                zIndex: index + 1,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: 8,
            }}
        >
            <motion.div
                style={{ scale, height: 'calc(100vh - 160px)' }}
                className="w-full max-w-[92%] overflow-hidden grid grid-cols-1 md:grid-cols-2 rounded-3xl shadow-sm border border-gray-100 bg-white relative"
            >
                <motion.div
                    style={{ opacity: darkenOpacity }}
                    className="absolute inset-0 bg-black rounded-3xl z-30 pointer-events-none"
                />

                {/* Image */}
                <div className="relative bg-gray-200 order-1" style={{ height: '100%' }}>
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                </div>

                {/* Content */}
                <div className="p-10 md:p-16 flex flex-col justify-center bg-gray-50 order-2 overflow-y-auto">
                    <div className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">
                        {String(index + 1).padStart(2, '0')} / Project
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-5 text-gray-900">{project.title}</h3>
                    <p className="text-base text-gray-600 mb-8 leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-4 mb-10 items-center">
                        {project.techLogos?.map((logo: string, i: number) => (
                            <img key={i} src={logo} alt="Tech" className="h-8 md:h-9 object-contain transition-all" />
                        ))}
                        {!project.techLogos?.length && project.tags?.map((tag: string, i: number) => (
                            <span key={i} className="px-3 py-1.5 bg-gray-50 rounded-full text-xs font-semibold uppercase tracking-wider border border-gray-200 text-gray-600">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {project.stats?.length > 0 && (
                        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200 flex-shrink-0">
                            {project.stats.map((stat: any, i: number) => (
                                <div key={i}>
                                    <div className="text-2xl font-bold mb-0.5 text-gray-900">
                                        {stat.value}{' '}
                                        <span className="text-gray-400 font-medium text-lg">{stat.label}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">{stat.description}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function AllProjects() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const sectionRef = useRef(null);

    const { scrollYProgress: sectionProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

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
        <main className="bg-white min-h-screen pt-24 pb-20 overflow-visible">
            <div className="max-w-[92%] mx-auto mb-16 flex items-end justify-between px-4">
                <div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900">All Projects</h1>
                    <p className="text-gray-500 mt-4 leading-relaxed max-w-xl">
                        A complete archive of everything I've built, from workflow automations to AI-integrated systems.
                    </p>
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

            <section ref={sectionRef} className="relative w-full">
                {projects.map((project, i) => (
                    <AllProjectCard
                        key={project._id}
                        project={project}
                        index={i}
                        total={projects.length}
                        sectionProgress={sectionProgress}
                    />
                ))}

                {projects.length === 0 && (
                    <div className="text-center py-32 text-gray-400">No projects yet.</div>
                )}
            </section>
        </main>
    );
}
