import { GraduationCap, ShoppingBasket, Stethoscope, CalendarDays, Home, HandHeart } from 'lucide-react';
import GeometricDivider from './GeometricDivider';

const services = [
    {
        icon: GraduationCap,
        title: 'Education Support',
        description:
            'Providing scholarships, tutoring, and educational resources to students from underprivileged families. We believe education is the foundation of a better future.',
        color: 'bg-forest/10 text-forest',
    },
    {
        icon: ShoppingBasket,
        title: 'Food & Ration Distribution',
        description:
            'Monthly ration distribution to needy families, ensuring no one in our community goes hungry. Special food drives during Ramadan and Eid.',
        color: 'bg-gold/10 text-gold-dark',
    },
    {
        icon: Stethoscope,
        title: 'Medical Assistance',
        description:
            'Facilitating access to healthcare for those who cannot afford it — including medical camps, medicine distribution, and hospital referrals.',
        color: 'bg-forest/10 text-forest',
    },
    {
        icon: CalendarDays,
        title: 'Community Events',
        description:
            'Organizing Islamic lectures, Quran recitation programs, Eid celebrations, and community gatherings to strengthen our bonds.',
        color: 'bg-gold/10 text-gold-dark',
    },
    {
        icon: Home,
        title: 'Housing Aid',
        description:
            'Assisting families in need with temporary shelter support and home repair assistance for the most vulnerable members of our community.',
        color: 'bg-forest/10 text-forest',
    },
    {
        icon: HandHeart,
        title: 'Widow & Orphan Care',
        description:
            'Dedicated support programs for widows and orphans, providing financial assistance, counseling, and community integration.',
        color: 'bg-gold/10 text-gold-dark',
    },
];

export default function ServicesSection() {
    return (
        <section id="services" className="section-padding bg-cream-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <p className="text-gold font-medium text-sm uppercase tracking-widest mb-2">What We Do</p>
                    <h2 className="section-title mb-4">Services & Programs</h2>
                    <div className="gold-divider" />
                    <p className="text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
                        Our welfare programs are designed to address the most pressing needs of our community,
                        guided by the Islamic principles of charity, justice, and compassion.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={service.title}
                                className="service-card group"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-5 ${service.color} transition-transform duration-300 group-hover:scale-110`}>
                                    <Icon className="w-7 h-7" />
                                </div>

                                {/* Content */}
                                <h3 className="font-playfair text-xl font-semibold text-forest-dark mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Bottom accent */}
                                <div className="mt-5 pt-4 border-t border-border">
                                    <span className="text-gold text-xs font-medium uppercase tracking-wider">
                                        Learn More →
                                    </span>
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
