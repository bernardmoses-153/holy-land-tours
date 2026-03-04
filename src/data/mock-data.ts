import type {
  Operator,
  Leader,
  Tourist,
  Group,
  Itinerary,
  Commission,
  Payment,
  Notification,
  ChecklistItem,
  DocumentRecord,
  DayLog,
} from "@/types";

// ─── Operator ──────────────────────────────────────────────────
export const operator: Operator = {
  id: "op-1",
  name: "Eli Goldstein",
  email: "eli@holylandtours.com",
  phone: "+972-50-123-4567",
  role: "operator",
  companyName: "Holy Land Tours Ltd.",
  location: "Jerusalem, Israel",
  totalGroups: 6,
  totalRevenue: 425000,
  createdAt: "2024-01-15",
};

// ─── Itineraries ───────────────────────────────────────────────
export const itineraries: Itinerary[] = [
  {
    id: "itin-1",
    name: "Classic Holy Land",
    duration: 8,
    description: "The ultimate 8-day journey through Israel's most iconic biblical and historical sites. From the ancient walls of Jerusalem to the serene shores of the Sea of Galilee.",
    pricePerPerson: 2850,
    highlights: ["Western Wall", "Church of the Holy Sepulchre", "Masada", "Dead Sea", "Sea of Galilee", "Nazareth"],
    days: [
      {
        dayNumber: 1,
        title: "Arrival — Welcome to the Holy Land",
        description: "Arrive at Ben Gurion Airport. Transfer to Jerusalem hotel. Evening welcome dinner with orientation.",
        locations: ["Ben Gurion Airport", "Jerusalem"],
        meals: ["dinner"],
        overnight: "David Citadel Hotel, Jerusalem",
        highlights: ["Airport meet & greet", "Welcome dinner"],
        meetingTime: "Per flight arrival",
        meetingPoint: "Ben Gurion Airport, Terminal 3",
      },
      {
        dayNumber: 2,
        title: "Jerusalem — Old City Immersion",
        description: "Full day exploring the Old City. Walk the Via Dolorosa, visit the Church of the Holy Sepulchre, Western Wall, and Temple Mount.",
        locations: ["Old City Jerusalem", "Via Dolorosa", "Church of the Holy Sepulchre", "Western Wall"],
        meals: ["breakfast", "lunch"],
        overnight: "David Citadel Hotel, Jerusalem",
        highlights: ["Via Dolorosa", "Church of the Holy Sepulchre", "Western Wall prayer"],
        meetingTime: "8:00 AM",
        meetingPoint: "Hotel lobby",
      },
      {
        dayNumber: 3,
        title: "Jerusalem — Mount of Olives & City of David",
        description: "Panoramic views from Mount of Olives. Garden of Gethsemane. Explore the City of David archaeological site and Hezekiah's Tunnel.",
        locations: ["Mount of Olives", "Garden of Gethsemane", "City of David"],
        meals: ["breakfast", "lunch"],
        overnight: "David Citadel Hotel, Jerusalem",
        highlights: ["Mount of Olives panorama", "Garden of Gethsemane", "Hezekiah's Tunnel"],
        meetingTime: "8:30 AM",
        meetingPoint: "Hotel lobby",
      },
      {
        dayNumber: 4,
        title: "Bethlehem & Dead Sea",
        description: "Morning visit to Bethlehem — Church of the Nativity and Shepherd's Field. Afternoon at the Dead Sea for floating and spa.",
        locations: ["Bethlehem", "Dead Sea"],
        meals: ["breakfast", "lunch", "dinner"],
        overnight: "Dead Sea Resort",
        highlights: ["Church of the Nativity", "Dead Sea floating", "Mud spa"],
        meetingTime: "7:30 AM",
        meetingPoint: "Hotel lobby",
      },
      {
        dayNumber: 5,
        title: "Masada & Ein Gedi",
        description: "Sunrise cable car to Masada fortress. Explore Herod's palace and learn about the Zealot siege. Hike Ein Gedi nature reserve.",
        locations: ["Masada", "Ein Gedi"],
        meals: ["breakfast", "lunch"],
        overnight: "Dead Sea Resort",
        highlights: ["Masada sunrise", "Ein Gedi waterfall hike"],
        meetingTime: "5:00 AM",
        meetingPoint: "Hotel lobby",
      },
      {
        dayNumber: 6,
        title: "Jordan Valley to Galilee",
        description: "Drive through the Jordan Valley to the Sea of Galilee. Visit Qasr el-Yahud baptism site. Afternoon boat ride on the Sea of Galilee.",
        locations: ["Jordan Valley", "Qasr el-Yahud", "Sea of Galilee"],
        meals: ["breakfast", "dinner"],
        overnight: "Scots Hotel, Tiberias",
        highlights: ["Baptism site", "Galilee boat ride", "St. Peter's fish dinner"],
        meetingTime: "8:00 AM",
        meetingPoint: "Hotel lobby",
      },
      {
        dayNumber: 7,
        title: "Galilee — Nazareth, Cana & Capernaum",
        description: "Visit Nazareth's Basilica of the Annunciation, the wedding church in Cana, and ancient Capernaum synagogue ruins.",
        locations: ["Nazareth", "Cana", "Capernaum"],
        meals: ["breakfast", "lunch"],
        overnight: "Scots Hotel, Tiberias",
        highlights: ["Basilica of the Annunciation", "Capernaum ruins", "Mount of Beatitudes"],
        meetingTime: "8:00 AM",
        meetingPoint: "Hotel lobby",
      },
      {
        dayNumber: 8,
        title: "Departure — Farewell",
        description: "Final morning devotional by the Sea of Galilee. Transfer to Ben Gurion Airport for departure flights.",
        locations: ["Sea of Galilee", "Ben Gurion Airport"],
        meals: ["breakfast"],
        overnight: "",
        highlights: ["Morning devotional", "Farewell"],
        meetingTime: "7:00 AM",
        meetingPoint: "Hotel lobby",
      },
    ],
    createdAt: "2024-06-01",
    updatedAt: "2025-01-10",
  },
  {
    id: "itin-2",
    name: "Adventure & Negev",
    duration: 6,
    description: "An active 6-day adventure through Israel's southern desert. Hiking, rappelling, camel rides, and Bedouin culture.",
    pricePerPerson: 2200,
    highlights: ["Ramon Crater", "Negev Desert", "Bedouin Camp", "Red Canyon", "Eilat Coral Reef"],
    days: [
      { dayNumber: 1, title: "Arrival & Negev Introduction", description: "Arrive and transfer to the Negev. Evening stargazing in the desert.", locations: ["Ben Gurion Airport", "Mitzpe Ramon"], meals: ["dinner"], overnight: "Beresheet Hotel, Mitzpe Ramon", highlights: ["Desert stargazing"], meetingTime: "Per flight arrival", meetingPoint: "Ben Gurion Airport" },
      { dayNumber: 2, title: "Ramon Crater Exploration", description: "Full day hiking and rappelling in the Ramon Crater — the world's largest erosion crater.", locations: ["Ramon Crater"], meals: ["breakfast", "lunch"], overnight: "Beresheet Hotel, Mitzpe Ramon", highlights: ["Crater rim hike", "Rappelling"], meetingTime: "7:00 AM", meetingPoint: "Hotel lobby" },
      { dayNumber: 3, title: "Bedouin Culture & Camel Trek", description: "Visit an authentic Bedouin camp. Camel ride through the desert. Traditional Bedouin feast.", locations: ["Negev Desert", "Bedouin Camp"], meals: ["breakfast", "lunch", "dinner"], overnight: "Bedouin Camp (glamping)", highlights: ["Camel trek", "Bedouin feast", "Desert camping"], meetingTime: "8:00 AM", meetingPoint: "Hotel lobby" },
      { dayNumber: 4, title: "Red Canyon & Ein Avdat", description: "Hike through the stunning Red Canyon and the Ein Avdat canyon with its spring-fed pools.", locations: ["Red Canyon", "Ein Avdat"], meals: ["breakfast", "lunch"], overnight: "Eilat", highlights: ["Red Canyon hike", "Ein Avdat springs"], meetingTime: "7:30 AM", meetingPoint: "Camp meeting point" },
      { dayNumber: 5, title: "Eilat — Red Sea Adventures", description: "Snorkeling at the Coral Beach Reserve. Optional scuba diving. Afternoon free for water sports.", locations: ["Eilat", "Coral Beach"], meals: ["breakfast"], overnight: "Eilat", highlights: ["Coral reef snorkeling", "Red Sea"], meetingTime: "9:00 AM", meetingPoint: "Hotel lobby" },
      { dayNumber: 6, title: "Departure", description: "Morning free time. Transfer to Ramon Airport or Ben Gurion for departure.", locations: ["Eilat", "Airport"], meals: ["breakfast"], overnight: "", highlights: ["Farewell"], meetingTime: "Per flight", meetingPoint: "Hotel lobby" },
    ],
    createdAt: "2024-08-15",
    updatedAt: "2025-02-01",
  },
  {
    id: "itin-3",
    name: "Spiritual Pilgrimage",
    duration: 10,
    description: "A contemplative 10-day spiritual journey focusing on prayer, meditation, and deep biblical study at holy sites.",
    pricePerPerson: 3400,
    highlights: ["Jerusalem", "Bethlehem", "Nazareth", "Jordan River", "Mount Tabor", "Jericho"],
    days: [
      { dayNumber: 1, title: "Arrival & Opening Prayer", description: "Welcome to Israel. Opening prayer service at the hotel chapel.", locations: ["Ben Gurion Airport", "Jerusalem"], meals: ["dinner"], overnight: "Notre Dame Center, Jerusalem", highlights: ["Opening prayer"], meetingTime: "Per flight", meetingPoint: "Airport" },
      { dayNumber: 2, title: "Jerusalem — Sacred Morning", description: "Early morning prayer at the Western Wall. Visit the Southern Wall excavations.", locations: ["Western Wall", "Southern Wall"], meals: ["breakfast", "lunch"], overnight: "Notre Dame Center, Jerusalem", highlights: ["Western Wall prayer", "Excavations"], meetingTime: "6:00 AM", meetingPoint: "Hotel lobby" },
      { dayNumber: 3, title: "Via Dolorosa — Walking in His Steps", description: "Guided prayer walk along the Via Dolorosa. Stations of the Cross. Church of the Holy Sepulchre.", locations: ["Via Dolorosa", "Holy Sepulchre"], meals: ["breakfast", "lunch"], overnight: "Notre Dame Center, Jerusalem", highlights: ["Stations of the Cross", "Prayer at the Tomb"], meetingTime: "7:30 AM", meetingPoint: "Hotel lobby" },
      { dayNumber: 4, title: "Mount of Olives Retreat", description: "Full day of prayer and meditation on the Mount of Olives. Visit Dominus Flevit, Garden of Gethsemane.", locations: ["Mount of Olives", "Gethsemane"], meals: ["breakfast", "lunch"], overnight: "Notre Dame Center, Jerusalem", highlights: ["Silent retreat", "Gethsemane meditation"], meetingTime: "8:00 AM", meetingPoint: "Hotel lobby" },
      { dayNumber: 5, title: "Bethlehem — The Birthplace", description: "Church of the Nativity. Shepherd's Field. Manger Square reflection.", locations: ["Bethlehem"], meals: ["breakfast", "lunch", "dinner"], overnight: "Notre Dame Center, Jerusalem", highlights: ["Nativity Church", "Shepherd's Field prayer"], meetingTime: "8:00 AM", meetingPoint: "Hotel lobby" },
      { dayNumber: 6, title: "Dead Sea & Qumran", description: "Visit Qumran where Dead Sea Scrolls were found. Afternoon reflection at Dead Sea.", locations: ["Qumran", "Dead Sea"], meals: ["breakfast", "lunch"], overnight: "Dead Sea", highlights: ["Dead Sea Scrolls site", "Desert reflection"], meetingTime: "8:00 AM", meetingPoint: "Hotel lobby" },
      { dayNumber: 7, title: "Jordan River & Jericho", description: "Baptism renewal at the Jordan River. Visit ancient Jericho and Mount of Temptation.", locations: ["Jordan River", "Jericho"], meals: ["breakfast", "lunch"], overnight: "Galilee", highlights: ["Jordan baptism", "Jericho"], meetingTime: "7:30 AM", meetingPoint: "Hotel lobby" },
      { dayNumber: 8, title: "Sea of Galilee — The Ministry", description: "Boat ride with morning devotional. Visit Tabgha, Mount of Beatitudes, Capernaum.", locations: ["Sea of Galilee", "Tabgha", "Capernaum"], meals: ["breakfast", "lunch", "dinner"], overnight: "Galilee", highlights: ["Galilee devotional", "Beatitudes sermon"], meetingTime: "7:00 AM", meetingPoint: "Hotel lobby" },
      { dayNumber: 9, title: "Nazareth & Mount Tabor", description: "Basilica of the Annunciation. Climb Mount Tabor for the Transfiguration site.", locations: ["Nazareth", "Mount Tabor"], meals: ["breakfast", "lunch"], overnight: "Galilee", highlights: ["Annunciation Basilica", "Transfiguration site"], meetingTime: "8:00 AM", meetingPoint: "Hotel lobby" },
      { dayNumber: 10, title: "Farewell — Sending Forth", description: "Closing communion service. Transfer to airport with hearts full of the Holy Land.", locations: ["Galilee", "Airport"], meals: ["breakfast"], overnight: "", highlights: ["Closing service", "Farewell"], meetingTime: "7:00 AM", meetingPoint: "Hotel lobby" },
    ],
    createdAt: "2024-10-01",
    updatedAt: "2025-03-01",
  },
];

