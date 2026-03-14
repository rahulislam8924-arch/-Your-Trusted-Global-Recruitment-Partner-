import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane, MapPin, Phone, Mail, ArrowUp, MessageCircle, Loader2, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import Background3D from './Background3D';

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);
  const [footerNewsletterLoading, setFooterNewsletterLoading] = useState(false);
  const [popupNewsletterLoading, setPopupNewsletterLoading] = useState(false);
  const [footerEmail, setFooterEmail] = useState('');
  const [popupEmail, setPopupEmail] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    
    const timer = setTimeout(() => {
      setShowNewsletterPopup(true);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = 'smooth';
    setIsMenuOpen(false);
  }, [location.pathname]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleFooterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(footerEmail)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setFooterNewsletterLoading(true);
    setTimeout(() => {
      setFooterNewsletterLoading(false);
      toast.success('Thank you for subscribing!');
      setFooterEmail('');
    }, 1500);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Countries', path: '/countries' },
    { name: 'News', path: '/news' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className="min-h-screen text-gray-300 font-sans relative">
      <Background3D />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-bg-dark/80 backdrop-blur-md border-b border-primary/30 shadow-[0_0_20px_rgba(255,51,51,0.2)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <nav className="flex justify-between items-center py-4 flex-wrap">
            <Link to="/" className="text-2xl font-bold text-white tracking-wide font-heading drop-shadow-[0_0_10px_#ff3333]">
              ViSa <span className="text-primary drop-shadow-[0_0_15px_#ff3333]">MoTiOn</span>
            </Link>
            
            <div className={`lg:flex items-center gap-8 ${isMenuOpen ? 'flex flex-col absolute top-full left-0 w-full bg-bg-dark/95 backdrop-blur-md py-6 border-b border-primary shadow-[0_10px_20px_rgba(255,51,51,0.3)]' : 'hidden'}`}>
              <ul className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center w-full lg:w-auto">
                {navLinks.map((item) => (
                  <li key={item.name} className="w-full lg:w-auto text-center">
                    <Link to={item.path} 
                       onClick={() => setIsMenuOpen(false)}
                       className={`block py-2 lg:py-0 font-medium transition-all relative group hover:scale-105 ${location.pathname === item.path ? 'text-primary drop-shadow-[0_0_8px_#ff3333]' : 'text-white hover:text-primary hover:drop-shadow-[0_0_8px_#ff3333]'}`}>
                      {item.name}
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary shadow-[0_0_10px_#ff3333] transition-all ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 lg:mt-0 w-full lg:w-auto px-6 lg:px-0 text-center">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="btn text-sm px-5 py-2.5 w-full lg:w-auto inline-block">Get Consultation</Link>
              </div>
            </div>
            
            <button aria-label="Toggle menu" aria-expanded={isMenuOpen} className="lg:hidden text-white ml-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-bg-dark/95 backdrop-blur-xl pt-24 pb-8 border-t border-white/10 overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full"></div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <Link to="/" className="text-2xl font-bold text-white tracking-tight font-heading group inline-block">
                <span className="text-white group-hover:text-primary transition-colors">ViSa</span> <span className="text-primary drop-shadow-[0_0_15px_#ff3333]">MoTiOn</span>
              </Link>
              <p className="text-gray-400 leading-relaxed text-sm">
                Your premier partner for global immigration solutions. We simplify complex visa processes to make your international aspirations a reality with 99% success rate.
              </p>
              <div className="flex gap-3">
                {[
                  { name: 'Facebook', icon: Facebook },
                  { name: 'Twitter', icon: Twitter },
                  { name: 'Instagram', icon: Instagram },
                  { name: 'Linkedin', icon: Linkedin }
                ].map(social => (
                  <a 
                    key={social.name} 
                    href="#" 
                    onClick={e => e.preventDefault()} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={`Follow us on ${social.name}`} 
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary hover:border-primary hover:-translate-y-1 transition-all duration-300 shadow-lg group"
                  >
                    <social.icon size={18} className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                <span className="w-6 h-[1px] bg-primary"></span> Quick Links
              </h4>
              <ul className="space-y-4">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-gray-400 hover:text-primary transition-all hover:translate-x-2 flex items-center gap-2 group text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                <span className="w-6 h-[1px] bg-primary"></span> Contact Info
              </h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <MapPin size={18} />
                  </div>
                  <span className="text-gray-400 text-sm leading-relaxed">123 Visa Avenue, Global City,<br />NY 10001, USA</span>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Phone size={18} />
                  </div>
                  <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Mail size={18} />
                  </div>
                  <span className="text-gray-400 text-sm">info@visamotion.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                <span className="w-6 h-[1px] bg-primary"></span> Newsletter
              </h4>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">Subscribe to receive the latest visa updates and travel insights directly.</p>
              <form onSubmit={handleFooterSubmit} className="space-y-3">
                <div className="relative group">
                  <input 
                    type="email" 
                    value={footerEmail} 
                    onChange={e => setFooterEmail(e.target.value)} 
                    aria-label="Email address for newsletter" 
                    placeholder="Your email address" 
                    required 
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-gray-600" 
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={footerNewsletterLoading} 
                  className="group relative w-full overflow-hidden rounded-2xl p-[1px] transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] opacity-80 group-hover:opacity-100"></div>
                  <div className="relative bg-bg-dark hover:bg-transparent transition-colors py-3.5 rounded-[15px] flex items-center justify-center gap-2">
                    {footerNewsletterLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Subscribing...</>
                    ) : (
                      <span className="text-xs font-bold text-white uppercase tracking-widest">Subscribe Now</span>
                    )}
                  </div>
                </button>
              </form>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs tracking-wide text-center md:text-left">
              &copy; {new Date().getFullYear()} <span className="text-white font-medium">ViSa MoTiOn</span>. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <a href="#" onClick={e => e.preventDefault()} className="text-gray-500 hover:text-white text-xs transition-colors">Privacy Policy</a>
              <a href="#" onClick={e => e.preventDefault()} className="text-gray-500 hover:text-white text-xs transition-colors">Terms of Service</a>
              <a href="#" onClick={e => e.preventDefault()} className="text-gray-500 hover:text-white text-xs transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Elements */}
      <div className="fixed bottom-8 left-8 z-40">
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" className="w-14 h-14 bg-primary rounded-full flex justify-center items-center text-white shadow-[0_4px_20px_rgba(255,51,51,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_30px_rgba(255,51,51,0.6)] animate-[pulse-custom_2s_infinite] border border-white/20">
          <MessageCircle size={28} />
        </a>
      </div>

      {showNewsletterPopup && (
        <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="fixed bottom-8 left-8 bg-[#1a1a1a]/95 backdrop-blur-md border-2 border-primary rounded-2xl p-6 max-w-xs shadow-[0_10px_30px_rgba(255,51,51,0.3)] z-50">
          <button onClick={() => setShowNewsletterPopup(false)} aria-label="Close popup" className="absolute top-3 right-3 text-gray-400 hover:text-white">
            <X size={20} />
          </button>
          <h4 className="text-xl mb-2 text-white">Get Visa Updates!</h4>
          <p className="text-gray-400 text-sm mb-4">Subscribe to get latest visa news and tips directly in your inbox.</p>
          <input type="email" value={popupEmail} onChange={e => setPopupEmail(e.target.value)} id="popup-email" aria-label="Email address for popup newsletter" placeholder="Your email address" className="w-full p-2 mb-3 bg-bg-dark border border-primary rounded text-white" />
          <button onClick={() => {
            if (!popupEmail || !isValidEmail(popupEmail)) {
              toast.error('Please enter a valid email address.');
              return;
            }
            setPopupNewsletterLoading(true);
            setTimeout(() => {
              setPopupNewsletterLoading(false);
              toast.success('Thank you for subscribing!');
              setPopupEmail('');
              setTimeout(() => {
                setShowNewsletterPopup(false);
              }, 2000);
            }, 1500);
          }} disabled={popupNewsletterLoading} className="btn w-full py-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
            {popupNewsletterLoading ? <><motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}><Loader2 className="w-5 h-5" /></motion.div> Subscribing...</> : 'Subscribe Now'}
          </button>
        </motion.div>
      )}

      <button 
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-8 right-8 bg-primary text-bg-dark w-12 h-12 rounded-full flex justify-center items-center shadow-[0_4px_15px_rgba(255,51,51,0.3)] transition-all duration-300 hover:bg-primary-hover hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(255,51,51,0.5)] z-40 ${showBackToTop ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
}
