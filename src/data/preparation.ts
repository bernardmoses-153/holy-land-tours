// Cultural tips, packing list, phrases, health info, currency

export interface PackingItem {
  item: string;
  category: "essentials" | "clothing" | "tech" | "health" | "comfort";
  checked: boolean;
  tip?: string;
}

export const packingList: PackingItem[] = [
  // Essentials
  { item: "Passport (valid 6+ months)", category: "essentials", checked: false, tip: "Keep a digital copy on your phone" },
  { item: "Travel insurance documents", category: "essentials", checked: false },
  { item: "Flight confirmation printout", category: "essentials", checked: false },
  { item: "Copies of prescriptions", category: "essentials", checked: false },
  { item: "International adapter (Type H)", category: "essentials", checked: false, tip: "Israel uses 230V, Type H plugs" },

  // Clothing
  { item: "Modest clothing for holy sites", category: "clothing", checked: false, tip: "Shoulders and knees covered" },
  { item: "Comfortable walking shoes", category: "clothing", checked: false, tip: "You'll walk 10-15km per day" },
  { item: "Sun hat and sunglasses", category: "clothing", checked: false },
  { item: "Light rain jacket", category: "clothing", checked: false, tip: "April can have surprise showers" },
  { item: "Swimsuit for Dead Sea", category: "clothing", checked: false },
  { item: "Layers for cool evenings", category: "clothing", checked: false },

  // Tech
  { item: "Phone charger & power bank", category: "tech", checked: false },
  { item: "Camera with extra memory", category: "tech", checked: false },
  { item: "Downloaded offline maps", category: "tech", checked: false, tip: "Google Maps works great offline" },
  { item: "International data plan or SIM", category: "tech", checked: false },

  // Health
  { item: "Sunscreen SPF 50+", category: "health", checked: false, tip: "UV is strong, especially at Dead Sea" },
  { item: "Personal medications", category: "health", checked: false },
  { item: "Hand sanitizer", category: "health", checked: false },
  { item: "Reusable water bottle", category: "health", checked: false, tip: "Tap water is safe to drink in Israel" },
  { item: "Basic first aid kit", category: "health", checked: false },

  // Comfort
  { item: "Neck pillow for flights", category: "comfort", checked: false },
  { item: "Journal and pen", category: "comfort", checked: false, tip: "Great for recording daily reflections" },
  { item: "Snacks for travel days", category: "comfort", checked: false },
  { item: "Small daypack", category: "comfort", checked: false },
];

export interface CulturalTip {
  title: string;
  description: string;
  icon: string; // lucide icon name
}

export const culturalTips: CulturalTip[] = [
  {
    title: "Dress Modestly at Holy Sites",
    description: "Cover shoulders and knees when visiting religious sites. Some places provide coverings, but it's best to come prepared. This applies to the Western Wall, churches, and mosques.",
    icon: "shirt",
  },
  {
    title: "Shabbat (Friday Sunset to Saturday Sunset)",
    description: "Most businesses close and public transport stops during Shabbat. Plan accordingly — stock up on essentials before Friday afternoon. Hotels and some restaurants in tourist areas remain open.",
    icon: "clock",
  },
  {
    title: "Tipping Culture",
    description: "10-15% tip is customary at restaurants. Tour guides and bus drivers appreciate tips — $5-10 USD per person per day for guides is standard. Round up taxi fares.",
    icon: "coins",
  },
  {
    title: "Photography Etiquette",
    description: "Always ask before photographing people, especially at religious sites and in traditional communities. Some sites prohibit flash photography. Be respectful of worshippers.",
    icon: "camera",
  },
  {
    title: "Security Checks are Normal",
    description: "Bag checks are routine at malls, bus stations, and public buildings. Don't be alarmed — security personnel are friendly and efficient. Keep ID accessible.",
    icon: "shield-check",
  },
  {
    title: "Bargaining is Expected",
    description: "In markets (shuks) and with street vendors, bargaining is part of the culture. Start at about 60% of the asking price. Fixed-price shops don't expect bargaining.",
    icon: "message-circle",
  },
];

export interface HebrewPhrase {
  hebrew: string;
  transliteration: string;
  english: string;
  usage: string;
}

export const hebrewPhrases: HebrewPhrase[] = [
  { hebrew: "שלום", transliteration: "Shalom", english: "Hello / Goodbye / Peace", usage: "Universal greeting" },
  { hebrew: "תודה", transliteration: "Toda", english: "Thank you", usage: "Expressing gratitude" },
  { hebrew: "בבקשה", transliteration: "Bevakasha", english: "Please / You're welcome", usage: "Politeness" },
  { hebrew: "סליחה", transliteration: "Slicha", english: "Excuse me / Sorry", usage: "Getting attention or apologizing" },
  { hebrew: "כן / לא", transliteration: "Ken / Lo", english: "Yes / No", usage: "Basic responses" },
  { hebrew: "?כמה זה עולה", transliteration: "Kama ze oleh?", english: "How much does it cost?", usage: "Shopping" },
  { hebrew: "?איפה", transliteration: "Eifo?", english: "Where?", usage: "Asking for directions" },
  { hebrew: "מים", transliteration: "Mayim", english: "Water", usage: "Ordering at restaurants" },
  { hebrew: "יופי", transliteration: "Yofi", english: "Beautiful / Great", usage: "Expressing approval" },
  { hebrew: "להתראות", transliteration: "Lehitraot", english: "See you later", usage: "Saying goodbye" },
];

export interface HealthInfo {
  title: string;
  content: string;
}

export const healthInfo: HealthInfo[] = [
  {
    title: "Hydration is Critical",
    content: "Israel's climate can be dehydrating, especially in the desert areas. Drink at least 2-3 liters of water per day. Carry your water bottle at all times.",
  },
  {
    title: "Sun Protection",
    content: "UV radiation is intense, particularly between 10 AM and 4 PM. Wear sunscreen (SPF 50+), a hat, and sunglasses. Reapply sunscreen every 2 hours.",
  },
  {
    title: "Dead Sea Precautions",
    content: "Don't shave 24 hours before visiting. Avoid getting water in your eyes — it burns intensely. Don't submerge your head. Shower immediately after.",
  },
  {
    title: "Walking Preparation",
    content: "Expect to walk 10-15 kilometers daily on uneven terrain. Break in your walking shoes before the trip. Consider bringing moleskin for blisters.",
  },
  {
    title: "Medical Facilities",
    content: "Israel has world-class medical facilities. Emergency services: dial 101 for ambulance. Your travel insurance card should be carried at all times.",
  },
];

export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  exchangeRate: number; // approximate USD to ILS
  tips: string[];
}

export const currencyInfo: CurrencyInfo = {
  code: "ILS",
  name: "Israeli New Shekel",
  symbol: "₪",
  exchangeRate: 3.65,
  tips: [
    "Credit cards are widely accepted — Visa and Mastercard work everywhere",
    "ATMs are plentiful and offer good exchange rates",
    "Avoid exchanging money at the airport — rates are poor",
    "Many tourist sites accept USD, but you'll get better value with shekels",
    "Small denominations are useful for markets and tipping",
    "Contactless payments (Apple Pay, Google Pay) work at most retailers",
  ],
};
