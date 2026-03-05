export default function About({ profile }: any) {
  return (
    <section id="about" className="py-32 px-[4%] bg-gray-50 relative z-50">
      <div className="flex flex-col md:flex-row gap-20 items-center justify-between">
        <div className="flex-1">
          <div className="text-sm uppercase tracking-widest text-gray-500 mb-8">• About Me</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-12">
            {profile?.aboutText || "I'm Mehedi Hassan, a passionate AI & Automation Engineer helping businesses streamline operations with intelligent workflows."}
          </h2>
        </div>
        <div className="flex-shrink-0">
          <div className="relative aspect-square rounded-none overflow-hidden bg-gray-200 w-full md:w-[500px]">
            {profile?.profileImage && (
              <img src={profile.profileImage} alt="Profile" className="absolute inset-0 w-full h-full object-cover" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
