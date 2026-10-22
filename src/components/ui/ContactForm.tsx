import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  CheckCircle2,
  User,
  Mail,
  Phone,
  Layers,
  MessageSquare,
  RefreshCw,
} from 'lucide-react';
import { ContactFormData } from '@/types';
import { Button } from './Button';
import { Input } from './Input';

export interface ContactFormProps {
  className?: string;
  onSuccess?: (data: ContactFormData) => void;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

export const IT_SERVICE_OPTIONS = [
  'Buy IT Hardware (HP ProBook, Dell Desktops, Servers, Printers)',
  'Rent IT Equipment (Laptops, PCs, Workstations on Flexible Rent)',
  'Annual Maintenance Contract (Comprehensive / Non-Comprehensive AMC)',
  'Chip-Level Motherboard Repair (Nehru Place Lab)',
  'Networking Solutions & Structured Cabling',
  'Cloud & Server Migration',
  'Data Center Management',
  'Bulk Corporate Procurement (10+ Units)',
  'Other Corporate IT Inquiry',
] as const;

export const validateContactFormFields = (
  formData: Partial<ContactFormData>
): { isValid: boolean; errors: Partial<Record<keyof ContactFormData, string>> } => {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};
  const { name, email, phone, service, message } = formData;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Full Name is required (minimum 2 characters)';
  }

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.email = 'A valid email address is required (e.g. name@company.com)';
  }

  const digitCount = (phone || '').toString().replace(/\D/g, '').length;
  if (!phone || digitCount < 10) {
    errors.phone = 'Valid phone number required (minimum 10 digits)';
  }

  if (!service) {
    errors.service = 'Please select a service or hardware requirement';
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.message = 'Please provide details of your requirement (minimum 10 characters)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const ContactForm: React.FC<ContactFormProps> = ({
  className = '',
  onSuccess,
}) => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [submittedLead, setSubmittedLead] = useState<ContactFormData | null>(null);

  const handleBlur = (field: keyof ContactFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validation = validateContactFormFields(formData);
    setErrors(validation.errors);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name as keyof ContactFormData]) {
      const updated = { ...formData, [name]: value };
      const validation = validateContactFormFields(updated);
      setErrors(validation.errors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (isSubmitting) return;
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      phone: true,
      service: true,
      message: true,
    });

    const validation = validateContactFormFields(formData);
    setErrors(validation.errors);

    if (!validation.isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmittedLead(formData);
      setIsSuccess(true);
      if (onSuccess) {
        onSuccess(formData);
      }
    } catch {
      // Mock error catch
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSubmittedLead(null);
    setFormData(initialFormData);
    setTouched({});
    setErrors({});
  };

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success-banner"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600 shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-2xl font-bold text-slate-900">
                Inquiry Received Successfully!
              </h4>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you! Your requirements have reached our commercial desk in Nehru Place. An engineer will contact you with a formal quote within 15 minutes.
              </p>
            </div>

            {submittedLead && (
              <div className="p-4 rounded-xl bg-white border border-emerald-200 text-left text-xs space-y-1.5 text-slate-700 max-w-md mx-auto shadow-sm">
                <div className="text-emerald-700 font-bold mb-1">PROPOSAL SUMMARY:</div>
                <div><span className="text-slate-500 font-medium">Contact Person:</span> {submittedLead.name}</div>
                <div><span className="text-slate-500 font-medium">Official Email:</span> {submittedLead.email}</div>
                <div><span className="text-slate-500 font-medium">Phone Number:</span> {submittedLead.phone}</div>
                <div><span className="text-slate-500 font-medium">Requirement:</span> {submittedLead.service}</div>
              </div>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 hover:text-blue-600 hover:border-blue-400 font-semibold text-xs shadow-sm transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-blue-600" />
                <span>Submit Another Inquiry</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
          >
            {/* Row 1: Full Name & Official Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="name"
                name="name"
                type="text"
                label="Full Name"
                required
                disabled={isSubmitting}
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                placeholder="e.g. Rajesh Malhotra"
                error={touched.name && errors.name ? errors.name : undefined}
                icon={<User className="w-4 h-4 text-blue-600" />}
              />

              <Input
                id="email"
                name="email"
                type="email"
                label="Corporate Email"
                required
                disabled={isSubmitting}
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                placeholder="e.g. rajesh@company.com"
                error={touched.email && errors.email ? errors.email : undefined}
                icon={<Mail className="w-4 h-4 text-blue-600" />}
              />
            </div>

            {/* Row 2: Phone & Service Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="phone"
                name="phone"
                type="tel"
                label="Direct Phone / Mobile"
                required
                disabled={isSubmitting}
                value={formData.phone}
                onChange={handleChange}
                onBlur={() => handleBlur('phone')}
                placeholder="e.g. +91 98110 00000"
                error={touched.phone && errors.phone ? errors.phone : undefined}
                icon={<Phone className="w-4 h-4 text-blue-600" />}
              />

              <div className="space-y-1.5">
                <label
                  htmlFor="service"
                  className="block text-xs font-bold text-slate-700 tracking-wide flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    Requirement Category <span className="text-rose-500">*</span>
                  </span>
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  disabled={isSubmitting}
                  value={formData.service}
                  onChange={handleChange}
                  onBlur={() => handleBlur('service')}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-sm focus:outline-none focus:bg-white transition-all ${
                    touched.service && errors.service
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-slate-300 focus:border-blue-600'
                  }`}
                >
                  <option value="">-- Select Requirement --</option>
                  {IT_SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Requirement Details / Message */}
            <div className="space-y-1.5">
              <label
                htmlFor="message"
                className="block text-xs font-bold text-slate-700 tracking-wide flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                  Hardware Specs, Quantity &amp; Urgency <span className="text-rose-500">*</span>
                </span>
                {touched.message && errors.message && (
                  <span className="text-[11px] text-rose-500 font-medium">Min 10 chars</span>
                )}
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                required
                disabled={isSubmitting}
                value={formData.message}
                onChange={handleChange}
                onBlur={() => handleBlur('message')}
                placeholder="e.g. Need 25 HP ProBook laptops on 6-month rental for our Okhla branch, delivery required by Monday..."
                className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white transition-all resize-none ${
                  touched.message && errors.message
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-400/30'
                    : 'border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600/30'
                }`}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
                icon={<Send className="w-4 h-4" />}
                iconPosition="right"
                className="py-3.5 px-6 text-sm justify-center shadow-lg cursor-pointer"
              >
                Request Same-Day Proposal &amp; Pricing
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
