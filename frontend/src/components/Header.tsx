import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { label: 'हमारे बारे में', href: '#about' },
    { label: 'सेवाएं', href: '#services' },
    { label: 'घोषणाएं', href: '#announcements' },
    { label: 'दान करें', href: '#donate' },
    { label: 'संपर्क करें', href: '#contact' },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleNavClick = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-forest shadow-forest">
            {/* Top gold accent bar */}
            <div className="h-1 w-full bg-gold" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo + Name */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-gold flex-shrink-0">
                            <img
                                src="/assets/generated/committee-logo.dim_256x256.png"
                                alt="मस्जिद ए गौसिया वेलफेयर कमिटी लोगो"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="font-playfair text-gold font-bold text-sm md:text-base leading-tight">
                                मस्जिद ए गौसिया
                            </p>
                            <p className="text-cream text-xs leading-tight opacity-80">
                                वेलफेयर कमिटी
                            </p>
                            <p className="text-cream/60 text-xs leading-tight">
                                महराजगंज, जौनपुर
                            </p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => handleNavClick(link.href)}
                                className="nav-link text-cream hover:text-gold font-medium text-sm tracking-wide transition-colors duration-200"
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-cream hover:text-gold transition-colors p-2"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="मेनू टॉगल करें"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileOpen && (
                <div className="md:hidden bg-forest-dark border-t border-gold/20">
                    <nav className="flex flex-col px-4 py-4 gap-1">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => handleNavClick(link.href)}
                                className="text-cream hover:text-gold hover:bg-forest/50 text-left px-4 py-3 rounded transition-colors duration-200 font-medium text-sm"
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
