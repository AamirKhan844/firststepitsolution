import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const PROJECT_ROOT = path.resolve(__dirname, '../../../');

/**
 * Reads a project file as UTF-8 string. Returns null if file does not exist.
 */
export function readProjectFile(relativePath) {
  const fullPath = path.resolve(PROJECT_ROOT, relativePath);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  return fs.readFileSync(fullPath, 'utf8');
}

/**
 * Checks if a project file or directory exists.
 */
export function projectPathExists(relativePath) {
  return fs.existsSync(path.resolve(PROJECT_ROOT, relativePath));
}

/**
 * Authoritative corporate specifications from B2B Microworld & Graphline Redesign
 */
export const AUTHORITATIVE_SPECS = {
  companyName: 'FIRST STEP SOLUTIONS',
  tagline: 'Premier IT Hardware Sales, Corporate Equipment Rental & Enterprise AMC Services',
  foundingYear: 2009,
  emails: [
    'sales@firststepitsolutions.com',
    'sahil@firststepitsolutions.com'
  ],
  supportHours: 'Mon - Sat: 10:00 AM - 7:30 PM | 24/7 AMC Emergency Support',
  faridabadOffice: {
    title: 'Registered Head Office',
    address: 'F-1, SGM Nagar, Near Patel Chowk, Faridabad, Haryana – 121001',
    pincode: '121001',
    contacts: ['+91 9990990431', '+91 9891508606'],
  },
  nehruPlaceOffice: {
    title: 'Corporate Sales & Support Office',
    address: 'Building No 89, 1218 Hemkunt Chamber, Nehru Place, South Delhi – 110019',
    pincode: '110019',
    contacts: ['+91 9643537006', '+91 9891508606'],
    landline: '011 41777006'
  },
  mandatedSections: [
    'hero',
    'partners',
    'products',
    'rentals',
    'services',
    'about',
    'why-us',
    'stats',
    'testimonials',
    'contact'
  ],
  productCategories: [
    {
      key: 'laptops',
      name: 'Laptops',
      subcategories: [
        'HP Business Series - Entry Range',
        'HP Business Series - Pro Series',
        'HP Business Series - Elite Series'
      ]
    },
    {
      key: 'workstations',
      name: 'Work Stations',
      subcategories: [
        'Desktop Workstation',
        'Mobile Workstation'
      ]
    },
    {
      key: 'desktops',
      name: 'Desktop',
      subcategories: [
        'HP Business Series'
      ]
    },
    {
      key: 'monitors',
      name: 'Monitors',
      subcategories: [
        'Commercial LED & IPS Displays'
      ]
    },
    {
      key: 'printers',
      name: 'Printers',
      subcategories: [
        'Inkjet Printers',
        'Laserjet Printers'
      ]
    },
    {
      key: 'accessories',
      name: 'Accessories',
      subcategories: [
        'Laptop Accessories',
        'Desktop Accessories',
        'Workstation Accessories',
        'General Accessories'
      ]
    }
  ],
  directNavLinks: [
    { name: 'Corporate Rentals', href: '#rentals' },
    { name: 'AMC & Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact Us', href: '#contact' }
  ],
  heroSlides: [
    {
      title: 'HP Elite & ProBook Commercial Fleet',
      tagline: 'Elegant and Powerful Business Computing'
    },
    {
      title: 'Zero-Capex Corporate IT Rentals',
      tagline: 'Rent Commercial Laptops, Desktops & Workstations from ₹1,499/mo'
    },
    {
      title: 'High-Performance Workstations & Servers',
      tagline: 'HP Z2 Workstations & Dell PowerEdge Servers'
    },
    {
      title: '24/7 Enterprise AMC & Express Chip Lab',
      tagline: 'Committed 15-Minute Emergency SLA'
    }
  ],
  scrapedProBookPartNumbers: [
    'D9CU8PT',
    'E0BS7PT',
    'DQ9E1AT',
    'D2MJ1AT',
    'D2MJ2AT',
    'DM6B5AT'
  ],
  mandatedMetrics: [
    { target: '500+', label: 'Clients Served' },
    { target: '15+', label: 'Years Experience' },
    { target: '24/7', label: 'Dedicated Support' },
    { target: '1000+', label: 'Projects Delivered' }
  ],
  mandatedPartners: [
    'HP',
    'Dell',
    'Cisco',
    'Microsoft',
    'AWS',
    'Lenovo'
  ]
};

/**
 * Scans a given text or source tree for prohibited dummy copy (Lorem Ipsum).
 */
export function scanForLoremIpsum(text) {
  const dummyPatterns = [
    /\blorem\s+ipsum\b/i,
    /\bdolor\s+sit\s+amet\b/i,
    /\bconsectetur\s+adipiscing\b/i,
    /\bsed\s+do\s+eiusmod\b/i,
    /\btempor\s+incididunt\b/i
  ];

  const matches = [];
  for (const pattern of dummyPatterns) {
    if (pattern.test(text)) {
      matches.push(pattern.toString());
    }
  }
  return matches;
}

/**
 * Audits source code for prohibited GST numbers (e.g. ['06', 'BFKPA', '1247', 'K1ZM'].join(''))
 */
export function scanForProhibitedGST(text) {
  // Pattern matching standard Indian 15-digit GSTIN or the specific prohibited number
  const gstPattern = /\b\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}\b/g;
  const matches = text.match(gstPattern) || [];
  return matches;
}
