import type { GroupInvite } from "@/types";

// ─── Group Invites (slug → group mapping) ────────────────────────────────────

export const groupInvites: GroupInvite[] = [
  { groupId: "group-1", slug: "grace-church-2026", code: "GRACE2026", active: true },
  { groupId: "group-2", slug: "faith-fellowship-spring", code: "FAITH2026", active: true },
  { groupId: "group-3", slug: "beth-shalom-heritage", code: "SHALOM26", active: true },
  { groupId: "group-4", slug: "wilson-adventure-negev", code: "ADVENT26", active: true },
  { groupId: "group-5", slug: "summer-spiritual-retreat", code: "SUMMER26", active: false },
];

export function getGroupInviteBySlug(slug: string): GroupInvite | undefined {
  return groupInvites.find((i) => i.slug === slug);
}

export function getGroupInviteByCode(code: string): GroupInvite | undefined {
  return groupInvites.find((i) => i.code.toLowerCase() === code.toLowerCase() && i.active);
}

// ─── Leader Title Options ────────────────────────────────────────────────────

export const leaderTitles = [
  "Pastor",
  "Rabbi",
  "Minister",
  "Reverend",
  "Organizer",
  "Director",
  "Coordinator",
] as const;

// ─── Organization Types ──────────────────────────────────────────────────────

export const organizationTypes = [
  "Church",
  "Synagogue",
  "Ministry",
  "School",
  "Travel Group",
  "Other",
] as const;

// ─── Group Size Options ──────────────────────────────────────────────────────

export const groupSizeOptions = [
  { label: "10–15", value: "10-15", description: "Intimate group" },
  { label: "16–25", value: "16-25", description: "Most popular" },
  { label: "26–35", value: "26-35", description: "Large group" },
  { label: "36–50", value: "36-50", description: "Extra large" },
] as const;

// ─── Season Options ──────────────────────────────────────────────────────────

export const seasonOptions = [
  { label: "Spring", value: "spring", months: "Mar–May", color: "bg-olive-bg text-olive" },
  { label: "Summer", value: "summer", months: "Jun–Aug", color: "bg-gold-bg text-gold" },
  { label: "Fall", value: "fall", months: "Sep–Nov", color: "bg-sand-bg text-sand" },
  { label: "Winter", value: "winter", months: "Dec–Feb", color: "bg-sky-bg text-sky" },
] as const;

// ─── Tour Style Options ─────────────────────────────────────────────────────

export const tourStyles = [
  "Biblical",
  "Historical",
  "Adventure",
  "Cultural",
] as const;

// ─── AI Messages ─────────────────────────────────────────────────────────────

export const leaderAIMessages = {
  welcome: "97% of leaders say organizing their first group was easier than expected. You're in great hands!",
  titleResponses: {
    Pastor: "As a Pastor, your congregation will love hearing about this directly from you.",
    Rabbi: "As a Rabbi, your community will cherish this connection to the Holy Land.",
    Minister: "As a Minister, you'll bring a unique spiritual perspective to this journey.",
    Reverend: "As a Reverend, your leadership will make this trip truly meaningful.",
    Organizer: "As an Organizer, you'll love how our tools simplify group management.",
    Director: "As a Director, you'll appreciate the professional-grade planning tools.",
    Coordinator: "As a Coordinator, our platform handles the logistics so you can focus on people.",
  } as Record<string, string>,
  sizeResponses: {
    "10-15": "An intimate group of 10–15 allows for deeper connections and personal attention.",
    "16-25": "A group of 16–25 is our most popular size — perfect balance of community and flexibility.",
    "26-35": "A group of 26–35 brings great energy. We'll make sure logistics run smoothly.",
    "36-50": "A group of 36–50 is an ambitious goal! Our team provides extra coordination support.",
  } as Record<string, string>,
  itineraryResponses: {
    "itin-1": "The Classic Holy Land itinerary is our #1 choice — 85% of first-time groups love it.",
    "itin-2": "Adventure & Negev is perfect for active groups who want something different.",
    "itin-3": "The Spiritual Pilgrimage provides deep, contemplative experiences at every stop.",
  } as Record<string, string>,
  groupSetup: "Groups with personal invitation messages see 40% higher sign-up rates.",
  launch: "Most successful leaders share their invite link within 24 hours. Strike while the excitement is fresh!",
};

