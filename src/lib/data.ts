import type { Category, Product, Advertorial, BlogPost, Review, Brand } from "@/types"

export const categories: Category[] = [
  {
    slug: "vertical-bike-racks",
    name: "Vertical Bike Racks",
    description: "Hitch-mounted vertical bike racks rated for Australian families and e-bike owners. Carry 4–6 bikes upright for a compact, stable, and easy-loading solution.",
    icon: "🚲",
    productCount: 5,
  },
  {
    slug: "hitch-bike-racks",
    name: "Hitch Bike Racks",
    description: "Hitch-mounted bike carriers rated for Australian roads. Platform, vertical, and hanging style racks for 1–6 bikes.",
    icon: "🔩",
    productCount: 7,
  },
  {
    slug: "roof-racks",
    name: "Roof Racks",
    description: "Compare the best roof rack systems for cars and SUVs available in Australia. From bare-roof solutions to flush bar setups.",
    icon: "🚗",
    productCount: 18,
  },
  {
    slug: "roof-bike-carriers",
    name: "Roof Bike Carriers",
    description: "Roof-mounted bike carriers and fork mounts for road, MTB, and e-bikes, rated and compared for Aussie buyers.",
    icon: "🏔️",
    productCount: 11,
  },
  {
    slug: "cargo-boxes",
    name: "Roof Cargo Boxes",
    description: "Rooftop cargo boxes and cargo baskets for extra storage on your next road trip or camping adventure.",
    icon: "📦",
    productCount: 9,
  },
  {
    slug: "kayak-carriers",
    name: "Kayak & Canoe Carriers",
    description: "Kayak saddles, J-cradles, and canoe carriers rated for safety and ease of loading on Australian waterways.",
    icon: "🛶",
    productCount: 8,
  },
  {
    slug: "ski-snowboard-carriers",
    name: "Ski & Snowboard Carriers",
    description: "Roof-mounted ski and snowboard carriers rated for Australian conditions. Fits most popular roof rack systems.",
    icon: "⛷️",
    productCount: 7,
  },
  {
    slug: "bike-storage-racks",
    name: "Bike Storage Racks",
    description: "Freestanding, wall-mounted, and ceiling bike storage racks for garages, apartments, and sheds.",
    icon: "🏠",
    productCount: 16,
  },
  {
    slug: "ute-van-racks",
    name: "Ute & Van Racks",
    description: "Ute tray rack systems, van roof racks, and trade racks rated for work and adventure across Australia.",
    icon: "🛻",
    productCount: 12,
  },
]