// ─── Leaders ───────────────────────────────────────────────────
export const leaders: Leader[] = [
  {
    id: "leader-1",
    name: "Pastor David Chen",
    email: "david.chen@gracecommunitychurch.org",
    phone: "+1-555-0101",
    role: "leader",
    title: "Senior Pastor",
    organization: "Grace Community Church",
    assignedGroupId: "group-1",
    commissionRate: 10,
    totalEarnings: 8550,
    touristsRecruited: 30,
    performanceScore: 95,
    createdAt: "2024-03-01",
  },
  {
    id: "leader-2",
    name: "Minister Sarah Johnson",
    email: "sarah.johnson@faithfellowship.com",
    phone: "+1-555-0102",
    role: "leader",
    title: "Youth Minister",
    organization: "Faith Fellowship Ministry",
    assignedGroupId: "group-2",
    commissionRate: 10,
    totalEarnings: 4400,
    touristsRecruited: 20,
    performanceScore: 88,
    createdAt: "2024-04-15",
  },
  {
    id: "leader-3",
    name: "Rabbi Michael Levi",
    email: "rabbi.levi@bethshalom.org",
    phone: "+1-555-0103",
    role: "leader",
    title: "Senior Rabbi",
    organization: "Beth Shalom Synagogue",
    assignedGroupId: "group-3",
    commissionRate: 12,
    totalEarnings: 6120,
    touristsRecruited: 15,
    performanceScore: 92,
    createdAt: "2024-05-01",
  },
  {
    id: "leader-4",
    name: "Coach James Wilson",
    email: "james.wilson@adventuregroups.com",
    phone: "+1-555-0104",
    role: "leader",
    title: "Adventure Group Leader",
    organization: "Wilson Adventure Groups",
    assignedGroupId: "group-4",
    commissionRate: 8,
    totalEarnings: 2640,
    touristsRecruited: 15,
    performanceScore: 85,
    createdAt: "2024-06-01",
  },
];

