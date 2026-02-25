import React from 'react';
import { Bell, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { useGetAnnouncements } from '../hooks/useQueries';

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  return new Date(ms).toLocaleDateString('hi-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function AnnouncementsSection() {
  const { data: announcements, isLoading, isError } = useGetAnnouncements();

  return (
    <section id="announcements" className="py-20 bg-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-orange font-semibold text-sm uppercase tracking-widest mb-2">
            सूचनाएं
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-near-black font-serif mb-4">
            ताजा घोषणाएं
          </h2>
          <div className="gold-divider" />
          <p className="text-near-black/65 max-w-xl mx-auto text-base mt-6 leading-relaxed">
            कमेटी की नवीनतम गतिविधियों और कार्यक्रमों की जानकारी यहां देखें।
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Loader2 className="w-10 h-10 text-orange animate-spin" />
            <p className="text-near-black/60 text-sm">घोषणाएं लोड हो रही हैं...</p>
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <AlertCircle className="w-10 h-10 text-red-500" />
            <p className="text-near-black/70 text-sm">
              घोषणाएं लोड करने में त्रुटि हुई। कृपया पुनः प्रयास करें।
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && (!announcements || announcements.length === 0) && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-16 h-16 rounded-full bg-orange/10 flex items-center justify-center">
              <Bell className="w-8 h-8 text-orange" />
            </div>
            <p className="text-near-black/60 text-base font-medium">
              अभी कोई घोषणा नहीं है।
            </p>
            <p className="text-near-black/45 text-sm">
              नई घोषणाएं यहां दिखाई देंगी।
            </p>
          </div>
        )}

        {/* Announcements list */}
        {!isLoading && !isError && announcements && announcements.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((announcement, index) => (
              <article
                key={index}
                className="bg-champagne rounded-2xl p-6 border-l-4 border-orange shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-orange/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bell className="w-5 h-5 text-orange" />
                  </div>
                  <h3 className="font-bold text-near-black text-base font-serif leading-snug">
                    {announcement.title}
                  </h3>
                </div>
                <p className="text-near-black/70 text-sm leading-relaxed mb-4">
                  {announcement.body}
                </p>
                <div className="flex items-center gap-2 text-near-black/45 text-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  <time>{formatDate(announcement.date)}</time>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
