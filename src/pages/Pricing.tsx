import React from 'react';
import { CheckCircle } from 'lucide-react';
import { FadeInWhenVisible } from '../components/Shared';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-bg-dark/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeInWhenVisible>
          <h2 className="section-title">Transparent Pricing</h2>
          <p className="section-subtitle">No hidden fees. Choose the plan that fits your needs.</p>
        </FadeInWhenVisible>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Basic', price: '$99', desc: 'Standard visa processing', features: ['Document Review', 'Application Submission', 'Standard Processing Time', 'Email Support'] },
            { title: 'Premium', price: '$199', desc: 'Fast-track processing', features: ['Everything in Basic', 'Express Processing', 'Dedicated Consultant', '24/7 Phone Support', 'Interview Preparation'], popular: true },
            { title: 'VIP', price: '$399', desc: 'Complete peace of mind', features: ['Everything in Premium', 'Doorstep Document Collection', 'Airport Meet & Greet', 'Travel Insurance Included'] }
          ].map((plan, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.1}>
              <div className={`bg-bg-card/80 backdrop-blur-md p-10 rounded-2xl border ${plan.popular ? 'border-primary shadow-[0_0_30px_rgba(255,51,51,0.2)] transform md:-translate-y-4' : 'border-primary/20'} relative flex flex-col h-full transition-all duration-300 hover:shadow-[0_20px_40px_rgba(255,51,51,0.3)]`}>
                {plan.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-[0_0_10px_#ff3333]">Most Popular</div>}
                <h3 className="text-2xl mb-2">{plan.title}</h3>
                <div className="text-4xl font-bold text-white mb-4 font-heading">{plan.price}</div>
                <p className="text-gray-400 mb-8">{plan.desc}</p>
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="text-primary shrink-0 drop-shadow-[0_0_5px_#ff3333]" size={20} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-full font-semibold transition-all ${plan.popular ? 'bg-primary text-white shadow-[0_0_15px_#ff3333] hover:shadow-[0_0_25px_#ff3333]' : 'border border-primary text-primary hover:bg-primary hover:text-white shadow-[0_0_10px_rgba(255,51,51,0.2)] hover:shadow-[0_0_20px_rgba(255,51,51,0.5)]'}`}>
                  Choose Plan
                </button>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
