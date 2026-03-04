"use client";

import { useTourist, useDocuments } from "@/hooks/use-mock-data";
import { PageHeader, StatusBadge, LoadingSkeleton } from "@/components/shared";
import { formatDate, cn } from "@/lib/utils";
import { DOCUMENT_STATUS_LABELS } from "@/lib/constants";
import { FileText, Heart, Shield, Plane, Upload, CheckCircle2, File } from "lucide-react";
import type { DocumentStatus } from "@/types";
import type { LucideIcon } from "lucide-react";

const TOURIST_ID = "t-1";

interface DocumentCardConfig {
  type: "passport" | "medical_form" | "insurance" | "flight_info";
  label: string;
  icon: LucideIcon;
  statusKey: "passportStatus" | "medicalFormStatus" | "insuranceStatus" | "flightInfoStatus";
}

const documentCards: DocumentCardConfig[] = [
  { type: "passport", label: "Passport", icon: FileText, statusKey: "passportStatus" },
  { type: "medical_form", label: "Medical Form", icon: Heart, statusKey: "medicalFormStatus" },
  { type: "insurance", label: "Insurance", icon: Shield, statusKey: "insuranceStatus" },
  { type: "flight_info", label: "Flight Information", icon: Plane, statusKey: "flightInfoStatus" },
];

export default function DocumentsPage() {
  const { data: tourist, loading: touristLoading } = useTourist(TOURIST_ID);
  const { data: docs, loading: docsLoading } = useDocuments(TOURIST_ID);

  const loading = touristLoading || docsLoading;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-48" />
        <LoadingSkeleton variant="card" count={4} />
      </div>
    );
  }

  if (!tourist || !docs) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Documents"
        description="Upload and manage your travel documents"
      />

      <div className="space-y-4">
        {documentCards.map((card) => {
          const Icon = card.icon;
          const status = tourist[card.statusKey] as DocumentStatus;
          const uploadedDoc = docs.find((d) => d.type === card.type);
          const isApproved = status === "approved";
          const hasFile = !!uploadedDoc;

          return (
            <div
              key={card.type}
              className="rounded-xl border border-border bg-background overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex items-center justify-center h-10 w-10 rounded-lg",
                      isApproved ? "bg-success-bg" : "bg-elevated"
                    )}
                  >
                    {isApproved ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : (
                      <Icon className="h-5 w-5 text-secondary" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{card.label}</h3>
                    {hasFile && (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <File className="h-3 w-3 text-muted" />
                        <span className="text-xs text-muted">{uploadedDoc.fileName}</span>
                      </div>
                    )}
                  </div>
                </div>
                <StatusBadge status={status} />
              </div>

              {/* File Info or Upload Area */}
              <div className="border-t border-border px-4 py-3 bg-surface">
                {hasFile ? (
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      {uploadedDoc.uploadedAt && (
                        <p className="text-xs text-muted">
                          Uploaded {formatDate(uploadedDoc.uploadedAt)}
                        </p>
                      )}
                      {uploadedDoc.reviewedAt && (
                        <p className="text-xs text-muted">
                          Reviewed {formatDate(uploadedDoc.reviewedAt)}
                        </p>
                      )}
                      {uploadedDoc.notes && (
                        <p className="text-xs text-secondary mt-1">{uploadedDoc.notes}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      className="text-xs font-medium text-secondary hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-border-hover"
                    >
                      {isApproved ? "View" : "Replace"}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="w-full"
                  >
                    <div className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-border rounded-lg hover:border-border-hover hover:bg-elevated transition-colors cursor-pointer">
                      <Upload className="h-6 w-6 text-muted mb-2" />
                      <p className="text-sm text-secondary font-medium">
                        Click to upload or drag & drop
                      </p>
                      <p className="text-xs text-muted mt-1">
                        PDF, JPG, or PNG up to 10MB
                      </p>
                    </div>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
