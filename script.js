const defaultReviews = {
  1: [
    { author: 'Марина', rating: 5, text: 'Очень удобные, отлично подошли для прогулок по городу.' },
    { author: 'Иван', rating: 4, text: 'Нравится дизайн и качество ткани. Понравилось, что не скрипят.' }
  ],
  2: [
    { author: 'Алиса', rating: 5, text: 'Классически смотрятся и очень хорошо сидят по ноге.' },
    { author: 'Дмитрий', rating: 4, text: 'Качественная обувь, приятная на ощупь и практичная.' }
  ],
  3: [
    { author: 'Сергей', rating: 5, text: 'Очень оригинальный и стильный товар. Все друзья спрашивали, где взял.' },
    { author: 'Лена', rating: 4, text: 'Материал приятный, хорошо сидит, а цвет делает акцент на образе.' }
  ],
  4: [
    { author: 'Кирилл', rating: 5, text: 'Очень стильный и комфортный вариант. Я уже порекомендовал друзьям.' },
    { author: 'Наталья', rating: 5, text: 'Нравится всё: посадка, цвет, материал, качество.' }
  ]
};

const defaultProducts = [
  {
    id: 1,
    name: 'Товар 1',
    category: 'Кроссовки',
    price: 9900,
    description: 'Лёгкая модель с мягкой подошвой, которая подходит для повседневной носки и городских прогулок. Комфортный силуэт и аккуратная отделка подойдут для любого образа.',
    images: [
      makeProductArt('#d3d3d3', '#b8b8b8', 'Товар 1'),
      makeProductArt('#c8d7df', '#93a9b8', 'Товар 1'),
      makeProductArt('#e4d4ba', '#b29069', 'Товар 1')
    ]
  },
  {
    id: 2,
    name: 'Товар 2',
    category: 'Кроссовки',
    price: 12900,
    description: 'Спортивная пара с утончённой подошвой и классическим силуэтом. Подходит как для ежедневной носки, так и для стиля streetwear.',
    images: [
      makeProductArt('#ead9c3', '#caa785', 'Товар 2'),
      makeProductArt('#d7dfe8', '#8e9eb4', 'Товар 2'),
      makeProductArt('#d8d4cf', '#8c847d', 'Товар 2')
    ]
  },
  {
    id: 3,
    name: 'Palm Angels velour pants',
    category: 'Штаны',
    price: 10990,
    description: 'Плотные велюровые брюки с выразительным цветом и характерным силуэтом. Хорошо держат форму, выглядят эффектно и подходят для ярких образов.',
    images: [
      '5285432766902247446.jpg',
      makeProductArt('#ff8a44', '#ee5d23', 'Palm Angels 2'),
      makeProductArt('#db6a1b', '#9f3a0d', 'Palm Angels 3')
    ]
  },
  {
    id: 4,
    name: 'Товар 4',
    category: 'Кроссовки',
    price: 14900,
    description: 'Модель с массивной подошвой и современным силуэтом. Отлично подходит для активного дня и яркого повседневного образа.',
    images: [
      makeProductArt('#f0d4a6', '#c99554', 'Товар 4'),
      makeProductArt('#d9dfd7', '#8a9d8f', 'Товар 4'),
      makeProductArt('#c9dbe8', '#7d99b4', 'Товар 4')
    ]
  }
];

const getManagedProducts = () => {
  try {
    return JSON.parse(localStorage.getItem('albert-managed-products') || '[]');
  } catch {
    return [];
  }
};

let products = [
  ...getManagedProducts().map((product) => ({
    id: Number(product.id || Date.now() + Math.random()),
    name: product.name,
    category: product.category || 'Товары',
    price: Number(product.price || 0),
    description: product.description || '',
    images: Array.isArray(product.images) && product.images.length ? product.images : [product.image || ''],
    sizes: Array.isArray(product.sizes) && product.sizes.length ? product.sizes : (product.size ? [product.size] : ['One Size'])
  })),
  ...defaultProducts
];

