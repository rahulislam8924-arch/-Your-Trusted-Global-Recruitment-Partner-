import React from 'react';
import { Clock, Headset, Shield, CheckCircle } from 'lucide-react';
import { FadeInWhenVisible } from '../components/Shared';

export default function About() {
  return (
    <>
      {/* Why Choose Us */}
      <section id="why-us" className="py-24 bg-bg-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <FadeInWhenVisible direction="right" className="flex-1 w-full">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full"></div>
                <img src="https://picsum.photos/seed/visa2/800/600" alt="Visa Consultation" className="rounded-2xl shadow-[0_20px_50px_rgba(255,51,51,0.3)] relative z-10 border border-primary/30 w-full" referrerPolicy="no-referrer" />
                <div className="absolute bottom-4 right-4 sm:-bottom-8 sm:-right-8 bg-bg-card/90 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-[0_10px_30px_rgba(255,51,51,0.2)] border border-primary/50 z-20">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 drop-shadow-[0_0_10px_#ff3333]">99%</div>
                  <div className="text-gray-300 font-medium text-sm sm:text-base">Success Rate</div>
                </div>
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="left" className="flex-1">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white font-heading drop-shadow-[0_0_15px_rgba(255,51,51,0.3)]">Why Choose ViSa MoTiOn?</h2>
              <p className="text-gray-400 mb-8 text-lg">We simplify the complex visa process, ensuring a stress-free experience from application to approval.</p>
              <div className="space-y-6">
                {[
                  { icon: Clock, title: 'Fast Processing', desc: 'We expedite your application to minimize waiting times.' },
                  { icon: Shield, title: 'Secure & Confidential', desc: 'Your personal information is handled with the utmost security.' },
                  { icon: Headset, title: '24/7 Support', desc: 'Our experts are always available to answer your queries.' }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors border border-primary/30 shadow-[0_0_10px_rgba(255,51,51,0.1)]">
                      <feature.icon className="text-primary drop-shadow-[0_0_5px_#ff3333]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">{feature.title}</h4>
                      <p className="text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-24 bg-bg-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FadeInWhenVisible direction="right">
              <div className="bg-bg-card/80 backdrop-blur-md p-10 rounded-2xl border border-primary/20 h-full">
                <h3 className="text-3xl font-bold text-white mb-6 font-heading">Our Mission</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  To provide seamless, transparent, and efficient visa consultancy services that empower individuals and businesses to explore global opportunities without the burden of complex paperwork.
                </p>
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="left">
              <div className="bg-bg-card/80 backdrop-blur-md p-10 rounded-2xl border border-primary/20 h-full">
                <h3 className="text-3xl font-bold text-white mb-6 font-heading">Our Vision</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  To be the world's most trusted and innovative visa assistance partner, recognized for our commitment to client success and our ability to simplify international mobility.
                </p>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section id="values" className="py-24 bg-bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeInWhenVisible>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">The principles that guide everything we do</p>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Integrity', desc: 'We maintain the highest ethical standards in all our dealings, ensuring transparency and honesty.' },
              { title: 'Excellence', desc: 'We strive for perfection in every application we handle, aiming for the best possible outcome.' },
              { title: 'Empathy', desc: 'We understand that every visa application represents a dream or a goal. We treat every client with care.' }
            ].map((value, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.1}>
                <div className="bg-bg-card/80 backdrop-blur-md p-8 rounded-2xl border border-primary/20 hover:border-primary transition-all text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-400">{value.desc}</p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section id="global" className="py-24 bg-bg-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
            <FadeInWhenVisible direction="left" className="flex-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full"></div>
                <img src="https://picsum.photos/seed/world/800/600" alt="Global Presence" className="rounded-2xl shadow-[0_20px_50px_rgba(255,51,51,0.3)] relative z-10 border border-primary/30" referrerPolicy="no-referrer" />
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="right" className="flex-1">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white font-heading">Our Global Presence</h2>
              <p className="text-gray-400 mb-8 text-lg">With offices in major cities around the world, we provide localized expertise with a global perspective.</p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { city: 'New York', country: 'USA' },
                  { city: 'London', country: 'UK' },
                  { city: 'Dubai', country: 'UAE' },
                  { city: 'Singapore', country: 'Singapore' }
                ].map((office, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="text-primary" size={20} />
                    <div>
                      <div className="text-white font-semibold">{office.city}</div>
                      <div className="text-gray-500 text-sm">{office.country}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-24 bg-bg-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeInWhenVisible>
            <h2 className="section-title">Meet Our Experts</h2>
            <p className="section-subtitle">Dedicated professionals committed to your success</p>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'John Doe', role: 'Senior Consultant', img: 'https://picsum.photos/seed/john/400/400' },
              { name: 'Jane Smith', role: 'Immigration Lawyer', img: 'https://picsum.photos/seed/jane/400/400' },
              { name: 'Mike Johnson', role: 'Visa Specialist', img: 'https://picsum.photos/seed/mike/400/400' },
              { name: 'Emily Brown', role: 'Client Relations', img: 'https://picsum.photos/seed/emily/400/400' }
            ].map((member, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.1}>
                <div className="bg-bg-card/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(255,51,51,0.1)] border border-primary/20 group hover:shadow-[0_20px_40px_rgba(255,51,51,0.3)] hover:border-primary transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img src={member.img} alt={member.name} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent opacity-60"></div>
                  </div>
                  <div className="p-6 text-center relative z-10 -mt-10 bg-bg-card/90 backdrop-blur-md mx-4 rounded-xl border border-primary/20 group-hover:border-primary transition-colors">
                    <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