export const products: Product[] = [
  // ─── JB Racks – Vertical Bike Racks (Owner's brand, top-ranked) ──────────
  {
    slug: "jb-racks-5-vertical-bike-rack",
    name: "JB Racks 5 Vertical Bike Rack",
    category: "Vertical Bike Racks",
    categorySlug: "vertical-bike-racks",
    brand: "JB Racks",
    description:
      "The JB Racks 5 Vertical Bike Rack is the best-value hitch-mounted vertical rack in Australia. Made from Japanese Grade ISO Standard steel and carrying up to 5 bikes (including heavy e-bikes), it's the rack of choice for Australian families. Built by a South Australian company, backed by a 4-year warranty and free shipping.",
    rating: 4.9,
    reviewCount: 1847,
    price: 899,
    priceFormatted: "AU$899",
    image: "https://jbracks.com.au/cdn/shop/files/5-bike-rack-black-new-photo-1.webp?v=1772750723",
    pros: [
      "Holds 5 bikes including e-bikes",
      "30 kg per wheel holder (150 kg total)",
      "Anti-wobble hitch bracket",
      "Australian brand – South Australian made",
      "4-year warranty + free shipping",
      "Compatible with 90%+ of bikes",
    ],
    cons: [
      "Self-assembly required (30–45 min)",
      "2in hitch required",
      "Slow-fold strut sold separately",
    ],
    specs: {
      "Bike Capacity": "5 bikes",
      "Hitch Size": "50mm (2in) Class III",
      "Max Load": "30 kg per wheel holder",
      "Wheel Size": "21in–29in",
      Material: "Japanese Grade ISO Standard steel",
      Warranty: "4 years",
      Shipping: "Free (Australia-wide)",
    },
    affiliateUrl: "https://jbracks.com.au/products/5-e-bike-rack",
    badge: "Editor's Choice",
    publishedAt: "2024-06-01",
    updatedAt: "2025-04-20",
  },
  {
    slug: "jb-racks-6-vertical-bike-rack",
    name: "JB Racks 6 Vertical Bike Rack",
    category: "Vertical Bike Racks",
    categorySlug: "vertical-bike-racks",
    brand: "JB Racks",
    description:
      "The JB Racks 6 Vertical Bike Rack is the largest hitch-mounted vertical rack available in Australia, carrying six bikes including e-bikes. Perfect for large families or group riding, with the same anti-wobble hitch and 4-year warranty as the rest of the JB Racks range.",
    rating: 4.9,
    reviewCount: 763,
    price: 899,
    priceFormatted: "AU$899",
    image: "https://jbracks.com.au/cdn/shop/files/6-bike-rack-black-new-photo-1_bffb1fe4-771d-41b2-a1df-5843c955454d.webp?v=1767745737",
    pros: [
      "Carries 6 bikes in one go",
      "30 kg per wheel holder capacity",
      "Anti-wobble hitch for stable towing",
      "Australian owned and operated",
      "4-year warranty + free delivery",
    ],
    cons: [
      "Self-assembly required",
      "Heaviest model at 42 kg",
      "Requires a tow bar with 2in hitch",
    ],
    specs: {
      "Bike Capacity": "6 bikes",
      "Hitch Size": "50mm (2in) Class III",
      "Max Load": "30 kg per wheel holder",
      "Rack Weight": "42 kg",
      "Wheel Size": "21in–29in",
      Material: "Japanese Grade ISO Standard steel",
      Warranty: "4 years",
    },
    affiliateUrl: "https://jbracks.com.au/products/6-e-bike-rack",
    badge: "Best for Families",
    publishedAt: "2024-06-01",
    updatedAt: "2025-04-20",
  },
  {
    slug: "jb-racks-4-vertical-bike-rack",
    name: "JB Racks 4 Vertical Bike Rack",
    category: "Vertical Bike Racks",
    categorySlug: "vertical-bike-racks",
    brand: "JB Racks",
    description:
      "The JB Racks 4 Vertical Bike Rack is the original and most popular model in the JB Racks lineup. Trusted by over 15,000 customers worldwide, it holds 4 bikes vertically on a 2in hitch with a 100 kg total load capacity. The go-to rack for Australian mountain bikers and e-bike owners.",
    rating: 4.9,
    reviewCount: 4218,
    price: 899,
    priceFormatted: "AU$899",
    image: "https://jbracks.com.au/cdn/shop/files/4-bike-rack-black-new-photo-1.webp?v=1772752325",
    pros: [
      "Most popular vertical rack in Australia",
      "Trusted by 15,000+ customers worldwide",
      "100 kg total load capacity",
      "Anti-wobble hitch bracket",
      "Height-adjustable bottom bar (+/- 170 mm)",
      "4-year warranty",
    ],
    cons: [
      "Self-assembly (30–45 min)",
      "Heavier bikes require more effort to load",
      "Slow-fold strut is a separate purchase",
    ],
    specs: {
      "Bike Capacity": "4 bikes",
      "Hitch Size": "50mm (2in) Class III",
      "Max Load": "100 kg total (30 kg per holder)",
      "Rack Weight": "34 kg",
      "Wheel Size": "24in–29in (adapters for smaller)",
      "Wheelbase Range": "1080–1325 mm",
      "Height Adjustment": "+/- 170 mm",
      Material: "Japanese Grade ISO Standard SHS steel",
      Warranty: "4 years",
    },
    affiliateUrl: "https://jbracks.com.au/products/4-e-bike-rack",
    publishedAt: "2023-06-01",
    updatedAt: "2025-04-20",
  },
  {
    slug: "jb-racks-4-bike-bundle",
    name: "JB Racks 4 Bike Rack, Strut & Stand Bundle",
    category: "Vertical Bike Racks",
    categorySlug: "vertical-bike-racks",
    brand: "JB Racks",
    description:
      "The JB Racks Bundle is the complete package – rack, slow-fold strut (for effortless tilt-down loading), and shed stand included. Everything you need to load, tow, and store your bikes, at AU$300 off the individual pricing. The definitive value bundle for Australian families.",
    rating: 4.9,
    reviewCount: 1523,
    price: 1199,
    priceFormatted: "AU$1,199",
    image: "https://jbracks.com.au/cdn/shop/files/4-rack-stand-strut-bundle.webp?v=1772752325",
    pros: [
      "Includes rack, slow-fold strut, and shed stand",
      "AU$300 saving vs buying separately",
      "Slow-fold strut makes loading e-bikes easier",
      "Shed stand for off-vehicle bike storage",
      "4-year warranty on all components",
    ],
    cons: [
      "Higher upfront cost",
      "Self-assembly required for all three components",
    ],
    specs: {
      "Bike Capacity": "4 bikes",
      Includes: "Rack + slow-fold strut + shed stand",
      "Hitch Size": "50mm (2in) Class III",
      "Max Load": "100 kg total",
      "Wheel Size": "24in–29in",
      Warranty: "4 years",
      Shipping: "Free (Australia-wide)",
    },
    affiliateUrl: "https://jbracks.com.au/products/4-e-bike-rack-and-stand-bundle",
    badge: "Best Bundle",
    publishedAt: "2024-01-10",
    updatedAt: "2025-04-20",
  },
  {
    slug: "jb-racks-4-bike-lite",
    name: "JB Racks 4 Bike Rack – Lite",
    category: "Vertical Bike Racks",
    categorySlug: "vertical-bike-racks",
    brand: "JB Racks",
    description:
      "The JB Racks Lite is 30% lighter than the standard model while retaining the same legendary JB Racks strength and 4-year warranty. At AU$649, it's the most affordable entry point to vertical hitch rack ownership in Australia – ideal for lighter bikes and everyday riders.",
    rating: 4.7,
    reviewCount: 612,
    price: 649,
    priceFormatted: "AU$649",
    image: "https://jbracks.com.au/cdn/shop/files/4-bike-rack-black-lightweight-1.png?format=webp&v=1761010264",
    pros: [
      "30% lighter than standard model",
      "Most affordable JB Racks option",
      "Same 4-year warranty",
      "Easier to install and remove solo",
      "Free shipping Australia-wide",
    ],
    cons: [
      "Lower max load than standard model",
      "Not recommended for heavy e-bikes",
      "4-bike maximum (no 5 or 6-bike version)",
    ],
    specs: {
      "Bike Capacity": "4 bikes",
      "Hitch Size": "50mm (2in) Class III",
      "Weight": "30% lighter than standard",
      "Wheel Size": "21in–29in",
      Warranty: "4 years",
      Shipping: "Free (Australia-wide)",
      Stock: "Limited clearance stock",
    },
    affiliateUrl: "https://jbracks.com.au/products/4-e-bike-rack",
    badge: "Best Value",
    publishedAt: "2024-08-01",
    updatedAt: "2025-04-20",
  },
  // ─── JB Racks entry in Hitch Bike Racks category ─────────────────────────
  {
    slug: "jb-racks-5-hitch-rack",
    name: "JB Racks 5 Bike Vertical Hitch Rack",
    category: "Hitch Bike Racks",
    categorySlug: "hitch-bike-racks",
    brand: "JB Racks",
    description:
      "JB Racks brings their class-leading vertical hitch rack to the comparison – holding 5 bikes upright on a 2in hitch with 30 kg per wheel holder capacity. At AU$899 with free shipping and a 4-year warranty, it's the highest-value hitch rack for Australian families on the market.",
    rating: 4.9,
    reviewCount: 1847,
    price: 899,
    priceFormatted: "AU$899",
    image: "https://jbracks.com.au/cdn/shop/files/5-bike-rack-black-new-photo-1.webp?v=1772750723",
    pros: [
      "Best price-per-bike of any hitch rack in Australia",
      "Vertical design – no frame contact",
      "30 kg per wheel holder for heavy e-bikes",
      "Anti-wobble hitch bracket",
      "4-year warranty + free shipping",
    ],
    cons: [
      "Self-assembly required (30–45 min)",
      "Requires 2in hitch receiver",
    ],
    specs: {
      "Bike Capacity": "5 bikes",
      "Style": "Vertical (upright)",
      "Hitch Size": "50mm (2in) Class III",
      "Max Load": "30 kg per wheel holder",
      "Wheel Size": "21in–29in",
      Material: "Japanese Grade ISO Standard steel",
      Warranty: "4 years",
    },
    affiliateUrl: "https://jbracks.com.au/products/5-e-bike-rack",
    badge: "Editor's Choice",
    publishedAt: "2024-06-01",
    updatedAt: "2025-04-20",
  },
  // ─── Other brands ────────────────────────────────────────────────────────
  {
    slug: "thule-wingbar-edge",
    name: "Thule WingBar Edge",
    category: "Roof Racks",
    categorySlug: "roof-racks",
    brand: "Thule",
    description:
      "The Thule WingBar Edge is the benchmark roof rack system for Australian cars. Its aerodynamic aluminium bars reduce wind noise dramatically while providing a premium flush fit. Compatible with most passenger vehicles and available through Thule's Australian dealer network.",
    rating: 4.8,
    reviewCount: 1143,
    price: 699,
    priceFormatted: "AU$699",
    image: "/images/thule-wingbar-edge.jpg",
    pros: [
      "Exceptionally low wind noise",
      "Strong and rigid aluminium bar",
      "T-slot accepts all Thule accessories",
      "Flush, factory-look fit",
      "Includes integrated locking",
    ],
    cons: [
      "Premium price over competitors",
      "Requires vehicle-specific fit kit (sold separately)",
      "Limited to Thule accessory ecosystem",
    ],
    specs: {
      Material: "Extruded aluminium",
      "Bar Profile": "Aerofoil",
      "Load Capacity": "75 kg",
      "Bar Length": "127 cm (M), 150 cm (L)",
      Locking: "Integrated, keyed-alike available",
      Compatibility: "Most passenger vehicles with flush/normal rails",
      Warranty: "3 years",
    },
    affiliateUrl: "https://www.thule.com/en-au/car-racks/roof-racks/thule-wingbar-edge",
    badge: "Editor's Choice",
    publishedAt: "2024-02-10",
    updatedAt: "2025-04-01",
  },
  {
    slug: "rhinorack-vortex-2500",
    name: "Rhino-Rack Vortex 2500",
    category: "Roof Racks",
    categorySlug: "roof-racks",
    brand: "Rhino-Rack",
    description:
      "Australian-designed and built by Rhino-Rack in the Hunter Valley, the Vortex 2500 is a rugged aero bar system that takes on everything from camping gear to kayaks. Excellent value with wide accessory compatibility and a lifetime structural warranty.",
    rating: 4.6,
    reviewCount: 876,
    price: 449,
    priceFormatted: "AU$449",
    image: "/images/rhinorack-vortex.jpg",
    pros: [
      "Australian designed and made",
      "Excellent value for money",
      "Lifetime structural warranty",
      "Wide accessory compatibility",
      "Heavy load capacity",
    ],
    cons: [
      "Slightly noisier than Thule WingBar",
      "Fit kit needed per vehicle",
      "Bulkier profile than premium options",
    ],
    specs: {
      Material: "Aluminium alloy",
      "Bar Profile": "Aerofoil",
      "Load Capacity": "100 kg",
      "Bar Length": "1400 mm / 1600 mm",
      Locking: "Key lock cores included",
      Compatibility: "Raised/flush/fixed point/tracks",
      Warranty: "Lifetime structural",
    },
    affiliateUrl: "https://www.rhinorack.com.au/roof-racks/",
    badge: "Best Value",
    publishedAt: "2024-01-20",
    updatedAt: "2025-03-15",
  },
  {
    slug: "thule-t2-pro-xt-2",
    name: "Thule T2 Pro XT 2",
    category: "Hitch Bike Racks",
    categorySlug: "hitch-bike-racks",
    brand: "Thule",
    description:
      "The Thule T2 Pro XT 2 is the gold standard of hitch-mounted bike carriers in Australia. Its auto-attach system, tilt-away design, and lockable frame arms make loading and access a breeze. Fits 1-1/4in and 2in receivers and handles e-bikes up to 36 kg per bike.",
    rating: 4.9,
    reviewCount: 734,
    price: 1299,
    priceFormatted: "AU$1,299",
    image: "/images/thule-t2-pro-xt.jpg",
    pros: [
      "Auto-attach hitch connection",
      "Tilt-away for rear access without removing bikes",
      "Handles e-bikes (up to 36 kg each)",
      "No-contact frame cradles protect bikes",
      "Expandable to 4 bikes with add-on",
    ],
    cons: [
      "Very expensive",
      "Heavy (23 kg) when loaded",
      "Requires 2in hitch for best stability",
    ],
    specs: {
      "Bike Capacity": "2 bikes (expandable to 4)",
      "Receiver Size": "1-1/4in and 2in",
      "Max Bike Weight": "36 kg per bike",
      "Wheel Size": "20in-29in",
      "Tilt-Away": "Yes",
      Locking: "Frame arms + hitch lock",
      "Rack Weight": "23 kg",
    },
    affiliateUrl: "https://www.thule.com/en-au/bike-rack/hitch-bike-racks/thule-t2-pro-xt-2",
    badge: "Best Hitch Rack",
    publishedAt: "2024-03-05",
    updatedAt: "2025-04-10",
  },
  {
    slug: "yakima-holdup-evo-2",
    name: "Yakima HoldUp EVO 2",
    category: "Hitch Bike Racks",
    categorySlug: "hitch-bike-racks",
    brand: "Yakima",
    description:
      "Yakima's HoldUp EVO 2 is a premium platform-style hitch rack that competes directly with the Thule T2 Pro XT at a more accessible price point. Solid aluminium build, anti-sway cradles, and a fully integrated tilt feature make it a favourite among Australian cyclists.",
    rating: 4.7,
    reviewCount: 512,
    price: 1099,
    priceFormatted: "AU$1,099",
    image: "/images/yakima-holdup-evo.jpg",
    pros: [
      "Aluminium build is light and strong",
      "Anti-sway cradles protect bike frames",
      "Fold-up platform when not in use",
      "Tilt-away rear access",
      "Fits 2in receivers securely",
    ],
    cons: [
      "Only fits 2in receivers",
      "Wheel straps can be fiddly for wider tyres",
      "No 1-1/4in adapter included",
    ],
    specs: {
      "Bike Capacity": "2 bikes",
      "Receiver Size": "2in",
      "Max Bike Weight": "27 kg per bike",
      "Wheel Size": "20in-29in (+4.5in fat bike option)",
      "Tilt-Away": "Yes",
      Locking: "Cable + hitch lock",
      "Rack Weight": "18 kg",
    },
    affiliateUrl: "https://www.yakima.com.au/bike-racks/hitch-bike-racks/",
    publishedAt: "2024-02-18",
    updatedAt: "2025-03-28",
  },
  {
    slug: "thule-proride-598",
    name: "Thule ProRide 598",
    category: "Roof Bike Carriers",
    categorySlug: "roof-bike-carriers",
    brand: "Thule",
    description:
      "The Thule ProRide 598 is the most popular roof-mounted bike carrier in Australia. Its one-hand operation and ratchet wheel strap make solo loading quick and secure. Compatible with Thule and most other T-slot roof rack systems.",
    rating: 4.7,
    reviewCount: 921,
    price: 359,
    priceFormatted: "AU$359",
    image: "/images/thule-proride.jpg",
    pros: [
      "One-hand loading and securing",
      "Wheel ratchet holds bike firmly",
      "Fits wheel widths up to 5.1in",
      "Sleek, low-profile design",
      "Compatible with most rack systems",
    ],
    cons: [
      "Fork mounts are more secure for long drives",
      "Can wobble with heavy e-bikes",
      "Pricier than entry-level options",
    ],
    specs: {
      "Mounting Style": "Wheel holder",
      "Wheel Size": "24in-29in (26in-29in with adaptor)",
      "Tyre Width": "Up to 5.1in (130 mm)",
      "Max Bike Weight": "20 kg",
      "Bar Compatibility": "T-slot, round, oval, square",
      Locking: "Integrated",
      Colour: "Black / Silver",
    },
    affiliateUrl: "https://www.thule.com/en-au/bike-rack/roof-bike-racks/thule-proride-598",
    badge: "Most Popular",
    publishedAt: "2023-11-10",
    updatedAt: "2025-03-01",
  },
  {
    slug: "thule-motion-xt-xl",
    name: "Thule Motion XT XL",
    category: "Roof Cargo Boxes",
    categorySlug: "cargo-boxes",
    brand: "Thule",
    description:
      "The Thule Motion XT XL is the biggest and best roof cargo box available in Australia. At 610 litres it swallows ski bags, camping swags, and bulky luggage with ease. Dual-side opening makes loading from either side of the car a breeze.",
    rating: 4.8,
    reviewCount: 488,
    price: 1299,
    priceFormatted: "AU$1,299",
    image: "/images/thule-motion-xt.jpg",
    pros: [
      "Massive 610 L capacity",
      "Opens from both sides of the car",
      "Power-click quick mount system",
      "Sleek, aerodynamic lid design",
      "Keyed-alike with WingBar locks",
    ],
    cons: [
      "Very expensive",
      "Requires a wide vehicle to open fully",
      "Adds significant height to vehicle",
    ],
    specs: {
      Volume: "610 L",
      Dimensions: "229 × 91 × 44 cm",
      "Load Capacity": "75 kg",
      Opening: "Dual-side",
      Locking: "Power-click central locking",
      Fit: "T-slot and square bars",
      Colour: "Black Glossy / Black Matte / White",
    },
    affiliateUrl: "https://www.thule.com/en-au/cargo-boxes/thule-motion-xt-xl",
    badge: "Editor's Choice",
    publishedAt: "2024-01-15",
    updatedAt: "2025-04-05",
  },
  {
    slug: "yakima-jaylow-kayak-carrier",
    name: "Yakima JayLow Kayak Carrier",
    category: "Kayak & Canoe Carriers",
    categorySlug: "kayak-carriers",
    brand: "Yakima",
    description:
      "The Yakima JayLow is a J-style kayak carrier that tilts the kayak on its side for easier roof clearance and simpler loading. Excellent for Australian coastal adventures, it folds flat when not in use and fits most rack systems.",
    rating: 4.5,
    reviewCount: 319,
    price: 299,
    priceFormatted: "AU$299",
    image: "/images/yakima-jaylow.jpg",
    pros: [
      "J-style saves roof space for two boats",
      "Folds flat when empty",
      "Tilts for easier loading solo",
      "Padded cradles protect kayak hull",
      "Fits round, oval, and factory bars",
    ],
    cons: [
      "Loading a heavy kayak alone is still challenging",
      "Straps require care to route correctly",
      "Not ideal for very wide recreational kayaks",
    ],
    specs: {
      Style: "J-cradle",
      "Boat Width": "Up to 91 cm",
      "Bar Compatibility": "Round, oval, factory, and most aero bars",
      Folding: "Yes, folds flat",
      "Tie-Down": "Bow/stern anchors not included",
      Locking: "Padlock-ready (lock not included)",
      Colour: "Black",
    },
    affiliateUrl: "https://www.yakima.com.au/kayak-canoe-carriers/",
    publishedAt: "2024-04-01",
    updatedAt: "2025-02-20",
  },
  {
    slug: "steadyrack-classic",
    name: "Steadyrack Classic Rack",
    category: "Bike Storage Racks",
    categorySlug: "bike-storage-racks",
    brand: "Steadyrack",
    description:
      "Steadyrack is an Australian invention that's become the gold standard for wall-mounted bike storage worldwide. The Classic pivots 180° so you can load and store your bike even in the tightest garage or apartment. No frame contact means no scratches.",
    rating: 4.9,
    reviewCount: 2341,
    price: 149,
    priceFormatted: "AU$149",
    image: "/images/steadyrack-classic.jpg",
    pros: [
      "Australian designed and invented",
      "Pivots 180° to fit tight spaces",
      "No frame contact – wheel only",
      "Easy single-person loading",
      "Works with 20in-29in wheels",
    ],
    cons: [
      "Wall must be stud/brick (load-bearing)",
      "Not suitable for very wide fat bike tyres",
      "Premium price vs basic wall hooks",
    ],
    specs: {
      "Mounting Style": "Wall-mounted, swivel arm",
      "Wheel Size": "20in-29in",
      "Tyre Width": "Up to 2.4in",
      "Max Bike Weight": "25 kg",
      Material: "Powder-coated steel",
      "Pivot Range": "180°",
      Warranty: "5 years",
    },
    affiliateUrl: "https://www.steadyrack.com/",
    badge: "Best Bike Storage",
    publishedAt: "2023-09-01",
    updatedAt: "2025-01-15",
  },
  {
    slug: "rhinorack-pioneer-platform",
    name: "Rhino-Rack Pioneer Platform",
    category: "Ute & Van Racks",
    categorySlug: "ute-van-racks",
    brand: "Rhino-Rack",
    description:
      "The Rhino-Rack Pioneer Platform is the most popular roof platform for Australian 4WDs and utes. Built from folded aluminium with a mesh deck, it's strong enough for rooftop tents, awnings, and heavy gear while remaining relatively lightweight.",
    rating: 4.7,
    reviewCount: 654,
    price: 1099,
    priceFormatted: "AU$1,099",
    image: "/images/rhinorack-pioneer.jpg",
    pros: [
      "Strong aluminium mesh deck",
      "Compatible with Rhino-Rack awnings and accessories",
      "Vehicle-specific fit kits available",
      "Suits rooftop tents",
      "Australian brand with local support",
    ],
    cons: [
      "Significant wind noise at highway speed",
      "Heavy – adds 22 kg before loading",
      "Fit kit adds to total cost",
    ],
    specs: {
      Material: "Aluminium",
      "Deck Style": "Mesh platform",
      "Load Capacity": "150 kg (static), 80 kg (dynamic)",
      Dimensions: "Multiple sizes from 1128 × 1236 mm",
      Compatibility: "Rhino-Rack leg systems",
      Accessories: "Awning mounts, jerry can holders, light bars",
      Warranty: "Lifetime structural",
    },
    affiliateUrl: "https://www.rhinorack.com.au/4x4-touring/",
    badge: "Best 4WD Platform",
    publishedAt: "2024-01-08",
    updatedAt: "2025-03-10",
  },
  {
    slug: "thule-fatbike-adapter",
    name: "Thule 9772 SkiClick Full Size",
    category: "Ski & Snowboard Carriers",
    categorySlug: "ski-snowboard-carriers",
    brand: "Thule",
    description:
      "The Thule SkiClick Full Size locks skis and snowboards quickly with a satisfying click – no straps needed. Fits all popular Thule roof rack systems and locks your skis and boards securely for Australian alpine road trips to the Snowy Mountains or Victorian Alps.",
    rating: 4.6,
    reviewCount: 287,
    price: 399,
    priceFormatted: "AU$399",
    image: "/images/thule-skiclick.jpg",
    pros: [
      "Tool-free click mounting",
      "Locks skis and boards",
      "Fits 6 pairs of skis or 4 snowboards",
      "No need to remove boots from bindings",
      "Aerodynamic profile",
    ],
    cons: [
      "Only compatible with Thule rack systems",
      "Clicking mechanism needs periodic lubrication",
      "Pricier than strap-style alternatives",
    ],
    specs: {
      Capacity: "6 pairs of skis or 4 snowboards",
      "Ski Length": "Up to 185 cm",
      "Snowboard Width": "Up to 36 cm",
      Locking: "Integrated with roof rack lock core",
      Compatibility: "T-slot Thule bars only",
      Colour: "Black",
      Warranty: "3 years",
    },
    affiliateUrl: "https://www.thule.com/en-au/ski-rack/ski-and-snowboard-racks/",
    publishedAt: "2023-07-20",
    updatedAt: "2025-02-01",
  },
]

