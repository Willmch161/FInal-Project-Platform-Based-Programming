const express = require('express');
const router = express.Router();
const prisma = require('../config/prisma');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup multer for file uploads
const uploadDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    }
});

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
router.post('/', authMiddleware, roleMiddleware('ADMIN'), upload.single('image'), async(req, res, next) => {
    try {
        const { name, category, price, description, stock, material, dimensions, careInstructions, isRecommended } = req.body;

        // Validation
        if (!name || !category || !price || !description || stock === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        const product = await prisma.product.create({
            data: {
                name,
                category,
                price: parseFloat(price),
                description,
                stock: parseInt(stock),
                material: material || null,
                dimensions: dimensions || null,
                careInstructions: careInstructions || null,
                image: imagePath,
                isRecommended: isRecommended === 'true' || isRecommended === true
            }
        });

        res.status(201).json({
            message: 'Product created successfully',
            product
        });
    } catch (err) {
        // Delete uploaded file if product creation fails
        if (req.file) {
            fs.unlink(req.file.path, (unlinkErr) => {
                if (unlinkErr) console.error('Failed to delete file:', unlinkErr);
            });
        }
        next(err);
    }
});

// Update product (ADMIN only)
router.put('/:id', authMiddleware, roleMiddleware('ADMIN'), upload.single('image'), async(req, res, next) => {
    try {
        const { name, category, price, description, stock, material, dimensions, careInstructions, isRecommended } = req.body;

        // Get existing product to check if image needs to be deleted
        const existingProduct = await prisma.product.findUnique({
            where: { id: req.params.id }
        });

        if (!existingProduct) {
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) console.error('Failed to delete file:', err);
                });
            }
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete old image if new image is uploaded
        if (req.file && existingProduct.image) {
            const oldImagePath = path.join(__dirname, '../../public', existingProduct.image);
            fs.unlink(oldImagePath, (err) => {
                if (err) console.error('Failed to delete old image:', err);
            });
        }

        const imagePath = req.file ? `/uploads/${req.file.filename}` : existingProduct.image;

        const product = await prisma.product.update({
            where: { id: req.params.id },
            data: {
                ...(name && { name }),
                ...(category && { category }),
                ...(price !== undefined && { price: parseFloat(price) }),
                ...(description && { description }),
                ...(stock !== undefined && { stock: parseInt(stock) }),
                ...(material !== undefined && { material: material || null }),
                ...(dimensions !== undefined && { dimensions: dimensions || null }),
                ...(careInstructions !== undefined && { careInstructions: careInstructions || null }),
                ...(imagePath && { image: imagePath }),
                ...(isRecommended !== undefined && { isRecommended: isRecommended === 'true' || isRecommended === true })
            }
        });

        res.json({
            message: 'Product updated successfully',
            product
        });
    } catch (err) {
        if (req.file) {
            fs.unlink(req.file.path, (unlinkErr) => {
                if (unlinkErr) console.error('Failed to delete file:', unlinkErr);
            });
        }
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