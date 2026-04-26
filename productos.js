const TAG_CONFIG = {
  featured: { emoji: "🔥", text: "Recomendado", class: "tag-featured", absolute: true },
  vegetarian: { emoji: "🌱", text: "Vegetariano", class: "tag-vegetarian" },
  spicy: { emoji: "🌶️", text: "Picante", class: "tag-spicy" },
  new: { emoji: "✨", text: "Nuevo", class: "tag-new" },
  popular: { emoji: "⭐", text: "Popular", class: "tag-popular" }
};

function renderTags(tags, asAbsolute = false) {
  if (asAbsolute) {
    return tags
      .filter(t => TAG_CONFIG[t]?.absolute)
      .map(t => `<span class="tag ${TAG_CONFIG[t].class} tag-absolute">${TAG_CONFIG[t].emoji} ${TAG_CONFIG[t].text}</span>`)
      .join("");
  }

  return tags
    .filter(t => !TAG_CONFIG[t]?.absolute)
    .map(t => `<span class="tag ${TAG_CONFIG[t].class}">${TAG_CONFIG[t].emoji} ${TAG_CONFIG[t].text}</span>`)
    .join("");
}

function renderProduct(product) {
  const absoluteTagsHtml = renderTags(product.tags, true);
  const normalTagsHtml = renderTags(product.tags, false);

  return `
    <article class="menu-item">
      <div class="menu-item-image">${product.imagen}</div>
      ${absoluteTagsHtml}
      <div class="menu-item-info">
        ${normalTagsHtml ? `<div class="menu-item-tags">${normalTagsHtml}</div>` : ""}
        <h3>${product.nombre}</h3>
        <p>${product.descripcion}</p>
        <span class="menu-item-price">$${product.precio.toFixed(2)}</span>
      </div>
    </article>
  `;
}

async function loadProducts() {
  try {
    const response = await fetch("productos.json");
    const products = await response.json();
    const container = document.querySelector(".menu-grid");

    if (container) {
      container.innerHTML = products.map(renderProduct).join("");
    }
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadProducts);