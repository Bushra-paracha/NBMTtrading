// Static product catalog for NBMT Trading Co.

export const CATEGORIES = [
  { id: "basmati", label: "Basmati Rice" },
  { id: "non-basmati", label: "Non-Basmati Rice" },
  { id: "salt", label: "Salt" },
  { id: "wheat", label: "Wheat" },
  { id: "corn", label: "Yellow Corn Maize" },
  { id: "sesame", label: "Sesame Seeds" },
];

const RICE_IMG = "https://images.pexels.com/photos/36346840/pexels-photo-36346840.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200";
const RICE_IMG2 = "https://images.pexels.com/photos/7851798/pexels-photo-7851798.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200";
const WHITE_RICE = "https://images.pexels.com/photos/6086556/pexels-photo-6086556.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200";
const BROKEN_RICE = "https://images.pexels.com/photos/8108170/pexels-photo-8108170.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200";
const SALT_IMG = "https://images.pexels.com/photos/9974508/pexels-photo-9974508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200";
const REFINED_SALT = "https://images.pexels.com/photos/7779878/pexels-photo-7779878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200";
const WHEAT_IMG = "https://images.pexels.com/photos/54084/wheat-grain-agriculture-seed-54084.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200";
const CORN_IMG = "https://images.pexels.com/photos/30204262/pexels-photo-30204262.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200";
const SESAME_IMG = "https://images.pexels.com/photos/7420888/pexels-photo-7420888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200";

const commonPackaging = [
  "5kg, 10kg, 25kg, 50kg bags",
  "PP woven, jute and non-woven bags",
  "Consumer retail packs available",
  "Private label under your own brand",
];

