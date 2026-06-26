import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isExactActive = (pathname) => location.pathname === pathname;
  const isQueryActive = (keyword) => location.search.includes(keyword);

  const navLinks = [
    { to: '/', label: 'Home', active: isExactActive('/') },
    { to: '/galleries?cat=Weddings', label: 'Weddings', active: isQueryActive('Weddings') },
    { to: '/galleries?cat=Portraits', label: 'Portrait', active: isQueryActive('Portraits') },
    { to: '/galleries?cat=Corporate', label: 'Corporate', active: isQueryActive('Corporate') },
    { to: '/contact', label: 'Contact', active: isExactActive('/contact') },
  ];

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-bw-black/90 backdrop-blur-md border-b border-bw-gray">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-bw-white">
          Black &amp; White Stories.
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`text-sm tracking-wide uppercase transition-colors ${link.active ? 'text-bw-white' : 'text-bw-light/60 hover:text-bw-white'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-bw-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-bw-black/95 backdrop-blur-md border-t border-bw-gray animate-butter-slide-down">
          <div className="flex flex-col px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={closeMobile}
                className={`text-base tracking-wide uppercase py-2 border-b border-bw-gray/30 transition-colors ${link.active ? 'text-bw-white' : 'text-bw-light/60'}`}
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