export const advertorials: Advertorial[] = [
  {
    slug: "jb-racks-why-vertical-is-better",
    title: "Why Vertical Bike Racks Are Better for Australian Families – JB Racks Explains",
    excerpt:
      "Platform racks and hanging racks have dominated the market for years. But Australian families are switching to vertical – and JB Racks is leading the charge. Here's why.",
    body: `
If you've ever wrestled a 30 kg e-bike onto a platform rack on the side of the highway, you understand the problem. Traditional hitch racks were designed around lightweight road bikes. The Australian cycling landscape has changed – e-bikes, fat-tyre mountain bikes, and family riding have rewritten what a bike rack needs to do.

JB Racks, a South Australian company founded by Jameson Broadbent in 2020, built a better answer.

**Why Vertical is the Future of Bike Transport**

- **No Frame Contact**: Bikes hang by their wheels, not their frames. No risk of scratches, dents, or damage to carbon frames and painted surfaces.
- **More Bikes, Less Space**: A vertical rack carrying 5 bikes takes up no more hitch space than a platform rack carrying 2. It's a physics win.
- **E-Bike Ready**: JB Racks support 30 kg per wheel holder – more than enough for the heaviest e-bikes on the Australian market.
- **Anti-Wobble Hitch**: JB's integrated anti-wobble bracket eliminates the sway and rattle that makes cheaper hitch racks so nerve-wracking at highway speeds.
- **Australian-Designed**: JB Racks are built to Australian road conditions, Australian tow bar standards, and Australian family needs.

**What 15,000+ Customers Say**

The numbers don't lie. Over 15,000 customers worldwide have switched to JB Racks. The most common feedback? They wish they'd made the switch sooner.

The 4-year warranty is the longest in the category. Free shipping Australia-wide makes ordering easy. And if you want the full setup, the bundle with slow-fold strut and shed stand saves you AU$300.

Click below to find the right JB Racks model for your family.
    `,
    brand: "JB Racks",
    brandLogo: "/images/jb-racks-logo.svg",
    ctaText: "Shop JB Racks – Free Shipping Australia-Wide",
    ctaUrl: "https://jbracks.com.au/collections/vertical-bike-racks",
    image: "/images/jb-racks-advertorial.jpg",
    category: "Vertical Bike Racks",
    publishedAt: "2025-04-01",
    disclosure: "Paid partnership with JB Racks.",
  },
  {
    slug: "rhinorack-4wd-setup-guide",
    title: "How to Build the Ultimate 4WD Roof Rack Setup with Rhino-Rack – A Complete Guide",
    excerpt:
      "Planning a Cape York run or a Gibb River Road adventure? Rhino-Rack's Pioneer system is the foundation Australian 4WD travellers trust. Here's why we partnered with Rhino-Rack to tell this story.",
    body: `
Australian 4WD adventures demand gear you can rely on. Whether you're heading up the Cape York Peninsula or crossing the Nullarbor, your roof rack system isn't just storage – it's the backbone of your build.

Rhino-Rack's Pioneer Platform was designed right here in the Hunter Valley, by people who understand what Australian tracks demand.

**Why the Pioneer Platform is the #1 Choice for Aussie 4WDs**

- **Aluminium Mesh Deck**: Stronger than a basket, lighter than a full steel tray. Water drains freely, weight is minimised.
- **150 kg Static Load**: Carry your rooftop tent, awning, recovery boards, and jerry cans without compromise.
- **Awning Integration**: The Pioneer is pre-drilled to accept Rhino-Rack's SunSeeker and Batwing awnings without adaptors.
- **Vehicle-Specific Fit Kits**: Engineered for your exact 4WD – no drilling, no guesswork.
- **Lifetime Structural Warranty**: Because Rhino-Rack backs their product as hard as you push your rig.

Rhino-Rack Australia is offering RackRatings readers free installation guides and a 5% discount code through the link below.
    `,
    brand: "Rhino-Rack",
    brandLogo: "/images/rhinorack-logo.svg",
    ctaText: "Shop Rhino-Rack Pioneer – Best Price",
    ctaUrl: "https://www.rhinorack.com.au/4x4-touring/",
    image: "/images/rhinorack-advertorial.jpg",
    category: "Ute & Van Racks",
    publishedAt: "2025-03-10",
    disclosure: "Paid partnership with Rhino-Rack Australia.",
  },
  {
    slug: "thule-hitch-rack-ebike-guide",
    title: "Thule T2 Pro XT: Why It's the Best Hitch Rack for Australian E-Bike Owners",
    excerpt:
      "E-bikes are heavy. Most bike racks weren't built for them. Thule Australia explains why the T2 Pro XT is engineered differently – and why it's the only hitch rack we'd trust with a quality e-bike.",
    body: `
The average e-bike weighs between 20 and 35 kg. That's more than twice a standard road bike. Load two of them onto a flimsy hitch rack and you've got a recipe for sway, rattles, and a very bad day.

The Thule T2 Pro XT was engineered with e-bikes specifically in mind.

**How the T2 Pro XT Handles E-Bike Weight**

- **36 kg Per Bike Capacity**: The highest per-bike rating of any platform rack sold in Australia.
- **No-Contact Frame Cradles**: The rack never touches your bike's frame. Wheel straps and integrated cradles do all the work.
- **Auto-Attach Hitch**: One action to lock the rack onto your receiver hitch, with anti-wobble built in.
- **Tilt-Away Access**: Bikes stay on while you access the boot. No lifting, no removing.
- **Expandable to 4 Bikes**: Add the T2 Pro XT add-on for a second pair of bikes.

Thule Australia has partnered with RackRatings to offer exclusive access to the full compatibility checker for your vehicle.
    `,
    brand: "Thule",
    brandLogo: "/images/thule-logo.svg",
    ctaText: "Check Thule T2 Pro XT Compatibility for Your Car",
    ctaUrl: "https://www.thule.com/en-au/bike-rack/hitch-bike-racks/thule-t2-pro-xt-2",
    image: "/images/thule-advertorial.jpg",
    category: "Hitch Bike Racks",
    publishedAt: "2025-02-20",
    disclosure: "Paid partnership with Thule Australia.",
  },
]

