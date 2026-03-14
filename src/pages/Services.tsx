import React from 'react';
import { Plane, Briefcase, GraduationCap, Stethoscope, Users, HardHat, CheckCircle } from 'lucide-react';
import { FadeInWhenVisible } from '../components/Shared';

export default function Services() {
  const handleDownloadChecklist = (type: string) => {
    const lists: Record<string, string> = {
      tourist: 'Tourist Visa Checklist:\n- Valid Passport\n- Passport-size Photos\n- Bank Statements\n- Travel Itinerary\n- Hotel Booking',
      business: 'Business Visa Checklist:\n- Valid Passport\n- Invitation Letter\n- Company Letter\n- Bank Statements\n- Business Proof',
      student: 'Student Visa Checklist:\n- Valid Passport\n- Acceptance Letter\n- Academic Records\n- Financial Proof\n- Language Test Scores'
    };
    const content = lists[type] || 'Checklist not found';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-checklist.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Services */}
      <section id="services" className="py-24 bg-bg-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeInWhenVisible>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">Comprehensive visa solutions tailored to your needs</p>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Plane, title: 'Tourist Visa', desc: 'Explore the world with ease. We assist with tourist visa applications for popular destinations.' },
              { icon: Briefcase, title: 'Business Visa', desc: 'Attend meetings, conferences, and expand your business globally with our business visa support.' },
              { icon: GraduationCap, title: 'Student Visa', desc: 'Pursue your education abroad. We guide you through the student visa process step by step.' },
              { icon: Stethoscope, title: 'Medical Visa', desc: 'Get medical treatment abroad with our specialized medical visa assistance.' },
              { icon: Users, title: 'Family Visa', desc: 'Reunite with your loved ones. We handle family visa applications with care.' },
              { icon: HardHat, title: 'Work Visa', desc: 'Build your career abroad. We guide you through the work visa process.' }
            ].map((service, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.1}>
                <div className="bg-bg-card/80 backdrop-blur-md p-8 lg:p-10 rounded-2xl text-center shadow-[0_10px_30px_rgba(255,51,51,0.1)] transition-all duration-300 border border-primary/20 relative overflow-hidden group hover:scale-105 hover:shadow-[0_20px_40px_rgba(255,51,51,0.3)] hover:border-primary h-full">
                  <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,51,51,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <service.icon className="w-12 h-12 text-primary mx-auto mb-5 drop-shadow-[0_0_15px_#ff3333] transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-2xl mb-4">{service.title}</h3>
                  <p className="text-gray-400">{service.desc}</p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Document Checklist */}
      <section id="checklist" className="py-24 bg-bg-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeInWhenVisible>
            <h2 className="section-title">Document Checklist</h2>
            <p className="section-subtitle">Download the required documents list for your visa type</p>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { type: 'tourist', title: 'Tourist Visa', items: ['Valid Passport', 'Passport-size Photos', 'Bank Statements', 'Travel Itinerary', 'Hotel Booking'] },
              { type: 'business', title: 'Business Visa', items: ['Valid Passport', 'Invitation Letter', 'Company Letter', 'Bank Statements', 'Business Proof'] },
              { type: 'student', title: 'Student Visa', items: ['Valid Passport', 'Acceptance Letter', 'Academic Records', 'Financial Proof', 'Language Test Scores'] }
            ].map((list, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.1}>
                <div className="bg-bg-card/80 backdrop-blur-md p-8 rounded-2xl border border-primary/20 hover:border-primary transition-colors h-full flex flex-col">
                  <h3 className="text-2xl mb-6 text-center text-primary">{list.title}</h3>
                  <ul className="space-y-4 mb-8 flex-grow">
                    {list.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="text-green-500 shrink-0" size={20} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleDownloadChecklist(list.type)} className="w-full py-3 rounded-full font-semibold border border-primary text-primary hover:bg-primary hover:text-white transition-all shadow-[0_0_15px_rgba(255,51,51,0.2)] hover:shadow-[0_0_20px_rgba(255,51,51,0.5)]">
                    Download Checklist
                  </button>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
