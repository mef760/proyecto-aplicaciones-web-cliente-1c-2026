document.addEventListener("DOMContentLoaded", (event) => {
    const products = [
        {
            name: "Batería Moura 12x65",
            price: "$10.00",
            image: "https://http2.mlstatic.com/D_NQ_NP_637894-MLA81758252428_122024-O.webp",
            quotes: "3 cuotas sin interés de $3.33",
            location: "Disponible en tienda"
        },
        {
            name: "Batería Moura 12x120",
            price: "$20.00",
            image: "https://http2.mlstatic.com/D_NQ_NP_637894-MLA81758252428_122024-O.webp",
            quotes: "6 cuotas sin interés de $3.33",
            location: "Disponible en tienda"
        },
        {
            name: "Batería Moura 12x200",
            price: "$30.00",
            image: "https://http2.mlstatic.com/D_NQ_NP_637894-MLA81758252428_122024-O.webp",
            quotes: "12 cuotas sin interés de $2.50",
            location: "Disponible en tienda"
        },
            {
            name: "Semi eje trasero derecho",
            price: "$105.00",
            image: "https://http2.mlstatic.com/D_NQ_NP_637894-MLA81758252428_122024-O.webp",
            quotes: "6 cuotas sin interés de $18",
            location: "Capital Federal"
        }
    ];

    loadProducts(products);

});

function newProductCard(product) {
    const productCard = document.createElement("article");
    productCard.classList.add("product-card");
    
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("product-image-container");
    
    const badge = document.createElement("span");
    badge.classList.add("badge-envio");
    badge.textContent = "Envío gratis";
    
    const img = document.createElement("img");
    img.classList.add("product-image");
    img.src = product.image;
    img.alt = product.name;
    
    imageContainer.appendChild(badge);
    imageContainer.appendChild(img);
    
    const name = document.createElement("h3");
    name.textContent = product.name;
    
    const price = document.createElement("p");
    price.classList.add("product-price");
    price.textContent = product.price;
    
    const quotes = document.createElement("p");
    quotes.classList.add("product-quotes");
    quotes.textContent = product.quotes;
    
    const location = document.createElement("p");
    location.classList.add("product-location");
    location.textContent = product.location;
    
    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");
    productInfo.appendChild(name);
    productInfo.appendChild(price);
    productInfo.appendChild(quotes);
    productInfo.appendChild(location);


    productCard.appendChild(imageContainer);
    productCard.appendChild(productInfo);
    
    return productCard;
}

function loadProducts(products) {
    const productsGrid = document.querySelector(".products-grid");
    products.forEach(product => {
        const productCard = newProductCard(product);
        productsGrid.appendChild(productCard);
    });
}



