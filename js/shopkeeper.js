// Product storage array
let products = [];
let productIdCounter = 1;

// DOM elements
const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const emptyState = document.getElementById("emptyState");

// Form submission handler
productForm.addEventListener("submit", function (e) {
  e.preventDefault();
  
  const name = document.getElementById("pname").value.trim();
  const category = document.getElementById("pcategory").value;
  const price = parseFloat(document.getElementById("pprice").value);

  if (!name || !category || isNaN(price) || price < 0) {
    alert("Please fill in all fields with valid data.");
    return;
  }

  const newProduct = {
    id: productIdCounter++,
    name: name,
    category: category,
    price: price
  };

  products.push(newProduct);
  renderProducts();
  productForm.reset();
});

// Delete product function
function deleteProduct(productId) {
  if (confirm("Are you sure you want to delete this product?")) {
    products = products.filter(product => product.id !== productId);
    renderProducts();
  }
}

// Render products function
function renderProducts() {
  productList.innerHTML = "";

  if (products.length === 0) {
    productList.appendChild(emptyState);
  } else {
    products.forEach(product => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
        <h3>${escapeHtml(product.name)}</h3>
        <p><span>Category:</span> ${escapeHtml(product.category)}</p>
        <p><span>Price:</span> ₹${product.price.toFixed(2)}</p>
      `;
      productList.appendChild(productCard);
    });
  }
}

// Utility function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize
renderProducts();

// Contact Us dropdown
const contactUs = document.getElementById("contactUs");
const contactDropdown = document.getElementById("contactDropdown");

contactUs.addEventListener("click", function(e) {
  e.stopPropagation();
  contactDropdown.classList.toggle("show");
});

contactDropdown.addEventListener("click", function(e) {
  e.stopPropagation();
});

// About Us dropdown
const aboutUs = document.getElementById("aboutUs");
const aboutDropdown = document.getElementById("aboutDropdown");

aboutUs.addEventListener("click", function(e) {
  e.stopPropagation();
  aboutDropdown.classList.toggle("show");
  contactDropdown.classList.remove("show");
});

// Close dropdowns when clicking outside
document.addEventListener("click", function(e) {
  if (!contactUs.contains(e.target)) {
    contactDropdown.classList.remove("show");
  }
  if (!aboutUs.contains(e.target)) {
    aboutDropdown.classList.remove("show");
  }
});
productCard.innerHTML = `
  <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
  <h3>${escapeHtml(product.name)}</h3>
  <p><span>Category:</span> ${escapeHtml(product.category)}</p>
  <div class="price-tag">₹${product.price.toFixed(2)}</div>
`;