const defaultProducts = [
  {
    id: 1,
    nombre: "Pizza Margarita",
    descripcion: "Tomate, mozzarella, albahaca",
    precio: 12.0,
    imagen: "🍕",
    tags: ["featured", "vegetarian"],
  },
  {
    id: 2,
    nombre: "Hamburguesa Clásica",
    descripcion: "Carne, queso, lechuga, tomate",
    precio: 10.0,
    imagen: "🍔",
    tags: ["featured"],
  },
  {
    id: 3,
    nombre: "Tacos al Pastor",
    descripcion: "Carne marinada, cebolla, cilantro",
    precio: 8.0,
    imagen: "🌮",
    tags: ["spicy"],
  },
];

let cartItems = [];

async function loadCart() {
  const savedCart = localStorage.getItem("cart");

  if (savedCart) {
    cartItems = JSON.parse(savedCart);
  } else {
    cartItems = defaultProducts;
  }

  renderCartItems();
  updateTotal();
}

function renderCartItems() {
  const container = document.getElementById("checkout-items");

  if (!container) return;

  if (cartItems.length === 0) {
    container.innerHTML = '<p class="cart-empty">Tu carrito está vacío</p>';
    return;
  }

  container.innerHTML = cartItems
    .map(
      (item, index) => `
    <div class="checkout-item">
      <div class="checkout-item-image">${item.imagen}</div>
      <div class="checkout-item-details">
        <h3>${item.nombre}</h3>
        <p>${item.descripcion}</p>
      </div>
      <div class="checkout-item-price">$${item.precio.toFixed(2)}</div>
      <button class="remove-item" data-index="${index}" aria-label="Eliminar">×</button>
    </div>
  `
    )
    .join("");

  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.target.dataset.index);
      removeItem(index);
    });
  });
}

function removeItem(index) {
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCartItems();
  updateTotal();
}

function updateTotal() {
  const total = cartItems.reduce((sum, item) => sum + item.precio, 0);
  const totalElement = document.getElementById("checkout-total");

  if (totalElement) {
    totalElement.textContent = `$${total.toFixed(2)}`;
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const orderData = {
    nombre: formData.get("nombre"),
    telefono: formData.get("telefono"),
    direccion: formData.get("direccion"),
    notas: formData.get("notas"),
    metodoPago: formData.get("pago"),
    items: cartItems,
    total: cartItems.reduce((sum, item) => sum + item.precio, 0),
  };

  console.log("Pedido confirmado:", orderData);

  alert("¡Pedido confirmado! Gracias por tu compra.");

  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  loadCart();

  const form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
});
