import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, ChevronLeft, ChevronRight, X } from 'lucide-react';
import LazyImage from '../components/LazyImage';

const Galleries = () => {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation();

  useEffect(() => {
    // Check URL params for category filter
    const queryParams = new URLSearchParams(location.search);
    const catQuery = queryParams.get('cat');

    const fetchData = async () => {
      try {
        const catRes = await fetch('https://bw-backend-t2ky.onrender.com/api/categories');
        const catData = await catRes.json();
        setCategories(catData);
        
        if (catQuery) {
          const found = catData.find(c => 
            c.name.toLowerCase() === catQuery.toLowerCase() ||
            c.name.toLowerCase().includes(catQuery.toLowerCase()) ||
            catQuery.toLowerCase().includes(c.name.toLowerCase())
          );
          if (found) setActiveCategory(found._id);
        }

        const imgRes = await fetch('https://bw-backend-t2ky.onrender.com/api/images');
        const imgData = await imgRes.json();
        setImages(imgData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching gallery data', err);
        setLoading(false);
      }
    };
    fetchData();
  }, [location.pathname, location.search]);

  const filteredImages = activeCategory 
    ? images.filter(img => img.category && img.category._id === activeCategory)
    : images;

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const showPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => (prev > 0 ? prev - 1 : filteredImages.length - 1));
  };
  
  const showNext = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => (prev < filteredImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12 border-b border-bw-gray pb-8">
        <h1 className="text-4xl md:text-5xl font-serif mb-8">Portfolio</h1>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <button 
            className={`px-6 py-2 rounded-full text-sm tracking-wide uppercase transition-colors duration-300 ${!activeCategory ? 'bg-bw-white text-bw-black font-medium' : 'bg-bw-dark text-bw-light/60 hover:text-bw-white border border-bw-gray'}`}
            onClick={() => setActiveCategory('')}
          >
            All Works
          </button>
          {categories.map(cat => (
            <button 
              key={cat._id}
              className={`px-6 py-2 rounded-full text-sm tracking-wide uppercase transition-colors duration-300 ${activeCategory === cat._id ? 'bg-bw-white text-bw-black font-medium' : 'bg-bw-dark text-bw-light/60 hover:text-bw-white border border-bw-gray'}`}
              onClick={() => setActiveCategory(cat._id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="animate-pulse text-bw-light/50 font-serif italic text-xl">Loading aesthetics...</div>
        </div>
      ) : (
        <>
          {activeCategory ? (
             <section className="mb-16">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-serif">{categories.find(c => c._id === activeCategory)?.name || 'Gallery'}</h2>
                  <a 
                    href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi Black and White Stories, I am inquiring about your photography services for a ${categories.find(c => c._id === activeCategory)?.name} event.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline inline-flex text-sm py-2"
                  >
                    <MessageCircle size={16} /> Inquire via WhatsApp
                  </a>
                </div>
                
                {filteredImages.length === 0 ? (
                  <p className="text-bw-light/50 font-light italic">No imagery available yet.</p>
                ) : (
                  <div key={activeCategory} className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 animate-butter-fade-up">
                    {filteredImages.map((img, index) => (
                      <div key={img._id} className="break-inside-avoid relative group cursor-pointer overflow-hidden bg-bw-dark" onClick={() => openLightbox(index)}>
                        <LazyImage src={img.url} alt={img.caption || 'Gallery Image'} className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-butter-slow" />
                        {img.caption && (
                          <div className="absolute inset-0 bg-gradient-to-t from-bw-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <p className="text-bw-white font-serif">{img.caption}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
             </section>
          ) : (
             categories.map((cat, catIdx) => {
              const catImages = images.filter(img => img.category && img.category._id === cat._id);
              if (catImages.length === 0) return null;
              
              return (
                <section key={cat._id} className="mb-24 animate-butter-fade-up" style={{ animationDelay: `${catIdx * 100}ms`, animationFillMode: 'both' }}>
                  <div className="flex justify-between items-center mb-8 pb-4 border-b border-bw-gray/50">
                    <h2 className="text-3xl font-serif">{cat.name}</h2>
                    <a 
                      href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi Black and White Stories, I am inquiring about your photography services for a ${cat.name} event.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline inline-flex text-sm py-2"
                    >
                      <MessageCircle size={16} /> Inquire
                    </a>
                  </div>
                  
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {catImages.map((img) => {
                      const absoluteIndex = filteredImages.findIndex(fi => fi._id === img._id);
                      return (
                        <div key={img._id} className="break-inside-avoid relative group cursor-pointer overflow-hidden bg-bw-dark" onClick={() => openLightbox(absoluteIndex)}>
                          <LazyImage src={img.url} alt={img.caption || 'Gallery Image'} className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-butter-slow" />
                          {img.caption && (
                            <div className="absolute inset-0 bg-gradient-to-t from-bw-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                              <p className="text-bw-white font-serif">{img.caption}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })
          )}
          
          {images.length === 0 && (
             <div className="text-center py-24 border border-bw-gray border-dashed">
               <p className="text-bw-light/50 font-serif text-xl italic">The archive is currently empty.</p>
             </div>
          )}
        </>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-bw-black/95 backdrop-blur-sm flex items-center justify-center animate-butter-fade-in" onClick={closeLightbox}>
          {/* Close button — large tap target */}
          <button
            className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center text-bw-white/70 hover:text-bw-white bg-bw-black/40 rounded-full transition-colors"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
          
          {/* Prev button — large mobile-friendly tap zone */}
          <button
            className="absolute left-0 top-0 h-full w-16 md:w-24 flex items-center justify-center text-bw-white/40 hover:text-bw-white transition-colors z-10"
            onClick={showPrev}
            aria-label="Previous image"
          >
            <span className="bg-bw-black/30 rounded-full p-2 flex items-center justify-center">
              <ChevronLeft size={36} strokeWidth={1.5} />
            </span>
          </button>
          
          <div className="relative flex flex-col items-center px-16 md:px-24 max-h-screen w-full" onClick={(e) => e.stopPropagation()}>
            <img 
              key={lightboxIndex}
              src={filteredImages[lightboxIndex].url} 
              alt={filteredImages[lightboxIndex].caption || 'Lightbox Image'} 
              className="max-w-full max-h-[80vh] object-contain shadow-2xl animate-butter-scale-in" 
            />
            {filteredImages[lightboxIndex].caption && (
               <div className="mt-4 text-bw-white/80 font-serif text-base md:text-lg italic text-center px-4">
                 {filteredImages[lightboxIndex].caption}
               </div>
            )}
            {/* Counter */}
            <div className="mt-3 text-bw-white/40 text-xs tracking-widest">
              {lightboxIndex + 1} / {filteredImages.length}
            </div>
          </div>
          
          {/* Next button — large mobile-friendly tap zone */}
          <button
            className="absolute right-0 top-0 h-full w-16 md:w-24 flex items-center justify-center text-bw-white/40 hover:text-bw-white transition-colors z-10"
            onClick={showNext}
            aria-label="Next image"
          >
            <span className="bg-bw-black/30 rounded-full p-2 flex items-center justify-center">
              <ChevronRight size={36} strokeWidth={1.5} />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Galleries;
