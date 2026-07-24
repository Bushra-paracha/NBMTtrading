// Central company + site configuration for NBMT Trading Co.

export const COMPANY = {
  name: "NBMT Trading Co.",
  shortName: "NBMT",
  location: "Dubai, UAE",
  tagline: "Premium agricultural commodities, sourced with rigour and exported with care.",
  address: "Business Centre, Sharjah Publishing City Free Zone, Sharjah, United Arab Emirates",
  phone: "+92 32 427245",
  phoneRaw: "+9232427245",
  whatsapp: "923008201074",
  email: "ktcmktg@gmail.com",
  quoteContact: "ktcmktg@gmail.com",
  logo: "https://customer-assets-rejwkqb3.emergentagent.net/job_global-grains-3/artifacts/83u5pojw_Image%207-24-26%20at%202.17%E2%80%AFPM.jpeg",
};

export const whatsappUrl = (message) =>
  `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    message || `Hello ${COMPANY.name}, I would like to enquire about your products.`
  )}`;

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Global Reach", to: "/global-reach" },
  { label: "Certificates", to: "/certificates" },
  { label: "Gallery", to: "/gallery" },
  { label: "Updates", to: "/updates" },
  { label: "Catalogs", to: "/catalogs" },
  { label: "Contact", to: "/contact" },
];

export const CREDENTIALS = [
  "ISO 9001",
  "ISO 22000",
  "HACCP",
  "HALAL",
  "SGS Inspected",
  "Bureau Veritas",
];
