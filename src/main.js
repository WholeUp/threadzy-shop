import './style.css'
import heroBannerImg from './assets/hero_banner.png'

// Curated High-Resolution Unsplash Fashion & Apparel Images (Ditto H&M Visuals)
const UNSPLASH_IMAGES = {
  't-shirts': [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1503341455253-b264b287b2e7?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1622445262465-2481c457487f?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1503341509153-d872fa9900c7?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=400&h=533&q=80'
  ],
  'shirts': [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1620012253295-c05518e99309?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1598032895397-c24d0ab3a73f?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1601762600297-14efc217f2a4?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1621012466909-ca6cf47de8b1?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1563122810-8b0d087515f9?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=400&h=533&q=80'
  ],
  'hoodies': [
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1609873814058-a8928924184a?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1609873814120-a8928924184b?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1618354691383-25b73747ab4e?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1564564295391-7f24f26f568b?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1548624149-f7b3be5a530e?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a55?auto=format&fit=crop&w=400&h=533&q=80'
  ],
  'pants': [
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1506629082925-6fc6b7ab2249?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=400&h=533&q=80'
  ],
  'jeans': [
    'https://images.unsplash.com/photo-1565084888279-aca607ecad0c?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=400&h=533&q=80'
  ],
  'jackets': [
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=400&h=533&q=80',
    'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=400&h=533&q=80'
  ]
};

