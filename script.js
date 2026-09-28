/* ============================================================
   FORNO — Artisan Pizza Kitchen
   script.js — Vanilla JS Application
   ============================================================
   Sections:
   1.  Pizza Data
   2.  State
   3.  DOM References
   4.  Helpers & Utilities
   5.  Toast Notifications
   6.  Header Behavior
   7.  Navigation (mobile)
   8.  Search
   9.  Render Menu
   10. Filter, Sort, Search logic
   11. Specials Section
   12. Product Customization Modal
   13. Cart State & Rendering
   14. Cart Drawer
   15. Checkout Modal
   16. Order Success
   17. Newsletter
   18. Scroll-to-top
   19. Init
   ============================================================ */

'use strict';

/* ============================================================
   1. PIZZA DATA
   ============================================================ */
const PIZZAS = [
  {
    id: 1,
    name: 'Margherita Classica',
    category: 'classic',
    tags: ['classic', 'vegetarian', 'popular'],
    description: 'San Marzano tomato sauce, fior di latte mozzarella, fresh basil, and extra virgin olive oil. The original. The icon.',
    ingredients: ['San Marzano tomato', 'Fior di latte', 'Fresh basil', 'EV Olive oil'],
    price: 13.99,
    rating: 4.8,
    image: 'assets/pizza-1.jpeg',
    badges: ['Best Seller'],
    spicy: false,
    vegetarian: true,
    special: false,
  },
  {
    id: 2,
    name: 'Pepperoni Classic',
    category: 'classic',
    tags: ['classic', 'beef', 'popular'],
    description: 'Generous layers of aged pepperoni over rich tomato sauce and melted mozzarella. A beloved classic done right.',
    ingredients: ['Tomato sauce', 'Mozzarella', 'Aged pepperoni', 'Oregano'],
    price: 15.99,
    rating: 4.9,
    image: 'assets/pizza-2.jpeg',
    badges: ['Best Seller'],
    spicy: false,
    vegetarian: false,
    special: false,
  },
  {
    id: 3,
    name: 'Truffle Mushroom',
    category: 'premium',
    tags: ['premium', 'vegetarian'],
    description: 'Wild porcini and cremini mushrooms, truffle oil drizzle, fontina cheese, and fresh thyme on a white cream base.',
    ingredients: ['Porcini mushrooms', 'Cremini mushrooms', 'Truffle oil', 'Fontina', 'Thyme'],
    price: 19.99,
    rating: 4.9,
    image: 'assets/pizza-3.jpeg',
    badges: ["Chef's Choice"],
    spicy: false,
    vegetarian: true,
    special: true,
  },
  {
    id: 4,
    name: 'Spicy Diavola',
    category: 'spicy',
    tags: ['spicy', 'beef', 'popular'],
    description: 'Calabrian chilli paste base, spicy salami, roasted red peppers, smoked mozzarella, and a honey drizzle finish.',
    ingredients: ['Calabrian chilli paste', 'Spicy salami', 'Roasted peppers', 'Smoked mozzarella', 'Honey'],
    price: 17.99,
    rating: 4.7,
    image: 'assets/pizza-4.jpeg',
    badges: ['Spicy', 'New'],
    spicy: true,
    vegetarian: false,
    special: true,
  },
  {
    id: 5,
    name: 'BBQ Chicken',
    category: 'chicken',
    tags: ['chicken', 'popular'],
    description: 'Smoky BBQ sauce base, grilled free-range chicken, caramelised red onion, smoked cheddar, and fresh coriander.',
    ingredients: ['BBQ sauce', 'Grilled chicken', 'Red onion', 'Smoked cheddar', 'Coriander'],
    price: 16.99,
    rating: 4.7,
    image: 'assets/pizza-5.jpeg',
    badges: ['Popular'],
    spicy: false,
    vegetarian: false,
    special: false,
  },
  {
    id: 6,
    name: 'Four Cheese',
    category: 'classic',
    tags: ['classic', 'vegetarian'],
    description: 'A luxurious blend of mozzarella, gorgonzola, pecorino romano, and ricotta on a light cream base with a walnut crumble.',
    ingredients: ['Mozzarella', 'Gorgonzola', 'Pecorino romano', 'Ricotta', 'Walnuts'],
    price: 18.99,
    rating: 4.8,
    image: 'assets/pizza-6.jpeg',
    badges: ["Chef's Choice"],
    spicy: false,
    vegetarian: true,
    special: false,
  },
  {
    id: 7,
    name: 'Mediterranean Veggie',
    category: 'vegetarian',
    tags: ['vegetarian'],
    description: 'Artichoke hearts, kalamata olives, sun-dried tomatoes, roasted courgette, feta cheese, and a za\'atar herb dust.',
    ingredients: ['Artichoke', 'Kalamata olives', 'Sun-dried tomato', 'Courgette', 'Feta', 'Za\'atar'],
    price: 15.99,
    rating: 4.6,
    image: 'assets/pizza-7.jpeg',
    badges: ['Vegetarian'],
    spicy: false,
    vegetarian: true,
    special: false,
  },
  {
    id: 8,
    name: 'Buffalo Chicken',
    category: 'chicken',
    tags: ['chicken', 'spicy'],
    description: 'Crispy buffalo-glazed chicken, blue cheese crumbles, celery, mozzarella, and ranch drizzle. Bold and unapologetic.',
    ingredients: ['Buffalo chicken', 'Blue cheese', 'Celery', 'Mozzarella', 'Ranch'],
    price: 17.49,
    rating: 4.7,
    image: 'assets/pizza-8.jpeg',
    badges: ['Spicy'],
    spicy: true,
    vegetarian: false,
    special: false,
  },
  {
    id: 9,
    name: 'Prosciutto & Arugula',
    category: 'premium',
    tags: ['premium', 'beef'],
    description: 'Thin-sliced San Daniele prosciutto, wild arugula, shaved parmigiano reggiano, lemon zest, and balsamic glaze.',
    ingredients: ['Prosciutto di San Daniele', 'Wild arugula', 'Parmigiano reggiano', 'Lemon zest', 'Balsamic glaze'],
    price: 20.99,
    rating: 4.9,
    image: 'assets/pizza-9.jpeg',
    badges: ['Premium'],
    spicy: false,
    vegetarian: false,
    special: true,
  },
  {
    id: 10,
    name: 'Meat Lovers',
    category: 'beef',
    tags: ['beef', 'chicken', 'popular'],
    description: 'A carnivore\'s dream — spicy beef, Italian sausage, crispy bacon, grilled chicken, and mozzarella on a rich tomato base.',
    ingredients: ['Spicy beef', 'Italian sausage', 'Crispy bacon', 'Grilled chicken', 'Mozzarella'],
    price: 21.99,
    rating: 4.8,
    image: 'assets/pizza-10.jpeg',
    badges: ['Popular'],
    spicy: false,
    vegetarian: false,
    special: false,
  },
  {
    id: 11,
    name: 'Pesto Garden',
    category: 'vegetarian',
    tags: ['vegetarian', 'premium'],
    description: 'Housemade basil pesto base, cherry tomatoes, burrata, pine nuts, and a drizzle of cold-pressed Italian olive oil.',
    ingredients: ['Basil pesto', 'Cherry tomatoes', 'Burrata', 'Pine nuts', 'Olive oil'],
    price: 18.49,
    rating: 4.7,
    image: 'assets/pizza-2.jpeg',
    badges: ['Vegetarian'],
    spicy: false,
    vegetarian: true,
    special: false,
  },
  {
    id: 12,
    name: 'Chicken Alfredo',
    category: 'chicken',
    tags: ['chicken'],
    description: 'Creamy Alfredo sauce, roasted garlic chicken, spinach, mushrooms, and a generous mozzarella stretch.',
    ingredients: ['Alfredo sauce', 'Garlic chicken', 'Spinach', 'Mushrooms', 'Mozzarella'],
    price: 16.99,
    rating: 4.5,
    image: 'assets/pizza-4.jpeg',
    badges: [],
    spicy: false,
    vegetarian: false,
    special: false,
  },
  {
    id: 13,
    name: 'Smoked Beef',
    category: 'beef',
    tags: ['beef'],
    description: 'Slow-smoked pulled beef brisket, caramelised onions, roasted jalapeños, aged cheddar, and smoky BBQ drizzle.',
    ingredients: ['Pulled beef brisket', 'Caramelised onions', 'Jalapeños', 'Aged cheddar', 'BBQ sauce'],
    price: 19.49,
    rating: 4.6,
    image: 'assets/pizza-7.jpeg',
    badges: ['New'],
    spicy: true,
    vegetarian: false,
    special: false,
  },
  {
    id: 14,
    name: 'Garlic Mushroom',
    category: 'vegetarian',
    tags: ['vegetarian', 'classic'],
    description: 'Roasted garlic white sauce, mixed wild mushrooms, mozzarella, rosemary, sea salt flakes, and a truffle oil finish.',
    ingredients: ['Roasted garlic sauce', 'Wild mushrooms', 'Mozzarella', 'Rosemary', 'Truffle oil'],
    price: 14.99,
    rating: 4.5,
    image: 'assets/pizza-6.jpeg',
    badges: [],
    spicy: false,
    vegetarian: true,
    special: false,
  },
  {
    id: 15,
    name: 'House Special',
    category: 'premium',
    tags: ['premium', 'popular', 'beef', 'chicken'],
    description: 'FORNO\'s signature creation — a weekly rotating pizza using the finest seasonal ingredients chosen by our head chef.',
    ingredients: ['Seasonal ingredients', 'Chef\'s selection', 'Stone-baked daily'],
    price: 22.99,
    rating: 5.0,
    image: 'assets/pizza-1.jpeg',
    badges: ["Chef's Choice", 'Best Seller'],
    spicy: false,
    vegetarian: false,
    special: false,
  },
  {
    id: 16,
    name: 'Hawaiian Twist',
    category: 'classic',
    tags: ['classic', 'chicken'],
    description: 'Reimagined Hawaiian with grilled chicken, caramelised fresh pineapple, red onion, jalapeños, and smoked mozzarella.',
    ingredients: ['Grilled chicken', 'Fresh pineapple', 'Red onion', 'Jalapeños', 'Smoked mozzarella'],
    price: 15.49,
    rating: 4.3,
    image: 'assets/pizza-3.jpeg',
    badges: [],
    spicy: false,
    vegetarian: false,
    special: false,
  },
];

