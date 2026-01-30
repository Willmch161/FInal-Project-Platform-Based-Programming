console.log('📦 products.js loaded - initializing...');

// Get wishlist from localStorage
function getWishlist() {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
}

// Global variable to store all currently loaded products
let allLoadedProducts = [];

// Map product names to appropriate icons
function getProductIcon(productName) {
    const name = productName.toLowerCase();

    // Clothing/Tops
    if (name.includes('shirt') || name.includes('t-shirt') || name.includes('tee') || name.includes('graphic')) return 'fas fa-shirt';
    if (name.includes('hoodie') || name.includes('sweatshirt')) return 'fas fa-hoodie';
    if (name.includes('jacket') || name.includes('coat') || name.includes('bomber')) return 'fas fa-vest';

    // Bottoms
    if (name.includes('pants') || name.includes('jeans') || name.includes('cargo')) return 'fas fa-person';

    // Footwear
    if (name.includes('shoe') || name.includes('sneaker') || name.includes('boot')) return 'fas fa-shoe-prints';

    // Accessories
    if (name.includes('hat') || name.includes('cap') || name.includes('beanie')) return 'fas fa-hat-cowboy';
    if (name.includes('belt')) return 'fas fa-ring';
    if (name.includes('bag') || name.includes('backpack')) return 'fas fa-bag-shopping';
    if (name.includes('chain') || name.includes('necklace') || name.includes('bracelet')) return 'fas fa-chain';

    // Default icon
    return 'fas fa-shopping-bag';
}

// Demo products to show when backend is unavailable
function getDemoProducts() {
    return [{
            id: 'p-fashion-1',
            name: 'Premium White Oversized T-Shirt',
            category: 'Tops',
            description: 'Heavyweight 100% organic cotton oversized fit. The ultimate streetwear essential.',
            price: 45.00,
            stock: 40,
            material: '100% Organic Cotton',
            dimensions: 'XS to XXL',
            careInstructions: 'Machine wash cold, tumble dry low',
            shipping: 'Free shipping'
        },
        {
            id: 'p-fashion-2',
            name: 'Black Oversized Hoodie',
            category: 'Tops',
            description: 'Premium heavyweight hoodie with embroidered chest logo. Perfect oversized fit for layering.',
            price: 89.99,
            stock: 35,
            material: '80% Cotton, 20% Polyester',
            dimensions: 'XS to XXL',
            careInstructions: 'Machine wash warm, lay flat to dry',
            shipping: 'Free shipping'
        },
        {
            id: 'p-fashion-3',
            name: 'Vintage Wash Graphic Tee',
            category: 'Tops',
            description: 'Retro-inspired graphic with distressed vintage wash. Limited edition print.',
            price: 55.00,
            stock: 28,
            material: '100% Cotton',
            dimensions: 'XS to XXL',
            careInstructions: 'Turn inside out when washing, cold water',
            shipping: 'Free shipping'
        },
        {
            id: 'p-fashion-4',
            name: 'Relaxed Fit Black Jeans',
            category: 'Bottoms',
            description: 'Classic black denim with perfect stretch and relaxed fit. Versatile streetwear staple.',
            price: 85.00,
            stock: 50,
            material: '98% Cotton, 2% Elastane',
            dimensions: '28 to 38 waist',
            careInstructions: 'Machine wash cold, inside out',
            shipping: 'Free shipping'
        },
        {
            id: 'p-fashion-5',
            name: 'Cargo Pants - Black',
            category: 'Bottoms',
            description: 'Tactical cargo pants with utility pockets and adjustable straps. Premium quality.',
            price: 95.00,
            stock: 22,
            material: '100% Cotton ripstop',
            dimensions: '28 to 36 waist',
            careInstructions: 'Machine wash cold water',
            shipping: 'Free shipping'
        },
        {
            id: 'p-fashion-6',
            name: 'Premium White Leather Sneakers',
            category: 'Footwear',
            description: 'Clean minimalist design in premium white leather. Perfect everyday shoe.',
            price: 75.00,
            stock: 45,
            material: 'Premium leather and canvas',
            dimensions: 'Sizes 5-14',
            careInstructions: 'Hand wash with damp cloth, air dry',
            shipping: 'Free shipping'
        },
        {
            id: 'p-fashion-7',
            name: 'Classic High-Top Canvas Sneakers',
            category: 'Footwear',
            description: 'Iconic canvas high-tops in signature black. Timeless streetwear essential.',
            price: 65.00,
            stock: 52,
            material: 'Canvas and rubber sole',
            dimensions: 'Sizes 5-14',
            careInstructions: 'Hand wash, air dry',
            shipping: 'Free shipping',
            isRecommended: true
        },
        {
            id: 'p-fashion-8',
            name: 'Black Bomber Jacket',
            category: 'Outerwear',
            description: 'Vintage-inspired bomber with embroidered patches and ribbed trim. Statement piece.',
            price: 145.00,
            stock: 18,
            material: 'Nylon exterior, cotton lining',
            dimensions: 'XS to XXL',
            careInstructions: 'Dry clean recommended',
            shipping: 'Free shipping',
            isRecommended: true
        },
        {
            id: 'p-fashion-9',
            name: 'Structured Cotton Snapback Cap',
            category: 'Accessories',
            description: 'Premium snapback with embroidered logo and adjustable back strap. One size fits all.',
            price: 32.00,
            stock: 80,
            material: '100% Cotton twill',
            dimensions: 'One size fits most',
            careInstructions: 'Hand wash cold',
            shipping: 'Free shipping'
        },
        {
            id: 'p-fashion-10',
            name: 'Heavy Duty Canvas Crossbody Bag',
            category: 'Bags',
            description: 'Durable 100% canvas crossbody bag with adjustable strap and multiple pockets.',
            price: 65.00,
            stock: 38,
            material: '100% Canvas',
            dimensions: '11 x 9 inches',
            careInstructions: 'Spot clean with damp cloth',
            shipping: 'Free shipping'
        },
        {
            id: 'p-fashion-11',
            name: 'Premium Genuine Leather Belt',
            category: 'Accessories',
            description: 'Minimalist design leather belt with sleek metal buckle. Versatile essential.',
            price: 52.00,
            stock: 48,
            material: 'Genuine Italian leather',
            dimensions: 'Adjustable 28-38 inches',
            careInstructions: 'Condition with leather conditioner occasionally',
            shipping: 'Free shipping'
        },
        {
            id: 'p-fashion-12',
            name: 'Merino Wool Beanie',
            category: 'Accessories',
            description: 'Premium merino wool beanie in classic black. Warm and breathable for cold weather.',
            price: 35.00,
            stock: 60,
            material: '100% Merino wool',
            dimensions: 'One size fits most',
            careInstructions: 'Hand wash in cold water',
            shipping: 'Free shipping',
            isRecommended: true
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
        <div class="modal-content checkout-modal" style="max-width: 550px;">
            <span class="close" onclick="this.closest('.modal').remove()"><i class="fas fa-times"></i></span>
            <h2>Checkout</h2>
            
            <div class="checkout-section">
                <h3>Order Summary</h3>
                <div id="checkoutItems" style="border: 1px solid rgba(255, 255, 255, 0.1); padding: 16px; margin: 12px 0; border-radius: 8px; max-height: 200px; overflow-y: auto; background: rgba(255, 255, 255, 0.05);">
                </div>
                <div style="text-align: right; font-size: 18px; font-weight: bold; margin: 16px 0; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    Total: $<span id="checkoutTotal">0.00</span>
                </div>
            </div>
            
            <form onsubmit="processCheckout(event)" style="margin-top: 24px;">
                <div class="checkout-section">
                    <h3>Shipping Address</h3>
                    <div style="margin-bottom: 14px;">
                        <label style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 14px;">Full Name</label>
                        <input type="text" id="addressName" placeholder="John Doe" required style="width: 100%; padding: 12px; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; background: rgba(255, 255, 255, 0.05); color: #fff; font-size: 14px;">
                    </div>
                    <div style="margin-bottom: 14px;">
                        <label style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 14px;">Street Address</label>
                        <input type="text" id="addressStreet" placeholder="123 Main St" required style="width: 100%; padding: 12px; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; background: rgba(255, 255, 255, 0.05); color: #fff; font-size: 14px;">
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
                        <div>
                            <label style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 14px;">City</label>
                            <input type="text" id="addressCity" placeholder="New York" required style="width: 100%; padding: 12px; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; background: rgba(255, 255, 255, 0.05); color: #fff; font-size: 14px;">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 14px;">State/Province</label>
                            <input type="text" id="addressState" placeholder="NY" required style="width: 100%; padding: 12px; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; background: rgba(255, 255, 255, 0.05); color: #fff; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
                        <div>
                            <label style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 14px;">ZIP Code</label>
                            <input type="text" id="addressZip" placeholder="10001" required style="width: 100%; padding: 12px; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; background: rgba(255, 255, 255, 0.05); color: #fff; font-size: 14px;">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 14px;">Country</label>
                            <input type="text" id="addressCountry" placeholder="United States" required style="width: 100%; padding: 12px; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; background: rgba(255, 255, 255, 0.05); color: #fff; font-size: 14px;">
                        </div>
                    </div>
                </div>
                
                <div class="checkout-section">
                    <h3>Payment Method</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                        <label style="padding: 12px; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; cursor: pointer; background: rgba(255, 255, 255, 0.05); font-size: 14px;">
                            <input type="radio" name="paymentMethod" value="credit_card" checked required>
                            Credit Card
                        </label>
                        <label style="padding: 12px; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; cursor: pointer; background: rgba(255, 255, 255, 0.05); font-size: 14px;">
                            <input type="radio" name="paymentMethod" value="debit_card" required>
                            Debit Card
                        </label>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                        <label style="padding: 12px; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; cursor: pointer; background: rgba(255, 255, 255, 0.05); font-size: 14px;">
                            <input type="radio" name="paymentMethod" value="paypal" required>
                            PayPal
                        </label>
                        <label style="padding: 12px; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; cursor: pointer; background: rgba(255, 255, 255, 0.05); font-size: 14px;">
                            <input type="radio" name="paymentMethod" value="apple_pay" required>
                            Apple Pay
                        </label>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Place Order</button>
                    <button type="button" class="btn btn-secondary" style="width: 100%;" onclick="this.closest('.modal').remove()">Cancel</button>
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
        <div class="modal-content" style="background: rgba(255, 255, 255, 0.1); text-align: center; max-width: 400px; padding: 40px;">
            <div style="font-size: 60px; margin-bottom: 20px;">✅</div>
            <h2 style="color: #fff; margin-bottom: 10px;">Order Confirmed!</h2>
            <p style="color: #fff; margin: 15px 0;">Thank you for your purchase!</p>
            <p style="color: rgba(255, 255, 255, 0.7); font-size: 14px;">Order ID: ${order.id}</p>
            <p style="color: #fff; margin: 15px 0;"><strong>Total:</strong> $${total.toFixed(2)}</p>
            <p style="color: #fff; margin: 15px 0;"><strong>Payment Method:</strong> ${paymentMethod.replace('_', ' ').toUpperCase()}</p>
            <p style="color: #fff; margin: 15px 0;"><strong>Shipping To:</strong> ${address.name}, ${address.street}, ${address.city}, ${address.state} ${address.zip}</p>
            <button class="btn btn-primary" style="margin-top: 20px;" onclick="closeSuccessAndGoToOrders()">View Orders</button>
        </div>
    `;
    document.body.appendChild(successModal);
}

// Helper function to close success modal and go to orders
function closeSuccessAndGoToOrders() {
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
    showSection('orders');
}

// Save wishlist to localStorage
function saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Check if product is in wishlist
function isInWishlist(productId) {
    const wishlist = getWishlist();
    return wishlist.some(item => item.id === productId);
}

// Toggle wishlist
function toggleWishlist(productId, productName, event) {
    // Prevent event propagation
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    let wishlist = getWishlist();
    const itemIndex = wishlist.findIndex(item => item.id === productId);
    const wasInWishlist = itemIndex > -1;

    // Find the button - event.target might be the icon, so use closest()
    const clickedBtn = event && event.target ? event.target.closest('.wishlist-btn') || event.target : null;

    if (wasInWishlist) {
        // Remove from wishlist
        wishlist.splice(itemIndex, 1);
        showAlert(`❌ Removed from collection`);
    } else {
        // Add to wishlist
        wishlist.push({ id: productId, name: productName });
        showAlert(`❤️ Added to collection`);
    }

    // Update the clicked button immediately
    if (clickedBtn && clickedBtn.classList) {
        if (wasInWishlist) {
            clickedBtn.classList.remove('active');
        } else {
            clickedBtn.classList.add('active');
        }
    }

    saveWishlist(wishlist);
    updateWishlistCount();

    // Update all wishlist buttons across the page
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const onclickText = btn.getAttribute('onclick') || '';
        // Check if this button is for the same product
        if (onclickText.includes(`toggleWishlist('${productId}'`)) {
            if (wasInWishlist) {
                btn.classList.remove('active');
            } else {
                btn.classList.add('active');
            }
        }
    });
}

// Load collections
function loadCollections() {
    const collectionList = document.getElementById('collectionsList');
    if (wishlist.length === 0) {
        collectionList.innerHTML = '<div class="empty-message" style="grid-column: 1/-1; padding: 60px 20px; text-align: center; color: rgba(255,255,255,0.5);">No items in your collection yet. Click the ❤️ heart button on products to add them!</div>';
        return;
    }

    // Get products (from loaded or demo)
    const allProducts = allLoadedProducts && allLoadedProducts.length > 0 ? allLoadedProducts : getDemoProducts();

    // Display collection items as product cards
    const collectionHtml = wishlist.map(item => {
        const product = allProducts.find(p => p.id === item.id);
        if (!product) return '';

        const wishlistActive = isInWishlist(product.id) ? 'active' : '';
        return `
            <div class="product-card" style="position:relative;" data-product='${JSON.stringify(product).replace(/"/g, '&quot;')}'>
                <div class="product-image" onclick="openProductModal('${product.id}')">
                    <img src="${product.image || 'https://via.placeholder.com/300'}" alt="${product.name}">
                    <div style="position:absolute; top:60px; right:10px; z-index:4; display:flex; gap:8px;">
                        <button type="button" class="wishlist-btn ${wishlistActive}" onclick="toggleWishlist('${product.id}','${product.name}', event)"><i class="fas fa-heart"></i></button>
                    </div>
                    <button class="quick-add-btn" onclick="event.stopPropagation(); quickAddToCart('${product.id}')">Add to Bag</button>
                </div>
                <div class="product-info">
                    <h3 class="product-name" onclick="openProductModal('${product.id}')">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-stock">${product.stock > 0 ? 'In Stock' : 'Out of Stock'}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    collectionList.innerHTML = collectionHtml;
}

// Load lookbook with all products
function loadLookbook() {
    const allProducts = allLoadedProducts && allLoadedProducts.length > 0 ? allLoadedProducts : getDemoProducts();
    renderLookbookProducts(allProducts);
    updateStylingTip('Explore all our collections and find your perfect look. Click the heart to save items to your collection.');
}

// Filter lookbook by category
function filterLookbookByCategory(category) {
    const allProducts = allLoadedProducts && allLoadedProducts.length > 0 ? allLoadedProducts : getDemoProducts();

    let filtered = allProducts;

    // Simple category mapping based on product name
    if (category === 'street-style') {
        filtered = filtered.filter(p => p.name.toLowerCase().includes('hoodie') || p.name.toLowerCase().includes('tee') || p.name.toLowerCase().includes('cargo'));
        updateStylingTip('Mix oversized hoodies with fitted pants for that street style edge.');
    } else if (category === 'casual') {
        filtered = filtered.filter(p => p.name.toLowerCase().includes('shirt') || p.name.toLowerCase().includes('shoe') || p.name.toLowerCase().includes('bag'));
        updateStylingTip('Keep it simple: a classic tee, comfortable shoes, and your favorite bag.');
    } else if (category === 'premium') {
        filtered = filtered.filter(p => p.price > 100);
        updateStylingTip('Invest in quality pieces that last. These premium items are worth the splurge.');
    }

    renderLookbookProducts(filtered);
}

// Show all lookbook items
function showAllLookbook() {
    const allProducts = allLoadedProducts && allLoadedProducts.length > 0 ? allLoadedProducts : getDemoProducts();
    renderLookbookProducts(allProducts);
    updateStylingTip('Explore all our collections and find your perfect look. Click the heart to save items to your collection.');
}

// Render lookbook products
function renderLookbookProducts(products) {
    const lookbookList = document.getElementById('lookbookList');
    if (!products || products.length === 0) {
        lookbookList.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: rgba(255,255,255,0.5);">No products available in this category.</div>';
        return;
    }

    const html = products.map(product => {
        const wishlist = getWishlist();
        const wishlistActive = wishlist.some(item => item.id === product.id) ? 'active' : '';
        return `
            <div class="product-card" onclick="openProductModal('${product.id}')">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${escapeHtml(product.name)}" class="product-image" />
                    ${product.isNew ? '<span class="badge-new">NEW</span>' : ''}
                    <button type="button" class="wishlist-btn ${wishlistActive}" onclick="toggleWishlist('${product.id}','${escapeHtml(product.name)}', event)"><i class="fas fa-heart"></i></button>
                    <div class="quick-add-btn">
                        <button class="btn btn-primary" onclick="addToCart('${product.id}', event)">Add to Bag</button>
                    </div>
                </div>
                <div class="product-info">
                    <h3>${escapeHtml(product.name)}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <p class="product-stock" style="font-size: 12px; color: ${product.stock > 0 ? 'rgba(255,255,255,0.6)' : '#ff6b6b'}; margin: 4px 0;">${product.stock > 0 ? 'In stock' : 'Out of stock'}</p>
                </div>
            </div>
        `;
    }).join('');

    lookbookList.innerHTML = html;
}

// Update styling tip
function updateStylingTip(tip = null) {
    const tips = [
        'Mix oversized hoodies with fitted pants for that street style edge.',
        'Keep it simple: a classic tee, comfortable shoes, and your favorite bag.',
        'Layer your pieces for added depth and visual interest.',
        'Let your shoes be the statement piece of your outfit.',
        'Balance loose-fitting tops with tailored bottoms.',
        'Invest in quality basics that pair with everything.'
    ];

    const stylingTipElement = document.getElementById('stylingTip');
    if (stylingTipElement) {
        if (tip) {
            stylingTipElement.textContent = tip;
        } else {
            stylingTipElement.textContent = tips[Math.floor(Math.random() * tips.length)];
        }
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
        console.log('📦 loadProducts called');
        let productsArray = [];
        
        try {
            const response = await fetch('/api/products');
            console.log('📡 API response status:', response.status, response.ok);
            if (response.ok) {
                const data = await response.json();
                console.log('📊 API data received:', data);
                if (data && data.products && data.products.length > 0) {
                    productsArray = data.products;
                    console.log('✅ Fetched', productsArray.length, 'products from API');
                } else {
                    console.log('⚠️ API returned empty products array');
                }
            } else {
                console.log('⚠️ API response not OK:', response.status);
            }
        } catch (e) {
            console.log('🔌 API unavailable, error:', e.message);
        }
        
        // Use demo products if API failed or returned nothing
        if (productsArray.length === 0) {
            productsArray = getDemoProducts();
            console.log('✅ Loaded', productsArray.length, 'demo products');
        }
        
        // Add custom products from localStorage
        const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
        productsArray = [...productsArray, ...customProducts];
        
        // Store all products globally for edit/delete operations
        allLoadedProducts = productsArray;

        const productsList = document.getElementById('productsList');
        if (!productsList) {
            console.error('❌ productsList element not found');
            return;
        }
        
        console.log('🎯 About to render', productsArray.length, 'products to DOM');
        
        // Use modern rendering
        renderProductsModern();
        
        console.log('✅ Loaded', productsArray.length, 'products total');
        updateAdminControls();
  } catch (error) {
    console.error('Error loading products:', error);
  }
  console.log('✨ loadProducts() function completed');
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

  if (!isLoggedIn || !currentUser || currentUser.role !== 'ADMIN') {
    alert('Only admins can add products');
    return;
  }

  const token = localStorage.getItem('token');

  // Build FormData for API upload (supports image)
  const formData = new FormData();
  formData.append('name', document.getElementById('productName').value);
  formData.append('category', document.getElementById('productCategory') ? document.getElementById('productCategory').value : 'Custom');
  formData.append('price', document.getElementById('productPrice').value);
  formData.append('description', document.getElementById('productDesc').value || '');
  formData.append('stock', document.getElementById('productStock').value || 0);
  formData.append('material', document.getElementById('productMaterial') ? document.getElementById('productMaterial').value : '');
  formData.append('dimensions', document.getElementById('productDimensions') ? document.getElementById('productDimensions').value : '');
  formData.append('careInstructions', document.getElementById('productCareInstructions') ? document.getElementById('productCareInstructions').value : '');
  formData.append('isRecommended', document.getElementById('productRecommended') && document.getElementById('productRecommended').checked ? 'true' : 'false');

  const imgEl = document.getElementById('productImage');
  if (imgEl && imgEl.files && imgEl.files[0]) {
    formData.append('image', imgEl.files[0]);
  }

  // Send to backend
  fetch('/api/products', {
    method: 'POST',
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    body: formData
  })
  .then(async res => {
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      alert('Product created successfully');
      closeAddProductForm();
      if (typeof loadProducts === 'function') loadProducts();
    } else {
      alert('Failed to create product: ' + (data.message || res.statusText));
    }
  })
  .catch(err => {
    console.error('Create product error:', err);
    alert('Error creating product. See console for details.');
  });
}

// Edit product
// Store the current product being edited
let currentEditingProduct = null;

function openProductEditModal(productId) {
  console.log('🔧 Opening edit modal for product:', productId);
  console.log('📦 Available products:', allLoadedProducts.length);
  
  // Find the product from all loaded products
  const product = allLoadedProducts.find(p => p.id === productId);
  
  if (!product) {
    console.error('❌ Product not found. Available IDs:', allLoadedProducts.map(p => p.id));
    alert('Product not found. Please try refreshing the page.');
    return;
  }
  
  // Store for later use
  currentEditingProduct = product;
  
  // Populate form
  document.getElementById('editProductName').value = product.name;
  document.getElementById('editProductPrice').value = product.price;
  document.getElementById('editProductDescription').value = product.description;
  document.getElementById('editProductStock').value = product.stock;
  
  // Show image preview if exists
  const previewContainer = document.getElementById('imagePreviewContainer');
  const preview = document.getElementById('imagePreview');
  if (product.image) {
    preview.src = product.image;
    previewContainer.style.display = 'block';
  } else {
    previewContainer.style.display = 'none';
  }
  
  // Clear file input
  document.getElementById('editProductImage').value = '';
  
  // Show modal
  document.getElementById('productEditModal').classList.remove('hidden');
}

function closeProductEditModal() {
  document.getElementById('productEditModal').classList.add('hidden');
  currentEditingProduct = null;
  document.getElementById('editProductImage').value = '';
}

function submitProductEdit(event) {
  event.preventDefault();
  
  if (!currentEditingProduct) {
    alert('No product selected');
    return;
  }
  
  const name = document.getElementById('editProductName').value;
  const price = parseFloat(document.getElementById('editProductPrice').value);
  const description = document.getElementById('editProductDescription').value;
  const stock = parseInt(document.getElementById('editProductStock').value);
  const imageFile = document.getElementById('editProductImage').files[0];
  
  // Validation
  if (!name || isNaN(price) || !description || isNaN(stock)) {
    alert('Please fill in all required fields');
    return;
  }
  
  // Check if user is authenticated as admin
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  
  if (!token) {
    alert('You must be logged in as admin to edit products');
    return;
  }
  
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('stock', stock);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    // Try to send to backend first
    fetch(`/api/products/${currentEditingProduct.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.product) {
        console.log('✅ Product updated on server');
        showAlert('<i class="fas fa-check-circle"></i> Product updated successfully!');
        closeProductEditModal();
        loadProducts();
      } else {
        throw new Error(data.message || 'Failed to update');
      }
    })
    .catch(error => {
      console.log('⚠️ Server not responding, updating locally:', error.message);
      // Fallback: update locally
      updateProductLocally(name, price, description, stock, imageFile);
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Error: ' + error.message);
  }
}

function updateProductLocally(name, price, description, stock, imageFile) {
  try {
    let demoProducts = getDemoProducts();
    let customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
    let allProducts = [...demoProducts, ...customProducts];
    
    const productIndex = allProducts.findIndex(p => p.id === currentEditingProduct.id);
    
    if (productIndex > -1) {
      // Handle image if provided
      if (imageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          allProducts[productIndex] = {
            ...allProducts[productIndex],
            name,
            price,
            description,
            stock,
            image: e.target.result // Store as base64
          };
          
          // Update localStorage
          const customIndex = customProducts.findIndex(p => p.id === currentEditingProduct.id);
          if (customIndex > -1) {
            customProducts[customIndex] = allProducts[productIndex];
          } else {
            customProducts.push(allProducts[productIndex]);
          }
          localStorage.setItem('customProducts', JSON.stringify(customProducts));
          
          showAlert('<i class="fas fa-check-circle"></i> Product updated successfully!');
          closeProductEditModal();
          loadProducts();
        };
        reader.readAsDataURL(imageFile);
      } else {
        allProducts[productIndex] = {
          ...allProducts[productIndex],
          name,
          price,
          description,
          stock
        };
        
        // Update localStorage
        const customIndex = customProducts.findIndex(p => p.id === currentEditingProduct.id);
        if (customIndex > -1) {
          customProducts[customIndex] = allProducts[productIndex];
        } else {
          customProducts.push(allProducts[productIndex]);
        }
        localStorage.setItem('customProducts', JSON.stringify(customProducts));
        
        showAlert('<i class="fas fa-check-circle"></i> Product updated successfully!');
        closeProductEditModal();
        loadProducts();
      }
    }
  } catch (error) {
    console.error('Error updating locally:', error);
    alert('Error updating product: ' + error.message);
  }
}

function editProduct(productId) {
  openProductEditModal(productId);
}

// Delete product
function deleteProduct(productId) {
  console.log('🗑️ Delete clicked for product:', productId);
  
  if (!confirm('Are you sure you want to delete this product?')) return;
  
  try {
    // Check if product exists in loaded products
    const product = allLoadedProducts.find(p => p.id === productId);
    if (!product) {
      console.log('❌ Product not found:', productId);
      alert('Product not found');
      return;
    }
    
    // Try to delete from backend first if it's a server product
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    
    if (token && product.id && !product.id.startsWith('p-demo')) {
      // Try backend delete
      fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log('✅ Product deleted from server');
        showAlert('<i class="fas fa-check-circle"></i> Product deleted successfully!');
        loadProducts();
      })
      .catch(error => {
        console.log('⚠️ Server delete failed, removing locally:', error.message);
        deleteProductLocally(productId);
      });
    } else {
      deleteProductLocally(productId);
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('Error deleting product: ' + error.message);
  }
}

// Admin: upload image for a product
function addImageToProduct(productId) {
  const token = localStorage.getItem('token');

  // Create temporary file input
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.style.display = 'none';
  input.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        body: formData
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        alert('Image uploaded successfully');
        if (typeof loadProducts === 'function') loadProducts();
      } else {
        alert('Upload failed: ' + (data.message || res.statusText));
      }
    } catch (err) {
      console.error('Image upload error:', err);
      alert('Error uploading image. See console for details.');
    }
  });

  // Add to DOM, trigger click, then remove
  document.body.appendChild(input);
  input.click();
  input.remove();
}

function deleteProductLocally(productId) {
  try {
    let customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
    customProducts = customProducts.filter(p => p.id !== productId);
    localStorage.setItem('customProducts', JSON.stringify(customProducts));
    
    console.log('✅ Product deleted locally');
    showAlert('<i class="fas fa-check-circle"></i> Product deleted successfully!');
    loadProducts();
  } catch (error) {
    console.error('Error deleting product locally:', error);
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

// Wishlist panel functions
function toggleWishlistPanel() {
  const wishlistPanel = document.getElementById('wishlistPanel');
  const cartPanel = document.getElementById('cartPanel');
  
  // Hide cart panel if open
  if (cartPanel && !cartPanel.classList.contains('hidden')) {
    cartPanel.classList.add('hidden');
  }
  
  // Toggle wishlist panel
  wishlistPanel.classList.toggle('hidden');
  
  if (!wishlistPanel.classList.contains('hidden')) {
    renderWishlistItems();
  }
}

function renderWishlistItems() {
  const itemsContainer = document.getElementById('wishlistItems');
  const wishlist = getWishlist();
  
  if (wishlist.length === 0) {
    itemsContainer.innerHTML = '<p class="empty-message">Your wishlist is empty</p>';
    document.getElementById('wishlistItemCount').textContent = '0';
    return;
  }
  
  itemsContainer.innerHTML = wishlist.map(item => {
    // Find product details from allLoadedProducts
    const product = allLoadedProducts.find(p => p.id === item.id);
    if (!product) return '';
    
    return `
      <div class="cart-item">
        <div class="item-info">
          <strong>${escapeHtml(product.name)}</strong>
          <p>$${product.price.toFixed(2)}</p>
        </div>
        <div class="item-actions">
          <button class="btn-small btn-add" onclick="addToCart('${product.id}', '${escapeHtml(product.name)}', ${product.price})">
            <i class="fas fa-shopping-cart"></i>
          </button>
          <button class="btn-small btn-remove" onclick="removeFromWishlist('${product.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
  
  document.getElementById('wishlistItemCount').textContent = wishlist.length;
  updateWishlistCount();
}

function removeFromWishlist(productId) {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter(item => item.id !== productId);
  saveWishlist(updatedWishlist);
  renderWishlistItems();
  
  // Update wishlist button icon if visible
  const wishlistBtn = document.getElementById('wishlistBtn');
  if (wishlistBtn && updatedWishlist.length === 0) {
    wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
  } else if (wishlistBtn) {
    wishlistBtn.innerHTML = `<i class="fas fa-heart"></i> <span id="wishlistCount">${updatedWishlist.length}</span>`;
  }
}

function updateWishlistCount() {
  const wishlistBtn = document.getElementById('wishlistBtn');
  const count = getWishlist().length;
  
  if (count === 0) {
    if (wishlistBtn) wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
  } else {
    if (wishlistBtn) wishlistBtn.innerHTML = `<i class="fas fa-heart"></i> <span id="wishlistCount">${count}</span>`;
  }
}

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(loadProducts, 100);
  updateWishlistCount();
  
  // Add image preview listener
  const imageInput = document.getElementById('editProductImage');
  if (imageInput) {
    imageInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const preview = document.getElementById('imagePreview');
          const previewContainer = document.getElementById('imagePreviewContainer');
          preview.src = event.target.result;
          previewContainer.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });
  }
});

