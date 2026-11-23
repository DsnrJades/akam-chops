export const BRAND = {
  name: 'Akam Chops',
  tagline: 'The Taste You Deserve',
  handle: '@akamchopsabuja',
  tiktok: '@akamchops',
  instagramUrl: 'https://www.instagram.com/akamchopsabuja',
  address: 'Suite C203, Mab Global Plaza, opposite FCMB Bank, Jabi Upstairs, Abuja (Serving Events Nationwide)',
  phones: ['0907 227 8229', '0810 448 3435'],
  whatsappNumber: '2349072278229',
  email: 'Akamchopsabuja@gmail.com',
  // Paste your deployed Google Apps Script Web App URL here (see google-apps-script.gs)
  googleAppsScriptUrl: process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '',
};

export const NAV_LINKS = [
  { id: 'experience', label: 'Experience' },
  { id: 'menu', label: 'Menu' },
  { id: 'events', label: 'Events' },
  { id: 'contact', label: 'Contact' },
];

export const MENU_ITEMS = [
  {
    name: 'Family Small Chops Pack',
    categoryId: 'small-chops',
    tag: 'Most Popular',
    rating: '4.9',
    reviews: '340',
    summary: '6 Spring Rolls · 6 Samosas · 10 Puff-Puff · 10 Mosa · Beef & Chicken',
    image: '/images/hero-platter.jpg',
  },
  {
    name: 'Peppered Grilled Chicken',
    categoryId: 'grills',
    tag: 'Signature',
    rating: '4.9',
    reviews: '410',
    summary: 'Smoky grilled chicken glazed in our aromatic house pepper sauce',
    image: '/images/menu-peppered-chicken.jpg',
  },
  {
    name: 'Signature Loaded Shawarma',
    categoryId: 'shawarma-pastries',
    tag: 'Top Rated',
    rating: '4.9',
    reviews: '520',
    summary: 'Spiced chicken or beef, creamy dressing, crisp veggies & sausage',
    image: '/images/grills-shawarma.jpg',
  },
  {
    name: 'Golden Puff-Puff & Mosa',
    categoryId: 'small-chops',
    tag: 'Fresh Daily',
    rating: '4.8',
    reviews: '285',
    summary: 'Crisp outside, airy golden dough & sweet caramelized plantain mosa',
    image: '/images/menu-puff-puff.jpg',
  },
  {
    name: 'Flaky Meat Pie & Samosas',
    categoryId: 'shawarma-pastries',
    tag: 'Oven Fresh',
    rating: '4.8',
    reviews: '260',
    summary: 'Buttery half-moon meat pies paired with crispy hand-folded samosas',
    image: '/images/menu-meat-pie.jpg',
  },
  {
    name: 'Spiced Zobo & Tiger Nut',
    categoryId: 'naturals',
    tag: 'Akam Naturals',
    rating: '4.9',
    reviews: '310',
    summary: '100% natural chilled hibiscus Zobo & creamy cold-pressed Tiger Nut milk',
    image: '/images/menu-zobo-drinks.jpg',
  },
  {
    name: 'Bespoke Event Trays',
    categoryId: 'small-chops',
    tag: '50 – 1,000+ Guests',
    rating: '5.0',
    reviews: '190',
    summary: 'Custom luxury small chops & grill spreads for nationwide celebrations',
    image: '/images/event-catering.jpg',
  },
  {
    name: 'Greek Parfait & Fruit Salad',
    categoryId: 'naturals',
    tag: 'Wellness',
    rating: '4.8',
    reviews: '215',
    summary: 'Layered creamy yogurt, crunchy granola & fresh tropical fruits',
    image: '/images/akam-naturals.jpg',
  },
];

export const EVENT_TIERS = [
  {
    name: 'Intimate Gatherings',
    guests: '30 – 80 Guests',
    desc: 'Ideal for birthdays, bridal showers, housewarmings, and private family dinners.',
    featured: false,
    perks: [
      'Curated Small Chops & Peppered Grills',
      'Signature Akam kraft boxes or serving platters',
      'Optional Akam Naturals Zobo & Tiger Nut pairing',
      'Prompt, warm doorstep delivery & setup',
    ],
  },
  {
    name: 'Corporate & Brand Events',
    guests: '80 – 250 Guests',
    desc: 'Designed for conferences, brand launches, executive summits, and pageants across Nigeria.',
    featured: true,
    perks: [
      'Individual VIP guest boxes with cutlery & mint gum',
      'Shawarma, Meat Pies, Small Chops & Parfait options',
      'On-time scheduled drop-off or staffed refreshment table',
      'Clean invoicing & dedicated event coordinator',
    ],
  },
  {
    name: 'Grand Weddings & Galas',
    guests: '250 – 1,000+ Guests',
    desc: 'Full-scale nationwide luxury cocktail hour & small chops service that keeps every table buzzing.',
    featured: false,
    perks: [
      'High-volume freshly fried small chops & peppered skewers',
      'Uniformed Akam Chops servers & tiered buffet styling',
      'Custom tasting session prior to your wedding day',
      'Dedicated Akam Naturals chilled drinks bar',
    ],
  },
];

export const REVIEWS = [
  {
    quote:
      'The complimentary gum that comes together with the cutlery — such a thoughtful touch. You make the best shawarma I have ever tasted so far.',
    author: '@__sham.ceeyarht',
    context: 'Verified Instagram Customer',
  },
  {
    quote:
      'Lit packaging and genuinely the crispiest samosas and puff-puff. Every box arrived piping hot and camera-ready for our weekend gala.',
    author: 'Queen of Queens Event Team',
    context: 'Pageant & VIP Hospitality',
  },
  {
    quote:
      'From the peppered gizzard to the chilled Akam Naturals tiger nut milk, our conference guests kept asking who catered the entire spread.',
    author: 'Corporate Events Partner',
    context: 'Nationwide Executive Summit',
  },
];