// ─── Groups ────────────────────────────────────────────────────
export const groups: Group[] = [
  {
    id: "group-1",
    name: "Grace Church Holy Land 2026",
    operatorId: "op-1",
    leaderId: "leader-1",
    leaderName: "Pastor David Chen",
    itineraryId: "itin-1",
    itineraryName: "Classic Holy Land",
    status: "confirmed",
    startDate: "2026-04-15",
    endDate: "2026-04-22",
    minCapacity: 20,
    maxCapacity: 35,
    currentSize: 30,
    pricePerPerson: 2850,
    totalRevenue: 85500,
    collectedRevenue: 71250,
    createdAt: "2025-09-01",
  },
  {
    id: "group-2",
    name: "Faith Fellowship Spring Pilgrimage",
    operatorId: "op-1",
    leaderId: "leader-2",
    leaderName: "Minister Sarah Johnson",
    itineraryId: "itin-3",
    itineraryName: "Spiritual Pilgrimage",
    status: "filling",
    startDate: "2026-05-10",
    endDate: "2026-05-19",
    minCapacity: 15,
    maxCapacity: 25,
    currentSize: 18,
    pricePerPerson: 3400,
    totalRevenue: 61200,
    collectedRevenue: 30600,
    createdAt: "2025-10-15",
  },
  {
    id: "group-3",
    name: "Beth Shalom Heritage Tour",
    operatorId: "op-1",
    leaderId: "leader-3",
    leaderName: "Rabbi Michael Levi",
    itineraryId: "itin-1",
    itineraryName: "Classic Holy Land",
    status: "almost_full",
    startDate: "2026-06-01",
    endDate: "2026-06-08",
    minCapacity: 15,
    maxCapacity: 20,
    currentSize: 19,
    pricePerPerson: 2850,
    totalRevenue: 54150,
    collectedRevenue: 40612,
    createdAt: "2025-11-01",
  },
  {
    id: "group-4",
    name: "Wilson Adventure Negev",
    operatorId: "op-1",
    leaderId: "leader-4",
    leaderName: "Coach James Wilson",
    itineraryId: "itin-2",
    itineraryName: "Adventure & Negev",
    status: "recruiting",
    startDate: "2026-07-05",
    endDate: "2026-07-10",
    minCapacity: 10,
    maxCapacity: 20,
    currentSize: 8,
    pricePerPerson: 2200,
    totalRevenue: 17600,
    collectedRevenue: 4400,
    createdAt: "2025-12-01",
  },
  {
    id: "group-5",
    name: "Summer Spiritual Retreat",
    operatorId: "op-1",
    leaderId: "leader-1",
    leaderName: "Pastor David Chen",
    itineraryId: "itin-3",
    itineraryName: "Spiritual Pilgrimage",
    status: "draft",
    startDate: "2026-08-20",
    endDate: "2026-08-29",
    minCapacity: 20,
    maxCapacity: 30,
    currentSize: 0,
    pricePerPerson: 3400,
    totalRevenue: 0,
    collectedRevenue: 0,
    createdAt: "2026-01-15",
  },
  {
    id: "group-6",
    name: "In-Tour: Easter Pilgrimage",
    operatorId: "op-1",
    leaderId: "leader-2",
    leaderName: "Minister Sarah Johnson",
    itineraryId: "itin-1",
    itineraryName: "Classic Holy Land",
    status: "in_tour",
    startDate: "2026-03-01",
    endDate: "2026-03-08",
    minCapacity: 20,
    maxCapacity: 30,
    currentSize: 25,
    pricePerPerson: 2850,
    totalRevenue: 71250,
    collectedRevenue: 71250,
    createdAt: "2025-06-01",
  },
];

