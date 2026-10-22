import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  X,
  FileText,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { CompanyInfo, NavItem } from '@/types';

export interface FooterProps {
  companyData: CompanyInfo;
  items: NavItem[];
}

type PolicyType = 'privacy' | 'terms' | 'sla' | null;

interface PolicyContent {
  title: string;
  badge: string;
  lastUpdated: string;
  sections: { heading: string; body: string }[];
}

const POLICIES: Record<'privacy' | 'terms' | 'sla', PolicyContent> = {
  privacy: {
    title: 'Enterprise Privacy Policy',
    badge: 'LEGAL & DATA PROTECTION',
    lastUpdated: 'January 2026',
    sections: [
      {
        heading: '1. Commitment to Enterprise Confidentiality',
        body: 'First Step Solutions is committed to safeguarding client data and intellectual property. In providing enterprise IT infrastructure, hardware procurement, and Annual Maintenance Contracts (AMC), we adhere strictly to non-disclosure obligations, the Information Technology Act 2000, and the Digital Personal Data Protection (DPDP) Act 2023.',
      },
      {
        heading: '2. Telemetry and Operational Data Collection',
        body: 'We collect only technical parameters required for infrastructure monitoring, network diagnostics, and customer support ticket handling. We do not sell, license, or share proprietary customer network topologies, credentials, or audit logs with any third parties.',
      },
      {
        heading: '3. Data Security & Encryption Standards',
        body: 'All client communications and system metrics are encrypted in transit using TLS 1.3 and at rest with AES-256 encryption. Our engineers operate under strict multi-factor authentication protocols and zero-trust administrative boundaries.',
      },
    ],
  },
  terms: {
    title: 'Enterprise Terms of Service',
    badge: 'CONTRACTUAL GOVERNANCE',
    lastUpdated: 'January 2026',
    sections: [
      {
        heading: '1. Service Scope & Professional Engagements',
        body: 'First Step Solutions provides turnkey IT solutions including networking deployment, commercial hardware procurement, equipment leasing, and Annual Maintenance Contracts (AMC) under explicitly executed Statements of Work (SOW) and service agreements.',
      },
      {
        heading: '2. OEM Hardware Procurement & Spares',
        body: 'All hardware equipment procured through First Step Solutions (HP, Dell Technologies, Cisco, Lenovo) consists of 100% genuine OEM products backed by official manufacturer warranties and authorized commercial distribution channels.',
      },
      {
        heading: '3. Payment & Commercial Terms',
        body: 'Invoices are issued under official corporate registration. Payment terms are subject to master service agreements, with standard corporate net terms following verified hardware delivery and sign-off.',
      },
    ],
  },
  sla: {
    title: 'Service Level Agreement (SLA) Guarantees',
    badge: 'OPERATIONAL RELIABILITY',
    lastUpdated: 'January 2026',
    sections: [
      {
        heading: '1. 99.99% Network & Infrastructure Uptime Target',
        body: 'Our managed network architecture, SD-WAN failover clusters, and data center virtualization deployments are engineered to target 99.99% operational availability for production enterprise workloads.',
      },
      {
        heading: '2. Incident Response Tiers & Guarantees',
        body: 'Severity 1 (Critical Outage): Immediate engineer assignment and initial triage within 15 minutes. Severity 2 (Degraded Operations): < 1 hour response. Severity 3 (Standard Inquiry / Request): < 4 hours response.',
      },
      {
        heading: '3. On-Site Field Dispatch SLA (Delhi NCR)',
        body: 'For hardware failures and critical link disruptions requiring on-site presence, certified field engineers are dispatched from our Nehru Place commercial hub or Faridabad headquarters with rapid on-site arrival.',
      },
    ],
  },
};

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/first-step-solutions',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74V9.93H5.06v8.57h2.8z" />
      </svg>
    ),
  },
  {
    name: 'Twitter/X',
    href: 'https://twitter.com/firststepit',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/firststepitsolutions',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@firststepitsolutions',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const SERVICE_LINKS = [
  { name: 'Commercial Hardware Sales', href: '#products' },
  { name: 'Corporate Laptops on Rent', href: '#rentals' },
  { name: 'Annual Maintenance (AMC)', href: '#services' },
  { name: 'Chip-Level Motherboard Repair', href: '#services' },
  { name: 'Office Network Cabling & Wi-Fi', href: '#services' },
  { name: 'Bulk Procurement & Upgrades', href: '#contact' },
];

export const Footer: React.FC<FooterProps> = ({ companyData, items }) => {
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  const openPolicy = (policy: PolicyType) => {
    setActivePolicy(policy);
  };

  const closePolicy = () => {
    setActivePolicy(null);
  };

  React.useEffect(() => {
    if (!activePolicy) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePolicy();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activePolicy]);

  return (
    <footer id="site-footer" className="bg-[#0a1e3f] border-t border-slate-800 pt-16 pb-12 text-slate-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">
          {/* Col 1: Identity & Brand (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-sky-600 flex items-center justify-center shadow-md">
                <span className="font-extrabold text-white text-lg tracking-tight">FS</span>
              </div>
              <div>
                <span className="font-extrabold text-white tracking-tight block text-base">
                  First Step Solutions
                </span>
                <span className="text-[10px] text-sky-400 font-bold tracking-wider block uppercase">
                  Authorized HP Commercial Partner
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Delivering reliable, genuine commercial IT hardware, corporate equipment rental, and 24/7 SLA maintenance contracts across Delhi NCR since {companyData.foundingYear}. Dual hubs in Nehru Place and Faridabad.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-900/40 border border-blue-700/50 text-xs font-semibold text-sky-300">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>100% Genuine OEM Warranty Certified</span>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="block text-[11px] uppercase tracking-wider text-slate-400 mb-2.5 font-semibold">
                Connect on Social Channels
              </span>
              <div className="flex items-center gap-2.5">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-sky-400/50 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Quick Navigation & Services (3 cols on lg) */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs">
                {items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="hover:text-sky-400 transition-colors flex items-center gap-1.5 text-slate-300"
                    >
                      <ArrowRight className="w-3 h-3 text-slate-500" />
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Commercial Hardware &amp; Services
              </h4>
              <ul className="space-y-1.5 text-xs">
                {SERVICE_LINKS.map((srv) => (
                  <li key={srv.name}>
                    <a
                      href={srv.href}
                      className="hover:text-sky-300 transition-colors text-slate-300"
                    >
                      {srv.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 3: Registered Office (Faridabad) (2.5 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              {companyData.registeredOffice.title}
            </h4>

            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{companyData.registeredOffice.address}</p>
            </div>

            <div className="text-xs text-slate-400">
              <span>Business Hours: </span>
              <span className="font-semibold text-white">Mon - Sat, 10:00 AM - 7:30 PM</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-sky-400 shrink-0" />
              <div className="flex flex-col">
                {companyData.registeredOffice.contacts.map((contact) => (
                  <a
                    key={contact}
                    href={`tel:${contact.replace(/\s+/g, '')}`}
                    className="hover:text-white font-medium transition-colors"
                  >
                    {contact}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <div className="flex flex-col">
                {companyData.registeredOffice.emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="hover:text-white transition-colors truncate"
                  >
                    {email}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 4: Commercial Branch (Nehru Place, Delhi) (2.5 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              {companyData.branchOffice.title}
            </h4>

            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{companyData.branchOffice.address}</p>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-sky-400 shrink-0" />
              <div className="flex flex-col">
                {companyData.branchOffice.landline && (
                  <a
                    href={`tel:${companyData.branchOffice.landline.replace(/\s+/g, '')}`}
                    className="hover:text-white transition-colors font-bold text-white"
                  >
                    Landline: {companyData.branchOffice.landline}
                  </a>
                )}
                {companyData.branchOffice.contacts.map((contact) => (
                  <a
                    key={contact}
                    href={`tel:${contact.replace(/\s+/g, '')}`}
                    className="hover:text-white transition-colors"
                  >
                    {contact}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <div className="flex flex-col">
                {companyData.branchOffice.emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="hover:text-white transition-colors truncate"
                  >
                    {email}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{companyData.supportHours.split('|')[0].trim()}</span>
            </div>
          </div>
        </div>

        {/* Legal & Policy Modals Links */}
        <div className="pt-6 pb-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => openPolicy('privacy')}
              className="text-slate-300 hover:text-white transition-colors underline-offset-4 hover:underline cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span>Privacy Policy</span>
            </button>
            <span className="text-slate-600">&bull;</span>
            <button
              type="button"
              onClick={() => openPolicy('terms')}
              className="text-slate-300 hover:text-white transition-colors underline-offset-4 hover:underline cursor-pointer flex items-center gap-1.5"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Terms of Service</span>
            </button>
            <span className="text-slate-600">&bull;</span>
            <button
              type="button"
              onClick={() => openPolicy('sla')}
              className="text-slate-300 hover:text-white transition-colors underline-offset-4 hover:underline cursor-pointer flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>SLA Guarantees</span>
            </button>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span>Corporate Registration: Haryana &amp; Delhi NCR</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; {companyData.foundingYear} - 2026 {companyData.name}. All rights reserved.</p>
          <p className="text-slate-400">
            Authorized HP Commercial Partner &bull; Enterprise IT Hardware &bull; Rentals &bull; AMC Support.
          </p>
        </div>
      </div>

      {/* Accessible Policy Modal Dialog */}
      <AnimatePresence>
        {activePolicy && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="policy-dialog-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm"
            onClick={closePolicy}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto text-slate-900"
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold uppercase tracking-wider mb-2">
                    {POLICIES[activePolicy].badge}
                  </div>
                  <h3 id="policy-dialog-title" className="text-xl sm:text-2xl font-bold text-slate-900">
                    {POLICIES[activePolicy].title}
                  </h3>
                  <span className="text-xs text-slate-500">
                    Last Revised: {POLICIES[activePolicy].lastUpdated} &bull; First Step Solutions
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closePolicy}
                  aria-label="Close dialog"
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-6 text-sm text-slate-700">
                {POLICIES[activePolicy].sections.map((sec) => (
                  <div key={sec.heading} className="space-y-2">
                    <h4 className="text-slate-900 font-bold text-base flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      {sec.heading}
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-sm">{sec.body}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>First Step Solutions &bull; Delhi NCR</span>
                <button
                  type="button"
                  onClick={closePolicy}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all cursor-pointer"
                >
                  Close Document
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
