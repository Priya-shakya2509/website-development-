// Cart array to hold items
let cart = [];

// Add item to cart
function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCartUI();
}

// Remove item from cart
function removeFromCart(name) {
  cart = cart.filter((item) => item.name !== name);
  updateCartUI();
}

// Update the cart UI
function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => removeFromCart(item.name);

    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });

  document.getElementById("total-price").textContent = total.toFixed(2);
}

// Navigation menu toggling
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

// Scroll header background change
function scrollHeader() {
  const header = document.getElementById("header");
  if (window.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

// Swiper instances (testimonial and new items)
let testimonialSwiper = new Swiper(".testimonial-swiper", {
  spaceBetween: 30,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let newSwiper = new Swiper(".new-swiper", {
  spaceBetween: 24,
  loop: true,

  breakpoints: {
    576: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  },
});

// Scroll sections active link
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// Show scroll up button
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  if (window.scrollY >= 350) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

// Cart element toggling
const cartElement = document.getElementById("cart"),
  cartShop = document.getElementById("cart-shop"),
  cartClose = document.getElementById("cart-close");

if (cartShop) {
  cartShop.addEventListener("click", () => {
    cartElement.classList.add("show-cart");
  });
}

if (cartClose) {
  cartClose.addEventListener("click", () => {
    cartElement.classList.remove("show-cart");
  });
}

// Dark/light theme toggling
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
// In updateCartUI function, inside forEach loop:
const qtyDiv = document.createElement("div");
qtyDiv.innerHTML = `
  <button onclick="changeQty('${item.name}', -1)">-</button>
  ${item.quantity}
  <button onclick="changeQty('${item.name}', 1)">+</button>
`;
li.appendChild(qtyDiv);

// Add this function:
function changeQty(name, delta) {
  const item = cart.find((i) => i.name === name);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) removeFromCart(name);
    updateCartUI();
  }
}
// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart on page load
window.onload = () => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCartUI();
  }
};

function updateCartUI() {
  saveCart();
}
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

// Call this inside addToCart
showToast(`${name} added to cart`);
