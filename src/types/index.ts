export type Role = "operator" | "leader" | "tourist";

export type GroupStatus =
  | "draft"
  | "recruiting"
  | "filling"
  | "almost_full"
  | "confirmed"
  | "in_tour"
  | "completed"
  | "cancelled";

export type DocumentStatus =
  | "not_started"
  | "uploaded"
  | "pending_review"
  | "approved"
  | "rejected";

export type PaymentStatus =
  | "not_started"
  | "deposit_paid"
  | "partial"
  | "paid_full"
  | "overdue"
  | "refunded";

export type ChecklistItemStatus = "pending" | "in_progress" | "completed";

export type NotificationType = "info" | "success" | "warning" | "error" | "action";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  avatar?: string;
  createdAt: string;
}

export interface Operator extends User {
  role: "operator";
  companyName: string;
  companyLogo?: string;
  location: string;
  totalGroups: number;
  totalRevenue: number;
}

export interface Leader extends User {
  role: "leader";
  title: string;
  organization: string;
  assignedGroupId: string;
  commissionRate: number;
  totalEarnings: number;
  touristsRecruited: number;
  performanceScore: number;
}

export interface Tourist extends User {
  role: "tourist";
  groupId: string;
  passportStatus: DocumentStatus;
  medicalFormStatus: DocumentStatus;
  insuranceStatus: DocumentStatus;
  flightInfoStatus: DocumentStatus;
  paymentStatus: PaymentStatus;
  amountPaid: number;
  amountDue: number;
  emergencyContact: string;
  emergencyPhone: string;
  dietaryRestrictions?: string;
  roomPreference: "single" | "double" | "triple";
  roommate?: string;
}

export interface Group {
  id: string;
  name: string;
  operatorId: string;
  leaderId: string;
  leaderName: string;
  itineraryId: string;
  itineraryName: string;
  status: GroupStatus;
  startDate: string;
  endDate: string;
  minCapacity: number;
  maxCapacity: number;
  currentSize: number;
  pricePerPerson: number;
  totalRevenue: number;
  collectedRevenue: number;
  createdAt: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
  locations: string[];
  meals: ("breakfast" | "lunch" | "dinner")[];
  overnight: string;
  highlights: string[];
  meetingTime?: string;
  meetingPoint?: string;
}

export interface Itinerary {
  id: string;
  name: string;
  duration: number;
  description: string;
  pricePerPerson: number;
  highlights: string[];
  days: ItineraryDay[];
  createdAt: string;
  updatedAt: string;
}

export interface Commission {
  id: string;
  leaderId: string;
  leaderName: string;
  groupId: string;
  groupName: string;
  touristsRecruited: number;
  rate: number;
  totalAmount: number;
  paidAmount: number;
  status: "pending" | "partial" | "paid";
}

export interface Payment {
  id: string;
  touristId: string;
  touristName: string;
  groupId: string;
  amount: number;
  date: string;
  type: "deposit" | "installment" | "final" | "refund";
  method: "credit_card" | "bank_transfer" | "check";
}

export interface DocumentRecord {
  id: string;
  touristId: string;
  type: "passport" | "medical_form" | "insurance" | "flight_info" | "visa" | "other";
  fileName: string;
  status: DocumentStatus;
  uploadedAt?: string;
  reviewedAt?: string;
  notes?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  status: ChecklistItemStatus;
  dueDate?: string;
  category: "documents" | "logistics" | "communication" | "financial";
}

export interface DayLog {
  dayNumber: number;
  date: string;
  attendance: { touristId: string; present: boolean }[];
  notes: string;
  issues: string[];
}

export interface StatCard {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: string;
}

// ─── Phase 2 Types ───────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Announcement {
  id: string;
  subject: string;
  body: string;
  sentAt: string;
  sentBy: string;
  recipientCount: number;
  templateId?: string;
}

export interface JournalEntry {
  id: string;
  dayNumber: number;
  content: string;
  mood: "amazing" | "good" | "okay" | "tired" | "challenging";
  createdAt: string;
}

export interface EnrichedItineraryDay extends ItineraryDay {
  story?: string;
  imageUrl?: string;
  difficulty?: "easy" | "moderate" | "challenging";
  walkingDistance?: string;
}

// ─── Onboarding Types ─────────────────────────────────────────────────────────