// ─── Tourists ──────────────────────────────────────────────────
export const tourists: Tourist[] = [
  // Group 1 — Grace Church (30 tourists, confirmed)
  { id: "t-1", name: "John Matthews", email: "john.m@email.com", phone: "+1-555-1001", role: "tourist", groupId: "group-1", passportStatus: "approved", medicalFormStatus: "approved", insuranceStatus: "approved", flightInfoStatus: "approved", paymentStatus: "paid_full", amountPaid: 2850, amountDue: 0, emergencyContact: "Mary Matthews", emergencyPhone: "+1-555-9001", roomPreference: "double", roommate: "Martha Matthews", createdAt: "2025-09-15" },
  { id: "t-2", name: "Martha Matthews", email: "martha.m@email.com", phone: "+1-555-1002", role: "tourist", groupId: "group-1", passportStatus: "approved", medicalFormStatus: "approved", insuranceStatus: "approved", flightInfoStatus: "approved", paymentStatus: "paid_full", amountPaid: 2850, amountDue: 0, emergencyContact: "John Matthews", emergencyPhone: "+1-555-1001", roomPreference: "double", roommate: "John Matthews", createdAt: "2025-09-15" },
  { id: "t-3", name: "Robert Davis", email: "robert.d@email.com", phone: "+1-555-1003", role: "tourist", groupId: "group-1", passportStatus: "approved", medicalFormStatus: "approved", insuranceStatus: "pending_review", flightInfoStatus: "uploaded", paymentStatus: "deposit_paid", amountPaid: 1000, amountDue: 1850, emergencyContact: "Lisa Davis", emergencyPhone: "+1-555-9003", roomPreference: "single", createdAt: "2025-10-01" },
  { id: "t-4", name: "Lisa Chen", email: "lisa.c@email.com", phone: "+1-555-1004", role: "tourist", groupId: "group-1", passportStatus: "approved", medicalFormStatus: "approved", insuranceStatus: "approved", flightInfoStatus: "approved", paymentStatus: "paid_full", amountPaid: 2850, amountDue: 0, emergencyContact: "Wei Chen", emergencyPhone: "+1-555-9004", dietaryRestrictions: "Vegetarian", roomPreference: "double", roommate: "Emily Park", createdAt: "2025-09-20" },
  { id: "t-5", name: "Emily Park", email: "emily.p@email.com", phone: "+1-555-1005", role: "tourist", groupId: "group-1", passportStatus: "approved", medicalFormStatus: "uploaded", insuranceStatus: "approved", flightInfoStatus: "not_started", paymentStatus: "partial", amountPaid: 2000, amountDue: 850, emergencyContact: "David Park", emergencyPhone: "+1-555-9005", roomPreference: "double", roommate: "Lisa Chen", createdAt: "2025-10-05" },
  { id: "t-6", name: "Michael Thompson", email: "m.thompson@email.com", phone: "+1-555-1006", role: "tourist", groupId: "group-1", passportStatus: "approved", medicalFormStatus: "approved", insuranceStatus: "approved", flightInfoStatus: "approved", paymentStatus: "paid_full", amountPaid: 2850, amountDue: 0, emergencyContact: "Sarah Thompson", emergencyPhone: "+1-555-9006", roomPreference: "single", createdAt: "2025-09-18" },
  { id: "t-7", name: "Angela Rivera", email: "angela.r@email.com", phone: "+1-555-1007", role: "tourist", groupId: "group-1", passportStatus: "approved", medicalFormStatus: "approved", insuranceStatus: "approved", flightInfoStatus: "uploaded", paymentStatus: "paid_full", amountPaid: 2850, amountDue: 0, emergencyContact: "Carlos Rivera", emergencyPhone: "+1-555-9007", dietaryRestrictions: "Gluten-free", roomPreference: "double", roommate: "Grace Kim", createdAt: "2025-09-22" },
  { id: "t-8", name: "Grace Kim", email: "grace.k@email.com", phone: "+1-555-1008", role: "tourist", groupId: "group-1", passportStatus: "approved", medicalFormStatus: "approved", insuranceStatus: "approved", flightInfoStatus: "approved", paymentStatus: "paid_full", amountPaid: 2850, amountDue: 0, emergencyContact: "James Kim", emergencyPhone: "+1-555-9008", roomPreference: "double", roommate: "Angela Rivera", createdAt: "2025-09-25" },
  { id: "t-9", name: "Thomas Wright", email: "t.wright@email.com", phone: "+1-555-1009", role: "tourist", groupId: "group-1", passportStatus: "uploaded", medicalFormStatus: "not_started", insuranceStatus: "not_started", flightInfoStatus: "not_started", paymentStatus: "overdue", amountPaid: 500, amountDue: 2350, emergencyContact: "Betty Wright", emergencyPhone: "+1-555-9009", roomPreference: "single", createdAt: "2025-11-01" },
  { id: "t-10", name: "Patricia Brown", email: "p.brown@email.com", phone: "+1-555-1010", role: "tourist", groupId: "group-1", passportStatus: "approved", medicalFormStatus: "approved", insuranceStatus: "approved", flightInfoStatus: "approved", paymentStatus: "paid_full", amountPaid: 2850, amountDue: 0, emergencyContact: "William Brown", emergencyPhone: "+1-555-9010", roomPreference: "double", roommate: "Sandra Lee", createdAt: "2025-09-30" },

  // Group 2 — Faith Fellowship (18 tourists, filling)
  { id: "t-11", name: "Daniel Harris", email: "d.harris@email.com", phone: "+1-555-2001", role: "tourist", groupId: "group-2", passportStatus: "approved", medicalFormStatus: "approved", insuranceStatus: "uploaded", flightInfoStatus: "not_started", paymentStatus: "deposit_paid", amountPaid: 1200, amountDue: 2200, emergencyContact: "Maria Harris", emergencyPhone: "+1-555-8001", roomPreference: "double", roommate: "Maria Harris", createdAt: "2025-11-01" },
  { id: "t-12", name: "Maria Harris", email: "maria.h@email.com", phone: "+1-555-2002", role: "tourist", groupId: "group-2", passportStatus: "approved", medicalFormStatus: "approved", insuranceStatus: "uploaded", flightInfoStatus: "not_started", paymentStatus: "deposit_paid", amountPaid: 1200, amountDue: 2200, emergencyContact: "Daniel Harris", emergencyPhone: "+1-555-2001", roomPreference: "double", roommate: "Daniel Harris", createdAt: "2025-11-01" },
  { id: "t-13", name: "Jessica Taylor", email: "j.taylor@email.com", phone: "+1-555-2003", role: "tourist", groupId: "group-2", passportStatus: "uploaded", medicalFormStatus: "not_started", insuranceStatus: "not_started", flightInfoStatus: "not_started", paymentStatus: "deposit_paid", amountPaid: 1000, amountDue: 2400, emergencyContact: "Kevin Taylor", emergencyPhone: "+1-555-8003", roomPreference: "single", createdAt: "2025-11-15" },
  { id: "t-14", name: "Kevin Anderson", email: "k.anderson@email.com", phone: "+1-555-2004", role: "tourist", groupId: "group-2", passportStatus: "approved", medicalFormStatus: "approved", insuranceStatus: "approved", flightInfoStatus: "uploaded", paymentStatus: "partial", amountPaid: 2000, amountDue: 1400, emergencyContact: "Amy Anderson", emergencyPhone: "+1-555-8004", dietaryRestrictions: "Kosher", roomPreference: "double", createdAt: "2025-10-20" },
  { id: "t-15", name: "Sophia Martinez", email: "s.martinez@email.com", phone: "+1-555-2005", role: "tourist", groupId: "group-2", passportStatus: "approved", medicalFormStatus: "uploaded", insuranceStatus: "not_started", flightInfoStatus: "not_started", paymentStatus: "deposit_paid", amountPaid: 1000, amountDue: 2400, emergencyContact: "Juan Martinez", emergencyPhone: "+1-555-8005", roomPreference: "single", createdAt: "2025-11-20" },

  // Group 3 — Beth Shalom (19 tourists, almost_full)
  { id: "t-16", name: "Aaron Goldberg", email: "a.goldberg@email.com", phone: "+1-555-3001", role: "tourist", groupId: "group-3", passportStatus: "approved", medicalFormStatus: "approved", insuranceStatus: "approved", flightInfoStatus: "approved", paymentStatus: "paid_full", amountPaid: 2850, amountDue: 0, emergencyContact: "Ruth Goldberg", emergencyPhone: "+1-555-7001", dietaryRestrictions: "Kosher", roomPreference: "double", roommate: "Ruth Goldberg", createdAt: "2025-11-10" },
  { id: "t-17", name: "Ruth Goldberg", email: "r.goldberg@email.com", phone: "+1-555-3002", role: "tourist", groupId: "group-3", passportStatus: "approved", medicalFormStatus: "approved", insuranceStatus: "approved", flightInfoStatus: "approved", paymentStatus: "paid_full", amountPaid: 2850, amountDue: 0, emergencyContact: "Aaron Goldberg", emergencyPhone: "+1-555-3001", dietaryRestrictions: "Kosher", roomPreference: "double", roommate: "Aaron Goldberg", createdAt: "2025-11-10" },
  { id: "t-18", name: "Sarah Friedman", email: "s.friedman@email.com", phone: "+1-555-3003", role: "tourist", groupId: "group-3", passportStatus: "approved", medicalFormStatus: "pending_review", insuranceStatus: "uploaded", flightInfoStatus: "not_started", paymentStatus: "partial", amountPaid: 1500, amountDue: 1350, emergencyContact: "David Friedman", emergencyPhone: "+1-555-7003", dietaryRestrictions: "Kosher", roomPreference: "single", createdAt: "2025-11-25" },
  { id: "t-19", name: "Benjamin Cohen", email: "b.cohen@email.com", phone: "+1-555-3004", role: "tourist", groupId: "group-3", passportStatus: "approved", medicalFormStatus: "approved", insuranceStatus: "approved", flightInfoStatus: "uploaded", paymentStatus: "deposit_paid", amountPaid: 1000, amountDue: 1850, emergencyContact: "Miriam Cohen", emergencyPhone: "+1-555-7004", dietaryRestrictions: "Kosher", roomPreference: "double", roommate: "Miriam Cohen", createdAt: "2025-12-01" },
  { id: "t-20", name: "Miriam Cohen", email: "m.cohen@email.com", phone: "+1-555-3005", role: "tourist", groupId: "group-3", passportStatus: "approved", medicalFormStatus: "approved", insuranceStatus: "approved", flightInfoStatus: "not_started", paymentStatus: "deposit_paid", amountPaid: 1000, amountDue: 1850, emergencyContact: "Benjamin Cohen", emergencyPhone: "+1-555-3004", dietaryRestrictions: "Kosher", roomPreference: "double", roommate: "Benjamin Cohen", createdAt: "2025-12-01" },

  // Group 4 — Wilson Adventure (8 tourists, recruiting)
  { id: "t-21", name: "Jake Wilson", email: "jake.w@email.com", phone: "+1-555-4001", role: "tourist", groupId: "group-4", passportStatus: "approved", medicalFormStatus: "uploaded", insuranceStatus: "not_started", flightInfoStatus: "not_started", paymentStatus: "deposit_paid", amountPaid: 800, amountDue: 1400, emergencyContact: "Coach James Wilson", emergencyPhone: "+1-555-0104", roomPreference: "double", roommate: "Tyler Moore", createdAt: "2025-12-15" },
  { id: "t-22", name: "Tyler Moore", email: "tyler.m@email.com", phone: "+1-555-4002", role: "tourist", groupId: "group-4", passportStatus: "uploaded", medicalFormStatus: "not_started", insuranceStatus: "not_started", flightInfoStatus: "not_started", paymentStatus: "deposit_paid", amountPaid: 800, amountDue: 1400, emergencyContact: "Linda Moore", emergencyPhone: "+1-555-6002", roomPreference: "double", roommate: "Jake Wilson", createdAt: "2025-12-20" },
  { id: "t-23", name: "Samantha Brooks", email: "sam.b@email.com", phone: "+1-555-4003", role: "tourist", groupId: "group-4", passportStatus: "not_started", medicalFormStatus: "not_started", insuranceStatus: "not_started", flightInfoStatus: "not_started", paymentStatus: "not_started", amountPaid: 0, amountDue: 2200, emergencyContact: "Tom Brooks", emergencyPhone: "+1-555-6003", roomPreference: "single", createdAt: "2026-01-10" },

  // Group 6 — In Tour: Easter Pilgrimage (sample tourists)
  { id: "t-24", name: "Rachel Adams", email: "r.adams@email.com", phone: "+1-555-6001", role: "tourist", groupId: "group-6", passportStatus: "approved", medicalFormStatus: "approved", insuranceStatus: "approved", flightInfoStatus: "approved", paymentStatus: "paid_full", amountPaid: 2850, amountDue: 0, emergencyContact: "Mark Adams", emergencyPhone: "+1-555-5001", roomPreference: "double", roommate: "Claire Adams", createdAt: "2025-06-15" },
  { id: "t-25", name: "Claire Adams", email: "c.adams@email.com", phone: "+1-555-6002", role: "tourist", groupId: "group-6", passportStatus: "approved", medicalFormStatus: "approved", insuranceStatus: "approved", flightInfoStatus: "approved", paymentStatus: "paid_full", amountPaid: 2850, amountDue: 0, emergencyContact: "Rachel Adams", emergencyPhone: "+1-555-6001", roomPreference: "double", roommate: "Rachel Adams", createdAt: "2025-06-15" },
  { id: "t-26", name: "Marcus Johnson", email: "marcus.j@email.com", phone: "+1-555-6003", role: "tourist", groupId: "group-6", passportStatus: "approved", medicalFormStatus: "approved", insuranceStatus: "approved", flightInfoStatus: "approved", paymentStatus: "paid_full", amountPaid: 2850, amountDue: 0, emergencyContact: "Helen Johnson", emergencyPhone: "+1-555-5003", dietaryRestrictions: "Vegan", roomPreference: "single", createdAt: "2025-07-01" },
  { id: "t-27", name: "Helen Foster", email: "h.foster@email.com", phone: "+1-555-6004", role: "tourist", groupId: "group-6", passportStatus: "approved", medicalFormStatus: "approved", insuranceStatus: "approved", flightInfoStatus: "approved", paymentStatus: "paid_full", amountPaid: 2850, amountDue: 0, emergencyContact: "George Foster", emergencyPhone: "+1-555-5004", roomPreference: "double", roommate: "Priya Patel", createdAt: "2025-07-05" },
  { id: "t-28", name: "Priya Patel", email: "priya.p@email.com", phone: "+1-555-6005", role: "tourist", groupId: "group-6", passportStatus: "approved", medicalFormStatus: "approved", insuranceStatus: "approved", flightInfoStatus: "approved", paymentStatus: "paid_full", amountPaid: 2850, amountDue: 0, emergencyContact: "Raj Patel", emergencyPhone: "+1-555-5005", roomPreference: "double", roommate: "Helen Foster", createdAt: "2025-07-10" },
];

