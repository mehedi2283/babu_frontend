import { motion } from 'framer-motion';

export default function Hero({ profile }: any) {
  const defaultLogos = [
    { name: 'n8n', imageUrl: 'https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png' },
    { name: 'Zapier', imageUrl: 'https://cdn.worldvectorlogo.com/logos/zapier.svg' },
    { name: 'Make', imageUrl: 'https://cdn.worldvectorlogo.com/logos/make-logo.svg' },
    { name: 'Voiceflow', imageUrl: 'https://cdn.worldvectorlogo.com/logos/voiceflow.svg' },
    { name: 'Workato', imageUrl: 'https://cdn.worldvectorlogo.com/logos/workato.svg' },
    { name: 'Tray.io', imageUrl: 'https://cdn.worldvectorlogo.com/logos/trayio.svg' },
    { name: 'IFTTT', imageUrl: 'https://cdn.worldvectorlogo.com/logos/ifttt.svg' },
  ];

  const logos = profile?.logos?.length > 0 ? profile.logos : defaultLogos;

  return (
    <section className="min-h-[60vh] flex flex-col justify-center px-[4%] relative overflow-hidden bg-white pt-20 pb-12">
      <div className="w-full">
        <div className="flex items-center gap-2.5 text-[0.95rem] italic font-serif text-indigo-600 mb-8">
          <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.6)] animate-pulse"></span>
          {profile?.heroSubtitle || "Available for work"}
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#141414] w-full max-w-5xl"
        >
          {profile?.heroTitle || "I'm Mehedi, I Design & Deploy Scalable Automation & AI Workflows."}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 flex flex-wrap gap-x-10 gap-y-6 items-center"
        >
          {logos.map((logo: any, index: number) => {
            const imageUrl = typeof logo === 'string' ? logo : logo?.imageUrl;
            if (!imageUrl) return null;
            return (
              <div key={index} className="flex items-center shrink-0 h-14">
                <img 
                  src={imageUrl} 
                  alt={logo.name || "Tool Logo"} 
                  referrerPolicy="no-referrer"
                  className="h-10 md:h-12 w-auto max-w-[180px] object-contain transition-transform hover:scale-110 duration-300" 
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