/* ============================================================
   2. STATE
   ============================================================ */
const state = {
  cart: [],
  activeFilter: 'all',
  searchTerm: '',
  sortValue: 'default',
  modalPizzaId: null,
  modalQty: 1,
  modalSize: 'medium',
  modalCrust: 'classic',
  modalToppings: [],
};

// Pricing config
const SIZE_PRICES   = { small: -2, medium: 0, large: 3 };
const CRUST_PRICES  = { classic: 0, thin: 0, stuffed: 2.5 };
const TOPPING_PRICE = 1.0;
const DELIVERY_FEE  = 2.99;
const TAX_RATE      = 0.08;

/* ============================================================
   3. DOM REFERENCES
   ============================================================ */
const $ = id => document.getElementById(id);

const DOM = {
  header:           document.querySelector('.site-header'),
  hamburger:        $('hamburgerBtn'),
  mainNav:          $('mainNav'),
  searchToggleBtn:  $('searchToggleBtn'),
  searchCloseBtn:   $('searchCloseBtn'),
  searchOverlay:    $('searchOverlay'),
  searchInput:      $('searchInput'),
  chips:            document.querySelectorAll('.chip'),
  sortSelect:       $('sortSelect'),
  pizzaGrid:        $('pizzaGrid'),
  emptyState:       $('emptyState'),
  resetFiltersBtn:  $('resetFiltersBtn'),
  menuResultsInfo:  $('menuResultsInfo'),
  specialsGrid:     $('specialsGrid'),
  // Cart
  cartToggleBtn:    $('cartToggleBtn'),
  cartCloseBtn:     $('cartCloseBtn'),
  cartBackdrop:     $('cartBackdrop'),
  cartDrawer:       $('cartDrawer'),
  cartBadge:        $('cartBadge'),
  cartItemCount:    $('cartItemCount'),
  cartDrawerBody:   $('cartDrawerBody'),
  cartDrawerFooter: $('cartDrawerFooter'),
  // Product modal
  modalBackdrop:    $('modalBackdrop'),
  productModal:     $('productModal'),
  modalCloseBtn:    $('modalCloseBtn'),
  productModalInner: $('productModalInner'),
  // Checkout
  checkoutBackdrop: $('checkoutBackdrop'),
  checkoutModal:    $('checkoutModal'),
  checkoutCloseBtn: $('checkoutCloseBtn'),
  checkoutForm:     $('checkoutForm'),
  checkoutSummary:  $('checkoutSummary'),
  placeOrderBtn:    $('placeOrderBtn'),
  // Success
  successBackdrop:  $('successBackdrop'),
  successModal:     $('successModal'),
  successCloseBtn:  $('successCloseBtn'),
  orderRef:         $('orderRef'),
  // Utilities
  toaster:          $('toaster'),
  scrollTopBtn:     $('scrollTopBtn'),
  newsletterForm:   $('newsletterForm'),
  deliveryRadios:   null, // set after DOM ready
};

