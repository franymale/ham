var swiper = new Swiper(".mySwiper-1", {
    slidesPerView:1,
    spaceBetween: 30,
    loop:true,
    pagination: {
        el:".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev",
    }
});

var swiper = new Swiper(".mySwiper-2", {
    slidesPerView:3,
    spaceBetween: 20,
    loop:true,
    loopFillGroupWithBlank:true,
    navigation: {
        nextE1:".swiper-button-next",
        prevE1:".swiper-button-prev",
    },
    breakpoints : {
        0: {
            slidesPerView:1,
        },
        520: {
            slidesPerView:2,
        },
        950: {
            slidesPerView:3,
        }
    }
});

let tabInputs = document.querySelectorAll(".tabInput");

tabInputs.forEach(function(input){
    input.addEventListener('change', function(){
        let id = input.ariaValueMax;
        let thisSwiper = document.getElementById('swiper' + id);
        thisSwiper.swiper.update();
    })

});
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartBtn = document.getElementById("cart-toggle-btn");
const cartPanel = document.getElementById("cart-panel");
const closeCart = document.getElementById("close-cart");
const cartCount = document.getElementById("cart-count");

function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `${item.name} - $${item.price} <button data-index="${index}" class="remove-item">❌</button>`;
    cartItems.appendChild(itemDiv);
    total += item.price;
});


  cartTotal.textContent = `$${total}`;
  cartCount.textContent = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));
}

document.querySelectorAll(".add").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    cart.push({ name, price });
    updateCartDisplay();
  });
});

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  const numeroWhatsApp = "15555555555";

  const mensaje = cart.map(item => ` ${item.name}: $${item.price}`).join('%0A') +
    ` Total: $${cart.reduce((sum, i) => sum + i.price, 0)}`;

  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent("Hi, this is my order:" + mensaje)}`;

  window.open(url, '_blank');
});


cartBtn.addEventListener("click", () => {
  cartPanel.classList.toggle("open");
});

closeCart.addEventListener("click", () => {
  cartPanel.classList.remove("open");
});
document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", () => {
        const index = parseInt(btn.dataset.index);
        cart.splice(index, 1); // elimina el producto
        updateCartDisplay();   // vuelve a renderizar
    });
});


updateCartDisplay();
function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
  ${item.name} - $${item.price}
  <button data-index="${index}" class="remove-item" style="
    margin-left: 10px;
    background-color: transparent;
    color: #DB241B;
    border: none;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
  ">❌</button>
`;

    cartItems.appendChild(itemDiv);
    total += item.price;
  });

  cartTotal.textContent = `$${total}`;
  cartCount.textContent = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));


  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      cart.splice(index, 1); 
      updateCartDisplay();   
    });
  });
}
