import './style.css'

// Import asset images
import heroBannerImg from './assets/hero_banner.png'
import sakuraLinenImg from './assets/sakura_linen.png'
import signatureTeeImg from './assets/signature_tee.png'
import cyberpunkTeeImg from './assets/cyberpunk_tee.png'
import oasisShirtImg from './assets/oasis_shirt.png'
import vintageTeeImg from './assets/vintage_tee.png'
import utilityJacketImg from './assets/utility_jacket.png'
import lineArtTeeImg from './assets/line_art_tee.png'
import retroSunsetImg from './assets/retro_sunset.png'

// Product Database
const PRODUCTS = [
  {
    id: 1,
    name: 'Sakura Linen Shirt',
    category: 'men',
    tag: 'Premium Quality',
    price: 2499,
    originalPrice: 3499,
    isSale: true,
    colors: ['Cream', 'White'],
    sizes: ['S', 'M', 'L', 'XL'],
    mainImage: sakuraLinenImg,
    hoverImage: sakuraLinenImg,
    description: 'Crafted from premium European flax linen, this relaxed-fit resort shirt features delicate cherry blossom (sakura) embroidery on the chest pocket. Highly breathable, soft-washed texture, and vintage-style coconut buttons. Perfect for warm-weather styling.'
  },
  {
    id: 2,
    name: 'Signature Streetwear Tee',
    category: 'divided',
    tag: 'Trending',
    price: 1499,
    originalPrice: null,
    isSale: false,
    colors: ['Black', 'White'],
    sizes: ['M', 'L', 'XL'],
    mainImage: signatureTeeImg,
    hoverImage: signatureTeeImg,
    description: 'An oversized, heavy-cotton streetwear t-shirt (240 GSM) showcasing an aesthetic white line-art graphic design on the chest. Designed with a structured boxy fit, dropped shoulders, and a thick rib-knit crewneck collar.'
  },
  {
    id: 3,
    name: 'Cyberpunk Grid Tee',
    category: 'divided',
    tag: 'Sale',
    price: 1299,
    originalPrice: 1999,
    isSale: true,
    colors: ['Navy', 'Black'],
    sizes: ['S', 'M', 'L'],
    mainImage: cyberpunkTeeImg,
    hoverImage: cyberpunkTeeImg,
    description: 'Add a futuristic touch to your streetwear rotation. This deep navy blue graphic tee features a high-density glowing cyan cyber-grid vector graphic. Crafted from ultra-soft combed cotton for maximum comfort.'
  },
  {
    id: 4,
    name: 'Abstract Oasis Resort Shirt',
    category: 'men',
    tag: 'New Arrival',
    price: 2999,
    originalPrice: null,
    isSale: false,
    colors: ['Beige', 'Cream'],
    sizes: ['S', 'M', 'L', 'XL'],
    mainImage: oasisShirtImg,
    hoverImage: oasisShirtImg,
    description: 'A luxurious short-sleeve resort shirt with a camp collar. Designed with a custom hand-painted abstract earthy oasis pattern. The silky viscose-linen blend fabric drapes beautifully, making it an editorial standout.'
  },
  {
    id: 5,
    name: 'Vintage Tokyo Dreams Tee',
    category: 'divided',
    tag: 'Trending',
    price: 1599,
    originalPrice: null,
    isSale: false,
    colors: ['Cream', 'White'],
    sizes: ['M', 'L', 'XL'],
    mainImage: vintageTeeImg,
    hoverImage: vintageTeeImg,
    description: 'Acid-washed, cream-colored graphic t-shirt featuring distressed retro typography that reads "Tokyo Dreams". A relaxed silhouette with drop shoulders, perfect for pairing with relaxed denim or cargo pants.'
  },
  {
    id: 6,
    name: 'Urban Utility Overshirt',
    category: 'men',
    tag: 'Premium Quality',
    price: 3499,
    originalPrice: null,
    isSale: false,
    colors: ['Sage', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    mainImage: utilityJacketImg,
    hoverImage: utilityJacketImg,
    description: 'Constructed from heavy-duty 100% cotton canvas, this structured utility overshirt in sage green features double chest cargo pockets, custom metal snap buttons, and a clean flat collar. Works perfectly as a light jacket.'
  },
  {
    id: 7,
    name: 'Aesthetic Line-Art Tee',
    category: 'women',
    tag: 'New Arrival',
    price: 1199,
    originalPrice: null,
    isSale: false,
    colors: ['White', 'Black'],
    sizes: ['S', 'M', 'L'],
    mainImage: lineArtTeeImg,
    hoverImage: lineArtTeeImg,
    description: 'Minimalist white graphic tee featuring clean black outline face line-art. Made from lightweight organic cotton, presenting a semi-relaxed feminine drape and super-soft feel for everyday chic wear.'
  },
  {
    id: 8,
    name: 'Retro Sunset Resort Shirt',
    category: 'women',
    tag: 'Sale',
    price: 2299,
    originalPrice: 3299,
    isSale: true,
    colors: ['Beige', 'Cream'],
    sizes: ['S', 'M', 'L'],
    mainImage: retroSunsetImg,
    hoverImage: retroSunsetImg,
    description: 'Soak up the sun in style. This lightweight camp-collar resort shirt showcases a retro sunset stripe pattern in pastel oranges, pinks, and warm beige. Button-up front with an elegant fluid drape.'
  }
];

// State variables
let cart = JSON.parse(localStorage.getItem('threadzy_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('threadzy_wishlist')) || [];
let activeFilters = {
  category: 'all',
  priceMax: 4999,
  colors: [],
  sizes: [],
  searchQuery: '',
  sortBy: 'default'
};

// DOM Elements
const productGrid = document.getElementById('product-grid');
const resultsCount = document.getElementById('results-count');
const emptyState = document.getElementById('empty-state');
const heroBanner = document.getElementById('hero-banner');

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
const filterSidebar = document.getElementById('filter-sidebar');
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

/* --- PRODUCT GRID RENDERING --- */
function renderProducts() {
  // Filter products based on active filters
  let filtered = PRODUCTS.filter(product => {
    // Category check
    if (activeFilters.category !== 'all') {
      if (activeFilters.category === 'sale') {
        if (!product.isSale) return false;
      } else if (product.category !== activeFilters.category) {
        return false;
      }
    }

    // Search Query check
    if (activeFilters.searchQuery.trim() !== '') {
      const query = activeFilters.searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(query);
      const matchDesc = product.description.toLowerCase().includes(query);
      const matchTag = product.tag.toLowerCase().includes(query);
      if (!matchName && !matchDesc && !matchTag) return false;
    }

    // Price check
    if (product.price > activeFilters.priceMax) return false;

    // Colors check
    if (activeFilters.colors.length > 0) {
      const hasColor = product.colors.some(c => activeFilters.colors.includes(c));
      if (!hasColor) return false;
    }

    // Sizes check
    if (activeFilters.sizes.length > 0) {
      const hasSize = product.sizes.some(s => activeFilters.sizes.includes(s));
      if (!hasSize) return false;
    }

    return true;
  });

  // Sort products
  if (activeFilters.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (activeFilters.sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  // Update count label
  resultsCount.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? '' : 's'}`;

  // Toggle empty state
  if (filtered.length === 0) {
    productGrid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  } else {
    emptyState.classList.add('hidden');
  }

  // Generate cards HTML
  productGrid.innerHTML = filtered.map(product => {
    const isWishlisted = wishlist.includes(product.id);
    const saleTag = product.isSale ? `<span class="card-badge sale">Sale</span>` : '';
    const newArrivalTag = product.tag === 'New Arrival' ? `<span class="card-badge new">New</span>` : '';
    const tagToUse = saleTag || newArrivalTag || (product.tag ? `<span class="card-badge new">${product.tag}</span>` : '');

    const priceHTML = product.isSale 
      ? `<span class="sale-price">₹${product.price}</span><span class="original-price">₹${product.originalPrice}</span>`
      : `<span>₹${product.price}</span>`;

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-image-container">
          ${tagToUse}
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
          <span class="product-tag">${product.tag || 'Standard Fit'}</span>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-price-row">
            ${priceHTML}
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Re-attach listeners to new cards
  attachCardListeners();
}

function attachCardListeners() {
  // Card click triggers details modal
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger details if wishlist or quick add buttons are clicked
      if (e.target.closest('.card-wishlist-btn') || e.target.closest('.quick-add-btn')) {
        return;
      }
      const id = parseInt(card.dataset.id);
      openProductDetail(id);
    });
  });

  // Wishlist toggle
  document.querySelectorAll('.card-wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      toggleWishlist(id, btn);
    });
  });

  // Quick Add triggers quick size addition (defaults to M, or opens modal)
  document.querySelectorAll('.quick-add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const product = PRODUCTS.find(p => p.id === id);
      // Automatically add size M (or first available size)
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
    document.body.style.overflow = 'hidden'; // Lock background scroll
  } else {
    cartDrawer.classList.remove('active');
    cartDrawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function addToCart(product, size, color) {
  // Check if item already in cart with same size and color
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
  toggleCartDrawer(true); // Slide open cart drawer on addition
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
  // Update badge count
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

  // Render cart items
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

  // Calculate prices
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal >= 1999 ? 0 : 149;
  const total = subtotal + shipping;

  cartSubtotalEl.textContent = `₹${subtotal}`;
  cartShippingEl.textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
  cartTotalEl.textContent = `₹${total}`;

  // Attach cart listeners
  document.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      removeFromCart(idx);
    });
  });

  document.querySelectorAll('.qty-btn.minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      updateCartQuantity(idx, -1);
    });
  });

  document.querySelectorAll('.qty-btn.plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      updateCartQuantity(idx, 1);
    });
  });
}

/* --- PRODUCT DETAIL MODAL --- */
function openProductDetail(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const priceHTML = product.isSale 
    ? `<span class="sale-price">₹${product.price}</span><span class="original-price">₹${product.originalPrice}</span>`
    : `<span>₹${product.price}</span>`;

  // Pre-selected values
  let selectedSize = product.sizes.includes('M') ? 'M' : product.sizes[0];
  let selectedColor = product.colors[0];

  detailModalBody.innerHTML = `
    <div class="product-detail-layout">
      <!-- Image Gallery -->
      <div class="detail-gallery">
        <div class="main-detail-img-container">
          <img src="${product.mainImage}" alt="${product.name}" class="main-detail-img" id="main-detail-img">
        </div>
        <div class="thumbnail-row">
          <img src="${product.mainImage}" alt="Main View" class="thumb-img active" data-src="${product.mainImage}">
          <img src="${product.hoverImage}" alt="Alt View" class="thumb-img" data-src="${product.hoverImage}">
        </div>
      </div>
      
      <!-- Content Information -->
      <div class="detail-info">
        <span class="detail-tag">${product.tag || 'Standard Fit'}</span>
        <h2 class="detail-title">${product.name}</h2>
        <div class="detail-price-row">${priceHTML}</div>
        <p class="detail-desc">${product.description}</p>
        
        <!-- Colors Selector -->
        <div class="detail-option-group">
          <span class="detail-option-label">Color: <strong id="selected-color-label">${selectedColor}</strong></span>
          <div class="color-selector-grid">
            ${product.colors.map((c, i) => {
              const bgStyle = c === 'Black' ? '#1a1a1a' : 
                              c === 'White' ? '#fafafa' : 
                              c === 'Cream' ? '#f5f2eb' : 
                              c === 'Navy' ? '#0b1f3f' : 
                              c === 'Sage' ? '#8fa08c' : '#dfd3c3';
              const borderStyle = c === 'White' ? '1px solid #ccc' : 'none';
              return `<button class="color-selector-swatch ${i === 0 ? 'active' : ''}" data-color="${c}" style="background-color: ${bgStyle}; border: ${borderStyle};" title="${c}"></button>`;
            }).join('')}
          </div>
        </div>

        <!-- Sizes Selector -->
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

  // Attach modal internal events
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

  const modalAddBtn = detailModalBody.querySelector('#modal-add-to-bag');
  modalAddBtn.addEventListener('click', () => {
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

/* --- EVENT LISTENERS CONFIG --- */
function setupEventListeners() {
  // Brand logo click clears filters and shows all
  const brandLogo = document.getElementById('brand-logo');
  if (brandLogo) {
    brandLogo.addEventListener('click', (e) => {
      e.preventDefault();
      resetAllFilters();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Category switches (Desktop & Mobile)
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link, .footer-category-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.dataset.category;
      
      // Update filter state
      activeFilters.category = cat;
      
      // Update UI active styling
      document.querySelectorAll('.nav-link, .mobile-link').forEach(l => {
        if (l.dataset.category === cat) {
          l.classList.add('active');
        } else {
          l.classList.remove('active');
        }
      });

      // Collapse search if active
      closeSearch();

      // Rerender products & scroll up
      renderProducts();
      
      // If hero banner exists, change layout context or hide it on subcategories
      if (heroBanner) {
        if (cat === 'all') {
          heroBanner.style.display = 'flex';
        } else {
          heroBanner.style.display = 'none';
        }
      }
    });
  });

  // Hero banner buttons
  document.querySelectorAll('.hero-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.targetCategory;
      const matchingLink = document.querySelector(`.nav-link[data-category="${cat}"]`);
      if (matchingLink) matchingLink.click();
      
      // Smooth scroll to catalog
      const storeLayout = document.querySelector('.store-layout-container');
      if (storeLayout) {
        storeLayout.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Cart Drawer open/close
  if (cartBtn) cartBtn.addEventListener('click', () => toggleCartDrawer(true));
  if (closeCartBtn) closeCartBtn.addEventListener('click', () => toggleCartDrawer(false));
  if (cartDrawerOverlay) cartDrawerOverlay.addEventListener('click', () => toggleCartDrawer(false));

  // Product Modal Close
  if (closeDetailBtn) closeDetailBtn.addEventListener('click', () => toggleProductModal(false));
  if (detailModalOverlay) detailModalOverlay.addEventListener('click', () => toggleProductModal(false));

  // Search Toggle Expand
  if (searchToggleBtn) {
    searchToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchContainer.classList.toggle('active');
      if (searchContainer.classList.contains('active')) {
        searchInput.focus();
      }
    });
  }

  // Close search on document click outside
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

  // Price Slider filter
  if (priceSlider) {
    priceSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      activeFilters.priceMax = val;
      priceValEl.textContent = `₹${val}`;
      renderProducts();
    });
  }

  // Color Swatches filters
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

  // Size Button filters
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

  // Sort Selector
  if (sortSelector) {
    sortSelector.addEventListener('change', (e) => {
      activeFilters.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Clear Filters
  if (clearAllFiltersBtn) clearAllFiltersBtn.addEventListener('click', resetAllFilters);
  if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetAllFilters);

  // Mobile Filters drawer toggle
  if (filterMobileToggleBtn) {
    filterMobileToggleBtn.addEventListener('click', () => {
      filterSidebar.classList.toggle('active-mobile');
    });
  }

  // Checkout Action simulation
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      toggleCartDrawer(false);
      // Simulate Order ID creation
      const randOrder = 'TZ-' + Math.floor(10000 + Math.random() * 90000) + '-' + Math.floor(10 + Math.random() * 90);
      if (successOrderId) successOrderId.textContent = randOrder;
      
      // Empty cart state
      cart = [];
      localStorage.removeItem('threadzy_cart');
      updateCartUI();

      // Show success popup
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

  // Newsletter Submit simulation
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value;
      alert(`Simulated Success! Thank you for signing up with ${email}. A 10% voucher code has been simulated and sent to your email!`);
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
    category: activeFilters.category, // keep current active category tab
    priceMax: 4999,
    colors: [],
    sizes: [],
    searchQuery: '',
    sortBy: 'default'
  };

  // Reset UI elements
  if (priceSlider) {
    priceSlider.value = 4999;
    priceValEl.textContent = '₹4999';
  }

  document.querySelectorAll('.color-swatch-filter').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.size-btn-filter').forEach(b => b.classList.remove('active'));
  
  if (sortSelector) sortSelector.value = 'default';
  
  closeSearch();
  
  // Collapse mobile menu if open
  if (filterSidebar) filterSidebar.classList.remove('active-mobile');

  renderProducts();
}

// Global init on DOM load
document.addEventListener('DOMContentLoaded', init);

// If DOM already loaded (Vite hot reloading support)
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  init();
}
