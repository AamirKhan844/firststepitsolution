import React from 'react';
import { Users, Award, Headphones, Briefcase, LucideIcon } from 'lucide-react';
import { statsData } from '@/data/statsData';
import { StatCounter } from '@/components/ui/StatCounter';

export interface StatsSectionProps {
  id?: string;
}

const statIcons: Record<string, LucideIcon> = {
  clients: Users,
  experience: Award,
  support: Headphones,
  projects: Briefcase,
};

export const StatsSection: React.FC<StatsSectionProps> = ({ id = 'stats' }) => {
  return (
    <section
      id={id}
      className="py-20 border-y border-blue-900/50 relative overflow-hidden bg-[#0a1e3f] scroll-mt-20 sm:scroll-mt-28 lg:scroll-mt-36"
    >
      <div className="section-wrap relative z-10">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold tracking-wide mb-3">
            <span>TRACK RECORD ACROSS DELHI NCR</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Scale, Speed &amp; 15+ Years of Corporate Execution
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
            Supporting critical infrastructure for enterprises, BPOs, and government organizations with committed SLAs and authorized OEM hardware.
          </p>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {statsData.map((stat, index) => {
            const Icon = statIcons[stat.id] || Users;
            return (
              <StatCounter
                key={stat.id}
                stat={stat}
                icon={Icon}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
