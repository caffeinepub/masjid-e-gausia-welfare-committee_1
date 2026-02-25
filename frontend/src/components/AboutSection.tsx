import { Heart, Users, BookOpen, Star } from 'lucide-react';
import GeometricDivider from './GeometricDivider';

const values = [
    {
        icon: Heart,
        title: 'करुणा',
        description: 'हम अपने समुदाय के हर सदस्य की सेवा सहानुभूति, देखभाल और बिना शर्त समर्थन के साथ करते हैं।',
    },
    {
        icon: Users,
        title: 'भाईचारा',
        description: 'पृष्ठभूमि की परवाह किए बिना सभी समुदाय के सदस्यों के बीच एकता और एकजुटता को बढ़ावा देना।',
    },
    {
        icon: BookOpen,
        title: 'शिक्षा',
        description: 'ज्ञान, सीखने और आध्यात्मिक विकास के माध्यम से अगली पीढ़ी को सशक्त बनाना।',
    },
    {
        icon: Star,
        title: 'ईमानदारी',
        description: 'हमारे सभी प्रयासों में पारदर्शिता, सच्चाई और जवाबदेही के साथ कार्य करना।',
    },
];

export default function AboutSection() {
    return (
        <section id="about" className="section-padding bg-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <p className="text-gold font-medium text-sm uppercase tracking-widest mb-2">हम कौन हैं</p>
                    <h2 className="section-title mb-4">हमारे बारे में</h2>
                    <div className="gold-divider" />
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    {/* Text Content */}
                    <div className="space-y-5">
                        <p className="font-cormorant text-xl text-forest-dark leading-relaxed">
                            <strong>मस्जिद ए गौसिया वेलफेयर कमिटी, महराजगंज, जौनपुर</strong> एक समुदाय-संचालित संगठन है जो हमारे स्थानीय मुस्लिम समुदाय और उससे परे की जरूरतों की सेवा के लिए समर्पित है।
                        </p>
                        <p className="text-foreground/80 leading-relaxed">
                            इस्लामी भाईचारे और सामाजिक जिम्मेदारी के सिद्धांतों पर स्थापित, हमारी कमिटी आवश्यक सेवाएं प्रदान करने, कमजोर परिवारों का समर्थन करने और हमारे समुदाय के बंधनों को मजबूत करने के लिए अथक परिश्रम करती है। हमारा मानना है कि हर व्यक्ति सम्मान, अवसर और देखभाल का हकदार है।
                        </p>
                        <p className="text-foreground/80 leading-relaxed">
                            हमारे कार्यक्रमों में शिक्षा सहायता, खाद्य वितरण, चिकित्सा सहायता और सामुदायिक कार्यक्रम शामिल हैं — सभी का उद्देश्य आस्था और करुणा में निहित एक समृद्ध, आत्मनिर्भर समुदाय बनाना है।
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <div className="h-px flex-1 bg-gold/30" />
                            <span className="text-gold text-xl">✦</span>
                            <div className="h-px flex-1 bg-gold/30" />
                        </div>
                        <blockquote className="font-cormorant text-lg italic text-forest border-l-4 border-gold pl-4">
                            "लोगों में सबसे अच्छे वे हैं जो दूसरों के लिए सबसे अधिक लाभकारी हैं।"
                            <footer className="text-sm text-muted-foreground mt-1 not-italic">— पैगंबर मुहम्मद ﷺ</footer>
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
                                <h3 className="font-playfair text-2xl font-bold text-gold">हमारा मिशन</h3>
                                <p className="text-cream/90 leading-relaxed">
                                    महराजगंज, जौनपुर के समुदाय के लिए आशा और समर्थन का केंद्र बनना — कल्याण सेवाएं प्रदान करना, शिक्षा को बढ़ावा देना और सभी के लिए आध्यात्मिक कल्याण का पोषण करना।
                                </p>
                                <div className="grid grid-cols-3 gap-4 pt-2">
                                    <div className="text-center p-4 bg-forest-light/30 rounded-lg">
                                        <div className="font-playfair text-3xl font-bold text-gold">10+</div>
                                        <div className="text-cream/80 text-sm mt-1">सेवा के वर्ष</div>
                                    </div>
                                    <div className="text-center p-4 bg-forest-light/30 rounded-lg">
                                        <div className="font-playfair text-3xl font-bold text-gold">4</div>
                                        <div className="text-cream/80 text-sm mt-1">मुख्य कार्यक्रम</div>
                                    </div>
                                    <div className="text-center p-4 bg-forest-light/30 rounded-lg">
                                        <div className="font-playfair text-3xl font-bold text-gold">100+</div>
                                        <div className="text-cream/80 text-sm mt-1">स्वयंसेवक</div>
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
