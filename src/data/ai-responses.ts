// Mock AI messages for tour guide, document assistant, and leader assistant

export interface AIMockMessage {
  id: string;
  role: "assistant";
  content: string;
  category?: string;
}

// ─── Tourist AI Tour Guide ───────────────────────────────────────────────────

export const tourGuideGreetings: Record<number, string> = {
  1: "Welcome to Israel! I'm your AI tour guide. Today you arrive at Ben Gurion Airport and transfer to your hotel. Let me share some tips for your first evening in the Holy Land.",
  2: "Shalom! Today we explore the heart of Jerusalem — the Old City. I'll share historical context for each site as we go. The Western Wall alone has over 2,000 years of stories.",
  3: "Good morning! Today we visit the Mount of Olives and the Garden of Gethsemane. The olive trees here are some of the oldest in the world — some roots may date back to the time of Jesus.",
  4: "Today we journey to Bethlehem. The Church of the Nativity is one of the oldest continuously operating churches in the world. I'll help you understand the layers of history here.",
  5: "Get ready for something truly unique! The Dead Sea is the lowest point on Earth. I'll share tips on how to float properly and why the minerals here are so special.",
  6: "Rise early today — the Masada sunrise is unforgettable. This fortress tells one of history's most dramatic stories. I'll guide you through the ruins and their significance.",
  7: "Today we're at the Sea of Galilee, the lowest freshwater lake on Earth. This peaceful setting has inspired pilgrims for centuries. Let me tell you about Capernaum and Tabgha.",
  8: "Our final day together. As we visit Nazareth and prepare for departure, let me help you reflect on this incredible journey and share some tips for your trip home.",
};

export const tourGuideSuggestions: string[] = [
  "Tell me about the history of this site",
  "What should I photograph here?",
  "Any cultural tips I should know?",
  "What's the best local food to try?",
  "How does this site connect to the Bible?",
  "What's a fun fact about this location?",
];

export const tourGuideMockResponses: Record<string, string> = {
  history: "This site has been continuously inhabited for over 3,000 years. Archaeological excavations have revealed layers of civilization from the Canaanite period through the Roman, Byzantine, Crusader, and Ottoman eras. Each layer tells a story of the people who lived, worshipped, and built here.",
  photography: "For the best photos, I recommend arriving in the golden hour — about an hour before sunset. The warm light makes the ancient stones glow. Try capturing the narrow alleyways with a wide-angle lens, and don't forget to look up — the architecture above tells stories too!",
  cultural: "Remember to dress modestly when visiting holy sites — shoulders and knees should be covered. It's customary to speak softly in places of worship. If you'd like to leave a prayer note at the Western Wall, small papers are available. Always ask before photographing people.",
  food: "You must try the local hummus — it's nothing like what you've had before! Also try shakshuka for breakfast, fresh falafel from a street vendor, and finish with knafeh, a sweet cheese pastry soaked in syrup. For drinks, try fresh pomegranate juice from the market.",
  biblical: "According to tradition, this is where King David established his capital around 1000 BCE. The Psalms describe the beauty of this place, and Jesus walked these very streets during the Second Temple period. The stones beneath your feet are the same ones mentioned in Scripture.",
  funfact: "Did you know that Jerusalem has been destroyed twice, besieged 23 times, attacked 52 times, and captured and recaptured 44 times? Despite all this, it remains one of the most continuously inhabited cities in the world, with over 5,000 years of history.",
};

// ─── Tourist Document Assistant ──────────────────────────────────────────────

export const docAssistantMessages: AIMockMessage[] = [
  {
    id: "doc-1",
    role: "assistant",
    content: "I notice your passport expires within 6 months of your travel date. Israel requires at least 6 months validity — let me help you check if yours meets the requirement.",
    category: "passport",
  },
  {
    id: "doc-2",
    role: "assistant",
    content: "Great news! Your medical form has been approved. I recommend downloading a copy to your phone in case you need it at the airport.",
    category: "medical",
  },
  {
    id: "doc-3",
    role: "assistant",
    content: "Your travel insurance covers medical emergencies but I noticed it doesn't include trip cancellation. Would you like me to suggest add-on options?",
    category: "insurance",
  },
  {
    id: "doc-4",
    role: "assistant",
    content: "I see you haven't uploaded your flight information yet. Once you book your flights, upload your confirmation here so your group leader can coordinate airport transfers.",
    category: "flight",
  },
];

export const docAssistantTips: string[] = [
  "Keep digital copies of all documents on your phone",
  "Share your itinerary with a trusted contact at home",
  "Register with your country's embassy in Israel",
  "Save emergency contact numbers locally on your phone",
  "Take a photo of your passport photo page",
];

// ─── Leader AI Assistant ─────────────────────────────────────────────────────

