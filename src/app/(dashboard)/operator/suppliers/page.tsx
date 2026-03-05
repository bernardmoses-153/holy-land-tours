"use client";

import { useState, useMemo } from "react";
import {
  Building,
  Bus,
  UtensilsCrossed,
  MapPin,
  Phone,
  Mail,
  Star,
  MessageCircle,
  Activity,
  ArrowRightLeft,
} from "lucide-react";
import { suppliers, supplierBookings } from "@/data/mock-data";
import { PageHeader, SearchInput, DataTable, StatusBadge } from "@/components/shared";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import type { SupplierType } from "@/types";

const typeIcons: Record<SupplierType, typeof Building> = {
  hotel: Building,
  bus_company: Bus,
  restaurant: UtensilsCrossed,
  guide: MapPin,
  activity: Activity,
  transfer: ArrowRightLeft,
};

const typeLabels: Record<SupplierType, string> = {
  hotel: "Hotel",
  bus_company: "Bus Company",
  restaurant: "Restaurant",
  guide: "Guide",
  activity: "Activity",
  transfer: "Transfer",
};

const typeFilters: SupplierType[] = ["hotel", "bus_company", "restaurant", "activity", "transfer"];

export default function SuppliersPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<SupplierType | "all">("all");

  const filtered = useMemo(() => {
    return suppliers.filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.location.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "all" || s.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  return (
    <div>
      <PageHeader
        title="Supplier Management"
        description="Manage your hotels, transport, restaurants, and activity partners."
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search suppliers..."
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setTypeFilter("all")}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap",
              typeFilter === "all"
                ? "border-foreground bg-foreground text-background"
                : "border-border text-secondary hover:border-border-hover"
            )}
          >
            All
          </button>
          {typeFilters.map((type) => {
            const Icon = typeIcons[type];
            return (
              <button
                key={type}
                type="button"
                onClick={() => setTypeFilter(type)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1",
                  typeFilter === type
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-secondary hover:border-border-hover"
                )}
              >
                <Icon className="h-3 w-3" />
                {typeLabels[type]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Supplier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {filtered.map((supplier) => {
          const Icon = typeIcons[supplier.type];
          const bookingCount = supplierBookings.filter((sb) => sb.supplierId === supplier.id).length;

          return (
            <div
              key={supplier.id}
              className="rounded-xl border border-border bg-background p-5 space-y-3 hover:border-border-hover transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-elevated">
                    <Icon className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{supplier.name}</h3>
                    <p className="text-xs text-muted">{typeLabels[supplier.type]} &middot; {supplier.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-gold">
                  <Star className="h-3 w-3 fill-gold" />
                  {supplier.rating}
                </div>
              </div>

              {/* Contact */}
              <div className="flex flex-wrap gap-3 text-xs text-secondary">
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {supplier.contactName}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {supplier.email}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  WhatsApp
                </span>
              </div>

              {/* Price notes */}
              <p className="text-xs text-muted mono">{supplier.priceNotes}</p>

              {/* Dietary capabilities */}
              {supplier.dietary && supplier.dietary.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {supplier.dietary.map((d) => (
                    <span key={d} className="rounded-full bg-olive-bg px-2 py-0.5 text-[10px] text-olive capitalize">
                      {d}
                    </span>
                  ))}
                </div>
              )}

              {/* Booking count */}
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted">{bookingCount} active booking{bookingCount !== 1 ? "s" : ""}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings Table */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Recent Supplier Bookings</h3>
        {supplierBookings.length > 0 ? (
          <DataTable headers={["Supplier", "Type", "Group", "Date", "Cost", "Pax", "Status"]}>
            {supplierBookings.slice(0, 10).map((booking) => (
              <tr key={booking.id} className="hover:bg-surface transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-foreground">{booking.supplierName}</td>
                <td className="px-4 py-3 text-xs text-secondary capitalize">{booking.supplierType.replace(/_/g, " ")}</td>
                <td className="px-4 py-3 text-sm text-secondary">{booking.groupName}</td>
                <td className="px-4 py-3 text-sm mono text-secondary">{formatDate(booking.date)}</td>
                <td className="px-4 py-3 text-sm mono font-medium text-foreground">{formatCurrency(booking.cost)}</td>
                <td className="px-4 py-3 text-sm mono text-secondary">{booking.pax}</td>
                <td className="px-4 py-3"><StatusBadge status={booking.status} /></td>
              </tr>
            ))}
          </DataTable>
        ) : (
          <div className="border border-border rounded-lg p-8 text-center">
            <p className="text-sm text-muted">No supplier bookings yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