/* ============================================================
   4. HELPERS & UTILITIES
   ============================================================ */
function fmt(value) {
  return `$${Number(value).toFixed(2)}`;
}

function generateOrderRef() {
  return 'FORNO-' + Math.floor(10000 + Math.random() * 90000);
}

function trapFocus(element) {
  const focusable = element.querySelectorAll(
    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  element.addEventListener('keydown', function handler(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
    // Remove when modal closes
    if (!element.classList.contains('open')) element.removeEventListener('keydown', handler);
  });
}

function lockScroll()   { document.body.style.overflow = 'hidden'; }
function unlockScroll() { document.body.style.overflow = ''; }

function badgeClass(badge) {
  const map = {
    'Best Seller':    'badge-bestseller',
    "Chef's Choice":  'badge-chefschoice',
    'New':            'badge-new',
    'Spicy':          'badge-spicy',
    'Vegetarian':     'badge-vegetarian',
    'Popular':        'badge-bestseller',
    'Premium':        'badge-chefschoice',
  };
  return map[badge] || 'badge-new';
}

/* ============================================================
   5. TOAST NOTIFICATIONS
   ============================================================ */
function showToast(message, type = '') {
  if (!DOM.toaster) return;
  const el = document.createElement('div');
  el.className = 'toast' + (type ? ` toast-${type}` : '');
  el.textContent = message;
  el.setAttribute('role', 'status');
  DOM.toaster.appendChild(el);
  setTimeout(() => {
    el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    el.style.opacity = '0';
    el.style.transform = 'translateX(12px)';
    setTimeout(() => el.remove(), 320);
  }, 2800);
}

/* ============================================================
   6. HEADER SCROLL BEHAVIOR
   ============================================================ */
function initHeader() {
  window.addEventListener('scroll', () => {
    if (!DOM.header) return;
    DOM.header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ============================================================
   7. NAVIGATION (MOBILE)
   ============================================================ */
function initNavigation() {
  if (!DOM.hamburger || !DOM.mainNav) return;

  DOM.hamburger.addEventListener('click', () => {
    const isOpen = DOM.mainNav.classList.toggle('open');
    DOM.hamburger.classList.toggle('open', isOpen);
    DOM.hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close nav on link click (mobile)
  DOM.mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      DOM.mainNav.classList.remove('open');
      DOM.hamburger.classList.remove('open');
      DOM.hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (DOM.mainNav.classList.contains('open') &&
        !DOM.mainNav.contains(e.target) &&
        !DOM.hamburger.contains(e.target)) {
      DOM.mainNav.classList.remove('open');
      DOM.hamburger.classList.remove('open');
      DOM.hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ============================================================
   8. SEARCH
   ============================================================ */
function initSearch() {
  if (!DOM.searchToggleBtn || !DOM.searchOverlay) return;

  DOM.searchToggleBtn.addEventListener('click', () => {
    const isOpen = DOM.searchOverlay.classList.toggle('open');
    DOM.searchToggleBtn.setAttribute('aria-expanded', isOpen);
    DOM.searchOverlay.setAttribute('aria-hidden', !isOpen);
    if (isOpen) {
      DOM.searchInput.focus();
    } else {
      state.searchTerm = '';
      DOM.searchInput.value = '';
      applyFilters();
    }
  });

  DOM.searchCloseBtn.addEventListener('click', () => {
    DOM.searchOverlay.classList.remove('open');
    DOM.searchToggleBtn.setAttribute('aria-expanded', 'false');
    DOM.searchOverlay.setAttribute('aria-hidden', 'true');
    state.searchTerm = '';
    DOM.searchInput.value = '';
    applyFilters();
  });

  DOM.searchInput.addEventListener('input', () => {
    state.searchTerm = DOM.searchInput.value.trim().toLowerCase();
    applyFilters();
  });

  // Close on Escape
  DOM.searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') DOM.searchCloseBtn.click();
  });
}

/* ============================================================
   9. RENDER MENU
   ============================================================ */
function renderPizzaCard(pizza) {
  const badges = pizza.badges.map(b =>
    `<span class="badge ${badgeClass(b)}">${b}</span>`
  ).join('');

  const ratingDisplay = pizza.rating.toFixed(1);

  return `
    <article class="pizza-card" role="listitem" data-id="${pizza.id}">
      <div class="pizza-card-image-wrap">
        <img src="${pizza.image}" alt="${pizza.name} pizza" loading="lazy" width="400" height="300" />
        ${badges ? `<div class="card-badges" aria-label="Badges">${badges}</div>` : ''}
      </div>
      <div class="pizza-card-body">
        <div class="pizza-card-meta">
          <span class="pizza-category-tag">${pizza.category}</span>
          <div class="pizza-rating" aria-label="Rating: ${ratingDisplay} out of 5">
            <span class="star-icon" aria-hidden="true">★</span>
            <span>${ratingDisplay}</span>
          </div>
        </div>
        <h3 class="pizza-card-name">${pizza.name}</h3>
        <p class="pizza-card-desc">${pizza.description}</p>
        <div class="pizza-card-footer">
          <div class="pizza-price">
            ${fmt(pizza.price)} <span>/ medium</span>
          </div>
          <button
            class="btn btn-primary customize-btn"
            data-id="${pizza.id}"
            aria-label="Customize and order ${pizza.name}"
          >Customize</button>
        </div>
      </div>
    </article>
  `;
}

function renderMenu(pizzas) {
  if (!DOM.pizzaGrid) return;

  if (!pizzas.length) {
    DOM.pizzaGrid.innerHTML = '';
    DOM.emptyState.hidden = false;
    DOM.menuResultsInfo.textContent = 'No results found';
    return;
  }

  DOM.emptyState.hidden = true;
  DOM.menuResultsInfo.textContent = `Showing ${pizzas.length} pizza${pizzas.length !== 1 ? 's' : ''}`;
  DOM.pizzaGrid.innerHTML = pizzas.map(renderPizzaCard).join('');

  // Stagger animation
  DOM.pizzaGrid.querySelectorAll('.pizza-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 50}ms`;
  });
}

/* ============================================================
   10. FILTER, SORT, SEARCH LOGIC
   ============================================================ */
function getFilteredSortedPizzas() {
  let list = [...PIZZAS];

  // Filter by category chip
  if (state.activeFilter !== 'all') {
    list = list.filter(p => {
      if (state.activeFilter === 'popular')    return p.tags.includes('popular');
      if (state.activeFilter === 'vegetarian') return p.vegetarian;
      if (state.activeFilter === 'spicy')      return p.spicy;
      return p.tags.includes(state.activeFilter);
    });
  }

  // Search
  if (state.searchTerm) {
    const term = state.searchTerm;
    list = list.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.ingredients.some(i => i.toLowerCase().includes(term))
    );
  }

  // Sort
  switch (state.sortValue) {
    case 'price-asc':  list.sort((a, b) => a.price - b.price);         break;
    case 'price-desc': list.sort((a, b) => b.price - a.price);         break;
    case 'rating-desc': list.sort((a, b) => b.rating - a.rating);      break;
    case 'name-asc':   list.sort((a, b) => a.name.localeCompare(b.name)); break;
    default:           break; // recommended — keep original order
  }

  return list;
}

function applyFilters() {
  renderMenu(getFilteredSortedPizzas());
}

function initFilters() {
  // Category chips
  DOM.chips.forEach(chip => {
    chip.addEventListener('click', () => {
      DOM.chips.forEach(c => { c.classList.remove('active'); c.setAttribute('aria-pressed', 'false'); });
      chip.classList.add('active');
      chip.setAttribute('aria-pressed', 'true');
      state.activeFilter = chip.dataset.filter;
      applyFilters();
    });
  });

  // Sort
  if (DOM.sortSelect) {
    DOM.sortSelect.addEventListener('change', () => {
      state.sortValue = DOM.sortSelect.value;
      applyFilters();
    });
  }

  // Reset filters button (empty state)
  if (DOM.resetFiltersBtn) {
    DOM.resetFiltersBtn.addEventListener('click', () => {
      state.activeFilter = 'all';
      state.searchTerm = '';
      state.sortValue = 'default';
      if (DOM.searchInput) DOM.searchInput.value = '';
      if (DOM.sortSelect) DOM.sortSelect.value = 'default';
      DOM.chips.forEach(c => {
        c.classList.toggle('active', c.dataset.filter === 'all');
        c.setAttribute('aria-pressed', c.dataset.filter === 'all' ? 'true' : 'false');
      });
      applyFilters();
    });
  }
}

/* ============================================================
   11. CHEF'S SPECIALS SECTION
   ============================================================ */
function renderSpecials() {
  if (!DOM.specialsGrid) return;
  const specials = PIZZAS.filter(p => p.special).slice(0, 3);
  DOM.specialsGrid.innerHTML = specials.map(pizza => `
    <article class="special-card">
      <div class="special-card-image">
        <img src="${pizza.image}" alt="${pizza.name}" loading="lazy" width="600" height="400" />
      </div>
      <div class="special-card-body">
        <span class="special-label">✦ Chef's Special</span>
        <h3>${pizza.name}</h3>
        <p>${pizza.description}</p>
        <div class="special-card-footer">
          <span class="special-price">${fmt(pizza.price)}</span>
          <button class="btn btn-primary" data-id="${pizza.id}" aria-label="Order ${pizza.name}">Order Now</button>
        </div>
      </div>
    </article>
  `).join('');
}

/* ============================================================
   12. PRODUCT CUSTOMIZATION MODAL
   ============================================================ */
function calcModalPrice() {
  const pizza = PIZZAS.find(p => p.id === state.modalPizzaId);
  if (!pizza) return 0;
  const base      = pizza.price;
  const sizeDelta = SIZE_PRICES[state.modalSize]   ?? 0;
  const crustDelta = CRUST_PRICES[state.modalCrust] ?? 0;
  const toppingsCost = state.modalToppings.length * TOPPING_PRICE;
  return (base + sizeDelta + crustDelta + toppingsCost) * state.modalQty;
}

function updateModalPrice() {
  const priceEl = document.getElementById('modalTotalPrice');
  const qtyEl   = document.getElementById('modalQtyDisplay');
  if (priceEl) priceEl.textContent = fmt(calcModalPrice());
  if (qtyEl)   qtyEl.textContent = state.modalQty;
}

function renderProductModal(pizzaId) {
  const pizza = PIZZAS.find(p => p.id === pizzaId);
  if (!pizza) return;

  state.modalPizzaId = pizzaId;
  state.modalQty = 1;
  state.modalSize = 'medium';
  state.modalCrust = 'classic';
  state.modalToppings = [];

  const ingredients = pizza.ingredients.map(i => `<span class="ingredient-tag">${i}</span>`).join('');

  const sizeOptions = [
    { value: 'small',  label: 'Small', note: '(−$2.00)' },
    { value: 'medium', label: 'Medium', note: '' },
    { value: 'large',  label: 'Large', note: '(+$3.00)' },
  ].map(s => `
    <button class="custom-option${s.value === 'medium' ? ' selected' : ''}"
      data-type="size" data-value="${s.value}"
      aria-pressed="${s.value === 'medium'}"
    >${s.label} ${s.note}</button>
  `).join('');

  const crustOptions = ['Classic', 'Thin', 'Stuffed'].map(c => `
    <button class="custom-option${c === 'Classic' ? ' selected' : ''}"
      data-type="crust" data-value="${c.toLowerCase()}"
      aria-pressed="${c === 'Classic'}"
    >${c}${c === 'Stuffed' ? ' (+$2.50)' : ''}</button>
  `).join('');

  const toppingsList = ['Extra Cheese', 'Mushrooms', 'Olives', 'Jalapeños', 'Chicken', 'Beef', 'Onions', 'Anchovies'];
  const toppingsHtml = toppingsList.map(t => `
    <label class="topping-option">
      <input type="checkbox" value="${t}" aria-label="Add ${t} (+$1.00)" />
      ${t} <span style="color:var(--color-text-faint);font-size:0.7rem">(+$1.00)</span>
    </label>
  `).join('');

  DOM.productModalInner.innerHTML = `
    <div class="modal-pizza-image">
      <img src="${pizza.image}" alt="${pizza.name}" width="680" height="383" />
    </div>
    <div class="modal-body">
      <div class="modal-pizza-header">
        <h2 class="modal-pizza-name" id="modalPizzaName">${pizza.name}</h2>
        <span class="modal-pizza-base-price">${fmt(pizza.price)}</span>
      </div>
      <p class="modal-pizza-desc">${pizza.description}</p>
      <div class="modal-pizza-ingredients" aria-label="Ingredients">${ingredients}</div>

      <div class="modal-customization">
        <div class="custom-group">
          <div class="custom-group-label">Size</div>
          <div class="custom-options" role="group" aria-label="Choose size">${sizeOptions}</div>
        </div>
        <div class="custom-group">
          <div class="custom-group-label">Crust</div>
          <div class="custom-options" role="group" aria-label="Choose crust">${crustOptions}</div>
        </div>
        <div class="custom-group">
          <div class="custom-group-label">Extra Toppings</div>
          <div class="toppings-grid" role="group" aria-label="Add extra toppings">${toppingsHtml}</div>
        </div>
      </div>

      <div class="modal-qty-row">
        <div class="modal-qty-control" role="group" aria-label="Quantity">
          <button id="modalQtyDec" aria-label="Decrease quantity">−</button>
          <span id="modalQtyDisplay" aria-live="polite">1</span>
          <button id="modalQtyInc" aria-label="Increase quantity">+</button>
        </div>
        <div class="modal-total">
          <span class="modal-total-label">Total</span>
          <span class="modal-total-price" id="modalTotalPrice">${fmt(calcModalPrice())}</span>
        </div>
      </div>

      <div class="modal-footer">
        <div></div>
        <button class="btn btn-primary" id="modalAddToCart" aria-label="Add ${pizza.name} to cart">
          Add to Cart — <span id="modalTotalPrice2">${fmt(calcModalPrice())}</span>
        </button>
      </div>
    </div>
  `;

  // Wire modal interactions
  // Size/crust selectors
  DOM.productModalInner.querySelectorAll('.custom-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      const val  = btn.dataset.value;
      DOM.productModalInner.querySelectorAll(`.custom-option[data-type="${type}"]`).forEach(b => {
        b.classList.remove('selected');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('selected');
      btn.setAttribute('aria-pressed', 'true');
      if (type === 'size')  state.modalSize = val;
      if (type === 'crust') state.modalCrust = val;
      updateModalPriceAll();
    });
  });

  // Toppings
  DOM.productModalInner.querySelectorAll('.topping-option input').forEach(cb => {
    cb.addEventListener('change', () => {
      const parent = cb.closest('.topping-option');
      if (cb.checked) {
        state.modalToppings.push(cb.value);
        parent.classList.add('selected');
      } else {
        state.modalToppings = state.modalToppings.filter(t => t !== cb.value);
        parent.classList.remove('selected');
      }
      updateModalPriceAll();
    });
  });

  // Quantity
  document.getElementById('modalQtyDec').addEventListener('click', () => {
    if (state.modalQty > 1) { state.modalQty--; updateModalPriceAll(); }
  });
  document.getElementById('modalQtyInc').addEventListener('click', () => {
    if (state.modalQty < 10) { state.modalQty++; updateModalPriceAll(); }
  });

  // Add to cart
  document.getElementById('modalAddToCart').addEventListener('click', () => {
    addToCart({
      pizzaId: pizza.id,
      name: pizza.name,
      image: pizza.image,
      size: state.modalSize,
      crust: state.modalCrust,
      toppings: [...state.modalToppings],
      basePrice: pizza.price,
      qty: state.modalQty,
      unitPrice: calcModalPrice() / state.modalQty,
    });
    closeProductModal();
    openCartDrawer();
    showToast(`${pizza.name} added to cart`, 'success');
  });
}

function updateModalPriceAll() {
  const price = calcModalPrice();
  const priceEl  = document.getElementById('modalTotalPrice');
  const priceEl2 = document.getElementById('modalTotalPrice2');
  const qtyEl    = document.getElementById('modalQtyDisplay');
  if (priceEl)  priceEl.textContent  = fmt(price);
  if (priceEl2) priceEl2.textContent = fmt(price);
  if (qtyEl)    qtyEl.textContent    = state.modalQty;
}

function openProductModal(pizzaId) {
  renderProductModal(pizzaId);
  DOM.productModal.classList.add('open');
  DOM.modalBackdrop.classList.add('open');
  DOM.productModal.setAttribute('aria-hidden', 'false');
  DOM.modalBackdrop.setAttribute('aria-hidden', 'false');
  lockScroll();
  trapFocus(DOM.productModal);
  // Focus first focusable inside
  setTimeout(() => {
    const firstFocus = DOM.productModal.querySelector('button, [href], input, select, textarea');
    if (firstFocus) firstFocus.focus();
  }, 50);
}

function closeProductModal() {
  DOM.productModal.classList.remove('open');
  DOM.modalBackdrop.classList.remove('open');
  DOM.productModal.setAttribute('aria-hidden', 'true');
  DOM.modalBackdrop.setAttribute('aria-hidden', 'true');
  if (!isCartOpen() && !isCheckoutOpen()) unlockScroll();
}

function initProductModal() {
  // Open from grid (event delegation)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-id]');
    if (!btn) return;
    // Only trigger for customize/order buttons (not the cart remove etc.)
    if (btn.closest('.cart-drawer') || btn.closest('.checkout-modal') || btn.closest('.cart-item')) return;
    openProductModal(Number(btn.dataset.id));
  });

  DOM.modalCloseBtn.addEventListener('click', closeProductModal);
  DOM.modalBackdrop.addEventListener('click', closeProductModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && DOM.productModal.classList.contains('open')) {
      closeProductModal();
    }
  });
}

