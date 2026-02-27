import React from 'react';
import { Heart, CreditCard, Building2, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import DecorativePattern from './DecorativePattern';

const bankDetails = [
  { label: 'बैंक का नाम', value: 'State Bank of India' },
  { label: 'खाता नाम', value: 'Masjid-e-Gausia Welfare Committee' },
  { label: 'खाता संख्या', value: '1234567890123' },
  { label: 'IFSC कोड', value: 'SBIN0001234' },
  { label: 'शाखा', value: 'Main Branch' },
];

const impactStats = [
  { number: '0', label: 'कुल दान राशि' },
  { number: '0', label: 'लाभार्थी परिवार' },
  { number: '0', label: 'सीधे लाभार्थियों तक' },
  { number: '0', label: 'पारदर्शिता' },
];

export default function DonateSection() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  return (
    <section id="donate" className="py-20 bg-champagne relative overflow-hidden">
      <DecorativePattern opacity={0.04} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-orange font-semibold text-sm uppercase tracking-widest mb-2">
            दान करें
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-near-black font-serif mb-4">
            नेकी में हाथ बटाएं
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-near-black/70 max-w-2xl mx-auto text-base leading-relaxed">
            आपका हर दान किसी जरूरतमंद के जीवन में बदलाव लाता है। अल्लाह आपके दान को
            कई गुना बढ़ाकर लौटाता है।
          </p>
          <blockquote className="mt-6 text-forest italic text-sm">
            "जो लोग अल्लाह की राह में अपना माल खर्च करते हैं, उनकी मिसाल उस दाने की तरह है
            जिससे सात बालियां उगती हैं।"
            <footer className="text-near-black/45 text-xs mt-1 not-italic">(सूरह अल-बकरा, 2:261)</footer>
          </blockquote>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Bank details */}
          <div className="bg-white rounded-3xl p-8 border border-gold/25 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-gold-600" style={{ color: 'oklch(65% 0.12 85)' }} />
              </div>
              <div>
                <h3 className="text-near-black font-bold text-lg font-serif">बैंक ट्रांसफर</h3>
                <p className="text-near-black/50 text-xs">सीधे बैंक खाते में दान करें</p>
              </div>
            </div>

            <div className="space-y-3">
              {bankDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-center justify-between bg-champagne rounded-xl px-4 py-3 group border border-gold/15"
                >
                  <div>
                    <p className="text-near-black/50 text-xs mb-0.5">{detail.label}</p>
                    <p className="text-near-black font-medium text-sm">{detail.value}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(detail.value, detail.label)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gold hover:text-orange"
                    title="कॉपी करें"
                  >
                    {copiedField === detail.label ? (
                      <CheckCircle className="w-4 h-4 text-forest" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gold/10 rounded-xl border border-gold/25">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4 text-orange" />
                <p className="text-near-black font-semibold text-sm">UPI भुगतान</p>
              </div>
              <p className="text-near-black/70 text-sm font-mono">masjidgausia@sbi</p>
            </div>
          </div>

          {/* Impact stats */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <h3 className="text-near-black font-bold text-xl font-serif mb-2 flex items-center gap-2">
                <Heart className="w-5 h-5 text-orange fill-current" />
                आपके दान का प्रभाव
              </h3>
              <p className="text-near-black/60 text-sm leading-relaxed mb-6">
                हम पूरी पारदर्शिता के साथ आपके दान का उपयोग करते हैं। हर रुपया सीधे
                जरूरतमंदों तक पहुंचता है।
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {impactStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl p-5 text-center border border-gold/20 hover:border-gold/45 hover:shadow-md transition-all duration-300"
                >
                  <p className="text-2xl sm:text-3xl font-bold text-orange font-serif mb-1">
                    {stat.number}
                  </p>
                  <p className="text-near-black/60 text-xs leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-orange/8 rounded-2xl p-6 border border-orange/20">
              <p className="text-near-black/80 text-sm leading-relaxed">
                <span className="text-orange font-semibold">नोट:</span> दान की रसीद के लिए
                हमसे संपर्क करें। आपका दान आयकर अधिनियम की धारा 80G के तहत कर-मुक्त है।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
