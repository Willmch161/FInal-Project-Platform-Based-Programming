const express = require('express');
const router = express.Router();
const prisma = require('../config/prisma');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

// Create order (USER must be authenticated)
router.post('/', authMiddleware, async(req, res, next) => {
    try {
        const { total } = req.body;

        if (total === undefined) {
            return res.status(400).json({ message: 'Total is required' });
        }

        const order = await prisma.order.create({
            data: {
                userId: req.user.id,
                total: parseFloat(total)
            }
        });

        res.status(201).json({
            message: 'Order created successfully',
            order
        });
    } catch (err) {
        next(err);
    }
});

// Get user's orders
router.get('/', authMiddleware, async(req, res, next) => {
    try {
        const orders = await prisma.order.findMany({
            where: { userId: req.user.id },
            include: { user: true }
        });

        res.json({
            message: 'Orders retrieved',
            orders
        });
    } catch (err) {
        next(err);
    }
});

// Get all orders (ADMIN only)
router.get('/admin/all', authMiddleware, roleMiddleware('ADMIN'), async(req, res, next) => {
    try {
        const orders = await prisma.order.findMany({
            include: { user: true }
        });

        res.json({
            message: 'All orders retrieved',
            orders
        });
    } catch (err) {
        next(err);
    }
});

// Get order by ID
router.get('/:id', authMiddleware, async(req, res, next) => {
    try {
        const order = await prisma.order.findUnique({
            where: { id: req.params.id },
            include: { user: true }
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // User can only see their own orders, unless admin
        if (order.userId !== req.user.id && req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Forbidden' });
        }

        res.json({
            message: 'Order retrieved',
            order
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;