/* ===== MODERN UI FUNCTIONS ===== */

let selectedProductId = null;
let selectedSize = null;

// Toggle filter accordion
function toggleFilter(button) {
  button.classList.toggle('active');
  const options = button.nextElementSibling;
  options.classList.toggle('hidden');
}

// Apply filters based on selected checkboxes
function applyFilters() {
  const search = window._searchTerm || (document.getElementById('searchInput')?.value || '');
  const checked = Array.from(document.querySelectorAll('.filters-sidebar .filter-options input[type="checkbox"]:checked')).map(i => i.value);

  const sizeSet = new Set(['XS','S','M','L','XL','XXL']);
  const typeSet = new Set(['tops', 'bottoms', 'footwear', 'outerwear', 'accessories']);
  
  const sizes = checked.filter(v => sizeSet.has(v));
  const types = checked.filter(v => typeSet.has(v));
  const priceRanges = checked.filter(v => v.includes('-') || v.includes('+'));

  const filtered = allLoadedProducts.filter(p => {
    let ok = true;
    if (search) {
      ok = (p.name && p.name.toLowerCase().includes(search.toLowerCase())) || (p.description && p.description.toLowerCase().includes(search.toLowerCase()));
    }

    if (sizes.length) {
      ok = ok && sizes.some(sz => p.dimensions && p.dimensions.includes(sz));
    }

    if (types.length) {
      const prodType = (p.category || '').toString().toLowerCase();
      ok = ok && types.some(t => prodType.includes(t));
    }

    if (priceRanges.length) {
      ok = ok && priceRanges.some(range => {
        if (range.includes('-')) {
          const parts = range.split('-');
          const min = parseFloat(parts[0]) || 0;
          const max = parseFloat(parts[1]) || Infinity;
          return p.price >= min && p.price <= max;
        }
        if (range.endsWith('+')) {
          const num = parseFloat(range.replace('+','')) || 0;
          return p.price >= num;
        }
        return true;
      });
    }

    // Color swatches: if selected, product must match at least one selected color
    const selectedColors = Array.from(window._selectedColors || []);
    if (selectedColors.length) {
      const prodColor = (p.color || p.primaryColor || '').toString().toLowerCase();
      const nameColorHit = selectedColors.some(c => p.name && p.name.toLowerCase().includes(c));
      ok = ok && (selectedColors.some(c => prodColor.includes(c)) || nameColorHit);
    }

    // Price range slider (max price)
    const maxPrice = parseFloat(document.getElementById('priceRange')?.value || '0');
    if (maxPrice && !isNaN(maxPrice)) {
      ok = ok && (p.price <= maxPrice);
    }

    return ok;
  });

  renderProductsModern(filtered);
}

