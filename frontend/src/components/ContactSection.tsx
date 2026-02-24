import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useSubmitInquiry } from '../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface FormState {
    name: string;
    email: string;
    message: string;
}

const contactInfo = [
    {
        icon: MapPin,
        label: 'Address',
        value: 'Masjid-e-Gausia, [Street Address], [City], [State] - [PIN Code]',
    },
    {
        icon: Phone,
        label: 'Phone',
        value: '+91 XXXXX XXXXX',
    },
    {
        icon: Mail,
        label: 'Email',
        value: 'info@masjidgausia.org',
    },
    {
        icon: Clock,
        label: 'Office Hours',
        value: 'Mon–Sat: 9:00 AM – 6:00 PM',
    },
];

export default function ContactSection() {
    const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [validationError, setValidationError] = useState('');

    const submitInquiry = useSubmitInquiry();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setValidationError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError('');

        if (!form.name.trim()) {
            setValidationError('Please enter your name.');
            return;
        }
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            setValidationError('Please enter a valid email address.');
            return;
        }
        if (!form.message.trim()) {
            setValidationError('Please enter your message.');
            return;
        }

        try {
            await submitInquiry.mutateAsync({
                name: form.name.trim(),
                email: form.email.trim(),
                message: form.message.trim(),
            });
            setSubmitted(true);
            setForm({ name: '', email: '', message: '' });
        } catch {
            // Error handled by mutation state
        }
    };

    return (
        <section id="contact" className="bg-forest-dark">
            {/* Top gold bar */}
            <div className="h-1 w-full bg-gold" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <p className="text-gold font-medium text-sm uppercase tracking-widest mb-2">Get In Touch</p>
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-cream mb-4">Contact Us</h2>
                    <div className="w-24 h-1 bg-gold mx-auto my-4 rounded-full" />
                    <p className="text-cream/70 mt-4 max-w-xl mx-auto">
                        Have a question, need assistance, or want to get involved? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="font-playfair text-xl font-semibold text-gold mb-6">Our Information</h3>

                        {contactInfo.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.label} className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-5 h-5 text-gold" />
                                    </div>
                                    <div>
                                        <p className="text-gold/70 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                                        <p className="text-cream/90 text-sm leading-relaxed">{item.value}</p>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Decorative Islamic pattern */}
                        <div className="mt-8 pt-8 border-t border-cream/10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-px flex-1 bg-gold/20" />
                                <span className="text-gold text-lg">☽</span>
                                <div className="h-px flex-1 bg-gold/20" />
                            </div>
                            <p className="font-cormorant text-lg italic text-cream/60 text-center">
                                "And cooperate in righteousness and piety." — Quran 5:2
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-cream/5 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-cream/10">
                        <h3 className="font-playfair text-xl font-semibold text-gold mb-6">Send a Message</h3>

                        {submitted ? (
                            <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-8 h-8 text-gold" />
                                </div>
                                <h4 className="font-playfair text-xl font-semibold text-cream">Message Sent!</h4>
                                <p className="text-cream/70 text-sm max-w-xs">
                                    Thank you for reaching out. We will get back to you as soon as possible, In sha Allah.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-2 text-gold text-sm hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-cream/80 text-sm">
                                        Full Name <span className="text-gold">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Your full name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="bg-cream/10 border-cream/20 text-cream placeholder:text-cream/40 focus:border-gold focus:ring-gold"
                                        disabled={submitInquiry.isPending}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-cream/80 text-sm">
                                        Email Address <span className="text-gold">*</span>
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="bg-cream/10 border-cream/20 text-cream placeholder:text-cream/40 focus:border-gold focus:ring-gold"
                                        disabled={submitInquiry.isPending}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-cream/80 text-sm">
                                        Message <span className="text-gold">*</span>
                                    </Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="How can we help you?"
                                        value={form.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className="bg-cream/10 border-cream/20 text-cream placeholder:text-cream/40 focus:border-gold focus:ring-gold resize-none"
                                        disabled={submitInquiry.isPending}
                                    />
                                </div>

                                {validationError && (
                                    <div className="flex items-center gap-2 text-destructive text-sm">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        <span>{validationError}</span>
                                    </div>
                                )}

                                {submitInquiry.isError && (
                                    <div className="flex items-center gap-2 text-destructive text-sm">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        <span>Failed to send message. Please try again.</span>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={submitInquiry.isPending}
                                    className="w-full bg-gold hover:bg-gold-dark text-forest-dark font-semibold font-playfair py-3 h-auto"
                                >
                                    {submitInquiry.isPending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Message'
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-cream/10 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-gold/40">
                                <img
                                    src="/assets/generated/committee-logo.dim_256x256.png"
                                    alt="Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="font-playfair text-cream/70 text-sm">
                                Masjid-e-Gausia Welfare Committee
                            </span>
                        </div>

                        <p className="text-cream/50 text-xs text-center">
                            © {new Date().getFullYear()} Masjid-e-Gausia Welfare Committee. All rights reserved.
                        </p>

                        <p className="text-cream/40 text-xs">
                            Built with{' '}
                            <span className="text-gold">♥</span>{' '}
                            using{' '}
                            <a
                                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'masjid-gausia-welfare')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold/70 hover:text-gold transition-colors underline"
                            >
                                caffeine.ai
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </section>
    );
}
