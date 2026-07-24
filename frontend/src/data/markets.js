// Markets served for the interactive Global Reach map.
// coordinates are [longitude, latitude]

export const MARKETS = [
  {
    id: "gcc",
    region: "UAE & GCC",
    coordinates: [54.37, 24.45],
    countries: ["United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain"],
    note: "Our home region and primary re-export hub through Jebel Ali.",
  },
  {
    id: "east-africa",
    region: "East Africa",
    coordinates: [37.9, -0.02],
    countries: ["Kenya", "Tanzania", "Uganda", "Ethiopia", "Djibouti"],
    note: "Rice and food importers across the East African corridor.",
  },
  {
    id: "west-africa",
    region: "West Africa",
    coordinates: [8.6, 9.08],
    countries: ["Nigeria", "Ghana", "Ivory Coast", "Senegal", "Benin"],
    note: "High volume rice and grain distribution partners.",
  },
  {
    id: "south-asia",
    region: "South Asia",
    coordinates: [69.35, 30.37],
    countries: ["Pakistan", "India", "Sri Lanka", "Bangladesh"],
    note: "Sourcing origins and regional trade partners.",
  },
  {
    id: "sea",
    region: "Southeast Asia",
    coordinates: [101.9, 4.2],
    countries: ["Malaysia", "Indonesia", "Philippines", "Singapore"],
    note: "Food processing and wholesale distribution networks.",
  },
  {
    id: "europe",
    region: "Europe",
    coordinates: [5.29, 52.13],
    countries: ["Netherlands", "United Kingdom", "Germany", "Belgium"],
    note: "Retail chains and specialty food importers.",
  },
  {
    id: "americas",
    region: "The Americas",
    coordinates: [-95, 39],
    countries: ["United States", "Canada"],
    note: "Ethnic retail and food service supply.",
  },
];

export const BUYER_TYPES = [
  "Rice & Food Importers",
  "Wholesalers & Distributors",
  "GCC Re-exporters",
  "Retail Chains & Supermarkets",
  "Hotels & Restaurants",
  "Food Processing Companies",
  "Salt & Wellness Brands",
  "Animal Feed Manufacturers",
];
