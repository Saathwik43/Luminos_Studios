import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

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
    
    const text = `Hi Black and White Stories!%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Event:* ${eventType}%0A*Date:* ${eventDate}%0A*Message:* ${message}`;
    
    window.open(`https://wa.me/919999999999?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-butter-fade-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h1 className="text-5xl font-serif mb-6">Let's Connect</h1>
          <p className="text-bw-light/70 font-light text-lg mb-12">
            Every grand story begins with a simple conversation. Fill out the form, and we will continue this discussion on WhatsApp.
          </p>
          
          <div className="space-y-6 text-bw-light/80 font-light">
            <p><strong>Studio:</strong> Jubilee Hills, Hyderabad</p>
            <p><strong>Email:</strong> contact@bwstories.com</p>
            <p><strong>Phone:</strong> +91 99999 99999</p>
          </div>
        </div>

        <div className="bg-bw-dark p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2">Name</label>
              <input 
                type="text" 
                name="name" 
                className="w-full bg-transparent border-b border-bw-gray py-2 text-bw-white focus:outline-none focus:border-bw-white transition-colors" 
                required 
                onChange={handleChange} 
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2">Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                className="w-full bg-transparent border-b border-bw-gray py-2 text-bw-white focus:outline-none focus:border-bw-white transition-colors" 
                required 
                onChange={handleChange} 
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2">Event Type</label>
                <select 
                  name="eventType" 
                  className="w-full bg-transparent border-b border-bw-gray py-2 text-bw-white focus:outline-none focus:border-bw-white transition-colors appearance-none" 
                  onChange={handleChange}
                >
                  <option className="bg-bw-black text-white" value="Weddings">Weddings</option>
                  <option className="bg-bw-black text-white" value="Portraits">Portraits</option>
                  <option className="bg-bw-black text-white" value="Corporate">Corporate</option>
                  <option className="bg-bw-black text-white" value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2">Event Date</label>
                <input 
                  type="date" 
                  name="eventDate" 
                  className="w-full bg-transparent border-b border-bw-gray py-2 text-bw-white focus:outline-none focus:border-bw-white transition-colors" 
                  required 
                  onChange={handleChange} 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2">Message</label>
              <textarea 
                name="message" 
                className="w-full bg-transparent border-b border-bw-gray py-2 text-bw-white focus:outline-none focus:border-bw-white transition-colors resize-none" 
                rows="3" 
                required 
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="w-full btn-primary mt-8">
              <MessageCircle size={18} />
              Connect via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