const FLATLAY_PRODUCTS = [
  {
    id: 1,
    name: "Ribbed One-Shoulder Drape Top",
    category: "ladies",
    subcategory: "t-shirts",
    tag: "New Arrival",
    price: 1299,
    originalPrice: null,
    isSale: false,
    colors: ["Brown", "Black"],
    sizes: ["XS", "S", "M", "L"],
    fit: "Slim Fit",
    pattern: "Solid Color",
    mainImage: "/flatlays/flatlay_0.png",
    hoverImage: "/flatlays/flatlay_0.png",
    description: "A chic ribbed one-shoulder top featuring a elegant draped sleeve. Tailored in a comfortable slim fit, this top is perfect for pairing with trousers or denim."
  },
  {
    id: 2,
    name: "Satin Cowl-Neck Camisole",
    category: "ladies",
    subcategory: "t-shirts",
    tag: "Conscious Choice",
    price: 1499,
    originalPrice: null,
    isSale: false,
    colors: ["Cream", "White"],
    sizes: ["S", "M", "L"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "/flatlays/flatlay_1.png",
    hoverImage: "/flatlays/flatlay_1.png",
    description: "Elegant camisole top in soft, flowing satin with a cowl neck. Narrow, adjustable shoulder straps. Made with recycled polyester."
  },
  {
    id: 3,
    name: "Gathered Halter-Neck Top",
    category: "ladies",
    subcategory: "t-shirts",
    tag: "Trending",
    price: 2299,
    originalPrice: null,
    isSale: false,
    colors: ["Black"],
    sizes: ["XS", "S", "M", "L"],
    fit: "Oversized",
    pattern: "Solid Color",
    mainImage: "/flatlays/flatlay_2.png",
    hoverImage: "/flatlays/flatlay_2.png",
    description: "Sleeveless halter-neck top featuring gathered details around the neckline and a relaxed silhouette for a high-fashion look."
  },
  {
    id: 4,
    name: "Wide-Leg Linen Trousers",
    category: "ladies",
    subcategory: "pants",
    tag: "Premium Quality",
    price: 2699,
    originalPrice: 3499,
    isSale: true,
    colors: ["Beige", "White"],
    sizes: ["S", "M", "L", "XL"],
    fit: "Relaxed Fit",
    pattern: "Solid Color",
    mainImage: "/flatlays/flatlay_3.png",
    hoverImage: "/flatlays/flatlay_3.png",
    description: "Trousers in airy, woven linen-blend fabric. High waist with elastication, discreet side pockets, and wide, straight legs."
  },
  {
    id: 5,
    name: "Draped Cowl-Neck Satin Blouse",
    category: "ladies",
    subcategory: "shirts",
    tag: "New Arrival",
    price: 1299,
    originalPrice: null,
    isSale: false,
    colors: ["Cream", "Beige"],
    sizes: ["S", "M", "L"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "/flatlays/flatlay_4.png",
    hoverImage: "/flatlays/flatlay_4.png",
    description: "Sophisticated satin blouse with a draped cowl neck and sleeveless construction. Designed for a fluid, elegant silhouette."
  },
  {
    id: 6,
    name: "Ribbed Sleeveless Mock-Neck Top",
    category: "ladies",
    subcategory: "t-shirts",
    tag: "Standard Fit",
    price: 799,
    originalPrice: null,
    isSale: false,
    colors: ["Cream", "White"],
    sizes: ["XS", "S", "M", "L", "XL"],
    fit: "Slim Fit",
    pattern: "Solid Color",
    mainImage: "/flatlays/flatlay_5.png",
    hoverImage: "/flatlays/flatlay_5.png",
    description: "Sleeveless mock-neck top in soft, ribbed cotton jersey. Designed for a comfortable close fit."
  },
  {
    id: 7,
    name: "Draped One-Shoulder Maxi Dress",
    category: "ladies",
    subcategory: "shirts",
    tag: "Premium Quality",
    price: 2999,
    originalPrice: null,
    isSale: false,
    colors: ["Brown", "Black"],
    sizes: ["S", "M", "L"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "/flatlays/flatlay_6.png",
    hoverImage: "/flatlays/flatlay_6.png",
    description: "An elegant one-shoulder maxi dress in fluid, draped fabric. Perfect for special summer occasions."
  },
  {
    id: 8,
    name: "Sleeveless Cowl Draped Dress",
    category: "ladies",
    subcategory: "shirts",
    tag: "Trending",
    price: 2499,
    originalPrice: null,
    isSale: false,
    colors: ["Navy", "Grey"],
    sizes: ["XS", "S", "M", "L"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "/flatlays/flatlay_7.png",
    hoverImage: "/flatlays/flatlay_7.png",
    description: "Sleeveless dress featuring a sophisticated cowl drape on the side. Tailored in midweight flowy fabric."
  },
  {
    id: 9,
    name: "Linen-Blend Halter Top",
    category: "ladies",
    subcategory: "t-shirts",
    tag: "Conscious Choice",
    price: 999,
    originalPrice: null,
    isSale: false,
    colors: ["Cream", "White"],
    sizes: ["XS", "S", "M", "L"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "/flatlays/flatlay_8.png",
    hoverImage: "/flatlays/flatlay_8.png",
    description: "Halter neck top in an airy, woven linen and viscose blend. Ties at the back of the neck and features a clean hem."
  },
  {
    id: 10,
    name: "Heavyweight Cotton T-shirt",
    category: "ladies",
    subcategory: "t-shirts",
    tag: "New Arrival",
    price: 799,
    originalPrice: 1199,
    isSale: true,
    colors: ["Black", "Grey"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    fit: "Oversized",
    pattern: "Solid Color",
    mainImage: "/flatlays/flatlay_9.png",
    hoverImage: "/flatlays/flatlay_9.png",
    description: "Oversized t-shirt in heavy cotton jersey (240 GSM) with a ribbed crew neck and dropped shoulders."
  },
  {
    id: 11,
    name: "High-Waist Denim Shorts",
    category: "ladies",
    subcategory: "jeans",
    tag: "Trending",
    price: 1699,
    originalPrice: null,
    isSale: false,
    colors: ["Grey", "Black"],
    sizes: ["26", "28", "30", "32"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "/flatlays/flatlay_10.png",
    hoverImage: "/flatlays/flatlay_10.png",
    description: "5-pocket shorts in washed denim. High waist, zip fly with button, and raw, frayed hems."
  },
  {
    id: 12,
    name: "Ribbed Knit Tank Top",
    category: "ladies",
    subcategory: "t-shirts",
    tag: "Standard Fit",
    price: 699,
    originalPrice: null,
    isSale: false,
    colors: ["Grey", "White"],
    sizes: ["XS", "S", "M", "L", "XL"],
    fit: "Slim Fit",
    pattern: "Solid Color",
    mainImage: "/flatlays/flatlay_11.png",
    hoverImage: "/flatlays/flatlay_11.png",
    description: "Fitted tank top in soft, ribbed cotton-blend knit with a deep round neck."
  }
];

// Programmatic 1,200+ Products Seeder
function generateProducts(count) {
  const products = [];
  const categories = ['ladies', 'men', 'divided', 'kids', 'home', 'beauty', 'sport'];
  const subcategories = {
    ladies: ['t-shirts', 'shirts', 'pants', 'jeans', 'jackets'],
    men: ['t-shirts', 'shirts', 'pants', 'jeans', 'jackets'],
    divided: ['t-shirts', 'shirts', 'pants', 'jeans', 'jackets'],
    kids: ['t-shirts', 'shirts', 'pants', 'jeans'],
    home: ['t-shirts', 'shirts'], // towels, linens
    beauty: ['t-shirts'], // canvas bags
    sport: ['t-shirts', 'pants', 'jackets']
  };

  const colors = ['Black', 'White', 'Cream', 'Navy', 'Sage', 'Beige', 'Grey', 'Olive', 'Brown'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const fits = ['Regular Fit', 'Slim Fit', 'Oversized', 'Relaxed Fit'];
  const patterns = ['Solid Color', 'Graphic Print', 'Striped', 'Embroidered', 'Patterned'];
  
  const tags = ['New Arrival', 'Premium Quality', 'Conscious Choice', 'Sale', 'Trending', 'Standard Fit'];

  const adjectives = ['Retro', 'Aesthetic', 'Urban', 'Minimalist', 'Vintage', 'Cyberpunk', 'Classic', 'Street', 'Signature', 'Casual', 'Utility'];
  const nouns = {
    't-shirts': ['Graphic Tee', 'Heavyweight T-shirt', 'Crewneck Top', 'Ribbed Tee', 'Boxy Tank'],
    'shirts': ['Camp Collar Resort Shirt', 'Flannel Overshirt', 'Linen Blend Shirt', 'Cotton Oxford Shirt', 'Utility Pocket Shirt'],
    'hoodies': ['Oversized Hoodie', 'Heavy Sweatshirt', 'Zip-Up Hoodie', 'Fleece Pullover'],
    'pants': ['Cargo Trousers', 'Relaxed Joggers', 'Chino Pants', 'Utility Pants', 'Pleated Pants'],
    'jeans': ['Loose Fit Jeans', 'Straight Leg Denim', 'Baggy Jeans', 'Slim Fit Jeans'],
    'jackets': ['Structured Canvas Jacket', 'Denim Overshirt', 'Coach Jacket', 'Windbreaker Overshirt']
  };

  // Start seeder loop from i = 13 to avoid overlapping IDs with Flatlay items
  for (let i = 13; i <= count + 12; i++) {
    const category = categories[i % categories.length];
    const subCats = subcategories[category];
    const subcategory = subCats[i % subCats.length];
    
    const adj = adjectives[(i + 3) % adjectives.length];
    const subNouns = nouns[subcategory] || nouns['t-shirts'];
    const noun = subNouns[i % subNouns.length];
    
    const color = colors[i % colors.length];
    const name = `${adj} ${color} ${noun}`;
    
    const isSale = (i % 5 === 0);
    const originalPrice = isSale ? (1200 + (i % 25) * 150) : null;
    const price = isSale ? Math.floor(originalPrice * 0.7) : (799 + (i % 35) * 120);

    const fit = fits[i % fits.length];
    const pattern = patterns[i % patterns.length];
    const tag = tags[i % tags.length];

    // Pick unique image URLs to prevent repeats in identical grids
    const imagesList = UNSPLASH_IMAGES[subcategory] || UNSPLASH_IMAGES['t-shirts'];
    const imageIndex = i % imagesList.length;
    const mainImage = imagesList[imageIndex];
    
    // Choose a secondary image for hover, shift index by 1 to make it different
    const hoverImage = imagesList[(imageIndex + 1) % imagesList.length];

    products.push({
      id: i,
      name: name,
      category: category,
      subcategory: subcategory,
      tag: tag,
      price: price,
      originalPrice: originalPrice,
      isSale: isSale,
      colors: [color, colors[(i + 1) % colors.length]],
      sizes: sizes.slice(i % 3, 4 + (i % 3)),
      fit: fit,
      pattern: pattern,
      mainImage: mainImage,
      hoverImage: hoverImage,
      description: `Upgrade your collection with this premium ${name}. Made with high-quality materials and tailored in a comfortable ${fit}. Features a clean ${pattern} finish. Ideal for premium wardrobe layering.`
    });
  }

  return products;
}

// Generate 1188 products dynamically, and combine them with the 12 flatlays (total 1200 products)
const PRODUCTS = [...FLATLAY_PRODUCTS, ...generateProducts(1188)];
// State variables
let cart = JSON.parse(localStorage.getItem('threadzy_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('threadzy_wishlist')) || [];
let activeFilters = {
  category: 'all',
  subcategory: 'all',
  priceMax: 4999,
  colors: [],
  sizes: [],
  fits: [],
  patterns: [],
  searchQuery: '',
  sortBy: 'default'
};

// DOM Elements
const productGrid = document.getElementById('product-grid');
const resultsCount = document.getElementById('results-count');
const emptyState = document.getElementById('empty-state');
const heroBanner = document.getElementById('hero-banner');

// Navigation elements
const activeCategoryTitle = document.getElementById('active-category-title');

// Cart Elements
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartShippingEl = document.getElementById('cart-shipping');
const cartTotalEl = document.getElementById('cart-total');
const cartCountBadges = document.querySelectorAll('#cart-count');
const checkoutBtn = document.getElementById('checkout-btn');

// Detail Modal Elements
const detailModal = document.getElementById('detail-modal');
const detailModalOverlay = document.getElementById('detail-modal-overlay');
const closeDetailBtn = document.getElementById('close-detail-btn');
const detailModalBody = document.getElementById('detail-modal-body');

// Info Modals (Careers, About, Help)
const infoModal = document.getElementById('info-modal');
const infoModalOverlay = document.getElementById('info-modal-overlay');
const closeInfoBtn = document.getElementById('close-info-btn');
const infoModalBody = document.getElementById('info-modal-body');

// Search Elements
const searchToggleBtn = document.getElementById('search-toggle-btn');
const searchContainer = document.getElementById('search-container');
const searchInput = document.getElementById('search-input');
const searchClearBtn = document.getElementById('search-clear-btn');

// Filter Elements
const priceSlider = document.getElementById('price-slider');
const priceValEl = document.getElementById('price-val');
const sortSelector = document.getElementById('sort-selector');
const clearAllFiltersBtn = document.getElementById('clear-all-filters-btn');
const resetFiltersBtn = document.getElementById('reset-filters-btn');
const sidebarAside = document.getElementById('sidebar-aside');
const filterMobileToggleBtn = document.getElementById('filter-mobile-toggle-btn');

// Success Overlay
const successOverlay = document.getElementById('success-overlay');
const successCloseBtn = document.getElementById('success-close-btn');
const successOrderId = document.getElementById('success-order-id');

// Wishlist Badge
const wishlistCountEl = document.getElementById('wishlist-count');

// Newsletter Form
const newsletterForm = document.getElementById('newsletter-form');
const newsletterEmail = document.getElementById('newsletter-email');

/* --- INITIALIZATION --- */
function init() {
  initHero();
  setupEventListeners();
  renderProducts();
  updateCartUI();
  updateWishlistUI();
}

function initHero() {
  if (heroBanner) {
    heroBanner.style.backgroundImage = `url(${heroBannerImg})`;
  }
}

/* --- PRODUCT RENDERING & QUERY ENGINE --- */
function renderProducts() {
  let filtered = PRODUCTS.filter(product => {
    if (activeFilters.category !== 'all') {
      if (activeFilters.category === 'sale') {
        if (!product.isSale) return false;
      } else if (product.category !== activeFilters.category) {
        return false;
      }
    }

    if (activeFilters.subcategory !== 'all') {
      if (product.subcategory !== activeFilters.subcategory) {
        return false;
      }
    }

    if (activeFilters.searchQuery.trim() !== '') {
      const query = activeFilters.searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(query);
      const matchDesc = product.description.toLowerCase().includes(query);
      const matchTag = product.tag.toLowerCase().includes(query);
      const matchSub = product.subcategory.toLowerCase().includes(query);
      if (!matchName && !matchDesc && !matchTag && !matchSub) return false;
    }

    if (product.price > activeFilters.priceMax) return false;

    if (activeFilters.colors.length > 0) {
      const hasColor = product.colors.some(c => activeFilters.colors.includes(c));
      if (!hasColor) return false;
    }

    if (activeFilters.sizes.length > 0) {
      const hasSize = product.sizes.some(s => activeFilters.sizes.includes(s));
      if (!hasSize) return false;
    }

    if (activeFilters.fits.length > 0) {
      if (!activeFilters.fits.includes(product.fit)) return false;
    }

    if (activeFilters.patterns.length > 0) {
      if (!activeFilters.patterns.includes(product.pattern)) return false;
    }

    return true;
  });

  if (activeFilters.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (activeFilters.sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (activeFilters.sortBy === 'newest') {
    filtered.sort((a, b) => b.id - a.id);
  }

  resultsCount.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? '' : 's'}`;

  if (filtered.length === 0) {
    productGrid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  } else {
    emptyState.classList.add('hidden');
  }

  const displayProducts = filtered.slice(0, 120);

  productGrid.innerHTML = displayProducts.map(product => {
    const isWishlisted = wishlist.includes(product.id);
    
    let badgeHTML = '';
    if (product.isSale) {
      badgeHTML = `<span class="card-badge sale">Sale</span>`;
    } else if (product.tag === 'Conscious Choice') {
      badgeHTML = `<span class="card-badge conscious">Conscious</span>`;
    } else if (product.tag === 'Premium Quality') {
      badgeHTML = `<span class="card-badge premium">Premium</span>`;
    } else if (product.tag === 'New Arrival') {
      badgeHTML = `<span class="card-badge new">New</span>`;
    } else if (product.tag) {
      badgeHTML = `<span class="card-badge new">${product.tag}</span>`;
    }

    const priceHTML = product.isSale 
      ? `<span class="sale-price">₹${product.price}</span><span class="original-price">₹${product.originalPrice}</span>`
      : `<span>₹${product.price}</span>`;

    const consciousClass = product.tag === 'Conscious Choice' ? 'tag-conscious' : '';
    const premiumClass = product.tag === 'Premium Quality' ? 'tag-premium' : '';
    const tagClass = consciousClass || premiumClass;

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-image-container">
          ${badgeHTML}
          <button class="card-wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${product.id}" aria-label="Add to Wishlist">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
          <img src="${product.mainImage}" alt="${product.name}" class="product-card-img main-img" loading="lazy" />
          <img src="${product.hoverImage}" alt="${product.name} alternate" class="product-card-img hover-img" loading="lazy" />
          <button class="quick-add-btn" data-id="${product.id}">Quick Add</button>
        </div>
        <div class="product-info">
          <span class="product-tag ${tagClass}">${product.tag || 'Standard Fit'}</span>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-price-row">
            ${priceHTML}
          </div>
        </div>
      </div>
    `;
  }).join('');

  attachCardListeners();
}

function attachCardListeners() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-wishlist-btn') || e.target.closest('.quick-add-btn')) {
        return;
      }
      const id = parseInt(card.dataset.id);
      openProductDetail(id);
    });
  });

  document.querySelectorAll('.card-wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      toggleWishlist(id, btn);
    });
  });

  document.querySelectorAll('.quick-add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const product = PRODUCTS.find(p => p.id === id);
      const defaultSize = product.sizes.includes('M') ? 'M' : product.sizes[0];
      const defaultColor = product.colors[0];
      addToCart(product, defaultSize, defaultColor);
    });
  });
}

