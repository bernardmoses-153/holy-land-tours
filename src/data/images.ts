// Curated Unsplash URLs for Holy Land locations
// Using direct Unsplash source URLs for next/image compatibility

export const holyLandImages: Record<string, { url: string; alt: string; credit: string }> = {
  // Jerusalem
  jerusalem: {
    url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&q=80",
    alt: "Jerusalem Old City golden dome at sunset",
    credit: "Unsplash",
  },
  westernWall: {
    url: "https://images.unsplash.com/photo-1552423314-cf29ab68ad73?w=1600&q=80",
    alt: "The Western Wall with prayers",
    credit: "Unsplash",
  },
  oldCity: {
    url: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=1600&q=80",
    alt: "Jerusalem Old City narrow streets",
    credit: "Unsplash",
  },
  mountOfOlives: {
    url: "https://images.unsplash.com/photo-1547483238-2cbf881a559f?w=1600&q=80",
    alt: "Mount of Olives overlooking Jerusalem",
    credit: "Unsplash",
  },

  // Bethlehem
  bethlehem: {
    url: "https://images.unsplash.com/photo-1580834341580-8c17a3a630c0?w=1600&q=80",
    alt: "Church of the Nativity Bethlehem",
    credit: "Unsplash",
  },

  // Dead Sea
  deadSea: {
    url: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=1600&q=80",
    alt: "Dead Sea crystal blue waters and salt formations",
    credit: "Unsplash",
  },

  // Masada
  masada: {
    url: "https://images.unsplash.com/photo-1591712729613-0dab20100747?w=1600&q=80",
    alt: "Masada fortress at sunrise in the desert",
    credit: "Unsplash",
  },

  // Sea of Galilee
  galilee: {
    url: "https://images.unsplash.com/photo-1580834341580-8c17a3a630c0?w=1600&q=80",
    alt: "Sea of Galilee calm waters at dawn",
    credit: "Unsplash",
  },

  // Nazareth
  nazareth: {
    url: "https://images.unsplash.com/photo-1580834341580-8c17a3a630c0?w=1600&q=80",
    alt: "Basilica of the Annunciation Nazareth",
    credit: "Unsplash",
  },

  // General Israel landscapes
  negev: {
    url: "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=1600&q=80",
    alt: "Negev Desert dramatic landscape",
    credit: "Unsplash",
  },
  eilat: {
    url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1600&q=80",
    alt: "Red Sea coral reef in Eilat",
    credit: "Unsplash",
  },
  telaviv: {
    url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&q=80",
    alt: "Tel Aviv modern skyline at sunset",
    credit: "Unsplash",
  },

  // Atmospheric / mood
  sunrise: {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
    alt: "Golden sunrise over hills",
    credit: "Unsplash",
  },
  desert: {
    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&q=80",
    alt: "Desert landscape at golden hour",
    credit: "Unsplash",
  },
  prayer: {
    url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&q=80",
    alt: "Spiritual moment at ancient site",
    credit: "Unsplash",
  },
  market: {
    url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&q=80",
    alt: "Vibrant Middle Eastern market spices",
    credit: "Unsplash",
  },

  // Hero / landing
  heroLanding: {
    url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&q=80",
    alt: "Jerusalem panorama at golden hour",
    credit: "Unsplash",
  },
  heroDashboard: {
    url: "https://images.unsplash.com/photo-1552423314-cf29ab68ad73?w=1600&q=80",
    alt: "Holy Land ancient stones and light",
    credit: "Unsplash",
  },
};

// Map itinerary day numbers to appropriate images
export const dayImages: Record<number, string> = {
  1: holyLandImages.telaviv.url,      // Arrival - Tel Aviv
  2: holyLandImages.jerusalem.url,     // Jerusalem Old City
  3: holyLandImages.mountOfOlives.url, // Mount of Olives / Gethsemane
  4: holyLandImages.bethlehem.url,     // Bethlehem
  5: holyLandImages.deadSea.url,       // Dead Sea
  6: holyLandImages.masada.url,        // Masada
  7: holyLandImages.galilee.url,       // Sea of Galilee
  8: holyLandImages.nazareth.url,      // Nazareth / Departure
};

// Storytelling blurbs for each day
export const dayStories: Record<number, string> = {
  1: "Your journey begins as you step onto the land that has shaped civilizations. The warmth of the Mediterranean air greets you as you leave the airport, and the promise of ancient wonders lies ahead.",
  2: "Walk where prophets walked. The stones beneath your feet have witnessed three millennia of human history. Every corner of the Old City reveals another layer of the world's most storied city.",
  3: "Stand where olive trees have stood for nearly a thousand years. The Garden of Gethsemane offers a moment of profound stillness amid the bustle of modern Jerusalem.",
  4: "Journey to the birthplace that changed the world. The Church of the Nativity, one of the oldest continuously operating churches, connects you to a story that spans two thousand years.",
  5: "Float in waters so mineral-rich that nothing can sink. The Dead Sea, Earth's lowest point, offers a surreal experience unlike anything else on the planet.",
  6: "Climb the ancient fortress as dawn paints the desert in shades of rose and gold. Masada stands as a testament to the human spirit and an unforgettable sunrise experience.",
  7: "Sail on the waters that carried fishermen and witnessed miracles. The Sea of Galilee remains a place of extraordinary peace and natural beauty.",
  8: "Your final day brings reflection and farewell. Carry the stories, friendships, and memories of this ancient land as you prepare for your journey home.",
};

export function getImageForLocation(location: string): string {
  const lower = location.toLowerCase();
  if (lower.includes("jerusalem") || lower.includes("old city")) return holyLandImages.jerusalem.url;
  if (lower.includes("western wall") || lower.includes("kotel")) return holyLandImages.westernWall.url;
  if (lower.includes("bethlehem") || lower.includes("nativity")) return holyLandImages.bethlehem.url;
  if (lower.includes("dead sea") || lower.includes("ein gedi")) return holyLandImages.deadSea.url;
  if (lower.includes("masada")) return holyLandImages.masada.url;
  if (lower.includes("galilee") || lower.includes("kinneret") || lower.includes("capernaum")) return holyLandImages.galilee.url;
  if (lower.includes("nazareth") || lower.includes("annunciation")) return holyLandImages.nazareth.url;
  if (lower.includes("negev") || lower.includes("ramon")) return holyLandImages.negev.url;
  if (lower.includes("eilat") || lower.includes("red sea")) return holyLandImages.eilat.url;
  if (lower.includes("tel aviv") || lower.includes("jaffa")) return holyLandImages.telaviv.url;
  if (lower.includes("olive")) return holyLandImages.mountOfOlives.url;
  if (lower.includes("gethsemane") || lower.includes("garden")) return holyLandImages.mountOfOlives.url;
  return holyLandImages.jerusalem.url; // fallback
}
