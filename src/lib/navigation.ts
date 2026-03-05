import {
  LayoutDashboard,
  Users,
  DollarSign,
  Map,
  UserCheck,
  Settings,
  CheckSquare,
  Calendar,
  Wallet,
  Radio,
  FileText,
  Bell,
  User,
  Backpack,
  MessageCircle,
  Megaphone,
  Bot,
  Building,
  Globe,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const operatorNav: NavItem[] = [
  { label: "Overview", href: "/operator", icon: LayoutDashboard },
  { label: "Groups", href: "/operator/groups", icon: Users },
  { label: "Revenue", href: "/operator/revenue", icon: DollarSign },
  { label: "Itineraries", href: "/operator/itineraries", icon: Map },
  { label: "Suppliers", href: "/operator/suppliers", icon: Building },
  { label: "Guides", href: "/operator/guides", icon: Globe },
  { label: "Leaders", href: "/operator/leaders", icon: UserCheck },
  { label: "Settings", href: "/operator/settings", icon: Settings },
];

export const leaderNav: NavItem[] = [
  { label: "Overview", href: "/leader", icon: LayoutDashboard },
  { label: "Tourists", href: "/leader/tourists", icon: Users },
  { label: "Checklist", href: "/leader/checklist", icon: CheckSquare },
  { label: "Itinerary", href: "/leader/itinerary", icon: Calendar },
  { label: "Earnings", href: "/leader/earnings", icon: Wallet },
  { label: "Tour Mode", href: "/leader/tour-mode", icon: Radio },
  { label: "Announcements", href: "/leader/announcements", icon: Megaphone },
  { label: "AI Assistant", href: "/leader/assistant", icon: Bot },
  { label: "Settings", href: "/leader/settings", icon: Settings },
];

export const touristNav: NavItem[] = [
  { label: "Home", href: "/tourist", icon: LayoutDashboard },
  { label: "Itinerary", href: "/tourist/itinerary", icon: Calendar },
  { label: "Documents", href: "/tourist/documents", icon: FileText },
  { label: "Prepare", href: "/tourist/prepare", icon: Backpack },
  { label: "My Group", href: "/tourist/group", icon: Users },
  { label: "Updates", href: "/tourist/notifications", icon: Bell },
  { label: "Profile", href: "/tourist/profile", icon: User },
];

export const touristBottomNav: NavItem[] = [
  { label: "Home", href: "/tourist", icon: LayoutDashboard },
  { label: "Itinerary", href: "/tourist/itinerary", icon: Calendar },
  { label: "Docs", href: "/tourist/documents", icon: FileText },
  { label: "Group", href: "/tourist/group", icon: Users },
  { label: "Tour", href: "/tourist/tour-mode", icon: Radio },
];