function syncProducts() {
  products = [
    ...getManagedProducts().map((product) => ({
      id: Number(product.id || Date.now() + Math.random()),
      name: product.name,
      category: product.category || 'Товары',
      price: Number(product.price || 0),
      description: product.description || '',
      images: Array.isArray(product.images) && product.images.length ? product.images : [product.image || ''],
      sizes: Array.isArray(product.sizes) && product.sizes.length ? product.sizes : (product.size ? [product.size] : ['One Size'])
    })),
    ...defaultProducts
  ];
}

const persistedReviews = JSON.parse(localStorage.getItem('albert-reviews') || 'null');
const state = {
  cart: JSON.parse(localStorage.getItem('albert-cart') || '[]'),
  likes: new Set(JSON.parse(localStorage.getItem('albert-likes') || '[]')),
  purchased: new Set(JSON.parse(localStorage.getItem('albert-purchased') || '[]')),
  activeProductId: null,
  reviews: persistedReviews && typeof persistedReviews === 'object' ? persistedReviews : defaultReviews
};

const formatPrice = (value) => `${Number(value).toLocaleString('ru-RU').replace(/\s/g, ' ')} ₽`;
const getProductById = (id) => products.find((product) => product.id === Number(id));
const saveCart = () => localStorage.setItem('albert-cart', JSON.stringify(state.cart));
const saveLikes = () => localStorage.setItem('albert-likes', JSON.stringify([...state.likes]));
const savePurchased = () => localStorage.setItem('albert-purchased', JSON.stringify([...state.purchased]));
const saveReviews = () => localStorage.setItem('albert-reviews', JSON.stringify(state.reviews));

function makeProductArt(baseColor, accent, label) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
      <defs>
        <linearGradient id="g-${label}" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${baseColor}"/>
          <stop offset="100%" stop-color="${accent}"/>
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="#f2efe9"/>
      <rect x="100" y="80" width="400" height="440" rx="70" fill="url(#g-${label})"/>
      <rect x="160" y="150" width="280" height="260" rx="30" fill="rgba(255,255,255,0.18)"/>
      <rect x="170" y="425" width="260" height="40" rx="18" fill="rgba(0,0,0,0.18)"/>
      <text x="300" y="505" font-size="38" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif" font-weight="700">${label}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function renderCatalog() {
  syncProducts();
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const activeCategory = localStorage.getItem('albert-active-category') || 'Все';
  const visibleProducts = activeCategory === 'Все'
    ? products
    : products.filter((product) => product.category === activeCategory);

  grid.innerHTML = visibleProducts.map((product) => {
    const liked = state.likes.has(product.id);
    const inCart = state.cart.some((item) => item.id === product.id);
    return `
      <article class="card" data-product-id="${product.id}">
        <div class="card-thumb">
          <img src="${product.images[0]}" alt="${product.name}">
          <div class="badge">Под заказ</div>
          <div class="card-icons">
            <button class="circle-btn like-toggle ${liked ? 'is-liked' : ''}" data-product-id="${product.id}" aria-label="Лайк">
              <svg viewBox="0 0 24 24"><path d="M20.8 8.6c0 4.4-8.8 10-8.8 10s-8.8-5.6-8.8-10a4.6 4.6 0 0 1 8.8-2 4.6 4.6 0 0 1 8.8 2z"/></svg>
            </button>
            <button class="circle-btn preview-btn" data-product-id="${product.id}" aria-label="Посмотреть товар">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/></svg>
            </button>
          </div>
        </div>
        <div class="thumb-strip">
          ${product.images.slice(0, 4).map((image) => `<img class="mini" src="${image}" alt="${product.name}">`).join('')}
        </div>
        <div class="card-name">${product.name}</div>
        <div class="card-cat">${product.category}</div>
        <div class="card-price">${formatPrice(product.price)}</div>
      </article>
    `;
  }).join('');

  const likeButtons = document.querySelectorAll('.like-toggle');
  likeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const productId = Number(button.dataset.productId);
      toggleLike(productId);
    });
  });

  const previewButtons = document.querySelectorAll('.preview-btn');
  previewButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      openModal(Number(button.dataset.productId));
    });
  });

  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      openModal(Number(card.dataset.productId));
    });
  });
}

