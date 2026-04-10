/**
 * TerraWealth Agro - Projects Module
 * Mock project data for agriculture and real estate investments
 */

// Mock projects data
const mockProjects = [
  {
    id: 'proj_001',
    name: 'Premium Catfish Farm',
    type: 'agriculture',
    subtype: 'fish-farming',
    description: 'A sustainable catfish farming project utilizing modern aquaculture techniques. Our farm employs recirculating aquaculture systems (RAS) to minimize water usage and maximize yield. The project focuses on producing high-quality catfish for local and export markets.',
    shortDescription: 'Sustainable catfish farming with modern aquaculture systems.',
    location: 'Delta State, Nigeria',
    duration: '12 months',
    minInvestment: 500,
    maxInvestment: 50000,
    returnRange: { min: 15, max: 22 },
    riskLevel: 'medium',
    status: 'active',
    funded: 750000,
    target: 1000000,
    investors: 145,
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    images: ['🐟'],
    updates: [
      {
        date: '2024-01-15',
        title: 'Project Launched',
        content: 'Premium Catfish Farm is now open for investment. We have secured the land and begun pond construction.'
      },
      {
        date: '2024-02-20',
        title: 'Pond Construction Complete',
        content: 'All 20 ponds have been constructed and are ready for stocking. Water quality testing shows optimal conditions.'
      },
      {
        date: '2024-03-10',
        title: 'Fish Stocking Begins',
        content: 'We have stocked 50,000 juvenile catfish across all ponds. Initial growth rates are exceeding expectations.'
      }
    ]
  },
  {
    id: 'proj_002',
    name: 'Layer Poultry Farm',
    type: 'agriculture',
    subtype: 'poultry',
    description: 'A commercial layer poultry farm focused on egg production. The farm uses automated feeding and egg collection systems to ensure efficiency and biosecurity. We prioritize animal welfare and produce cage-free eggs for the premium market.',
    shortDescription: 'Commercial egg production with automated systems and cage-free practices.',
    location: 'Oyo State, Nigeria',
    duration: '18 months',
    minInvestment: 1000,
    maxInvestment: 100000,
    returnRange: { min: 18, max: 25 },
    riskLevel: 'medium',
    status: 'active',
    funded: 420000,
    target: 800000,
    investors: 89,
    startDate: '2024-02-01',
    endDate: '2025-08-01',
    images: ['🥚'],
    updates: [
      {
        date: '2024-02-01',
        title: 'Project Started',
        content: 'Layer Poultry Farm construction has begun. We are installing state-of-the-art poultry housing.'
      },
      {
        date: '2024-03-15',
        title: 'First Batch Arrived',
        content: '5,000 day-old chicks have been received and are adapting well to their new environment.'
      }
    ]
  },
  {
    id: 'proj_003',
    name: 'Maize Cultivation Project',
    type: 'agriculture',
    subtype: 'crops',
    description: 'Large-scale maize cultivation on 500 hectares of fertile land. This project leverages mechanized farming and precision agriculture techniques to maximize yield. The harvested maize will be sold to food processors and animal feed manufacturers.',
    shortDescription: 'Large-scale mechanized maize farming on 500 hectares.',
    location: 'Kaduna State, Nigeria',
    duration: '6 months',
    minInvestment: 250,
    maxInvestment: 25000,
    returnRange: { min: 12, max: 18 },
    riskLevel: 'low',
    status: 'active',
    funded: 320000,
    target: 500000,
    investors: 210,
    startDate: '2024-03-01',
    endDate: '2024-09-01',
    images: ['🌽'],
    updates: [
      {
        date: '2024-03-01',
        title: 'Planting Season Begins',
        content: 'Land preparation is complete and planting has started across all 500 hectares.'
      }
    ]
  },
  {
    id: 'proj_004',
    name: 'Residential Land Development',
    type: 'real-estate',
    subtype: 'land',
    description: 'Strategic land acquisition in fast-growing urban areas. This project involves purchasing undeveloped land in locations with high appreciation potential. The land will be held for 24-36 months before resale to developers.',
    shortDescription: 'Strategic land banking in high-growth urban corridors.',
    location: 'Lekki, Lagos',
    duration: '36 months',
    minInvestment: 5000,
    maxInvestment: 200000,
    returnRange: { min: 35, max: 50 },
    riskLevel: 'medium',
    status: 'active',
    funded: 2500000,
    target: 3000000,
    investors: 67,
    startDate: '2024-01-01',
    endDate: '2026-12-31',
    images: ['🏘️'],
    updates: [
      {
        date: '2024-01-01',
        title: 'Land Acquisition Complete',
        content: 'We have successfully acquired 10 hectares of prime land in Lekki with clear title documents.'
      },
      {
        date: '2024-03-01',
        title: 'Infrastructure Development',
        content: 'Road access and perimeter fencing have been completed. Property value has already appreciated 8%.'
      }
    ]
  },
  {
    id: 'proj_005',
    name: 'Rental Apartment Complex',
    type: 'real-estate',
    subtype: 'rental',
    description: 'A modern 24-unit apartment complex targeting middle-income professionals. The property features 2 and 3-bedroom units with amenities including parking, security, and a recreational area. Rental income provides steady returns to investors.',
    shortDescription: 'Modern apartment complex generating rental income.',
    location: 'Abuja, FCT',
    duration: '60 months',
    minInvestment: 2000,
    maxInvestment: 150000,
    returnRange: { min: 10, max: 15 },
    riskLevel: 'low',
    status: 'active',
    funded: 1800000,
    target: 2500000,
    investors: 124,
    startDate: '2023-06-01',
    endDate: '2028-05-31',
    images: ['🏢'],
    updates: [
      {
        date: '2023-06-01',
        title: 'Construction Started',
        content: 'Foundation work has begun on the 24-unit apartment complex.'
      },
      {
        date: '2023-12-01',
        title: 'Structure Complete',
        content: 'The building structure is now complete. Interior finishing work is in progress.'
      },
      {
        date: '2024-02-15',
        title: 'First Tenants Moving In',
        content: 'The first units are now ready and tenants have begun moving in. 80% occupancy achieved.'
      }
    ]
  },
  {
    id: 'proj_006',
    name: 'Commercial Plaza Development',
    type: 'real-estate',
    subtype: 'development',
    description: 'A mixed-use commercial plaza featuring retail spaces, offices, and restaurants. Located in a high-traffic business district, this development targets established businesses and franchises seeking premium locations.',
    shortDescription: 'Mixed-use commercial plaza in prime business district.',
    location: 'Victoria Island, Lagos',
    duration: '48 months',
    minInvestment: 10000,
    maxInvestment: 500000,
    returnRange: { min: 25, max: 40 },
    riskLevel: 'high',
    status: 'funding',
    funded: 4500000,
    target: 8000000,
    investors: 45,
    startDate: '2024-04-01',
    endDate: '2028-03-31',
    images: ['🏗️'],
    updates: [
      {
        date: '2024-04-01',
        title: 'Project Announced',
        content: 'Commercial Plaza Development is now open for investment. Architectural plans have been approved.'
      }
    ]
  },
  {
    id: 'proj_007',
    name: 'Cassava Processing Plant',
    type: 'agriculture',
    subtype: 'processing',
    description: 'An integrated cassava farming and processing operation. The project includes 200 hectares of cassava farms and a processing plant for garri, flour, and starch production. This addresses the growing demand for cassava derivatives.',
    shortDescription: 'Integrated cassava farming and processing facility.',
    location: 'Ogun State, Nigeria',
    duration: '24 months',
    minInvestment: 1000,
    maxInvestment: 75000,
    returnRange: { min: 20, max: 30 },
    riskLevel: 'medium',
    status: 'active',
    funded: 680000,
    target: 1200000,
    investors: 98,
    startDate: '2024-02-15',
    endDate: '2026-02-15',
    images: ['🏭'],
    updates: [
      {
        date: '2024-02-15',
        title: 'Project Launched',
        content: 'Cassava Processing Plant project is now live. Land acquisition and equipment procurement underway.'
      },
      {
        date: '2024-03-20',
        title: 'Equipment Arrived',
        content: 'Processing equipment has been delivered and installation has begun.'
      }
    ]
  },
  {
    id: 'proj_008',
    name: 'Smart Greenhouse Vegetables',
    type: 'agriculture',
    subtype: 'crops',
    description: 'Climate-controlled greenhouse cultivation of premium vegetables including tomatoes, peppers, and cucumbers. The smart greenhouse uses IoT sensors and automated irrigation to optimize growing conditions year-round.',
    shortDescription: 'Smart greenhouse vegetable production with IoT technology.',
    location: 'Epe, Lagos',
    duration: '12 months',
    minInvestment: 500,
    maxInvestment: 30000,
    returnRange: { min: 22, max: 28 },
    riskLevel: 'low',
    status: 'active',
    funded: 280000,
    target: 600000,
    investors: 156,
    startDate: '2024-01-20',
    endDate: '2025-01-20',
    images: ['🍅'],
    updates: [
      {
        date: '2024-01-20',
        title: 'Greenhouse Construction',
        content: 'Construction of 5 hectares of smart greenhouses is underway.'
      },
      {
        date: '2024-03-01',
        title: 'First Harvest',
        content: 'Our first batch of tomatoes has been harvested and sold to premium supermarkets.'
      }
    ]
  }
];

