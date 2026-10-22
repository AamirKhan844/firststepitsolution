import { ServiceItem } from '@/types';

export const servicesData: ServiceItem[] = [
  {
    id: 'hardware-sales',
    title: 'Brand-New IT Hardware Sales',
    subtitle: 'Authorized Commercial Partner for HP, Dell & Lenovo',
    description:
      'Direct partner procurement for business laptops, commercial desktops, precision workstations, rack servers, network printers, and original OEM spares at competitive corporate pricing.',
    iconName: 'Server',
    badge: 'Hardware Sales',
    features: [
      'Official commercial laptops: HP ProBook, EliteBook, Dell Latitude, Lenovo ThinkPad',
      'High-performance workstations for CAD, 3D rendering & AI modeling',
      'HPE ProLiant & Dell PowerEdge enterprise rack & tower servers',
      'HP LaserJet enterprise printers, scanners, and high-duty copiers',
      '100% Genuine manufacturer warranty with direct brand support',
    ],
  },
  {
    id: 'rental-solutions',
    title: 'Corporate IT Equipment Rental',
    subtitle: 'Flexible Short-Term & Long-Term Laptops & PC Leasing',
    description:
      'Zero-Capex hardware rentals for enterprises, call centers, startups, and training centers. Scalable fleets of laptops, desktops, and servers delivered immediately across Delhi NCR.',
    iconName: 'Laptop',
    badge: 'Rental Services',
    features: [
      'Bulk laptop fleets pre-configured with Windows 11 Pro & corporate images',
      'Full desktop setups with commercial IPS monitors, UPS, and accessories',
      'High-end GPU workstations (NVIDIA RTX) for project-based creative studios',
      'Free preventive servicing, on-site repairs, and immediate standby swap',
      'Flexible tenures: daily, monthly, or multi-year corporate lease contracts',
    ],
  },
  {
    id: 'amc-support',
    title: 'Annual Maintenance Contracts (AMC)',
    subtitle: 'Comprehensive & Non-Comprehensive SLA-Backed Support',
    description:
      'Keep your corporate computers, laptops, printers, and network running 24/7 without unexpected downtime. Guaranteed rapid on-site engineer visit within Delhi NCR.',
    iconName: 'Wrench',
    badge: 'Corporate AMC',
    features: [
      'Comprehensive AMC (all hardware parts, motherboards & repairs included)',
      'Non-Comprehensive AMC with priority engineer dispatch & discounted spares',
      'Periodic preventive maintenance visits, thermal paste repasting & dust clearing',
      'Guaranteed 15-minute emergency response & 2-hour on-site arrival SLA',
      'Resident engineer placement options for large corporate offices',
    ],
  },
  {
    id: 'chip-level-repair',
    title: 'Component & Chip-Level Repair',
    subtitle: 'Specialized Motherboard, Screen & BGA Rework Lab',
    description:
      'State-of-the-art diagnostic and BGA rework laboratory in Nehru Place. Fixing complex motherboard defects, power chip failures, liquid damage, and broken displays with original parts.',
    iconName: 'Cpu',
    badge: 'Repair & Spares',
    features: [
      'Motherboard chip-level BGA rework & IC replacement for all laptop brands',
      'Original screen, battery, keyboard, and hinge replacements with warranty',
      'Server power supply (SMPS) and RAID controller board restoration',
      'Data recovery from damaged hard drives, SSDs, and formatted volumes',
      'Clean room diagnostics and transparent repair cost estimates',
    ],
  },
  {
    id: 'networking-infrastructure',
    title: 'Enterprise Networking & Cabling',
    subtitle: 'Structured Cabling, Cisco Switching & Office Wi-Fi 6',
    description:
      'Complete turnkey networking setup for new and expanding offices. High-speed Cat6A/Fiber cabling, Cisco/Aruba switching, rack dressing, and zero-dead-zone mesh Wi-Fi.',
    iconName: 'Network',
    badge: 'Networking',
    features: [
      'Turnkey office structured cabling, server rack assembly & patch panel termination',
      'Cisco & Aruba managed Gigabit/10G core & distribution switching',
      'High-density commercial Wi-Fi 6 & Wi-Fi 7 access point deployments',
      'Next-Gen Fortinet & Sophos firewall security and multi-office VPN tunnels',
      'End-to-end network certification testing with digital Fluke reports',
    ],
  },
  {
    id: 'it-facility-management',
    title: 'IT Facility Management & Relocation',
    subtitle: 'End-to-End Office IT Setup & Asset Modernization',
    description:
      'Relocating to a new office in Nehru Place, Gurgaon, Noida, or Faridabad? We handle safe dismantling, transport, re-installation, server commissioning, and hardware modernization.',
    iconName: 'ShieldCheck',
    badge: 'IT Services',
    features: [
      'Safe office IT dismantling, numbered packing & re-installation at new site',
      'Bulk RAM & NVMe SSD upgrade programs to revitalize existing laptop fleets',
      'OS migration, software compliance audits, and Microsoft 365 setup',
      'Old IT equipment buyback, e-waste certification, and trade-in credits',
      'Single point of contact for all corporate IT procurement and support',
    ],
  },
];
