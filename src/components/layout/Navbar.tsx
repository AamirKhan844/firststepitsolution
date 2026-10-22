import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  Phone,
  Mail,
  MapPin,
  Clock,
  Search,
  X,
  ChevronDown,
  Home,
  ShieldCheck,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { CompanyInfo } from '@/types';
import { productCategoryMenus, directNavLinks } from '@/data/companyData';
import { MobileDrawer } from './MobileDrawer';

export interface NavbarProps {
  companyData: CompanyInfo;
  onSelectCategory?: (category: string, subcategory?: string) => void;
  onSearch?: (query: string) => void;
  activeCategory?: string;
  activeSubcategory?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  companyData,
  onSelectCategory,
  onSearch,
  activeCategory = 'all',
  activeSubcategory = '',
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!openDropdown) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
      }
    };
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [openDropdown]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownEnter = (id: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setOpenDropdown(id);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleSubcategoryClick = (categoryKey: string, subcategoryName: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setOpenDropdown(null);
    setSearchQuery('');
    if (onSelectCategory) {
      onSelectCategory(categoryKey, subcategoryName);
    }
    const productsEl = document.getElementById('products');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryHeaderClick = (categoryKey: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setOpenDropdown(null);
    setSearchQuery('');
    if (onSelectCategory) {
      onSelectCategory(categoryKey, '');
    }
    const productsEl = document.getElementById('products');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
    const productsEl = document.getElementById('products');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navigation-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
          isScrolled ? 'shadow-lg' : ''
        }`}
        role="banner"
      >
        {/* ========================================================= */}
        {/* 1. TOP UTILITY BAR (Graphline Pattern)                    */}
        {/* ========================================================= */}
        <div className="bg-[#0f172a] text-slate-300 text-[11px] font-medium border-b border-slate-800 hidden sm:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
            {/* Left: Dual Office Locations & Business Hours */}
            <div className="flex items-center gap-4 lg:gap-6">
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>
                  <strong className="text-white font-semibold">Nehru Place:</strong> Hemkunt Chamber
                  <span className="mx-1.5 text-slate-500">•</span>
                  <strong className="text-white font-semibold">Faridabad:</strong> SGM Nagar
                </span>
              </div>
              <div className="hidden md:flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  Hours: <strong className="text-slate-200 font-semibold">{companyData.supportHours.split('|')[0].trim()}</strong>
                </span>
              </div>
            </div>

            {/* Right: Contact Numbers & Email */}
            <div className="flex items-center gap-4 lg:gap-5">
              <a
                href="mailto:sales@firststepitsolutions.com"
                className="hidden lg:flex items-center gap-1.5 hover:text-white transition-colors"
                title="Send Corporate Email"
              >
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>sales@firststepitsolutions.com</span>
              </a>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 hidden xl:inline">Sales Desk:</span>
                <a
                  href="tel:+919643537006"
                  className="text-sky-300 hover:text-white font-bold flex items-center gap-1 transition-colors"
                >
                  <Phone className="w-3 h-3 text-sky-400" />
                  +91 96435 37006
                </a>
                <span className="text-slate-600">/</span>
                <a
                  href="tel:01141777006"
                  className="text-slate-300 hover:text-white font-semibold transition-colors"
                >
                  011 41777006
                </a>
              </div>

              <a
                href="https://wa.me/919643537006?text=Hello%20First%20Step%20Solutions,%20I%20am%20interested%20in%20HP%20Commercial%20Hardware%20/%20Rentals%20/%20AMC."
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors pl-1"
              >
                <MessageSquare className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. BRAND ROW (Graphline & Microworld Clean Corporate Style) */}
        {/* ========================================================= */}
        <div className="bg-white border-b border-slate-200 py-3 sm:py-3.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            {/* Left: Brand Identity & HP Partner Badge */}
            <div className="flex items-center gap-4 lg:gap-6 shrink-0">
              <a
                href="#hero"
                onClick={(e) => handleNavAnchorClick(e, '#hero')}
                className="flex items-center gap-3 group focus:outline-none"
                aria-label="First Step Solutions - Home"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#002d62] via-[#004b99] to-[#0066cc] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <span className="font-extrabold text-white text-lg tracking-tight">FS</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                      First Step Solutions
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium hidden sm:block">
                    Corporate IT Hardware Sales &bull; Rentals &bull; AMC
                  </span>
                </div>
              </a>

              {/* HP Partner Badge (Authentic Corporate Badge) */}
              <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-200">
                <div className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold tracking-wider uppercase text-blue-900 leading-tight">
                      Authorized Partner
                    </span>
                    <span className="text-[9px] font-bold text-blue-700 leading-tight">
                      HP Commercial
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: Interactive Product Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden lg:flex items-center flex-1 max-w-md mx-4 relative"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search HP ProBook, Dell servers, parts..."
                  className="w-full pl-9 pr-24 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-all"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      if (onSearch) onSearch('');
                    }}
                    className="absolute right-16 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-md transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Right: Quick Quote CTA & Mobile Hamburger */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <a
                href="#contact"
                onClick={(e) => handleNavAnchorClick(e, '#contact')}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all hover:shadow"
              >
                <span>Request B2B Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              {/* Hamburger Button (Mobile Drawer Trigger) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
                aria-label="Open mobile navigation menu"
                className="lg:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 focus:outline-none"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. CATEGORY MENU BAR (Graphline Deep Blue Nav Bar #002d62) */}
        {/* ========================================================= */}
        <nav
          ref={navRef}
          className="bg-[#002d62] text-white hidden lg:block border-t border-blue-900/40 relative shadow-md"
          aria-label="Category Navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Category Dropdown Items */}
              <div className="flex items-center space-x-0.5">
                {/* Home Icon Button */}
                <a
                  href="#hero"
                  onClick={(e) => handleNavAnchorClick(e, '#hero')}
                  className="px-3.5 py-3 hover:bg-[#003d82] text-white flex items-center justify-center transition-colors"
                  title="Home"
                  aria-label="Home"
                >
                  <Home className="w-4 h-4" />
                </a>

                {/* 6 Mandated Product Categories with Dropdown Menus */}
                {productCategoryMenus.map((catMenu) => {
                  const isOpen = openDropdown === catMenu.id;
                  const isCurrentCat = activeCategory === catMenu.categoryKey;

                  return (
                    <div
                      key={catMenu.id}
                      className="relative"
                      onMouseEnter={() => handleDropdownEnter(catMenu.id)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenDropdown(openDropdown === catMenu.id ? null : catMenu.id);
                        }}
                        className={`flex items-center gap-1.5 px-3.5 py-3 text-xs font-bold tracking-wide transition-colors uppercase ${
                          isOpen || isCurrentCat
                            ? 'bg-[#003d82] text-white'
                            : 'text-slate-100 hover:bg-[#003d82] hover:text-white'
                        }`}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                      >
                        <span>{catMenu.name}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-blue-200 transition-transform duration-150 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu Panel */}
                      {isOpen && (
                        <div
                          className="absolute left-0 top-full bg-white text-slate-800 rounded-b-xl shadow-2xl border border-slate-200 py-2 min-w-[280px] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                          role="menu"
                          aria-orientation="vertical"
                        >
                          <div className="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {catMenu.name} Categories
                          </div>

                          <div className="py-1">
                            {catMenu.subcategories.map((sub) => {
                              const isSubActive =
                                activeCategory === catMenu.categoryKey &&
                                activeSubcategory === sub.name;

                              return (
                                <button
                                  key={sub.name}
                                  type="button"
                                  onClick={() => handleSubcategoryClick(catMenu.categoryKey, sub.name)}
                                  className={`w-full text-left px-4 py-2.5 text-xs transition-colors flex flex-col ${
                                    isSubActive
                                      ? 'bg-blue-50 text-blue-700 font-bold'
                                      : 'hover:bg-slate-50 text-slate-700 hover:text-blue-600 font-medium'
                                  }`}
                                  role="menuitem"
                                >
                                  <span className="flex items-center justify-between">
                                    <span>{sub.name}</span>
                                    <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-blue-600" />
                                  </span>
                                  {sub.description && (
                                    <span className="text-[10px] text-slate-400 font-normal mt-0.5">
                                      {sub.description}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          <div className="p-2 border-t border-slate-100 bg-slate-50 rounded-b-lg">
                            <button
                              type="button"
                              onClick={() => handleCategoryHeaderClick(catMenu.categoryKey)}
                              className="w-full text-center py-1.5 text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              View All {catMenu.name} &rarr;
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Direct Nav Links (Corporate Rentals, AMC & Services, About Us, Contact Us) */}
              <div className="flex items-center space-x-1">
                {directNavLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavAnchorClick(e, link.href)}
                    className="px-3 py-3 text-xs font-semibold text-blue-100 hover:text-white hover:bg-[#003d82] rounded transition-colors whitespace-nowrap"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Slide-out Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        companyData={companyData}
        onSelectCategory={onSelectCategory}
        onSearch={onSearch}
      />
    </>
  );
};

export default Navbar;