// Initialize projects in LocalStorage
function initProjects() {
  if (!localStorage.getItem('terrawealth_projects')) {
    localStorage.setItem('terrawealth_projects', JSON.stringify(mockProjects));
  }
}

// Get all projects
function getProjects() {
  return JSON.parse(localStorage.getItem('terrawealth_projects') || JSON.stringify(mockProjects));
}

// Get project by ID
function getProjectById(projectId) {
  const projects = getProjects();
  return projects.find(p => p.id === projectId);
}

// Get projects by type
function getProjectsByType(type) {
  const projects = getProjects();
  if (type === 'all') return projects;
  return projects.filter(p => p.type === type);
}

// Get projects by status
function getProjectsByStatus(status) {
  const projects = getProjects();
  return projects.filter(p => p.status === status);
}

// Search projects
function searchProjects(query) {
  const projects = getProjects();
  const lowerQuery = query.toLowerCase();
  return projects.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.location.toLowerCase().includes(lowerQuery) ||
    p.type.toLowerCase().includes(lowerQuery)
  );
}

// Filter projects
function filterProjects(filters) {
  let projects = getProjects();
  
  if (filters.type && filters.type !== 'all') {
    projects = projects.filter(p => p.type === filters.type);
  }
  
  if (filters.riskLevel && filters.riskLevel !== 'all') {
    projects = projects.filter(p => p.riskLevel === filters.riskLevel);
  }
  
  if (filters.status && filters.status !== 'all') {
    projects = projects.filter(p => p.status === filters.status);
  }
  
  if (filters.minReturn) {
    projects = projects.filter(p => p.returnRange.min >= parseInt(filters.minReturn));
  }
  
  if (filters.maxInvestment) {
    projects = projects.filter(p => p.minInvestment <= parseInt(filters.maxInvestment));
  }
  
  return projects;
}

// Get project funding progress percentage
function getProjectProgress(project) {
  return Math.round((project.funded / project.target) * 100);
}

// Update project funding
function updateProjectFunding(projectId, amount) {
  const projects = getProjects();
  const projectIndex = projects.findIndex(p => p.id === projectId);
  
  if (projectIndex !== -1) {
    projects[projectIndex].funded += amount;
    projects[projectIndex].investors += 1;
    localStorage.setItem('terrawealth_projects', JSON.stringify(projects));
    return projects[projectIndex];
  }
  return null;
}

// Initialize projects on load
document.addEventListener('DOMContentLoaded', initProjects);