// ─── Commissions ───────────────────────────────────────────────
export const commissions: Commission[] = [
  { id: "com-1", leaderId: "leader-1", leaderName: "Pastor David Chen", groupId: "group-1", groupName: "Grace Church Holy Land 2026", touristsRecruited: 30, rate: 10, totalAmount: 8550, paidAmount: 4275, status: "partial" },
  { id: "com-2", leaderId: "leader-2", leaderName: "Minister Sarah Johnson", groupId: "group-2", groupName: "Faith Fellowship Spring Pilgrimage", touristsRecruited: 18, rate: 10, totalAmount: 6120, paidAmount: 0, status: "pending" },
  { id: "com-3", leaderId: "leader-3", leaderName: "Rabbi Michael Levi", groupId: "group-3", groupName: "Beth Shalom Heritage Tour", touristsRecruited: 19, rate: 12, totalAmount: 6498, paidAmount: 0, status: "pending" },
  { id: "com-4", leaderId: "leader-4", leaderName: "Coach James Wilson", groupId: "group-4", groupName: "Wilson Adventure Negev", touristsRecruited: 8, rate: 8, totalAmount: 1408, paidAmount: 0, status: "pending" },
  { id: "com-5", leaderId: "leader-2", leaderName: "Minister Sarah Johnson", groupId: "group-6", groupName: "In-Tour: Easter Pilgrimage", touristsRecruited: 25, rate: 10, totalAmount: 7125, paidAmount: 7125, status: "paid" },
];

