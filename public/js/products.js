// Get wishlist from localStorage
function getWishlist() {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
}

// Map product names to appropriate icons
function getProductIcon(productName) {
    const name = productName.toLowerCase();

    // Electronics/Cables/Accessories
    if (name.includes('headphones') || name.includes('earbuds')) return 'fas fa-headphones';
    if (name.includes('charger') || name.includes('charging')) return 'fas fa-charging-station';
    if (name.includes('usb') || name.includes('cable') || name.includes('cord')) return 'fas fa-microchip';
    if (name.includes('screen protector') || name.includes('screen guard')) return 'fas fa-shield-alt';
    if (name.includes('wireless mouse') || name.includes('mouse')) return 'fas fa-mouse';
    if (name.includes('keyboard') || name.includes('mechanical')) return 'fas fa-keyboard';
    if (name.includes('phone') || name.includes('smartphone')) return 'fas fa-mobile-alt';
    if (name.includes('laptop') || name.includes('computer')) return 'fas fa-laptop';
    if (name.includes('tablet')) return 'fas fa-tablet-alt';
    if (name.includes('watch') || name.includes('smartwatch')) return 'fas fa-clock';

    // Clothing
    if (name.includes('shirt') || name.includes('t-shirt') || name.includes('tee')) return 'fas fa-shirt';
    if (name.includes('pants') || name.includes('jeans')) return 'fas fa-users';
    if (name.includes('shoe') || name.includes('sneaker')) return 'fas fa-shoe-prints';
    if (name.includes('jacket') || name.includes('coat')) return 'fas fa-vest';
    if (name.includes('hat') || name.includes('cap')) return 'fas fa-hat-wizard';

    // Home & Kitchen
    if (name.includes('bottle') || name.includes('cup') || name.includes('mug')) return 'fas fa-mug-hot';
    if (name.includes('plate') || name.includes('bowl')) return 'fas fa-utensils';
    if (name.includes('pillow') || name.includes('blanket') || name.includes('sheet')) return 'fas fa-bed';
    if (name.includes('lamp') || name.includes('light')) return 'fas fa-lightbulb';

    // Stationery & Books
    if (name.includes('notebook') || name.includes('journal')) return 'fas fa-book';
    if (name.includes('pen') || name.includes('pencil')) return 'fas fa-pen';
    if (name.includes('pad') || name.includes('paper')) return 'fas fa-sticky-note';

    // Default icon
    return 'fas fa-cube';
}

// Demo products to show when backend is unavailable
function getDemoProducts() {
    return [{
            id: 'p-demo-1',
            name: 'Classic White T-Shirt',
            category: 'Clothing',
            description: 'Comfortable cotton tee for everyday wear.',
            price: 19.99,
            stock: 25,
            material: '100% Cotton',
            dimensions: 'One size fits most',
            careInstructions: 'Machine wash cold, tumble dry low',
            shipping: 'Free shipping on orders over $50'
        },
        {
            id: 'p-demo-2',
            name: 'Wireless Headphones - GO TUNE WH06',
            category: 'Electronics',
            description: 'Premium noise-cancelling over-ear headphones with dual connection and 20+ hour battery life.',
            price: 89.99,
            stock: 8,
            material: 'High-quality polymer',
            dimensions: 'Adjustable headband 165-210mm',
            careInstructions: 'Wipe with soft damp cloth, avoid water',
            shipping: 'Standard shipping: 5-7 business days',
            image: '/images/headphones-go-tune-wh06.jpg',
            features: ['Dual Connection (BT/Aux)', 'Long Lasting Battery - 20+ hours', 'Swivel Design', 'Noise-Cancelling Technology']
        },
        {
            id: 'p-demo-3',
            name: 'Stainless Water Bottle',
            category: 'Home',
            description: 'Keeps drinks cold for 24 hours.',
            price: 24.5,
            stock: 0,
            material: '18/8 Stainless Steel',
            dimensions: '750ml capacity',
            careInstructions: 'Hand wash only, do not microwave',
            shipping: 'Express shipping: 2-3 business days'
        },
        {
            id: 'p-demo-4',
            name: 'Notebook - Lined',
            category: 'Stationery',
            description: 'Hardcover notebook with lined pages.',
            price: 12.0,
            stock: 50,
            material: 'Recycled paper',
            dimensions: 'A4 size (210 x 297mm)',
            careInstructions: 'Keep away from moisture',
            shipping: 'Free shipping on orders over $50'
        }
    ];
}

