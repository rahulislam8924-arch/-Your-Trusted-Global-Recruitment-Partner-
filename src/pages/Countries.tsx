import React, { useState, useMemo } from 'react';
import { Globe, MapPin, CheckCircle, ArrowRight, Search, Filter, Calculator, X, Clock, DollarSign, Info } from 'lucide-react';
import { FadeInWhenVisible } from '../components/Shared';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const countries = [
  {
    name: 'USA',
    code: 'US',
    continent: 'North America',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=800',
    description: 'B1/B2 Visitor Visas, Student Visas (F1), and Work Visas (H1-B).',
    popular: true,
    visaTypes: ['Tourist', 'Student', 'Business', 'Work'],
    requirements: ['Valid Passport', 'DS-160 Form', 'Interview Appointment', 'Proof of Funds'],
    fees: { Tourist: 185, Student: 185, Business: 185, Work: 205 },
    processingTime: { Standard: '15-20 days', Express: '5-7 days' },
    mapQuery: 'United+States'
  },
  {
    name: 'United Kingdom',
    code: 'UK',
    continent: 'Europe',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
    description: 'Standard Visitor Visas, Skilled Worker Visas, and Student Visas.',
    popular: true,
    visaTypes: ['Tourist', 'Student', 'Work'],
    requirements: ['Valid Passport', 'Tuberculosis Test (if applicable)', 'Financial Evidence', 'CAS (for students)'],
    fees: { Tourist: 127, Student: 450, Work: 700 },
    processingTime: { Standard: '15 days', Express: '5 days' },
    mapQuery: 'United+Kingdom'
  },
  {
    name: 'Canada',
    code: 'CA',
    continent: 'North America',
    image: 'https://images.unsplash.com/photo-1503614472-8c97d45fb41a?auto=format&fit=crop&q=80&w=800',
    description: 'Visitor Visas, Study Permits, and Express Entry assistance.',
    popular: true,
    visaTypes: ['Tourist', 'Student', 'Work', 'PR'],
    requirements: ['Valid Passport', 'Biometrics', 'Proof of Funds', 'Letter of Explanation'],
    fees: { Tourist: 100, Student: 150, Work: 155, PR: 1325 },
    processingTime: { Standard: '20-30 days', Express: '10-12 days' },
    mapQuery: 'Canada'
  },
  {
    name: 'Australia',
    code: 'AU',
    continent: 'Oceania',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800',
    description: 'Visitor Visas, Subclass 500 Student Visas, and Skilled Independent Visas.',
    popular: true,
    visaTypes: ['Tourist', 'Student', 'Work'],
    requirements: ['Valid Passport', 'Health Insurance', 'Financial Proof', 'GTE Statement'],
    fees: { Tourist: 190, Student: 710, Work: 4045 },
    processingTime: { Standard: '25 days', Express: '10 days' },
    mapQuery: 'Australia'
  },
  {
    name: 'Singapore',
    code: 'SG',
    continent: 'Asia',
    image: 'https://images.unsplash.com/photo-1525625239514-75b4b17b9d50?auto=format&fit=crop&q=80&w=800',
    description: 'Tourist e-Visas, Employment Passes, and Student Passes.',
    popular: false,
    visaTypes: ['Tourist', 'Work', 'Student'],
    requirements: ['Valid Passport', 'V39A Form', 'Photograph', 'Flight Itinerary'],
    fees: { Tourist: 30, Work: 105, Student: 90 },
    processingTime: { Standard: '3-5 days', Express: '1-2 days' },
    mapQuery: 'Singapore'
  },
  {
    name: 'United Arab Emirates',
    code: 'UAE',
    continent: 'Asia',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    description: 'Tourist Visas, Golden Visas, and Employment Visas.',
    popular: false,
    visaTypes: ['Tourist', 'Work', 'Golden'],
    requirements: ['Passport Copy', 'Photograph', 'Insurance', 'Sponsor Details'],
    fees: { Tourist: 90, Work: 500, Golden: 1500 },
    processingTime: { Standard: '5-7 days', Express: '2-3 days' },
    mapQuery: 'United+Arab+Emirates'
  },
  {
    name: 'Germany',
    code: 'DE',
    continent: 'Europe',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800',
    description: 'Schengen Visas, Job Seeker Visas, and Student Visas.',
    popular: false,
    visaTypes: ['Schengen', 'Student', 'Work'],
    requirements: ['Valid Passport', 'Schengen Insurance', 'Proof of Accommodation', 'Financial Proof'],
    fees: { Schengen: 80, Student: 75, Work: 75 },
    processingTime: { Standard: '15 days', Express: '5 days' },
    mapQuery: 'Germany'
  },
  {
    name: 'Malaysia',
    code: 'MY',
    continent: 'Asia',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc18a5ce?auto=format&fit=crop&q=80&w=800',
    description: 'Tourist Visas, Student Passes, and Employment Passes (EP).',
    popular: true,
    visaTypes: ['Tourist', 'Student', 'Work'],
    requirements: ['Valid Passport', 'Visa Application Form', 'Photograph', 'Flight Itinerary'],
    fees: { Tourist: 50, Student: 450, Work: 600 },
    processingTime: { Standard: '5-7 days', Express: '3 days' },
    mapQuery: 'Malaysia'
  },
  {
    name: 'Thailand',
    code: 'TH',
    continent: 'Asia',
    image: 'https://images.unsplash.com/photo-1528181304800-2f140819ad9c?auto=format&fit=crop&q=80&w=800',
    description: 'Tourist Visas, Non-Immigrant Visas, and Elite Visas.',
    popular: true,
    visaTypes: ['Tourist', 'Non-Immigrant', 'Elite'],
    requirements: ['Valid Passport', 'Proof of Funds', 'Hotel Booking', 'Employment Letter'],
    fees: { Tourist: 40, 'Non-Immigrant': 80, Elite: 15000 },
    processingTime: { Standard: '3-5 days', Express: '1-2 days' },
    mapQuery: 'Thailand'
  },
  {
    name: 'Saudi Arabia',
    code: 'SA',
    continent: 'Asia',
    image: 'https://images.unsplash.com/photo-1586724230021-4c38383aee4b?auto=format&fit=crop&q=80&w=800',
    description: 'Umrah Visas, Tourist e-Visas, and Work Visas.',
    popular: true,
    visaTypes: ['Umrah', 'Tourist', 'Work'],
    requirements: ['Valid Passport', 'Photograph', 'Insurance', 'Vaccination Certificate'],
    fees: { Umrah: 150, Tourist: 120, Work: 2000 },
    processingTime: { Standard: '3-5 days', Express: '24 hours' },
    mapQuery: 'Saudi+Arabia'
  },
  {
    name: 'Turkey',
    code: 'TR',
    continent: 'Europe',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800',
    description: 'Tourist e-Visas, Student Visas, and Residence Permits.',
    popular: true,
    visaTypes: ['Tourist', 'Student', 'Residence'],
    requirements: ['Valid Passport', 'Photograph', 'Hotel Booking', 'Financial Proof'],
    fees: { Tourist: 60, Student: 100, Residence: 150 },
    processingTime: { Standard: '3-5 days', Express: '1-2 days' },
    mapQuery: 'Turkey'
  },
  {
    name: 'South Korea',
    code: 'KR',
    continent: 'Asia',
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=800',
    description: 'Tourist Visas, Student Visas (D-2), and Work Visas (E-9).',
    popular: true,
    visaTypes: ['Tourist', 'Student', 'Work'],
    requirements: ['Valid Passport', 'Visa Application Form', 'Photograph', 'Bank Statement'],
    fees: { Tourist: 40, Student: 60, Work: 60 },
    processingTime: { Standard: '10-15 days', Express: '5 days' },
    mapQuery: 'South+Korea'
  },
  {
    name: 'Italy',
    code: 'IT',
    continent: 'Europe',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=800',
    description: 'Schengen Visas, Study Visas, and Work Visas.',
    popular: true,
    visaTypes: ['Schengen', 'Student', 'Work'],
    requirements: ['Valid Passport', 'Schengen Insurance', 'Proof of Accommodation', 'Financial Proof'],
    fees: { Schengen: 80, Student: 50, Work: 116 },
    processingTime: { Standard: '15-20 days', Express: '7 days' },
    mapQuery: 'Italy'
  },
  {
    name: 'Portugal',
    code: 'PT',
    continent: 'Europe',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=800',
    description: 'Schengen Visas, D7 Passive Income Visas, and Work Visas.',
    popular: true,
    visaTypes: ['Schengen', 'D7', 'Work'],
    requirements: ['Valid Passport', 'NIF Number', 'Bank Account', 'Proof of Accommodation'],
    fees: { Schengen: 80, D7: 90, Work: 90 },
    processingTime: { Standard: '30-60 days', Express: '15 days' },
    mapQuery: 'Portugal'
  }
];