/* --- WISHLIST MANAGEMENT --- */
function toggleWishlist(id, btnEl) {
  const index = wishlist.indexOf(id);
  if (index === -1) {
    wishlist.push(id);
    if (btnEl) btnEl.classList.add('active');
  } else {
    wishlist.splice(index, 1);
    if (btnEl) btnEl.classList.remove('active');
  }
  localStorage.setItem('threadzy_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
}

function updateWishlistUI() {
  if (wishlistCountEl) {
    wishlistCountEl.textContent = wishlist.length;
    wishlistCountEl.style.display = wishlist.length > 0 ? 'flex' : 'none';
  }
}

/* --- CART DRAWER STATE --- */
function toggleCartDrawer(open) {
  if (open) {
    cartDrawer.classList.add('active');
    cartDrawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    cartDrawer.classList.remove('active');
    cartDrawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function addToCart(product, size, color) {
  const existingIndex = cart.findIndex(item => item.id === product.id && item.size === size && item.color === color);
  
  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      size: size,
      color: color,
      image: product.mainImage,
      quantity: 1
    });
  }

  localStorage.setItem('threadzy_cart', JSON.stringify(cart));
  updateCartUI();
  toggleCartDrawer(true);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('threadzy_cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem('threadzy_cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCountBadges.forEach(badge => {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
  });

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty-msg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <p>Your shopping bag is empty.</p>
      </div>
    `;
    cartSubtotalEl.textContent = '₹0';
    cartShippingEl.textContent = '₹0';
    cartTotalEl.textContent = '₹0';
    checkoutBtn.disabled = true;
    return;
  }

  checkoutBtn.disabled = false;

  cartItemsContainer.innerHTML = cart.map((item, index) => {
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div>
            <div class="cart-item-header">
              <h4 class="cart-item-name">${item.name}</h4>
              <button class="cart-item-remove" data-index="${index}">&times;</button>
            </div>
            <p class="cart-item-meta">Color: ${item.color} | Size: ${item.size}</p>
          </div>
          <div class="cart-item-actions">
            <div class="qty-selector">
              <button class="qty-btn minus" data-index="${index}">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn plus" data-index="${index}">+</button>
            </div>
            <span class="cart-item-price">₹${item.price * item.quantity}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal >= 1999 ? 0 : 149;
  const total = subtotal + shipping;

  cartSubtotalEl.textContent = `₹${subtotal}`;
  cartShippingEl.textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
  cartTotalEl.textContent = `₹${total}`;

  document.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.index)));
  });
  document.querySelectorAll('.qty-btn.minus').forEach(btn => {
    btn.addEventListener('click', () => updateCartQuantity(parseInt(btn.dataset.index), -1));
  });
  document.querySelectorAll('.qty-btn.plus').forEach(btn => {
    btn.addEventListener('click', () => updateCartQuantity(parseInt(btn.dataset.index), 1));
  });
}

/* --- PRODUCT DETAIL MODAL --- */
function openProductDetail(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const priceHTML = product.isSale 
    ? `<span class="sale-price">₹${product.price}</span><span class="original-price">₹${product.originalPrice}</span>`
    : `<span>₹${product.price}</span>`;

  let selectedSize = product.sizes.includes('M') ? 'M' : product.sizes[0];
  let selectedColor = product.colors[0];

  const consciousClass = product.tag === 'Conscious Choice' ? 'tag-conscious' : '';
  const premiumClass = product.tag === 'Premium Quality' ? 'tag-premium' : '';
  const tagClass = consciousClass || premiumClass;

  detailModalBody.innerHTML = `
    <div class="product-detail-layout">
      <div class="detail-gallery">
        <div class="main-detail-img-container">
          <img src="${product.mainImage}" alt="${product.name}" class="main-detail-img" id="main-detail-img">
        </div>
        <div class="thumbnail-row">
          <img src="${product.mainImage}" alt="Main View" class="thumb-img active" data-src="${product.mainImage}">
          <img src="${product.hoverImage}" alt="Alt View" class="thumb-img" data-src="${product.hoverImage}">
        </div>
      </div>
      
      <div class="detail-info">
        <span class="detail-tag ${tagClass}">${product.tag || 'Standard Fit'}</span>
        <h2 class="detail-title">${product.name}</h2>
        <div class="detail-price-row">${priceHTML}</div>
        <p class="detail-desc">${product.description}</p>
        
        <div class="detail-option-group">
          <span class="detail-option-label">Color: <strong id="selected-color-label">${selectedColor}</strong></span>
          <div class="color-selector-grid">
            ${product.colors.map((c, i) => {
              const bgStyle = c === 'Black' ? '#1a1a1a' : 
                              c === 'White' ? '#fafafa' : 
                              c === 'Cream' ? '#f5f2eb' : 
                              c === 'Navy' ? '#0b1f3f' : 
                              c === 'Sage' ? '#8fa08c' : 
                              c === 'Beige' ? '#dfd3c3' :
                              c === 'Grey' ? '#a0a0a0' :
                              c === 'Olive' ? '#556b2f' : '#6f4e37';
              const borderStyle = c === 'White' ? '1px solid #ccc' : 'none';
              return `<button class="color-selector-swatch ${i === 0 ? 'active' : ''}" data-color="${c}" style="background-color: ${bgStyle}; border: ${borderStyle};" title="${c}"></button>`;
            }).join('')}
          </div>
        </div>

        <div class="detail-option-group">
          <span class="detail-option-label">Select Size</span>
          <div class="size-selector-grid">
            ${product.sizes.map(s => {
              const activeClass = s === selectedSize ? 'active' : '';
              return `<button class="size-selector-btn ${activeClass}" data-size="${s}">${s}</button>`;
            }).join('')}
          </div>
        </div>

        <button class="btn btn-primary add-to-bag-btn" id="modal-add-to-bag">ADD TO BAG</button>
      </div>
    </div>
  `;

  const thumbImgs = detailModalBody.querySelectorAll('.thumb-img');
  const mainDetailImg = detailModalBody.querySelector('#main-detail-img');
  thumbImgs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbImgs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      mainDetailImg.src = thumb.dataset.src;
    });
  });

  const sizeBtns = detailModalBody.querySelectorAll('.size-selector-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.dataset.size;
    });
  });

  const colorSwatches = detailModalBody.querySelectorAll('.color-selector-swatch');
  const colorLabel = detailModalBody.querySelector('#selected-color-label');
  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      colorSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      selectedColor = swatch.dataset.color;
      colorLabel.textContent = selectedColor;
    });
  });

  detailModalBody.querySelector('#modal-add-to-bag').addEventListener('click', () => {
    addToCart(product, selectedSize, selectedColor);
    toggleProductModal(false);
  });

  toggleProductModal(true);
}

function toggleProductModal(open) {
  if (open) {
    detailModal.classList.add('active');
    detailModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    detailModal.classList.remove('active');
    detailModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* --- INTERACTIVE FOOTER PAGES ROUTER --- */
const INFO_PAGES_CONTENT = {
  'careers': `
    <h2 class="info-page-title">Career at Threadzy</h2>
    <div class="info-page-section">
      <h4>Join Our Creative Squad</h4>
      <p>Threadzy is one of the fastest growing premium streetwear brands. We value creativity, diverse ideas, and self-expression. Our corporate headquarters are located in the heart of Mumbai, designing high-fashion trends for global release.</p>
    </div>
    <div class="info-page-section">
      <h4>Open Positions (Mumbai HQ)</h4>
      <div class="jobs-list">
        <div class="job-card">
          <div>
            <div class="job-title">Senior Apparel & Streetwear Designer</div>
            <div class="job-meta">Full Time | Design Department</div>
          </div>
          <button class="btn btn-secondary apply-btn" data-job="Senior Apparel Designer">Apply Now</button>
        </div>
        <div class="job-card">
          <div>
            <div class="job-title">E-commerce Frontend Developer (Vite/JS)</div>
            <div class="job-meta">Full Time | Tech Department</div>
          </div>
          <button class="btn btn-secondary apply-btn" data-job="Frontend Developer">Apply Now</button>
        </div>
        <div class="job-card">
          <div>
            <div class="job-title">Social Media Marketer & Content Creator</div>
            <div class="job-meta">Part Time | Marketing Squad</div>
          </div>
          <button class="btn btn-secondary apply-btn" data-job="Social Media Marketer">Apply Now</button>
        </div>
      </div>
    </div>
  `,
  'about': `
    <h2 class="info-page-title">About Threadzy Group</h2>
    <div class="info-page-section">
      <h4>The Story of Threadzy</h4>
      <p>Founded in 2026, Threadzy was born out of a desire to build a premium streetwear brand that mimics the detailed editorial layout of luxury brands but offers affordable pricing. We believe clothing is an art form, which is why we specialize in custom embroidery, high-comfort oversized fit tees, and graphic concepts.</p>
      <p>Today, our designs reach thousands of customers worldwide, running on high-performance infrastructure and delivering curated seasonal drops that define the next generation of streetwear.</p>
    </div>
    <div class="info-page-section">
      <h4>Our Philosophy</h4>
      <p><strong>Quality First:</strong> We utilize heavy cotton (240 GSM+) and organic flax linen in our shirts and tees.</p>
      <p><strong>Aesthetic Curation:</strong> Every graphic, font choice, and line-art is generated and curated by our design studio to ensure visual harmony.</p>
    </div>
  `,
  'sustainability': `
    <h2 class="info-page-title">Sustainability (Conscious Choice)</h2>
    <div class="info-page-section">
      <h4>Our Green Commitment</h4>
      <p>At Threadzy, we believe fashion should not cost the earth. Our <strong>"Conscious Choice"</strong> labels identify products that are made with at least 50% sustainable materials, such as organic cotton and recycled linen.</p>
    </div>
    <div class="info-page-section">
      <h4>Key Actions we take</h4>
      <p>🌿 <strong>Organic Materials:</strong> We have banned chemical pesticides in our cotton suppliers.</p>
      <p>📦 <strong>Plastic-Free Packaging:</strong> All orders are shipped in 100% biodegradable corn-starch mailers and recycled cardboard boxes.</p>
      <p>💧 <strong>Water Saving:</strong> Our factory in India utilizes zero-liquid-discharge water filtering, recycling 98% of industrial dye water.</p>
    </div>
  `,
  'customer-service': `
    <h2 class="info-page-title">Customer Service & FAQ</h2>
    <div class="info-page-section">
      <h4>Frequently Asked Questions</h4>
      <div class="faq-list">
        <div class="faq-item">
          <div class="faq-question">What is the return policy?</div>
          <div class="faq-answer">We offer a 15-day return policy for all unused products with original tags intact. Returns are completely free for Members.</div>
        </div>
        <div class="faq-item">
          <div class="faq-question">How long does shipping take?</div>
          <div class="faq-answer">Standard shipping takes 3-5 business days across India. Express shipping options are available at checkout. Orders above ₹1999 qualify for Free Shipping.</div>
        </div>
        <div class="faq-item">
          <div class="faq-question">Can I cancel my order?</div>
          <div class="faq-answer">Yes, you can cancel your order within 2 hours of booking by contacting our helpline or cancelling from your Threadzy Account.</div>
        </div>
      </div>
    </div>
    <div class="info-page-section">
      <h4>Contact Support Simulator</h4>
      <form id="support-sim-form" style="display: flex; flex-direction: column; gap: 12px; margin-top: 16px;">
        <input type="text" placeholder="Your Name" required class="custom-select" style="background-image: none; padding-right: 14px;">
        <textarea placeholder="Describe your issue..." required class="custom-select" style="background-image: none; padding-right: 14px; height: 100px; font-family: inherit; resize: none;"></textarea>
        <button type="submit" class="btn btn-primary">Submit Ticket</button>
      </form>
    </div>
  `,
  'member-club': `
    <h2 class="info-page-title">Threadzy Member Club</h2>
    <div class="info-page-section">
      <h4>Unlock Exclusive Perks</h4>
      <p>Join the Threadzy Member Club today and get an instant 15% discount on your first order. Membership is completely free.</p>
    </div>
    <div class="info-page-section" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <div class="job-card" style="flex-direction: column; align-items: flex-start; gap: 10px;">
        <strong>Silver Tier (0 - 5000 Points)</strong>
        <p style="font-size: 12px; color: var(--text-muted);">Get free shipping on orders above ₹1999, 10% birthday discount vouchers, and early access to drops.</p>
      </div>
      <div class="job-card" style="flex-direction: column; align-items: flex-start; gap: 10px; border-color: var(--premium-color); background-color: #fbf2db;">
        <strong>Gold Tier (5000+ Points)</strong>
        <p style="font-size: 12px; color: var(--text-muted); color: var(--premium-color);">Get free shipping on ALL orders, 20% birthday discount vouchers, priority support, and exclusive designer collabs.</p>
      </div>
    </div>
    <div class="info-page-section">
      <h4>Join Now</h4>
      <form id="member-sim-form" style="display: flex; gap: 10px; margin-top: 12px;">
        <input type="text" placeholder="Enter mobile number" required class="custom-select" style="background-image: none; padding-right: 14px; flex: 1;">
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    </div>
  `,
  'find-store': `
    <h2 class="info-page-title">Find a Store</h2>
    <div class="info-page-section">
      <h4>Store Locator Simulator</h4>
      <p>Search for Threadzy flagship physical stores near your location. We currently have physical branches in major metro cities.</p>
      <div style="display: flex; gap: 10px; margin-top: 16px;">
        <input type="text" id="store-city-input" placeholder="Enter City (e.g. Mumbai, Delhi, Bangalore)" class="custom-select" style="background-image: none; padding-right: 14px; flex: 1;">
        <button id="store-search-btn" class="btn btn-primary">Search</button>
      </div>
      <div id="store-results-box" style="margin-top: 20px;">
        <!-- Simulated results will appear here -->
      </div>
    </div>
  `,
  'newsletter': `
    <h2 class="info-page-title">Squad Newsletter</h2>
    <div class="info-page-section">
      <h4>Stay Ahead of the Drops</h4>
      <p>Sign up to get the latest streetwear information, exclusive launch codes, and designer notes sent directly to your email.</p>
      <form id="newsletter-sim-form" style="display: flex; flex-direction: column; gap: 12px; margin-top: 16px; max-width: 400px;">
        <input type="email" placeholder="Your Email Address" required class="custom-select" style="background-image: none; padding-right: 14px;">
        <button type="submit" class="btn btn-primary">Subscribe</button>
      </form>
    </div>
  `
};

function openInfoPage(pageKey) {
  const content = INFO_PAGES_CONTENT[pageKey] || `
    <h2 class="info-page-title">Information Page</h2>
    <div class="info-page-section">
      <h4>${pageKey.replace('-', ' ').toUpperCase()}</h4>
      <p>Welcome to Threadzy's corporate information and help page. Threadzy is a simulated H&M clone store providing advanced catalog displays and e-commerce shopping workflows.</p>
    </div>
  `;

  infoModalBody.innerHTML = content;
  toggleInfoModal(true);

  const applyBtns = infoModalBody.querySelectorAll('.apply-btn');
  applyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const job = btn.dataset.job;
      alert(`Simulated Application Successful! Thank you for applying for the '${job}' role at Threadzy. We will review your simulated portfolio!`);
    });
  });

  const supportForm = infoModalBody.querySelector('#support-sim-form');
  if (supportForm) {
    supportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Simulated Success! Your support ticket has been logged. Our simulated agent will reply within 2 hours!');
      supportForm.reset();
    });
  }

  const memberForm = infoModalBody.querySelector('#member-sim-form');
  if (memberForm) {
    memberForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Simulated Success! Registration complete. Welcome to the squad! Your 15% discount code is: MEMBERSQUAD15');
      memberForm.reset();
      toggleInfoModal(false);
    });
  }

  const storeSearchBtn = infoModalBody.querySelector('#store-search-btn');
  const storeCityInput = infoModalBody.querySelector('#store-city-input');
  const storeResultsBox = infoModalBody.querySelector('#store-results-box');
  
  if (storeSearchBtn && storeCityInput && storeResultsBox) {
    storeSearchBtn.addEventListener('click', () => {
      const city = storeCityInput.value.toLowerCase().trim();
      if (city === 'mumbai') {
        storeResultsBox.innerHTML = `
          <div class="job-card" style="margin-bottom: 10px;">
            <div>
              <strong>Threadzy Colaba Flagship Store</strong>
              <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Colaba Causeway, Near Gateway, Mumbai - 400001</div>
            </div>
            <span style="font-size: 12px; font-weight: 700; color: #2e7d32;">Open 10 AM - 10 PM</span>
          </div>
        `;
      } else if (city === 'delhi') {
        storeResultsBox.innerHTML = `
          <div class="job-card" style="margin-bottom: 10px;">
            <div>
              <strong>Threadzy Connaught Place</strong>
              <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Inner Circle, Block C, CP, New Delhi - 110001</div>
            </div>
            <span style="font-size: 12px; font-weight: 700; color: #2e7d32;">Open 11 AM - 9:30 PM</span>
          </div>
        `;
      } else {
        storeResultsBox.innerHTML = `
          <p style="font-size: 13px; color: var(--text-muted);">No simulated flagship store found in '${storeCityInput.value}'. Try searching 'Mumbai' or 'Delhi' for our flagships, or shop 100% online!</p>
        `;
      }
    });
  }
}

function toggleInfoModal(open) {
  if (open) {
    infoModal.classList.add('active');
    infoModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    infoModal.classList.remove('active');
    infoModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* --- EVENT LISTENERS CONFIG --- */
function setupEventListeners() {
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isActive = trigger.classList.contains('active');
      trigger.classList.toggle('active');
      trigger.setAttribute('aria-expanded', !isActive);
    });
  });

  const brandLogo = document.getElementById('brand-logo');
  if (brandLogo) {
    brandLogo.addEventListener('click', (e) => {
      e.preventDefault();
      resetAllFilters();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.dataset.category;
      
      activeFilters.category = cat;
      activeFilters.subcategory = 'all';
      
      document.querySelectorAll('.nav-link, .mobile-link').forEach(l => {
        if (l.dataset.category === cat) {
          l.classList.add('active');
        } else {
          l.classList.remove('active');
        }
      });

      if (cat === 'all') {
        activeCategoryTitle.textContent = 'Shop All';
      } else {
        activeCategoryTitle.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      }

      document.querySelectorAll('.subcategory-btn').forEach(btn => {
        if (btn.dataset.subcategory === 'all') {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      closeSearch();
      renderProducts();
      
      if (heroBanner) {
        if (cat === 'all') {
          heroBanner.style.display = 'flex';
        } else {
          heroBanner.style.display = 'none';
        }
      }
    });
  });

  document.querySelectorAll('.subcategory-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.dataset.subcategory;
      activeFilters.subcategory = sub;

      document.querySelectorAll('.subcategory-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      renderProducts();
      
      const storeLayout = document.querySelector('.store-layout-container');
      if (storeLayout) {
        storeLayout.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  document.querySelectorAll('.info-trigger-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageKey = link.dataset.page;
      openInfoPage(pageKey);
    });
  });

  document.querySelectorAll('.hero-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.targetCategory;
      const matchingLink = document.querySelector(`.nav-link[data-category="${cat}"]`);
      if (matchingLink) matchingLink.click();
      
      const storeLayout = document.querySelector('.store-layout-container');
      if (storeLayout) {
        storeLayout.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if (cartBtn) cartBtn.addEventListener('click', () => toggleCartDrawer(true));
  if (closeCartBtn) closeCartBtn.addEventListener('click', () => toggleCartDrawer(false));
  if (cartDrawerOverlay) cartDrawerOverlay.addEventListener('click', () => toggleCartDrawer(false));

  if (closeDetailBtn) closeDetailBtn.addEventListener('click', () => toggleProductModal(false));
  if (detailModalOverlay) detailModalOverlay.addEventListener('click', () => toggleProductModal(false));

  if (closeInfoBtn) closeInfoBtn.addEventListener('click', () => toggleInfoModal(false));
  if (infoModalOverlay) infoModalOverlay.addEventListener('click', () => toggleInfoModal(false));

  if (searchToggleBtn) {
    searchToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchContainer.classList.toggle('active');
      if (searchContainer.classList.contains('active')) {
        searchInput.focus();
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (searchContainer && searchContainer.classList.contains('active') && !searchContainer.contains(e.target) && e.target !== searchToggleBtn) {
      closeSearch();
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeFilters.searchQuery = e.target.value;
      renderProducts();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      activeFilters.searchQuery = '';
      renderProducts();
      searchInput.focus();
    });
  }

  if (priceSlider) {
    priceSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      activeFilters.priceMax = val;
      priceValEl.textContent = `₹${val}`;
      renderProducts();
    });
  }

  document.querySelectorAll('.color-swatch-filter').forEach(swatch => {
    swatch.addEventListener('click', () => {
      const color = swatch.dataset.color;
      const idx = activeFilters.colors.indexOf(color);
      if (idx === -1) {
        activeFilters.colors.push(color);
        swatch.classList.add('active');
      } else {
        activeFilters.colors.splice(idx, 1);
        swatch.classList.remove('active');
      }
      renderProducts();
    });
  });

  document.querySelectorAll('.size-btn-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      const size = btn.dataset.size;
      const idx = activeFilters.sizes.indexOf(size);
      if (idx === -1) {
        activeFilters.sizes.push(size);
        btn.classList.add('active');
      } else {
        activeFilters.sizes.splice(idx, 1);
        btn.classList.remove('active');
      }
      renderProducts();
    });
  });

  document.querySelectorAll('.fit-checkbox').forEach(box => {
    box.addEventListener('change', () => {
      const fit = box.value;
      const idx = activeFilters.fits.indexOf(fit);
      if (box.checked) {
        if (idx === -1) activeFilters.fits.push(fit);
      } else {
        if (idx > -1) activeFilters.fits.splice(idx, 1);
      }
      renderProducts();
    });
  });

  document.querySelectorAll('.pattern-checkbox').forEach(box => {
    box.addEventListener('change', () => {
      const pattern = box.value;
      const idx = activeFilters.patterns.indexOf(pattern);
      if (box.checked) {
        if (idx === -1) activeFilters.patterns.push(pattern);
      } else {
        if (idx > -1) activeFilters.patterns.splice(idx, 1);
      }
      renderProducts();
    });
  });

  if (sortSelector) {
    sortSelector.addEventListener('change', (e) => {
      activeFilters.sortBy = e.target.value;
      renderProducts();
    });
  }

  if (clearAllFiltersBtn) clearAllFiltersBtn.addEventListener('click', resetAllFilters);
  if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetAllFilters);

  if (filterMobileToggleBtn) {
    filterMobileToggleBtn.addEventListener('click', () => {
      sidebarAside.classList.toggle('active-mobile');
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      toggleCartDrawer(false);
      const randOrder = 'TZ-' + Math.floor(10000 + Math.random() * 90000) + '-' + Math.floor(10 + Math.random() * 90);
      if (successOrderId) successOrderId.textContent = randOrder;
      
      cart = [];
      localStorage.removeItem('threadzy_cart');
      updateCartUI();

      if (successOverlay) {
        successOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  if (successCloseBtn) {
    successCloseBtn.addEventListener('click', () => {
      if (successOverlay) {
        successOverlay.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value;
      alert(`Simulated Success! Thank you for subscribing with ${email}. A 15% Member club code has been sent!`);
      newsletterEmail.value = '';
    });
  }
}

function closeSearch() {
  if (searchContainer && searchContainer.classList.contains('active')) {
    searchContainer.classList.remove('active');
    searchInput.value = '';
    activeFilters.searchQuery = '';
    renderProducts();
  }
}

function resetAllFilters() {
  activeFilters = {
    category: activeFilters.category,
    subcategory: activeFilters.subcategory,
    priceMax: 4999,
    colors: [],
    sizes: [],
    fits: [],
    patterns: [],
    searchQuery: '',
    sortBy: 'default'
  };

  if (priceSlider) {
    priceSlider.value = 4999;
    priceValEl.textContent = '₹4999';
  }

  document.querySelectorAll('.color-swatch-filter').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.size-btn-filter').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.fit-checkbox').forEach(box => box.checked = false);
  document.querySelectorAll('.pattern-checkbox').forEach(box => box.checked = false);
  
  if (sortSelector) sortSelector.value = 'default';
  
  closeSearch();
  
  if (sidebarAside) sidebarAside.classList.remove('active-mobile');

  renderProducts();
}

document.addEventListener('DOMContentLoaded', init);

if (document.readyState === 'interactive' || document.readyState === 'complete') {
  init();
}