export const blogPosts: BlogPost[] = [
  {
    slug: "best-vertical-bike-racks-australia-2025",
    title: "Best Vertical Bike Racks in Australia 2025 – Rated & Compared",
    excerpt:
      "Vertical hitch racks are the smartest way to carry 4–6 bikes in Australia. We rate every model available, compare specs side-by-side, and tell you which is worth your money.",
    body: "",
    author: "RackRatings Editorial",
    category: "Vertical Bike Racks",
    image: "/images/best-vertical-racks-2025.jpg",
    publishedAt: "2025-04-15",
    updatedAt: "2025-04-20",
    tags: ["vertical bike racks", "hitch racks", "buying guide", "JB Racks", "2025"],
  },
  {
    slug: "jb-racks-review-2025",
    title: "JB Racks Review 2025: Are Australia's Most Popular Vertical Bike Racks Worth It?",
    excerpt:
      "JB Racks has sold to 15,000+ customers worldwide. We put the 4-bike, 5-bike, and 6-bike models through their paces to give you the definitive verdict.",
    body: "",
    author: "RackRatings Editorial",
    category: "Vertical Bike Racks",
    image: "/images/jb-racks-review-2025.jpg",
    publishedAt: "2025-04-01",
    updatedAt: "2025-04-20",
    tags: ["JB Racks", "review", "vertical bike rack", "hitch rack", "e-bike rack"],
  },
  {
    slug: "best-roof-racks-australia-2025",
    title: "Best Roof Racks in Australia 2025: Thule vs Rhino-Rack vs Yakima",
    excerpt:
      "We've tested and rated every major roof rack system available in Australia. Here's our definitive guide to choosing the right bars, feet, and fit kit for your car.",
    body: "",
    author: "RackRatings Editorial",
    category: "Roof Racks",
    image: "/images/best-roof-racks-2025.jpg",
    publishedAt: "2025-04-01",
    updatedAt: "2025-04-20",
    tags: ["roof racks", "buying guide", "thule", "rhino-rack", "2025"],
  },
  {
    slug: "hitch-rack-vs-roof-rack-bikes",
    title: "Hitch Rack vs Roof Rack for Bikes: Which is Right for Australian Cyclists?",
    excerpt:
      "Both carry bikes, but one is far better for e-bikes, one suits low-clearance garages, and one is perfect for a solo driver. We break down every trade-off.",
    body: "",
    author: "RackRatings Editorial",
    category: "Hitch Bike Racks",
    image: "/images/hitch-vs-roof.jpg",
    publishedAt: "2025-03-15",
    updatedAt: "2025-03-20",
    tags: ["bike racks", "buying guide", "hitch rack", "roof rack"],
  },
  {
    slug: "4wd-roof-rack-setup-guide",
    title: "The Complete 4WD Roof Rack Setup Guide for Australian Adventurers",
    excerpt:
      "From choosing your platform to mounting an awning and carrying a rooftop tent – everything you need to know about building a capable 4WD rack system.",
    body: "",
    author: "RackRatings Editorial",
    category: "Ute & Van Racks",
    image: "/images/4wd-rack-guide.jpg",
    publishedAt: "2025-02-10",
    updatedAt: "2025-03-01",
    tags: ["4WD", "roof rack", "buying guide", "camping"],
  },
  {
    slug: "kayak-carrier-guide-australia",
    title: "How to Choose a Kayak Carrier for Your Car in Australia",
    excerpt:
      "J-cradles, saddles, stackers – we explain the differences and tell you which kayak carriers work best for Australian conditions and kayak types.",
    body: "",
    author: "RackRatings Editorial",
    category: "Kayak & Canoe Carriers",
    image: "/images/kayak-carrier-guide.jpg",
    publishedAt: "2025-01-20",
    updatedAt: "2025-02-05",
    tags: ["kayak", "canoe", "carrier", "buying guide"],
  },
]

