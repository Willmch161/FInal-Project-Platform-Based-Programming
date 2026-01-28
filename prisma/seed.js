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
            name: 'Wireless Headphones',
            price: 79.99,
            description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
            stock: 50
        },
        {
            name: 'USB-C Cable',
            price: 14.99,
            description: 'Fast charging USB-C cable, 2 meters long',
            stock: 200
        },
        {
            name: 'Phone Stand',
            price: 24.99,
            description: 'Adjustable aluminum phone stand for desk',
            stock: 75
        },
        {
            name: 'Portable Charger',
            price: 49.99,
            description: '20000mAh portable power bank with fast charging',
            stock: 100
        },
        {
            name: 'Laptop Stand',
            price: 39.99,
            description: 'Ergonomic laptop stand for better posture',
            stock: 60
        },
        {
            name: 'Screen Protector',
            price: 9.99,
            description: 'Tempered glass screen protector - 2 pack',
            stock: 300
        },
        {
            name: 'Mechanical Keyboard',
            price: 129.99,
            description: 'RGB mechanical keyboard with custom switches',
            stock: 40
        },
        {
            name: 'Wireless Mouse',
            price: 34.99,
            description: 'Ergonomic wireless mouse with precision tracking',
            stock: 85
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
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });