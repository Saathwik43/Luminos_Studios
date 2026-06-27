import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { API_URL } from '../config';
import { Trash2, Calendar, Mail, User, FileText, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventDate: '',
    notes: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setLoading(true);
    setError('');

    try {
      const payload = {
        customerName: formData.name,
        customerEmail: formData.email,
        eventDate: formData.eventDate,
        notes: formData.notes,
        serviceIds: cartItems.map(item => item._id),
        totalAmount: getCartTotal()
      };

      const res = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        setBookingDetails(data);
        setSuccess(true);
        clearCart();
      } else {
        setError(data.message || 'Something went wrong during checkout. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection to backend server failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success && bookingDetails) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center animate-butter-scale-in">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20 gold-glow">
            <CheckCircle2 size={40} className="text-amber-400" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-serif mb-4 font-bold">Booking Submitted!</h1>
        <p className="text-lg text-bw-light/70 font-light max-w-lg mx-auto mb-8">
          Your booking inquiry has been recorded successfully. A confirmation email has been sent to <strong className="text-white">{formData.email}</strong>.
        </p>

        <div className="glassmorphism p-8 rounded-lg text-left max-w-md mx-auto mb-12">
          <h3 className="font-serif text-xl mb-4 text-white border-b border-white/[0.06] pb-3">Booking Summary</h3>
          <div className="space-y-3 text-sm text-bw-light/80">
            <p><strong>Inquiry ID:</strong> <span className="text-white font-mono">{bookingDetails._id}</span></p>
            <p><strong>Date Reserved:</strong> <span className="text-white">{new Date(bookingDetails.eventDate).toLocaleDateString()}</span></p>
            <p><strong>Total Estimate:</strong> <span className="text-amber-400 font-semibold text-base">₹{bookingDetails.totalAmount.toLocaleString('en-IN')}</span></p>
            <p className="text-xs text-bw-light/50 border-t border-white/[0.04] pt-3">
              Luminos Studio admin team will contact you shortly from <strong className="text-white font-normal">saathwikmailapalli@gmail.com</strong> to discuss details.
            </p>
          </div>
        </div>

        <Link to="/" className="btn-primary">
          Return to Home
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 animate-butter-fade-up">
      <h1 className="text-4xl md:text-5xl font-serif mb-12 font-bold tracking-tight">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-24 border border-white/5 border-dashed rounded-md bg-bw-dark/30 max-w-2xl mx-auto">
          <p className="text-bw-light/50 font-serif text-xl italic mb-8">Your cart is currently empty.</p>
          <Link to="/services" className="btn-primary">
            Explore Service Packages
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-serif mb-4 font-semibold text-white">Selected Packages</h2>
            {cartItems.map(item => (
              <div 
                key={item._id} 
                className="glassmorphism p-6 rounded-lg flex items-center justify-between gap-4 transition-all duration-300 hover:border-white/[0.12]"
              >
                <div className="min-w-0">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full mb-2 inline-block">
                    {item.category}
                  </span>
                  <h3 className="text-lg md:text-xl font-serif font-semibold text-white truncate">{item.name}</h3>
                  <p className="text-bw-light/50 font-light text-xs mt-1 line-clamp-1">{item.description}</p>
                </div>
                
                <div className="flex items-center gap-6 flex-shrink-0">
                  <span className="text-lg font-semibold text-white font-sans">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="p-2.5 text-bw-light/40 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                    title="Remove package"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            <div className="border-t border-white/[0.08] pt-6 flex justify-between items-center px-4">
              <span className="text-bw-light/60 font-light text-base">Running Total</span>
              <span className="text-2xl md:text-3xl font-sans font-bold text-amber-400">
                ₹{getCartTotal().toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-5 glassmorphism p-8 rounded-lg">
            <h2 className="text-xl font-serif mb-6 font-semibold text-white">Checkout Details</h2>
            
            {error && (
              <div className="bg-red-900/15 border border-red-500/30 text-red-400 p-4 mb-6 text-sm rounded-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleCheckout} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2 font-medium flex items-center gap-1.5">
                  <User size={13} className="text-amber-500" /> Full Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-bw-black/60 border border-white/[0.08] focus:border-amber-500/50 rounded-sm py-2.5 px-4 text-white text-sm focus:outline-none transition-colors" 
                  placeholder="John Doe"
                  required 
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2 font-medium flex items-center gap-1.5">
                  <Mail size={13} className="text-amber-500" /> Email Address
                </label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-bw-black/60 border border-white/[0.08] focus:border-amber-500/50 rounded-sm py-2.5 px-4 text-white text-sm focus:outline-none transition-colors" 
                  placeholder="john.doe@example.com"
                  required 
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2 font-medium flex items-center gap-1.5">
                  <Calendar size={13} className="text-amber-500" /> Event Date
                </label>
                <input 
                  type="date" 
                  name="eventDate" 
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full bg-bw-black/60 border border-white/[0.08] focus:border-amber-500/50 rounded-sm py-2.5 px-4 text-white text-sm focus:outline-none transition-colors" 
                  required 
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2 font-medium flex items-center gap-1.5">
                  <FileText size={13} className="text-amber-500" /> Custom Event Notes
                </label>
                <textarea 
                  name="notes" 
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full bg-bw-black/60 border border-white/[0.08] focus:border-amber-500/50 rounded-sm py-2.5 px-4 text-white text-sm focus:outline-none transition-colors resize-none" 
                  placeholder="Tell us details about the theme, location, or special customization requests..."
                  rows="4" 
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-primary mt-4 py-3.5 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Processing Booking...
                  </>
                ) : (
                  <>
                    Submit Booking Inquiry (₹{getCartTotal().toLocaleString('en-IN')})
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
