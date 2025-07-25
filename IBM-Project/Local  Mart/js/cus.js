// Shop data with shopkeeper names and actual product images
  const shopData = {
  fruits: {
    name: "Sohan Fresh Fruits",
    description: "Fresh & Organic Fruits",
    owner: "Sohan",
    items: [
      { name: "Apple" },
      { name: "Banana" },
      { name: "Mango" },
      { name: "Papaya" },
      { name: "Watermelon" }
    ]
  },
  vegetables: {
    name: "Inderjit Sabji Wala",
    description: "Fresh Vegetables Daily",
    owner: "Inderjit",
    items: [
      { name: "Tomato" },
      { name: "Potato" },
      { name: "Onion" },
      { name: "Carrot" },
      { name: "Cabbage" }
    ]
  },
  groceries: {
    name: "Mohit Groceries Shop",
    description: "All Daily Essentials",
    owner: "Mohit",
    items: [
      { name: "Rice" },
      { name: "Wheat" },
      { name: "Sugar" },
      { name: "Salt" },
      { name: "CookingOil" }
    ]
  },
  medicines: {
    name: "Sai Medical Store",
    description: "Trusted Healthcare Partner",
    owner: "Sai",
    items: [
      { name: "Paracetamol" },
      { name: "CoughSyrup" },
      { name: "PainReliefGel" },
      { name: "VitaminC" },
      { name: "Bandage" }
    ]
  }
};

    // Generate items data with shop information and real images
    const data = {};
