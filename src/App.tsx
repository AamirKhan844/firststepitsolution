import React, { useState } from 'react';
import { Preloader, Navbar, Footer } from '@/components/layout';
import {
  HeroSection,
  BrandPartnersSection,
  ProductsSection,
  RentalSection,
  ServicesSection,
  AboutSection,
  WhyChooseUsSection,
  StatsSection,
  TestimonialsSection,
  ContactSection,
} from '@/components/sections';
import { FloatingWhatsApp } from '@/components/ui';
import { companyData, navigationItems } from '@/data';


export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSelectCategory = (category: string, subcategory?: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory || '');
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setSelectedCategory('all');
      setSelectedSubcategory('');
    }
  };

  const handleClearFilter = () => {
    setSelectedCategory('all');
    setSelectedSubcategory('');
    setSearchQuery('');
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white overflow-x-hidden font-sans">
      {/* Clean Corporate B2B Preloader */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Sticky 3-Tier Corporate Header & Category Navigation Bar */}
      <Navbar
        companyData={companyData}
        onSelectCategory={handleSelectCategory}
        onSearch={handleSearch}
        activeCategory={selectedCategory}
        activeSubcategory={selectedSubcategory}
      />

      {/* Main Content Area */}
      <main className="relative z-10 pt-0 overflow-x-hidden">
        {/* 1. Hero Section (#hero) with Full-Width Responsive Carousel */}
        <section id="hero" className="relative overflow-hidden bg-white">
          <HeroSection
            isLoaded={isLoaded}
            onNavigateToCategory={handleSelectCategory}
          />

          {/* Accessible Fallback Anchors & SEO Indexing */}
          <div className="sr-only" aria-hidden="true">
            <h2>Authorized HP Commercial Partner &bull; Enterprise IT Hardware &amp; Rentals</h2>
            <a href="#products">Explore IT Products</a>
            <a href="#rentals">Laptops &amp; PCs on Rent</a>
            <a href="#services">Corporate IT Services &amp; AMC</a>
            <a href="#contact">Get Free Consultation</a>
          </div>
        </section>

        {/* 2. Brand Partners & Authorizations Section (#partners) */}
        <BrandPartnersSection id="partners" />

        {/* 3. IT Products & Commercial Hardware Sales (#products) */}
        <ProductsSection
          id="products"
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          searchQuery={searchQuery}
          onClearFilter={handleClearFilter}
        />

        {/* 4. Corporate IT Equipment Rental Section (#rentals) */}
        <RentalSection id="rentals" />

        {/* 5. Corporate IT Services & AMC Section (#services) */}
        <ServicesSection id="services" />

        {/* 6. About Us Section (#about) */}
        <AboutSection id="about" />

        {/* 7. Why Choose Us Section (#why-us) */}
        <WhyChooseUsSection id="why-us" />

        {/* 8. Stats / Counter Banner (#stats) */}
        <StatsSection id="stats" />

        {/* 9. Testimonials Section (#testimonials) */}
        <TestimonialsSection id="testimonials" />

        {/* 10. Contact Section with Dual Office Hubs & Map (#contact) */}
        <ContactSection id="contact" />
      </main>

      {/* Corporate B2B Footer */}
      <Footer companyData={companyData} items={navigationItems} />

      {/* Floating WhatsApp Quick Sales Desk Button */}
      <FloatingWhatsApp />
    </div>
  );
};

export default App;
