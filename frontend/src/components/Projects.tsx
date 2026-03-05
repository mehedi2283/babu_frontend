import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

// Sticky top value based on how many cards are currently stacked on top of this card
function topForDepth(depth: number): number {
  if (depth <= 0) return 200;
  if (depth === 1) return 150;
  if (depth === 2) return 100;
  return 50;
}

// Max number of real project cards shown in the stacking section
const MAX_STACK = 3;

function ProjectCard({
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
  const fadeIn = useTransform(scrollYProgress, [0, 0.15, 1], [0, 1, 1]);

  // Dynamic sticky top: depth increases as more cards stack above
  const inputRange: number[] = [];
  const outputRange: number[] = [];

  if (total <= 1) {
    inputRange.push(0, 1);
    outputRange.push(200, 200);
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
        style={{ scale, height: 'calc(100vh - 220px)' }}
        className="w-full max-w-[92%] overflow-hidden grid grid-cols-1 md:grid-cols-2 rounded-3xl shadow-sm border border-gray-100 bg-white"
      >
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
              <img key={i} src={logo} alt="Tech" className="h-8 md:h-9 object-contain grayscale hover:grayscale-0 transition-all" />
            ))}
            {!project.techLogos?.length && project.tags?.map((tag: string, i: number) => (
              <span key={i} className="px-3 py-1.5 bg-gray-50 rounded-full text-xs font-semibold uppercase tracking-wider border border-gray-200 text-gray-600">
                {tag}
              </span>
            ))}
          </div>

          {project.stats?.length > 0 && (
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
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

// A non-project CTA card that appears after the 3 stack cards when there are more projects
function ViewAllCard({
  index,
  total,
  extraCount,
  sectionProgress,
}: {
  index: number;
  total: number;
  extraCount: number;
  sectionProgress: MotionValue<number>;
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.92, 1, 1]);
  const fadeIn = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);

  const inputRange: number[] = [];
  const outputRange: number[] = [];

  if (total <= 1) {
    inputRange.push(0, 1);
    outputRange.push(200, 200);
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
        style={{ scale, height: 'calc(100vh - 220px)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', background: 'rgba(255,255,255,0.7)' }}
        className="w-full max-w-[92%] overflow-hidden rounded-3xl flex items-center justify-center border border-white/40"
      >
        <div className="text-center px-8">
          <p className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-4">
            + {extraCount} more project{extraCount > 1 ? 's' : ''}
          </p>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Want to see them all?
          </h3>
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full text-base font-semibold hover:bg-gray-800 transition-colors duration-200"
          >
            View All Projects
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects({ projects }: any) {
  const sectionRef = useRef(null);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const hasMore = projects.length > MAX_STACK;
  // Cards shown in the stack: first MAX_STACK projects + optional CTA card
  const stackedProjects = projects.slice(0, MAX_STACK);
  const total = stackedProjects.length + (hasMore ? 1 : 0); // total cards in section (including CTA)

  return (
    <section id="work" ref={sectionRef} className="relative bg-white">
      {stackedProjects.map((project: any, index: number) => (
        <ProjectCard
          key={project._id}
          project={project}
          index={index}
          total={total}
          sectionProgress={sectionProgress}
        />
      ))}

      {/* CTA card — only shows when there are more than MAX_STACK projects */}
      {hasMore && (
        <ViewAllCard
          index={MAX_STACK}
          total={total}
          extraCount={projects.length - MAX_STACK}
          sectionProgress={sectionProgress}
        />
      )}
    </section>
  );
}
