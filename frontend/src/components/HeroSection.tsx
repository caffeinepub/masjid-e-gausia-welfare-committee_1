export default function HeroSection() {
    const handleScrollTo = (href: string) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-[520px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="/assets/generated/mosque-hero-banner.dim_1440x600.png"
                    alt="Masjid-e-Gausia"
                    className="w-full h-full object-cover object-center"
                />
                {/* Overlay */}
                <div className="absolute inset-0 hero-overlay" />
            </div>

            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gold z-10" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto py-16">
                {/* Decorative star */}
                <div className="flex justify-center mb-6">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M24 2L28.5 18H44L31.5 27.5L36 44L24 34.5L12 44L16.5 27.5L4 18H19.5L24 2Z"
                            fill="oklch(0.78 0.12 75)"
                            opacity="0.9"
                        />
                        <circle cx="24" cy="24" r="6" fill="oklch(0.78 0.12 75)" opacity="0.6" />
                    </svg>
                </div>

                <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight mb-4">
                    Masjid-e-Gausia
                </h1>
                <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl font-semibold text-gold mb-6">
                    Welfare Committee
                </h2>

                {/* Gold divider */}
                <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="h-px w-16 bg-gold/60" />
                    <div className="w-2 h-2 bg-gold rounded-full" />
                    <div className="h-px w-16 bg-gold/60" />
                </div>

                <p className="font-cormorant text-lg sm:text-xl md:text-2xl text-cream/90 italic mb-8 max-w-2xl mx-auto leading-relaxed">
                    "Serving the Community with Faith and Compassion"
                </p>

                <p className="text-cream/75 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
                    Dedicated to uplifting lives through education, healthcare, and community welfare — guided by the principles of Islam and the spirit of brotherhood.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => handleScrollTo('#about')}
                        className="btn-gold font-playfair text-base"
                    >
                        Learn More
                    </button>
                    <button
                        onClick={() => handleScrollTo('#donate')}
                        className="border-2 border-gold text-gold hover:bg-gold hover:text-forest-dark px-6 py-3 rounded font-semibold transition-all duration-200 font-playfair text-base"
                    >
                        Support Us
                    </button>
                </div>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="oklch(0.97 0.012 85)" />
                </svg>
            </div>
        </section>
    );
}
