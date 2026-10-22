import React from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Building2,
  MapPin,
  FileCheck,
} from 'lucide-react';
import { companyData } from '@/data/companyData';

export interface AboutSectionProps {
  id?: string;
}

const containerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const pillarVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export const AboutSection: React.FC<AboutSectionProps> = ({ id = 'about' }) => {
  return (
    <section id={id} className="py-24 bg-white border-t border-slate-200 relative overflow-hidden scroll-mt-20 sm:scroll-mt-28 lg:scroll-mt-36">
      <div className="section-wrap relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>ABOUT FIRST STEP SOLUTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Delhi NCR&apos;s Trusted IT Hardware &amp; Enterprise Partner
          </h2>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Founded in {companyData.foundingYear}, First Step Solutions operates from Nehru Place (New Delhi) and Faridabad (Haryana), supplying genuine commercial hardware, zero-Capex corporate rentals, and mission-critical AMC support to 500+ enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Narrative & Pillars (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 leading-snug">
                15+ Years of Reliable IT Supply &amp; Engineering Care
              </h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Operating from 1218 Hemkunt Chamber, Nehru Place (Asia&apos;s premier commercial electronics and IT market) and our registered headquarters in SGM Nagar, Faridabad, First Step Solutions serves as the trusted IT infrastructure partner for multinational corporations, BPOs, tech startups, and industrial manufacturing plants.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                We understand that hardware downtime directly impacts business productivity. That&apos;s why every machine we supply—whether purchased brand-new or deployed on flexible rental terms—is backed by our certified technical team with a guaranteed 15-minute emergency SLA.
              </p>
            </div>

            {/* 4 Value Pillars */}
            <motion.div
              variants={containerStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
            >
              <motion.div
                variants={pillarVariants}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <h4 className="text-slate-900 font-bold text-sm">Certified Engineers</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Accredited specialists for HP, Dell, Cisco, and Microsoft Windows Server environments.
                </p>
              </motion.div>

              <motion.div
                variants={pillarVariants}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <h4 className="text-slate-900 font-bold text-sm">100% OEM Genuine</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct authorized supply chain with genuine parts, OEM warranties, and official corporate invoicing.
                </p>
              </motion.div>

              <motion.div
                variants={pillarVariants}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <h4 className="text-slate-900 font-bold text-sm">15-Min Response SLA</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Guaranteed ticket escalation and same-day on-site engineer dispatch across Delhi NCR.
                </p>
              </motion.div>

              <motion.div
                variants={pillarVariants}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <FileCheck className="w-4 h-4 text-teal-600 shrink-0" />
                  <h4 className="text-slate-900 font-bold text-sm">Enterprise Invoicing</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fully verified corporate tax invoicing for seamless commercial procurement and input credits.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Office Hub Visual Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                  NP
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">
                    Nehru Place Sales &amp; Technical Hub
                  </h4>
                  <p className="text-xs text-blue-600 font-semibold">
                    1218 Hemkunt Chamber, 89 Nehru Place, New Delhi
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Our central operational hub houses our commercial hardware warehouse, chip-level motherboard testing lab, and fast-dispatch rental fleet ready for same-day delivery to Gurgaon, Noida, Okhla, and Delhi.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-white border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">
                    Direct Sales Phone
                  </div>
                  <a
                    href="tel:+919643537006"
                    className="font-bold text-blue-600 hover:text-blue-700 text-sm mt-0.5 block"
                  >
                    +91 96435 37006
                  </a>
                </div>
                <div className="p-3 rounded-lg bg-white border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">
                    Central Landline
                  </div>
                  <a
                    href="tel:01141777006"
                    className="font-bold text-slate-800 hover:text-blue-600 text-sm mt-0.5 block"
                  >
                    011 41777006
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-blue-900">
                    Faridabad Registered Headquarters
                  </div>
                  <div className="text-[11px] text-blue-700">
                    F-1, SGM Nagar, Near Patel Chowk, Faridabad - 121001
                  </div>
                </div>
                <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
