// Admin dashboard script removed - admin features are integrated into the main site.
// Keeping this file empty to avoid loading legacy admin logic.

/*
  If you need to restore admin-specific pages, implement logic in
  `public/js/products.js` or create a new module and import it from HTML.
*/

let allProducts = [];
let filteredProducts = [];
let currentProductEdit = null;

async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        if (response.ok) {
            const data = await response.json();
            allProducts = data.products || [];
        } else {
            console.error('Failed to load products');
            allProducts = [];
        }
    } catch (error) {
        console.error('Error loading products:', error);
        allProducts = [];
    }

    filteredProducts = [...allProducts];
    renderProductsTable();
}

loadProducts();


function renderProductsTable() {
    const tbody = document.querySelector('.products-table tbody');
    if (!tbody) return;

    let html = '';
    filteredProducts.forEach(product => {
        html += `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>$${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn-edit" onclick="editProduct('${product.id}')">Edit</button>
                        <button class="btn-delete" onclick="deleteProduct('${product.id}')">Delete</button>
                    </div>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

function filterProducts() {
    const searchTerm = document.getElementById('productSearch')?.value || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';

    filteredProducts = allProducts.filter(product => {
        const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = !categoryFilter || product.category === categoryFilter;
        return matchSearch && matchCategory;
    });

    renderProductsTable();
}

// PRODUCT MODAL
function openAddProductModal() {
    currentProductEdit = null;
    document.getElementById('productForm')?.reset();
    document.getElementById('imagePreview')?.classList.add('hidden');
    document.getElementById('modalTitle').textContent = 'Add New Product';
    document.getElementById('productModal')?.classList.remove('hidden');
    document.getElementById('modalOverlay')?.classList.remove('hidden');
    document.getElementById('productImage').value = '';
}

function editProduct(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    currentProductEdit = product;
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productDescription').value = product.description || '';
    document.getElementById('productMaterial').value = product.material || '';
    document.getElementById('productDimensions').value = product.dimensions || '';
    document.getElementById('productCareInstructions').value = product.careInstructions || '';
    document.getElementById('productRecommended').checked = product.isRecommended || false;

    // Show image preview if exists
    if (product.image) {
        const preview = document.getElementById('imagePreview');
        document.getElementById('previewImg').src = product.image;
        preview?.classList.remove('hidden');
    }

    document.getElementById('modalTitle').textContent = 'Edit Product';
    document.getElementById('productModal').classList.remove('hidden');
    document.getElementById('modalOverlay').classList.remove('hidden');
}

function closeProductModal() {
    document.getElementById('productModal')?.classList.add('hidden');
    document.getElementById('modalOverlay')?.classList.add('hidden');
    currentProductEdit = null;
}

async function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                loadProducts();
                showNotification('Product deleted successfully!');
            } else {
                showNotification('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            showNotification('Error deleting product. Please try again.');
        }
    }
}

// FORM HANDLING
async function handleProductSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const formData = new FormData();

    // Collect form data
    formData.append('name', document.getElementById('productName').value);
    formData.append('category', document.getElementById('productCategory').value);
    formData.append('price', document.getElementById('productPrice').value);
    formData.append('stock', document.getElementById('productStock').value);
    formData.append('description', document.getElementById('productDescription').value);
    formData.append('material', document.getElementById('productMaterial').value);
    formData.append('dimensions', document.getElementById('productDimensions').value);
    formData.append('careInstructions', document.getElementById('productCareInstructions').value);
    formData.append('isRecommended', document.getElementById('productRecommended').checked);

    // Add image if selected
    const imageInput = document.getElementById('productImage');
    if (imageInput.files.length > 0) {
        formData.append('image', imageInput.files[0]);
    }

    try {
        let response;
        if (currentProductEdit) {
            // Update existing product
            response = await fetch(`/api/products/${currentProductEdit.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
        } else {
            // Create new product
            response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
        }

        const data = await response.json();

        if (response.ok) {
            closeProductModal();
            loadProducts();
            showNotification(`Product ${currentProductEdit ? 'updated' : 'added'} successfully!`);
        } else {
            showNotification(`Error: ${data.message || 'Failed to save product'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error saving product. Please try again.');
    }
}

function previewImage(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const preview = document.getElementById('imagePreview');
            document.getElementById('previewImg').src = event.target.result;
            preview?.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
}

function removeImage() {
    const preview = document.getElementById('imagePreview');
    document.getElementById('productImage').value = '';
    if (preview) preview.classList.add('hidden');
    const previewImg = document.getElementById('previewImg');
    if (previewImg) previewImg.src = '';
}

// ORDERS MANAGEMENT
function loadOrders() {
    const tbody = document.querySelector('.orders-table tbody');
    if (!tbody) return;

    const ordersHtml = `
        <tr>
            <td>#ORD-001</td>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td>$75.00</td>
            <td><span class="recent-item-status status-completed">Completed</span></td>
            <td>2024-01-20</td>
            <td>
                <div class="table-actions">
                    <button class="btn-edit">View</button>
                </div>
            </td>
        </tr>
        <tr>
            <td>#ORD-002</td>
            <td>Jane Smith</td>
            <td>jane@example.com</td>
            <td>$145.00</td>
            <td><span class="recent-item-status status-pending">Pending</span></td>
            <td>2024-01-19</td>
            <td>
                <div class="table-actions">
                    <button class="btn-edit">View</button>
                </div>
            </td>
        </tr>
        <tr>
            <td>#ORD-003</td>
            <td>Mike Johnson</td>
            <td>mike@example.com</td>
            <td>$95.00</td>
            <td><span class="recent-item-status status-completed">Completed</span></td>
            <td>2024-01-18</td>
            <td>
                <div class="table-actions">
                    <button class="btn-edit">View</button>
                </div>
            </td>
        </tr>
    `;

    tbody.innerHTML = ordersHtml;
}

// USERS MANAGEMENT
function loadUsers() {
    const tbody = document.querySelector('.users-table tbody');
    if (!tbody) return;

    const usersHtml = `
        <tr>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td><span style="background: rgba(40, 167, 69, 0.2); color: #28a745; padding: 4px 8px; border-radius: 4px;">Customer</span></td>
            <td>2024-01-01</td>
            <td>
                <div class="table-actions">
                    <button class="btn-edit">Edit</button>
                    <button class="btn-delete">Delete</button>
                </div>
            </td>
        </tr>
        <tr>
            <td>Jane Smith</td>
            <td>jane@example.com</td>
            <td><span style="background: rgba(26, 125, 208, 0.2); color: #1a7dd0; padding: 4px 8px; border-radius: 4px;">Customer</span></td>
            <td>2024-01-05</td>
            <td>
                <div class="table-actions">
                    <button class="btn-edit">Edit</button>
                    <button class="btn-delete">Delete</button>
                </div>
            </td>
        </tr>
        <tr>
            <td>Admin User</td>
            <td>admin@example.com</td>
            <td><span style="background: rgba(0, 0, 0, 0.1); color: #000; padding: 4px 8px; border-radius: 4px;">Admin</span></td>
            <td>2023-12-01</td>
            <td>
                <div class="table-actions">
                    <button class="btn-edit">Edit</button>
                    <button class="btn-delete">Delete</button>
                </div>
            </td>
        </tr>
    `;

    tbody.innerHTML = usersHtml;
}

// UTILITIES
function saveProductsToStorage() {
    localStorage.setItem('adminProducts', JSON.stringify(allProducts));
}

function showNotification(message) {
    // Simple notification - in production use a toast library
    alert(message);
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        window.location.href = '/login';
    }
}

// Close modal when clicking overlay
document.addEventListener('click', function(e) {
    const modal = document.getElementById('productModal');
    const overlay = document.getElementById('modalOverlay');

    if (e.target === overlay) {
        closeProductModal();
    }
});