export const leaderInsights: AIMockMessage[] = [
  {
    id: "leader-1",
    role: "assistant",
    content: "3 tourists haven't uploaded their passport copies yet and departure is in 42 days. I recommend sending a reminder this week.",
    category: "documents",
  },
  {
    id: "leader-2",
    role: "assistant",
    content: "Payment collection is at 78%. Sarah Williams and Michael Brown still have outstanding balances. Consider sending personalized payment reminders.",
    category: "payments",
  },
  {
    id: "leader-3",
    role: "assistant",
    content: "Based on your group's dietary preferences, I've flagged 4 tourists with special requirements. Make sure the restaurant knows about the kosher and vegetarian needs.",
    category: "logistics",
  },
  {
    id: "leader-4",
    role: "assistant",
    content: "Weather forecast for your tour dates shows possible rain on Day 3. Consider having an indoor backup plan for the Mount of Olives visit.",
    category: "weather",
  },
  {
    id: "leader-5",
    role: "assistant",
    content: "Your group readiness score is 72%. The main gaps are: 3 missing passports, 2 incomplete medical forms, and 5 outstanding payments.",
    category: "readiness",
  },
];

export const leaderSuggestedPrompts: string[] = [
  "Which tourists need document reminders?",
  "Draft a payment reminder message",
  "Summarize group readiness status",
  "What should I prepare for tomorrow?",
  "Draft a welcome message for the group",
  "Show me tourists with dietary restrictions",
  "Help me plan a group icebreaker activity",
  "What's the weather forecast for our tour dates?",
];

export const leaderMockResponses: Record<string, string> = {
  reminders: "Based on current document status, I recommend contacting:\n\n1. **Sarah Williams** — Passport not uploaded (42 days to departure)\n2. **Michael Brown** — Medical form incomplete\n3. **Emily Davis** — Insurance document expired\n\nWould you like me to draft personalized reminder messages for each?",
  payment: "Here's a draft payment reminder:\n\n\"Dear [Name], this is a friendly reminder that your balance of $[amount] for the Holy Land tour is due by [date]. You can make your payment through the portal or contact us for payment plan options. We're excited to have you on this journey!\"",
  readiness: "**Group Readiness Summary:**\n\n- Documents: 78% complete (7 of 9 items across all tourists)\n- Payments: 85% collected ($72,150 of $85,500)\n- Special needs: 4 dietary restrictions flagged\n- Room assignments: 90% confirmed\n\nOverall readiness score: **72%** — on track for departure.",
  prepare: "For tomorrow's tour day, here's your prep checklist:\n\n1. Confirm bus pickup time with driver (7:00 AM)\n2. Review site-specific dress codes for holy sites\n3. Ensure water bottles and snacks are stocked\n4. Check weather — bring umbrellas if needed\n5. Have the emergency contact card distributed to all tourists",
  welcome: "Here's a draft welcome message:\n\n\"Welcome to our Holy Land Journey! We're so excited to embark on this incredible adventure together. Over the next 8 days, we'll walk where history was made, from the ancient stones of Jerusalem to the peaceful shores of Galilee. Remember to stay hydrated, wear comfortable shoes, and keep your heart open to the wonders ahead. Shalom!\"",
};

// ─── Announcement Templates ─────────────────────────────────────────────────

export const announcementTemplates = [
  {
    id: "tpl-1",
    name: "Document Reminder",
    subject: "Action Required: Upload Your Documents",
    body: "Dear travelers, please ensure all required documents (passport copy, medical form, insurance, flight info) are uploaded to your portal by [date]. This helps us coordinate logistics smoothly.",
  },
  {
    id: "tpl-2",
    name: "Payment Reminder",
    subject: "Payment Reminder — Balance Due",
    body: "This is a friendly reminder that your remaining balance of $[amount] is due by [date]. Please log in to your portal to complete the payment. Contact us if you need to arrange a payment plan.",
  },
  {
    id: "tpl-3",
    name: "Pre-Trip Briefing",
    subject: "Pre-Trip Briefing — What to Know Before We Go",
    body: "Our departure is just around the corner! Here are some important things to prepare:\n\n1. Pack layers — temperatures can vary\n2. Bring comfortable walking shoes\n3. Download offline maps of Israel\n4. Ensure your phone works internationally\n5. Review the daily itinerary on your portal",
  },
  {
    id: "tpl-4",
    name: "Welcome Message",
    subject: "Welcome to Our Holy Land Journey!",
    body: "We're thrilled to welcome you to our upcoming tour of Israel! This will be an unforgettable experience. Please review your itinerary and reach out with any questions. See you soon!",
  },
  {
    id: "tpl-5",
    name: "Daily Update",
    subject: "Day [X] Recap — [Title]",
    body: "What an incredible day! Here's a quick recap of today's highlights:\n\n[Summary]\n\nTomorrow we head to [location]. Meeting time is [time] at [meeting point]. Don't forget to [reminder]!",
  },
];
