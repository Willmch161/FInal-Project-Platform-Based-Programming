// Load and display orders
async function loadOrders() {
    if (!isLoggedIn) {
        document.getElementById('ordersList').innerHTML =
            '<div class="empty-message">Please login to view your orders</div>';
        return;
    }

    try {
        const response = await fetch('/api/orders', {
            headers: getAuthHeader()
        });

        const data = await response.json();

        const ordersList = document.getElementById('ordersList');
        ordersList.innerHTML = '';

        if (!data.orders || data.orders.length === 0) {
            ordersList.innerHTML = '<div class="empty-message">No orders yet</div>';
            return;
        }

        data.orders.forEach(order => {
            const card = document.createElement('div');
            card.className = 'order-card';
            const orderDate = new Date(order.createdAt).toLocaleDateString();

            card.innerHTML = `
        <div class="order-header">
          <div>
            <div class="order-id">Order #${order.id.substring(0, 8)}</div>
            <div class="order-date">Date: ${orderDate}</div>
          </div>
          <div class="order-total">$${order.total.toFixed(2)}</div>
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

// Load orders when section is shown
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (isLoggedIn) {
            loadOrders();
        }
    }, 100);
});