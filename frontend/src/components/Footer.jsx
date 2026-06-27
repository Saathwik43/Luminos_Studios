import React from 'react';
import { MessageCircle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0C] border-t border-white/[0.06] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4 text-white">
              Luminos<span className="italic font-light text-amber-400">Studio.</span>
            </h3>
            <p className="text-bw-light/50 font-light text-sm leading-relaxed max-w-sm">
              Luminos Studio is a premium creative agency in Hyderabad, crafting timeless visual legacies through weddings, portraiture, and high-impact corporate event photography.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-bw-light/40 font-semibold mb-4">Explore</h4>
            <ul className="space-y-2.5 text-bw-light/75 font-light text-sm">
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link to="/galleries" className="hover:text-amber-400 transition-colors">Portfolio Gallery</Link></li>
              <li><Link to="/services" className="hover:text-amber-400 transition-colors">Service Packages</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact Studio</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-bw-light/40 font-semibold mb-4">Luminos Studio</h4>
            <p className="text-bw-light/50 font-light text-sm mb-6 leading-relaxed">
              Jubilee Hills, Hyderabad, Telangana, India<br />
              Inquiries: <strong className="text-white font-normal">saathwikmailapalli@gmail.com</strong>
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 text-sm font-medium px-6 py-3 transition-colors rounded-sm"
            >
              Get In Touch
            </Link>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-bw-light/30 text-xs">
          <p>&copy; {new Date().getFullYear()} Luminos Studio. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={10} className="text-amber-500 fill-amber-500" /> for Luminos Studio
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