function toggleLike(productId) {
  if (state.likes.has(productId)) {
    state.likes.delete(productId);
  } else {
    state.likes.add(productId);
  }
  saveLikes();
  renderCatalog();
  if (state.activeProductId === productId) {
    renderModal();
  }
}

function openModal(productId) {
  const product = getProductById(productId);
  if (!product) return;
  state.activeProductId = productId;
  const modal = document.getElementById('product-modal');
  if (!modal) return;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  renderModal();
}

function closeModal() {
  const modal = document.getElementById('product-modal');
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
}

function renderModal() {
  const product = getProductById(state.activeProductId);
  const modal = document.getElementById('product-modal');
  if (!product || !modal) return;

  const mainImage = document.getElementById('modal-main-image');
  const thumbs = document.getElementById('modal-thumbs');
  const title = document.getElementById('modal-title');
  const price = document.getElementById('modal-price');
  const description = document.getElementById('modal-description');
  const rating = document.getElementById('modal-rating');
  const reviewCount = document.getElementById('review-count');
  const likeButton = document.getElementById('modal-like');
  const reviewList = document.getElementById('review-list');
  const reviewForm = document.getElementById('review-form');
  const reviewLocked = document.getElementById('review-locked');

  mainImage.src = product.images[0];
  mainImage.alt = product.name;

  thumbs.innerHTML = product.images.map((image, index) => `
    <img class="modal-thumb ${index === 0 ? 'active' : ''}" src="${image}" alt="${product.name} preview ${index + 1}" data-index="${index}">
  `).join('');

  thumbs.querySelectorAll('.modal-thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const index = Number(thumb.dataset.index);
      mainImage.src = product.images[index];
      thumbs.querySelectorAll('.modal-thumb').forEach((item) => item.classList.toggle('active', item === thumb));
    });
  });

  title.textContent = product.name;
  price.textContent = formatPrice(product.price);
  description.textContent = product.description;

  const productReviews = state.reviews[product.id] || [];
  const averageRating = productReviews.length
    ? (productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length).toFixed(1)
    : '0.0';

  rating.textContent = `★ ${averageRating}`;
  reviewCount.textContent = `${productReviews.length} отзыв${productReviews.length === 1 ? '' : 'ов'}`;

  const liked = state.likes.has(product.id);
  likeButton.classList.toggle('is-liked', liked);
  likeButton.textContent = liked ? '♥' : '♡';
  likeButton.onclick = () => toggleLike(product.id);

  reviewList.innerHTML = productReviews.length
    ? productReviews.map((review, index) => `
      <article class="review-item">
        <div class="review-top">
          <span class="review-author">${review.author}</span>
          <span class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
        </div>
        <div class="review-text">${review.text}</div>
        <div style="display:flex;justify-content:flex-end;margin-top:10px;">
          <button class="review-delete" data-review-index="${index}" type="button">Удалить</button>
        </div>
      </article>
    `).join('')
    : '<div class="review-item"><div class="review-text">Пока нет отзывов. Станьте первым.</div></div>';

  reviewList.querySelectorAll('.review-delete').forEach((button) => {
    button.addEventListener('click', () => {
      const reviewIndex = Number(button.dataset.reviewIndex);
      const current = state.reviews[product.id] || [];
      current.splice(reviewIndex, 1);
      state.reviews[product.id] = current;
      saveReviews();
      renderModal();
    });
  });

  const canReview = state.purchased.has(product.id);
  reviewForm.classList.toggle('disabled', !canReview);
  reviewLocked.style.display = canReview ? 'none' : 'inline-block';

  const reviewText = document.getElementById('review-text');
  if (reviewText) {
    reviewText.value = '';
  }

  if (canReview) {
    reviewForm.onsubmit = (event) => {
      event.preventDefault();
      const text = document.getElementById('review-text').value.trim();
      const ratingValue = Number(document.getElementById('review-rating').value);
      if (!text) return;

      const currentReviews = state.reviews[product.id] || [];
      currentReviews.unshift({
        author: 'Вы',
        rating: ratingValue,
        text
      });
      state.reviews[product.id] = currentReviews;
      saveReviews();
      reviewForm.reset();
      renderModal();
    };
  }
}

