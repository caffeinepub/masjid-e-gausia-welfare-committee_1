import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';

const photos = [
  {
    src: '/assets/generated/jalsa-2026-1.dim_1200x800.jpg',
    alt: 'सालाना जलसा 2026 - वक्ता हिंदी स्लाइड के सामने प्रस्तुति दे रहे हैं',
    caption: 'वर्तमान समस्याओं पर चर्चा',
  },
  {
    src: '/assets/generated/jalsa-2026-2.dim_1200x800.jpg',
    alt: 'सालाना जलसा 2026 - वक्ता हरी स्लाइड के सामने प्रस्तुति दे रहे हैं',
    caption: 'मौजूदा मसाइल पर विचार-विमर्श',
  },
  {
    src: '/assets/generated/jalsa-2026-3.dim_1200x800.jpg',
    alt: 'सालाना जलसा 2026 - बड़ी सभा का दृश्य',
    caption: 'समाज के सदस्यों की उपस्थिति',
  },
  {
    src: '/assets/generated/jalsa-2026-4.dim_1200x800.jpg',
    alt: 'सालाना जलसा 2026 - वक्ता बड़ी सभा को संबोधित कर रहे हैं',
    caption: 'वार्षिक जलसे का मुख्य सत्र',
  },
];

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
  };

  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % photos.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  };

  return (
    <section id="gallery" className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
            <Images className="w-6 h-6 text-gold" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-forest font-serif mb-3">
            गैलरी
          </h2>
          <p className="text-near-black/55 text-sm tracking-widest uppercase">
            हमारे कार्यक्रमों की झलकियाँ
          </p>
        </div>

        {/* Album Card */}
        <div className="bg-champagne rounded-2xl border border-gold/25 shadow-md overflow-hidden">
          {/* Album Header */}
          <div className="px-6 py-5 border-b border-gold/20 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-orange flex items-center justify-center shadow-sm">
              <Images className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-forest font-bold text-lg font-serif">सालाना जलसा 2026</h3>
              <p className="text-near-black/50 text-xs mt-0.5">{photos.length} तस्वीरें • फरवरी 2026</p>
            </div>
          </div>

          {/* Photo Grid */}
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-gold/20 shadow-sm hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/50"
                  aria-label={`तस्वीर ${index + 1} देखें: ${photo.caption}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-near-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <p className="text-white text-xs font-medium leading-tight line-clamp-2">
                      {photo.caption}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-near-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-label="तस्वीर लाइटबॉक्स"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="बंद करें"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="पिछली तस्वीर"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].alt}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <p className="text-white/90 text-sm font-medium">
                {photos[lightboxIndex].caption}
              </p>
              <p className="text-white/45 text-xs mt-1">
                {lightboxIndex + 1} / {photos.length}
              </p>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="अगली तस्वीर"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>
      )}
    </section>
  );
}
