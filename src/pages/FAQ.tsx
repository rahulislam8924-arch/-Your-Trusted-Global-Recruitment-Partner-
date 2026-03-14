import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FadeInWhenVisible } from '../components/Shared';

export default function FAQ() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-bg-dark/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeInWhenVisible>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Find answers to common visa-related queries</p>
        </FadeInWhenVisible>
        <div className="space-y-4">
          {[
            { q: 'How long does the visa process take?', a: 'Processing times vary depending on the destination country and visa type. Standard processing usually takes 10-15 business days, while express processing can take 3-5 days.' },
            { q: 'What documents do I need for a tourist visa?', a: 'Generally, you need a valid passport, recent passport-size photographs, proof of funds (bank statements), travel itinerary, and hotel bookings. Specific requirements vary by country.' },
            { q: 'Can you guarantee my visa approval?', a: 'While we have a 99% success rate and ensure your application is perfect, the final decision rests solely with the respective embassy or consulate. We cannot guarantee approval.' },
            { q: 'Do I need to attend an interview?', a: 'Some countries require a personal interview (e.g., US B1/B2 visa). We provide comprehensive interview preparation as part of our Premium and VIP packages.' },
            { q: 'What happens if my visa is rejected?', a: 'If rejected, we will analyze the rejection reasons and advise you on the next steps, which may include reapplying with additional documentation or appealing the decision.' },
            { q: 'Do you provide travel insurance?', a: 'Yes, travel insurance is included in our VIP package. For other packages, we can assist you in obtaining comprehensive travel insurance through our partners.' },
            { q: 'Can I track my application status?', a: 'Absolutely! You can use our real-time tracker on the homepage by entering your reference number. We also send regular updates via email and SMS.' },
            { q: 'Is my personal data safe with you?', a: 'We take data security very seriously. All your personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent.' }
          ].map((faq, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.1}>
              <div className="bg-bg-card/80 backdrop-blur-md rounded-xl border border-primary/20 overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-[0_10px_30px_rgba(255,51,51,0.2)]">
                <button
                  aria-expanded={faqOpen === i}
                  aria-controls={`faq-answer-${i}`}
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus:bg-primary/10"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span className="font-semibold text-white text-lg">{faq.q}</span>
                  <ChevronDown className={`text-primary transition-transform duration-300 ${faqOpen === i ? 'rotate-180' : ''}`} />
                </button>
                <div id={`faq-answer-${i}`} className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${faqOpen === i ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-400 border-t border-primary/20 pt-4">{faq.a}</p>
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