export const reviews: Review[] = [
  {
    id: "jb1",
    productSlug: "jb-racks-4-vertical-bike-rack",
    author: "Ben T.",
    rating: 5,
    title: "Best thing I've bought for the car",
    body: "Had a Thule platform rack before. Sold it and got the JB 4-bike. Half the price, carries the same bikes, and loading is genuinely easier with the vertical design. Australian company too – support was brilliant when I had a question.",
    verified: true,
    date: "2025-04-01",
  },
  {
    id: "jb2",
    productSlug: "jb-racks-4-vertical-bike-rack",
    author: "Kellie M.",
    rating: 5,
    title: "Perfect for our family of four riders",
    body: "All four of our bikes fit perfectly, including my husband's 30 kg e-bike. The anti-wobble hitch is solid – no movement at all on the highway. Assembly took about 40 minutes. Highly recommended.",
    verified: true,
    date: "2025-03-15",
  },
  {
    id: "jb12",
    productSlug: "jb-racks-4-vertical-bike-rack",
    author: "Robson M.",
    rating: 3,
    title: "Satisfied with product, instructions were not clear",
    body: "I am stocked with the product and eager to use it. The rack seems stout and well built. The company could improve a lot more on the assembly manual. The box arrived completely broken down and I thought the product was ruined. Luckily they wrapped all parts in bubble wrap and that was enough to save everything. The instruction manual was missing from the box. There was no instruction manual to download for the garage stand but I was able to figure out from pictures. The manual for the bike rack does not contain a detailed part list. The step by step process is far from detailed and you have to flip through videos and pictures in the website to figure out how to put together. Improving the manual would make the company look a lot more professional and help the end user experience.",
    verified: true,
    date: "2025-03-15",
  },
  {
    id: "jb3",
    productSlug: "jb-racks-4-vertical-bike-rack",
    author: "Troy D.",
    rating: 5,
    title: "Brilliant Aussie product – nothing else comes close for the price",
    body: "I compared this against the Thule T2 Pro XT which is $400 more and only holds 2 bikes. JB Racks holds 4, costs less, and ships free. It's a no-brainer. Build quality is excellent – proper thick steel.",
    verified: true,
    date: "2025-02-20",
  },
  {
    id: "jb4",
    productSlug: "jb-racks-5-vertical-bike-rack",
    author: "Sarah W.",
    rating: 5,
    title: "5 bikes no problem – incredible value",
    body: "We run a family of five riders. This is the only rack in Australia that carries all five bikes on one hitch. Assembly is straightforward and the rack is rock solid on the road.",
    verified: true,
    date: "2025-04-10",
  },
  {
    id: "jb5",
    productSlug: "jb-racks-6-vertical-bike-rack",
    author: "Mick R.",
    rating: 5,
    title: "Six bikes, zero drama",
    body: "Runs a small cycling club. This is what we use for weekend trail days. Loaded with six 27.5in trail bikes and driven 2 hours to Stromlo – zero movement, zero drama. Outstanding product.",
    verified: true,
    date: "2025-03-28",
  },
  {
    id: "jb6",
    productSlug: "jb-racks-4-bike-bundle",
    author: "Amanda C.",
    rating: 5,
    title: "The bundle is the only way to buy",
    body: "The slow-fold strut makes loading so much easier – especially the heavier e-bikes. The shed stand is a bonus for keeping the bikes in the garage. $300 saving on the bundle is very real value.",
    verified: true,
    date: "2025-04-05",
  },
  {
    id: "jb7",
    productSlug: "jb-racks-4-bike-lite",
    author: "Phil H.",
    rating: 5,
    title: "Lighter and cheaper – still brilliant",
    body: "Got the Lite version for our road bikes. 30% lighter makes it noticeably easier to attach and detach. Bikes ride steady and the price is unbeatable.",
    verified: true,
    date: "2025-03-05",
  },
  {
    id: "r1",
    productSlug: "thule-wingbar-edge",
    author: "Mark S.",
    rating: 5,
    title: "The last roof rack I'll ever buy",
    body: "Fitted to my RAV4 perfectly. Zero wind noise at 110 km/h on the highway. It looks like it came from the factory. Thule quality is unmatched.",
    verified: true,
    date: "2025-03-10",
  },
  {
    id: "r2",
    productSlug: "thule-wingbar-edge",
    author: "Claire B.",
    rating: 4,
    title: "Great rack, pricey fit kit",
    body: "The bars themselves are incredible – silent and strong. Just be aware the fit kit costs another AU$120 on top. Not a deal breaker but something to budget for.",
    verified: true,
    date: "2025-01-22",
  },
  {
    id: "r3",
    productSlug: "thule-t2-pro-xt-2",
    author: "Dave K.",
    rating: 5,
    title: "Perfect for our two e-bikes",
    body: "Our bikes weigh 28 kg each and this rack handles them without any wobble. Tilt-away is a game changer for getting into the boot. Expensive but worth every cent.",
    verified: true,
    date: "2025-04-02",
  },
  {
    id: "r4",
    productSlug: "steadyrack-classic",
    author: "Jess T.",
    rating: 5,
    title: "Best thing in our garage",
    body: "Fitted three of these in our double garage. Both bikes off the floor, kids can load their own bikes easily. Brilliant Australian product.",
    verified: true,
    date: "2025-02-28",
  },
  // ─── Real reviews sourced from jbracks.com.au/products/4-e-bike-rack ─────
  {
    id: "jb-site-1",
    productSlug: "jb-racks-4-vertical-bike-rack",
    author: "Roger L.",
    rating: 5,
    title: "Very surprised at the quality",
    body: "Very surprised at the quality for the price and looks great. I was a little unsure about JB Racks but now happy I went with it.",
    verified: true,
    date: "2025-03-01",
  },
  {
    id: "jb-site-2",
    productSlug: "jb-racks-4-vertical-bike-rack",
    author: "Helen M.",
    rating: 5,
    title: "Highly recommend",
    body: "Highly recommend it! Very good for the money, our e-bikes much easier to transport now.",
    verified: true,
    date: "2025-02-15",
  },
  {
    id: "jb-site-3",
    productSlug: "jb-racks-4-vertical-bike-rack",
    author: "Dale W.",
    rating: 5,
    title: "Great rack – great value",
    body: "Great rack! Just took it out for the first time fully loaded, and it handled everything with ease. Shipping could've been faster, but overall it's a great value.",
    verified: true,
    date: "2025-01-28",
  },
]