export const PRODUCTS = [
  {
    slug: "1121-sella-basmati-rice",
    name: "1121 Sella Basmati Rice",
    category: "basmati",
    tag: "Signature",
    image: RICE_IMG,
    short: "Extra long golden parboiled basmati with exceptional elongation.",
    description:
      "Our 1121 Sella Basmati is a premium, extra long grain parboiled rice prized for its distinctive aroma, non-sticky texture and remarkable elongation after cooking. Carefully aged and sorted for uniformity, it is a favourite across the Gulf and beyond.",
    specs: [
      { label: "Average Grain Length", value: "8.30 mm and above" },
      { label: "Type", value: "Parboiled (Sella)" },
      { label: "Moisture", value: "12% max" },
      { label: "Broken", value: "1% to 2% max" },
      { label: "Purity", value: "95% min" },
    ],
    packaging: commonPackaging,
  },
  {
    slug: "1121-steam-basmati-rice",
    name: "1121 Steam Basmati Rice",
    category: "basmati",
    tag: "Popular",
    image: RICE_IMG2,
    short: "Pure white steamed basmati with a clean, natural aroma.",
    description:
      "1121 Steam Basmati offers a bright white appearance and a soft, fluffy grain after cooking. Gently steamed to lock in the natural fragrance, it is well suited to fine dining and retail markets.",
    specs: [
      { label: "Average Grain Length", value: "8.30 mm and above" },
      { label: "Type", value: "Steamed" },
      { label: "Moisture", value: "12% max" },
      { label: "Broken", value: "1% max" },
      { label: "Purity", value: "95% min" },
    ],
    packaging: commonPackaging,
  },
  {
    slug: "1509-basmati-rice",
    name: "1509 Basmati Rice",
    category: "basmati",
    image: RICE_IMG2,
    short: "Aromatic long grain basmati with a balanced price point.",
    description:
      "The 1509 variety delivers the classic basmati aroma and slender long grain at an accessible price, making it a versatile choice for wholesalers and food service buyers.",
    specs: [
      { label: "Average Grain Length", value: "8.00 mm and above" },
      { label: "Type", value: "Raw / Sella / Steam" },
      { label: "Moisture", value: "12% max" },
      { label: "Broken", value: "2% max" },
      { label: "Purity", value: "95% min" },
    ],
    packaging: commonPackaging,
  },
  {
    slug: "irri-6-long-grain-white-rice",
    name: "IRRI-6 Long Grain White Rice",
    category: "non-basmati",
    tag: "Popular",
    image: WHITE_RICE,
    short: "Economical long grain white rice for high volume markets.",
    description:
      "IRRI-6 is a dependable long grain non-basmati rice, valued for its consistency and value. A staple for importers, distributors and food processing companies across Africa and Asia.",
    specs: [
      { label: "Grain Type", value: "Long grain" },
      { label: "Type", value: "White / Parboiled" },
      { label: "Moisture", value: "14% max" },
      { label: "Broken", value: "5% / 10% / 25% options" },
      { label: "Purity", value: "95% min" },
    ],
    packaging: commonPackaging,
  },
  {
    slug: "pk-386-long-grain-white-rice",
    name: "PK-386 Long Grain White Rice",
    category: "non-basmati",
    image: WHITE_RICE,
    short: "Slender long grain non-basmati, versatile and economical.",
    description:
      "PK-386 is a slender, long grain white rice with a clean appearance and neutral flavour. Widely used across the Middle East and East Africa for everyday consumption.",
    specs: [
      { label: "Grain Type", value: "Long slender" },
      { label: "Type", value: "White" },
      { label: "Moisture", value: "14% max" },
      { label: "Broken", value: "5% to 10%" },
      { label: "Purity", value: "95% min" },
    ],
    packaging: commonPackaging,
  },
  {
    slug: "parboiled-non-basmati-rice",
    name: "Parboiled Non-Basmati Rice",
    category: "non-basmati",
    image: BROKEN_RICE,
    short: "Golden parboiled rice with excellent cooking yield.",
    description:
      "Our parboiled non-basmati rice is partially boiled in the husk to retain nutrients and improve texture. It offers a firm, separate grain and high cooking yield preferred by institutional buyers.",
    specs: [
      { label: "Grain Type", value: "Long / medium grain" },
      { label: "Type", value: "Parboiled" },
      { label: "Moisture", value: "14% max" },
      { label: "Broken", value: "5% / 10% options" },
      { label: "Purity", value: "95% min" },
    ],
    packaging: commonPackaging,
  },
  {
    slug: "himalayan-pink-salt",
    name: "Himalayan Pink Salt",
    category: "salt",
    tag: "Signature",
    image: SALT_IMG,
    short: "Naturally mined pink salt in grades from fine powder to rock.",
    description:
      "Himalayan Pink Salt, naturally mined and rich in trace minerals, is supplied in a full range of grades from fine table powder to coarse crystals and decorative rock. Ideal for food, wellness and private label brands.",
    specs: [
      { label: "Colour", value: "Light to dark pink" },
      { label: "Grades", value: "Powder, fine, coarse, rock, chunks" },
      { label: "Purity", value: "97% to 99% NaCl" },
      { label: "Form", value: "Edible, bath and lamp grade" },
    ],
    packaging: [
      "500g, 1kg, 5kg, 25kg packs",
      "Bulk jumbo bags for industrial buyers",
      "Consumer grinders and refill packs",
      "Private label under your own brand",
    ],
  },
  {
    slug: "refined-edible-white-salt",
    name: "Refined Edible White Salt",
    category: "salt",
    image: REFINED_SALT,
    short: "Refined, free flowing white salt for food use.",
    description:
      "Refined edible white salt with consistent grain size and high purity, suitable for table use, food processing and industrial applications.",
    specs: [
      { label: "Colour", value: "Pure white" },
      { label: "Purity", value: "99% NaCl min" },
      { label: "Moisture", value: "0.5% max" },
      { label: "Additives", value: "Iodised on request" },
    ],
    packaging: [
      "1kg, 25kg, 50kg bags",
      "Bulk supply available",
      "Consumer retail packs",
      "Private label under your own brand",
    ],
  },
  {
    slug: "milling-wheat",
    name: "Milling Wheat",
    category: "wheat",
    image: WHEAT_IMG,
    short: "Quality milling wheat for flour production.",
    description:
      "Sound, dry milling wheat with reliable protein content, cleaned and graded for flour mills and food manufacturers.",
    specs: [
      { label: "Type", value: "Milling grade" },
      { label: "Moisture", value: "12% max" },
      { label: "Protein", value: "11% to 12.5%" },
      { label: "Foreign Matter", value: "2% max" },
    ],
    packaging: [
      "25kg, 50kg PP bags",
      "Bulk jumbo bags",
      "Loose bulk in containers",
      "Private label available",
    ],
  },
  {
    slug: "feed-wheat",
    name: "Feed Wheat",
    category: "wheat",
    image: WHEAT_IMG,
    short: "Energy rich feed wheat for animal nutrition.",
    description:
      "Feed grade wheat supplied to feed manufacturers and livestock operations, offering a dependable energy source at competitive value.",
    specs: [
      { label: "Type", value: "Feed grade" },
      { label: "Moisture", value: "13% max" },
      { label: "Foreign Matter", value: "3% max" },
      { label: "Test Weight", value: "72 kg/hl min" },
    ],
    packaging: [
      "50kg PP bags",
      "Bulk jumbo bags",
      "Loose bulk in containers",
    ],
  },
  {
    slug: "yellow-corn-maize",
    name: "Yellow Corn Maize",
    category: "corn",
    tag: "New",
    image: CORN_IMG,
    short: "Feed grade yellow corn maize for animal nutrition.",
    description:
      "Feed grade yellow corn maize with bright colour and low moisture, an essential energy ingredient for poultry, cattle and aquaculture feed manufacturers.",
    specs: [
      { label: "Type", value: "Feed grade" },
      { label: "Moisture", value: "14% max" },
      { label: "Broken", value: "3% max" },
      { label: "Aflatoxin", value: "As per buyer spec" },
    ],
    packaging: [
      "25kg, 50kg PP bags",
      "Bulk jumbo bags",
      "Loose bulk in containers",
    ],
  },
  {
    slug: "natural-white-hulled-sesame-seeds",
    name: "Natural White Hulled Sesame Seeds",
    category: "sesame",
    tag: "New",
    image: SESAME_IMG,
    short: "High purity hulled sesame seeds for the food industry.",
    description:
      "Natural white hulled sesame seeds with clean, uniform appearance and high oil content. Supplied to bakeries, confectioners and food processing companies worldwide.",
    specs: [
      { label: "Type", value: "Hulled, natural white" },
      { label: "Purity", value: "99.95% min" },
      { label: "Moisture", value: "5% max" },
      { label: "Oil Content", value: "48% to 52%" },
    ],
    packaging: [
      "25kg PP / paper bags",
      "Bulk jumbo bags",
      "Vacuum packs on request",
      "Private label available",
    ],
  },
];

export const FEATURED_SLUGS = [
  "1121-sella-basmati-rice",
  "pk-386-long-grain-white-rice",
  "himalayan-pink-salt",
  "natural-white-hulled-sesame-seeds",
];

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);
export const categoryLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label || id;
