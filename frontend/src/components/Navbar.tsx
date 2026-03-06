import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ profile }: any) {
  useEffect(() => {
    if (profile?.navbarLogo) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = profile.navbarLogo;
    }
  }, [profile?.navbarLogo]);
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const element = document.getElementById(id);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] py-4 text-black backdrop-blur-2xl bg-white/40 border-b border-black/5 px-[4%] transition-all duration-300 shadow-sm">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center group">
          {profile?.navbarLogo ? (
            <img src={profile.navbarLogo} alt="Logo" className="h-8 object-contain" />
          ) : (
            <div className="flex gap-1.5 overflow-hidden">
              <div className="w-1.5 h-8 bg-black transform -skew-x-12 group-hover:scale-y-110 transition-transform duration-300"></div>
              <div className="w-1.5 h-8 bg-black transform -skew-x-12 group-hover:scale-y-125 transition-transform duration-300 delay-75"></div>
              <div className="w-1.5 h-8 bg-black transform -skew-x-12 group-hover:scale-y-110 transition-transform duration-300 delay-150"></div>
            </div>
          )}
        </Link>
        <div className="flex gap-10 text-base font-semibold tracking-tight">
          <a href="/#work" onClick={(e) => scrollToSection(e, 'work')} className="hover:opacity-50 transition-opacity">Work</a>
          <a href="/#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:opacity-50 transition-opacity">About</a>
          <a href="/#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:opacity-50 transition-opacity">Contact</a>
        </div>
      </div>
    </nav>
  );
}