/* ============================================================
   13. CART STATE & RENDERING
   ============================================================ */
function saveCart() {
  try {
    localStorage.setItem('forno_cart', JSON.stringify(state.cart));
  } catch (_) {}
}

function loadCart() {
  try {
    const data = JSON.parse(localStorage.getItem('forno_cart'));
    if (Array.isArray(data)) state.cart = data;
  } catch (_) {}
}

function addToCart(item) {
  // Check if same pizza+size+crust+toppings exists
  const key = `${item.pizzaId}-${item.size}-${item.crust}-${item.toppings.sort().join(',')}`;
  const existing = state.cart.find(i => i.key === key);
  if (existing) {
    existing.qty += item.qty;
  } else {
    state.cart.push({ ...item, key });
  }
  saveCart();
  updateCartBadge();
}

function removeFromCart(key) {
  state.cart = state.cart.filter(i => i.key !== key);
  saveCart();
  updateCartBadge();
  renderCartDrawer();
}

function updateQty(key, delta) {
  const item = state.cart.find(i => i.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(i => i.key !== key);
    showToast(`${item.name} removed`);
  }
  saveCart();
  updateCartBadge();
  renderCartDrawer();
}

function clearCart() {
  state.cart = [];
  saveCart();
  updateCartBadge();
  renderCartDrawer();
}

