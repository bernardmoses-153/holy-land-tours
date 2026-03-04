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
