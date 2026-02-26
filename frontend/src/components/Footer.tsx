import React from 'react';
import { Heart } from 'lucide-react';

const navLinks = [
  { label: 'होम', href: '#home' },
  { label: 'हमारे बारे में', href: '#about' },
  { label: 'सेवाएं', href: '#services' },
  { label: 'घोषणाएं', href: '#announcements' },
  { label: 'गैलरी', href: '#gallery' },
  { label: 'दान करें', href: '#donate' },
  { label: 'संपर्क', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'masjid-gausia-welfare'
  );

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-champagne border-t border-gold/30">
      {/* Gold accent bar */}
      <div className="h-1 bg-gradient-to-r from-gold via-orange to-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/committee-logo.dim_256x256.png"
                alt="Logo"
                className="w-12 h-12 rounded-full border-2 border-gold/40 object-cover"
              />
              <div>
                <p className="text-forest font-bold font-serif">मस्जिद ए गौसिया वेलफेयर कमेटी</p>
                <p className="text-near-black/55 text-xs">महराजगंज जौनपुर</p>
              </div>
            </div>
            <p className="text-near-black/60 text-sm leading-relaxed">
              समाज की सेवा, शिक्षा का प्रसार, और जरूरतमंदों की मदद के लिए समर्पित।
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-forest font-semibold text-sm uppercase tracking-widest mb-4">
              त्वरित लिंक
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-near-black/60 hover:text-orange text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-forest font-semibold text-sm uppercase tracking-widest mb-4">
              संपर्क
            </h4>
            <div className="space-y-2 text-near-black/60 text-sm">
              <p>मस्जिद ए गौसिया, मुख्य सड़क</p>
              <p>महराजगंज जौनपुर</p>
              <p>+91 93246 15229</p>
              <p>info@masjidgausia.org</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-near-black/45">
          <p>
            &copy; {year} मस्जिद ए गौसिया वेलफेयर कमेटी, महराजगंज जौनपुर। सर्वाधिकार सुरक्षित।
          </p>
          <p className="flex items-center gap-1">
            Built with{' '}
            <Heart className="w-3 h-3 text-orange fill-current mx-0.5" />
            {' '}using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange hover:text-orange/80 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
