import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const defaultAdminEmail = process.env.ADMIN_EMAIL || 'admin@sanwaliya.local';
  const defaultAdminPassword = process.env.ADMIN_PASSWORD || 'SanwaliyaAdmin!2026';

  const passwordHash = await bcrypt.hash(defaultAdminPassword, 12);

  await prisma.user.upsert({
    where: { email: defaultAdminEmail },
    update: {
      fullname: 'System Administrator',
      mobile: '+919999999999',
      passwordHash,
      role: 'ADMIN',
    },
    create: {
      fullname: 'System Administrator',
      mobile: '+919999999999',
      email: defaultAdminEmail,
      passwordHash,
      role: 'ADMIN',
    },
  });

  const categories = [
    { name: 'General Medicines', slug: 'general-medicines', description: 'Everyday health essentials.' },
    { name: 'Prescription Medicines', slug: 'prescription-medicines', description: 'Doctor-guided treatments.' },
    { name: 'OTC Products', slug: 'otc-products', description: 'Over-the-counter healthcare products.' },
    { name: 'Vitamins and Supplements', slug: 'vitamins-and-supplements', description: 'Daily wellness support.' },
    { name: 'Personal Care', slug: 'personal-care', description: 'Personal hygiene products.' },
    { name: 'First Aid', slug: 'first-aid', description: 'Emergency care essentials.' },
    { name: 'Healthcare Devices', slug: 'healthcare-devices', description: 'Monitoring and care devices.' },
    { name: 'Baby Care', slug: 'baby-care', description: 'Safe baby care items.' },
    { name: 'Wellness Products', slug: 'wellness-products', description: 'Everyday wellness support.' },
  ];

  for (const [index, category] of categories.entries()) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name, description: category.description, sortOrder: index },
      create: { ...category, sortOrder: index },
    });
  }

  const faqEntries = [
    {
      question: 'Where is Sanwaliya Medical Store located?',
      answer: 'Sanwaliya Medical Store is located at Mangalwar Chauraha.',
      sortOrder: 1,
    },
    {
      question: 'What are the store\'s opening hours?',
      answer: 'The store is open from 8:00 AM to 9:30 PM.',
      sortOrder: 2,
    },
    {
      question: 'How can I contact the store on WhatsApp?',
      answer: 'You can reach the store on +91 6375108795 using the WhatsApp button on the website.',
      sortOrder: 3,
    },
    {
      question: 'How can I check whether a medicine is available?',
      answer: 'You can browse the catalogue, review item availability, or enquire directly through WhatsApp for stock confirmation.',
      sortOrder: 4,
    },
    {
      question: 'Can I enquire about a product online?',
      answer: 'Yes, each catalogue item includes an enquiry option that opens a WhatsApp message for the store team.',
      sortOrder: 5,
    },
    {
      question: 'How do I submit a prescription for review?',
      answer: 'Use the prescription assistance page, upload the prescription file, and submit your details for review.',
      sortOrder: 6,
    },
    {
      question: 'Can I request prescription-only medicines without a prescription?',
      answer: 'Prescription-only medicines require a valid prescription and must be handled in line with applicable legal requirements.',
      sortOrder: 7,
    },
    {
      question: 'How can I check product prices?',
      answer: 'Product prices are shown in the catalogue where they have been configured by the authorised administrator.',
      sortOrder: 8,
    },
    {
      question: 'How do I find the store on Google Maps?',
      answer: 'Use the Google Maps / Business Profile link on the website or the location button in the navigation.',
      sortOrder: 9,
    },
    {
      question: 'How can I leave a Google Review?',
      answer: 'Visit the Google Reviews section and use the View Google Reviews or Write a Review link to open the business profile.',
      sortOrder: 10,
    },
  ];

  for (const item of faqEntries) {
    await prisma.fAQ.upsert({
      where: {
        id: (await prisma.fAQ.findFirst({ where: { question: item.question } }))?.id ?? 'seed-fallback',
      },
      update: { answer: item.answer, sortOrder: item.sortOrder },
      create: { question: item.question, answer: item.answer, sortOrder: item.sortOrder },
    });
  }

  await prisma.siteSettings.upsert({
    where: { id: 'site-settings' },
    update: {},
    create: {
      id: 'site-settings',
      businessName: 'Sanwaliya Medical Store',
      proprietor: 'Dr. Hari Om Jat',
      licenceNumber: '153414-153415',
      whatsappNumber: '+91 6375108795',
      whatsappLink: 'https://wa.me/916375108795',
      email: 'sanwaliyamedicalstore@gmail.com',
      instagram: '@sanwaliyamedicalstore',
      locationText: 'Mangalwar Chauraha',
      mapsLink: 'https://maps.app.goo.gl/LaQBNXq8McPWfcft7',
      openingHours: '8:00 AM – 9:30 PM',
      homeHeadline: 'Your Health, Our Priority.',
      homeSubtitle: 'Your trusted neighbourhood pharmacy for everyday healthcare essentials, personal care products, and friendly service.',
      heroImage: '/images/hero-pharmacy.svg',
    },
  });

  const products = [
    {
      name: 'Daily Vitality Tablets',
      genericName: 'Multivitamin blend',
      manufacturer: 'Verified supplier stock',
      category: 'Vitamins and Supplements',
      strength: '500 mg',
      dosageForm: 'Tablet',
      packSize: '30 tablets',
      description: 'A general wellness supplement to support a daily routine.',
      prescriptionRequired: false,
      available: true,
      price: 299,
      image: '/images/vitamin-bottle.svg',
      published: true,
    },
    {
      name: 'Relief Care Syrup',
      genericName: 'Cough and cold support',
      manufacturer: 'Verified supplier stock',
      category: 'General Medicines',
      strength: '120 ml',
      dosageForm: 'Syrup',
      packSize: '1 bottle',
      description: 'Everyday support for common cold symptoms.',
      prescriptionRequired: false,
      available: true,
      price: 180,
      image: '/images/medicine-bottle.svg',
      published: true,
    },
    {
      name: 'QuickShield First Aid Kit',
      genericName: 'Emergency care pack',
      manufacturer: 'Verified supplier stock',
      category: 'First Aid',
      strength: 'Essential kit',
      dosageForm: 'Kit',
      packSize: '1 pack',
      description: 'Compact first aid essentials for everyday use.',
      prescriptionRequired: false,
      available: true,
      price: 420,
      image: '/images/first-aid-kit.svg',
      published: true,
    },
    {
      name: 'GentleCare Hand Wash',
      genericName: 'Foaming hand cleanser',
      manufacturer: 'Verified supplier stock',
      category: 'Personal Care',
      strength: '200 ml',
      dosageForm: 'Liquid',
      packSize: '1 bottle',
      description: 'Everyday hand hygiene support and freshness.',
      prescriptionRequired: false,
      available: true,
      price: 150,
      image: '/images/personal-care.svg',
      published: true,
    },
    {
      name: 'ThermoSense Digital Thermometer',
      genericName: 'Digital temperature monitor',
      manufacturer: 'Verified supplier stock',
      category: 'Healthcare Devices',
      strength: 'Digital',
      dosageForm: 'Device',
      packSize: '1 unit',
      description: 'A simple digital thermometer for routine use.',
      prescriptionRequired: false,
      available: true,
      price: 320,
      image: '/images/thermometer.svg',
      published: true,
    },
    {
      name: 'BabySoft Care Wipes',
      genericName: 'Baby hygiene wipes',
      manufacturer: 'Verified supplier stock',
      category: 'Baby Care',
      strength: 'Gentle formula',
      dosageForm: 'Wipe',
      packSize: '80 wipes',
      description: 'Gentle and practical wipes for everyday child care.',
      prescriptionRequired: false,
      available: true,
      price: 220,
      image: '/images/baby-care.svg',
      published: true,
    },
  ];

  for (const product of products) {
    const category = await prisma.category.findFirst({ where: { name: product.category } });
    if (!category) continue;

    await prisma.product.upsert({
      where: { id: `${product.name}-seed` },
      update: {},
      create: {
        id: `${product.name}-seed`,
        name: product.name,
        genericName: product.genericName,
        manufacturer: product.manufacturer,
        categoryId: category.id,
        strength: product.strength,
        dosageForm: product.dosageForm,
        packSize: product.packSize,
        description: product.description,
        prescriptionRequired: product.prescriptionRequired,
        available: product.available,
        price: product.price,
        image: product.image,
        published: product.published,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
