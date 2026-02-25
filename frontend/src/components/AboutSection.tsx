import React from 'react';
import { Heart, BookOpen, Users, Star } from 'lucide-react';
import DecorativePattern from './DecorativePattern';

const values = [
  {
    icon: Heart,
    title: 'सेवा भाव',
    description: 'हर जरूरतमंद की मदद करना हमारा पहला कर्तव्य है।',
  },
  {
    icon: BookOpen,
    title: 'शिक्षा',
    description: 'ज्ञान और शिक्षा के प्रसार से समाज का उत्थान।',
  },
  {
    icon: Users,
    title: 'एकता',
    description: 'समाज में भाईचारे और एकता को बढ़ावा देना।',
  },
  {
    icon: Star,
    title: 'ईमानदारी',
    description: 'पारदर्शिता और ईमानदारी से हर कार्य करना।',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-ivory relative overflow-hidden">
      <DecorativePattern opacity={0.04} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-orange font-semibold text-sm uppercase tracking-widest mb-2">
            हमारे बारे में
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-near-black font-serif mb-4">
            मस्जिद ए गौसिया वेलफेयर कमेटी
          </h2>
          <div className="gold-divider" />
          <p className="text-near-black/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mt-6">
            हमारी संस्था समाज के हर वर्ग की सेवा के लिए प्रतिबद्ध है। शिक्षा, स्वास्थ्य,
            और आर्थिक सहायता के माध्यम से हम एक समृद्ध समाज बनाने का प्रयास करते हैं।
          </p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gold/20 hover:border-gold/50 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                  <Icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-bold text-near-black text-lg mb-2 font-serif">{value.title}</h3>
                <p className="text-near-black/65 text-sm leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>

        {/* Mission panel — light warm background */}
        <div className="bg-champagne rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-gold/30 shadow-gold">
          <DecorativePattern opacity={0.05} />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-orange font-semibold text-sm uppercase tracking-widest mb-3">
                हमारा मिशन
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-near-black font-serif mb-4 leading-snug">
                समाज की सेवा में समर्पित
              </h3>
              <p className="text-near-black/70 leading-relaxed mb-6">
                मस्जिद ए गौसिया वेलफेयर कमेटी का उद्देश्य समाज के कमजोर वर्गों को सशक्त बनाना,
                शिक्षा का प्रसार करना, और जरूरतमंदों को हर संभव सहायता प्रदान करना है।
              </p>
              <blockquote className="border-l-4 border-gold pl-4">
                <p className="text-forest italic text-sm leading-relaxed">
                  "और जो लोग अल्लाह की राह में खर्च करते हैं, उनकी मिसाल उस दाने की तरह है
                  जिससे सात बालियां उगती हैं।"
                </p>
                <footer className="text-near-black/45 text-xs mt-2">(सूरह अल-बकरा, 2:261)</footer>
              </blockquote>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '0', label: 'परिवारों की मदद' },
                { number: '0', label: 'छात्रवृत्तियां' },
                { number: '0', label: 'चिकित्सा शिविर' },
                { number: '0', label: 'वर्षों की सेवा' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl p-5 text-center border border-gold/30 shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-3xl font-bold text-orange font-serif">{stat.number}</p>
                  <p className="text-near-black/65 text-xs mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
