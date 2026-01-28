const express = require('express');
const path = require('path');
const cors = require('cors');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, '../public')));

// Routes
console.log('🔧 Registering routes...');
try {
    app.use('/api/auth', require('./routes/auth.routes'));
    console.log('✅ Auth routes registered');
} catch (e) {
    console.error('❌ Auth routes error:', e.message);
}
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/orders', require('./routes/order.routes'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Serve index.html for frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;