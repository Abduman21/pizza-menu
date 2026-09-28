# FORNO — Artisan Pizza Kitchen

A premium, fully responsive pizza restaurant ordering website built with **vanilla HTML5, CSS3, and JavaScript** — no frameworks, no dependencies.

> Stone-Baked. Handcrafted. Unforgettable.

---

## Live Demo

> Open `index.html` in any modern browser. No build step required.

---

## Features

- **Full single-page restaurant site** with hero, menu, specials, about, contact, footer
- **Dynamic menu** — 16 unique pizzas rendered from a JS data array
- **Real-time filter, search, and sort** — instant results across name, ingredient, category, and tags
- **Product customization modal** — choose size, crust, extra toppings; price updates live
- **Slide-out cart drawer** — with quantity controls, subtotal, delivery fee, tax, and grand total
- **localStorage persistence** — cart survives page refresh
- **Checkout flow** — form validation, delivery/pickup toggle, demo payment UI
- **Order success modal** — generates a unique FORNO-##### reference
- **Toast notifications** — accessible, auto-dismissing
- **Sticky header** with scroll-aware style change
- **Mobile hamburger navigation**
- **Scroll-to-top button**
- **Newsletter signup** with email validation
- **Accessible** — semantic HTML, ARIA labels, keyboard navigation, focus trapping in modals, `prefers-reduced-motion` support

---

## Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Markup     | HTML5 (semantic)    |
| Styling    | CSS3 (custom props) |
| Logic      | Vanilla JavaScript  |
| Storage    | localStorage        |
| Images     | Local JPEG assets   |
| Fonts      | System font stack   |

Zero external dependencies. No npm. No bundler.

---

## Project Structure

```
forno/
├── index.html       — Full single-page app markup
├── style.css        — Organised CSS with custom properties (~900 lines)
├── script.js        — Data + all JS logic (~600 lines)
├── assets/
│   ├── pizza-1.jpeg … pizza-10.jpeg   — Pizza photography
│   └── logo.png     — Original asset (not used in final design)
└── README.md
```

---

## Running Locally

No installation required:

```bash
# Clone the repository
git clone https://github.com/Abduman21/pizza-menu.git
cd pizza-menu

# Open in browser — any of these work:
open index.html                          # macOS
start index.html                         # Windows
xdg-open index.html                      # Linux

# Or with a simple dev server:
npx serve .                              # Node.js required
python -m http.server 8080              # Python 3
```

---

## Architecture

### JavaScript

The app is structured into named sections:

| Section | Responsibility |
|---|---|
| `PIZZAS` array | Single source of truth for all pizza data |
| `state` object | Active filter, search term, sort, cart, modal state |
| `renderMenu()` | Builds pizza cards from filtered/sorted data |
| `applyFilters()` | Combines filter + search + sort and re-renders |
| `openProductModal()` | Renders customization UI and wires interactions |
| `calcModalPrice()` | Computes price based on size/crust/toppings/qty |
| `addToCart()` | Adds item with a unique key, merges duplicates |
| `renderCartDrawer()` | Builds the full cart UI with totals |
| `validateCheckout()` | Client-side form validation with inline errors |
| `placeOrder()` | Generates order ref and triggers success modal |
| `saveCart()` / `loadCart()` | localStorage read/write |

### CSS

Organised into 26 named sections with a full custom property system:

```css
:root {
  --color-primary: #c0392b;
  --color-accent:  #e8a838;
  --color-bg:      #faf7f2;
  /* ... */
}
```

Responsive via fluid `clamp()` values and two breakpoints (768px / 480px).

---

## Responsive Breakpoints

| Breakpoint | Behaviour |
|---|---|
| ≥ 1024px | Full desktop layout, 3–4 column grids |
| 768px    | Hamburger nav, single-column hero, stacked sections |
| 480px    | Single-column menu grid, condensed chips |

---

## Demo-Only Features

The following are clearly front-end demonstrations:

- **Card payment** — simulated, no real transaction processed
- **Order placement** — generates a fake reference number, no backend
- **Newsletter** — validates and clears the field, no email is sent
- **Delivery time** — static copy, not real-time
- **Map** — placeholder element, no embedded map API

---

## Future Improvements

- Backend integration (order management, real payments via Stripe)
- User accounts and order history
- Real-time delivery tracking
- Loyalty points system
- Dark mode toggle
- Animated SVG pizza builder

---

## Developer

Built as a portfolio project demonstrating modern vanilla frontend engineering.

Original project: [github.com/Abduman21/pizza-menu](https://github.com/Abduman21/pizza-menu)