// Color filter helpers
window._selectedColors = new Set();
function toggleColor(el) {
  if (!el) return;
  const color = el.getAttribute('data-color');
  if (!color) return;
  if (!window._selectedColors) window._selectedColors = new Set();
  if (window._selectedColors.has(color)) {
    window._selectedColors.delete(color);
    el.classList.remove('active');
  } else {
    window._selectedColors.add(color);
    el.classList.add('active');
  }
  applyFilters();
}
function clearColorFilters() {
  window._selectedColors = new Set();
  document.querySelectorAll('.color-swatch').forEach(b => b.classList.remove('active'));
  applyFilters();
}

// Price range helpers
function onPriceRangeChange(value) {
  const el = document.getElementById('priceRangeValue');
  if (el) el.textContent = value;
  applyFilters();
}
function resetPriceRange() {
  const slider = document.getElementById('priceRange');
  if (slider) { slider.value = slider.max || 500; }
  onPriceRangeChange(document.getElementById('priceRange')?.value || 500);
}

// Quick add (adds quantity 1 without prompt)
function quickAddToCart(productId) {
  const product = allLoadedProducts.find(p => p.id === productId);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) existing.quantity += 1; else cart.push({ id: productId, name: product.name, price: product.price, quantity: 1 });
  saveCart(cart);
  showAlert(`<i class="fas fa-shopping-cart"></i> Added 1x ${escapeHtml(product.name)} to cart`);
}

