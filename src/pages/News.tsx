import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Newspaper } from 'lucide-react';
import { FadeInWhenVisible } from '../components/Shared';

const newsItems = [
  {
    id: 1,
    title: 'New Schengen Visa Rules 2024',
    date: 'March 10, 2024',
    author: 'Immigration Expert',
    desc: 'Everything you need to know about the upcoming changes to the Schengen visa application process. The new rules aim to digitize the process and improve security across member states.',
    content: 'The European Union is set to implement significant changes to the Schengen visa application process in 2024. The primary focus is on the digitalization of the visa procedure, which will eventually replace the current physical visa stickers with digital barcodes. This move is expected to reduce administrative burdens and enhance security by making it harder to forge or steal visa documents. Applicants will be able to submit their applications through a centralized EU platform, regardless of which Schengen country they intend to visit. Furthermore, the new rules will introduce a more harmonized approach to visa fees and processing times across all member states.',
    img: 'https://picsum.photos/seed/schengen/800/500'
  },
  {
    id: 2,
    title: 'Top 10 Digital Nomad Visas',
    date: 'March 05, 2024',
    author: 'Travel Consultant',
    desc: 'Working remotely? Discover the best countries offering digital nomad visas right now. From the beaches of Bali to the historic streets of Portugal.',
    content: 'The rise of remote work has led many countries to introduce dedicated visas for digital nomads. These visas allow individuals to live and work in a foreign country while employed by a company or clients based outside that country. Portugal remains a top choice with its D7 visa, offering a high quality of life and access to the EU. Spain has also recently launched its own digital nomad visa, attracting many with its vibrant culture and favorable climate. Other notable mentions include Croatia, Greece, and Estonia, each offering unique benefits for remote workers seeking a change of scenery.',
    img: 'https://picsum.photos/seed/nomad/800/500'
  },
  {
    id: 3,
    title: 'Common Visa Rejection Reasons',
    date: 'February 28, 2024',
    author: 'Visa Specialist',
    desc: 'Avoid these common mistakes that lead to visa application rejections. Lack of documentation and inconsistent information are the top culprits.',
    content: 'Visa rejections can be frustrating and costly. Understanding the common reasons for refusal can help you prepare a stronger application. One of the most frequent reasons is the submission of incomplete or incorrect documentation. It is crucial to follow the checklist provided by the embassy precisely. Another common issue is failing to provide sufficient proof of financial means to support your stay. Consular officers need to be convinced that you have enough funds for your entire trip and return journey. Additionally, inconsistent information between your application form and supporting documents can raise red flags.',
    img: 'https://picsum.photos/seed/visa/800/500'
  },
  {
    id: 4,
    title: 'Canada Express Entry Updates',
    date: 'February 20, 2024',
    author: 'Immigration Lawyer',
    desc: 'Canada has announced new category-based draws for Express Entry in 2024. Find out if your occupation is on the priority list.',
    content: 'Immigration, Refugees and Citizenship Canada (IRCC) continues to refine its Express Entry system to meet the country\'s economic needs. In 2024, there is a strong emphasis on category-based selection, targeting candidates with specific skills or language proficiencies. Priority sectors include healthcare, STEM (Science, Technology, Engineering, and Mathematics) professions, trades, transport, and agriculture. French-language proficiency also remains a key priority. These targeted draws are designed to address chronic labor shortages in critical sectors of the Canadian economy.',
    img: 'https://picsum.photos/seed/canada/800/500'
  }
];

export default function News() {
  const [selectedNews, setSelectedNews] = React.useState<typeof newsItems[0] | null>(null);

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-bg-dark/30">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <FadeInWhenVisible>
            <Newspaper className="w-16 h-16 text-primary mx-auto mb-6 drop-shadow-[0_0_15px_#ff3333]" />
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white font-heading drop-shadow-[0_0_20px_rgba(255,51,51,0.5)]">
              Latest Visa News
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Stay informed with the most recent updates on global immigration policies, 
              visa regulations, and travel tips from our experts.
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item, i) => (
              <FadeInWhenVisible key={item.id} delay={i * 0.1}>
                <div className="bg-bg-card/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(255,51,51,0.1)] border border-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(255,51,51,0.3)] hover:border-primary group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent opacity-60"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><Calendar size={14} className="text-primary" /> {item.date}</span>
                      <span className="flex items-center gap-1"><User size={14} className="text-primary" /> {item.author}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-3">{item.desc}</p>
                    <button 
                      onClick={() => setSelectedNews(item)}
                      className="text-primary font-semibold flex items-center gap-2 transition-all hover:text-white hover:drop-shadow-[0_0_10px_#ff3333]"
                    >
                      Read Full Article <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-bg-dark/90 backdrop-blur-sm"
            onClick={() => setSelectedNews(null)}
          ></motion.div>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-bg-card border border-primary/30 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative z-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col"
          >
            <div className="relative h-64 lg:h-80 shrink-0">
              <img 
                src={selectedNews.img} 
                alt={selectedNews.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent"></div>
              <button 
                onClick={() => setSelectedNews(null)}
                className="absolute top-6 right-6 text-white bg-bg-dark/50 p-2 rounded-full hover:bg-primary transition-colors z-20"
              >
                <ArrowRight className="rotate-180" size={24} />
              </button>
            </div>
            <div className="p-6 lg:p-12 overflow-y-auto">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1"><Calendar size={16} className="text-primary" /> {selectedNews.date}</span>
                <span className="flex items-center gap-1"><User size={16} className="text-primary" /> {selectedNews.author}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-heading">{selectedNews.title}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-gray-300 mb-6 leading-relaxed italic border-l-4 border-primary pl-6">
                  {selectedNews.desc}
                </p>
                <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-line">
                  {selectedNews.content}
                </p>
              </div>
              <div className="mt-10 pt-8 border-t border-primary/20">
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="btn px-8"
                >
                  Back to News
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
