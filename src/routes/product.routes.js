const express = require('express');
const router = express.Router();
const prisma = require('../config/prisma');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

// Get all products (public)
router.get('/', async(req, res, next) => {
    try {
        const products = await prisma.product.findMany();
        res.json({
            message: 'Products retrieved',
            products
        });
    } catch (err) {
        next(err);
    }
});

// Get single product (public)
router.get('/:id', async(req, res, next) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: req.params.id }
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({
            message: 'Product retrieved',
            product
        });
    } catch (err) {
        next(err);
    }
});

// Create product (ADMIN only)
router.post('/', authMiddleware, roleMiddleware('ADMIN'), async(req, res, next) => {
    try {
        const { name, price, description, stock } = req.body;

        // Validation
        if (!name || !price || !description || stock === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const product = await prisma.product.create({
            data: {
                name,
                price: parseFloat(price),
                description,
                stock: parseInt(stock)
            }
        });

        res.status(201).json({
            message: 'Product created successfully',
            product
        });
    } catch (err) {
        next(err);
    }
});

// Update product (ADMIN only)
router.put('/:id', authMiddleware, roleMiddleware('ADMIN'), async(req, res, next) => {
    try {
        const { name, price, description, stock } = req.body;

        const product = await prisma.product.update({
            where: { id: req.params.id },
            data: {
                ...(name && { name }),
                ...(price !== undefined && { price: parseFloat(price) }),
                ...(description && { description }),
                ...(stock !== undefined && { stock: parseInt(stock) })
            }
        });

        res.json({
            message: 'Product updated successfully',
            product
        });
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ message: 'Product not found' });
        }
        next(err);
    }
});

// Delete product (ADMIN only)
router.delete('/:id', authMiddleware, roleMiddleware('ADMIN'), async(req, res, next) => {
    try {
        await prisma.product.delete({
            where: { id: req.params.id }
        });

        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ message: 'Product not found' });
        }
        next(err);
    }
});

module.exports = router;