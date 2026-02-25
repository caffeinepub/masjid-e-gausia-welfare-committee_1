import { GraduationCap, ShoppingBasket, Stethoscope, CalendarDays, Home, HandHeart } from 'lucide-react';
import GeometricDivider from './GeometricDivider';

const services = [
    {
        icon: GraduationCap,
        title: 'शिक्षा सहायता',
        description:
            'वंचित परिवारों के छात्रों को छात्रवृत्ति, ट्यूशन और शैक्षिक संसाधन प्रदान करना। हमारा मानना है कि शिक्षा एक बेहतर भविष्य की नींव है।',
        color: 'bg-forest/10 text-forest',
    },
    {
        icon: ShoppingBasket,
        title: 'भोजन और राशन वितरण',
        description:
            'जरूरतमंद परिवारों को मासिक राशन वितरण, यह सुनिश्चित करना कि हमारे समुदाय में कोई भूखा न रहे। रमजान और ईद के दौरान विशेष खाद्य अभियान।',
        color: 'bg-gold/10 text-gold-dark',
    },
    {
        icon: Stethoscope,
        title: 'चिकित्सा सहायता',
        description:
            'उन लोगों के लिए स्वास्थ्य सेवा तक पहुंच सुगम बनाना जो इसे वहन नहीं कर सकते — चिकित्सा शिविर, दवा वितरण और अस्पताल रेफरल सहित।',
        color: 'bg-forest/10 text-forest',
    },
    {
        icon: CalendarDays,
        title: 'सामुदायिक कार्यक्रम',
        description:
            'इस्लामी व्याख्यान, कुरान पाठ कार्यक्रम, ईद समारोह और सामुदायिक सभाओं का आयोजन करना ताकि हमारे बंधन मजबूत हों।',
        color: 'bg-gold/10 text-gold-dark',
    },
    {
        icon: Home,
        title: 'आवास सहायता',
        description:
            'हमारे समुदाय के सबसे कमजोर सदस्यों के लिए अस्थायी आश्रय समर्थन और घर की मरम्मत सहायता के साथ जरूरतमंद परिवारों की मदद करना।',
        color: 'bg-forest/10 text-forest',
    },
    {
        icon: HandHeart,
        title: 'विधवा और अनाथ देखभाल',
        description:
            'विधवाओं और अनाथों के लिए समर्पित सहायता कार्यक्रम, वित्तीय सहायता, परामर्श और सामुदायिक एकीकरण प्रदान करना।',
        color: 'bg-gold/10 text-gold-dark',
    },
];

export default function ServicesSection() {
    return (
        <section id="services" className="section-padding bg-cream-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <p className="text-gold font-medium text-sm uppercase tracking-widest mb-2">हम क्या करते हैं</p>
                    <h2 className="section-title mb-4">सेवाएं और कार्यक्रम</h2>
                    <div className="gold-divider" />
                    <p className="text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
                        हमारे कल्याण कार्यक्रम हमारे समुदाय की सबसे जरूरी जरूरतों को पूरा करने के लिए बनाए गए हैं, जो दान, न्याय और करुणा के इस्लामी सिद्धांतों द्वारा निर्देशित हैं।
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={service.title}
                                className="bg-card rounded-lg p-6 border border-border hover:border-gold/40 hover:shadow-md transition-all duration-200 flex flex-col gap-4"
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${service.color}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-playfair text-lg font-semibold text-forest-dark mb-2">{service.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <GeometricDivider className="mt-16" />
        </section>
    );
}
