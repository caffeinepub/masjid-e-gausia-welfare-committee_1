import React, { useState, useEffect } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import LoginButton from './LoginButton';

const navLinks = [
  { label: 'होम', href: '#home' },
  { label: 'हमारे बारे में', href: '#about' },
  { label: 'सेवाएं', href: '#services' },
  { label: 'घोषणाएं', href: '#announcements' },
  { label: 'गैलरी', href: '#gallery' },
  { label: 'संपर्क', href: '#contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-ivory/97 shadow-lg shadow-near-black/10'
          : 'bg-ivory/95'
      }`}
      style={{ backdropFilter: 'blur(8px)' }}
    >
      {/* Gold accent bar */}
      <div className="h-1 bg-gradient-to-r from-gold via-orange to-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/committee-logo.dim_256x256.png"
              alt="मस्जिद ए गौसिया"
              className="w-10 h-10 rounded-full object-cover border-2 border-gold/50"
            />
            <div className="hidden sm:block">
              <p className="text-forest font-bold text-sm leading-tight font-serif">
                मस्जिद ए गौसिया
              </p>
              <p className="text-near-black/60 text-xs leading-tight">वेलफेयर कमेटी</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2 text-sm text-near-black/75 hover:text-orange font-medium transition-colors duration-200 rounded-md hover:bg-orange/5"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LoginButton />
            <button
              onClick={() => handleNavClick('#donate')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-orange text-white font-semibold text-sm rounded-full hover:bg-orange/90 transition-colors duration-200 shadow-md"
            >
              <Heart className="w-4 h-4 fill-current" />
              दान करें
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-near-black/70 hover:text-orange transition-colors"
              aria-label="Menu toggle"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-ivory border-t border-gold/30">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-4 py-3 text-near-black/75 hover:text-orange hover:bg-orange/5 rounded-lg transition-colors text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 pb-1 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('#donate')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-orange text-white font-semibold text-sm rounded-full hover:bg-orange/90 transition-colors"
              >
                <Heart className="w-4 h-4 fill-current" />
                दान करें
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