// ─── Payments ──────────────────────────────────────────────────
export const payments: Payment[] = [
  { id: "pay-1", touristId: "t-1", touristName: "John Matthews", groupId: "group-1", amount: 1000, date: "2025-10-01", type: "deposit", method: "credit_card" },
  { id: "pay-2", touristId: "t-1", touristName: "John Matthews", groupId: "group-1", amount: 1850, date: "2025-12-15", type: "final", method: "credit_card" },
  { id: "pay-3", touristId: "t-3", touristName: "Robert Davis", groupId: "group-1", amount: 1000, date: "2025-10-15", type: "deposit", method: "bank_transfer" },
  { id: "pay-4", touristId: "t-9", touristName: "Thomas Wright", groupId: "group-1", amount: 500, date: "2025-11-15", type: "deposit", method: "check" },
  { id: "pay-5", touristId: "t-11", touristName: "Daniel Harris", groupId: "group-2", amount: 1200, date: "2025-11-20", type: "deposit", method: "credit_card" },
  { id: "pay-6", touristId: "t-16", touristName: "Aaron Goldberg", groupId: "group-3", amount: 2850, date: "2025-12-01", type: "final", method: "bank_transfer" },
];

// ─── Notifications ─────────────────────────────────────────────
export const notifications: Notification[] = [
  { id: "notif-1", userId: "t-1", type: "success", title: "Payment Confirmed", message: "Your final payment of $1,850 has been received. You're all set for the Holy Land!", read: false, createdAt: "2026-03-03T10:30:00Z" },
  { id: "notif-2", userId: "t-1", type: "info", title: "Itinerary Updated", message: "Day 4 has been updated with a new restaurant for dinner. Check your itinerary for details.", read: false, createdAt: "2026-03-02T14:00:00Z" },
  { id: "notif-3", userId: "t-1", type: "warning", title: "Flight Info Needed", message: "Please upload your flight details so we can arrange airport transfers.", read: true, createdAt: "2026-03-01T09:00:00Z" },
  { id: "notif-4", userId: "t-1", type: "action", title: "Medical Form Reminder", message: "Your medical form is still pending. Please complete it before March 15.", read: true, createdAt: "2026-02-28T08:00:00Z", actionUrl: "/tourist/documents" },
  { id: "notif-5", userId: "t-1", type: "info", title: "42 Days Until Departure!", message: "Your Holy Land adventure is getting closer. Make sure all your documents are ready.", read: true, createdAt: "2026-02-25T10:00:00Z" },
  { id: "notif-6", userId: "leader-1", type: "warning", title: "Overdue Payment Alert", message: "Thomas Wright (t-9) has an overdue payment of $2,350. Consider reaching out.", read: false, createdAt: "2026-03-03T08:00:00Z" },
  { id: "notif-7", userId: "leader-1", type: "success", title: "New Tourist Registered", message: "Emily Park has joined your Grace Church group. 30 of 35 spots filled!", read: false, createdAt: "2026-03-02T16:00:00Z" },
  { id: "notif-8", userId: "op-1", type: "info", title: "Group Almost Full", message: "Beth Shalom Heritage Tour is at 19/20 capacity. Consider closing registration soon.", read: false, createdAt: "2026-03-03T11:00:00Z" },
  { id: "notif-9", userId: "op-1", type: "success", title: "Commission Paid", message: "Commission of $7,125 paid to Minister Sarah Johnson for Easter Pilgrimage.", read: true, createdAt: "2026-03-01T12:00:00Z" },
  { id: "notif-10", userId: "op-1", type: "warning", title: "Low Fill Rate", message: "Wilson Adventure Negev is at 40% capacity with 3 months to departure.", read: false, createdAt: "2026-03-02T09:00:00Z" },
];

