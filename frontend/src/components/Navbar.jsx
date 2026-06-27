import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();

  const isExactActive = (pathname) => location.pathname === pathname;

  const navLinks = [
    { to: '/', label: 'Home', active: isExactActive('/') },
    { to: '/galleries', label: 'Portfolio', active: isExactActive('/galleries') },
    { to: '/services', label: 'Services', active: isExactActive('/services') },
    { to: '/contact', label: 'Contact', active: isExactActive('/contact') },
  ];

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0A0A0C]/90 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-white flex items-center gap-1">
          Luminos<span className="italic font-light text-amber-400">Studio.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`text-xs font-semibold tracking-widest uppercase transition-colors ${
                link.active ? 'text-amber-400' : 'text-bw-light/60 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Cart Icon in Navbar */}
          <Link 
            to="/cart" 
            className={`relative p-2.5 rounded-full border transition-all duration-300 ${
              isExactActive('/cart') 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                : 'border-white/[0.08] text-bw-light/75 hover:text-white hover:border-white/20'
            }`}
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={16} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[10px] font-bold rounded-full flex items-center justify-center border border-[#0A0A0C]">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Buttons */}
        <div className="flex md:hidden items-center gap-4">
          <Link 
            to="/cart" 
            className="relative p-2.5 rounded-full border border-white/[0.08] text-bw-light/75"
            onClick={closeMobile}
          >
            <ShoppingCart size={16} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          <button
            className="flex items-center justify-center w-10 h-10 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0C]/95 backdrop-blur-md border-t border-white/[0.06] animate-butter-slide-down">
          <div className="flex flex-col px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={closeMobile}
                className={`text-sm tracking-widest font-semibold uppercase py-2.5 border-b border-white/[0.04] transition-colors ${
                  link.active ? 'text-amber-400' : 'text-bw-light/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
