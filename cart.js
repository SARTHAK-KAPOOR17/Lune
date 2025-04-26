const product = [
  { id: 0, image: 'images/air.png', title: 'Air Force', price: 1999, stock: 5, rating: 4.5, review: "Great comfort!" },
  { id: 1, image: 'images/blazer.png', title: 'Blazer', price: 6000, stock: 3, rating: 4.0, review: "Premium feel." },
  { id: 2, image: 'images/crater.png', title: 'Crater', price: 2299, stock: 8, rating: 4.2, review: "Stylish and solid." },
  { id: 3, image: 'images/air2.png', title: 'Air force 2', price: 999, stock: 6, rating: 3.8, review: "Good for daily use." },
  { id: 4, image: 'images/hippie2.png', title: 'Hippie', price: 3999, stock: 4, rating: 4.6, review: "Super trendy!" },
  { id: 5, image: 'images/jordan.png', title: 'Jordan Premium', price: 4999, stock: 2, rating: 4.9, review: "Top-notch quality." }
];

// Coupon system
const coupons = {
  "SAVE10": { discount: 10, expiry: "2025-12-31" },
  "SUPER20": { discount: 20, expiry: "2025-06-30" }
};

let cart = [];
let appliedCoupon = null;

// Smart Recommendation Map
const recommendationsMap = {
  "Air Force": ["Air force 2", "Blazer"],
  "Blazer": ["Jordan Premium", "Crater"],
  "Crater": ["Hippie", "Air Force"],
  "Air force 2": ["Air Force", "Hippie"],
  "Hippie": ["Crater", "Jordan Premium"],
  "Jordan Premium": ["Blazer", "Hippie"]
};

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const saved = localStorage.getItem("cart");
  if (saved) {
    cart = JSON.parse(saved);
    updateCart();
  }
}

function renderProducts() {
  document.getElementById('root').innerHTML = product.map((item, i) => `
    <div class='box'>
      <div class='img-box'><img class='images' src='${item.image}'></div>
      <p>${item.title}</p>
      <p>⭐ ${item.rating} | "${item.review}"</p>
      <h2>₹ ${item.price}.00</h2>
      <p>Stock: ${item.stock}</p>
      <button onclick='addToCart(${i})'>Add to Cart</button>
    </div>
  `).join('');
}

function addToCart(index) {
  const item = product[index];
  const found = cart.find(p => p.id === item.id);
  const inCartQty = found ? found.quantity : 0;

  if (inCartQty >= item.stock) {
    alert(`Only ${item.stock} item(s) left in stock!`);
    return;
  }

  if (found) {
    found.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  updateCart();
  saveCart();
  updateRecommendations(); // New: Update smart recommendations
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  saveCart();
  updateRecommendations(); // New: Update smart recommendations
}

function updateCart() {
  let total = 0;
  document.getElementById("count").innerText = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    document.getElementById('cartItem').innerHTML = "Your cart is empty";
    document.getElementById("total").innerText = "₹ 0.00";
    appliedCoupon = null;
    return;
  }

  document.getElementById('cartItem').innerHTML = cart.map((item, i) => {
    total += item.price * item.quantity;
    return `
      <div class='cart-item'>
        <div class='row-img'><img class='rowimg' src='${item.image}' /></div>
        <p>${item.title}</p>
        <div>
          <input type="number" class="qty-input" value="${item.quantity}" min="1" onchange="changeQtyInput(${i}, this.value)">
        </div>
        <h2>₹ ${item.price * item.quantity}</h2>
        <i class='fa-solid fa-trash' onclick='removeFromCart(${i})'></i>
      </div>
    `;
  }).join('');

  if (appliedCoupon) {
    total = total * (1 - appliedCoupon.discount / 100);
  }
  document.getElementById("total").innerText = `₹ ${total.toFixed(2)}`;
}

function changeQtyInput(i, newQty) {
  newQty = parseInt(newQty);
  const productData = product.find(p => p.id === cart[i].id);

  if (newQty > productData.stock) {
    alert(`Only ${productData.stock} items in stock!`);
    return;
  }

  if (newQty <= 0) {
    removeFromCart(i);
  } else {
    cart[i].quantity = newQty;
  }
  updateCart();
  saveCart();
  updateRecommendations(); // New: Update smart recommendations
}

function applyCoupon() {
  const code = document.getElementById("couponCode").value.trim().toUpperCase();
  if (appliedCoupon) {
    alert("Coupon already applied.");
    return;
  }

  if (coupons[code]) {
    const today = new Date();
    const expiryDate = new Date(coupons[code].expiry);

    if (today <= expiryDate) {
      appliedCoupon = { code: code, discount: coupons[code].discount };
      updateCart();
      alert(`Coupon Applied: ${coupons[code].discount}% Off`);
    } else {
      alert("Coupon has expired.");
    }
  } else {
    alert("Invalid Coupon Code.");
  }
}

function toggleDarkMode() {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === "light" ? "dark" : "light";
}

// Smart AI Recommendation Logic
function getSmartRecommendations(cartItems) {
  const titlesInCart = cartItems.map(item => item.title);
  const recommendedTitles = new Set();

  titlesInCart.forEach(title => {
    if (recommendationsMap[title]) {
      recommendationsMap[title].forEach(recTitle => {
        if (!titlesInCart.includes(recTitle)) {
          recommendedTitles.add(recTitle);
        }
      });
    }
  });

  return product.filter(p => recommendedTitles.has(p.title));
}

// Update Recommendation Section
function updateRecommendations() {
  const smartRecs = getSmartRecommendations(cart);

  if (smartRecs.length === 0) {
    document.getElementById("recommendationBox").innerHTML = "<p>No recommendations yet! Buy Something to use this feature!!!</p>";
    return;
  }

  document.getElementById("recommendationBox").innerHTML = smartRecs.map(item => `
    <div class='box'>
      <div class='img-box'><img class='images' src='${item.image}' /></div>
      <p>${item.title}</p>
      <h4>₹ ${item.price}</h4>
      <button onclick="addToCart(${item.id})">Add</button>
    </div>
  `).join('');
}

function showRecommendations() {
  updateRecommendations(); // Now calling smart recommendations instead of random 3
}

window.onload = function () {
  renderProducts();
  showRecommendations();
  loadCart();
};
