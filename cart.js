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
    found.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  updateCart();
  saveCart();
  updateRecommendations();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  saveCart();
  updateRecommendations();
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
        <div class='row-img'>
          <img class='rowimg' src='${item.image}'>
        </div>
        <p>${item.title}</p>
        <p>₹ ${item.price} x ${item.quantity}</p>
        <button onclick='removeFromCart(${i})'>Remove</button>
      </div>
    `;
  }).join('');

  let finalTotal = total;
  if (appliedCoupon) {
    finalTotal = finalTotal - finalTotal * (appliedCoupon.discount / 100);
  }
  document.getElementById("total").innerText = `₹ ${finalTotal.toFixed(2)}`;
}

function shareCart() {
  const cartData = JSON.stringify(cart);
  const cartDataEncoded = encodeURIComponent(cartData);
  const shareableLink = `${window.location.href}?cart=${cartDataEncoded}`;
  alert(`Share this link to share your cart: ${shareableLink}`);
}

function loadCartFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const cartDataEncoded = urlParams.get('cart');
  if (cartDataEncoded) {
    try {
      const cartData = decodeURIComponent(cartDataEncoded);
      cart = JSON.parse(cartData);
      updateCart();
    } catch (e) {
      console.error("Error loading cart from URL:", e);
    }
  }
}

window.onload = function() {
  loadCartFromURL();
  renderProducts();
  updateRecommendations();
  loadCart();
};

function applyCoupon() {
  const couponCode = document.getElementById('couponCode').value.toUpperCase();
  if (coupons[couponCode]) {
    const coupon = coupons[couponCode];
    if (new Date(coupon.expiry) >= new Date()) {
      alert(`Coupon applied: ${couponCode} - ${coupon.discount}% off`);
      appliedCoupon = coupon;
    } else {
      alert("Coupon has expired");
    }
  } else {
    alert("Invalid coupon code");
  }
}

function updateRecommendations() {
  const recommendationBox = document.getElementById('recommendationBox');
  recommendationBox.innerHTML = "";
  const cartTitles = cart.map(item => item.title);
  const recommendedItems = cartTitles.flatMap(title => recommendationsMap[title] || []);
  const uniqueRecommendedItems = [...new Set(recommendedItems)];
  uniqueRecommendedItems.forEach(title => {
    const recommendedProduct = product.find(p => p.title === title);
    recommendationBox.innerHTML += `
      <div class='box'>
        <div class='img-box'><img class='images' src='${recommendedProduct.image}'></div>
        <p>${recommendedProduct.title}</p>
        <h2>₹ ${recommendedProduct.price}.00</h2>
        <button onclick='addToCart(${recommendedProduct.id})'>Add to Cart</button>
      </div>
    `;
  });
}