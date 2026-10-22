import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  Clock,
  Compass,
  FileCheck,
} from 'lucide-react';
import { companyData } from '@/data/companyData';
import { ContactForm } from '@/components/ui/ContactForm';

export interface ContactSectionProps {
  id?: string;
  className?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  id = 'contact',
  className = '',
}) => {
  return (
    <section
      id={id}
      className={`py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden scroll-mt-20 sm:scroll-mt-28 lg:scroll-mt-36 ${className}`}
    >
      <div className="section-wrap relative z-10">
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>CONNECT WITH OUR SALES &amp; SERVICE HUBS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Get in Touch &amp; Request a Same-Day Corporate Quotation
          </h2>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Visit our commercial tech office in Nehru Place, South Delhi or our registered headquarters in Faridabad. Or submit your requirements below for a callback within 15 minutes.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-14">
          {/* Left Column: Dual Office Cards (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* 1. Nehru Place Commercial Branch Office Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 relative group hover:border-blue-400 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
                  COMMERCIAL SALES &amp; SERVICE HUB
                </span>
                <span className="text-[11px] font-bold text-slate-500">South Delhi</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Nehru Place Office
              </h3>

              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">
                    {companyData.branchOffice.address}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-semibold">Desk Landline:</span>
                  <a
                    href={`tel:${(companyData.branchOffice.landline || '').replace(/\s+/g, '')}`}
                    className="font-bold text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    {companyData.branchOffice.landline}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <div className="flex flex-wrap items-center gap-1.5 font-medium">
                    <span className="text-slate-500">Mobiles:</span>
                    {companyData.branchOffice.contacts.map((contact, idx) => (
                      <React.Fragment key={contact}>
                        <a
                          href={`tel:${contact.replace(/\s+/g, '')}`}
                          className="text-slate-900 hover:text-blue-600 transition-colors font-bold"
                        >
                          {contact}
                        </a>
                        {idx < companyData.branchOffice.contacts.length - 1 && (
                          <span className="text-slate-400">/</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <div className="flex flex-wrap items-center gap-1.5 font-medium">
                    <span className="text-slate-500">Emails:</span>
                    {companyData.branchOffice.emails.map((email, idx) => (
                      <React.Fragment key={email}>
                        <a
                          href={`mailto:${email}`}
                          className="text-blue-600 hover:underline font-semibold"
                        >
                          {email}
                        </a>
                        {idx < companyData.branchOffice.emails.length - 1 && (
                          <span className="text-slate-400">/</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-slate-500 pt-2 border-t border-slate-100">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Mon–Sat: 9:30 AM – 7:30 PM &bull; Emergency 24/7 SLA</span>
                </div>
              </div>
            </div>

            {/* 2. Faridabad Registered Office Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 relative group hover:border-blue-400 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  REGISTERED HEADQUARTERS
                </span>
                <span className="text-[11px] font-bold text-slate-500">Haryana</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Faridabad Registered Office
              </h3>

              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">
                    {companyData.registeredOffice.address}
                  </p>
                </div>

                {/* Coverage badge */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                    Support Coverage:
                  </span>
                  <span className="font-semibold text-xs text-slate-900">
                    Delhi NCR &bull; Same-Day On-Site
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="flex flex-wrap items-center gap-1.5 font-medium">
                    <span className="text-slate-500">Direct Contact:</span>
                    {companyData.registeredOffice.contacts.map((contact, idx) => (
                      <React.Fragment key={contact}>
                        <a
                          href={`tel:${contact.replace(/\s+/g, '')}`}
                          className="text-slate-900 hover:text-emerald-600 transition-colors font-bold"
                        >
                          {contact}
                        </a>
                        {idx < companyData.registeredOffice.contacts.length - 1 && (
                          <span className="text-slate-400">/</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="flex flex-wrap items-center gap-1.5 font-medium">
                    <span className="text-slate-500">Emails:</span>
                    {companyData.registeredOffice.emails.map((email, idx) => (
                      <React.Fragment key={email}>
                        <a
                          href={`mailto:${email}`}
                          className="text-blue-600 hover:underline font-semibold"
                        >
                          {email}
                        </a>
                        {idx < companyData.registeredOffice.emails.length - 1 && (
                          <span className="text-slate-400">/</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Quote Request Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                Request a Quick B2B Quote
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Fill out the form below. Our Nehru Place team responds with official pricing and availability within 15 minutes.
              </p>
            </div>

            <ContactForm />
          </motion.div>
        </div>

        {/* Embedded Google Map: Nehru Place Hemkunt Chamber */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
          <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-800">
                Location Map: Building No 89, 1218 Hemkunt Chamber, Nehru Place, South Delhi - 110019
              </span>
            </div>
            <a
              href="https://maps.google.com/?q=Hemkunt+Chamber+Nehru+Place+New+Delhi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              Open in Google Maps &rarr;
            </a>
          </div>
          <iframe
            title="First Step Solutions Nehru Place Office Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.606708605553!2d77.25055137549791!3d28.55152897570889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3c415555555%3A0x63351659972b2203!2sHemkunt%20Chamber%2C%20Nehru%20Place%2C%20New%20Delhi%2C%20Delhi%20110019!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
