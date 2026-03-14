import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, HeartHandshake, Star, FileText, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { motion, useScroll, useTransform } from 'motion/react';
import { FadeInWhenVisible, Counter } from '../components/Shared';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Home() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);

  const initialFormState = {
    name: '', dob: '', email: '', phone: '',
    passport: '', visaType: '', destination: '', travelDate: '',
    speed: '', source: '', requirements: ''
  };
  const [formData, setFormData] = useState(initialFormState);
  const [visaCheck, setVisaCheck] = useState({ from: '', to: '' });
  const [trackingRef, setTrackingRef] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [visaResult, setVisaResult] = useState({ show: false, required: false });
  const [isTracking, setIsTracking] = useState(false);
  const [trackerResult, setTrackerResult] = useState({ show: false, status: '' });
  const [isSubmittingApp, setIsSubmittingApp] = useState(false);
  const [formStep, setFormStep] = useState(1);

  const handleApplyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  };

  const handleCheckVisa = () => {
    if (!visaCheck.from || !visaCheck.to) {
      toast.error('Please select both countries');
      return;
    }
    const required = ['usa', 'uk', 'canada', 'australia'];
    setVisaResult({ show: true, required: required.includes(visaCheck.to) });
  };

  const handleTrackStatus = () => {
    if (!trackingRef) {
      toast.error('Please enter a reference number');
      return;
    }
    setIsTracking(true);
    setTrackerResult({ show: false, status: '' });
    setTimeout(() => {
      const statuses = ['approved', 'pending', 'rejected'];
      setTrackerResult({ show: true, status: statuses[Math.floor(Math.random() * statuses.length)] });
      setIsTracking(false);
    }, 1500);
  };

  const handleAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingApp(true);
    setTimeout(() => {
      setIsSubmittingApp(false);
      toast.success('Your visa application has been submitted successfully! We will contact you soon.');
      setFormStep(1);
      setFormData(initialFormState);
    }, 2000);
  };

  const nextStep = (step: number) => {
    if (step === 2) {
      if (!formData.name || !formData.dob || !formData.email || !formData.phone) {
        toast.error('Please fill in all required fields in Step 1.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast.error('Please enter a valid email address.');
        return;
      }
    }
    if (step === 3) {
      if (!formData.passport || !formData.visaType || !formData.destination || !formData.travelDate) {
        toast.error('Please fill in all required fields in Step 2.');
        return;
      }
    }
    setFormStep(step);
  };

  return (
    <>
      {/* Hero */}
      <section id="home" className="relative min-h-[90vh] flex items-center py-20 overflow-hidden">
        <motion.div style={{ y: yBg }} className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,51,51,0.1)_0%,transparent_70%)] animate-[spin_20s_linear_infinite] z-0"></motion.div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full text-center"
          >
            <h1 className="text-4xl lg:text-8xl leading-tight mb-8 drop-shadow-[0_0_20px_rgba(255,51,51,0.5)] font-bold tracking-tight">
              <span className="block mb-2 text-white/90 font-light tracking-widest uppercase text-2xl lg:text-3xl">Your Journey Starts with</span>
              <span className="bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] block py-4 text-6xl lg:text-9xl">ViSa MoTiOn</span>
            </h1>
            <p className="text-lg lg:text-xl mb-10 text-gray-300 opacity-90 max-w-4xl mx-auto whitespace-normal lg:whitespace-nowrap">
              Professional visa assistance with 99% success rate. We handle the paperwork, you pack your bags.
            </p>
            <button onClick={handleApplyNow} disabled={isApplying} className="btn inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {isApplying ? <><motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}><Loader2 className="w-5 h-5" /></motion.div> Processing...</> : 'Apply Now'}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Counter */}
      <section className="py-16 bg-[#111]/50 backdrop-blur-sm border-y border-primary/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Counter end={5000} label="Visa Approved" icon={FileText} delay={0} />
            <Counter end={2500} label="Happy Clients" icon={HeartHandshake} delay={0.1} />
            <Counter end={50} label="Countries" icon={Plane} delay={0.2} />
            <Counter end={15} label="Years Experience" icon={Star} delay={0.3} />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="process" className="py-24 bg-bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeInWhenVisible>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Simple 3-step process to get your visa</p>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-primary/20 -translate-y-1/2 z-0"></div>
            {[
              { step: '01', title: 'Online Application', desc: 'Fill out our simple online form with your basic details and destination.' },
              { step: '02', title: 'Document Review', desc: 'Our experts review your documents and ensure everything is in order.' },
              { step: '03', title: 'Visa Approval', desc: 'We submit your application and track it until your visa is approved.' }
            ].map((item, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.2}>
                <div className="relative z-10 bg-bg-card/80 backdrop-blur-md p-8 rounded-2xl border border-primary/20 text-center hover:border-primary transition-all group">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-[0_0_20px_rgba(255,51,51,0.4)] group-hover:scale-110 transition-transform">{item.step}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-bg-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeInWhenVisible>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">Comprehensive visa solutions tailored to your needs</p>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Plane, title: 'Tourist Visa', desc: 'Explore the world with ease. We assist with tourist visa applications for popular destinations.' },
              { icon: FileText, title: 'Business Visa', desc: 'Attend meetings, conferences, and expand your business globally with our business visa support.' },
              { icon: HeartHandshake, title: 'Family Visa', desc: 'Reunite with your loved ones. We handle family visa applications with care.' }
            ].map((service, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.1}>
                <div className="bg-bg-card/80 backdrop-blur-md p-8 rounded-2xl text-center border border-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_35px_rgba(255,51,51,0.4)] hover:border-primary group">
                  <service.icon className="w-12 h-12 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-xl mb-3">{service.title}</h3>
                  <p className="text-gray-400">{service.desc}</p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Checker */}
      <section className="py-20 bg-bg-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeInWhenVisible>
            <h2 className="section-title">Do I Need a Visa?</h2>
            <p className="section-subtitle">Quickly check visa requirements for your destination</p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.2}>
            <div className="bg-[#1a1a1a]/80 backdrop-blur-md rounded-2xl p-10 max-w-3xl mx-auto border border-primary/30 shadow-[0_20px_40px_rgba(255,51,51,0.2)]">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <select value={visaCheck.from} onChange={e => setVisaCheck({...visaCheck, from: e.target.value})} id="from-country" aria-label="Select your citizenship" className="flex-1 w-full p-4 bg-bg-dark border border-primary rounded-lg text-white text-base cursor-pointer focus:outline-none focus:shadow-[0_0_15px_#ff3333]">
                  <option value="">I am a citizen of...</option>
                  <option value="india">India</option>
                  <option value="usa">USA</option>
                  <option value="uk">UK</option>
                </select>
                <Plane className="text-primary rotate-90 md:rotate-0 shrink-0" size={32} />
                <select value={visaCheck.to} onChange={e => setVisaCheck({...visaCheck, to: e.target.value})} id="to-country" aria-label="Select your destination" className="flex-1 w-full p-4 bg-bg-dark border border-primary rounded-lg text-white text-base cursor-pointer focus:outline-none focus:shadow-[0_0_15px_#ff3333]">
                  <option value="">I want to travel to...</option>
                  <option value="usa">USA</option>
                  <option value="uk">UK</option>
                  <option value="canada">Canada</option>
                  <option value="australia">Australia</option>
                  <option value="singapore">Singapore</option>
                </select>
              </div>
              <div className="mt-8 text-center">
                <button onClick={handleCheckVisa} className="btn px-12 py-4 text-lg">Check Requirements</button>
              </div>
              {visaResult.show && (
                <div className={`mt-8 text-center text-xl p-5 rounded-lg border ${visaResult.required ? 'bg-primary/20 border-primary text-primary' : 'bg-green-500/10 border-green-500 text-green-500'}`}>
                  {visaResult.required ? 'Yes, you need a visa for this destination.' : 'No, you do not need a visa for this destination.'}
                </div>
              )}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-bg-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeInWhenVisible>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">Success stories from travelers around the world</p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.2}>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="pb-16"
            >
              {[
                { name: 'Sarah Johnson', role: 'Student', text: 'ViSa MoTiOn made my student visa process so smooth. I was stressed, but they handled everything perfectly!' },
                { name: 'Michael Chen', role: 'Business Traveler', text: 'Fast, efficient, and professional. Got my business visa in record time. Highly recommended.' },
                { name: 'Emma Davis', role: 'Tourist', text: 'Planning a family trip was easy with their help. They guided us through every step of the tourist visa application.' },
                { name: 'David Smith', role: 'Expat', text: 'The team was incredibly helpful with my work visa. They know exactly what they are doing.' },
                { name: 'Aisha Patel', role: 'Digital Nomad', text: 'The best visa service I have ever used. They made navigating complex remote work visas an absolute breeze.' },
                { name: 'Carlos Rodriguez', role: 'Investor', text: 'Exceptional attention to detail. They handled my investor visa application with the utmost professionalism and care.' }
              ].map((testimonial, i) => (
                <SwiperSlide key={i} className="h-auto">
                  <article className="bg-bg-card/80 backdrop-blur-md p-8 rounded-2xl border border-primary/20 relative transition-all duration-300 hover:shadow-[0_20px_40px_rgba(255,51,51,0.3)] hover:border-primary h-full flex flex-col">
                    <div className="flex text-primary mb-4" aria-label="5 out of 5 stars" title="5 out of 5 stars">
                      {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" aria-hidden="true" />)}
                    </div>
                    <blockquote className="text-gray-300 mb-6 italic flex-grow">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl" aria-hidden="true">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-24 bg-bg-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeInWhenVisible>
            <h2 className="section-title">Latest Visa News</h2>
            <p className="section-subtitle">Stay updated with the latest immigration policies and tips</p>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'New Schengen Visa Rules 2024', desc: 'Everything you need to know about the upcoming changes to the Schengen visa application process.', img: 'https://picsum.photos/seed/schengen/600/400' },
              { title: 'Top 10 Digital Nomad Visas', desc: 'Working remotely? Discover the best countries offering digital nomad visas right now.', img: 'https://picsum.photos/seed/nomad/600/400' },
              { title: 'Common Visa Rejection Reasons', desc: 'Avoid these common mistakes that lead to visa application rejections.', img: 'https://picsum.photos/seed/visa/600/400' }
            ].map((post, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.1}>
                <div className="bg-bg-card/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(255,51,51,0.1)] border border-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(255,51,51,0.3)] hover:border-primary">
                  <img src={post.img} alt={post.title} className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="p-6">
                    <h3 className="text-xl mb-3">{post.title}</h3>
                    <p className="text-gray-400 mb-4">{post.desc}</p>
                    <Link to="/news" className="text-primary font-semibold transition-all hover:text-white hover:drop-shadow-[0_0_10px_#ff3333]">Read More →</Link>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Tracker */}
      <section id="tracker" className="py-20 bg-bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeInWhenVisible>
            <h2 className="section-title">Track Your Application</h2>
            <p className="section-subtitle">Check the real-time status of your visa application</p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.2}>
            <div className="bg-[#1a1a1a]/80 backdrop-blur-md rounded-2xl p-10 border border-primary/30 shadow-[0_20px_40px_rgba(255,51,51,0.2)]">
              <div className="flex flex-col sm:flex-row gap-4">
                <input type="text" value={trackingRef} onChange={e => setTrackingRef(e.target.value)} id="ref-number" aria-label="Reference Number" placeholder="Enter Reference Number (e.g., VISA12345)" className="flex-1 p-4 bg-bg-dark border border-primary/30 rounded-lg text-white text-base focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,51,51,0.3)]" />
                <button onClick={handleTrackStatus} disabled={isTracking} className="btn whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                  {isTracking ? <><motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}><Loader2 className="w-5 h-5" /></motion.div> Tracking...</> : 'Track Status'}
                </button>
              </div>
              {trackerResult.show && (
                <div className={`mt-8 p-5 rounded-lg text-center text-lg ${
                  trackerResult.status === 'approved' ? 'bg-green-500/10 border border-green-500 text-green-500' :
                  trackerResult.status === 'pending' ? 'bg-orange-500/10 border border-orange-500 text-orange-500' :
                  'bg-red-500/10 border border-primary text-primary'
                }`}>
                  Status: <span className="font-bold uppercase">{trackerResult.status}</span>
                </div>
              )}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-bg-card/20 border-y border-primary/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-center text-gray-500 mb-10 uppercase tracking-widest text-sm">Trusted by leading organizations</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Global Airways', 'Travel Safe', 'World Hotels', 'Nomad Insurance', 'Sky Team'].map((partner, i) => (
              <div key={i} className="text-2xl font-bold text-white font-heading">{partner}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application" className="py-24 bg-bg-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeInWhenVisible>
            <h2 className="section-title">Start Your Application</h2>
            <p className="section-subtitle">Fill out the form below and we'll get back to you within 24 hours</p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.2}>
            <div className="bg-[#1a1a1a]/80 backdrop-blur-md rounded-2xl p-10 border border-primary/30 shadow-[0_20px_40px_rgba(255,51,51,0.2)]">
              <form onSubmit={handleAppSubmit}>
                {formStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                    <h3 className="text-3xl mb-8 text-primary text-center">Step 1: Personal Information</h3>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} aria-label="Full Name" placeholder="Enter your full name" className="w-full p-3 bg-bg-dark border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,51,51,0.3)]" />
                        <input type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} aria-label="Date of Birth" className="w-full p-3 bg-bg-dark border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,51,51,0.3)]" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} aria-label="Email Address" placeholder="Enter your email" className="w-full p-3 bg-bg-dark border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,51,51,0.3)]" />
                        <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} aria-label="Phone Number" placeholder="Enter your phone number" className="w-full p-3 bg-bg-dark border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,51,51,0.3)]" />
                      </div>
                      <div className="flex justify-end mt-8">
                        <button type="button" onClick={() => nextStep(2)} className="btn">Next →</button>
                      </div>
                    </div>
                  </motion.div>
                )}
                {formStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                    <h3 className="text-3xl mb-8 text-primary text-center">Step 2: Travel Details</h3>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" value={formData.passport} onChange={e => setFormData({...formData, passport: e.target.value})} aria-label="Passport Number" placeholder="Enter passport number" className="w-full p-3 bg-bg-dark border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,51,51,0.3)]" />
                        <select value={formData.visaType} onChange={e => setFormData({...formData, visaType: e.target.value})} aria-label="Visa Type" className="w-full p-3 bg-bg-dark border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,51,51,0.3)]">
                          <option value="">Select Visa Type</option>
                          <option value="tourist">Tourist</option>
                          <option value="business">Business</option>
                          <option value="student">Student</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} aria-label="Destination Country" placeholder="Destination Country" className="w-full p-3 bg-bg-dark border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,51,51,0.3)]" />
                        <input type="date" value={formData.travelDate} onChange={e => setFormData({...formData, travelDate: e.target.value})} aria-label="Travel Date" className="w-full p-3 bg-bg-dark border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,51,51,0.3)]" />
                      </div>
                      <div className="flex justify-between mt-8">
                        <button type="button" onClick={() => setFormStep(1)} className="px-8 py-3 rounded-full font-semibold bg-gray-800 text-white hover:bg-gray-700 transition-colors">← Previous</button>
                        <button type="button" onClick={() => nextStep(3)} className="btn">Next →</button>
                      </div>
                    </div>
                  </motion.div>
                )}
                {formStep === 3 && (
                  <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                    <h3 className="text-3xl mb-8 text-primary text-center">Step 3: Additional Info</h3>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <select value={formData.speed} onChange={e => setFormData({...formData, speed: e.target.value})} aria-label="Processing Speed" className="w-full p-3 bg-bg-dark border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,51,51,0.3)]">
                          <option value="">Processing Speed</option>
                          <option value="standard">Standard (10-15 days)</option>
                          <option value="express">Express (3-5 days)</option>
                        </select>
                        <select value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} aria-label="How did you hear about us?" className="w-full p-3 bg-bg-dark border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,51,51,0.3)]">
                          <option value="">How did you hear about us?</option>
                          <option value="search">Search Engine</option>
                          <option value="social">Social Media</option>
                          <option value="friend">Friend/Family</option>
                        </select>
                      </div>
                      <div>
                        <textarea value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} aria-label="Special Requirements" rows={4} placeholder="Any special requirements?" className="w-full p-3 bg-bg-dark border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,51,51,0.3)]"></textarea>
                      </div>
                      <div className="flex justify-between mt-8">
                        <button type="button" onClick={() => setFormStep(2)} className="px-8 py-3 rounded-full font-semibold bg-gray-800 text-white hover:bg-gray-700 transition-colors">← Previous</button>
                        <button type="submit" disabled={isSubmittingApp} className="btn flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                          {isSubmittingApp ? <><motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}><Loader2 className="w-5 h-5" /></motion.div> Submitting...</> : 'Submit Application'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  );
}
