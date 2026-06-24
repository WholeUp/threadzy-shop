import './style.css'
import heroBannerImg from './assets/hero_banner.png'
import gsap from 'gsap'

const PRODUCTS = [
  // --- LADIES (6 Products - strictly women's clothes) ---
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
    hoverImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&h=533&q=80",
    description: "A chic ribbed one-shoulder top featuring an elegant draped sleeve. Tailored in a comfortable slim fit, this top is perfect for pairing with trousers or denim."
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
    hoverImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&h=533&q=80",
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
    hoverImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=400&h=533&q=80",
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
    hoverImage: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&h=533&q=80",
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
    hoverImage: "https://images.unsplash.com/photo-1620012253295-c05518e99309?auto=format&fit=crop&w=400&h=533&q=80",
    description: "Sophisticated satin blouse with a draped cowl neck and sleeveless construction. Designed for a fluid, elegant silhouette."
  },
  {
    id: 6,
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
    hoverImage: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=400&h=533&q=80",
    description: "An elegant one-shoulder maxi dress in fluid, draped fabric. Perfect for special summer occasions."
  },

  // --- MEN (6 Products - strictly men's clothes, no suits, no skinny jeans) ---
  {
    id: 7,
    name: "Vintage Corduroy Overshirt",
    category: "men",
    subcategory: "shirts",
    tag: "New Arrival",
    price: 2499,
    originalPrice: null,
    isSale: false,
    colors: ["Brown", "Olive", "Black"],
    sizes: ["S", "M", "L", "XL"],
    fit: "Relaxed Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1598032895397-c24d0ab3a73f?auto=format&fit=crop&w=400&h=533&q=80",
    description: "A retro-style corduroy overshirt in midweight cotton. Features double chest button pockets and a relaxed silhouette, ideal for layering."
  },
  {
    id: 8,
    name: "Heavyweight Drop-Shoulder Graphic Tee",
    category: "men",
    subcategory: "t-shirts",
    tag: "Trending",
    price: 1199,
    originalPrice: 1599,
    isSale: true,
    colors: ["Black", "Grey"],
    sizes: ["M", "L", "XL", "XXL"],
    fit: "Oversized",
    pattern: "Graphic Print",
    mainImage: "https://images.unsplash.com/photo-1503341455253-b264b287b2e7?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=400&h=533&q=80",
    description: "High-quality 240 GSM heavy cotton jersey t-shirt. Features a custom vintage graphic print on the back and dropped shoulders."
  },
  {
    id: 9,
    name: "Relaxed Canvas Cargo Pants",
    category: "men",
    subcategory: "pants",
    tag: "Premium Quality",
    price: 2799,
    originalPrice: null,
    isSale: false,
    colors: ["Sage", "Black", "Beige"],
    sizes: ["30", "32", "34", "36"],
    fit: "Relaxed Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1506629082925-6fc6b7ab2249?auto=format&fit=crop&w=400&h=533&q=80",
    description: "Durable cotton canvas cargo pants featuring classic utility side pockets, reinforced knees, and an adjustable waistband."
  },
  {
    id: 10,
    name: "Classic Straight Selvedge Denim",
    category: "men",
    subcategory: "jeans",
    tag: "Conscious Choice",
    price: 3299,
    originalPrice: null,
    isSale: false,
    colors: ["Navy", "Grey"],
    sizes: ["30", "32", "34", "36"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&w=400&h=533&q=80",
    description: "Premium straight-leg jeans crafted from organic selvedge denim. Rigid feel that softens beautifully with wear. Indigo wash."
  },
  {
    id: 11,
    name: "Structured Canvas Coach Jacket",
    category: "men",
    subcategory: "jackets",
    tag: "Trending",
    price: 3499,
    originalPrice: 4499,
    isSale: true,
    colors: ["Olive", "Black"],
    sizes: ["S", "M", "L", "XL"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=400&h=533&q=80",
    description: "Street-ready coach jacket made in heavy canvas. Features a snap-button front, drawstring hem, and inner lining for extra comfort."
  },
  {
    id: 12,
    name: "Acid-Wash Oversized Hooded Sweatshirt",
    category: "men",
    subcategory: "hoodies",
    tag: "New Arrival",
    price: 2199,
    originalPrice: null,
    isSale: false,
    colors: ["Grey", "Navy"],
    sizes: ["M", "L", "XL", "XXL"],
    fit: "Oversized",
    pattern: "Patterned",
    mainImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&h=533&q=80",
    description: "Oversized hoodie in heavy French terry fabric featuring an individual acid-wash finish. Double-layered hood without drawstrings."
  },

  // --- KIDS (6 Products - Kids clothes & toys, non-repeating) ---
  {
    id: 13,
    name: "Organic Cotton Dungaree Set",
    category: "kids",
    subcategory: "clothes",
    tag: "Conscious Choice",
    price: 1299,
    originalPrice: null,
    isSale: false,
    colors: ["Sage", "Beige"],
    sizes: ["2Y", "3Y", "4Y", "5Y"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=400&h=533&q=80",
    description: "A comfortable kids outfit made from 100% organic cotton canvas. Features adjustable button straps and a soft matching inner tee."
  },
  {
    id: 14,
    name: "Cozy Fleece Hooded Romper",
    category: "kids",
    subcategory: "clothes",
    tag: "New Arrival",
    price: 999,
    originalPrice: 1399,
    isSale: true,
    colors: ["Cream", "Grey"],
    sizes: ["1Y", "2Y", "3Y"],
    fit: "Relaxed Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1622290319146-7b63df48a635?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=400&h=533&q=80",
    description: "Extra soft, warm fleece romper with cute animal ear details on the hood. Zip front for quick changes."
  },
  {
    id: 15,
    name: "Striped Linen Summer Dress",
    category: "kids",
    subcategory: "clothes",
    tag: "Trending",
    price: 1499,
    originalPrice: null,
    isSale: false,
    colors: ["White", "Beige"],
    sizes: ["3Y", "4Y", "5Y", "6Y"],
    fit: "Regular Fit",
    pattern: "Striped",
    mainImage: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=400&h=533&q=80",
    description: "Airy summer dress made of a soft linen-viscose blend. Gathered waist and sweet tie-shoulder straps."
  },
  {
    id: 16,
    name: "Handcrafted Wooden Train Set",
    category: "kids",
    subcategory: "toys",
    tag: "Premium Quality",
    price: 1899,
    originalPrice: null,
    isSale: false,
    colors: ["Cream"],
    sizes: ["One Size"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1537758061216-0499eaec4bc2?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&h=533&q=80",
    description: "Classic 15-piece wooden toy train and tracks. Crafted from sustainably sourced, non-toxic, child-safe beech wood."
  },
  {
    id: 17,
    name: "Premium Organic Cotton Teddy Bear",
    category: "kids",
    subcategory: "toys",
    tag: "Trending",
    price: 799,
    originalPrice: 1199,
    isSale: true,
    colors: ["Brown", "Cream"],
    sizes: ["One Size"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1537758061216-0499eaec4bc2?auto=format&fit=crop&w=400&h=533&q=80",
    description: "Extra soft, cuddly teddy bear stuffed with 100% hypoallergenic organic cotton. Features custom stitched details."
  },
  {
    id: 18,
    name: "Creative Wooden Building Blocks",
    category: "kids",
    subcategory: "toys",
    tag: "New Arrival",
    price: 1599,
    originalPrice: null,
    isSale: false,
    colors: ["Cream"],
    sizes: ["One Size"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&h=533&q=80",
    description: "A set of 40 wooden building blocks in geometric shapes. Encourages fine motor skills, spatial reasoning, and creative play."
  },

  // --- BEAUTY (6 Products - branded cosmetics, non-repeating) ---
  {
    id: 19,
    name: "Chanel Rouge Allure Matte Lipstick",
    category: "beauty",
    subcategory: "lipstick",
    tag: "Premium Quality",
    price: 3699,
    originalPrice: null,
    isSale: false,
    colors: ["Red", "Pink"],
    sizes: ["Standard"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&h=533&q=80",
    description: "A luxury matte lipstick with intense pigmentation and a velvety second-skin finish. Infused with sweet almond oil for absolute comfort."
  },
  {
    id: 20,
    name: "Estée Lauder Night Cleansing Gel",
    category: "beauty",
    subcategory: "facewash",
    tag: "Trending",
    price: 2499,
    originalPrice: 2999,
    isSale: true,
    colors: ["White"],
    sizes: ["150ml"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=400&h=533&q=80",
    description: "Advanced micro-cleansing foam wash. Removes makeup and impurities deep within the skin's surface, leaving skin refreshed."
  },
  {
    id: 21,
    name: "Dior Backstage Glow Face Palette",
    category: "beauty",
    subcategory: "makeup-kit",
    tag: "Premium Quality",
    price: 4899,
    originalPrice: null,
    isSale: false,
    colors: ["Cream", "Pink"],
    sizes: ["Standard"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1590156546746-c2370f8c371b?auto=format&fit=crop&w=400&h=533&q=80",
    description: "The secret palette of Dior makeup artists. Features four gorgeous shimmering shades that blend seamlessly to illuminate all skin tones."
  },
  {
    id: 22,
    name: "NARS Liquid Blush Tint (Orgasm)",
    category: "beauty",
    subcategory: "blush",
    tag: "Trending",
    price: 2899,
    originalPrice: null,
    isSale: false,
    colors: ["Pink"],
    sizes: ["15ml"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&h=533&q=80",
    description: "Iconic liquid blush that glides on smoothly for a healthy, natural-looking glow. Infused with Monoi and Tamanu oils for moisture."
  },
  {
    id: 23,
    name: "Real Techniques Powder Brush Set",
    category: "beauty",
    subcategory: "brushes",
    tag: "Standard Fit",
    price: 1299,
    originalPrice: 1799,
    isSale: true,
    colors: ["Orange"],
    sizes: ["5 Brushes"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&h=533&q=80",
    description: "Set of 5 professional cosmetic brushes featuring ultra-plush synthetic bristles for blending, contouring, and flawless finish."
  },
  {
    id: 24,
    name: "Maybelline Tattoo Liquid Liner & Kajal",
    category: "beauty",
    subcategory: "eyeliner",
    tag: "New Arrival",
    price: 699,
    originalPrice: null,
    isSale: false,
    colors: ["Black"],
    sizes: ["Standard"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1590156546746-c2370f8c371b?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=400&h=533&q=80",
    description: "High-intensity waterproof liquid eyeliner and matte black kajal set. Smudge-proof and lasts up to 36 hours."
  },

  // --- SPORTS (6 Products - Sports clothes & equipment, non-repeating) ---
  {
    id: 25,
    name: "Men's Dry-Fit Athletic Gym Tee",
    category: "sport",
    subcategory: "clothes",
    tag: "Trending",
    price: 999,
    originalPrice: 1299,
    isSale: true,
    colors: ["Grey", "Navy", "Black"],
    sizes: ["S", "M", "L", "XL"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&h=533&q=80",
    description: "High-performance dry-fit sports tee. Engineered with breathable, moisture-wicking mesh fabrics to keep you dry and cool."
  },
  {
    id: 26,
    name: "Women's High-Rise Seamless Leggings",
    category: "sport",
    subcategory: "clothes",
    tag: "Premium Quality",
    price: 1899,
    originalPrice: null,
    isSale: false,
    colors: ["Black", "Sage"],
    sizes: ["XS", "S", "M", "L"],
    fit: "Slim Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&h=533&q=80",
    description: "Squat-proof seamless activewear leggings with a supportive high waistband. Offers maximum flexibility and compression."
  },
  {
    id: 27,
    name: "Unisex Trail Runner Windbreaker",
    category: "sport",
    subcategory: "clothes",
    tag: "New Arrival",
    price: 2499,
    originalPrice: null,
    isSale: false,
    colors: ["Navy", "Grey"],
    sizes: ["S", "M", "L", "XL"],
    fit: "Relaxed Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&h=533&q=80",
    description: "Ultralight water-repellent windbreaker jacket. Packable design featuring zip pockets and adjustable hoods."
  },
  {
    id: 28,
    name: "Wilson Pro Staff Tennis Racket",
    category: "sport",
    subcategory: "equipment",
    tag: "Premium Quality",
    price: 4999,
    originalPrice: null,
    isSale: false,
    colors: ["Black"],
    sizes: ["Standard"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1606244864456-8bee63fdb47e?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&h=533&q=80",
    description: "Professional graphite tennis racket offering supreme control and classic crisp feel. Pre-strung with high-tension strings."
  },
  {
    id: 29,
    name: "Adidas Premium Non-Slip Yoga Mat",
    category: "sport",
    subcategory: "equipment",
    tag: "Trending",
    price: 1499,
    originalPrice: 1999,
    isSale: true,
    colors: ["Sage"],
    sizes: ["One Size"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&h=533&q=80",
    description: "Eco-friendly TPE yoga mat (6mm thickness). Non-slip textured surface provides excellent traction and joint cushioning."
  },
  {
    id: 30,
    name: "Spalding TF-1000 Indoor Basketball",
    category: "sport",
    subcategory: "equipment",
    tag: "New Arrival",
    price: 2999,
    originalPrice: null,
    isSale: false,
    colors: ["Brown"],
    sizes: ["Size 7"],
    fit: "Regular Fit",
    pattern: "Solid Color",
    mainImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&h=533&q=80",
    hoverImage: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=400&h=533&q=80",
    description: "Premium composite leather basketball designed for indoor competitive games. Features moisture-wicking deep channels."
  }
];
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

const CATEGORY_SUBCATEGORIES = {
  all: [
    { id: 'all', label: 'View All' },
    { id: 't-shirts', label: 'T-shirts & Tanks' },
    { id: 'shirts', label: 'Shirts' },
    { id: 'hoodies', label: 'Hoodies & Sweatshirts' },
    { id: 'pants', label: 'Trousers & Joggers' },
    { id: 'jeans', label: 'Jeans' },
    { id: 'jackets', label: 'Jackets & Coats' },
    { id: 'clothes', label: 'Activewear & Kids Clothes' },
    { id: 'toys', label: 'Toys' },
    { id: 'lipstick', label: 'Lipstick' },
    { id: 'facewash', label: 'Facewash' },
    { id: 'makeup-kit', label: 'Makeup Kit' },
    { id: 'blush', label: 'Blush' },
    { id: 'brushes', label: 'Brushes' },
    { id: 'eyeliner', label: 'Eyeliner & Kajal' },
    { id: 'mascara', label: 'Mascara' },
    { id: 'equipment', label: 'Sports Equipment' }
  ],
  ladies: [
    { id: 'all', label: 'View All' },
    { id: 't-shirts', label: 'T-shirts & Tanks' },
    { id: 'shirts', label: 'Shirts' },
    { id: 'hoodies', label: 'Hoodies & Sweatshirts' },
    { id: 'pants', label: 'Trousers & Joggers' },
    { id: 'jeans', label: 'Jeans' },
    { id: 'jackets', label: 'Jackets & Coats' }
  ],
  men: [
    { id: 'all', label: 'View All' },
    { id: 't-shirts', label: 'T-shirts & Tanks' },
    { id: 'shirts', label: 'Shirts' },
    { id: 'hoodies', label: 'Hoodies & Sweatshirts' },
    { id: 'pants', label: 'Trousers & Joggers' },
    { id: 'jeans', label: 'Jeans' },
    { id: 'jackets', label: 'Jackets & Coats' }
  ],
  kids: [
    { id: 'all', label: 'View All' },
    { id: 'clothes', label: 'Clothing' },
    { id: 'toys', label: 'Toys' }
  ],
  beauty: [
    { id: 'all', label: 'View All' },
    { id: 'lipstick', label: 'Lipstick' },
    { id: 'facewash', label: 'Facewash' },
    { id: 'makeup-kit', label: 'Makeup Kit' },
    { id: 'blush', label: 'Blush' },
    { id: 'brushes', label: 'Brushes' },
    { id: 'eyeliner', label: 'Eyeliner & Kajal' },
    { id: 'mascara', label: 'Mascara' }
  ],
  sport: [
    { id: 'all', label: 'View All' },
    { id: 'clothes', label: 'Activewear' },
    { id: 'equipment', label: 'Sports Equipment' }
  ],
  sale: [
    { id: 'all', label: 'View All' },
    { id: 't-shirts', label: 'T-shirts & Tanks' },
    { id: 'shirts', label: 'Shirts' },
    { id: 'hoodies', label: 'Hoodies & Sweatshirts' },
    { id: 'pants', label: 'Trousers & Joggers' },
    { id: 'jeans', label: 'Jeans' },
    { id: 'jackets', label: 'Jackets & Coats' },
    { id: 'clothes', label: 'Clothing' },
    { id: 'toys', label: 'Toys' },
    { id: 'lipstick', label: 'Lipstick' },
    { id: 'facewash', label: 'Facewash' },
    { id: 'makeup-kit', label: 'Makeup Kit' },
    { id: 'blush', label: 'Blush' },
    { id: 'brushes', label: 'Brushes' },
    { id: 'eyeliner', label: 'Eyeliner & Kajal' },
    { id: 'mascara', label: 'Mascara' },
    { id: 'equipment', label: 'Sports Equipment' }
  ]
};

function renderSubcategorySidebar(cat) {
  const container = document.getElementById('subcategory-links');
  if (!container) return;
  
  const subs = CATEGORY_SUBCATEGORIES[cat] || CATEGORY_SUBCATEGORIES.all;
  container.innerHTML = subs.map(sub => {
    const activeClass = sub.id === activeFilters.subcategory ? 'active' : '';
    return `<li><button class="subcategory-btn ${activeClass}" data-subcategory="${sub.id}">${sub.label}</button></li>`;
  }).join('');

  // Re-attach listeners to the new buttons
  container.querySelectorAll('.subcategory-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.dataset.subcategory;
      activeFilters.subcategory = sub;

      container.querySelectorAll('.subcategory-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      renderProducts();
      
      const storeLayout = document.querySelector('.store-layout-container');
      if (storeLayout) {
        storeLayout.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

let hasInit = false;
/* --- INITIALIZATION --- */
function init() {
  if (hasInit) return;
  hasInit = true;
  initHero();
  setupEventListeners();
  initAshwiniChatbot();
  renderSubcategorySidebar(activeFilters.category);
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
  
  // GSAP stagger card entry animation
  gsap.from('.product-card', {
    duration: 0.5,
    y: 20,
    opacity: 0,
    stagger: 0.03,
    ease: 'power1.out',
    overwrite: 'auto'
  });
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

      renderSubcategorySidebar(cat);
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

function initAshwiniChatbot() {
  const toggleBtn = document.getElementById('ashwini-chat-toggle');
  const chatWindow = document.getElementById('ashwini-chat-window');
  const closeBtn = document.getElementById('close-ashwini-chat');
  const chatForm = document.getElementById('ashwini-chat-form');
  const chatInput = document.getElementById('ashwini-chat-input');
  const messagesContainer = document.getElementById('ashwini-chat-messages');
  const suggestionsContainer = document.getElementById('chat-suggestions');

  if (!toggleBtn || !chatWindow) return;

  // Toggle Chat Window
  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    chatWindow.classList.toggle('hidden');
    // Hide ping badge once clicked
    const ping = toggleBtn.querySelector('.chat-ping');
    if (ping) ping.style.display = 'none';

    if (!chatWindow.classList.contains('hidden')) {
      chatInput.focus();
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });

  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    chatWindow.classList.add('hidden');
  });

  // Welcome message from Ashwini
  appendAgentMessage("Hello! 👋 Main hoon **Ashwini**, aapki Threadzy Personal Shopping Expert. 🌟\n\nMain yahan aapki shopping ko super easy banane ke liye hoon! Aap mujhse:\n- **Ladies, Men, Kids, Beauty, ya Sports** ki items dekhne ke liye keh sakte hain,\n- Apne bag/cart ko view karne ke liye bol sakte hain,\n- Sizing aur shipping details pooch sakte hain,\n- Ya fir seedhe product ko cart me add karwa sakte hain!\n\nAaj aapko kya purchase karna hai? Mujhe bataiye! 👇");

  // Handle Form Submit
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    // Append User Message
    appendUserMessage(text);
    chatInput.value = '';

    // Handle Reply
    handleChatbotReply(text);
  });

  // Handle Suggestion Chips click
  if (suggestionsContainer) {
    suggestionsContainer.querySelectorAll('.chat-suggest-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const query = btn.dataset.query;
        appendUserMessage(query);
        handleChatbotReply(query);
      });
    });
  }

  function appendUserMessage(text) {
    const row = document.createElement('div');
    row.className = 'chat-msg-row user';
    row.innerHTML = `
      <div class="chat-msg-bubble">${text}</div>
    `;
    messagesContainer.appendChild(row);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function appendAgentMessage(text) {
    const row = document.createElement('div');
    row.className = 'chat-msg-row agent';
    
    // Parse bold text and markdown links
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a class="chat-link" data-action="$2">$1</a>');

    row.innerHTML = `
      <div class="chat-msg-avatar">AI</div>
      <div class="chat-msg-bubble">${formattedText}</div>
    `;
    messagesContainer.appendChild(row);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Attach click listeners to any links inside the reply
    row.querySelectorAll('.chat-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const action = link.dataset.action;
        handleLinkAction(action);
      });
    });
  }

  function showTypingIndicator() {
    const row = document.createElement('div');
    row.className = 'chat-msg-row agent typing-indicator-row';
    row.innerHTML = `
      <div class="chat-msg-avatar">AI</div>
      <div class="chat-msg-bubble typing-indicator" style="display: flex; gap: 4px; align-items: center; padding: 12px;">
        <span></span><span></span><span></span>
      </div>
    `;
    messagesContainer.appendChild(row);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return row;
  }

  function handleChatbotReply(userInput) {
    const indicator = showTypingIndicator();
    const query = userInput.toLowerCase().trim();

    setTimeout(() => {
      // Remove typing indicator
      indicator.remove();

      let reply = "";
      
      // 1. Check intent for showing categories (Agentic control)
      if (query.includes('ladies') || query.includes('women') || query.includes('female') || query.includes('girl')) {
        reply = "Ji bilkul! Maine catalog ko **Ladies** section par filter kar diya hai. Aap elegant dresses, fancy tops, and jeans screen par dekh sakte hain! 👗";
        triggerCategoryChange('ladies');
      } 
      else if (query.includes('men') || query.includes('male') || query.includes('boy') || query.includes('gent')) {
        reply = "Sure! Maine **Men's** collection load kar di hai. Screen par aapko cool shirts, jogger pants, and jackets mil jayenge. 👔";
        triggerCategoryChange('men');
      } 
      else if (query.includes('kids') || query.includes('child') || query.includes('toy')) {
        reply = "Done! **Kids** section open ho gaya hai. Yahan cute kapde aur toys dono hain! 🧸 Aap screen par browse kar sakte hain.";
        triggerCategoryChange('kids');
      } 
      else if (query.includes('beauty') || query.includes('makeup') || query.includes('lipstick') || query.includes('brush') || query.includes('kajal') || query.includes('liner') || query.includes('mascara') || query.includes('facewash') || query.includes('blush')) {
        reply = "Yes! **Beauty** cosmetics load ho chuke hain. 💄 Branded lipsticks, facewash, makeup kits, blush, and liners ab screen par hain.";
        triggerCategoryChange('beauty');
      } 
      else if (query.includes('sport') || query.includes('gym') || query.includes('activewear') || query.includes('racket') || query.includes('yoga') || query.includes('equipment')) {
        reply = "Opening **Sports**! 👟 Men & Women dono ke liye activewear aur high-quality sports equipment (jaise tennis racket aur yoga mats) screen par visible hain.";
        triggerCategoryChange('sport');
      } 
      else if (query.includes('sale') || query.includes('discount') || query.includes('offer') || query.includes('promo')) {
        reply = "Lijiye, **Season Sale** active ho gayi hai! 🏷️ Maine discounted items screen par load kar diye hain. Aap up to 30% save kar sakte hain!";
        triggerCategoryChange('sale');
      } 
      else if (query.includes('show all') || query.includes('all products') || query.includes('view all') || query.includes('reset') || query.includes('sab') || query.includes('poora')) {
        reply = "Saare filters reset kar diye hain! Ab aap **Threadzy** ki poori boutique collection (all 30 premium designs) screen par dekh sakte hain. 🌟";
        resetAllFilters();
      }
      
      // 2. Check intent for Cart control
      else if (query.includes('view cart') || query.includes('show cart') || query.includes('my cart') || query.includes('bag') || query.includes('checkout')) {
        if (cart.length === 0) {
          reply = "Aapka shopping bag abhi empty hai! Kuch cool items add kijiye pehle. Aap mujhe **Best Sellers** dikhane ke liye keh sakte hain!";
        } else {
          const itemsList = cart.map(item => `- ${item.name} (${item.size}, ${item.color}) x${item.quantity}`).join('\n');
          reply = `Aapke shopping bag me ye items hain:\n${itemsList}\n\nKya aap checkout karna chahte hain? Click kijiye: [Proceed to Checkout](checkout) 🛒`;
        }
        toggleCartDrawer(true);
      }
      else if (query.includes('add') && (query.includes('cart') || query.includes('bag'))) {
        // Try to find a matching product from visible ones
        let match = null;
        
        // Check if there is an ID specified (e.g. "product 5" or "id 5" or "item 5")
        const idMatch = query.match(/(?:id|product|item)\s*(\d+)/i);
        if (idMatch) {
          const id = parseInt(idMatch[1]);
          match = PRODUCTS.find(p => p.id === id);
        } else {
          // Find first product whose name is a substring of query
          match = PRODUCTS.find(p => query.includes(p.name.toLowerCase()));
          if (!match) {
            // Find by keywords in product name
            const keywords = query.replace('add', '').replace('to', '').replace('cart', '').replace('bag', '').split(' ');
            match = PRODUCTS.find(p => keywords.some(k => k.length > 3 && p.name.toLowerCase().includes(k)));
          }
        }

        if (match) {
          const size = match.sizes.includes('M') ? 'M' : match.sizes[0];
          const color = match.colors[0];
          addToCart(match, size, color);
          reply = `Awesome choice! Maine **${match.name}** (Size: ${size}, Color: ${color}) aapke shopping bag me add kar diya hai! 🛒`;
        } else {
          // If no product is matched, offer to add a recommended popular item
          const rec = PRODUCTS[0]; // Ribbed Top
          reply = `Mujhe woh product nahi mila. Kya main humare best-selling **${rec.name}** ko aapke cart me add ko doon? [Haan, add kar do!](add_rec)`;
        }
      }
      
      // 3. FAQs & General knowledge
      else if (query.includes('shipping') || query.includes('delivery')) {
        reply = "Threadzy par ₹1999 se upar ke orders par **Free Delivery** milti hai! Usse kam ke orders par shipping ₹149 hai. Delivery me **3 to 5 business days** lagte hain. 🚚";
      }
      else if (query.includes('return') || query.includes('exchange')) {
        reply = "Humari **15-day easy return policy** hai! Tags attached hone chahiye aur product unused hona chahiye. Returns ekdum free hain! 🔄";
      }
      else if (query.includes('size') || query.includes('sizing') || query.includes('fit')) {
        reply = "Humare sizes **XS se XXL** tak aate hain. Fits me *Slim Fit* (fitted), *Regular Fit* (standard), aur *Oversized* (loose/boxy, perfect for streetwear) options hain. Aapka standard size kya hai? 📏";
      }
      else if (query.includes('coupon') || query.includes('code') || query.includes('discount') || query.includes('promo')) {
        reply = "Aapke liye ek special coupon code hai! Checkout par **ASHWINI15** coupon code use kijiye aur paiye flat **15% OFF**! 🎫";
      }
      else if (query.includes('best seller') || query.includes('popular') || query.includes('trend')) {
        reply = "Humare top trending items ye hain:\n1. **Ribbed One-Shoulder Drape Top** (Ladies)\n2. **Chanel Matte Lip Crayon** (Beauty)\n3. **Wilson Professional Tennis Racket** (Sport)\n4. **Oversized Graphic Tees** (Men)\n\nAap inme se kya explore karna chahenge? 🌟";
      }
      else if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('help') || query.includes('hola') || query.includes('namaste')) {
        reply = "Hello! 😊 Main Ashwini hoon. Main aapke liye products filter kar sakti hoon, sizes check kar sakti hoon, discount coupon de sakti hoon, ya product ko cart me add kar sakti hoon. Aap aaj kya dhoondh rahe hain?";
      }
      else {
        reply = "Mujhe thoda samajh nahi aaya, par main seekh rahi hoon! 🧠 Aap mujhse *'Ladies section dikhao'*, *'Beauty products dikhao'*, *'Cart dikhao'* ya *'Shipping rules kya hain'* pooch sakte hain!";
      }

      appendAgentMessage(reply);
    }, 800 + Math.random() * 600); // Realistic simulated typing speed
  }

  function triggerCategoryChange(category) {
    const link = document.querySelector(`.nav-link[data-category="${category}"], .mobile-link[data-category="${category}"]`);
    if (link) {
      link.click();
    } else if (category === 'sale') {
      const saleLink = document.querySelector(`.nav-link[data-category="sale"], .mobile-link[data-category="sale"]`);
      if (saleLink) saleLink.click();
    }
  }

  function handleLinkAction(action) {
    if (action === 'checkout') {
      const checkoutBtn = document.getElementById('checkout-btn');
      if (checkoutBtn) checkoutBtn.click();
    } else if (action === 'add_rec') {
      const rec = PRODUCTS[0];
      const size = rec.sizes.includes('M') ? 'M' : rec.sizes[0];
      const color = rec.colors[0];
      addToCart(rec, size, color);
      appendAgentMessage(`Added **${rec.name}** to your cart! 🛍️`);
    }
  }
}

document.addEventListener('DOMContentLoaded', init);

if (document.readyState === 'interactive' || document.readyState === 'complete') {
  init();
}
