// Load and display orders
async function loadOrders() {
    if (!isLoggedIn) {
        document.getElementById('ordersList').innerHTML =
            '<div class="empty-message">Please login to view your orders</div>';
        return;
    }

    try {
        // Get orders from localStorage (from checkout)
        let orders = JSON.parse(localStorage.getItem('orders') || '[]');

        const ordersList = document.getElementById('ordersList');
        ordersList.innerHTML = '';

        if (!orders || orders.length === 0) {
            ordersList.innerHTML = '<div class="empty-message">No orders yet</div>';
            return;
        }

        // Display each order with full details
        orders.forEach((order, index) => {
            const card = document.createElement('div');
            card.className = 'order-card';
            const orderDate = new Date(order.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            // Build items list
            let itemsHtml = '';
            order.items.forEach(item => {
                itemsHtml += `
                    <div style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="color: #fff; font-weight: 600;">${item.name}</div>
                            <div style="color: rgba(255,255,255,0.7); font-size: 13px;">Qty: ${item.quantity} × $${item.price.toFixed(2)}</div>
                        </div>
                        <div style="color: #fff; font-weight: 700;">$${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                `;
            });

            card.innerHTML = `
                <div style="padding: 20px;">
                    <div class="order-header" style="display: flex; justify-content: space-between; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid rgba(71, 102, 152, 0.3);">
                        <div>
                            <div class="order-id" style="font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 4px;">Order #${order.id.substring(order.id.length - 8)}</div>
                            <div class="order-date" style="color: rgba(255,255,255,0.7); font-size: 13px;">📅 ${orderDate}</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: rgba(71, 102, 152, 0.8); background: rgba(71, 102, 152, 0.2); padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 8px;">${order.status.toUpperCase()}</div>
                            <div class="order-total" style="font-size: 20px; font-weight: 800; color: var(--accent-gold);">$${order.total.toFixed(2)}</div>
                        </div>
                    </div>

                    <div style="margin-bottom: 16px;">
                        <div style="color: #fff; font-weight: 700; margin-bottom: 12px; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">📦 Order Items</div>
                        ${itemsHtml}
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                        <div>
                            <div style="color: #fff; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">👤 Buyer Details</div>
                            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.9); font-size: 13px;">
                                <div style="margin-bottom: 6px;"><strong>Name:</strong> ${order.address.name}</div>
                                <div style="color: rgba(255,255,255,0.7); font-size: 12px;">Payment: ${order.paymentMethod.replace('_', ' ').toUpperCase()}</div>
                            </div>
                        </div>

                        <div>
                            <div style="color: #fff; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">📍 Shipping Address</div>
                            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.9); font-size: 13px;">
                                <div style="margin-bottom: 4px;">${order.address.street}</div>
                                <div style="margin-bottom: 4px;">${order.address.city}, ${order.address.state} ${order.address.zip}</div>
                                <div>${order.address.country}</div>
                            </div>
                        </div>
                    </div>

                    <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;">
                        <button type="button" onclick="copyOrderId('${order.id}')" style="background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 12px; transition: all 0.3s; width: 100%;">Copy Order ID</button>
                    </div>
                </div>
            `;
            ordersList.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading orders:', error);
        document.getElementById('ordersList').innerHTML =
            '<div class="error">Error loading orders</div>';
    }
}

// Helper function to copy order ID
function copyOrderId(orderId) {
    navigator.clipboard.writeText(orderId).then(() => {
        showAlert('✅ Order ID copied!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Load orders when section is shown
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (isLoggedIn) {
            loadOrders();
        }
    }, 100);
});