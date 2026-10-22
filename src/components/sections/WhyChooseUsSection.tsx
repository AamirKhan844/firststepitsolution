import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Clock,
  Wrench,
  MapPin,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export interface WhyChooseUsSectionProps {
  id?: string;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ id = 'why-us' }) => {
  const pillars = [
    {
      icon: Award,
      title: 'Authorized OEM Commercial Partner',
      subtitle: '100% Genuine Hardware & Direct Support',
      description:
        'Direct distribution partnerships with HP, Dell, and Lenovo. All laptops, desktops, workstations, and servers come sealed with authentic manufacturer warranty, official corporate invoice, and direct OEM brand support.',
      bullets: [
        'Direct OEM commercial supply lines',
        'Official manufacturer warranty cards',
        'No refurbished or grey-market parts',
      ],
    },
    {
      icon: Clock,
      title: '15-Minute Emergency SLA',
      subtitle: 'Committed Corporate Turnaround',
      description:
        'Hardware downtime costs money. Every corporate AMC customer receives guaranteed 15-minute triage and rapid on-site engineer arrival across Delhi NCR to keep your team fully operational.',
      bullets: [
        '24/7 dedicated engineering helpdesk',
        'Tier-3 hardware engineer escalation',
        'Rapid standby machine swap policy',
      ],
    },
    {
      icon: Wrench,
      title: 'Chip-Level Engineering Lab',
      subtitle: 'Nehru Place BGA Rework Facility',
      description:
        'Single-vendor accountability. From initial bulk laptop procurement and customized software imaging to 24/7 AMC and Nehru Place chip-level motherboard repair.',
      bullets: [
        'Custom OS & enterprise imaging',
        'Nehru Place BGA rework laboratory',
        'Original OEM spare parts stock',
      ],
    },
    {
      icon: MapPin,
      title: 'Strategic Delhi NCR Hubs',
      subtitle: 'Nehru Place & Faridabad Base',
      description:
        'Strategically situated in Nehru Place (South Delhi commercial IT hub) and Faridabad (Haryana industrial corridor), ensuring same-day dispatch and physical support coverage.',
      bullets: [
        'Same-day delivery across Delhi NCR',
        'On-site setup in Gurgaon, Noida, Okhla',
        'Direct walk-in service in Nehru Place',
      ],
    },
  ];

  return (
    <section id={id} className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden scroll-mt-20 sm:scroll-mt-28 lg:scroll-mt-36">
      <div className="section-wrap relative z-10">
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>THE FIRST STEP ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built for Businesses That Require Zero Hardware Downtime
          </h2>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Why 500+ corporate offices, IT startups, BPOs, and legal firms across Delhi NCR count on us as their single-source technology partner.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-200 p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-blue-600 font-semibold mb-3">
                    {pillar.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {pillar.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100">
                  {pillar.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