function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const existingItem = state.cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    state.cart.push({ id: productId, qty: 1 });
  }
  saveCart();
  updateCartUI();
  openCart();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const total = document.getElementById('cart-total');

  if (!cartItems || !cartCount || !total) return;

  if (!state.cart.length) {
    cartItems.innerHTML = '<div class="cart-empty">Корзина пока пустая.</div>';
    cartCount.textContent = '0';
    total.textContent = '0 ₽';
    return;
  }

  cartItems.innerHTML = state.cart.map((item) => {
    const product = getProductById(item.id);
    if (!product) return '';
    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <img class="cart-item-thumb" src="${product.images[0]}" alt="${product.name}">
          <div>
            <div class="cart-item-name">${product.name}</div>
            <div class="cart-item-price">${formatPrice(product.price)} × ${item.qty}</div>
          </div>
        </div>
        <button class="remove-item" data-remove-id="${product.id}">Удалить</button>
      </div>
    `;
  }).join('');

  const cartTotalValue = state.cart.reduce((sum, item) => {
    const product = getProductById(item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);

  cartCount.textContent = String(state.cart.reduce((count, item) => count + item.qty, 0));
  total.textContent = formatPrice(cartTotalValue);

  cartItems.querySelectorAll('.remove-item').forEach((button) => {
    button.addEventListener('click', () => removeFromCart(Number(button.dataset.removeId)));
  });
}

function openCart() {
  const cart = document.getElementById('cart-drawer');
  if (!cart) return;
  cart.classList.add('is-open');
}

function closeCart() {
  const cart = document.getElementById('cart-drawer');
  if (!cart) return;
  cart.classList.remove('is-open');
}

function openPaymentModal() {
  const paymentModal = document.getElementById('payment-modal');
  if (!paymentModal) return;
  paymentModal.classList.add('is-open');
  paymentModal.setAttribute('aria-hidden', 'false');
}

function closePaymentModal() {
  const paymentModal = document.getElementById('payment-modal');
  if (!paymentModal) return;
  paymentModal.classList.remove('is-open');
  paymentModal.setAttribute('aria-hidden', 'true');
}

function checkoutCart() {
  if (!state.cart.length) return;
  openPaymentModal();
  closeCart();
}

document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  updateCartUI();

  const modal = document.getElementById('product-modal');
  const modalClose = document.getElementById('modal-close');
  const cartButton = document.getElementById('cart-button');
  const cartClose = document.getElementById('cart-close');
  const checkoutButton = document.getElementById('checkout-btn');
  const paymentModal = document.getElementById('payment-modal');
  const paymentClose = document.getElementById('payment-close');
  const catalogScrollButton = document.getElementById('catalog-scroll-btn');

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  paymentClose.addEventListener('click', closePaymentModal);
  paymentModal.addEventListener('click', (event) => {
    if (event.target === paymentModal) closePaymentModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
      closeCart();
      closePaymentModal();
    }
  });

  cartButton.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  checkoutButton.addEventListener('click', checkoutCart);
  catalogScrollButton.addEventListener('click', () => {
    document.getElementById('product-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.getElementById('modal-cart-btn').addEventListener('click', () => {
    addToCart(state.activeProductId);
    closeModal();
  });

  document.getElementById('modal-buy-btn').addEventListener('click', () => {
    openPaymentModal();
    closeModal();
  });

  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      openModal(Number(card.dataset.productId));
    });
  });

  document.querySelectorAll('.cat-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      const category = tile.dataset.category || 'Все';
      localStorage.setItem('albert-active-category', category);
      document.querySelectorAll('.cat-tile').forEach((item) => {
        item.classList.toggle('is-active', item === tile);
      });
      renderCatalog();
    });
  });

  const initialCategory = localStorage.getItem('albert-active-category') || 'Все';
  document.querySelectorAll('.cat-tile').forEach((tile) => {
    tile.classList.toggle('is-active', (tile.dataset.category || 'Все') === initialCategory);
  });

  window.addEventListener('storage', () => {
    syncProducts();
    renderCatalog();
    updateCartUI();
  });
});
