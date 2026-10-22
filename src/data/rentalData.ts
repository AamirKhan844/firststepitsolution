import { RentalPlan, RentalHighlight } from '@/types';
export type { RentalPlan, RentalHighlight };


export const rentalPlans: RentalPlan[] = [
  {
    id: 'rental-laptops',
    title: 'Corporate Laptops on Rent',
    subtitle: 'Bulk business laptop fleets for remote workers, call centers & project teams',
    badge: 'Most Popular',
    targetAudience: 'Startups, IT Companies, BPOs, Training Programs & Seasonal Projects',
    startingSpecs: [
      'Intel Core i5 / i7 / Ultra Processors',
      '16GB to 32GB High-Speed DDR4 / DDR5 RAM',
      '512GB - 1TB Ultra-Fast NVMe SSD',
      '14" or 15.6" Anti-Glare FHD Display with HD Webcam',
      'Pre-loaded Windows 11 Pro with corporate image & antivirus',
    ],
    benefits: [
      'Zero upfront Capital Expenditure (100% Tax Deductible OPEX)',
      'Immediate standby machine replacement within 2 hours in Delhi NCR',
      'Free preventive maintenance and software configuration',
      'Flexible tenures: Weekly, Monthly, Quarterly, or Annual leases',
    ],
    turnaround: 'Same-day delivery across Delhi NCR',
  },
  {
    id: 'rental-desktops',
    title: 'Business Desktops & PCs on Rent',
    subtitle: 'High-reliability office desktop setups complete with monitor, keyboard & UPS',
    badge: 'Cost-Effective',
    targetAudience: 'Accounts, Customer Support, Operations, Examination & Training Centers',
    startingSpecs: [
      'Intel Core i3 / i5 / i7 Processors',
      '8GB to 16GB RAM + 256GB / 512GB SSD',
      '21.5" or 24" Full HD Commercial IPS Monitor',
      'Original USB Keyboard, Optical Mouse & Surge Protector',
      'Optional Desktop UPS for uninterrupted backup',
    ],
    benefits: [
      'Cost savings of up to 60% compared to purchasing brand-new hardware',
      'Customized OS and software staging done prior to dispatch',
      'On-site engineer support for bulk setup and structured cabling',
      'Instant scale up or down as your team headcount changes',
    ],
    turnaround: 'Dispatched within 24 hours',
  },
  {
    id: 'rental-workstations',
    title: 'High-End Workstations on Rent',
    subtitle: 'Heavy-duty rendering & CAD graphics rigs powered by NVIDIA RTX GPUs',
    badge: 'High Performance',
    targetAudience: 'Architects, 3D Animators, Video Production Studios & AI/ML Labs',
    startingSpecs: [
      'Intel Core i7 / i9 / Xeon or AMD Ryzen 9',
      '32GB to 128GB High-Speed RAM',
      'Dedicated NVIDIA RTX 3060 / 4070 / 4090 / A4000 GPU',
      'Dual 27" 4K Color-Accurate Monitors (Optional)',
      'High-Speed Gen4 NVMe RAID Scratch Disks',
    ],
    benefits: [
      'Access cutting-edge GPU power without costly multi-lakh investments',
      'Benchmark-tested under 100% synthetic thermal loads',
      'Ideal for project-based contracts (1 to 6 months)',
      'Dedicated technical support for GPU driver and CUDA setup',
    ],
    turnaround: 'Custom built & delivered in 24-48 hours',
  },
  {
    id: 'rental-servers',
    title: 'Enterprise Rack Servers on Rent',
    subtitle: 'Dual Xeon & high-memory server nodes for testing, migrations & failover',
    targetAudience: 'Data Centers, ERP Trials, Database Migrations, Event Wi-Fi Gateways',
    startingSpecs: [
      'Dual Intel Xeon Scalable Processors',
      '64GB to 512GB ECC Registered RAM',
      'Enterprise SAS / SSD Hot-Plug Storage with Hardware RAID',
      'Dual 10GbE Network Interface Cards',
      'Redundant Hot-Plug Power Supplies',
    ],
    benefits: [
      'Test your software architecture on physical hardware before deployment',
      'Avoid long OEM procurement lead times for urgent infrastructure needs',
      'Complete remote management via HPE iLO / Dell iDRAC',
      'Free replacement of failed drives and components',
    ],
    turnaround: 'Configured & delivered within 48 hours',
  },
];

export const rentalHighlights: RentalHighlight[] = [
  {
    title: 'Zero Capital Expenditure',
    description: 'Transform heavy hardware Capex into 100% tax-deductible monthly operating expense (Opex).',
  },
  {
    title: 'Instant Delhi NCR Dispatch',
    description: 'Direct dispatch from our Nehru Place & Faridabad warehouses with same-day doorstep setup.',
  },
  {
    title: 'Free Maintenance & Spares',
    description: 'All servicing, parts replacement, and technical maintenance are included at zero extra cost.',
  },
  {
    title: 'Zero-Downtime Standby Policy',
    description: 'If a machine faces a hardware defect, we swap it with a standby system within 2 to 4 hours.',
  },
];
