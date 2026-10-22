export interface NavItem {
  name: string;
  href: string;
  description?: string;
}

export interface SubcategoryItem {
  name: string;
  description?: string;
}

export interface CategoryMenu {
  id: string;
  name: string;
  categoryKey: string;
  subcategories: SubcategoryItem[];
}

export interface OfficeLocation {
  id: string;
  type: 'registered' | 'branch';
  title: string;
  companyName: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  contacts: string[];
  landline?: string;
  emails: string[];
  mapQuery: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  registeredOffice: OfficeLocation;
  branchOffice: OfficeLocation;
  emails: string[];
  supportHours: string;
  foundingYear: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  features: string[];
  badge?: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  location: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface ProductItem {
  id: string;
  name: string;
  partNumber: string;
  category: 'laptops' | 'workstations' | 'desktops' | 'monitors' | 'printers' | 'accessories' | 'servers';
  subcategory: string;
  categoryLabel: string;
  brand: string;
  processor: string;
  ram: string;
  storage: string;
  os: string;
  tagline: string;
  description: string;
  imageUrl: string;
  hoverImageUrl?: string;
  productUrl?: string;
  badge?: 'New' | 'Best Seller' | 'Popular' | 'High Performance' | 'Top Value';
  availableForRent?: boolean;
  isNew?: boolean;
}

export interface RentalPlan {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  targetAudience: string;
  startingSpecs: string[];
  benefits: string[];
  turnaround: string;
}

export interface RentalHighlight {
  title: string;
  description: string;
}

