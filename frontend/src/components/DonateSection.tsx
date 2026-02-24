import { Heart, Banknote, Phone, Mail } from 'lucide-react';
import GeometricDivider from './GeometricDivider';

const donationImpacts = [
    { amount: '₹500', impact: 'Feeds a family for a week' },
    { amount: '₹1,000', impact: 'Provides school supplies for a child' },
    { amount: '₹2,500', impact: 'Covers medical expenses for one patient' },
    { amount: '₹5,000', impact: 'Sponsors a student for a month' },
];

export default function DonateSection() {
    const handleScrollToContact = () => {
        const el = document.querySelector('#contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="donate" className="section-padding relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 islamic-pattern-bg" />
            <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="donate-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="white" strokeWidth="1"/>
                            <path d="M30 10L50 30L30 50L10 30Z" fill="none" stroke="white" strokeWidth="0.5"/>
                            <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#donate-pattern)"/>
                </svg>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <p className="text-gold font-medium text-sm uppercase tracking-widest mb-2">Make a Difference</p>
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-cream mb-4">
                        Support Our Mission
                    </h2>
                    <div className="w-24 h-1 bg-gold mx-auto my-4 rounded-full" />
                    <p className="text-cream/80 mt-6 max-w-2xl mx-auto leading-relaxed text-lg font-cormorant italic">
                        "Whoever saves one life, it is as if he has saved all of mankind." — Quran 5:32
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Left: Appeal */}
                    <div className="space-y-6">
                        <div className="bg-cream/10 backdrop-blur-sm rounded-lg p-6 border border-gold/20">
                            <div className="flex items-center gap-3 mb-4">
                                <Heart className="w-6 h-6 text-gold" />
                                <h3 className="font-playfair text-xl font-semibold text-cream">Why Your Support Matters</h3>
                            </div>
                            <p className="text-cream/85 leading-relaxed">
                                Every contribution, no matter how small, makes a profound difference in the lives of
                                those we serve. Your generosity enables us to continue our welfare programs and reach
                                more families in need.
                            </p>
                        </div>

                        <div className="bg-cream/10 backdrop-blur-sm rounded-lg p-6 border border-gold/20">
                            <div className="flex items-center gap-3 mb-4">
                                <Banknote className="w-6 h-6 text-gold" />
                                <h3 className="font-playfair text-xl font-semibold text-cream">Your Donation Impact</h3>
                            </div>
                            <div className="space-y-3">
                                {donationImpacts.map((item) => (
                                    <div key={item.amount} className="flex items-center gap-3">
                                        <span className="font-bold text-gold font-playfair w-16 flex-shrink-0">{item.amount}</span>
                                        <span className="text-cream/80 text-sm">{item.impact}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Donation Details */}
                    <div className="space-y-6">
                        <div className="bg-cream rounded-lg p-8 border-2 border-gold shadow-gold">
                            <h3 className="font-playfair text-2xl font-bold text-forest-dark mb-2 text-center">
                                Donate Now
                            </h3>
                            <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />

                            <div className="space-y-4 mb-6">
                                <div className="bg-cream-dark rounded-lg p-4">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Bank Transfer</p>
                                    <p className="font-semibold text-forest-dark">Masjid-e-Gausia Welfare Committee</p>
                                    <p className="text-sm text-foreground/70 mt-1">Account No: XXXX-XXXX-XXXX</p>
                                    <p className="text-sm text-foreground/70">IFSC: XXXXXXXX</p>
                                    <p className="text-sm text-foreground/70">Bank: [Bank Name], [Branch]</p>
                                </div>

                                <div className="bg-cream-dark rounded-lg p-4">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">UPI / QR Code</p>
                                    <p className="font-semibold text-forest-dark">UPI ID: masjidgausia@upi</p>
                                    <p className="text-sm text-foreground/70 mt-1">Scan QR code at our office</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-foreground/70">
                                    <Phone className="w-4 h-4 text-forest" />
                                    <span>Call us: +91 XXXXX XXXXX</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-foreground/70">
                                    <Mail className="w-4 h-4 text-forest" />
                                    <span>Email: donate@masjidgausia.org</span>
                                </div>
                            </div>

                            <button
                                onClick={handleScrollToContact}
                                className="w-full mt-6 btn-primary text-center font-playfair text-base"
                            >
                                Contact Us to Donate
                            </button>
                        </div>

                        <p className="text-cream/60 text-xs text-center">
                            All donations are used solely for community welfare programs. Receipts available on request.
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative z-10">
                <GeometricDivider className="mt-16 opacity-40" />
            </div>
        </section>
    );
}
