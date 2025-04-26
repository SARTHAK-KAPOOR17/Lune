const product = [
  { id: 0, image: 'images/air.png', title: 'Air Force', price: 1999 },
  { id: 1, image: 'images/blazer.png', title: 'Blazer', price: 6000 },
  { id: 2, image: 'images/crater.png', title: 'Crater', price: 2299 },
  { id: 3, image: 'images/air2.png', title: 'Air force 2', price: 999 },
  { id: 4, image: 'images/hippie2.png', title: 'Hippie', price: 3999 },
  { id: 5, image: 'images/jordan.png', title: 'Jordan Premium', price: 4999 }
];

let cart = [];
let discountApplied = false;

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
      <h2>₹ ${item.price}.00</h2>
      <button onclick='addToCart(${i})'>Add to Cart</button>
    </div>
  `).join('');
}

function addToCart(index) {
  const item = product[index];
  const found = cart.find(p => p.id === item.id);
  if (found) {
    found.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  updateCart();
  saveCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  saveCart();
}

function updateCart() {
  let total = 0;
  document.getElementById("count").innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cart.length === 0) {
    document.getElementById('cartItem').innerHTML = "Your cart is empty";
    document.getElementById("total").innerText = "₹ 0.00";
    discountApplied = false;
    return;
  }

  document.getElementById('cartItem').innerHTML = cart.map((item, i) => {
    total += item.price * item.quantity;
    return `
      <div class='cart-item'>
        <div class='row-img'><img class='rowimg' src='${item.image}' /></div>
        <p>${item.title}</p>
        <div>
          <button onclick="changeQty(${i}, 'dec')">-</button>
          <span> ${item.quantity} </span>
          <button onclick="changeQty(${i}, 'inc')">+</button>
        </div>
        <h2>₹ ${item.price * item.quantity}</h2>
        <i class='fa-solid fa-trash' onclick='removeFromCart(${i})'></i>
      </div>
    `;
  }).join('');

  // Apply discount if already applied
  if (discountApplied) {
    document.getElementById("total").innerText = `₹ ${(total * 0.9).toFixed(2)}`;
  } else {
    document.getElementById("total").innerText = `₹ ${total.toFixed(2)}`;
  }
}

function changeQty(i, type) {
  if (type === 'inc') cart[i].quantity++;
  else {
    cart[i].quantity--;
    if (cart[i].quantity <= 0) {
      removeFromCart(i);
      return;
    }
  }
  updateCart();
  saveCart();
}

function applyCoupon() {
  if (discountApplied) {
    alert("Coupon already applied.");
    return;
  }

  const code = document.getElementById("couponCode").value.trim();
  if (code === "SAVE10") {
    discountApplied = true;
    updateCart(); // triggers 10% discount display
    alert("Coupon Applied: 10% Discount!");
  } else {
    alert("Invalid Coupon Code");
  }
}

function toggleDarkMode() {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === "light" ? "dark" : "light";
}

function showRecommendations() {
  const recs = product.slice(0, 3);
  document.getElementById("recommendationBox").innerHTML = recs.map((item, i) => `
    <div class='box'>
      <div class='img-box'><img class='images' src='${item.image}' /></div>
      <p>${item.title}</p>
      <h4>₹ ${item.price}</h4>
      <button onclick="addToCart(${i})">Add</button>
    </div>
  `).join('');
}

window.onload = function () {
  renderProducts();
  showRecommendations();
  loadCart();
};