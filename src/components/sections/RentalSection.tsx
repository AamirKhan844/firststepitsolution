import React, { useState } from 'react';
import {
  Laptop,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  RotateCcw,
  Server,
  Monitor,
  BadgePercent,
} from 'lucide-react';
import { Button } from '@/components/ui';

export interface RentalSectionProps {
  id?: string;
  onSelectRental?: (planTitle: string) => void;
}

const RENTAL_TIERS = [
  {
    id: 'tier-i5',
    title: 'Core i5 Business Laptops',
    category: 'Corporate Fleet & BPOs',
    specs: 'Intel Core i5 11th–13th Gen • 16GB DDR4/DDR5 • 512GB SSD',
    monthlyPrice: '₹1,499',
    period: '/ month / unit',
    idealFor: 'Daily operations, sales teams, customer support & remote staff',
    features: [
      'Genuine Windows 11 Pro 64-bit OS pre-installed',
      'Free 2-hour standby replacement on hardware issues',
      'Includes laptop bag, original charger & wireless mouse',
      'Doorstep delivery & batch configuration across NCR',
    ],
    popular: false,
    icon: Laptop,
  },
  {
    id: 'tier-i7',
    title: 'Core i7 / Ultra AI Laptops',
    category: 'Executive & Developer Class',
    specs: 'Intel Core Ultra 7 / i7 13th Gen • 32GB DDR5 • 1TB NVMe',
    monthlyPrice: '₹2,200',
    period: '/ month / unit',
    idealFor: 'Software developers, financial analysts, management & power users',
    features: [
      'High-performance multi-threaded AI processing (NPU)',
      '14" or 15.6" Anti-Glare FHD IPS 400-nit displays',
      'HP Wolf Pro Security & BitLocker encryption support',
      'Free quarterly preventive maintenance & cleaning',
    ],
    popular: true,
    icon: Laptop,
  },
  {
    id: 'tier-workstation',
    title: 'Dedicated Workstations',
    category: 'CAD, 3D & Data Science',
    specs: 'Intel Core i9 / Xeon • 32GB–64GB ECC • NVIDIA RTX GPU',
    monthlyPrice: '₹3,500',
    period: '/ month / unit',
    idealFor: 'AutoCAD, SolidWorks, Revit, video rendering & AI model training',
    features: [
      'Certified ISV hardware for Adobe, Autodesk & Dassault',
      'Dual/Quad 4K display connectivity & Thunderbolt 4',
      'Enterprise ECC memory for zero crash calculation stability',
      'Custom GPU & storage expansion as per project requirements',
    ],
    popular: false,
    icon: Monitor,
  },
  {
    id: 'tier-server',
    title: 'Dell PowerEdge Servers',
    category: 'Data Center & Virtualization',
    specs: 'Dual Intel Xeon Scalable • 64GB–128GB RAM • Hardware RAID',
    monthlyPrice: '₹6,500',
    period: '/ month / unit',
    idealFor: 'ERP hosting, SQL database, VMware ESXi & file server backup',
    features: [
      'Dual hot-plug redundant power supplies (800W Titanium)',
      'iDRAC9 Enterprise remote console management included',
      'Configured with RAID-1/5/10 enterprise SAS drives',
      'Guaranteed 4-hour on-site engineer response SLA',
    ],
    popular: false,
    icon: Server,
  },
];

const RENTAL_BENEFITS = [
  {
    title: 'Zero Capital Expenditure',
    description: 'Keep your capital free for core business expansion. 100% Tax-deductible as operating expense (OpEx).',
    icon: BadgePercent,
  },
  {
    title: '2-Hour Standby Replacement',
    description: 'If any machine develops a fault, our Nehru Place engineers replace it with an identical standby unit.',
    icon: RotateCcw,
  },
  {
    title: 'Custom OS & Domain Imaging',
    description: 'Pre-loaded with your company image, antivirus, VPN, and corporate software stack before delivery.',
    icon: Zap,
  },
  {
    title: 'Flexible Contract Terms',
    description: 'Scale up from 5 to 200+ units during project ramp-up, and return units without heavy penalties.',
    icon: Shield,
  },
];

