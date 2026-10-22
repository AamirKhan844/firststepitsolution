import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Tag,
  Cpu,
  HardDrive,
  MemoryStick,
  CheckCircle2,
  MessageSquare,
  PhoneCall,
  Sparkles,
  X,
  SlidersHorizontal,
  Layers,
  Laptop,
  Monitor,
  Printer,
  Server,
} from 'lucide-react';
import { productsData, ProductItem } from '@/data/productsData';

export interface ProductsSectionProps {
  id?: string;
  selectedCategory?: string;
  selectedSubcategory?: string;
  searchQuery?: string;
  onClearFilter?: () => void;
}

const TABS = [
  { id: 'all',          label: 'All Commercial Hardware' },
  { id: 'laptops',      label: 'HP Commercial Laptops'   },
  { id: 'workstations', label: 'Workstations'            },
  { id: 'desktops',     label: 'Commercial Desktops'     },
  { id: 'monitors',     label: 'Monitors & Displays'     },
  { id: 'printers',     label: 'Printers'                },
  { id: 'accessories',  label: 'Accessories & Spares'    },
];

const BADGE_STYLES: Record<string, string> = {
  'Best Seller':      'bg-blue-50 text-blue-700 border-blue-200',
  'New':              'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Popular':          'bg-purple-50 text-purple-700 border-purple-200',
  'High Performance': 'bg-amber-50 text-amber-700 border-amber-200',
  'Top Value':        'bg-teal-50 text-teal-700 border-teal-200',
};

function getCategoryIcon(category: string) {
  switch (category) {
    case 'laptops':
      return Laptop;
    case 'workstations':
      return Server;
    case 'desktops':
      return Monitor;
    case 'monitors':
      return Monitor;
    case 'printers':
      return Printer;
    default:
      return Laptop;
  }
}

