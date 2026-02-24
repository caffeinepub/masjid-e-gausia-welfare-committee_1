import { Heart, Users, BookOpen, Star } from 'lucide-react';
import GeometricDivider from './GeometricDivider';

const values = [
    {
        icon: Heart,
        title: 'Compassion',
        description: 'We serve every member of our community with empathy, care, and unconditional support.',
    },
    {
        icon: Users,
        title: 'Brotherhood',
        description: 'Fostering unity and solidarity among all community members regardless of background.',
    },
    {
        icon: BookOpen,
        title: 'Education',
        description: 'Empowering the next generation through knowledge, learning, and spiritual growth.',
    },
    {
        icon: Star,
        title: 'Integrity',
        description: 'Operating with transparency, honesty, and accountability in all our endeavors.',
    },
];

export default function AboutSection() {
    return (
        <section id="about" className="section-padding bg-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <p className="text-gold font-medium text-sm uppercase tracking-widest mb-2">Who We Are</p>
                    <h2 className="section-title mb-4">About Us</h2>
                    <div className="gold-divider" />
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    {/* Text Content */}
                    <div className="space-y-5">
                        <p className="font-cormorant text-xl text-forest-dark leading-relaxed">
                            The <strong>Masjid-e-Gausia Welfare Committee</strong> is a community-driven organization
                            dedicated to serving the needs of our local Muslim community and beyond.
                        </p>
                        <p className="text-foreground/80 leading-relaxed">
                            Founded on the principles of Islamic brotherhood and social responsibility, our committee
                            works tirelessly to provide essential services, support vulnerable families, and strengthen
                            the bonds of our community. We believe that every individual deserves dignity, opportunity,
                            and care.
                        </p>
                        <p className="text-foreground/80 leading-relaxed">
                            Our programs span education support, food distribution, medical assistance, and community
                            events — all aimed at creating a thriving, self-sufficient community rooted in faith and
                            compassion.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <div className="h-px flex-1 bg-gold/30" />
                            <span className="text-gold text-xl">✦</span>
                            <div className="h-px flex-1 bg-gold/30" />
                        </div>
                        <blockquote className="font-cormorant text-lg italic text-forest border-l-4 border-gold pl-4">
                            "The best of people are those who are most beneficial to others."
                            <footer className="text-sm text-muted-foreground mt-1 not-italic">— Prophet Muhammad ﷺ</footer>
                        </blockquote>
                    </div>

                    {/* Visual Panel */}
                    <div className="relative">
                        <div className="bg-forest rounded-lg p-8 text-cream relative overflow-hidden">
                            {/* Background pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <pattern id="islamic-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke="white" strokeWidth="1"/>
                                            <circle cx="20" cy="20" r="5" fill="none" stroke="white" strokeWidth="1"/>
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#islamic-grid)"/>
                                </svg>
                            </div>
                            <div className="relative z-10 space-y-6">
                                <h3 className="font-playfair text-2xl font-bold text-gold">Our Mission</h3>
                                <p className="text-cream/90 leading-relaxed">
                                    To serve as a beacon of hope and support for our community — providing welfare
                                    services, promoting education, and nurturing spiritual well-being for all.
                                </p>
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="text-center p-4 bg-forest-light/30 rounded-lg">
                                        <div className="font-playfair text-3xl font-bold text-gold">500+</div>
                                        <div className="text-cream/80 text-sm mt-1">Families Served</div>
                                    </div>
                                    <div className="text-center p-4 bg-forest-light/30 rounded-lg">
                                        <div className="font-playfair text-3xl font-bold text-gold">10+</div>
                                        <div className="text-cream/80 text-sm mt-1">Years of Service</div>
                                    </div>
                                    <div className="text-center p-4 bg-forest-light/30 rounded-lg">
                                        <div className="font-playfair text-3xl font-bold text-gold">4</div>
                                        <div className="text-cream/80 text-sm mt-1">Core Programs</div>
                                    </div>
                                    <div className="text-center p-4 bg-forest-light/30 rounded-lg">
                                        <div className="font-playfair text-3xl font-bold text-gold">100+</div>
                                        <div className="text-cream/80 text-sm mt-1">Volunteers</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value) => {
                        const Icon = value.icon;
                        return (
                            <div key={value.title} className="text-center p-6 bg-card rounded-lg border border-border hover:border-gold/40 transition-colors duration-200">
                                <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Icon className="w-6 h-6 text-forest" />
                                </div>
                                <h3 className="font-playfair text-lg font-semibold text-forest-dark mb-2">{value.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <GeometricDivider className="mt-16" />
        </section>
    );
}