// Demo stores
function getDemoStores() {
    return [
        { id: 's-1', name: 'Downtown Store', address: '123 Main St', phone: '555-0101' },
        { id: 's-2', name: 'Mall Outlet', address: 'Mall Road', phone: '555-0202' },
        { id: 's-3', name: 'North Branch', address: 'North Ave', phone: '555-0303' }
    ];
}

// Cart helpers
function getCart() {
    const c = localStorage.getItem('cart');
    return c ? JSON.parse(c) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const count = getCart().reduce((s, i) => s + i.quantity, 0);
    const el = document.getElementById('cartCount');
    if (el) el.textContent = count;
    // render cart items
    const itemsEl = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    if (!itemsEl) return;
    const cart = getCart();
    itemsEl.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `<div class="cart-item-name">${escapeHtml(item.name)}</div><div class="cart-item-meta">$${item.price.toFixed(2)} x ${item.quantity}</div>`;
        itemsEl.appendChild(row);
    });
    if (totalEl) totalEl.textContent = total.toFixed(2);
}

function toggleCart() {
    const panel = document.getElementById('cartPanel');
    if (!panel) return;
    panel.classList.toggle('hidden');
    updateCartUI();
}

function checkout() {
    const cart = getCart();

    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Check if user is logged in
    if (!isLoggedIn) {
        alert('Please login to checkout');
        return;
    }

    // Create checkout modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content checkout-modal" style="max-width: 500px;">
            <span class="close" onclick="this.closest('.modal').remove()"><i class="fas fa-times"></i></span>
            <h2><i class="fas fa-credit-card"></i> Checkout</h2>
            
            <div class="checkout-section">
                <h3>Order Summary</h3>
                <div id="checkoutItems" style="border: 1px solid #eee; padding: 15px; margin: 10px 0; border-radius: 6px; max-height: 200px; overflow-y: auto;">
                </div>
                <div style="text-align: right; font-size: 18px; font-weight: bold; margin: 15px 0; padding-top: 15px; border-top: 2px solid #eee;">
                    Total: $<span id="checkoutTotal">0.00</span>
                </div>
            </div>
            
            <form onsubmit="processCheckout(event)" style="margin-top: 20px;">
                <div class="checkout-section">
                    <h3>Shipping Address</h3>
                    <div style="margin-bottom: 10px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: 500;">Full Name</label>
                        <input type="text" id="addressName" placeholder="John Doe" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                    <div style="margin-bottom: 10px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: 500;">Street Address</label>
                        <input type="text" id="addressStreet" placeholder="123 Main St" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: 500;">City</label>
                            <input type="text" id="addressCity" placeholder="New York" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: 500;">State/Province</label>
                            <input type="text" id="addressState" placeholder="NY" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: 500;">ZIP Code</label>
                            <input type="text" id="addressZip" placeholder="10001" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Country</label>
                            <input type="text" id="addressCountry" placeholder="United States" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                        </div>
                    </div>
                </div>
                
                <div class="checkout-section">
                    <h3>Payment Method</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                        <label style="padding: 10px; border: 2px solid #ddd; border-radius: 4px; cursor: pointer;">
                            <input type="radio" name="paymentMethod" value="credit_card" checked required>
                            <i class="fas fa-credit-card"></i> Credit Card
                        </label>
                        <label style="padding: 10px; border: 2px solid #ddd; border-radius: 4px; cursor: pointer;">
                            <input type="radio" name="paymentMethod" value="debit_card" required>
                            <i class="fas fa-university"></i> Debit Card
                        </label>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                        <label style="padding: 10px; border: 2px solid #ddd; border-radius: 4px; cursor: pointer;">
                            <input type="radio" name="paymentMethod" value="paypal" required>
                            <i class="fas fa-paypal"></i> PayPal
                        </label>
                        <label style="padding: 10px; border: 2px solid #ddd; border-radius: 4px; cursor: pointer;">
                            <input type="radio" name="paymentMethod" value="apple_pay" required>
                            <i class="fas fa-apple"></i> Apple Pay
                        </label>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <button type="submit" class="btn btn-primary" style="width: 100%;"><i class="fas fa-check"></i> Place Order</button>
                    <button type="button" class="btn btn-secondary" style="width: 100%;" onclick="this.closest('.modal').remove()"><i class="fas fa-times"></i> Cancel</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Populate order summary
    let total = 0;
    const itemsDiv = document.getElementById('checkoutItems');
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemsDiv.innerHTML += `
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                <span>${escapeHtml(item.name)} x${item.quantity}</span>
                <span>$${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });
    document.getElementById('checkoutTotal').textContent = total.toFixed(2);
}

// Process checkout and create order
function processCheckout(event) {
    event.preventDefault();

    const cart = getCart();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    // Collect address
    const address = {
        name: document.getElementById('addressName').value,
        street: document.getElementById('addressStreet').value,
        city: document.getElementById('addressCity').value,
        state: document.getElementById('addressState').value,
        zip: document.getElementById('addressZip').value,
        country: document.getElementById('addressCountry').value
    };

    // Calculate total
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create order
    const order = {
        id: 'order-' + Date.now(),
        userId: currentUser.id,
        items: cart,
        address: address,
        paymentMethod: paymentMethod,
        total: total,
        status: 'confirmed',
        date: new Date().toISOString(),
        isDemoAccount: currentUser.email.includes('@example.com')
    };

    // Save order to localStorage
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    localStorage.setItem('cart', JSON.stringify([]));
    updateCartUI();

    // Close modal
    document.querySelector('.checkout-modal').closest('.modal').remove();

    // Show success message
    const successModal = document.createElement('div');
    successModal.className = 'modal';
    successModal.innerHTML = `
        <div class="modal-content" style="background: white; text-align: center; max-width: 400px; padding: 40px;">
            <div style="font-size: 60px; margin-bottom: 20px;">✅</div>
            <h2 style="color: #333; margin-bottom: 10px;">Order Confirmed!</h2>
            <p style="color: #666; margin: 15px 0;">Thank you for your purchase!</p>
            <p style="color: #999; font-size: 14px;">Order ID: ${order.id}</p>
            <p style="color: #666; margin: 15px 0;"><strong>Total:</strong> $${total.toFixed(2)}</p>
            <p style="color: #666; margin: 15px 0;"><strong>Payment Method:</strong> ${paymentMethod.replace('_', ' ').toUpperCase()}</p>
            <p style="color: #666; margin: 15px 0;"><strong>Shipping To:</strong> ${address.name}, ${address.street}, ${address.city}, ${address.state} ${address.zip}</p>
            <button class="btn btn-primary" style="margin-top: 20px;" onclick="document.querySelector('.modal').remove(); toggleCart();">Continue Shopping</button>
        </div>
    `;
    document.body.appendChild(successModal);
}

// Save wishlist to localStorage
function saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Check if product is in wishlist
function isInWishlist(productId) {
    const wishlist = getWishlist();
    return wishlist.includes(productId);
}

// Toggle wishlist
function toggleWishlist(productId, productName) {
    let wishlist = getWishlist();
    const index = wishlist.indexOf(productId);

    if (index > -1) {
        wishlist.splice(index, 1);
        showAlert(`<i class="fas fa-heart-broken"></i> Removed from wishlist`);
    } else {
        wishlist.push(productId);
        showAlert(`<i class="fas fa-heart"></i> Added to wishlist: ${productName}`);
    }
    saveWishlist(wishlist);
    loadProducts();
}

// Show temporary alert
function showAlert(message) {
    const alert = document.createElement('div');
    alert.className = 'toast-alert';
    alert.innerHTML = message;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 2000);
}

// Share product
function shareProduct(productName, productId) {
    const url = `${window.location.origin}?product=${productId}`;
    if (navigator.share) {
        navigator.share({
            title: 'Check out this product!',
            text: productName,
            url: url
        });
    } else {
        navigator.clipboard.writeText(url);
        showAlert(`<i class="fas fa-link"></i> Product link copied!`);
    }
}

// Quick view product
function quickViewProduct(product) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    const imageHTML = product.image ?
        `<img src="${product.image}" alt="${escapeHtml(product.name)}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">` :
        `<i class="fas fa-image"></i>`;

    modal.innerHTML = `
    <div class="modal-content quick-view-modal">
      <span class="close" onclick="this.closest('.modal').remove()"><i class="fas fa-times"></i></span>
      <div class="quick-view-body">
        <div class="quick-view-image">
          ${imageHTML}
        </div>
        <div class="quick-view-details">
          <h2>${escapeHtml(product.name)}</h2>
          <div class="quick-view-rating">
            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half"></i>
            <span>(${Math.floor(Math.random() * 1000)}+ reviews)</span>
          </div>
          <p class="quick-view-description">${escapeHtml(product.description)}</p>
          <div class="quick-view-price">$${product.price.toFixed(2)}</div>
          <div class="quick-view-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
            <i class="fas fa-${product.stock > 0 ? 'check-circle' : 'times-circle'}"></i>
            ${product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </div>
          ${product.material ? `<div class="product-detail-item"><strong>Material:</strong> ${escapeHtml(product.material)}</div>` : ''}
          ${product.dimensions ? `<div class="product-detail-item"><strong>Dimensions:</strong> ${escapeHtml(product.dimensions)}</div>` : ''}
          ${product.careInstructions ? `<div class="product-detail-item"><strong>Care:</strong> ${escapeHtml(product.careInstructions)}</div>` : ''}
          ${product.shipping ? `<div class="product-detail-item"><strong>Shipping:</strong> ${escapeHtml(product.shipping)}</div>` : ''}
          <button class="btn btn-primary full-width" onclick="addToCart('${product.id}', '${escapeHtml(product.name)}', ${product.price}); this.closest('.modal').remove()">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// Load and display products
async function loadProducts() {
    try {
        console.log('📦 loadProducts called - isLoggedIn:', isLoggedIn, 'currentUser:', currentUser);
        let productsArray = [];
        
        try {
            const response = await fetch('/api/products');
            if (response.ok) {
                const data = await response.json();
                if (data && data.products && data.products.length > 0) {
                    productsArray = data.products;
                }
            }
        } catch (e) {
            console.log('API unavailable, using demo products');
        }
        
        // Use demo products if API failed or returned nothing
        if (productsArray.length === 0) {
            productsArray = getDemoProducts();
        }
        
        // Add custom products from localStorage
        const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
        productsArray = [...productsArray, ...customProducts];

        const productsList = document.getElementById('productsList');
        if (!productsList) return;
        
        productsList.innerHTML = '';

        // Sort products and mark recommendations
        // apply filters: category + search + sort
        const activeCategory = window._activeCategory || 'all';
        const searchTerm = (window._searchTerm || '').toLowerCase();
        const sortMode = window._sortMode || 'default';

        let filtered = productsArray.filter(p => {
          if (activeCategory !== 'all' && p.category && p.category !== activeCategory) return false;
          if (searchTerm) {
            return p.name.toLowerCase().includes(searchTerm) || (p.description && p.description.toLowerCase().includes(searchTerm));
          }
          return true;
        });

        if (sortMode === 'price_asc') filtered.sort((a,b)=>a.price-b.price);
        if (sortMode === 'price_desc') filtered.sort((a,b)=>b.price-a.price);

        const productsWithRecs = filtered.map((product, index) => ({
          ...product,
          isRecommended: index < 3 || Math.random() > 0.7
        }));

        productsWithRecs.forEach(product => {
                    const card = document.createElement('div');
                    card.className = 'product-card';
                    const wishlistClass = isInWishlist(product.id) ? 'fas fa-heart' : 'far fa-heart';
                    const wishlistActive = isInWishlist(product.id) ? 'active' : '';
                    
                    // Determine if admin buttons should show
                    const showAdminButtons = isLoggedIn && currentUser && currentUser.role === 'ADMIN';
                    if (showAdminButtons) {
                      console.log('✅ Admin mode: buttons will be shown for product', product.id);
                    }
                    
                    const adminButtonsHtml = showAdminButtons ? `
                      <button class="btn btn-edit btn-sm" data-action="edit" data-product-id="${product.id}"><i class="fas fa-edit"></i> Edit</button>
                      <button class="btn btn-danger btn-sm" data-action="delete" data-product-id="${product.id}"><i class="fas fa-trash"></i> Delete</button>
                    ` : '';
                    
                    card.innerHTML = `
        <div class="product-badge">
          ${product.isRecommended ? '<span class="badge-recommended"><i class="fas fa-star"></i> Recommended</span>' : ''}
          ${product.stock < 5 && product.stock > 0 ? '<span class="badge-limited"><i class="fas fa-fire"></i> Limited</span>' : ''}
        </div>
        <div class="product-image"><i class="${getProductIcon(product.name)}"></i></div>
        <h3>${escapeHtml(product.name)}</h3>
        <p>${escapeHtml(product.description)}</p>
        <div class="product-rating">
          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half"></i>
          <span class="rating-count">(${Math.floor(Math.random() * 1000)})</span>
        </div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <div class="product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}"><i class="fas fa-${product.stock > 0 ? 'check-circle' : 'times-circle'}"></i> Stock: ${product.stock}</div>
        <div class="product-actions">
          ${adminButtonsHtml}
        </div>
        <div class="product-features">
          <button class="btn btn-feature" onclick="quickViewProduct({id: '${product.id}', name: '${escapeHtml(product.name)}', description: '${escapeHtml(product.description)}', price: ${product.price}, stock: ${product.stock}, material: '${product.material || ''}', dimensions: '${product.dimensions || ''}', careInstructions: '${product.careInstructions || ''}', shipping: '${product.shipping || ''}', image: '${product.image || ''}'})" title="Quick View"><i class="fas fa-eye"></i> <span>View</span></button>
          <button class="btn btn-feature ${wishlistActive}" onclick="toggleWishlist('${product.id}', '${escapeHtml(product.name)}')" title="Add to Wishlist"><i class="${wishlistClass}"></i> <span>Wish</span></button>
          <button class="btn btn-feature" onclick="shareProduct('${escapeHtml(product.name)}', '${product.id}')" title="Share"><i class="fas fa-share-alt"></i> <span>Share</span></button>
          ${isLoggedIn ? `
            <button class="btn btn-feature btn-primary" onclick="addToCart('${product.id}', '${escapeHtml(product.name)}', ${product.price})" title="Add to Cart"><i class="fas fa-shopping-cart"></i> <span>Cart</span></button>
          ` : ''}
        </div>
      `;
      productsList.appendChild(card);
    });
    
    updateAdminControls();
  } catch (error) {
    console.error('Error loading products:', error);
    // Show demo products on error
    const productsList = document.getElementById('productsList');
    if (!productsList) return;
    productsList.innerHTML = '';
    const demoProducts = getDemoProducts();
    demoProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        const wishlistClass = isInWishlist(product.id) ? 'fas fa-heart' : 'far fa-heart';
        const wishlistActive = isInWishlist(product.id) ? 'active' : '';
        card.innerHTML = `
          <div class="product-image"><i class="${getProductIcon(product.name)}"></i></div>
          <h3>${escapeHtml(product.name)}</h3>
          <p>${escapeHtml(product.description)}</p>
          <div class="product-price">$${product.price.toFixed(2)}</div>
          <div class="product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}"><i class="fas fa-${product.stock > 0 ? 'check-circle' : 'times-circle'}"></i> Stock: ${product.stock}</div>
          <div class="product-features">
            <button class="btn btn-feature" onclick="quickViewProduct({id: '${product.id}', name: '${escapeHtml(product.name)}', description: '${escapeHtml(product.description)}', price: ${product.price}, stock: ${product.stock}, material: '${product.material || ''}', dimensions: '${product.dimensions || ''}', careInstructions: '${product.careInstructions || ''}', shipping: '${product.shipping || ''}', image: '${product.image || ''}'})" title="Quick View"><i class="fas fa-eye"></i> <span>View</span></button>
            <button class="btn btn-feature ${wishlistActive}" onclick="toggleWishlist('${product.id}', '${escapeHtml(product.name)}')" title="Add to Wishlist"><i class="${wishlistClass}"></i> <span>Wish</span></button>
            <button class="btn btn-feature" onclick="shareProduct('${escapeHtml(product.name)}', '${product.id}')" title="Share"><i class="fas fa-share-alt"></i> <span>Share</span></button>
          </div>
        `;
        productsList.appendChild(card);
    });
    
    renderCategories(productsArray);
    updateAdminControls();
  }
}

