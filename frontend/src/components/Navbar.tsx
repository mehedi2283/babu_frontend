import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ profile }: any) {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-4 text-black backdrop-blur-xl bg-white/80 px-[4%] transition-all duration-300">
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
          <a href="#work" onClick={(e) => scrollToSection(e, 'work')} className="hover:opacity-50 transition-opacity">Work</a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:opacity-50 transition-opacity">About</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:opacity-50 transition-opacity">Contact</a>
        </div>
      </div>
    </nav>
  );
}