export const RentalSection: React.FC<RentalSectionProps> = ({
  id = 'rentals',
  onSelectRental,
}) => {
  const [duration, setDuration] = useState<'monthly' | 'quarterly' | 'annual'>('annual');

  const handleRentClick = (title: string) => {
    if (onSelectRental) {
      onSelectRental(`Rent IT Equipment: ${title}`);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id={id} className="py-24 bg-white relative overflow-hidden border-t border-slate-200 scroll-mt-20 sm:scroll-mt-28 lg:scroll-mt-36">
      <div className="section-wrap relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>FLEXIBLE CORPORATE IT LEASING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Rent Laptops, Desktops &amp; Workstations Without Heavy Capex
          </h2>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Equip your growing team, call centers, remote employees, or project-based staff with Tier-1 enterprise hardware. Zero upfront security deposit for registered companies and guaranteed 2-hour standby replacement across Delhi NCR.
          </p>

          {/* Duration Switcher */}
          <div
            role="group"
            aria-label="Rental Plan Durations"
            className="inline-flex items-center gap-1 p-1 mt-6 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold"
          >
            <button
              type="button"
              role="radio"
              aria-checked={duration === 'monthly'}
              onClick={() => setDuration('monthly')}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                duration === 'monthly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1 to 3 Months
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={duration === 'quarterly'}
              onClick={() => setDuration('quarterly')}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                duration === 'quarterly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3 to 11 Months
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={duration === 'annual'}
              onClick={() => setDuration('annual')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                duration === 'annual'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>12+ Months</span>
              <span className="text-[10px] bg-emerald-400 text-emerald-950 px-1.5 py-0.2 rounded-full">
                Best Rate
              </span>
            </button>
          </div>
        </div>

        {/* 4 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {RENTAL_BENEFITS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* 4 Rental Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {RENTAL_TIERS.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 relative ${
                  tier.popular
                    ? 'bg-white border-2 border-blue-600 shadow-xl scale-[1.02]'
                    : 'bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                      Most Popular For Teams
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-blue-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                      {tier.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {tier.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">{tier.idealFor}</p>

                  {/* Price */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-5">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">
                      Starting Corporate Rate
                    </div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-2xl font-extrabold text-slate-900">
                        {tier.monthlyPrice}
                      </span>
                      <span className="text-xs text-slate-500">{tier.period}</span>
                    </div>
                  </div>

                  {/* Spec Highlight */}
                  <div className="text-xs font-semibold text-blue-700 bg-blue-50 p-2.5 rounded-lg mb-4">
                    {tier.specs}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6 text-xs text-slate-600">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <Button
                    type="button"
                    variant={tier.popular ? 'primary' : 'secondary'}
                    size="md"
                    fullWidth
                    onClick={() => handleRentClick(tier.title)}
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                    iconPosition="right"
                    className="py-3 text-xs"
                  >
                    Request Rental Contract
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4-Step Onboarding Process Flow */}
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-slate-900">
              How Corporate IT Rental Works at First Step Solutions
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              From contract agreement to doorstep deployment within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Share Requirements',
                desc: 'Select hardware configuration, required quantity (1 to 200+ units), and rental duration.',
              },
              {
                step: '02',
                title: 'Corporate Onboarding',
                desc: 'Simple corporate verification with zero upfront security deposit for registered enterprises.',
              },
              {
                step: '03',
                title: '24-Hour Deployment',
                desc: 'Hardware is imaged with your corporate OS stack and delivered to your office doorstep.',
              },
              {
                step: '04',
                title: '24/7 AMC & Standby',
                desc: 'Enjoy complete peace of mind with our 2-hour standby hardware replacement guarantee.',
              },
            ].map((step, idx) => (
              <div key={idx} className="relative space-y-2">
                <span className="text-3xl font-extrabold text-blue-200">
                  {step.step}
                </span>
                <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalSection;
