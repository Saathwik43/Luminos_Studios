import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: 'Weddings',
    eventDate: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, eventType, eventDate, message } = formData;
    
    const text = `Hi Luminos Studio!%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Event:* ${eventType}%0A*Date:* ${eventDate}%0A*Message:* ${message}`;
    
    window.open(`https://wa.me/919999999999?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-butter-fade-up">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-2 block">Connect</span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6 font-bold tracking-tight">Let's Craft Something Beautiful</h1>
          <p className="text-bw-light/60 font-light text-base md:text-lg mb-12 leading-relaxed">
            Every memorable legacy begins with a simple conversation. Fill out the contact form, and we will connect instantly with you on WhatsApp.
          </p>
          
          <div className="space-y-8 text-sm text-bw-light/75">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <MapPin size={18} />
              </div>
              <p><strong>Studio:</strong> Jubilee Hills, Hyderabad, Telangana</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Mail size={18} />
              </div>
              <p><strong>Email:</strong> saathwikmailapalli@gmail.com</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Phone size={18} />
              </div>
              <p><strong>Phone:</strong> +91 99999 99999</p>
            </div>
          </div>
        </div>

        <div className="glassmorphism p-8 md:p-10 rounded-lg">
          <h3 className="font-serif text-2xl font-bold mb-6 text-white border-b border-white/[0.06] pb-4">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2 font-medium">Your Name</label>
              <input 
                type="text" 
                name="name" 
                className="w-full bg-bw-black/60 border border-white/[0.08] focus:border-amber-500/50 rounded-sm py-2.5 px-4 text-white text-sm focus:outline-none transition-colors" 
                required 
                onChange={handleChange} 
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2 font-medium">Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                className="w-full bg-bw-black/60 border border-white/[0.08] focus:border-amber-500/50 rounded-sm py-2.5 px-4 text-white text-sm focus:outline-none transition-colors" 
                required 
                onChange={handleChange} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2 font-medium">Event Type</label>
                <select 
                  name="eventType" 
                  className="w-full bg-bw-black/60 border border-white/[0.08] focus:border-amber-500/50 rounded-sm py-2.5 px-4 text-white text-sm focus:outline-none transition-colors appearance-none" 
                  onChange={handleChange}
                >
                  <option className="bg-[#0A0A0C]" value="Weddings">Weddings</option>
                  <option className="bg-[#0A0A0C]" value="Portraits">Portraits</option>
                  <option className="bg-[#0A0A0C]" value="Corporate">Corporate</option>
                  <option className="bg-[#0A0A0C]" value="Birthdays">Birthdays</option>
                  <option className="bg-[#0A0A0C]" value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2 font-medium">Expected Date</label>
                <input 
                  type="date" 
                  name="eventDate" 
                  className="w-full bg-bw-black/60 border border-white/[0.08] focus:border-amber-500/50 rounded-sm py-2.5 px-4 text-white text-sm focus:outline-none transition-colors" 
                  required 
                  onChange={handleChange} 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2 font-medium">Message Details</label>
              <textarea 
                name="message" 
                className="w-full bg-bw-black/60 border border-white/[0.08] focus:border-amber-500/50 rounded-sm py-2.5 px-4 text-white text-sm focus:outline-none transition-colors resize-none" 
                rows="4" 
                required 
                onChange={handleChange}
                placeholder="Give us event details, locations or specific style requests..."
              ></textarea>
            </div>

            <button type="submit" className="w-full btn-primary flex justify-center items-center gap-2 py-3.5">
              <MessageCircle size={18} />
              Open Chat in WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
