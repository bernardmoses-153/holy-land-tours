"use client";

import { useState, useMemo } from "react";
import { Globe, Star, Award, Calendar, Phone, MessageCircle, Mail } from "lucide-react";
import { guides, guideAssignments, groups } from "@/data/mock-data";
import { PageHeader, SearchInput, DataTable, StatusBadge, GuideProfileCard } from "@/components/shared";
import { formatCurrency, formatDate, getInitials, cn } from "@/lib/utils";

export default function GuidesPage() {
  const [search, setSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState<string>("all");

  // Collect all unique languages
  const allLanguages = useMemo(() => {
    const langs = new Set<string>();
    guides.forEach((g) => g.languages.forEach((l) => langs.add(l)));
    return Array.from(langs).sort();
  }, []);

  const filtered = useMemo(() => {
    return guides.filter((g) => {
      const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      const matchesLang = languageFilter === "all" || g.languages.includes(languageFilter);
      return matchesSearch && matchesLang;
    });
  }, [search, languageFilter]);

  return (
    <div>
      <PageHeader
        title="Guide Roster"
        description="Manage your licensed tour guides, their languages, and group assignments."
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by name or specialty..."
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setLanguageFilter("all")}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap",
              languageFilter === "all"
                ? "border-foreground bg-foreground text-background"
                : "border-border text-secondary hover:border-border-hover"
            )}
          >
            All Languages
          </button>
          {allLanguages.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setLanguageFilter(lang)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1",
                languageFilter === lang
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-secondary hover:border-border-hover"
              )}
            >
              <Globe className="h-3 w-3" />
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {filtered.map((guide) => {
          const assignments = guideAssignments.filter((ga) => ga.guideId === guide.id);
          const activeAssignments = assignments.filter((a) => a.status !== "completed");

          return (
            <div
              key={guide.id}
              className="rounded-xl border border-border bg-background p-5 space-y-4 hover:border-border-hover transition-colors"
            >
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gold-bg text-gold text-lg font-bold flex-shrink-0">
                  {getInitials(guide.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-foreground">{guide.name}</h3>
                    <div className="flex items-center gap-1 text-sm font-medium text-gold">
                      <Star className="h-3.5 w-3.5 fill-gold" />
                      {guide.rating}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-secondary">
                    <span className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {guide.languages.join(", ")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {guide.toursCompleted}+ tours
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-secondary line-clamp-2">{guide.bio}</p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1.5">
                {guide.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="rounded-full bg-elevated px-2.5 py-1 text-[10px] font-medium text-secondary"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              {/* Contact */}
              <div className="flex gap-3 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {guide.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  WhatsApp
                </span>
              </div>

              {/* Assignments */}
              {activeAssignments.length > 0 && (
                <div className="pt-3 border-t border-border space-y-2">
                  <p className="text-xs font-medium text-foreground">Active Assignments</p>
                  {activeAssignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between rounded-lg bg-elevated px-3 py-2">
                      <div>
                        <p className="text-xs font-medium text-foreground">{assignment.groupName}</p>
                        <p className="text-[10px] text-muted">
                          {formatDate(assignment.startDate)} &mdash; {formatDate(assignment.endDate)}
                        </p>
                      </div>
                      <div className="text-right">
                        <StatusBadge status={assignment.status} />
                        <p className="text-[10px] text-muted mono mt-0.5">{formatCurrency(assignment.dailyRate)}/day</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* License */}
              <p className="text-[10px] text-muted">License #{guide.licenseNumber}</p>
            </div>
          );
        })}
      </div>

      {/* Assignment History Table */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">All Guide Assignments</h3>
        <DataTable headers={["Guide", "Group", "Dates", "Daily Rate", "Status"]}>
          {guideAssignments.map((assignment) => (
            <tr key={assignment.id} className="hover:bg-surface transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-foreground">{assignment.guideName}</td>
              <td className="px-4 py-3 text-sm text-secondary">{assignment.groupName}</td>
              <td className="px-4 py-3 text-xs mono text-secondary">
                {formatDate(assignment.startDate)} — {formatDate(assignment.endDate)}
              </td>
              <td className="px-4 py-3 text-sm mono font-medium text-foreground">{formatCurrency(assignment.dailyRate)}</td>
              <td className="px-4 py-3"><StatusBadge status={assignment.status} /></td>
            </tr>
          ))}
        </DataTable>
      </div>
    </div>
  );
}
