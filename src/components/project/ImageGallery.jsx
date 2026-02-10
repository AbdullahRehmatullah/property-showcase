import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';

export default function ImageGallery({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const placeholderImages = [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  ];

  const displayImages = images.length > 0 ? images : placeholderImages;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 h-[500px]">
        {/* Main Image */}
        <div className="lg:col-span-2 relative group rounded-2xl overflow-hidden bg-gray-100">
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={displayImages[currentIndex]}
            alt="Project"
            className="w-full h-full object-cover"
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>

          {/* Expand Button */}
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg"
          >
            <Expand className="w-4 h-4" />
            <span className="text-sm font-medium">View All</span>
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full">
            <span className="text-white text-sm font-medium">
              {currentIndex + 1} / {displayImages.length}
            </span>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="hidden lg:grid grid-cols-2 gap-3">
          {displayImages.slice(1, 5).map((img, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02 }}
              onClick={() => setCurrentIndex(idx + 1)}
              className={`relative rounded-xl overflow-hidden ${
                currentIndex === idx + 1 ? 'ring-2 ring-teal-600' : ''
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              {idx === 3 && displayImages.length > 5 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    +{displayImages.length - 5}
                  </span>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={displayImages[currentIndex]}
              alt="Project"
              className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Thumbnails */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {displayImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                  className={`w-16 h-12 rounded-lg overflow-hidden transition-all ${
                    currentIndex === idx ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}