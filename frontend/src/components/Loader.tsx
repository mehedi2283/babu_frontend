import { motion } from 'framer-motion';

export default function Loader() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0f] overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-600/20 via-indigo-600/20 to-cyan-500/20 rounded-full blur-[120px] animate-[pulse_4s_ease-in-out_infinite]" />
            </div>

            <div className="relative flex flex-col items-center gap-8">
                {/* Orbiting rings */}
                <div className="relative w-24 h-24">
                    {/* Outer ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-transparent"
                        style={{
                            borderTopColor: 'rgba(139, 92, 246, 0.8)',
                            borderRightColor: 'rgba(99, 102, 241, 0.4)',
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Middle ring */}
                    <motion.div
                        className="absolute inset-2 rounded-full border-2 border-transparent"
                        style={{
                            borderBottomColor: 'rgba(6, 182, 212, 0.8)',
                            borderLeftColor: 'rgba(59, 130, 246, 0.4)',
                        }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Inner ring */}
                    <motion.div
                        className="absolute inset-4 rounded-full border-2 border-transparent"
                        style={{
                            borderTopColor: 'rgba(167, 139, 250, 0.8)',
                            borderLeftColor: 'rgba(192, 132, 252, 0.3)',
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Center glowing dot */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400 shadow-[0_0_20px_rgba(139,92,246,0.6),0_0_40px_rgba(6,182,212,0.3)]"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>
                </div>

                {/* Loading text */}
                <motion.div
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <div className="flex gap-1">
                        {['L', 'o', 'a', 'd', 'i', 'n', 'g'].map((letter, i) => (
                            <motion.span
                                key={i}
                                className="text-sm font-medium tracking-[0.3em] text-white/60"
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                    ease: 'easeInOut',
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
