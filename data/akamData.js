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

export const MENU_CATEGORIES = [
  {
    id: 'small-chops',
    label: 'Small Chops Packs',
    image: '/images/hero-platter.jpg',
    captionTitle: 'Golden. Crisp. Crafted Fresh Daily.',
    captionText:
      'Hand-rolled spring rolls and samosas, airy golden puff-puff, caramelized plantain mosa, and peppered proteins — packed hot for gatherings and events across Nigeria.',
    items: [
      {
        name: 'Family Pack',
        tag: 'Most Popular',
        desc: 'Generous sharing platter built for family hangouts, office teams, and intimate celebrations.',
        contents: ['6 Spring Rolls', '6 Samosas', '10 Puff-Puff', '10 Mosa', '4 Peppered Beef', '2 Chicken', '1 Fizzy Drink'],
      },
      {
        name: 'Small Pack',
        tag: 'Daily Favorite',
        desc: 'Our signature balanced combo — crisp, savory, and sweet in every single bite.',
        contents: ['3 Spring Rolls', '3 Samosas', '6 Puff-Puff', '6 Mosa', '2 Peppered Beef', '1 Chicken', '1 Fizzy Drink'],
      },
      {
        name: 'Mini Pack',
        tag: 'Solo Treat',
        desc: 'The perfect midday treat or VIP event individual guest box, complete with cutlery & complimentary gum.',
        contents: ['1 Spring Roll', '1 Samosa', '2 Puff-Puff', '2 Mosa', '1 Chicken', '1 Fizzy Drink'],
      },
      {
        name: 'Bespoke Event Trays',
        tag: 'Custom Quote',
        desc: 'Tailored 50-to-1,000+ guest trays for weddings, corporate summits, birthdays, and galas nationwide.',
        contents: ['Custom Ratios', 'Live Warm Service', 'Branded Packaging', 'Dedicated Event Team'],
      },
    ],
  },
  {
    id: 'grills',
    label: 'Peppered Grills',
    image: '/images/grills-shawarma.jpg',
    captionTitle: 'Smoky, Spicy & Glazed to Perfection.',
    captionText:
      'Slow-marinated Nigerian peppered proteins tossed in our signature aromatic house pepper sauce — bold flavor with zero shortcuts.',
    items: [
      {
        name: 'Peppered Chicken',
        tag: 'Signature',
        desc: 'Succulent, deeply spiced grilled chicken glazed in rich smoky red pepper sauce with crisp onions.',
        contents: ['Event Platter Ready', 'Mild or Extra Spicy'],
      },
      {
        name: 'Peppered Beef Skewers',
        tag: 'Crowd Pleaser',
        desc: 'Tender bite-sized beef cuts seared and coated in caramelized peppered glaze.',
        contents: ['Cocktail Skewers', 'High-Volume Catering'],
      },
      {
        name: 'Peppered Gizzard',
        tag: 'Nigerian Classic',
        desc: 'Perfectly tenderized gizzard sautéed with sweet bell peppers, onions, and fiery house spices.',
        contents: ['Party Favorite', 'Tray or Box Service'],
      },
      {
        name: 'Peppered Sausage & Chicken Legs',
        tag: 'Add-On',
        desc: 'Juicy grilled sausages and spiced chicken drumsticks crafted to elevate any cocktail table.',
        contents: ['Great for Celebrations', 'Custom Mix'],
      },
    ],
  },
  {
    id: 'shawarma-pastries',
    label: 'Shawarma & Pastries',
    image: '/images/grills-shawarma.jpg',
    captionTitle: 'Unforgettable Shawarma & Oven-Fresh Bakes.',
    captionText:
      'Warm flaky pies, loaded creamy shawarma wraps, and crunchy jars of sweet chin-chin baked fresh every morning.',
    items: [
      {
        name: 'Signature Loaded Shawarma',
        tag: 'Top Rated',
        desc: 'Generously loaded with spiced grilled chicken/beef, creamy house dressing, crisp veggies, and sausage.',
        contents: ['Single or Double Sausage', 'Complimentary Gum & Cutlery'],
      },
      {
        name: 'Meat Pie, Chicken Pie & Beef Jacket',
        tag: 'Oven Fresh',
        desc: 'Buttery, flaky golden pastry shells stuffed with rich seasoned minced beef or tender chicken.',
        contents: ['Corporate Breakfasts', 'Conference Tea Breaks'],
      },
      {
        name: 'Sausage Roll, Club Sandwich & Cupcakes',
        tag: 'Bakery',
        desc: 'Soft bakes and gourmet layered sandwiches ideal for boardroom meetings and bridal showers.',
        contents: ['Individually Wrapped', 'Fresh Daily'],
      },
      {
        name: 'Crispy Chin Chin & Plantain Chips',
        tag: 'Jar & Pouch',
        desc: 'Sweet, ultra-crunchy artisanal chin-chin and golden plantain chips — perfect as event souvenirs nationwide.',
        contents: ['Branded Event Tubs', 'Nationwide Souvenir Orders'],
      },
    ],
  },
  {
    id: 'naturals',
    label: 'Akam Naturals',
    image: '/images/akam-naturals.jpg',
    captionTitle: 'Pure, Chilled & Naturally Refreshing.',
    captionText:
      'Our sister wellness line crafted with zero artificial preservatives — the ultimate cold pairing for hot small chops.',
    items: [
      {
        name: 'Spiced Zobo (35cl & 50cl)',
        tag: 'Chilled',
        desc: 'Slow-brewed hibiscus infused with natural pineapple, ginger, and aromatic cloves.',
        contents: ['Event Bottle Service', '100% Natural'],
      },
      {
        name: 'Creamy Tiger Nut Milk',
        tag: 'House Blend',
        desc: 'Velvety cold-pressed tiger nut milk subtly sweetened with dates and fresh coconut.',
        contents: ['No Refined Sugar', 'Served Ice Cold'],
      },
      {
        name: 'Greek Parfait & Fruit Salad',
        tag: 'Wellness',
        desc: 'Layered creamy yogurt, crunchy granola, and fresh seasonal tropical fruits.',
        contents: ['VIP Brunch Tables', 'Wellness Events'],
      },
      {
        name: 'Arabian Tea & Fresh Smoothies',
        tag: 'Specialty',
        desc: 'Aromatic spiced Arabian tea and vibrant blended fruit smoothies crafted to order.',
        contents: ['Custom Drink Station', 'Event Pairing'],
      },
    ],
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
