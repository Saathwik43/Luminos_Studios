import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, Camera, Award, Sparkles, Clock, Calendar } from 'lucide-react';
import { API_URL } from '../config';

const Home = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Curated fallback slider images if MongoDB has no uploaded images
  const fallbackSlides = [
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
      title: "Luxe Wedding Stories",
      subtitle: "Crafting timeless visual legacies for your most sacred moments."
    },
    {
      url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
      title: "Editorial Portraiture",
      subtitle: "Unveiling character and authentic emotion through the lens."
    },
    {
      url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
      title: "High-Impact Brand Visuals",
      subtitle: "Elevating corporate narratives with executive brilliance."
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch images for slider
        const imgRes = await fetch(`${API_URL}/images`);
        const imgData = await imgRes.json();
        
        if (imgData && imgData.length > 0) {
          // Take top 4 images
          setSliderImages(imgData.slice(0, 4).map((img, idx) => ({
            url: img.url,
            title: img.caption || "Exquisite Imagery",
            subtitle: img.category?.name || "Luminos Studio Portfolio"
          })));
        } else {
          setSliderImages(fallbackSlides);
        }

        // Fetch services for highlights
        const serviceRes = await fetch(`${API_URL}/services`);
        const serviceData = await serviceRes.json();
        setServices(serviceData.slice(0, 3)); // show top 3 services
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Home page data:', err);
        setSliderImages(fallbackSlides);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Autoplay Slider effect
  useEffect(() => {
    if (sliderImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [sliderImages]);

  return (
    <div className="w-full">
      {/* Featured Work Slider Hero Section */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        {sliderImages.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{ backgroundImage: `url("${slide.url}")` }}
          >
            {/* Ambient Dark Overlay with Amber Tint */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/50 via-[#0A0A0C]/85 to-[#0A0A0C]"></div>
          </div>
        ))}
        
        {/* Hero Copy (Dynamic based on slide or static premium text) */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-amber-400 font-semibold tracking-widest text-xs uppercase mb-4 animate-butter-fade-up bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
            Luminos Studio Hyderabad
          </span>
          <h1 className="text-4xl md:text-7xl font-serif mb-6 text-white leading-tight font-bold tracking-tight animate-butter-fade-up">
            Timeless Legacies <br />
            <span className="gold-gradient-text font-serif">Painted in Light</span>
          </h1>
          <p 
            className="text-base md:text-xl text-bw-light/70 mb-10 max-w-2xl font-light leading-relaxed animate-butter-fade-up"
            style={{ animationDelay: '150ms', animationFillMode: 'both' }}
          >
            A premium creative agency capturing authentic emotions, editorial portraiture, and grand celebrations with visual excellence.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 animate-butter-fade-up"
            style={{ animationDelay: '300ms', animationFillMode: 'both' }}
          >
            <Link to="/services" className="btn-primary">
              <Calendar size={18} />
              Book Services
            </Link>
            <Link to="/galleries" className="btn-outline">
              Explore Portfolio
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Slide Indicator Dots */}
        {sliderImages.length > 1 && (
          <div className="absolute bottom-10 left-0 right-0 z-15 flex justify-center gap-2.5">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-white/20'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Brand Attributes / Achievements */}
      <section className="py-16 bg-[#0E0E12] border-y border-white/[0.04] relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4 p-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Camera size={22} />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-white">Elite Gear</h4>
              <p className="text-xs text-bw-light/40 mt-0.5">Medium format & 4K cinematic production</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Award size={22} />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-white">Award Winning</h4>
              <p className="text-xs text-bw-light/40 mt-0.5">Top 5 creative studio in Telangana</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Sparkles size={22} />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-white">Retouched Archives</h4>
              <p className="text-xs text-bw-light/40 mt-0.5">Full signature editing & styling</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock size={22} />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-white">Rapid Delivery</h4>
              <p className="text-xs text-bw-light/40 mt-0.5">Signature sneak peek within 48 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Teaser */}
      <section className="py-24 bg-[#0A0A0C]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16 border-b border-white/[0.06] pb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-2 block">Our Expertise</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Creative Portfolio Galleries</h2>
            </div>
            <Link to="/galleries" className="text-amber-400 hover:text-amber-300 font-semibold tracking-wider text-xs uppercase flex items-center gap-2 group transition-all duration-300 pb-1">
              View All Galleries <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/galleries?cat=Weddings" className="group cursor-pointer glassmorphism rounded-lg overflow-hidden border border-white/[0.04]">
              <div className="aspect-[3/4] bg-[#131316] overflow-hidden relative">
                 <img src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2070&auto=format&fit=crop" alt="Weddings" className="w-full h-full object-cover group-hover:scale-105 transition-butter-slow opacity-75" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-6">
                   <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">Weddings</span>
                   <h3 className="text-xl font-serif text-white font-bold mb-1">Cinematic Wedding Love</h3>
                   <p className="text-bw-light/45 font-light text-xs line-clamp-2">Authentic, emotional coverage of your special day, preserved forever.</p>
                 </div>
              </div>
            </Link>
            
            <Link to="/galleries?cat=Portraits" className="group cursor-pointer glassmorphism rounded-lg overflow-hidden border border-white/[0.04]">
              <div className="aspect-[3/4] bg-[#131316] overflow-hidden relative">
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop" alt="Portraits" className="w-full h-full object-cover group-hover:scale-105 transition-butter-slow opacity-75" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-6">
                   <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">Portraits</span>
                   <h3 className="text-xl font-serif text-white font-bold mb-1">Editorial Portraiture</h3>
                   <p className="text-bw-light/45 font-light text-xs line-clamp-2">Striking, dramatic character studies and high-end model portfolios.</p>
                 </div>
              </div>
            </Link>
            
            <Link to="/galleries?cat=Corporate" className="group cursor-pointer glassmorphism rounded-lg overflow-hidden border border-white/[0.04]">
              <div className="aspect-[3/4] bg-[#131316] overflow-hidden relative">
                 <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" alt="Corporate" className="w-full h-full object-cover group-hover:scale-105 transition-butter-slow opacity-75" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-6">
                   <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">Corporate</span>
                   <h3 className="text-xl font-serif text-white font-bold mb-1">Corporate Branding</h3>
                   <p className="text-bw-light/45 font-light text-xs line-clamp-2">Premium headshots, event documentaries, and branding assets.</p>
                 </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Highlights Section */}
      {services.length > 0 && (
        <section className="py-24 bg-[#0E0E12] border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center mb-16 text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-2 block">Packages</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Service Highlights</h2>
              <p className="text-sm text-bw-light/60 font-light max-w-lg">
                Explore our signature service offerings. Add them to your booking cart to construct your personalized photography timeline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map(service => (
                <div key={service._id} className="glassmorphism p-8 rounded-lg flex flex-col justify-between hover:border-amber-500/20 transition-all duration-300">
                  <div>
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full mb-4 inline-block">
                      {service.category}
                    </span>
                    <h3 className="text-xl font-serif font-bold mb-3 text-white">{service.name}</h3>
                    <p className="text-xs text-bw-light/50 font-light mb-6 line-clamp-3">{service.description}</p>
                    <span className="text-2xl font-bold font-sans text-white">₹{service.price.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <Link to="/services" className="mt-8 text-xs font-bold uppercase text-amber-400 tracking-wider flex items-center gap-1.5 hover:text-amber-300 transition-colors group">
                    Learn & Book <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-12">
              <Link to="/services" className="btn-outline text-sm">
                View All Packages
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
