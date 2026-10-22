import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Phone,
  ChevronDown,
  ChevronRight,
  Search,
  MapPin,
  Clock,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { CompanyInfo, NavItem } from '@/types';
import { productCategoryMenus, directNavLinks } from '@/data/companyData';

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  companyData: CompanyInfo;
  items?: NavItem[];
  activeSection?: string;
  onSelectCategory?: (category: string, subcategory?: string) => void;
  onSearch?: (query: string) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  companyData,
  onSelectCategory,
  onSearch,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    laptops: true,
  });
  const [searchInput, setSearchInput] = useState<string>('');
  const isNavigatingRef = useRef<boolean>(false);

  // Lock body scroll and attach Escape key listener when mobile drawer is open
  useEffect(() => {
    if (!isOpen) {
      isNavigatingRef.current = false;
      return;
    }

    isNavigatingRef.current = false;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const toggleCategory = (catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const handleLinkClick = (href: string) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    document.body.style.overflow = '';
    onClose();
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const handleSubcategorySelect = (categoryKey: string, subcategoryName: string) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    document.body.style.overflow = '';
    setSearchInput('');
    onClose();
    if (onSelectCategory) {
      onSelectCategory(categoryKey, subcategoryName);
    }
    setTimeout(() => {
      const element = document.getElementById('products');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const handleCategoryHeaderSelect = (categoryKey: string) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    document.body.style.overflow = '';
    setSearchInput('');
    onClose();
    if (onSelectCategory) {
      onSelectCategory(categoryKey, '');
    }
    setTimeout(() => {
      const element = document.getElementById('products');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    document.body.style.overflow = '';
    onClose();
    if (onSearch) {
      onSearch(searchInput);
    }
    setTimeout(() => {
      const element = document.getElementById('products');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[88%] max-w-sm bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between lg:hidden overflow-hidden"
          >
            {/* Top Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#002d62] via-[#004b99] to-[#0066cc] flex items-center justify-center shadow-md">
                  <span className="font-extrabold text-white text-sm tracking-tight">FS</span>
                </div>
                <div>
                  <span className="text-sm font-extrabold text-slate-900 block leading-tight">
                    First Step Solutions
                  </span>
                  <span className="text-[10px] text-blue-700 font-bold uppercase tracking-wider block">
                    HP Commercial Partner
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Menu Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
              {/* Mobile Search Form */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search HP laptops, servers, parts..."
                  className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-300 bg-slate-50 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </form>

              {/* Product Categories Accordion (Mandated 6 Categories from R1) */}
              <div>
                <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 px-1">
                  Product Categories
                </div>

                <div className="space-y-1.5 border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                  {productCategoryMenus.map((cat) => {
                    const isExpanded = !!expandedCategories[cat.id];

                    return (
                      <div key={cat.id} className="bg-white">
                        <div className="flex items-center justify-between p-3 hover:bg-slate-50 transition-colors">
                          <button
                            type="button"
                            onClick={() => handleCategoryHeaderSelect(cat.categoryKey)}
                            className="text-xs font-bold text-slate-800 text-left flex-1 hover:text-blue-600 transition-colors"
                          >
                            {cat.name}
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleCategory(cat.id)}
                            className="p-1 rounded text-slate-400 hover:text-slate-700"
                            aria-label={`Toggle ${cat.name} subcategories`}
                            aria-expanded={isExpanded}
                            aria-controls={`subcategories-${cat.id}`}
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {/* Subcategory List */}
                        {isExpanded && (
                          <div
                            id={`subcategories-${cat.id}`}
                            className="bg-slate-50/80 px-3 py-2 space-y-1 border-t border-slate-100"
                          >
                            {cat.subcategories.map((sub) => (
                              <button
                                key={sub.name}
                                type="button"
                                onClick={() => handleSubcategorySelect(cat.categoryKey, sub.name)}
                                className="w-full text-left py-2 px-2.5 rounded-lg text-xs font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors flex items-center justify-between"
                              >
                                <span>{sub.name}</span>
                                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Direct Nav Links */}
              <div>
                <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 px-1">
                  Quick Navigation
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {directNavLinks.map((link) => (
                    <button
                      key={link.name}
                      type="button"
                      onClick={() => handleLinkClick(link.href)}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-700 hover:bg-blue-50/70 border border-transparent hover:border-blue-100 transition-colors flex items-center justify-between"
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Dual Office Details */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-[11px] text-slate-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Nehru Place Office:</strong> Hemkunt Chamber, South Delhi
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Faridabad HQ:</strong> SGM Nagar, Haryana
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-slate-200 text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{companyData.supportHours}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-2.5">
              <button
                type="button"
                onClick={() => handleLinkClick('#contact')}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Request B2B Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <a
                  href="tel:+919643537006"
                  className="py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold hover:border-blue-400 hover:text-blue-600 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Call Desk</span>
                </a>
                <a
                  href="https://wa.me/919643537006?text=Hello%20First%20Step%20Solutions,%20I%20am%20interested%20in%20IT%20Hardware%20/%20Rentals%20/%20AMC."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold hover:bg-emerald-100 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;