function cartTotal() {
  return state.cart.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
}

function cartItemCount() {
  return state.cart.reduce((sum, i) => sum + i.qty, 0);
}

function updateCartBadge() {
  const count = cartItemCount();
  if (DOM.cartBadge) {
    DOM.cartBadge.textContent = count;
    DOM.cartBadge.classList.toggle('has-items', count > 0);
  }
  if (DOM.cartItemCount) DOM.cartItemCount.textContent = `(${count})`;
}

/* ============================================================
   14. CART DRAWER
   ============================================================ */
function isCartOpen() {
  return DOM.cartDrawer && DOM.cartDrawer.classList.contains('open');
}

function openCartDrawer() {
  renderCartDrawer();
  DOM.cartDrawer.classList.add('open');
  DOM.cartBackdrop.classList.add('open');
  DOM.cartDrawer.setAttribute('aria-hidden', 'false');
  DOM.cartBackdrop.setAttribute('aria-hidden', 'false');
  lockScroll();
  trapFocus(DOM.cartDrawer);
  setTimeout(() => {
    const firstFocus = DOM.cartDrawer.querySelector('button');
    if (firstFocus) firstFocus.focus();
  }, 50);
}

function closeCartDrawer() {
  DOM.cartDrawer.classList.remove('open');
  DOM.cartBackdrop.classList.remove('open');
  DOM.cartDrawer.setAttribute('aria-hidden', 'true');
  DOM.cartBackdrop.setAttribute('aria-hidden', 'true');
  if (!isModalOpen() && !isCheckoutOpen()) unlockScroll();
}

