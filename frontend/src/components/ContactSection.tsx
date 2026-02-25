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
        label: 'पता',
        value: 'मस्जिद ए गौसिया वेलफेयर कमिटी, महराजगंज, जौनपुर, उत्तर प्रदेश',
    },
    {
        icon: Phone,
        label: 'फोन',
        value: '+91 XXXXX XXXXX',
    },
    {
        icon: Mail,
        label: 'ईमेल',
        value: 'info@masjidgausia.org',
    },
    {
        icon: Clock,
        label: 'कार्यालय समय',
        value: 'सोम–शनि: सुबह 9:00 – शाम 6:00',
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
            setValidationError('कृपया अपना नाम दर्ज करें।');
            return;
        }
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            setValidationError('कृपया एक वैध ईमेल पता दर्ज करें।');
            return;
        }
        if (!form.message.trim()) {
            setValidationError('कृपया अपना संदेश दर्ज करें।');
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
                    <p className="text-gold font-medium text-sm uppercase tracking-widest mb-2">संपर्क में रहें</p>
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-cream mb-4">हमसे संपर्क करें</h2>
                    <div className="w-24 h-1 bg-gold mx-auto my-4 rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-playfair text-xl font-semibold text-gold mb-6">संपर्क जानकारी</h3>
                            <div className="space-y-5">
                                {contactInfo.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={item.label} className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Icon className="w-5 h-5 text-gold" />
                                            </div>
                                            <div>
                                                <p className="text-gold/70 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                                                <p className="text-cream/90 text-sm leading-relaxed">{item.value}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Decorative quote */}
                        <div className="border-l-4 border-gold/40 pl-4 py-2">
                            <p className="font-cormorant text-lg italic text-cream/70">
                                "और अल्लाह उन लोगों से प्यार करता है जो भलाई करते हैं।"
                            </p>
                            <p className="text-gold/60 text-sm mt-1">— कुरान 2:195</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h3 className="font-playfair text-xl font-semibold text-gold mb-6">संदेश भेजें</h3>

                        {submitted ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <CheckCircle className="w-16 h-16 text-gold mb-4" />
                                <h4 className="font-playfair text-xl font-semibold text-cream mb-2">शुक्रिया!</h4>
                                <p className="text-cream/70">आपका संदेश प्राप्त हो गया है। हम जल्द ही आपसे संपर्क करेंगे।</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 text-gold hover:text-gold/80 text-sm underline transition-colors"
                                >
                                    एक और संदेश भेजें
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-cream/80 text-sm">
                                        आपका नाम <span className="text-gold">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="अपना पूरा नाम दर्ज करें"
                                        className="bg-forest/50 border-gold/20 text-cream placeholder:text-cream/40 focus:border-gold"
                                        disabled={submitInquiry.isPending}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-cream/80 text-sm">
                                        ईमेल पता <span className="text-gold">*</span>
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        className="bg-forest/50 border-gold/20 text-cream placeholder:text-cream/40 focus:border-gold"
                                        disabled={submitInquiry.isPending}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-cream/80 text-sm">
                                        संदेश <span className="text-gold">*</span>
                                    </Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="अपना संदेश यहाँ लिखें..."
                                        rows={5}
                                        className="bg-forest/50 border-gold/20 text-cream placeholder:text-cream/40 focus:border-gold resize-none"
                                        disabled={submitInquiry.isPending}
                                    />
                                </div>

                                {validationError && (
                                    <div className="flex items-center gap-2 text-red-400 text-sm">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        <span>{validationError}</span>
                                    </div>
                                )}

                                {submitInquiry.isError && (
                                    <div className="flex items-center gap-2 text-red-400 text-sm">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        <span>संदेश भेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।</span>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={submitInquiry.isPending}
                                    className="w-full btn-gold font-playfair text-base"
                                >
                                    {submitInquiry.isPending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            भेजा जा रहा है...
                                        </>
                                    ) : (
                                        'संदेश भेजें'
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gold/10 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="font-playfair text-gold font-semibold text-lg mb-1">
                        मस्जिद ए गौसिया वेलफेयर कमिटी
                    </p>
                    <p className="text-cream/50 text-sm mb-4">महराजगंज, जौनपुर, उत्तर प्रदेश</p>
                    <p className="text-cream/40 text-xs">
                        © {new Date().getFullYear()} मस्जिद ए गौसिया वेलफेयर कमिटी। सर्वाधिकार सुरक्षित।
                    </p>
                    <p className="text-cream/30 text-xs mt-2">
                        Built with{' '}
                        <span className="text-gold/60">♥</span>{' '}
                        using{' '}
                        <a
                            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'masjid-gausia')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gold/50 hover:text-gold/70 transition-colors underline"
                        >
                            caffeine.ai
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
