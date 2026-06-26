import React from 'react';
import { MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bw-black border-t border-bw-gray mt-12">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Black & White Stories.</h3>
            <p className="text-bw-light/50 font-light text-sm leading-relaxed">
              A premium photography studio in Hyderabad, specialising in weddings, portraits, and corporate events.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-bw-light/40 mb-4">Portfolio</h4>
            <ul className="space-y-2 text-bw-light/70 font-light text-sm">
              <li><a href="/galleries?cat=Weddings" className="hover:text-bw-white transition-colors">Weddings</a></li>
              <li><a href="/galleries?cat=Portraits" className="hover:text-bw-white transition-colors">Portraits</a></li>
              <li><a href="/galleries?cat=Corporate" className="hover:text-bw-white transition-colors">Corporate Events</a></li>
              <li><a href="/galleries" className="hover:text-bw-white transition-colors">All Work</a></li>
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-bw-light/40 mb-4">Book a Session</h4>
            <p className="text-bw-light/50 font-light text-sm mb-6">
              Ready to preserve your memories in monochrome? Reach out directly on WhatsApp.
            </p>
            <a
              href="https://wa.me/919999999999?text=Hi%20Black%20and%20White%20Stories,%20I%20am%20inquiring%20about%20your%20photography%20services."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-medium px-6 py-3 transition-colors"
            >
              <MessageCircle size={18} />
              Inquire via WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-bw-gray pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-bw-light/30 text-xs">
          <p>&copy; {new Date().getFullYear()} Black and White Stories. All rights reserved.</p>
          <p>Hyderabad, Telangana, India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
