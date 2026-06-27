import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { API_URL } from '../config';
import { Check, ShoppingBag, Loader2 } from 'lucide-react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const { cartItems, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_URL}/services`);
        const data = await res.json();
        setServices(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching services:', err);
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const categories = ['All', 'Weddings', 'Portraits', 'Corporate', 'Birthdays'];

  const filteredServices = activeCategory === 'All'
    ? services
    : services.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  const isInCart = (serviceId) => cartItems.some(item => item._id === serviceId);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 animate-butter-fade-up">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif mb-4 font-bold tracking-tight">Our Services</h1>
        <p className="text-bw-light/60 font-light text-base md:text-lg">
          Explore our tailored service packages. Custom pricing options and configurations can be discussed during checkout.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 border ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black border-transparent shadow-lg shadow-amber-500/10'
                : 'bg-bw-dark border-white/[0.08] text-bw-light/60 hover:text-white hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="animate-spin text-amber-500 mb-4" size={32} />
          <div className="text-bw-light/50 font-serif italic text-lg">Loading service catalog...</div>
        </div>
      ) : (
        <>
          {filteredServices.length === 0 ? (
            <div className="text-center py-20 border border-white/5 border-dashed rounded-md bg-bw-dark/30">
              <p className="text-bw-light/50 font-serif text-xl italic">No services matching this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {filteredServices.map(service => {
                const inCart = isInCart(service._id);
                return (
                  <div
                    key={service._id}
                    className="glassmorphism rounded-lg overflow-hidden flex flex-col justify-between p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 hover:shadow-amber-500/[0.02] border-t-2 hover:border-t-amber-500/50 border-t-transparent"
                  >
                    <div>
                      {/* Badge / Category */}
                      <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full mb-6 inline-block">
                        {service.category}
                      </span>
                      
                      <h3 className="text-2xl md:text-3xl font-serif mb-3 font-semibold text-white">
                        {service.name}
                      </h3>
                      
                      <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-3xl md:text-4xl font-sans font-bold text-white">
                          ₹{service.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-bw-light/40 text-sm">starting price</span>
                      </div>

                      <p className="text-bw-light/70 font-light text-sm md:text-base leading-relaxed mb-8 border-b border-white/[0.06] pb-6">
                        {service.description}
                      </p>

                      {/* Customization / Features List */}
                      {service.features && service.features.length > 0 && (
                        <div className="mb-8">
                          <h4 className="text-xs uppercase tracking-widest text-bw-light/40 font-semibold mb-4">
                            Deliverables & Scope
                          </h4>
                          <ul className="space-y-3">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-bw-light/80">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/15 flex items-center justify-center mt-0.5">
                                  <Check size={12} className="text-amber-400" />
                                </span>
                                <span className="font-light">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/[0.04]">
                      {inCart ? (
                        <button
                          onClick={() => removeFromCart(service._id)}
                          className="w-full py-3 border border-red-500/30 bg-red-500/5 hover:bg-red-500/10 text-red-400 font-medium tracking-wide transition-all duration-300 rounded-sm"
                        >
                          Remove from Cart
                        </button>
                      ) : (
                        <button
                          onClick={() => addToCart(service)}
                          className="w-full btn-primary"
                        >
                          <ShoppingBag size={16} />
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Services;
