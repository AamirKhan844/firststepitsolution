import { CompanyInfo, NavItem, CategoryMenu } from '@/types';

export const companyData: CompanyInfo = {
  name: 'FIRST STEP SOLUTIONS',
  tagline: 'Premier IT Hardware Sales, Corporate Equipment Rental & Enterprise AMC Services',
  foundingYear: 2009,
  emails: [
    'sales@firststepitsolutions.com',
    'sahil@firststepitsolutions.com',
  ],
  supportHours: 'Mon - Sat: 10:00 AM - 7:30 PM | 24/7 AMC Emergency Support',
  registeredOffice: {
    id: 'faridabad-registered',
    type: 'registered',
    title: 'Registered Head Office',
    companyName: 'FIRST STEP SOLUTIONS',
    address: 'F-1, SGM Nagar, Near Patel Chowk, Faridabad, Haryana – 121001',
    pincode: '121001',
    city: 'Faridabad',
    state: 'Haryana',
    contacts: ['+91 9990990431', '+91 9891508606'],
    emails: [
      'sales@firststepitsolutions.com',
      'sahil@firststepitsolutions.com',
    ],
    mapQuery: 'F-1, SGM Nagar, Near Patel Chowk, Faridabad, Haryana 121001',
  },
  branchOffice: {
    id: 'nehru-place-office',
    type: 'branch',
    title: 'Corporate Sales & Support Office',
    companyName: 'FIRST STEP SOLUTIONS',
    address: 'Building No 89, 1218 Hemkunt Chamber, Nehru Place, South Delhi – 110019',
    pincode: '110019',
    city: 'South Delhi',
    state: 'Delhi',
    contacts: ['+91 9643537006', '+91 9891508606'],
    landline: '011 41777006',
    emails: [
      'sales@firststepitsolutions.com',
      'sahil@firststepitsolutions.com',
    ],
    mapQuery: 'Building No 89, 1218 Hemkunt Chamber, Nehru Place, South Delhi 110019',
  },
};

export const navigationItems: NavItem[] = [
  { name: 'Home', href: '#hero', description: 'Overview & Corporate Hub' },
  { name: 'Products', href: '#products', description: 'Hardware Sales (Laptops, PCs, Servers)' },
  { name: 'Rentals', href: '#rentals', description: 'Corporate IT Equipment on Rent' },
  { name: 'Services & AMC', href: '#services', description: 'Maintenance, Repairs & Networking' },
  { name: 'About', href: '#about', description: 'Our 15+ Year Nehru Place Legacy' },
  { name: 'Why Us', href: '#why-us', description: 'SLA Commitments & OEM Genuine' },
  { name: 'Contact', href: '#contact', description: 'Offices & Request a Quote' },
];

export const directNavLinks: NavItem[] = [
  { name: 'Corporate Rentals', href: '#rentals', description: 'Zero-Capex Laptop & PC Rentals' },
  { name: 'AMC & Services', href: '#services', description: '24/7 SLA Maintenance & Repairs' },
  { name: 'About Us', href: '#about', description: '15+ Years Legacy in Delhi NCR' },
  { name: 'Contact Us', href: '#contact', description: 'Nehru Place & Faridabad Offices' },
];

export const productCategoryMenus: CategoryMenu[] = [
  {
    id: 'laptops',
    name: 'Laptops',
    categoryKey: 'laptops',
    subcategories: [
      { name: 'HP Business Series - Entry Range', description: 'Value commercial laptops for corporate fleets' },
      { name: 'HP Business Series - Pro Series', description: 'Mainstream enterprise ProBook AI PCs' },
      { name: 'HP Business Series - Elite Series', description: 'Flagship EliteBook laptops with Wolf Security' },
    ],
  },
  {
    id: 'workstations',
    name: 'Work Stations',
    categoryKey: 'workstations',
    subcategories: [
      { name: 'Desktop Workstation', description: 'HP Z2 & Z4 towers ISV-certified for CAD' },
      { name: 'Mobile Workstation', description: 'HP ZBook mobile workstations with NVIDIA RTX' },
    ],
  },
  {
    id: 'desktops',
    name: 'Desktop',
    categoryKey: 'desktops',
    subcategories: [
      { name: 'HP Business Series', description: 'HP ProDesk & EliteDesk corporate desktops' },
    ],
  },
  {
    id: 'monitors',
    name: 'Monitors',
    categoryKey: 'monitors',
    subcategories: [
      { name: 'Commercial LED & IPS Displays', description: 'Ergonomic 24" & 27" IPS commercial monitors' },
    ],
  },
  {
    id: 'printers',
    name: 'Printers',
    categoryKey: 'printers',
    subcategories: [
      { name: 'Inkjet Printers', description: 'High-volume color Smart Tank printers' },
      { name: 'Laserjet Printers', description: 'High-speed duplex monochrome & MFP laser printers' },
    ],
  },
  {
    id: 'accessories',
    name: 'Accessories',
    categoryKey: 'accessories',
    subcategories: [
      { name: 'Laptop Accessories', description: 'USB-C docks, power adapters & backpacks' },
      { name: 'Desktop Accessories', description: 'Encrypted wireless keyboards, mice & adapters' },
      { name: 'Workstation Accessories', description: 'Pro RTX GPUs, ECC memory & Z-Turbo NVMe SSDs' },
      { name: 'General Accessories', description: 'Enterprise UPS, Cat6 patch panels & cables' },
    ],
  },
];
