// State
const cartListEl = document.getElementById('cartItems');
const totalPriceEl = document.getElementById('totalPrice');
const cartCountEl = document.getElementById('cartCount');
const cartCountInlineEl = document.getElementById('cartCountInline');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const filterButtons = document.querySelectorAll('.filter-btn');
const pizzaGrid = document.getElementById('pizzaMenu');
const toaster = document.getElementById('toaster');
const scrollTopBtn = document.getElementById('scrollTopBtn');

let cart = [];
let activeFilter = 'all';

// Helpers
function formatPrice(value) {
	return Number(value).toFixed(2);
}

function saveCart() {
	localStorage.setItem('pizza_cart', JSON.stringify(cart));
}

function loadCart() {
	try {
		const data = JSON.parse(localStorage.getItem('pizza_cart'));
		if (Array.isArray(data)) {
			cart = data;
		}
	} catch (_) {}
}

function showToast(message) {
	if (!toaster) return;
	const div = document.createElement('div');
	div.className = 'toast';
	div.textContent = message;
	toaster.appendChild(div);
	setTimeout(() => {
		div.remove();
	}, 3000);
}

function bump(element) {
	if (!element) return;
	element.style.transform = 'scale(1.1)';
	setTimeout(() => {
		element.style.transform = '';
	}, 150);
}

function updateCartUI() {
	cartListEl.innerHTML = '';
	let total = 0;

	cart.forEach((item, index) => {
		total += item.price * item.qty;

		const li = document.createElement('li');
		li.innerHTML = `
			<span>${item.name}</span>
			<div class="qty-group">
				<button class="qty-btn" data-action="dec" data-index="${index}">-</button>
				<span>${item.qty}</span>
				<button class="qty-btn" data-action="inc" data-index="${index}">+</button>
			</div>
			<span class="item-price">$${formatPrice(item.price * item.qty)}</span>
			<button class="remove-btn" title="Remove" data-action="remove" data-index="${index}">❌</button>
		`;
		cartListEl.appendChild(li);
	});

	totalPriceEl.textContent = formatPrice(total);
	const count = cart.reduce((sum, i) => sum + i.qty, 0);
	if (cartCountEl) cartCountEl.textContent = count;
	if (cartCountInlineEl) cartCountInlineEl.textContent = `(${count})`;
	bump(cartCountEl);
	bump(cartCountInlineEl);

	saveCart();
}

function addToCart(name, price) {
	const existing = cart.find(i => i.name === name);
	if (existing) {
		existing.qty += 1;
		showToast(`${name} quantity updated`);
	} else {
		cart.push({ name, price: Number(price), qty: 1 });
		showToast(`${name} added to cart`);
	}
	updateCartUI();
}

function changeQty(index, delta) {
	const item = cart[index];
	if (!item) return;
	item.qty += delta;
	if (item.qty <= 0) {
		showToast(`${item.name} removed`);
		cart.splice(index, 1);
	} else {
		showToast(`${item.name} x${item.qty}`);
	}
	updateCartUI();
}

function removeItem(index) {
	const item = cart[index];
	if (!item) return;
	showToast(`${item.name} removed`);
	cart.splice(index, 1);
	updateCartUI();
}

function clearCart() {
	cart = [];
	showToast('Cart cleared');
	updateCartUI();
}

// Interactions
function wireAddButtons() {
	pizzaGrid.querySelectorAll('.add-cart').forEach(button => {
		button.addEventListener('click', (e) => {
			const card = e.target.closest('.pizza-item');
			const name = card.dataset.name;
			const price = Number(card.dataset.price);
			addToCart(name, price);
		});
	});
}

cartListEl.addEventListener('click', (e) => {
	const target = e.target;
	const index = Number(target.getAttribute('data-index'));
	const action = target.getAttribute('data-action');
	if (!action) return;
	if (action === 'inc') changeQty(index, 1);
	if (action === 'dec') changeQty(index, -1);
	if (action === 'remove') removeItem(index);
});

const clearBtn = document.getElementById('clearCart');
if (clearBtn) clearBtn.addEventListener('click', clearCart);

const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
	if (!cart.length) {
		showToast('Your cart is empty');
		return;
	}
	showToast('Thanks for your order!');
	clearCart();
});

// Filter and search
function revealItems(items) {
	items.forEach((item, i) => {
		item.style.animation = 'none';
		item.offsetHeight; // reflow
		item.style.animation = `popIn 0.4s ease both`;
		item.style.animationDelay = `${i * 40}ms`;
	});
}

function applyFilters() {
	const term = (searchInput.value || '').toLowerCase();
	const items = Array.from(pizzaGrid.querySelectorAll('.pizza-item'));
	const visible = [];
	items.forEach(item => {
		const name = item.dataset.name.toLowerCase();
		const type = item.dataset.type;
		const matchesType = activeFilter === 'all' || type === activeFilter;
		const matchesSearch = !term || name.includes(term);
		const show = matchesType && matchesSearch;
		item.style.display = show ? '' : 'none';
		if (show) visible.push(item);
	});
	revealItems(visible);
}

filterButtons.forEach(btn => {
	btn.addEventListener('click', () => {
		filterButtons.forEach(b => {
			b.classList.remove('active');
			b.setAttribute('aria-pressed', 'false');
		});
		btn.classList.add('active');
		btn.setAttribute('aria-pressed', 'true');
		activeFilter = btn.dataset.filter;
		applyFilters();
	});
});

if (searchInput) {
	searchInput.addEventListener('input', applyFilters);
}

// Sorting
function sortCards() {
	const items = Array.from(pizzaGrid.querySelectorAll('.pizza-item'));
	let comparator = null;
	const value = sortSelect.value;
	if (value === 'price-asc') comparator = (a, b) => a - b;
	if (value === 'price-desc') comparator = (a, b) => b - a;
	if (value === 'name-asc') comparator = (a, b) => a.localeCompare(b);
	if (value === 'name-desc') comparator = (a, b) => b.localeCompare(a);

	if (!comparator) return; // default

	if (value.startsWith('price')) {
		items.sort((cardA, cardB) => {
			const pa = Number(cardA.dataset.price);
			const pb = Number(cardB.dataset.price);
			return comparator(pa, pb);
		});
	} else {
		items.sort((cardA, cardB) => {
			const na = cardA.dataset.name;
			const nb = cardB.dataset.name;
			return comparator(na, nb);
		});
	}
	items.forEach(card => pizzaGrid.appendChild(card));
	applyFilters();
}

if (sortSelect) sortSelect.addEventListener('change', sortCards);

// Scroll to top
window.addEventListener('scroll', () => {
	if (!scrollTopBtn) return;
	if (window.scrollY > 200) {
		scrollTopBtn.classList.add('visible');
	} else {
		scrollTopBtn.classList.remove('visible');
	}
});

if (scrollTopBtn) {
	scrollTopBtn.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
}

// Init
loadCart();
wireAddButtons();
applyFilters();
updateCartUI();