function isModalOpen() {
  return DOM.productModal && DOM.productModal.classList.contains('open');
}

function renderCartDrawer() {
  if (!DOM.cartDrawerBody || !DOM.cartDrawerFooter) return;

  if (!state.cart.length) {
    DOM.cartDrawerBody.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some delicious pizzas to get started.</p>
      </div>
    `;
    DOM.cartDrawerFooter.innerHTML = '';
    return;
  }

  DOM.cartDrawerBody.innerHTML = state.cart.map(item => {
    const extras = [
      `${item.size.charAt(0).toUpperCase() + item.size.slice(1)}`,
      `${item.crust.charAt(0).toUpperCase() + item.crust.slice(1)} crust`,
      ...(item.toppings.length ? [`+ ${item.toppings.join(', ')}`] : []),
    ].join(' · ');

    return `
      <div class="cart-item" data-key="${item.key}">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}" loading="lazy" width="64" height="64" />
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-details">${extras}</div>
          <div class="cart-item-controls">
            <div class="qty-control" role="group" aria-label="Quantity for ${item.name}">
              <button data-action="dec" data-key="${item.key}" aria-label="Decrease ${item.name} quantity">−</button>
              <span aria-live="polite">${item.qty}</span>
              <button data-action="inc" data-key="${item.key}" aria-label="Increase ${item.name} quantity">+</button>
            </div>
            <span class="cart-item-subtotal">${fmt(item.unitPrice * item.qty)}</span>
          </div>
        </div>
        <button class="cart-item-remove" data-action="remove" data-key="${item.key}" aria-label="Remove ${item.name} from cart">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
    `;
  }).join('');

  const subtotal = cartTotal();
  const tax      = subtotal * TAX_RATE;
  const delivery = subtotal > 0 ? DELIVERY_FEE : 0;
  const total    = subtotal + tax + delivery;

  DOM.cartDrawerFooter.innerHTML = `
    <div class="cart-totals">
      <div class="cart-total-row"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
      <div class="cart-total-row"><span>Delivery</span><span>${fmt(delivery)}</span></div>
      <div class="cart-total-row"><span>Tax (8%)</span><span>${fmt(tax)}</span></div>
      <div class="cart-total-row grand-total"><span>Total</span><span>${fmt(total)}</span></div>
    </div>
    <div class="cart-actions">
      <button class="btn btn-outline" id="clearCartBtn">Clear Cart</button>
      <button class="btn btn-primary" id="checkoutTriggerBtn">Checkout</button>
    </div>
  `;

  // Wire cart footer buttons
  document.getElementById('clearCartBtn').addEventListener('click', () => {
    clearCart();
    showToast('Cart cleared');
  });

  document.getElementById('checkoutTriggerBtn').addEventListener('click', () => {
    if (!state.cart.length) { showToast('Your cart is empty'); return; }
    closeCartDrawer();
    openCheckoutModal();
  });
}

function initCartDrawer() {
  DOM.cartToggleBtn.addEventListener('click', () => {
    if (isCartOpen()) closeCartDrawer(); else openCartDrawer();
  });

  DOM.cartCloseBtn.addEventListener('click', closeCartDrawer);
  DOM.cartBackdrop.addEventListener('click', closeCartDrawer);

  // Event delegation for qty/remove in cart body
  DOM.cartDrawerBody.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const key    = btn.dataset.key;
    const action = btn.dataset.action;
    if (action === 'inc')    updateQty(key, 1);
    if (action === 'dec')    updateQty(key, -1);
    if (action === 'remove') removeFromCart(key);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isCartOpen()) closeCartDrawer();
  });
}

/* ============================================================
   15. CHECKOUT MODAL
   ============================================================ */
function isCheckoutOpen() {
  return DOM.checkoutModal && DOM.checkoutModal.classList.contains('open');
}

function renderCheckoutSummary() {
  if (!DOM.checkoutSummary) return;
  const subtotal = cartTotal();
  const tax      = subtotal * TAX_RATE;
  const delivery = subtotal > 0 ? DELIVERY_FEE : 0;
  const total    = subtotal + tax + delivery;
  DOM.checkoutSummary.innerHTML = `
    <div class="checkout-summary-row"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
    <div class="checkout-summary-row"><span>Delivery</span><span>${fmt(delivery)}</span></div>
    <div class="checkout-summary-row"><span>Tax</span><span>${fmt(tax)}</span></div>
    <div class="checkout-summary-row total"><span>Grand Total</span><span>${fmt(total)}</span></div>
  `;
}

function openCheckoutModal() {
  renderCheckoutSummary();
  DOM.checkoutModal.classList.add('open');
  DOM.checkoutBackdrop.classList.add('open');
  DOM.checkoutModal.setAttribute('aria-hidden', 'false');
  DOM.checkoutBackdrop.setAttribute('aria-hidden', 'false');
  lockScroll();
  trapFocus(DOM.checkoutModal);

  // Toggle address fields based on delivery/pickup
  const deliveryRadios = DOM.checkoutModal.querySelectorAll('input[name="delivery"]');
  deliveryRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const isPickup = radio.value === 'pickup';
      $('addressGroup').style.display = isPickup ? 'none' : '';
      $('cityGroup').style.display    = isPickup ? 'none' : '';
      $('co_address').required = !isPickup;
    });
  });

  setTimeout(() => {
    const firstInput = DOM.checkoutModal.querySelector('input');
    if (firstInput) firstInput.focus();
  }, 50);
}

function closeCheckoutModal() {
  DOM.checkoutModal.classList.remove('open');
  DOM.checkoutBackdrop.classList.remove('open');
  DOM.checkoutModal.setAttribute('aria-hidden', 'true');
  DOM.checkoutBackdrop.setAttribute('aria-hidden', 'true');
  if (!isCartOpen() && !isModalOpen()) unlockScroll();
}

function validateCheckout(form) {
  let valid = true;

  // Remove old errors
  form.querySelectorAll('.field-error').forEach(e => e.remove());
  form.querySelectorAll('.error').forEach(e => e.classList.remove('error'));

  const required = ['co_name', 'co_phone', 'co_email'];
  const deliveryMode = form.querySelector('input[name="delivery"]:checked');
  if (!deliveryMode || deliveryMode.value === 'delivery') {
    required.push('co_address');
  }

  required.forEach(id => {
    const input = $(id);
    if (!input) return;
    if (!input.value.trim()) {
      input.classList.add('error');
      const err = document.createElement('span');
      err.className = 'field-error show';
      err.textContent = 'This field is required.';
      input.parentNode.appendChild(err);
      valid = false;
    }
  });

  // Email validation
  const emailInput = $('co_email');
  if (emailInput && emailInput.value.trim()) {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(emailInput.value.trim())) {
      emailInput.classList.add('error');
      const err = document.createElement('span');
      err.className = 'field-error show';
      err.textContent = 'Please enter a valid email address.';
      emailInput.parentNode.appendChild(err);
      valid = false;
    }
  }

  return valid;
}

function initCheckout() {
  DOM.checkoutCloseBtn.addEventListener('click', closeCheckoutModal);
  DOM.checkoutBackdrop.addEventListener('click', closeCheckoutModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isCheckoutOpen()) closeCheckoutModal();
  });

  DOM.checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateCheckout(DOM.checkoutForm)) return;
    placeOrder();
  });
}

/* ============================================================
   16. ORDER SUCCESS
   ============================================================ */
function placeOrder() {
  closeCheckoutModal();
  const ref = generateOrderRef();
  DOM.orderRef.textContent = ref;
  DOM.successModal.classList.add('open');
  DOM.successBackdrop.classList.add('open');
  DOM.successModal.setAttribute('aria-hidden', 'false');
  DOM.successBackdrop.setAttribute('aria-hidden', 'false');
  lockScroll();
  trapFocus(DOM.successModal);
  setTimeout(() => DOM.successCloseBtn.focus(), 100);
}

function initSuccessModal() {
  DOM.successCloseBtn.addEventListener('click', () => {
    DOM.successModal.classList.remove('open');
    DOM.successBackdrop.classList.remove('open');
    DOM.successModal.setAttribute('aria-hidden', 'true');
    DOM.successBackdrop.setAttribute('aria-hidden', 'true');
    clearCart();
    unlockScroll();
    DOM.checkoutForm.reset();
    showToast('Order placed! See you soon.', 'success');
  });

  DOM.successBackdrop.addEventListener('click', () => DOM.successCloseBtn.click());
}

/* ============================================================
   17. NEWSLETTER
   ============================================================ */
function initNewsletter() {
  if (!DOM.newsletterForm) return;
  DOM.newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = $('newsletterEmail');
    const email = emailInput ? emailInput.value.trim() : '';
    if (!email) {
      showToast('Please enter your email address.');
      return;
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      showToast('Please enter a valid email address.');
      return;
    }
    showToast('You\'re subscribed! Welcome to FORNO. 🍕', 'success');
    if (emailInput) emailInput.value = '';
  });
}

/* ============================================================
   18. SCROLL-TO-TOP
   ============================================================ */
function initScrollTop() {
  window.addEventListener('scroll', () => {
    DOM.scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  DOM.scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   19. INIT
   ============================================================ */
function init() {
  loadCart();
  updateCartBadge();

  // Render sections
  renderMenu(PIZZAS);
  renderSpecials();

  // Init all features
  initHeader();
  initNavigation();
  initSearch();
  initFilters();
  initProductModal();
  initCartDrawer();
  initCheckout();
  initSuccessModal();
  initNewsletter();
  initScrollTop();
}

document.addEventListener('DOMContentLoaded', init);
