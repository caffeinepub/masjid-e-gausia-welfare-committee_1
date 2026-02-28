import React from 'react';
import { IndianRupee, Calendar, Loader2, AlertCircle, Wallet } from 'lucide-react';
import { useGetJumaCollections } from '../hooks/useQueries';

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp) * 1000;
  return new Date(ms).toLocaleDateString('hi-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatAmount(amount: bigint): string {
  return new Intl.NumberFormat('hi-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

export default function JamaCollectionSection() {
  const { data: collections, isLoading, isError } = useGetJumaCollections();

  const totalAmount = collections
    ? collections.reduce((sum, c) => sum + Number(c.amount), 0)
    : 0;

  return (
    <section id="juma-collection" className="py-20 bg-champagne relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img
          src="/assets/generated/geometric-pattern.dim_800x800.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-orange font-semibold text-sm uppercase tracking-widest mb-2">
            वित्तीय रिकॉर्ड
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-near-black font-serif mb-4">
            जुमा कलेक्शन
          </h2>
          <div className="gold-divider" />
          <p className="text-near-black/65 max-w-xl mx-auto text-base mt-6 leading-relaxed">
            कमेटी द्वारा एकत्रित धनराशि का पारदर्शी विवरण यहां देखें।
          </p>
        </div>

        {/* Total amount banner */}
        {!isLoading && !isError && collections && collections.length > 0 && (
          <div className="mb-10 flex justify-center">
            <div className="bg-gradient-to-r from-orange/90 to-gold/90 text-white rounded-2xl px-8 py-5 shadow-lg flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">कुल जुमा राशि</p>
                <p className="text-2xl font-bold font-serif">
                  {new Intl.NumberFormat('hi-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0,
                  }).format(totalAmount)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Loader2 className="w-10 h-10 text-orange animate-spin" />
            <p className="text-near-black/60 text-sm">जुमा कलेक्शन लोड हो रहा है...</p>
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <AlertCircle className="w-10 h-10 text-red-500" />
            <p className="text-near-black/70 text-sm">
              डेटा लोड करने में त्रुटि हुई। कृपया पुनः प्रयास करें।
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && (!collections || collections.length === 0) && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-16 h-16 rounded-full bg-orange/10 flex items-center justify-center">
              <Wallet className="w-8 h-8 text-orange" />
            </div>
            <p className="text-near-black/60 text-base font-medium">
              अभी कोई जुमा रिकॉर्ड नहीं है।
            </p>
            <p className="text-near-black/45 text-sm">
              नए जुमा रिकॉर्ड यहां दिखाई देंगे।
            </p>
          </div>
        )}

        {/* Collections grid */}
        {!isLoading && !isError && collections && collections.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <article
                key={String(collection.id)}
                className="bg-ivory rounded-2xl p-6 border-l-4 border-gold shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                    <IndianRupee className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-xl font-bold text-orange font-serif">
                    {formatAmount(collection.amount)}
                  </span>
                </div>
                <p className="text-near-black/75 text-sm leading-relaxed mb-4 font-medium">
                  {collection.description}
                </p>
                <div className="flex items-center gap-2 text-near-black/45 text-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  <time>{formatDate(collection.date)}</time>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
