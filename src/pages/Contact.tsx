import React, { useState } from 'react';
import { MapPin, Phone, Mail, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { FadeInWhenVisible } from '../components/Shared';

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Contact() {
  const [contactLoading, setContactLoading] = useState(false);

  const handleGenericSubmit = (e: React.FormEvent, setLoading: (loading: boolean) => void, successMsg: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
    if (emailInput && !isValidEmail(emailInput.value)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(successMsg);
      form.reset();
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-bg-dark/50 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,51,51,0.05)_0%,transparent_70%)] rounded-full blur-3xl"></div>
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <FadeInWhenVisible>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">We're here to answer your questions and guide you</p>
        </FadeInWhenVisible>
        <div className="flex flex-col lg:flex-row gap-12">
          <FadeInWhenVisible direction="right" className="flex-1 space-y-8">
            <div className="bg-bg-card/80 backdrop-blur-md p-8 rounded-2xl border border-primary/20 shadow-[0_10px_30px_rgba(255,51,51,0.1)] hover:border-primary transition-colors">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/30 shadow-[0_0_10px_rgba(255,51,51,0.1)]">
                    <MapPin className="text-primary drop-shadow-[0_0_5px_#ff3333]" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Our Office</h4>
                    <p className="text-gray-400">123 Visa Street, Global City, GC 12345</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/30 shadow-[0_0_10px_rgba(255,51,51,0.1)]">
                    <Phone className="text-primary drop-shadow-[0_0_5px_#ff3333]" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Phone</h4>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                    <p className="text-gray-400">+1 (555) 987-6543</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/30 shadow-[0_0_10px_rgba(255,51,51,0.1)]">
                    <Mail className="text-primary drop-shadow-[0_0_5px_#ff3333]" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Email</h4>
                    <p className="text-gray-400">info@visamotion.com</p>
                    <p className="text-gray-400">support@visamotion.com</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Business Hours */}
            <div className="bg-bg-card/80 backdrop-blur-md p-8 rounded-2xl border border-primary/20 shadow-[0_10px_30px_rgba(255,51,51,0.1)] hover:border-primary transition-colors">
              <h3 className="text-2xl font-bold text-white mb-6">Business Hours</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex justify-between border-b border-gray-800 pb-2"><span>Monday - Friday:</span> <span className="text-white">9:00 AM - 6:00 PM</span></li>
                <li className="flex justify-between border-b border-gray-800 pb-2"><span>Saturday:</span> <span className="text-white">10:00 AM - 2:00 PM</span></li>
                <li className="flex justify-between text-primary font-semibold"><span>Sunday:</span> <span>Closed</span></li>
              </ul>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="left" className="flex-1">
            <div className="bg-bg-card/80 backdrop-blur-md p-8 lg:p-10 rounded-2xl border border-primary/30 shadow-[0_20px_40px_rgba(255,51,51,0.2)]">
              <h3 className="text-3xl font-bold text-white mb-8 font-heading">Send us a Message</h3>
              <form onSubmit={(e) => handleGenericSubmit(e, setContactLoading, 'Thank you for your message! We will get back to you shortly.')} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                    <input type="text" id="name" required className="w-full p-4 bg-bg-dark border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,51,51,0.3)] transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Your Email</label>
                    <input type="email" id="email" required className="w-full p-4 bg-bg-dark border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,51,51,0.3)] transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                  <input type="text" id="subject" required className="w-full p-4 bg-bg-dark border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,51,51,0.3)] transition-all" placeholder="How can we help?" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                  <textarea id="message" rows={5} required className="w-full p-4 bg-bg-dark border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,51,51,0.3)] transition-all resize-none" placeholder="Write your message here..."></textarea>
                </div>
                <button type="submit" disabled={contactLoading} className="btn w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                  {contactLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : 'Send Message'}
                </button>
              </form>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}