export default function Countries() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');
  const [selectedVisaType, setSelectedVisaType] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState<typeof countries[0] | null>(null);

  // Calculator State
  const [calcCountry, setCalcCountry] = useState('');
  const [calcVisaType, setCalcVisaType] = useState('');
  const [calcSpeed, setCalcSpeed] = useState('Standard');
  const [calcResult, setCalcResult] = useState<{ fee: number; time: string } | null>(null);

  const filteredCountries = useMemo(() => {
    return countries.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesContinent = selectedContinent === 'All' || country.continent === selectedContinent;
      const matchesVisaType = selectedVisaType === 'All' || country.visaTypes.includes(selectedVisaType);
      return matchesSearch && matchesContinent && matchesVisaType;
    });
  }, [searchQuery, selectedContinent, selectedVisaType]);

  const handleCalculate = () => {
    const country = countries.find(c => c.name === calcCountry);
    if (country && calcVisaType) {
      const baseFee = (country.fees as any)[calcVisaType] || 0;
      const expressMarkup = calcSpeed === 'Express' ? 1.5 : 1;
      const finalFee = Math.round(baseFee * expressMarkup);
      const time = (country.processingTime as any)[calcSpeed] || 'N/A';
      setCalcResult({ fee: finalFee, time });
    }
  };

  const continents = ['All', ...new Set(countries.map(c => c.continent))];
  const visaTypes = ['All', 'Tourist', 'Student', 'Work', 'Business', 'Schengen', 'Golden', 'PR'];

  return (
    <div className="pt-10">
      {/* Hero Section */}
      <section className="py-20 bg-bg-dark/30">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <FadeInWhenVisible>
            <Globe className="w-16 h-16 text-primary mx-auto mb-6 drop-shadow-[0_0_15px_#ff3333]" />
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white font-heading drop-shadow-[0_0_20px_rgba(255,51,51,0.5)]">
              Destinations We Cover
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We provide expert visa assistance for over 50+ countries worldwide. 
              Explore our most popular destinations and their specific requirements.
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-10 bg-bg-card/20 border-y border-primary/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="text" 
                placeholder="Search countries..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-bg-dark border border-primary/30 rounded-xl text-white focus:outline-none focus:border-primary transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-4 w-full lg:w-auto">
              <div className="flex items-center gap-2 bg-bg-dark border border-primary/30 rounded-xl px-4 py-2">
                <Filter size={18} className="text-primary" />
                <select 
                  value={selectedContinent}
                  onChange={(e) => setSelectedContinent(e.target.value)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer"
                >
                  {continents.map(c => <option key={c} value={c} className="bg-bg-dark">{c}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2 bg-bg-dark border border-primary/30 rounded-xl px-4 py-2">
                <Info size={18} className="text-primary" />
                <select 
                  value={selectedVisaType}
                  onChange={(e) => setSelectedVisaType(e.target.value)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer"
                >
                  {visaTypes.map(t => <option key={t} value={t} className="bg-bg-dark">{t}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {filteredCountries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredCountries.map((country, i) => (
                <FadeInWhenVisible key={country.code} delay={i * 0.1}>
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -5 }}
                    onClick={() => setSelectedCountry(country)}
                    className="bg-bg-card/80 backdrop-blur-md rounded-2xl overflow-hidden border border-primary/20 group hover:border-primary transition-all duration-300 hover:shadow-[0_20px_40px_rgba(255,51,51,0.3)] h-full flex flex-col cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={country.image} 
                        alt={country.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent opacity-60"></div>
                      {country.popular && (
                        <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_10px_#ff3333]">
                          POPULAR
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="text-primary" size={18} />
                        <h3 className="text-xl font-bold text-white">{country.name}</h3>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">
                        {country.description}
                      </p>

                      {/* Card Map */}
                      <div className="w-full h-24 rounded-xl overflow-hidden mb-4 border border-primary/10">
                        <iframe
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          style={{ border: 0 }}
                          src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyA-placeholder'}&q=${country.mapQuery}&zoom=4`}
                          allowFullScreen
                          title={`Map of ${country.name}`}
                        ></iframe>
                      </div>

                      {/* Requirements & Fees Summary */}
                      <div className="space-y-3 mb-6">
                        <div className="flex flex-wrap gap-2">
                          {country.requirements.slice(0, 2).map((req, idx) => (
                            <span key={idx} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                              {req}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-primary/10">
                          <span className="text-xs text-gray-500 uppercase tracking-tighter">Starting Fee</span>
                          <span className="text-sm font-bold text-white">${Math.min(...Object.values(country.fees))}</span>
                        </div>
                      </div>

                      <div className="mt-auto flex items-center gap-2 text-primary font-semibold group/link">
                        View Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </FadeInWhenVisible>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Globe className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-20" />
              <h3 className="text-2xl text-gray-500">No countries found matching your criteria.</h3>
            </div>
          )}
        </div>
      </section>

      {/* Visa Calculator */}
      <section className="py-24 bg-bg-card/30 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeInWhenVisible>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 mb-6 shadow-[0_0_30px_rgba(255,51,51,0.2)]">
                <Calculator className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 font-heading">Visa Fee Calculator</h2>
              <p className="text-gray-400 text-lg">Get an instant estimate for your visa application costs.</p>
            </div>
            <div className="bg-bg-dark/60 backdrop-blur-2xl p-6 sm:p-8 lg:p-12 rounded-3xl lg:rounded-[3rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.7)] relative overflow-hidden">
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 blur-[80px] rounded-full"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-2">Destination</label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-sm group-hover:bg-primary/10 transition-all"></div>
                    <div className="relative flex items-center">
                      <MapPin className="absolute left-4 text-primary/60 group-focus-within:text-primary transition-colors" size={18} />
                      <select 
                        value={calcCountry}
                        onChange={(e) => setCalcCountry(e.target.value)}
                        className="w-full pl-12 pr-10 py-4 bg-bg-card/50 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer hover:bg-bg-card"
                      >
                        <option value="" className="bg-bg-dark">Select Country</option>
                        {countries.map(c => <option key={c.code} value={c.name} className="bg-bg-dark">{c.name}</option>)}
                      </select>
                      <div className="absolute right-4 pointer-events-none border-t-2 border-r-2 border-primary/40 w-2 h-2 rotate-[135deg]"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-2">Visa Type</label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-sm group-hover:bg-primary/10 transition-all"></div>
                    <div className="relative flex items-center">
                      <Info className="absolute left-4 text-primary/60 group-focus-within:text-primary transition-colors" size={18} />
                      <select 
                        value={calcVisaType}
                        onChange={(e) => setCalcVisaType(e.target.value)}
                        disabled={!calcCountry}
                        className="w-full pl-12 pr-10 py-4 bg-bg-card/50 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-primary/50 disabled:opacity-30 transition-all appearance-none cursor-pointer hover:bg-bg-card"
                      >
                        <option value="" className="bg-bg-dark">Select Type</option>
                        {calcCountry && countries.find(c => c.name === calcCountry)?.visaTypes.map(t => (
                          <option key={t} value={t} className="bg-bg-dark">{t}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 pointer-events-none border-t-2 border-r-2 border-primary/40 w-2 h-2 rotate-[135deg]"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-2">Processing</label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-sm group-hover:bg-primary/10 transition-all"></div>
                    <div className="relative flex items-center">
                      <Clock className="absolute left-4 text-primary/60 group-focus-within:text-primary transition-colors" size={18} />
                      <select 
                        value={calcSpeed}
                        onChange={(e) => setCalcSpeed(e.target.value)}
                        className="w-full pl-12 pr-10 py-4 bg-bg-card/50 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer hover:bg-bg-card"
                      >
                        <option value="Standard" className="bg-bg-dark">Standard</option>
                        <option value="Express" className="bg-bg-dark">Express (+50%)</option>
                      </select>
                      <div className="absolute right-4 pointer-events-none border-t-2 border-r-2 border-primary/40 w-2 h-2 rotate-[135deg]"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 mb-12">
                <button 
                  onClick={handleCalculate}
                  className="group relative w-full overflow-hidden rounded-2xl p-[1px] transition-all active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] opacity-80 group-hover:opacity-100"></div>
                  <div className="relative bg-bg-dark hover:bg-transparent transition-colors py-5 rounded-[15px] flex items-center justify-center gap-3">
                    <Calculator size={22} className="text-primary group-hover:text-white transition-colors" />
                    <span className="text-xl font-bold text-white uppercase tracking-widest">Calculate Estimate</span>
                  </div>
                </button>
              </div>

              <AnimatePresence>
                {calcResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="relative z-10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:border-primary/30 transition-all duration-500">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(255,51,51,0.1)]">
                            <DollarSign size={28} />
                          </div>
                          <div>
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1">Estimated Fee</div>
                            <div className="text-4xl font-bold text-white tracking-tight">${calcResult.fee}</div>
                          </div>
                        </div>
                      </div>

                      <div className="group p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:border-primary/30 transition-all duration-500">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(255,51,51,0.1)]">
                            <Clock size={28} />
                          </div>
                          <div>
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1">Processing Time</div>
                            <div className="text-4xl font-bold text-white tracking-tight">{calcResult.time}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-3 text-gray-400 text-xs italic">
                      <Info size={14} className="text-primary mt-0.5 shrink-0" />
                      <p>This is an estimate based on current embassy data. Actual fees and timelines may vary slightly depending on individual circumstances and additional service requirements.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Why Global Section */}
      <section className="py-24 bg-bg-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <FadeInWhenVisible direction="right" className="flex-1">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white font-heading">
                Global Expertise, <span className="text-primary">Local Knowledge</span>
              </h2>
              <p className="text-gray-400 mb-8 text-lg">
                Navigating international borders requires more than just filling out forms. 
                It requires an understanding of local regulations, embassy protocols, and 
                ever-changing immigration laws.
              </p>
              <ul className="space-y-4">
                {[
                  'Up-to-date information on 50+ countries',
                  'Direct communication with embassies',
                  'Localized document translation services',
                  'Expert guidance on complex visa categories'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="text-primary" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="left" className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-bg-card p-6 rounded-2xl border border-primary/20 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">50+</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">Countries</div>
                  </div>
                  <div className="bg-bg-card p-6 rounded-2xl border border-primary/20 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">10k+</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">Approved</div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-bg-card p-6 rounded-2xl border border-primary/20 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">Support</div>
                  </div>
                  <div className="bg-bg-card p-6 rounded-2xl border border-primary/20 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">99%</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">Success</div>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Country Modal */}
      <AnimatePresence>
        {selectedCountry && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCountry(null)}
              className="absolute inset-0 bg-bg-dark/90 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-bg-card border border-primary/30 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative z-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
            >
              <button 
                onClick={() => setSelectedCountry(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white z-20 bg-bg-dark/50 p-2 rounded-full"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col lg:flex-row h-full">
                <div className="lg:w-2/5 relative h-64 lg:h-auto">
                  <img 
                    src={selectedCountry.image} 
                    alt={selectedCountry.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-card lg:bg-gradient-to-r lg:from-transparent lg:to-bg-card"></div>
                </div>
                <div className="lg:w-3/5 p-6 lg:p-12 overflow-y-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="text-primary" size={24} />
                    <h2 className="text-3xl font-bold text-white font-heading">{selectedCountry.name}</h2>
                  </div>
                  <p className="text-gray-400 mb-8 text-lg">{selectedCountry.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="text-primary font-bold mb-4 flex items-center gap-2">
                        <CheckCircle size={18} /> Requirements
                      </h4>
                      <ul className="space-y-2">
                        {selectedCountry.requirements.map((req, i) => (
                          <li key={i} className="text-gray-300 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-primary font-bold mb-4 flex items-center gap-2">
                        <Clock size={18} /> Processing Time
                      </h4>
                      <div className="space-y-2 text-gray-300">
                        <p><span className="text-gray-500">Standard:</span> {selectedCountry.processingTime.Standard}</p>
                        <p><span className="text-gray-500">Express:</span> {selectedCountry.processingTime.Express}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-bg-dark/50 p-6 rounded-2xl border border-primary/10 mb-8">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                      <DollarSign size={18} className="text-primary" /> Application Fees
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(selectedCountry.fees).map(([type, fee]) => (
                        <div key={type} className="flex justify-between items-center">
                          <span className="text-gray-500">{type}:</span>
                          <span className="text-white font-bold">${fee}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link 
                    to="/contact" 
                    onClick={() => setSelectedCountry(null)}
                    className="btn w-full py-4 flex items-center justify-center gap-2"
                  >
                    Start Application <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
