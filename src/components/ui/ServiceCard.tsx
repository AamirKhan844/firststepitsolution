import React from 'react';
import {
  Network,
  Cloud,
  ShieldCheck,
  Server,
  Wrench,
  Bot,
  Laptop,
  Cpu,
  ArrowRight,
  CheckCircle2,
  LucideIcon,
} from 'lucide-react';
import { ServiceItem } from '@/types';

export interface ServiceCardProps {
  service: ServiceItem;
  index?: number;
}

const iconMap: Record<string, LucideIcon> = {
  Network,
  Cloud,
  ShieldCheck,
  Server,
  Wrench,
  Bot,
  Laptop,
  Cpu,
};

const badgeStyles: Record<string, string> = {
  'Hardware Sales': 'bg-blue-50 text-blue-700 border-blue-200',
  'Rental Services': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Corporate AMC': 'bg-amber-50 text-amber-700 border-amber-200',
  'Repair & Spares': 'bg-purple-50 text-purple-700 border-purple-200',
  'Networking': 'bg-teal-50 text-teal-700 border-teal-200',
  'IT Services': 'bg-sky-50 text-sky-700 border-sky-200',
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index = 0 }) => {
  const IconComponent = iconMap[service.iconName] || Server;
  const badgeStyle = (service.badge && badgeStyles[service.badge]) || 'bg-blue-50 text-blue-700 border-blue-200';

  return (
    <div
      data-index={index}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-200 p-6 sm:p-7 flex flex-col justify-between group"
    >
      <div>
        {/* Top Icon & Badge */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
            <IconComponent className="w-6 h-6" />
          </div>

          {service.badge && (
            <span className={`inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full border ${badgeStyle}`}>
              {service.badge}
            </span>
          )}
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
          {service.title}
        </h3>
        <p className="text-xs text-blue-600 font-semibold mb-3">
          {service.subtitle}
        </p>

        {/* Description */}
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Features */}
        <div className="space-y-2 pt-4 border-t border-slate-100 mb-5">
          {service.features.map((feature, fIdx) => (
            <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-snug">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action */}
      <div className="pt-4 border-t border-slate-100 mt-auto">
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-700 group-hover:gap-2 transition-all cursor-pointer"
        >
          <span>Enquire About This Service</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