export const touristAIMessages = {
  excitement: "Your adventure of a lifetime begins now!",
  passport: "Your passport must be valid for at least 6 months after your return date. US citizens need an ETA-IL — we'll help you with that later.",
  dietary: (restriction: string) => `We'll ensure all meals accommodate your ${restriction} needs. Our local partners are experienced with dietary requirements.`,
  safety: "Israel welcomes over 4.5 million tourists annually. Our groups have a 100% safety record with 24/7 local support.",
  deposit: (count: number) => `${count} people have already joined this group. Secure your spot today!`,
  welcome: "I'll send you reminders and help you prepare every step of the way. You're going to have an amazing experience!",
};

// ─── Safety Data ─────────────────────────────────────────────────────────────

export const safetyStats = [
  { value: "4.5M+", label: "Annual tourists", description: "Israel welcomes millions of visitors each year" },
  { value: "24/7", label: "Local support", description: "Our team is available around the clock" },
  { value: "100%", label: "Insurance coverage", description: "Comprehensive travel insurance included" },
];

export const safetyTestimonials = [
  {
    name: "Margaret Thompson",
    title: "First-time visitor, Age 67",
    quote: "I was nervous before going, but from the moment we landed I felt completely safe. The security is thorough but friendly, and our guide was always a step ahead.",
  },
  {
    name: "Rev. James Carter",
    title: "Group Leader, 3rd trip",
    quote: "I've brought three church groups to Israel. Every single person came home saying it was the safest they've ever felt traveling abroad. The infrastructure is world-class.",
  },
  {
    name: "David & Susan Park",
    title: "Couple, Houston TX",
    quote: "We almost cancelled because of what we saw on the news. We're SO glad we didn't. It was nothing like what the media portrays — just beautiful, welcoming people everywhere.",
  },
];

// ─── Deposit Configuration ───────────────────────────────────────────────────

export const depositConfig = {
  percentage: 0.35, // 35% of total
  refundDays: 14,
  includedItems: [
    "Round-trip airport transfers",
    "4-5 star hotel accommodations",
    "Licensed tour guide (English)",
    "Air-conditioned private coach",
    "Most meals (per itinerary)",
    "All site entrance fees",
    "Comprehensive travel insurance",
    "24/7 local emergency support",
  ],
};

// ─── Group Name Suggestions ──────────────────────────────────────────────────

export function generateGroupNameSuggestions(orgName: string, season: string): string[] {
  const year = new Date().getFullYear() + 1;
  const seasonCap = season ? season.charAt(0).toUpperCase() + season.slice(1) : "Spring";
  const shortOrg = orgName.split(" ").slice(0, 2).join(" ");

  return [
    `${shortOrg} Holy Land ${year}`,
    `${shortOrg} ${seasonCap} Pilgrimage`,
    `${shortOrg} Israel Journey ${year}`,
  ];
}

// ─── Invite Message Template ─────────────────────────────────────────────────

export function generateInviteMessage(leaderName: string, groupName: string): string {
  return `Dear Friends,

I'm thrilled to invite you on an unforgettable journey to the Holy Land! I'll be leading "${groupName}" and would love for you to be part of this life-changing experience.

Walk where history was made, float in the Dead Sea, explore ancient Jerusalem, and create memories that will last a lifetime — all in the company of friends and fellow travelers.

Space is limited, so please join soon to secure your spot.

With excitement,
${leaderName}`;
}

// ─── Dietary Options ─────────────────────────────────────────────────────────

export const dietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Kosher",
  "Halal",
  "Dairy-free",
  "Nut allergy",
  "No restrictions",
] as const;

// ─── Room Preference Options ─────────────────────────────────────────────────

export const roomOptions = [
  { value: "double", label: "Double Room", description: "Share with a roommate", badge: "Most popular" },
  { value: "single", label: "Single Room", description: "Private room (+$450)", badge: null },
  { value: "triple", label: "Triple Room", description: "Share with two others", badge: "Best value" },
] as const;

// ─── Relationship Options ────────────────────────────────────────────────────

export const relationshipOptions = [
  "Spouse",
  "Parent",
  "Child",
  "Sibling",
  "Friend",
  "Other",
] as const;
