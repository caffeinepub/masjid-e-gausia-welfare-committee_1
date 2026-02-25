import React from 'react';
import {
  GraduationCap,
  HeartPulse,
  Home,
  Utensils,
  BookOpen,
  HandHeart,
} from 'lucide-react';

const services = [
  {
    icon: GraduationCap,
    title: 'शिक्षा सहायता',
    description:
      'गरीब और जरूरतमंद छात्रों को छात्रवृत्ति, किताबें, और शैक्षिक सामग्री प्रदान की जाती है।',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: HeartPulse,
    title: 'चिकित्सा सेवा',
    description:
      'नि:शुल्क चिकित्सा शिविर, दवाइयां, और गंभीर बीमारियों में आर्थिक सहायता प्रदान की जाती है।',
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
  {
    icon: Home,
    title: 'आवास सहायता',
    description:
      'बेघर और जरूरतमंद परिवारों को आवास निर्माण में सहायता और मरम्मत के लिए अनुदान दिया जाता है।',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Utensils,
    title: 'खाद्य सहायता',
    description:
      'रमजान और अन्य अवसरों पर राशन वितरण, लंगर, और भोजन की व्यवस्था की जाती है।',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    icon: BookOpen,
    title: 'शिक्षा अभियान',
    description:
      'शिक्षा को समाज की बुनियाद मानता है। हम गरीब और जरूरतमंद बच्चों को मुफ्त शिक्षा, किताबें, यूनिफॉर्म और स्टेशनरी उपलब्ध कराते हैं। मदरसों और स्कूलों में दीनी और दुनियावी दोनों तालीम का इंतजाम किया जाता है। लड़कियों की शिक्षा पर विशेष ध्यान दिया जाता है ताकि समाज में जागरूकता और तरक्की हो। हमारा मकसद है कि कोई भी बच्चा तालीम से महरूम न रहे।',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: HandHeart,
    title: 'विधवा सहायता',
    description:
      'विधवाओं और अनाथ बच्चों को मासिक आर्थिक सहायता और सामाजिक सुरक्षा प्रदान की जाती है।',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-champagne relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-orange font-semibold text-sm uppercase tracking-widest mb-2">
            हमारी सेवाएं
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-near-black font-serif mb-4">
            समाज के लिए हमारे कार्य
          </h2>
          <div className="gold-divider" />
          <p className="text-near-black/65 max-w-xl mx-auto text-base mt-6 leading-relaxed">
            हम विभिन्न क्षेत्रों में समाज की सेवा करते हैं, ताकि हर जरूरतमंद को सहायता मिल सके।
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gold/15 hover:border-gold/40 hover:shadow-lg transition-all duration-300 group"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${service.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-7 h-7 ${service.color}`} />
                </div>
                <h3 className="font-bold text-near-black text-lg mb-3 font-serif">
                  {service.title}
                </h3>
                <p className="text-near-black/65 text-sm leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
