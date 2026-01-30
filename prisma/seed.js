const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create a demo admin user
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin User',
            password: await bcrypt.hash('admin123', 10),
            role: 'ADMIN'
        }
    });
    console.log('✅ Admin user:', admin);

    // Create a demo user
    const user = await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            email: 'user@example.com',
            name: 'Demo User',
            password: await bcrypt.hash('user123', 10),
            role: 'USER'
        }
    });
    console.log('✅ Demo user:', user);

    // Create products
    const products = [{
            name: 'Premium White Oversized T-Shirt',
            category: 'Tops',
            price: 45.00,
            description: 'Heavyweight 100% organic cotton oversized fit. The ultimate streetwear essential.',
            stock: 40,
            material: '100% Organic Cotton',
            dimensions: 'XS to XXL',
            careInstructions: 'Machine wash cold, tumble dry low',
            isRecommended: false
        },
        {
            name: 'Black Oversized Hoodie',
            category: 'Tops',
            price: 89.99,
            description: 'Premium black hoodie with embroidered logo. Perfect for layering.',
            stock: 35,
            material: '90% Cotton, 10% Polyester',
            dimensions: 'XS to XXL',
            careInstructions: 'Machine wash cold, hang dry',
            isRecommended: false
        },
        {
            name: 'Vintage Wash Graphic Tee',
            category: 'Tops',
            price: 55.00,
            description: 'Vintage wash graphic tee with distressed finish. Unique street style.',
            stock: 28,
            material: '100% Cotton',
            dimensions: 'XS to XXL',
            careInstructions: 'Machine wash cold, air dry',
            isRecommended: false
        },
        {
            name: 'Relaxed Fit Black Jeans',
            category: 'Bottoms',
            price: 85.00,
            description: 'Comfortable relaxed fit black denim with premium wash.',
            stock: 50,
            material: '99% Cotton, 1% Elastane',
            dimensions: '28-40 waist',
            careInstructions: 'Machine wash cold, air dry',
            isRecommended: false
        },
        {
            name: 'Cargo Pants - Black',
            category: 'Bottoms',
            price: 95.00,
            description: 'Functional cargo pants with multiple pockets. Perfect for the streets.',
            stock: 22,
            material: '100% Cotton Canvas',
            dimensions: '28-40 waist',
            careInstructions: 'Machine wash cold, tumble dry low',
            isRecommended: false
        },
        {
            name: 'Premium White Leather Sneakers',
            category: 'Footwear',
            price: 75.00,
            description: 'Clean white leather sneakers with minimal design. Timeless classic.',
            stock: 45,
            material: 'Premium Leather',
            dimensions: '5-13 US',
            careInstructions: 'Wipe with damp cloth, air dry',
            isRecommended: false
        },
        {
            name: 'Classic High-Top Canvas Sneakers',
            category: 'Footwear',
            price: 65.00,
            description: 'High-top canvas sneakers with rubber sole. Vintage streetwear style.',
            stock: 52,
            material: 'Cotton Canvas',
            dimensions: '5-13 US',
            careInstructions: 'Wipe clean, air dry completely',
            isRecommended: true
        },
        {
            name: 'Black Bomber Jacket',
            category: 'Outerwear',
            price: 145.00,
            description: 'Premium black bomber with satin lining. Statement piece.',
            stock: 18,
            material: 'Nylon Shell, Satin Lining',
            dimensions: 'XS to XL',
            careInstructions: 'Dry clean only',
            isRecommended: true
        },
        {
            name: 'Structured Cotton Snapback Cap',
            category: 'Accessories',
            price: 32.00,
            description: 'Classic structured snapback cap with adjustable strap.',
            stock: 80,
            material: '100% Cotton',
            dimensions: 'One size fits all',
            careInstructions: 'Hand wash, air dry',
            isRecommended: false
        },
        {
            name: 'Heavy Duty Canvas Crossbody Bag',
            category: 'Bags',
            price: 65.00,
            description: 'Durable canvas crossbody bag with adjustable strap. Perfect for daily use.',
            stock: 38,
            material: '100% Cotton Canvas',
            dimensions: '10" x 8" x 4"',
            careInstructions: 'Wipe with damp cloth, air dry',
            isRecommended: false
        },
        {
            name: 'Premium Genuine Leather Belt',
            category: 'Accessories',
            price: 52.00,
            description: 'Handcrafted genuine leather belt with metal buckle.',
            stock: 48,
            material: 'Genuine Leather',
            dimensions: '28-40 inches',
            careInstructions: 'Clean with leather conditioner',
            isRecommended: false
        },
        {
            name: 'Merino Wool Beanie',
            category: 'Accessories',
            price: 35.00,
            description: 'Soft merino wool beanie perfect for cold weather.',
            stock: 60,
            material: '100% Merino Wool',
            dimensions: 'One size fits all',
            careInstructions: 'Hand wash in cold water',
            isRecommended: true
        }
    ];

    for (const product of products) {
        // Check if product already exists
        const existing = await prisma.product.findFirst({
            where: { name: product.name }
        });

        if (!existing) {
            const created = await prisma.product.create({
                data: product
            });
            console.log(`✅ Product: ${created.name} - $${created.price}`);
        } else {
            console.log(`⏭️  Product exists: ${product.name}`);
        }
    }

    console.log('\n✨ Database seeded successfully!');
}

main()
    .then(async() => {
        await prisma.$disconnect();
    })
    .catch(async(e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });