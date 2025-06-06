// Add delete button for cart
// Add local storage

document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product Name 1", price: 20 },
    { id: 2, name: "Product Name 2", price: 10 },
    { id: 3, name: "Product Name 3", price: 30 },
  ];

  const cart = [];
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");
  const deleteBtn = document.getElementById("delete-btn");

  function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function getItemsFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      cart.push(...JSON.parse(savedCart));
    }
  }

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id=${product.id}>Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      console.log(product);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveCartToLocalStorage();
    renderCart();
  }

  function renderCart() {
    cartItems.innerText = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
          ${item.name} - ${item.price.toFixed(
          2
        )} <button data-index="${index}" class="delete-btn">Delete Item</button>
        `;
        cartItems.appendChild(cartItem);
        totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    saveCartToLocalStorage()
    alert("Checkout successfull");
    renderCart();
  });

  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const index = parseInt(e.target.getAttribute("data-index"));
      cart.splice(index, 1);
      saveCartToLocalStorage();
      renderCart();
    }
  });
  getItemsFromLocalStorage()
  renderCart()
});
