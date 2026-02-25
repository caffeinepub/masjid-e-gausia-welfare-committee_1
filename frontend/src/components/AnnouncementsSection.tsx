import { Bell, Calendar, AlertCircle, Loader2 } from 'lucide-react';
import { useGetAnnouncements } from '../hooks/useQueries';
import GeometricDivider from './GeometricDivider';
import type { Announcement } from '../backend';

function formatDate(timestamp: bigint): string {
    const ms = Number(timestamp) / 1_000_000;
    const date = new Date(ms);
    return date.toLocaleDateString('hi-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function AnnouncementCard({ announcement }: { announcement: Announcement }) {
    return (
        <article className="announcement-card group hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bell className="w-5 h-5 text-gold-dark" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-playfair text-lg font-semibold text-forest-dark mb-2 leading-snug">
                        {announcement.title}
                    </h3>
                    <p className="text-foreground/80 text-sm leading-relaxed mb-3">
                        {announcement.body}
                    </p>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(announcement.date)}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default function AnnouncementsSection() {
    const { data: announcements, isLoading, isError } = useGetAnnouncements();

    return (
        <section id="announcements" className="section-padding bg-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <p className="text-gold font-medium text-sm uppercase tracking-widest mb-2">अपडेट रहें</p>
                    <h2 className="section-title mb-4">घोषणाएं और समाचार</h2>
                    <div className="gold-divider" />
                    <p className="text-muted-foreground mt-6 max-w-xl mx-auto">
                        मस्जिद-ए-गौसिया वेलफेयर कमेटी की नवीनतम खबरों, कार्यक्रमों और घोषणाओं से अपडेट रहें।
                    </p>
                </div>

                {/* Content */}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-16 gap-4">
                        <Loader2 className="w-10 h-10 text-forest animate-spin" />
                        <p className="text-muted-foreground">घोषणाएं लोड हो रही हैं...</p>
                    </div>
                )}

                {isError && (
                    <div className="flex flex-col items-center justify-center py-16 gap-4">
                        <AlertCircle className="w-10 h-10 text-destructive" />
                        <p className="text-muted-foreground">घोषणाएं लोड करने में त्रुटि। कृपया बाद में पुनः प्रयास करें।</p>
                    </div>
                )}

                {!isLoading && !isError && announcements && announcements.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell className="w-8 h-8 text-forest/40" />
                        </div>
                        <h3 className="font-playfair text-xl text-forest-dark mb-2">अभी कोई घोषणा नहीं है</h3>
                        <p className="text-muted-foreground">
                            इस समय कोई घोषणा नहीं है। कृपया जल्द वापस देखें।
                        </p>
                    </div>
                )}

                {!isLoading && !isError && announcements && announcements.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {announcements.map((announcement, index) => (
                            <AnnouncementCard key={index} announcement={announcement} />
                        ))}
                    </div>
                )}
            </div>

            <GeometricDivider className="mt-16" />
        </section>
    );
}