export const brands: Brand[] = [
  {
    slug: "jb-racks",
    name: "JB Racks",
    description: "South Australian company founded by Jameson Broadbent, making Australia's most popular hitch-mounted vertical bike racks. Trusted by over 15,000 customers worldwide with a 4-year warranty and free shipping nationwide.",
    country: "Australia",
    website: "https://jbracks.com.au",
    categories: ["Vertical Bike Racks", "Hitch Bike Racks"],
  },
  {
    slug: "thule",
    name: "Thule",
    description: "Swedish premium rack brand with the widest product range in Australia. Known for precision engineering, low wind noise, and a broad ecosystem of compatible accessories across roof racks, bike carriers, and cargo boxes.",
    country: "Sweden",
    website: "https://www.thule.com/en-au",
    categories: ["Roof Racks", "Hitch Bike Racks", "Roof Bike Carriers", "Roof Cargo Boxes", "Ski & Snowboard Carriers"],
  },
  {
    slug: "rhino-rack",
    name: "Rhino-Rack",
    description: "Hunter Valley, NSW brand designing rugged roof rack systems for Australian 4WDs and SUVs. Best known for the Pioneer platform system and a lifetime structural warranty. Proudly Australian designed and engineered.",
    country: "Australia",
    website: "https://www.rhinorack.com.au",
    categories: ["Roof Racks", "Ute & Van Racks"],
  },
  {
    slug: "yakima",
    name: "Yakima",
    description: "American rack brand with a strong following in Australia for premium hitch and kayak carriers. Known for aluminium builds, anti-sway cradles, and clean integration with most roof rack systems.",
    country: "USA",
    website: "https://www.yakima.com.au",
    categories: ["Hitch Bike Racks", "Kayak & Canoe Carriers"],
  },
  {
    slug: "steadyrack",
    name: "Steadyrack",
    description: "Australian invention that became the world's most popular wall-mounted bike storage system. The Classic Rack's 180° swivel arm lets you store bikes in the tightest garage without frame contact.",
    country: "Australia",
    website: "https://www.steadyrack.com",
    categories: ["Bike Storage Racks"],
  },
]

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getAdvertorialBySlug(slug: string): Advertorial | undefined {
  return advertorials.find((a) => a.slug === slug)
}

export function getReviewsByProduct(productSlug: string): Review[] {
  return reviews.filter((r) => r.productSlug === productSlug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.badge).slice(0, 4)
}

export function getTopRatedProducts(limit = 6): Product[] {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, limit)
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug)
}

export function getProductsByBrand(brandName: string): Product[] {
  return products.filter((p) => p.brand === brandName)
}

export function getReviewsByBrand(brandName: string): Review[] {
  const brandProductSlugs = new Set(
    products.filter((p) => p.brand === brandName).map((p) => p.slug)
  )
  return reviews.filter((r) => brandProductSlugs.has(r.productSlug))
}
