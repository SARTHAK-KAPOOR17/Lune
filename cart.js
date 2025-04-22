const product = [
  {
    id: 0,
    image: 'images/air.png',
    title: 'Air Force',
    price: 1999,
  },
  {
    id: 1,
    image: 'images/blazer.png',
    title: 'Blazer',
    price: 6000,
  },
  {
    id: 2,
    image: 'images/crater.png',
    title: 'Crater',
    price: 2299,
  },
  {
    id: 3,
    image: 'images/air2.png',
    title: 'Air force 2',
    price: 999,
  },
  {
    id: 4,
    image: 'images/hippie2.png',
    title: 'Hippie',
    price: 3999,
    },
  {
    id: 5,
    image: 'images/jordan.png',
    title: 'Primimum Jordan',
    price: 4999,
  },

  {
    id: 6,
    image: 'images/jordan2.png',
    title: 'Jordan New variant',
    price: 2999,
  },
  {
    id: 7,
    image: 'images/hippie.png',
    title: 'Hippie',
    price: 4999,
  },
  {
    id: 8,
    image: 'images/blazer2.png',
    title: 'Blazer',
    price: 1999,
  }
];
const categories = [...new Set(product.map((item) => { return item }))]
let i = 0;
document.getElementById('root').innerHTML = categories.map((item) => {
  var { image, title, price } = item;
  return (
    `<div class='box'>
      <div class='img-box'>
        <img class='images' src=${image}></img>
      </div>
      <div class='bottom'>
        <p>${title}</p>
        <h2>₹ ${price}.00</h2>` +
        "<button onclick='addtocart(" + (i++) + ")'>Add to cart</button>" +
      `</div>
    </div>`
  )
}).join('')

var cart = [];

function addtocart(a) {
  cart.push({ ...categories[a] });
  displaycart();
}
function delElement(a) {
  cart.splice(a, 1);
  displaycart();
}

function displaycart() {
  let j = 0, total = 0;
  document.getElementById("count").innerHTML = cart.length;
  if (cart.length == 0) {
    document.getElementById('cartItem').innerHTML = "Your cart is empty";
    document.getElementById("total").innerHTML = "₹ " + 0 + ".00";
  }
  else {
    document.getElementById("cartItem").innerHTML = cart.map((items) => {
      var { image, title, price } = items;
      total = total + price;
      document.getElementById("total").innerHTML = "₹ " + total + ".00";
      return (
        `<div class='cart-item'>
          <div class='row-img'>
            <img class='rowimg' src=${image}>
          </div>
          <p style='font-size:12px;'>${title}</p>
          <h2 style='font-size: 15px;'>$ ${price}.00</h2>` +
        "<i class='fa-solid fa-trash' onclick='delElement(" + (j++) + ")'></i></div>"
      );
    }).join('');
  }
}