// Global event delegation for edit and delete buttons
document.addEventListener('click', function(e) {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const action = btn.getAttribute('data-action');
    const productId = btn.getAttribute('data-product-id');
    
    console.log('🖱️ Button clicked - Action:', action, 'ProductId:', productId);
    
    if (action === 'edit') {
        console.log('📝 Calling editProduct with ID:', productId);
        editProduct(productId);
    } else if (action === 'delete') {
        console.log('🗑️ Calling deleteProduct with ID:', productId);
        deleteProduct(productId);
    }
}, true);

// Search and filter helpers
function onSearchChange(value) {
  window._searchTerm = value || '';
  loadProducts();
}

function onSortChange(value) {
  window._sortMode = value;
  loadProducts();
}

function renderCategories(products) {
  const cats = new Set(['all']);
  products.forEach(p => { if (p.category) cats.add(p.category); });
  const container = document.getElementById('categoriesList');
  if (!container) return;
  container.innerHTML = '';
  Array.from(cats).forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-secondary';
    btn.textContent = cat === 'all' ? 'All' : cat;
    btn.onclick = () => { window._activeCategory = cat; loadProducts(); };
    container.appendChild(btn);
  });
}

// Show store details modal
function showStoreDetails(store) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content store-modal">
      <span class="close" onclick="this.closest('.modal').remove()"><i class="fas fa-times"></i></span>
      <h3>${escapeHtml(store.name)}</h3>
      <p>${escapeHtml(store.address)}</p>
      <p>Phone: ${escapeHtml(store.phone)}</p>
    </div>
  `;
  document.body.appendChild(modal);
}

function showMoreStores() {
  const stores = getDemoStores();
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `<div class="modal-content store-list-modal"><span class="close" onclick="this.closest('.modal').remove()"><i class="fas fa-times"></i></span><h3>Stores</h3><div class="store-list"></div></div>`;
  document.body.appendChild(modal);
  const list = modal.querySelector('.store-list');
  stores.forEach(s => {
    const row = document.createElement('div');
    row.className = 'store-row';
    row.innerHTML = `<strong>${escapeHtml(s.name)}</strong><div>${escapeHtml(s.address)}</div><button class="btn btn-primary" onclick='(${showStoreDetails.toString()})(${JSON.stringify(s)})'>View</button>`;
    list.appendChild(row);
  });
}

// Update admin controls visibility
function updateAdminControls() {
  const adminControls = document.getElementById('adminControls');
  if (isLoggedIn && currentUser && currentUser.role === 'ADMIN') {
    adminControls.classList.remove('hidden');
  } else {
    adminControls.classList.add('hidden');
  }
}

// Show add product form
function showAddProductForm() {
  const form = document.getElementById('addProductForm');
  form.classList.remove('hidden');
  // Scroll to form
  form.scrollIntoView({ behavior: 'smooth' });
}

// Close add product form
function closeAddProductForm() {
  document.getElementById('addProductForm').classList.add('hidden');
  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('productDesc').value = '';
  document.getElementById('productStock').value = '';
}

// Handle add product
function handleAddProduct(event) {
  event.preventDefault();
  
  if (!isLoggedIn || currentUser.role !== 'ADMIN') {
    alert('Only admins can add products');
    return;
  }
  
  const name = document.getElementById('productName').value;
  const price = parseFloat(document.getElementById('productPrice').value);
  const description = document.getElementById('productDesc').value;
  const stock = parseInt(document.getElementById('productStock').value);
  
  // Generate unique ID for new product
  const newProduct = {
    id: 'product-' + Date.now(),
    name,
    price,
    description,
    stock,
    category: 'Custom'
  };
  
  // Save to localStorage
  let products = JSON.parse(localStorage.getItem('customProducts') || '[]');
  products.push(newProduct);
  localStorage.setItem('customProducts', JSON.stringify(products));
  
  alert('Product created successfully!');
  closeAddProductForm();
  loadProducts();
}

// Edit product
function editProduct(productId) {
  console.log('🔧 Edit clicked for product:', productId);
  
  const name = prompt('Enter product name:');
  if (!name) return;
  
  const price = parseFloat(prompt('Enter product price:'));
  if (isNaN(price)) return;
  
  const description = prompt('Enter product description:');
  if (!description) return;
  
  const stock = parseInt(prompt('Enter stock quantity:'));
  if (isNaN(stock)) return;
  
  try {
    // Load all products
    const demoProducts = getDemoProducts();
    let customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
    let allProducts = [...demoProducts, ...customProducts];
    
    // Find and update the product
    const productIndex = allProducts.findIndex(p => p.id === productId);
    
    if (productIndex > -1) {
      allProducts[productIndex] = { ...allProducts[productIndex], name, price, description, stock };
      
      // If it's a custom product, update localStorage
      const customIndex = customProducts.findIndex(p => p.id === productId);
      if (customIndex > -1) {
        customProducts[customIndex] = allProducts[productIndex];
        localStorage.setItem('customProducts', JSON.stringify(customProducts));
      } else {
        // If editing a demo product, save it as custom
        customProducts.push(allProducts[productIndex]);
        localStorage.setItem('customProducts', JSON.stringify(customProducts));
      }
      
      console.log('✅ Product updated successfully!');
      alert('Product updated successfully!');
      loadProducts();
    } else {
      console.log('❌ Product not found:', productId);
      alert('Product not found');
    }
  } catch (error) {
    console.error('Error editing product:', error);
    alert('Error updating product: ' + error.message);
  }
}

// Delete product
function deleteProduct(productId) {
  console.log('🗑️ Delete clicked for product:', productId);
  
  if (!confirm('Are you sure you want to delete this product?')) return;
  
  try {
    // Load all products
    const demoProducts = getDemoProducts();
    let customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
    let allProducts = [...demoProducts, ...customProducts];
    
    // Check if product exists
    if (!allProducts.find(p => p.id === productId)) {
      console.log('❌ Product not found:', productId);
      alert('Product not found');
      return;
    }
    
    // Filter out the product
    customProducts = customProducts.filter(p => p.id !== productId);
    localStorage.setItem('customProducts', JSON.stringify(customProducts));
    
    console.log('✅ Product deleted successfully!');
    alert('Product deleted successfully!');
    loadProducts();
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('Error deleting product: ' + error.message);
  }
}

// Add to cart (simplified - creates order)
function addToCart(productId, productName, price) {
  const quantity = parseInt(prompt(`How many ${productName} would you like to add?`, '1'));
  
  if (isNaN(quantity) || quantity < 1) return;
  
  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: price,
      quantity: quantity
    });
  }
  
  saveCart(cart);
  showAlert(`<i class="fas fa-shopping-cart"></i> Added ${quantity}x ${productName} to cart`);
}

// HTML escape helper
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(loadProducts, 100);
});