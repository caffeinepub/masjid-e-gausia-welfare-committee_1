import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSubmitInquiry } from '../hooks/useQueries';

const contactInfo = [
  {
    icon: MapPin,
    title: 'पता',
    lines: ['मस्जिद ए गौसिया', 'मुख्य सड़क, शहर'],
  },
  {
    icon: Phone,
    title: 'फोन',
    lines: ['+91 98765 43210', '+91 87654 32109'],
  },
  {
    icon: Mail,
    title: 'ईमेल',
    lines: ['info@masjidgausia.org'],
  },
  {
    icon: Clock,
    title: 'कार्यालय समय',
    lines: ['सोमवार से शनिवार', 'सुबह 9 बजे से शाम 6 बजे तक'],
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const submitInquiry = useSubmitInquiry();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'नाम आवश्यक है';
    if (!form.email.trim()) newErrors.email = 'ईमेल आवश्यक है';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'सही ईमेल पता दर्ज करें';
    if (!form.message.trim()) newErrors.message = 'संदेश आवश्यक है';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      await submitInquiry.mutateAsync(form);
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    } catch {
      setErrors({ submit: 'संदेश भेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।' });
    }
  };

  return (
    <section id="contact" className="py-20 bg-champagne relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-orange font-semibold text-sm uppercase tracking-widest mb-2">
            संपर्क करें
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-near-black font-serif mb-4">
            हमसे जुड़ें
          </h2>
          <div className="gold-divider" />
          <p className="text-near-black/65 max-w-xl mx-auto text-base mt-6 leading-relaxed">
            किसी भी सहायता, जानकारी, या सुझाव के लिए हमसे संपर्क करें।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="space-y-5">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.title}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gold/15"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-near-black text-sm mb-1">{info.title}</h3>
                    {info.lines.map((line, i) => (
                      <p key={i} className="text-near-black/65 text-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Islamic quote */}
            <div className="bg-near-black rounded-2xl p-6">
              <p className="text-gold/90 italic text-sm leading-relaxed mb-2">
                "और एक-दूसरे की मदद करो नेकी और तकवे में।"
              </p>
              <p className="text-ivory/40 text-xs">(सूरह अल-माइदा, 5:2)</p>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gold/15">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-near-black font-serif">
                  संदेश भेज दिया गया!
                </h3>
                <p className="text-near-black/60 text-sm max-w-xs">
                  आपका संदेश हमें मिल गया है। हम जल्द ही आपसे संपर्क करेंगे।
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-orange text-sm font-medium hover:underline"
                >
                  नया संदेश भेजें
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-near-black font-serif mb-6">
                  संदेश भेजें
                </h3>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-name" className="text-near-black/80 text-sm font-medium">
                    आपका नाम *
                  </Label>
                  <Input
                    id="contact-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="अपना पूरा नाम लिखें"
                    className="border-gold/30 focus:border-gold"
                    disabled={submitInquiry.isPending}
                  />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-email" className="text-near-black/80 text-sm font-medium">
                    ईमेल पता *
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="border-gold/30 focus:border-gold"
                    disabled={submitInquiry.isPending}
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-message" className="text-near-black/80 text-sm font-medium">
                    संदेश *
                  </Label>
                  <Textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="अपना संदेश यहां लिखें..."
                    rows={4}
                    className="border-gold/30 focus:border-gold resize-none"
                    disabled={submitInquiry.isPending}
                  />
                  {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
                </div>

                {errors.submit && (
                  <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-2">
                    {errors.submit}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitInquiry.isPending}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-orange text-white font-semibold rounded-xl hover:bg-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitInquiry.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      भेज रहे हैं...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      संदेश भेजें
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
