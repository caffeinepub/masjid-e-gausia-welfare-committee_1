import React from 'react';
import { Heart, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/mosque-hero.dim_1920x1080.png"
          alt="मस्जिद ए गौसिया"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-near-black/70 via-near-black/50 to-near-black/80" />
      </div>

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <img
          src="/assets/generated/geometric-pattern.dim_800x800.png"
          alt=""
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Bismillah */}
        <p className="text-gold text-2xl sm:text-3xl mb-4 font-arabic tracking-widest opacity-90">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/assets/generated/committee-logo.dim_256x256.png"
            alt="Committee Logo"
            className="w-24 h-24 rounded-full border-4 border-gold/60 shadow-2xl object-cover"
          />
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ivory mb-4 font-serif leading-tight">
          मस्जिद ए गौसिया
        </h1>
        <h2 className="text-xl sm:text-2xl lg:text-3xl text-gold font-semibold mb-2 font-serif">
          वेलफेयर कमेटी
        </h2>
        <h3 className="text-base sm:text-lg lg:text-xl text-gold/80 font-medium mb-6 font-serif">
          महराजगंज जैनपुर
        </h3>

        <p className="text-ivory/85 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          समाज की सेवा, शिक्षा का प्रसार, और जरूरतमंदों की मदद के लिए समर्पित एक संस्था।
          हम मिलकर एक बेहतर समाज बनाते हैं।
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => handleScroll('#donate')}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-orange text-white font-bold text-lg rounded-full hover:bg-orange/90 transition-all duration-200 shadow-lg hover:shadow-orange/30 hover:scale-105"
          >
            <Heart className="w-5 h-5 fill-current" />
            दान करें
          </button>
          <button
            onClick={() => handleScroll('#about')}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-ivory font-bold text-lg rounded-full border-2 border-gold/60 hover:bg-gold/10 hover:border-gold transition-all duration-200"
          >
            हमारे बारे में जानें
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => handleScroll('#about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/70 hover:text-gold transition-colors animate-bounce"
        aria-label="नीचे स्क्रॉल करें"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