// ─── Checklist ─────────────────────────────────────────────────
export const checklistItems: ChecklistItem[] = [
  { id: "cl-1", label: "Collect all passport copies", description: "Ensure every tourist has submitted a valid passport scan.", status: "in_progress", dueDate: "2026-03-15", category: "documents" },
  { id: "cl-2", label: "Verify medical forms", description: "Review and approve all medical declaration forms.", status: "in_progress", dueDate: "2026-03-20", category: "documents" },
  { id: "cl-3", label: "Confirm insurance coverage", description: "Verify travel insurance for all group members.", status: "pending", dueDate: "2026-03-25", category: "documents" },
  { id: "cl-4", label: "Collect flight information", description: "Get arrival/departure details from all tourists.", status: "pending", dueDate: "2026-04-01", category: "logistics" },
  { id: "cl-5", label: "Send pre-departure briefing", description: "Email group with packing list, weather info, and tips.", status: "pending", dueDate: "2026-04-05", category: "communication" },
  { id: "cl-6", label: "Confirm room assignments", description: "Finalize rooming list based on preferences.", status: "pending", dueDate: "2026-04-08", category: "logistics" },
  { id: "cl-7", label: "Collect outstanding payments", description: "Follow up on all partial and overdue payments.", status: "in_progress", dueDate: "2026-03-30", category: "financial" },
  { id: "cl-8", label: "Distribute emergency contacts", description: "Share local emergency numbers and tour guide contacts.", status: "pending", dueDate: "2026-04-10", category: "communication" },
  { id: "cl-9", label: "Prepare group WhatsApp", description: "Create WhatsApp group and add all members.", status: "completed", category: "communication" },
  { id: "cl-10", label: "Verify dietary requirements", description: "Confirm special meal needs with hotels and restaurants.", status: "completed", category: "logistics" },
];