function ProductCard({ product }: { product: ProductItem }) {
  const [imgSrc, setImgSrc] = useState(product.imageUrl);
  const [imgFailed, setImgFailed] = useState(false);
  const CategoryIcon = getCategoryIcon(product.category);

  useEffect(() => {
    setImgSrc(product.imageUrl);
    setImgFailed(false);
  }, [product.id, product.imageUrl]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/919643537006?text=${encodeURIComponent(
    `Hello First Step Solutions, I am interested in purchasing/renting: ${product.name} (Part Number: ${product.partNumber}). Please share the best corporate B2B quotation.`
  )}`;

  return (
    <article
      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-200 flex flex-col overflow-hidden group"
    >
      {/* Product Image Stage (Crisp White Background) */}
      <div className="relative bg-white border-b border-slate-100 overflow-hidden flex items-center justify-center p-6 min-h-[220px]">
        {imgFailed ? (
          <div className="w-full h-44 flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-blue-50/40 rounded-xl p-4 text-center border border-slate-100">
            <div className="w-14 h-14 rounded-2xl bg-blue-100/70 border border-blue-200 flex items-center justify-center text-blue-700 mb-2">
              <CategoryIcon className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-800 line-clamp-1">{product.name}</span>
            <span className="text-[10px] text-slate-500 font-mono mt-0.5">Part: {product.partNumber}</span>
            <span className="mt-1.5 text-[9px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              HP Commercial Hardware
            </span>
          </div>
        ) : (
          <img
            src={imgSrc}
            alt={product.name}
            onError={() => {
              const fallbackUrl =
                'https://www.graphlinecomputers.com/media/catalog/product/cache/1/small_image/300x/c509f3d4e27d840305e6008f3c21a356/1/_/1_1_4.jpg';
              if (imgSrc !== fallbackUrl) {
                setImgSrc(fallbackUrl);
              } else {
                setImgFailed(true);
              }
            }}
            className="w-full h-44 object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              NEW AI PC
            </span>
          )}
          {product.badge && product.badge !== 'New' && (
            <span
              className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                BADGE_STYLES[product.badge] || 'bg-blue-50 text-blue-700 border-blue-200'
              }`}
            >
              {product.badge}
            </span>
          )}
        </div>

        {product.availableForRent && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              <Tag className="w-2.5 h-2.5" />
              Rent Available
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 bg-white">
        {/* Brand & Part Number Strip */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600">
            {product.brand} Commercial
          </span>
          <span className="text-[11px] font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-semibold">
            Part: {product.partNumber}
          </span>
        </div>

        {/* Product Subcategory Tag */}
        <div className="mb-1.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
            {product.subcategory}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-base font-bold text-slate-900 leading-snug mb-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 mb-4 line-clamp-1">
          {product.tagline}
        </p>

        {/* Technical Specs Pill Box */}
        <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4 text-xs text-slate-700">
          {product.processor !== '–' && (
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="font-semibold text-slate-800">{product.processor}</span>
            </div>
          )}
          {product.ram !== '–' && (
            <div className="flex items-center gap-2">
              <MemoryStick className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>{product.ram}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <HardDrive className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>
              {product.storage !== '–' ? `${product.storage} • ` : ''}
              {product.os}
            </span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Stock Status & Warranty */}
        <div className="flex items-center justify-between text-xs mb-4 pt-3 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-semibold text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            In Stock (Nehru Place Hub)
          </span>
          <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
            OEM Warranty
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="mt-auto pt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={scrollToContact}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
          >
            <span>Request Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            title="Enquire on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  id = 'products',
  selectedCategory = 'all',
  selectedSubcategory = '',
  searchQuery = '',
  onClearFilter,
}) => {
  const [activeTab, setActiveTab] = useState<string>(selectedCategory);
  const [activeSubcat, setActiveSubcat] = useState<string>(selectedSubcategory);
  const [localSearch, setLocalSearch] = useState<string>(searchQuery);

  useEffect(() => {
    setActiveTab(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    setActiveSubcat(selectedSubcategory);
  }, [selectedSubcategory]);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setActiveSubcat('');
  };

  const handleClearAll = () => {
    setActiveTab('all');
    setActiveSubcat('');
    setLocalSearch('');
    if (onClearFilter) {
      onClearFilter();
    }
  };

  // Filter products based on active tab, subcategory, and search query
  const filteredProducts = productsData.filter((p) => {
    // 1. Category tab match
    if (activeTab !== 'all' && p.category !== activeTab) {
      return false;
    }

    // 2. Subcategory match (if active)
    if (activeSubcat && p.subcategory.toLowerCase() !== activeSubcat.toLowerCase()) {
      return false;
    }

    // 3. Search query match (if active)
    if (localSearch && localSearch.trim()) {
      const q = localSearch.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchPart = p.partNumber.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchTag = p.tagline.toLowerCase().includes(q);
      const matchProcessor = p.processor.toLowerCase().includes(q);
      const matchSub = p.subcategory.toLowerCase().includes(q);
      if (!matchName && !matchPart && !matchDesc && !matchTag && !matchProcessor && !matchSub) {
        return false;
      }
    }

    return true;
  });

  const hasActiveFilters = activeTab !== 'all' || activeSubcat !== '' || localSearch !== '';

  return (
    <section id={id} className="py-20 bg-slate-50 relative overflow-hidden scroll-mt-20 sm:scroll-mt-28 lg:scroll-mt-36">
      <div className="section-wrap relative z-10">
        {/* Section Header (Microworld Corporate B2B Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AUTHORIZED HP COMMERCIAL PARTNER &bull; DELHI NCR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Commercial Hardware Sales &amp; Procurement
            </h2>
            <p className="text-slate-600 text-base mt-2.5 leading-relaxed">
              Equip your corporate teams with brand-new HP ProBooks, EliteBooks, Z2 Workstations, commercial displays, and enterprise printers. Direct OEM distribution with 100% manufacturer on-site warranty and official corporate tax invoicing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <a
              href="tel:+919643537006"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:border-blue-400 hover:text-blue-600 shadow-sm transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              <span>Nehru Place Sales: +91 96435 37006</span>
            </a>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Commercial Hardware Category Filters"
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar"
        >
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabClick(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Filter Indicator Strip (When subcategory or search is selected) */}
        {hasActiveFilters && (
          <div className="mb-6 p-3 rounded-xl bg-blue-50 border border-blue-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-blue-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                Active Filter:
              </span>

              {activeTab !== 'all' && (
                <span className="px-2.5 py-1 rounded-md bg-white border border-blue-200 text-blue-800 font-bold capitalize">
                  Category: {activeTab}
                </span>
              )}

              {activeSubcat && (
                <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white font-bold flex items-center gap-1">
                  <span>Subcategory: {activeSubcat}</span>
                  <button
                    type="button"
                    onClick={() => setActiveSubcat('')}
                    className="hover:text-blue-200"
                    title="Remove subcategory filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {localSearch && (
                <span className="px-2.5 py-1 rounded-md bg-slate-800 text-white font-bold flex items-center gap-1">
                  <span>Search: &ldquo;{localSearch}&rdquo;</span>
                  <button
                    type="button"
                    onClick={() => setLocalSearch('')}
                    className="hover:text-slate-300"
                    title="Remove search filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <span className="text-slate-500 ml-1">
                ({filteredProducts.length} {filteredProducts.length === 1 ? 'model' : 'models'} found)
              </span>
            </div>

            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 underline flex items-center gap-1 cursor-pointer"
            >
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8 space-y-4">
            <Layers className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">
              No matching models found
            </h3>
            <p className="text-xs text-slate-500">
              We carry custom bulk OEM configurations beyond catalog display. Contact our sales desk for immediate stock checks.
            </p>
            <button
              type="button"
              onClick={handleClearAll}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
            >
              View All Products
            </button>
          </div>
        )}

        {/* Bottom Procurement Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#002d62] via-[#004080] to-[#002d62] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-sky-200 text-xs font-semibold">
              <Sparkles className="w-3 h-3" />
              <span>CUSTOM ENTERPRISE QUOTATIONS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Need bulk procurement or a specific HP/Dell SKU?
            </h3>
            <p className="text-slate-200 text-xs sm:text-sm max-w-xl">
              We supply 10 to 500+ units with custom Windows imaging, asset tagging, and doorstep delivery across Delhi, Noida, Gurgaon, and Faridabad.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-blue-900 bg-white hover:bg-slate-100 shadow-md transition-colors"
            >
              <span>Get Bulk Pricing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://wa.me/919643537006?text=Hello%20First%20Step%20Solutions,%20I%20need%20bulk%20pricing%20for%20commercial%20laptops."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
