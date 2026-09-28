# FORNO — Artisan Pizza Kitchen

A premium, fully responsive pizza restaurant ordering website built with **vanilla HTML5, CSS3, and JavaScript** — no frameworks, no dependencies.

> Stone-Baked. Handcrafted. Unforgettable.

---

## Live Demo

🌐 **https://pizza-menu-azure.vercel.app/**

> FORNO is a frontend demonstration project. Checkout, card payment, order processing, newsletter submission, delivery information, and map content are simulated and do not connect to a production backend.

---

## Preview

### Home / Hero

![FORNO Home Page](screenshots/Screenshot%202026-09-28%20155428.png)

### Pizza Menu

![FORNO Pizza Menu](screenshots/Screenshot%202026-09-28%20155444.png)

### About / Restaurant Story

![FORNO About Section](screenshots/Screenshot%202026-09-28%20155503.png)

### Contact / Find Us

![FORNO Contact Section](screenshots/Screenshot%202026-09-28%20155514.png)

---

## Features

- **Full single-page restaurant site** with hero, menu, specials, about, contact, and footer
- **Dynamic menu** with 16 unique pizzas rendered from a JavaScript data array
- **Real-time filter, search, and sort**
- **Product customization modal** for size, crust, toppings, and quantity
- **Live price calculation**
- **Slide-out cart drawer**
- **localStorage persistence**
- **Checkout flow** with validation and delivery/pickup options
- **Order success modal** with generated `FORNO-#####` reference
- **Toast notifications**
- **Sticky header**
- **Mobile hamburger navigation**
- **Scroll-to-top button**
- **Newsletter validation**
- **Accessibility support** including semantic HTML, ARIA labels, keyboard navigation, focus trapping, and `prefers-reduced-motion`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 |
| Logic | Vanilla JavaScript |
| Storage | localStorage |
| Images | Local JPEG assets |
| Deployment | Vercel |
| Dependencies | None |

Zero external dependencies. No npm. No bundler.

---

## Project Structure

```text
pizza-menu/
├── assets/
│   ├── logo.png
│   ├── pizza-1.jpeg
│   ├── ...
│   └── pizza-10.jpeg
├── screenshots/
│   ├── Screenshot 2026-09-28 155428.png
│   ├── Screenshot 2026-09-28 155444.png
│   ├── Screenshot 2026-09-28 155503.png
│   └── Screenshot 2026-09-28 155514.png
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## Running Locally

```bash
git clone https://github.com/Abduman21/pizza-menu.git
cd pizza-menu
```

Open `index.html` directly, or run:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

---

## Architecture

The JavaScript is organized around:

- `PIZZAS` — product data
- `state` — active filters, search, sort, cart, and modal state
- dynamic menu rendering
- search/filter/sort logic
- product customization
- price calculation
- cart state and rendering
- localStorage persistence
- checkout validation
- demo order generation
- toast feedback
- mobile navigation

The CSS is organized into sections for layout, typography, navigation, hero, cards, modals, cart, checkout, accessibility, animation, and responsive behavior.

---

## Demo-Only Features

The following are simulated:

- card payment
- order processing
- delivery timing
- newsletter submission
- map/location integration

No real payment is processed and no real restaurant order is sent.

---

## Future Improvements

- Backend order-management API
- Authentication and customer accounts
- Real payment gateway
- Order history
- Loyalty system
- Delivery tracking
- Real map integration
- Admin dashboard
- Higher-resolution food photography

---

## Developer

**Abdulmalik Muze**

- GitHub: https://github.com/Abduman21
- LinkedIn: https://www.linkedin.com/in/abdulmalik-muze-819951319/
- Portfolio: https://abdulmalikmuz.dev

---

**FORNO — Crafted by Fire. Made to Be Remembered.**