// ─── Documents ─────────────────────────────────────────────────
export const documents: DocumentRecord[] = [
  { id: "doc-1", touristId: "t-1", type: "passport", fileName: "john_matthews_passport.pdf", status: "approved", uploadedAt: "2025-09-20", reviewedAt: "2025-09-22" },
  { id: "doc-2", touristId: "t-1", type: "medical_form", fileName: "john_matthews_medical.pdf", status: "approved", uploadedAt: "2025-10-01", reviewedAt: "2025-10-03" },
  { id: "doc-3", touristId: "t-1", type: "insurance", fileName: "john_matthews_insurance.pdf", status: "approved", uploadedAt: "2025-10-15", reviewedAt: "2025-10-17" },
  { id: "doc-4", touristId: "t-1", type: "flight_info", fileName: "john_matthews_flights.pdf", status: "approved", uploadedAt: "2025-12-01", reviewedAt: "2025-12-02" },
  { id: "doc-5", touristId: "t-3", type: "passport", fileName: "robert_davis_passport.pdf", status: "approved", uploadedAt: "2025-10-10", reviewedAt: "2025-10-12" },
  { id: "doc-6", touristId: "t-3", type: "insurance", fileName: "robert_davis_insurance.pdf", status: "pending_review", uploadedAt: "2026-02-28" },
  { id: "doc-7", touristId: "t-9", type: "passport", fileName: "thomas_wright_passport.jpg", status: "uploaded", uploadedAt: "2026-01-15" },
  { id: "doc-8", touristId: "t-5", type: "medical_form", fileName: "emily_park_medical.pdf", status: "uploaded", uploadedAt: "2026-02-20" },
];

// ─── Day Logs (for in-tour group) ──────────────────────────────
export const dayLogs: DayLog[] = [
  {
    dayNumber: 1,
    date: "2026-03-01",
    attendance: [
      { touristId: "t-24", present: true },
      { touristId: "t-25", present: true },
      { touristId: "t-26", present: true },
      { touristId: "t-27", present: true },
      { touristId: "t-28", present: true },
    ],
    notes: "Smooth arrivals. All tourists accounted for. Welcome dinner was excellent.",
    issues: [],
  },
  {
    dayNumber: 2,
    date: "2026-03-02",
    attendance: [
      { touristId: "t-24", present: true },
      { touristId: "t-25", present: true },
      { touristId: "t-26", present: true },
      { touristId: "t-27", present: false },
      { touristId: "t-28", present: true },
    ],
    notes: "Helen Foster had mild jet lag and rested at the hotel. Rest of group visited Old City.",
    issues: ["Helen Foster absent — jet lag"],
  },
  {
    dayNumber: 3,
    date: "2026-03-03",
    attendance: [
      { touristId: "t-24", present: true },
      { touristId: "t-25", present: true },
      { touristId: "t-26", present: true },
      { touristId: "t-27", present: true },
      { touristId: "t-28", present: true },
    ],
    notes: "Full attendance. Mount of Olives views were stunning. Great group energy.",
    issues: [],
  },
];

// ─── Accessor Functions ────────────────────────────────────────
export function getGroupById(id: string): Group | undefined {
  return groups.find((g) => g.id === id);
}

export function getLeaderById(id: string): Leader | undefined {
  return leaders.find((l) => l.id === id);
}

export function getTouristById(id: string): Tourist | undefined {
  return tourists.find((t) => t.id === id);
}

export function getItineraryById(id: string): Itinerary | undefined {
  return itineraries.find((i) => i.id === id);
}

export function getTouristsByGroup(groupId: string): Tourist[] {
  return tourists.filter((t) => t.groupId === groupId);
}

export function getGroupsByLeader(leaderId: string): Group[] {
  return groups.filter((g) => g.leaderId === leaderId);
}

export function getGroupsByOperator(operatorId: string): Group[] {
  return groups.filter((g) => g.operatorId === operatorId);
}

export function getNotificationsByUser(userId: string): Notification[] {
  return notifications.filter((n) => n.userId === userId);
}

export function getDocumentsByTourist(touristId: string): DocumentRecord[] {
  return documents.filter((d) => d.touristId === touristId);
}

export function getCommissionsByLeader(leaderId: string): Commission[] {
  return commissions.filter((c) => c.leaderId === leaderId);
}

export function getPaymentsByGroup(groupId: string): Payment[] {
  return payments.filter((p) => p.groupId === groupId);
}
