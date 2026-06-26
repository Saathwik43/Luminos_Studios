import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image (Placeholder from Unsplash for Monochrome Wedding/Event) */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop")' }}
        >
          <div className="absolute inset-0 bg-bw-black/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 text-bw-white leading-tight animate-butter-fade-up">
            Timeless Moments <br className="hidden md:block" />
            <span className="italic text-bw-light/80">in Monochrome</span>
          </h1>
          <p 
            className="text-lg md:text-xl text-bw-light/70 mb-10 max-w-2xl font-light animate-butter-fade-up"
            style={{ animationDelay: '150ms', animationFillMode: 'both' }}
          >
            An elegant, sophisticated approach to capturing the raw emotion and timeless beauty of your most important events.
          </p>
          <a 
            href="https://wa.me/919999999999?text=Hi%20Black%20and%20White%20Stories,%20I%20am%20inquiring%20about%20your%20photography%20services."
            target="_blank"
            rel="noreferrer"
            className="btn-primary animate-butter-fade-up hover:scale-102 hover:shadow-lg transition-all duration-300"
            style={{ animationDelay: '300ms', animationFillMode: 'both' }}
          >
            <MessageCircle size={20} />
            Inquire via WhatsApp
          </a>
        </div>
      </section>

      {/* Featured Categories Teaser */}
      <section className="py-24 bg-bw-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16 border-b border-bw-gray pb-6">
            <h2 className="text-4xl">Our Expertise</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/galleries?cat=Weddings" className="group cursor-pointer">
              <div className="aspect-[3/4] bg-bw-dark overflow-hidden mb-4 relative">
                 <img src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2070&auto=format&fit=crop" alt="Weddings" className="w-full h-full object-cover group-hover:scale-105 transition-butter-slow opacity-80" />
                 <div className="absolute inset-0 bg-gradient-to-t from-bw-black/80 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <span className="flex items-center gap-2 text-sm text-bw-white">View Gallery <ArrowRight size={14} /></span>
                 </div>
              </div>
              <h3 className="text-2xl mb-2">Weddings</h3>
              <p className="text-bw-light/60 font-light text-sm">The pure emotion of your special day, preserved forever.</p>
            </Link>
            
            <Link to="/galleries?cat=Portraits" className="group cursor-pointer">
              <div className="aspect-[3/4] bg-bw-dark overflow-hidden mb-4 relative">
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop" alt="Portraits" className="w-full h-full object-cover group-hover:scale-105 transition-butter-slow opacity-80" />
                 <div className="absolute inset-0 bg-gradient-to-t from-bw-black/80 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <span className="flex items-center gap-2 text-sm text-bw-white">View Gallery <ArrowRight size={14} /></span>
                 </div>
              </div>
              <h3 className="text-2xl mb-2">Portraits</h3>
              <p className="text-bw-light/60 font-light text-sm">Striking, dramatic, and authentic character studies.</p>
            </Link>
            
            <Link to="/galleries?cat=Corporate" className="group cursor-pointer">
              <div className="aspect-[3/4] bg-bw-dark overflow-hidden mb-4 relative">
                 <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" alt="Corporate" className="w-full h-full object-cover group-hover:scale-105 transition-butter-slow opacity-80" />
                 <div className="absolute inset-0 bg-gradient-to-t from-bw-black/80 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <span className="flex items-center gap-2 text-sm text-bw-white">View Gallery <ArrowRight size={14} /></span>
                 </div>
              </div>
              <h3 className="text-2xl mb-2">Corporate Events</h3>
              <p className="text-bw-light/60 font-light text-sm">Professionalism and dynamic action in monochrome.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
