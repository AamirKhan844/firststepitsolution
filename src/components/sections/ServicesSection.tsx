import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Headphones, PhoneCall } from 'lucide-react';
import { servicesData } from '@/data/servicesData';
import { ServiceCard } from '@/components/ui/ServiceCard';

export interface ServicesSectionProps {
  id?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ id = 'services' }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All IT Services' },
    { id: 'Corporate AMC', label: 'Annual Maintenance (AMC)' },
    { id: 'Repair & Spares', label: 'Chip-Level Motherboard Lab' },
    { id: 'Rental Services', label: 'Equipment Leasing' },
    { id: 'Hardware Sales', label: 'Hardware Sales' },
    { id: 'Networking', label: 'Structured Cabling' },
    { id: 'IT Services', label: 'Facility Management' },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? servicesData
      : servicesData.filter((s) => s.badge === activeCategory);

  return (
    <section
      id={id}
      className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden scroll-mt-20 sm:scroll-mt-28 lg:scroll-mt-36"
    >
      <div className="section-wrap relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Headphones className="w-3.5 h-3.5" />
              <span>ENTERPRISE IT SERVICES &amp; 24/7 AMC</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Corporate IT Support, AMC &amp; Infrastructure Solutions
            </h2>
            <p className="text-slate-600 text-base mt-2.5 leading-relaxed">
              From comprehensive annual maintenance contracts and Nehru Place chip-level motherboard repairs to structured network cabling, server management, and turnkey office IT deployments.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="tel:+919643537006"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:border-blue-400 hover:text-blue-600 shadow-sm transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              <span>Support Desk: +91 96435 37006</span>
            </a>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div
          role="tablist"
          aria-label="Filter Services by Category"
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Responsive Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <ServiceCard service={service} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Turnkey Advisory Banner */}
        <div className="mt-14 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-slate-900">
              Need a Custom Comprehensive AMC for your Office?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Our engineers conduct a free on-site IT audit of your laptops, desktops, servers, and network switches across Delhi NCR.
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary py-3 px-6 text-xs whitespace-nowrap shrink-0"
          >
            <span>Book Free On-Site IT Audit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