export interface LeaderOnboardingData {
  step: number;
  personalInfo: { name: string; title: string; phone: string };
  organizationInfo: { name: string; type: string; estimatedSize: string; website?: string };
  tourPreferences: { itineraryId: string; season: string; style: string[]; notes?: string };
  groupSetup: { name: string; description: string; inviteMessage: string };
  completed: boolean;
}

export interface TouristOnboardingData {
  step: number;
  groupSlug: string;
  personalInfo: { dob?: string; passportNumber?: string; passportExpiry?: string };
  emergencyContact: { name: string; phone: string; relationship: string };
  preferences: { dietary: string[]; mobility?: string; room: string; roommate?: string };
  depositPaid: boolean;
  completed: boolean;
}

export interface GroupInvite {
  groupId: string;
  slug: string;
  code: string;
  active: boolean;
}

// ─── Payment Plan Types ─────────────────────────────────────────────────────

export interface PaymentPlan {
  id: string;
  touristId: string;
  groupId: string;
  totalAmount: number;
  depositAmount: number;
  installmentCount: number;
  amountPerInstallment: number;
  schedule: PaymentScheduleItem[];
  status: "active" | "completed" | "defaulted";
}

export interface PaymentScheduleItem {
  dueDate: string;
  amount: number;
  status: "upcoming" | "paid" | "overdue";
  paidDate?: string;
}

// ─── Supplier & Guide Types ─────────────────────────────────────────────────

export type SupplierType = "hotel" | "bus_company" | "restaurant" | "guide" | "activity" | "transfer";

export interface Supplier {
  id: string;
  type: SupplierType;
  name: string;
  contactName: string;
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  rating: number;
  languages?: string[];
  priceNotes: string;
  dietary?: string[];
}

export type SupplierBookingStatus = "draft" | "requested" | "confirmed" | "modified" | "cancelled";

export interface SupplierBooking {
  id: string;
  supplierId: string;
  supplierName: string;
  supplierType: SupplierType;
  groupId: string;
  groupName: string;
  date: string;
  dayNumber: number;
  status: SupplierBookingStatus;
  cost: number;
  pax: number;
  notes: string;
}

export interface Guide {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  photo?: string;
  languages: string[];
  specialties: string[];
  licenseNumber: string;
  rating: number;
  toursCompleted: number;
  bio: string;
}

export type GuideAssignmentStatus = "assigned" | "confirmed" | "completed";

export interface GuideAssignment {
  id: string;
  guideId: string;
  guideName: string;
  groupId: string;
  groupName: string;
  startDate: string;
  endDate: string;
  status: GuideAssignmentStatus;
  dailyRate: number;
}

// ─── Cultural Profile Types ─────────────────────────────────────────────────

export type CulturalMarket = "us_english" | "us_korean" | "us_filipino" | "us_indian" | "us_spanish" | "other";

export interface CulturalProfile {
  market: CulturalMarket;
  primaryLanguage: string;
  secondaryLanguage?: string;
  communicationChannel: "email" | "whatsapp" | "kakaotalk" | "viber" | "line";
  dietaryDefaults: string[];
  guideLanguagePreference: string[];
  currencyDisplay: "USD";
}

// ─── Group Costs Types ──────────────────────────────────────────────────────

export interface GroupCosts {
  groupId: string;
  hotel: number;
  transport: number;
  guide: number;
  meals: number;
  activities: number;
  other: number;
  commissions: number;
}

// ─── Content Drip Types ─────────────────────────────────────────────────────

export type ContentDripType = "welcome" | "inspiration" | "connection" | "education" | "action" | "community" | "practical" | "emotional";

export interface ContentDripItem {
  id: string;
  dayOffset: number;
  type: ContentDripType;
  title: string;
  teaser: string;
  content: string;
  imageKey?: string;
  cta?: { label: string; href: string };
}

// ─── Post-Trip Types ────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  touristId: string;
  touristName: string;
  groupId: string;
  rating: number;
  text: string;
  createdAt: string;
}

// ─── Trip Page Config ───────────────────────────────────────────────────────

export interface TripPageConfig {
  groupId: string;
  slug: string;
  heroImageKey: string;
  welcomeMessage: string;
  leaderPhoto?: string;
  showInstallments: boolean;
  installmentOptions: number[];
  depositAmount: number;
  faqItems: { question: string; answer: string }[];
}
