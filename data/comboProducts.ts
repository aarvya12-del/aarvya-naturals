type ComboItem = {
  slug: string;
  quantity: string;
};

export type ComboProduct = {
  id: number;
  category: string;
  slug: string;
  name: string;
  image: string;
  badge: string;
  featured: boolean;
  price: number;
  tagline: string;
  shortDescription: string;
  description: string;
  products: ComboItem[];
  freeProducts: ComboItem[];
  benefits: string[];
  highlights: string[];
  recommendedFor: string[];
};

export const comboProducts: ComboProduct[] = [

  {
    id: 1,
    category: "Snack Combos",
    slug: "healthy-snacking-combo",
    name: "Healthy Snacking Combo",
    image: "/images/combos/healthy-snacking-combo.png",
    badge: "Best Value",
    featured: true,
    price: 400,

    tagline: "4 Premium Products. One Great Choice.",

    shortDescription:
      "A wholesome everyday combo featuring premium dry fruits with FREE Flax Seeds.",

    description:
      "An affordable everyday nutrition combo containing premium almonds, cashews and pistachios along with complimentary flax seeds. Perfect for healthy snacking and daily wellness.",

    products: [
      {
        slug: "cashew-w320",
        quantity: "100g",
      },
      {
        slug: "premium-almonds",
        quantity: "100g",
      },
      {
        slug: "pistachios",
        quantity: "100g",
      },
    ],

    freeProducts: [
      {
        slug: "flax-seeds",
        quantity: "100g",
      },
    ],

    benefits: [
      "Complete Nutrition",
      "Rich in Protein",
      "Healthy Fats",
      "Daily Wellness",
    ],

    highlights: [
      "100% Natural",
      "Premium Quality",
      "FREE Flax Seeds",
      "No Preservatives",
    ],

    recommendedFor: [
      "Everyone",
      "Families",
      "Students",
      "Working Professionals",
    ],
  },

  {
    id: 2,
    category: "Wellness Combos",
    slug: "heart-care-combo",
    name: "Heart Care Combo",
    image: "/images/combos/heart-care-combo.png",
    badge: "Heart Healthy",
    featured: true,
    price: 449,

    tagline: "Nourish Your Heart. Every Day.",

    shortDescription:
      "A heart-friendly combo packed with Omega-3 rich nuts and seeds.",

    description:
      "A specially curated combination of walnuts, almonds and nutrient-rich seeds that supports cardiovascular wellness naturally.",

    products: [
      {
        slug: "walnuts",
        quantity: "100g",
      },
      {
        slug: "flax-seeds",
        quantity: "100g",
      },
      {
        slug: "watermelon-seeds",
        quantity: "100g",
      },
      {
        slug: "premium-almonds",
        quantity: "100g",
      },
    ],

    freeProducts: [
      {
        slug: "sunflower-seeds",
        quantity: "100g",
      },
    ],

    benefits: [
      "Supports Heart Health",
      "Rich in Omega-3",
      "High Fibre",
      "Natural Nutrition",
    ],

    highlights: [
      "100% Natural",
      "Premium Quality",
      "FREE Sunflower Seeds",
      "Freshly Packed",
    ],

    recommendedFor: [
      "Adults",
      "Senior Citizens",
      "Heart Conscious Individuals",
    ],
  },

  {
    id: 3,
    category: "Wellness Combos",
    slug: "fitness-combo",
    name: "Fitness Combo",
    image: "/images/combos/fitness-combo.png",
    badge: "Fitness",
    featured: true,
    price: 429,

    tagline: "Stay Fit. Stay Strong.",

    shortDescription:
      "Protein-rich combo designed for active lifestyles with FREE Chia Seeds.",

    description:
      "A carefully selected combination of premium nuts and seeds to support fitness, muscle recovery and daily nutrition.",

    products: [
      {
        slug: "walnuts",
        quantity: "100g",
      },
      {
        slug: "premium-almonds",
        quantity: "100g",
      },
      {
        slug: "pumpkin-seeds",
        quantity: "100g",
      },
    ],

    freeProducts: [
      {
        slug: "chia-seeds",
        quantity: "100g",
      },
    ],

    benefits: [
      "High Protein",
      "Natural Energy",
      "Supports Muscle Recovery",
      "Healthy Lifestyle",
    ],

    highlights: [
      "Premium Quality",
      "100% Natural",
      "FREE Chia Seeds",
      "No Preservatives",
    ],

    recommendedFor: [
      "Gym Enthusiasts",
      "Fitness Lovers",
      "Working Professionals",
    ],
  },
    {
    id: 4,
    category: "Wellness Combos",
    slug: "women-wellness-combo",
    name: "Women Wellness Combo",
    image: "/images/combos/women-wellness-combo.png",
    badge: "Healthy Choice",
    featured: true,
    price: 349,

    tagline: "Nourish Her. Empower Her. Every Day.",

    shortDescription:
      "A thoughtfully curated combination of dry fruits and seeds for women's daily nutrition.",

    description:
      "A wholesome blend of Black Raisins, Premium Figs, Flax Seeds and Pumpkin Seeds with complimentary Chia Seeds to support women's wellness naturally.",

    products: [
      {
        slug: "black-raisins",
        quantity: "100g",
      },
      {
        slug: "premium-figs",
        quantity: "100g",
      },
      {
        slug: "flax-seeds",
        quantity: "100g",
      },
      {
        slug: "pumpkin-seeds",
        quantity: "100g",
      },
    ],

    freeProducts: [
      {
        slug: "chia-seeds",
        quantity: "100g",
      },
    ],

    benefits: [
      "Supports Women's Wellness",
      "Rich in Fibre",
      "Rich in Antioxidants",
      "Natural Energy",
    ],

    highlights: [
      "Premium Quality",
      "100% Natural",
      "FREE Chia Seeds",
      "Freshly Packed",
    ],

    recommendedFor: [
      "Women",
      "Working Professionals",
      "Healthy Lifestyle",
    ],
  },

  {
    id: 5,
    category: "Wellness Combos",
    slug: "brain-boost-combo",
    name: "Brain Boost Combo",
    image: "/images/combos/brain-boost-combo.png",
    badge: "Best Seller",
    featured: true,
    price: 529,

    tagline: "Fuel Your Brain. Nourish Your Life.",

    shortDescription:
      "Premium dry fruits selected to support focus, memory and overall brain wellness.",

    description:
      "A premium combination of almonds, walnuts and figs with complimentary pumpkin seeds. Perfect for students, professionals and anyone looking for daily brain nutrition.",

    products: [
      {
        slug: "premium-almonds",
        quantity: "100g",
      },
      {
        slug: "walnuts",
        quantity: "100g",
      },
      {
        slug: "premium-figs",
        quantity: "100g",
      },
    ],

    freeProducts: [
      {
        slug: "pumpkin-seeds",
        quantity: "100g",
      },
    ],

    benefits: [
      "Supports Brain Function",
      "Natural Energy",
      "Rich in Healthy Fats",
      "Supports Immunity",
    ],

    highlights: [
      "100% Natural",
      "Premium Quality",
      "FREE Pumpkin Seeds",
      "No Preservatives",
    ],

    recommendedFor: [
      "Students",
      "Working Professionals",
      "Senior Citizens",
    ],
  },

  {
    id: 6,
    category: "Snack Combos",
    slug: "spicy-munch-combo",
    name: "Spicy Munch Combo",
    image: "/images/combos/spicy-munch-combo.png",
    badge: "Best Seller",
    featured: false,
    price: 419,

    tagline: "Crunchy. Spicy. Irresistible.",

    shortDescription:
      "A spicy snack combo featuring flavoured nuts with complimentary Sunflower Seeds.",

    description:
      "Pepper Cashew, Chilli Cashew and Roasted & Salted Almonds paired with FREE Sunflower Seeds. Perfect for tea-time, travel and evening snacks.",

    products: [
      {
        slug: "pepper-cashew",
        quantity: "100g",
      },
      {
        slug: "chilli-cashew",
        quantity: "100g",
      },
      {
        slug: "roasted-salted-almonds",
        quantity: "100g",
      },
    ],

    freeProducts: [
      {
        slug: "sunflower-seeds",
        quantity: "100g",
      },
    ],

    benefits: [
      "Rich in Protein",
      "Crunchy & Tasty",
      "Healthy Snack",
      "Energy Booster",
    ],

    highlights: [
      "Premium Quality",
      "100% Natural",
      "FREE Sunflower Seeds",
      "Perfect Evening Snack",
    ],

    recommendedFor: [
      "Tea Time",
      "Office Snacks",
      "Travel",
      "Movie Nights",
    ],
  },
    {
    id: 7,
    category: "Premium Collections",
    slug: "dry-fruits-mega-combo",
    name: "Dry Fruits Mega Combo",
    image: "/images/combos/dry-fruits-mega-combo.png",
    badge: "Best Value",
    featured: true,
    price: 929,

    tagline: "8 in 1 Wholesome Goodness.",

    shortDescription:
      "A premium assortment of eight carefully selected dry fruits for healthy everyday snacking.",

    description:
      "A wholesome collection of premium dry fruits rich in protein, fibre, vitamins and healthy fats. Ideal for families and everyday nutrition.",

    products: [
      {
        slug: "walnuts",
        quantity: "100g",
      },
      {
        slug: "premium-figs",
        quantity: "100g",
      },
      {
        slug: "premium-almonds",
        quantity: "100g",
      },
      {
        slug: "pistachios",
        quantity: "100g",
      },
      {
        slug: "cashew-w320",
        quantity: "100g",
      },
      {
        slug: "black-raisins",
        quantity: "100g",
      },
      {
        slug: "black-dates",
        quantity: "100g",
      },
      {
        slug: "yellow-raisins",
        quantity: "100g",
      },
    ],

    freeProducts: [],

    benefits: [
      "Natural Energy",
      "Rich in Fibre",
      "Healthy Fats",
      "Everyday Nutrition",
    ],

    highlights: [
      "8 Premium Dry Fruits",
      "100% Natural",
      "Premium Quality",
      "No Preservatives",
    ],

    recommendedFor: [
      "Families",
      "Working Professionals",
      "Students",
      "Senior Citizens",
    ],
  },

  {
    id: 8,
    category: "Gift Collections",
    slug: "premium-snacks-box",
    name: "Premium Snacks Box",
    image: "/images/combos/premium-snacks-box.png",
    badge: "Premium",
    featured: true,
    price: 525,

    tagline: "The Perfect Blend of Crunchy, Salty & Sweet.",

    shortDescription:
      "A premium snack assortment featuring roasted nuts and complimentary black raisins.",

    description:
      "A delicious combination of roasted almonds, roasted cashews and salted pistachios with FREE Black Raisins. Great for gifting and healthy snacking.",

    products: [
      {
        slug: "roasted-salted-almonds",
        quantity: "100g",
      },
      {
        slug: "roasted-salted-cashews",
        quantity: "100g",
      },
      {
        slug: "pistachios",
        quantity: "100g",
      },
    ],

    freeProducts: [
      {
        slug: "black-raisins",
        quantity: "100g",
      },
    ],

    benefits: [
      "Healthy Snacking",
      "Rich in Protein",
      "Crunchy & Delicious",
      "Perfect for Sharing",
    ],

    highlights: [
      "Premium Quality",
      "FREE Black Raisins",
      "Freshly Packed",
      "Perfect Gift",
    ],

    recommendedFor: [
      "Office Snacks",
      "Tea Time",
      "Family Gatherings",
      "Gifting",
    ],
  },

  {
    id: 9,
    category: "Gift Collections",
    slug: "family-wellness-box",
    name: "Family Wellness Box",
    image: "/images/combos/family-wellness-box.png",
    badge: "Family Favourite",
    featured: true,
    price: 699,

    tagline: "A Complete Wellness Pack for the Entire Family.",

    shortDescription:
      "Premium dry fruits with complimentary Nuts in Honey for everyday family nutrition.",

    description:
      "A family-friendly wellness collection containing premium dry fruits with FREE Nuts in Honey. A thoughtful gift and an excellent daily nutrition pack.",

    products: [
      {
        slug: "premium-almonds",
        quantity: "100g",
      },
      {
        slug: "cashew-w320",
        quantity: "100g",
      },
      {
  slug: "salted-pistachios",
  quantity: "100g",
},
      {
        slug: "premium-figs",
        quantity: "100g",
      },
    ],

    freeProducts: [
      {
        slug: "nuts-in-honey",
        quantity: "250g",
      },
    ],

    benefits: [
      "Daily Family Nutrition",
      "Healthy Fats",
      "Rich in Protein",
      "Perfect Healthy Snack",
    ],

    highlights: [
      "Premium Quality",
      "FREE Nuts in Honey",
      "Freshly Packed",
      "Ideal Gift",
    ],

    recommendedFor: [
      "Families",
      "Festivals",
      "Birthdays",
      "Housewarming",
    ],
  },
    {
    id: 10,
    category: "Gift Collections",
    slug: "royal-wellness-hamper",
    name: "Royal Wellness Hamper",
    image: "/images/combos/royal-wellness-hamper.png",
    badge: "Premium Gift",
    featured: true,
    price: 799,

    tagline: "Nature's Finest. Bottled With Care.",

    shortDescription:
      "A luxurious wellness hamper featuring honey delicacies with FREE Dry Amla.",

    description:
      "A premium gift hamper featuring Honey Fig, Honey Amla and Nuts in Honey with complimentary Dry Amla. A perfect choice for festivals and gifting.",

    products: [
      {
        slug: "honey-figs",
        quantity: "600g",
      },
      {
        slug: "honey-amla",
        quantity: "500g",
      },
      {
        slug: "nuts-in-honey",
        quantity: "500g",
      },
    ],

    freeProducts: [
      {
        slug: "dry-amla",
        quantity: "100g",
      },
    ],

    benefits: [
      "Rich in Antioxidants",
      "Boosts Immunity",
      "Natural Energy",
      "Perfect Family Wellness",
    ],

    highlights: [
      "Premium Gift Hamper",
      "FREE Dry Amla",
      "100% Natural",
      "Premium Quality",
    ],

    recommendedFor: [
      "Festivals",
      "Corporate Gifts",
      "Birthdays",
      "Family Wellness",
    ],
  },

  {
    id: 11,
    category: "Premium Collections",
    slug: "complete-wellness-combo",
    name: "Complete Wellness Combo",
    image: "/images/combos/complete-wellness-combo.png",
    badge: "Premium Collection",
    featured: true,
    price: 1449,

    tagline: "15 Premium Natural Goodness.",

    shortDescription:
      "Our most comprehensive wellness collection featuring premium dry fruits, seeds and healthy treats.",

    description:
      "The ultimate Aarvya Naturals collection with premium dry fruits, healthy seeds, dry amla and Nuts in Honey for complete family wellness.",

    products: [
      { slug: "premium-almonds", quantity: "100g" },
      { slug: "cashew-w320", quantity: "100g" },
      { slug: "pistachios", quantity: "100g" },
      { slug: "walnuts", quantity: "100g" },
      { slug: "black-raisins", quantity: "100g" },
      { slug: "yellow-raisins", quantity: "100g" },
      { slug: "premium-figs", quantity: "100g" },
      { slug: "pumpkin-seeds", quantity: "100g" },
      { slug: "sunflower-seeds", quantity: "100g" },
      { slug: "watermelon-seeds", quantity: "100g" },
      { slug: "flax-seeds", quantity: "100g" },
      { slug: "chia-seeds", quantity: "100g" },
      { slug: "sabja-seeds", quantity: "100g" },
      { slug: "dry-amla", quantity: "100g" },
      { slug: "nuts-in-honey", quantity: "250g" },
    ],

    freeProducts: [],

    benefits: [
      "Complete Daily Nutrition",
      "Rich in Protein",
      "Supports Immunity",
      "Healthy Lifestyle",
    ],

    highlights: [
      "15 Premium Products",
      "100% Natural",
      "Freshly Packed",
      "Perfect Family Combo",
    ],

    recommendedFor: [
      "Entire Family",
      "Corporate Gifting",
      "Festive Gifting",
      "Daily Wellness",
    ],
  },

  {
    id: 12,
    category: "Healthy Mixes",
    slug: "7-seeds-combo",
    name: "7 Seeds Combo",
    image: "/images/combos/7-seeds-combo.png",
    badge: "Best Value",
    featured: true,
    price: 350,

    tagline: "7 Super Seeds. 1 Healthy You.",

    shortDescription:
      "Seven premium super seeds packed together for everyday wellness.",

    description:
      "A complete collection of seven carefully selected super seeds rich in fibre, healthy fats and plant protein.",

    products: [
      { slug: "flax-seeds", quantity: "100g" },
      { slug: "pumpkin-seeds", quantity: "100g" },
      { slug: "watermelon-seeds", quantity: "100g" },
      { slug: "sunflower-seeds", quantity: "100g" },
      { slug: "mini-cucumber-seeds", quantity: "100g" },
      { slug: "sabja-seeds", quantity: "100g" },
      { slug: "chia-seeds", quantity: "100g" },
    ],

    freeProducts: [],

    benefits: [
      "Rich in Fibre",
      "High Plant Protein",
      "Supports Immunity",
      "Everyday Wellness",
    ],

    highlights: [
      "700g Total Pack",
      "100% Natural",
      "Premium Quality",
      "7 Premium Seeds",
    ],

    recommendedFor: [
      "Families",
      "Fitness Enthusiasts",
      "Health Conscious Individuals",
    ],
  },
  ];