Object.keys(shopData).forEach(category => {
  data[category] = shopData[category].items.map(item => ({
    name: item.name,
    price: Math.floor(Math.random() * 100 + 20),
    image: "../images/" + item.name.toLowerCase() + ".png",  // ✅ real image path
    shop: shopData[category].name,
    shopOwner: shopData[category].owner
  }));
});

    // State
    let cart = [];
    let activeCategory = 'fruits';
    let selectedPaymentMethod = null;
    let deliveryAddress = {
      fullName: '',
      phone: '',
      address: '',
      city: '',
      pincode: ''
    };

    // Initialize with smooth loading
    document.addEventListener('DOMContentLoaded', function() {
      // Add loading class initially
      document.body.classList.add('loading');
      
      // Initialize content
      showCategory('fruits');
      updateCartDisplay();
      
      // Remove loading class after a short delay
      setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
      }, 100);
    });

    // Contact Us Modal Functions
    function showContactModal() {
      showModal('contactModal');
    }

    function hideContactModal() {
      hideModal('contactModal');
    }

    function submitContactForm(event) {
      event.preventDefault();
      
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const phone = document.getElementById('contactPhone').value;
      const subject = document.getElementById('contactSubject').value;
      const message = document.getElementById('contactMessage').value;
      
      // Simulate form submission
      alert(`Thank you ${name}! Your message has been sent successfully. We'll get back to you within 24 hours.\n\nSubject: ${subject}\nEmail: ${email}`);
      
      // Reset form
      document.getElementById('contactName').value = '';
      document.getElementById('contactEmail').value = '';
      document.getElementById('contactPhone').value = '';
      document.getElementById('contactSubject').value = '';
      document.getElementById('contactMessage').value = '';
      
      hideContactModal();
    }

    // About Us Modal Functions
    function showAboutModal() {
      showModal('aboutModal');
    }

    function hideAboutModal() {
      hideModal('aboutModal');
    }

    // Category functions with smooth transitions
    function showCategory(category) {
      activeCategory = category;
      
      // Update button states
      document.querySelectorAll('.section-buttons button').forEach(btn => {
        btn.classList.remove('active');
      });
      document.getElementById(`btn-${category}`).classList.add('active');

      // Update shop header
      const shop = shopData[category];
      document.getElementById('shopName').textContent = shop.name;
      document.getElementById('shopCategory').textContent = shop.description;

      // Show items with smooth transition
      const container = document.getElementById("items");
      
      // Fade out current items
      container.style.opacity = '0.5';
      
      setTimeout(() => {
        container.innerHTML = "";
        
        data[category].forEach((item, index) => {
          const div = document.createElement("div");
          div.className = "item";
          div.style.animationDelay = `${index * 0.1}s`;
          div.innerHTML = `
            <div class="shop-tag">${item.shopOwner}</div>
            <img src="${item.image}" alt="${item.name}" loading="lazy" onload="this.style.opacity=1" style="opacity:0; transition: opacity 0.3s;"/>
            <h3>${item.name}</h3>
            <div class="price">₹${item.price}</div>
            <button onclick="addToCart('${item.name}', ${item.price}, '${item.shop}', '${item.shopOwner}')">Add to Cart</button>
          `;
          container.appendChild(div);
        });
        
        // Fade in new items
        container.style.opacity = '1';
      }, 150);
    }

    // Cart functions
    function addToCart(name, price, shop, shopOwner) {
      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, price, shop, shopOwner, quantity: 1 });
      }
      updateCartDisplay();
    }

    function removeFromCart(name) {
      cart = cart.filter(item => item.name !== name);
      updateCartDisplay();
    }

    function updateQuantity(name, newQuantity) {
      if (newQuantity === 0) {
        removeFromCart(name);
        return;
      }
      const item = cart.find(item => item.name === name);
      if (item) {
        item.quantity = newQuantity;
      }
      updateCartDisplay();
    }

    function updateCartDisplay() {
      const cartItems = document.getElementById("cartItems");
      const cartSummary = document.getElementById("cartSummary");
      const checkoutBtn = document.getElementById("checkoutBtn");
      const cartBadge = document.getElementById("cartBadge");

      // Update cart badge
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      if (totalItems > 0) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = 'flex';
      } else {
        cartBadge.style.display = 'none';
      }

      if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartSummary.style.display = 'none';
        checkoutBtn.disabled = true;
        return;
      }

      // Render cart items
      cartItems.innerHTML = '';
      cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>₹${item.price} each</p>
            <div class="cart-item-shop">from ${item.shop}</div>
          </div>
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="updateQuantity('${item.name}', ${item.quantity - 1})">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity('${item.name}', ${item.quantity + 1})">+</button>
          </div>
          <button class="remove-btn" onclick="removeFromCart('${item.name}')">×</button>
        `;
        cartItems.appendChild(div);
      });

      // Calculate totals
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const gst = subtotal * 0.18;
      const deliveryFee = subtotal > 500 ? 0 : 40;
      const total = subtotal + gst + deliveryFee;

      // Update summary
      document.getElementById("subtotal").textContent = subtotal.toFixed(2);
      document.getElementById("gst").textContent = gst.toFixed(2);
      document.getElementById("deliveryFee").textContent = deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`;
      document.getElementById("total").textContent = total.toFixed(2);
      document.getElementById("paymentTotal").textContent = total.toFixed(2);

      // Update order summary in payment modal
      updateOrderSummary();

      // Free delivery info
      const freeDeliveryInfo = document.getElementById("freeDeliveryInfo");
      if (subtotal <= 500 && subtotal > 0) {
        freeDeliveryInfo.textContent = `Add ₹${(500 - subtotal).toFixed(2)} more for free delivery!`;
      } else {
        freeDeliveryInfo.textContent = '';
      }

      cartSummary.style.display = 'block';
      checkoutBtn.disabled = false;
    }

    function updateOrderSummary() {
      const orderSummaryItems = document.getElementById("orderSummaryItems");
      if (!orderSummaryItems) return;

      orderSummaryItems.innerHTML = '';
      cart.forEach(item => {
        const div = document.createElement("div");
        div.className = "order-item";
        div.innerHTML = `
          <div>
            <div>${item.name} × ${item.quantity}</div>
            <div class="shop-name-small">${item.shop}</div>
          </div>
          <div>₹${(item.price * item.quantity).toFixed(2)}</div>
        `;
        orderSummaryItems.appendChild(div);
      });
    }

    // Modal functions with smooth animations
    function proceedToCheckout() {
      if (cart.length === 0) {
        alert("Your cart is empty! Please add items before proceeding.");
        return;
      }
      toggleCart();
      showModal('addressModal');
    }

    function showModal(modalId) {
      const modal = document.getElementById(modalId);
      modal.style.display = 'flex';
      setTimeout(() => modal.classList.add('show'), 10);
    }

    function hideModal(modalId) {
      const modal = document.getElementById(modalId);
      modal.classList.remove('show');
      setTimeout(() => modal.style.display = 'none', 300);
    }

    function hideAddressModal() {
      hideModal('addressModal');
    }

    function proceedToPayment() {
      const form = document.getElementById("addressForm");
      
      // Validate form
      const fullName = document.getElementById("fullName").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const address = document.getElementById("address").value.trim();
      const city = document.getElementById("city").value.trim();
      const pincode = document.getElementById("pincode").value.trim();

      if (!fullName || !phone || !address || !city || !pincode) {
        alert("Please fill in all delivery address fields.");
        return;
      }

      // Store address
      deliveryAddress = { fullName, phone, address, city, pincode };
      
      hideAddressModal();
      updateOrderSummary();
      showModal('paymentModal');
    }

    function hidePaymentModal() {
      hideModal('paymentModal');
      selectedPaymentMethod = null;
      document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('selected');
      });
      document.getElementById("payBtn").disabled = true;
    }

    function selectPaymentMethod(element) {
      document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('selected');
      });
      element.classList.add('selected');
      selectedPaymentMethod = element.dataset.method;
      
      const payBtn = document.getElementById("payBtn");
      payBtn.disabled = false;
      payBtn.textContent = selectedPaymentMethod === 'cod' ? 'Place Order' : 'Pay Now';
    }

    function confirmPayment() {
      if (!selectedPaymentMethod) {
        alert("Please select a payment method!");
        return;
      }

      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const gst = subtotal * 0.18;
      const deliveryFee = subtotal > 500 ? 0 : 40;
      const total = subtotal + gst + deliveryFee;
      
      // Create order details with shop information
      let orderDetails = "Order Details:\n";
      const shopGroups = {};
      
      // Group items by shop
      cart.forEach(item => {
        if (!shopGroups[item.shop]) {
          shopGroups[item.shop] = [];
        }
        shopGroups[item.shop].push(item);
      });

      // Display items grouped by shop
      Object.keys(shopGroups).forEach(shopName => {
        orderDetails += `\n📍 ${shopName}:\n`;
        shopGroups[shopName].forEach(item => {
          orderDetails += `   • ${item.name} × ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}\n`;
        });
      });

      const paymentMessage = selectedPaymentMethod === 'cod' 
        ? `Order placed successfully!\nTotal: ₹${total.toFixed(2)}\nPayment: Cash on Delivery`
        : `Payment of ₹${total.toFixed(2)} via ${selectedPaymentMethod.toUpperCase()} successful!`;

      alert(`${paymentMessage}\n\n${orderDetails}\nDelivery Address:\n${deliveryAddress.fullName}\n${deliveryAddress.address}, ${deliveryAddress.city} - ${deliveryAddress.pincode}\nPhone: ${deliveryAddress.phone}`);

      // Reset everything
      cart = [];
      updateCartDisplay();
      hidePaymentModal();
      selectedPaymentMethod = null;
      deliveryAddress = { fullName: '', phone: '', address: '', city: '', pincode: '' };
      document.getElementById("addressForm").reset();
    }

    // Utility functions with smooth animations
    function toggleCart() {
      const cartEl = document.getElementById("cart");
      if (cartEl.style.display === "block") {
        cartEl.classList.remove('show');
        setTimeout(() => cartEl.style.display = "none", 300);
      } else {
        cartEl.style.display = "block";
        setTimeout(() => cartEl.classList.add('show'), 10);
      }
    }

    function toggleDarkMode() {
      document.body.classList.toggle('dark');
    }

    // Close modals when clicking outside
    document.addEventListener('click', function(event) {
      const addressModal = document.getElementById('addressModal');
      const paymentModal = document.getElementById('paymentModal');
      const aboutModal = document.getElementById('aboutModal');
      const contactModal = document.getElementById('contactModal');
      
      if (event.target === addressModal) {
        hideAddressModal();
      }
      if (event.target === paymentModal) {
        hidePaymentModal();
      }
      if (event.target === aboutModal) {
        hideAboutModal();
      }
      if (event.target === contactModal) {
        hideContactModal();
      }
    });

    // Prevent layout shift on image load
    document.addEventListener('DOMContentLoaded', function() {
      const style = document.createElement('style');
      style.textContent = `
        img {
          transition: opacity 0.3s ease-in-out;
        }
      `;
      document.head.appendChild(style);
    });
  
