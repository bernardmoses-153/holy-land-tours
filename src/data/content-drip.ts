import type { ContentDripItem } from "@/types";

export const contentDripItems: ContentDripItem[] = [
  {
    id: "drip-1",
    dayOffset: 0,
    type: "welcome",
    title: "Welcome to Your Holy Land Journey!",
    teaser: "Everything you need to know about what happens next.",
    content: "Congratulations on registering for your Holy Land trip! Here's what to expect over the coming months:\n\n1. Complete your registration documents (passport, medical form, insurance)\n2. Set up your payment plan — you can pay in installments\n3. We'll send you preparation content and tips as your trip approaches\n4. Join your group chat to connect with fellow travelers\n\nYour guide and our operations team are already preparing an incredible experience for you.",
    cta: { label: "Complete Your Documents", href: "/tourist/documents" },
  },
  {
    id: "drip-2",
    dayOffset: -90,
    type: "inspiration",
    title: "Why This Trip Will Change Your Life",
    teaser: "Hear from past travelers about their transformative experiences.",
    content: "Every traveler who visits the Holy Land says the same thing: 'I wish I had done this sooner.'\n\nWalking where history was made isn't just sightseeing — it's a deeply personal experience that connects you to something larger than yourself. The stones of Jerusalem have witnessed 3,000 years of human civilization. The Sea of Galilee still shimmers with the same light that fishermen saw millennia ago.\n\nPast travelers report that the trip gave them:\n- A deeper understanding of their faith and heritage\n- Friendships that lasted long after returning home\n- A sense of peace and perspective they hadn't expected\n- Stories they tell for the rest of their lives",
    imageKey: "jerusalem",
  },
  {
    id: "drip-3",
    dayOffset: -75,
    type: "connection",
    title: "Meet Your Guide",
    teaser: "Get to know the expert who'll bring the Holy Land to life.",
    content: "Your licensed guide is one of the best in Israel. With years of experience leading groups and deep knowledge of biblical history, archaeology, and local culture, they'll transform every site from a place you've read about into a living, breathing experience.\n\nFun fact: Your guide speaks multiple languages and has led over 100 tours. They know the best photo spots, the hidden gems tourists miss, and the stories that will give you goosebumps.",
    imageKey: "sunrise",
  },
  {
    id: "drip-4",
    dayOffset: -60,
    type: "education",
    title: "Day 1 Preview: The Western Wall",
    teaser: "Discover the history and significance of your first major site.",
    content: "The Western Wall (also called the Kotel) is the last remaining outer wall of the Second Temple compound, dating back over 2,000 years. It's not just a wall — it's the most sacred place of prayer in Judaism and a site of profound significance for Christians.\n\nWhat to expect:\n- The plaza is open 24/7 and free to visit\n- Men and women pray in separate sections\n- You can write a prayer on a small paper and place it in the wall's crevices\n- The atmosphere is electric — you'll feel the weight of centuries of devotion\n\nPro tip: Visit early morning or late evening for a more intimate experience. The stones glow golden at sunset.",
    imageKey: "westernWall",
  },
  {
    id: "drip-5",
    dayOffset: -45,
    type: "action",
    title: "Passport & Document Checkpoint",
    teaser: "Make sure your travel documents are in order.",
    content: "It's time to check your travel documents! Here's what you need:\n\n✅ Passport valid for at least 6 months after your return date\n✅ Medical form completed and submitted\n✅ Travel insurance purchased and uploaded\n✅ ETA-IL (Electronic Travel Authorization) — we'll help with this\n\nDon't wait until the last minute! Processing times can vary and we want you stress-free on departure day.",
    cta: { label: "Check My Documents", href: "/tourist/documents" },
  },
  {
    id: "drip-6",
    dayOffset: -30,
    type: "community",
    title: "Your Group is Taking Shape!",
    teaser: "See how your travel group is coming together.",
    content: "Your group is growing and getting ready! Here's a snapshot:\n\n- Fellow travelers are completing their documents\n- Payment plans are on track\n- Your guide has been assigned and is preparing the itinerary\n- Hotels and transport are confirmed\n\nRemember, you're not just going on a trip — you're joining a community of fellow travelers who will share this incredible experience with you.",
    cta: { label: "Meet Your Group", href: "/tourist/group" },
  },
  {
    id: "drip-7",
    dayOffset: -21,
    type: "practical",
    title: "Your Packing List",
    teaser: "A weather-aware, itinerary-specific guide to packing smart.",
    content: "Here's your essential packing list based on the weather forecast and your itinerary:\n\n👗 Clothing:\n- Modest clothing for holy sites (covered shoulders and knees)\n- Comfortable walking shoes (broken in!)\n- Sun hat and sunglasses\n- Light layers — mornings can be cool\n- Swimsuit for the Dead Sea\n\n🎒 Essentials:\n- Passport and copies of all documents\n- Prescription medications (in original containers)\n- Universal power adapter (Type H/C)\n- Refillable water bottle\n- Small daypack for excursions\n\n📱 Tech:\n- Phone with offline maps downloaded\n- Camera or phone with good camera\n- Portable charger/power bank",
    cta: { label: "View Full Packing List", href: "/tourist/prepare" },
  },
  {
    id: "drip-8",
    dayOffset: -14,
    type: "education",
    title: "Day 4 Preview: Masada at Sunrise",
    teaser: "The desert fortress that will take your breath away.",
    content: "Masada is an ancient fortress perched on a cliff overlooking the Dead Sea. Built by King Herod and later the site of a legendary siege, it's one of Israel's most dramatic sites.\n\nWhat makes it special:\n- We take the cable car up (5:00 AM start!) to catch the sunrise\n- The view from the top is absolutely stunning — the Dead Sea, Jordan, and the Negev Desert spread below you\n- The story of the 960 Jewish zealots who held out against the Roman army is both inspiring and heartbreaking\n- After Masada, we head to the Dead Sea for floating — the perfect cool-down\n\nPro tip: The sunrise is worth the early wake-up. Trust us on this one.",
    imageKey: "masada",
  },
  {
    id: "drip-9",
    dayOffset: -7,
    type: "practical",
    title: "Final Checklist",
    teaser: "Everything you need before departure day.",
    content: "One week to go! Let's make sure you're 100% ready:\n\n✅ All documents uploaded and approved\n✅ Final payment completed\n✅ Bags packed (check weight limits!)\n✅ Home preparations done (mail hold, pet care, etc.)\n✅ Emergency contacts shared with family\n✅ Travel insurance card in your carry-on\n✅ Phone charged, offline maps downloaded\n✅ Comfortable shoes packed (seriously, your feet will thank you)\n\nRemember: Your guide and our team will be with you from the moment you land. You're in great hands!",
  },
  {
    id: "drip-10",
    dayOffset: -1,
    type: "emotional",
    title: "Tomorrow You Walk Where History Was Made",
    teaser: "The countdown hits zero. Your journey begins.",
    content: "This is it. Tomorrow you begin the journey of a lifetime.\n\nFor months you've been preparing — documents, payments, packing. But nothing can truly prepare you for the moment you first see Jerusalem's golden walls, or touch the ancient stones of the Western Wall, or float effortlessly in the Dead Sea.\n\nYou're about to walk where prophets and kings walked. You'll see sunrises over deserts and sunsets over seas that have witnessed the entire sweep of human history.\n\nSafe travels, and get ready for an experience you'll carry with you forever. 🌅",
  },
];

export function getUnlockedContent(registrationDate: string, departureDate: string): ContentDripItem[] {
  const now = new Date();
  const departure = new Date(departureDate);
  const registration = new Date(registrationDate);
  const daysUntilDeparture = Math.ceil((departure.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return contentDripItems.filter((item) => {
    if (item.dayOffset === 0) {
      return now >= registration;
    }
    return daysUntilDeparture <= Math.abs(item.dayOffset);
  });
}