// Clear all filters
function clearFilters() {
  document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
  });
  // also clear color swatches and price slider
  clearColorFilters();
  resetPriceRange();
  applyFilters();
}

// Open product detail modal
function openProductModal(productId) {
  selectedProductId = productId;
  selectedSize = null;
  
  const product = allLoadedProducts.find(p => p.id === productId);
  if (!product) return;

  document.getElementById('modalProductName').textContent = product.name;
  document.getElementById('modalProductDesc').textContent = product.description;
  document.getElementById('modalProductPrice').textContent = `$${product.price.toFixed(2)}`;
  document.getElementById('modalProductStock').textContent = product.stock > 0 ? 'In Stock' : 'Out of Stock';
  document.getElementById('modalProductImage').src = product.image || 'https://via.placeholder.com/400';

  // Reset size buttons
  document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));

  const modal = document.getElementById('productModal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// Close product detail modal
function closeProductModal() {
  const modal = document.getElementById('productModal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
  selectedSize = null;
}

// Select size for product
function selectSize(button) {
  document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  selectedSize = button.getAttribute('data-size');
}

// Add to cart from modal
function addToCartFromModal() {
  if (!selectedProductId || !selectedSize) {
    alert('Please select a size before adding to cart');
    return;
  }

  const product = allLoadedProducts.find(p => p.id === selectedProductId);
  if (product) {
    addToCart(product.id, product.name, product.price);
    closeProductModal();
  }
}

// Toggle cart drawer
function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  
  drawer.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
  
  if (!drawer.classList.contains('hidden')) {
    renderCartItems();
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}

// Render cart items in drawer
function renderCartItems() {
  const itemsContainer = document.getElementById('cartItemsList');
  const cart = getCart();

  if (cart.length === 0) {
    itemsContainer.innerHTML = `<div class="empty-cart"><i class="fas fa-shopping-bag"></i><p>Your bag is empty</p></div>`;
    document.getElementById('cartSubtotal').textContent = '$0.00';
    document.getElementById('cartTotal').textContent = '$0.00';
    return;
  }

  itemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="item-info">
        <strong>${escapeHtml(item.name)}</strong>
        <p>$${item.price.toFixed(2)}</p>
      </div>
      <div class="item-actions">
        <button class="btn-small" onclick="removeFromCart('${item.id}')">Remove</button>
      </div>
    </div>
  `).join('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity || item.price), 0);
  document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('cartTotal').textContent = `$${subtotal.toFixed(2)}`;
}

// Render products with new UI
function renderProductsModern(products) {
  const source = products || allLoadedProducts || [];
  const container = document.getElementById('productsList');
  if (!source || source.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No products available</p>';
    return;
  }

  const isAdmin = isLoggedIn && currentUser && currentUser.role === 'ADMIN';
  container.innerHTML = source.map((product, index) => {
    const badge = index < 2 ? '<div class="new-arrival-badge">New</div>' : '';
    const adminActions = isAdmin ? `
        <div class="admin-actions" style="position:absolute; top:8px; right:8px; display:flex; gap:8px;">
          <button class="btn-small" onclick="event.stopPropagation(); editProduct('${product.id}')">Edit</button>
          <button class="btn-small" onclick="event.stopPropagation(); addImageToProduct('${product.id}')">Image</button>
          <button class="btn-small btn-danger" onclick="event.stopPropagation(); deleteProduct('${product.id}')">Delete</button>
        </div>
    ` : '';
    const wishlistActive = isInWishlist(product.id) ? 'active' : '';
    const badgeHtml = product.isRecommended ? `<div class="badge-new">New</div>` : (product.onSale ? `<div class="badge-sale">Sale</div>` : badge);
    const productDataJson = JSON.stringify(product).replace(/"/g, '&quot;');
    return `
      <div class="product-card" style="position:relative;" data-product="${productDataJson}">
        ${badgeHtml}
        ${adminActions}
        <div class="product-image" onclick="openProductModal('${product.id}')">
          <img src="${product.image || 'https://via.placeholder.com/300'}" alt="${escapeHtml(product.name)}">
          <div style="position:absolute; top:60px; right:10px; z-index:4; display:flex; gap:8px;">
            <button type="button" class="wishlist-btn ${wishlistActive}" onclick="toggleWishlist('${product.id}','${escapeHtml(product.name)}', event)"><i class="fas fa-heart"></i></button>
          </div>
          <button class="quick-add-btn" onclick="event.stopPropagation(); quickAddToCart('${product.id}')">Add to Bag</button>
        </div>
        <div class="product-info">
          <h3 class="product-name" onclick="openProductModal('${product.id}')">${escapeHtml(product.name)}</h3>
          <p class="product-description">${escapeHtml(product.description)}</p>
          <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-stock">${product.stock > 0 ? 'In Stock' : 'Out of Stock'}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Setup modal add to cart button listener
document.addEventListener('DOMContentLoaded', () => {
  const modalAddBtn = document.getElementById('modalAddToCart');
  if (modalAddBtn) {
    modalAddBtn.addEventListener('click', addToCartFromModal);
  }
});

// Lightweight hero carousel controller
(function initHeroCarousel(){
  document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return;
    const slides = Array.from(carousel.querySelectorAll('.slide'));
    if (slides.length <= 1) return;
    let idx = 0;
    const show = i => {
      slides.forEach(s => s.classList.remove('active'));
      slides[i].classList.add('active');
    };
    const next = () => { idx = (idx + 1) % slides.length; show(idx); };
    const prev = () => { idx = (idx - 1 + slides.length) % slides.length; show(idx); };
    let timer = setInterval(next, 6000);
    const btnNext = document.getElementById('heroNext');
    const btnPrev = document.getElementById('heroPrev');
    if (btnNext) btnNext.addEventListener('click', () => { next(); clearInterval(timer); timer = setInterval(next, 8000); });
    if (btnPrev) btnPrev.addEventListener('click', () => { prev(); clearInterval(timer); timer = setInterval(next, 8000); });
    // Pause autoplay on hover
    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', () => { clearInterval(timer); timer = setInterval(next, 6000); });
  });
})();