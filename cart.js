const product = [
  { id: 0, image: 'images/air.png', title: 'Air Force', price: 1999, stock: 5, rating: 4.5, review: "Great comfort!" },
  { id: 1, image: 'images/blazer.png', title: 'Blazer', price: 6000, stock: 3, rating: 4.0, review: "Premium feel." },
  { id: 2, image: 'images/crater.png', title: 'Crater', price: 2299, stock: 8, rating: 4.2, review: "Stylish and solid." },
  { id: 3, image: 'images/air2.png', title: 'Air force 2', price: 999, stock: 6, rating: 3.8, review: "Good for daily use." },
  { id: 4, image: 'images/hippie2.png', title: 'Hippie', price: 3999, stock: 4, rating: 4.6, review: "Super trendy!" },
  { id: 5, image: 'images/jordan.png', title: 'Jordan Premium', price: 4999, stock: 2, rating: 4.9, review: "Top-notch quality." }
];

const coupons = {
  "SAVE10": { discount: 10, expiry: "2025-12-31" },
  "SUPER20": { discount: 20, expiry: "2025-06-30" }
};

let cart = [];
let appliedCoupon = null;

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
      <button onclick='comparePrice(${i})'>Compare Price</button>
      <div class="compare-price" id="compare-${i}"></div>
    </div>
  `).join('');
}

function comparePrice(index) {
  const item = product[index];
  const randomDiscount = Math.random() * 0.15; 
  const newPrice = (item.price * (1 - randomDiscount)).toFixed(2);

  document.getElementById(`compare-${index}`).innerHTML = `Best price: ₹ ${newPrice}`;
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
    found.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart();
  updateCart();
}

function updateCart() {
  const cartContainer = document.getElementById('cartItem');
  cartContainer.innerHTML = cart.length ? cart.map((item) => `
    <div class="cart-item">
      <div class="row-img"><img class="rowimg" src="${item.image}"></div>
      <p>${item.title} (₹${item.price}.00)</p>
      <div>
        <p>Qty: ${item.quantity}</p>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    </div>
  `).join('') : 'Your cart is empty';
  
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  document.getElementById('total').innerText = `₹ ${total.toFixed(2)}`;

  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById('count').innerText = count;
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCart();
}

function applyCoupon() {
  const code = document.getElementById("couponCode").value.toUpperCase();

  if (coupons[code] && new Date(coupons[code].expiry) > new Date()) {
    appliedCoupon = coupons[code];
    alert(`Coupon applied! ${appliedCoupon.discount}% off`);
  } else {
    alert("Invalid or expired coupon code.");
  }
}

function loadShippingOptions() {
  const options = ["Standard - ₹50", "Express - ₹150", "Overnight - ₹500"];
  const shippingSelect = document.getElementById("shippingOptions");
  shippingSelect.innerHTML = options.map(option => `<option>${option}</option>`).join('');
}

function calculateShipping() {
  const selectedOption = document.getElementById("shippingOptions").value;
  const shippingCost = selectedOption.includes("Standard") ? 50 : selectedOption.includes("Express") ? 150 : 500;
  document.getElementById("shippingCost").innerText = `Shipping Cost: ₹${shippingCost}`;
}

function shareCart() {
  const cartDetails = cart.map(item => `${item.title}: ₹${item.price} x ${item.quantity}`).join('\n');
  alert(`Share this cart:\n${cartDetails}`);
}

window.onload = function() {
  renderProducts();
  loadCart();
  loadShippingOptions();
};