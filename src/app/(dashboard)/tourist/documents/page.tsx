"use client";

import { useTourist, useDocuments } from "@/hooks/use-mock-data";
import { PageHeader, StatusBadge, LoadingSkeleton, AIAssistantCard, TimelineStep } from "@/components/shared";
import { formatDate, cn } from "@/lib/utils";
import {
  FileText,
  Heart,
  Shield,
  Plane,
  Upload,
  CheckCircle2,
  File,
  Sparkles,
  PartyPopper,
} from "lucide-react";
import type { DocumentStatus } from "@/types";
import type { LucideIcon } from "lucide-react";
import { docAssistantMessages, docAssistantTips } from "@/data/ai-responses";

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

const timelineSteps = [
  { title: "Upload Document", description: "Upload a clear copy of your document" },
  { title: "Under Review", description: "Our team reviews your submission" },
  { title: "Approved", description: "Document verified and approved" },
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

  const allApproved =
    tourist.passportStatus === "approved" &&
    tourist.medicalFormStatus === "approved" &&
    tourist.insuranceStatus === "approved" &&
    tourist.flightInfoStatus === "approved";

  const approvedCount = [
    tourist.passportStatus,
    tourist.medicalFormStatus,
    tourist.insuranceStatus,
    tourist.flightInfoStatus,
  ].filter((s) => s === "approved").length;

  // Find relevant AI insight
  const aiInsight = docAssistantMessages.find((msg) => {
    if (msg.category === "passport" && tourist.passportStatus !== "approved") return true;
    if (msg.category === "flight" && tourist.flightInfoStatus === "not_started") return true;
    if (msg.category === "insurance" && tourist.insuranceStatus !== "approved") return true;
    return false;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Documents"
        description="Upload and manage your travel documents"
      >
        <span className="text-xs font-medium text-secondary">
          {approvedCount}/4 approved
        </span>
      </PageHeader>

      {/* AI Document Assistant */}
      {aiInsight && (
        <AIAssistantCard
          message={aiInsight.content}
          category="Document Assistant"
          variant="gold"
        />
      )}

      {/* Completion celebration */}
      {allApproved && (
        <div className="rounded-xl border border-success/20 bg-success-bg p-6 text-center space-y-2">
          <PartyPopper className="h-8 w-8 text-success mx-auto" />
          <h3 className="text-sm font-semibold text-success">All Documents Approved!</h3>
          <p className="text-xs text-success/80">
            You&apos;re all set for your Holy Land journey. All four documents have been verified and approved.
          </p>
        </div>
      )}

      {/* Document Timeline */}
      <div className="rounded-xl border border-border bg-background p-4 space-y-3">
        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold" />
          How it works
        </h3>
        <div>
          {timelineSteps.map((step, index) => (
            <TimelineStep
              key={step.title}
              title={step.title}
              description={step.description}
              status={index < approvedCount ? "completed" : index === approvedCount ? "current" : "upcoming"}
              isLast={index === timelineSteps.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Document Cards */}
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
                  <button type="button" className="w-full">
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

      {/* Smart Tips */}
      <div className="rounded-xl border border-border bg-gold-bg p-4 space-y-3">
        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold" />
          Smart Tips
        </h3>
        <ul className="space-y-2">
          {docAssistantTips.map((tip) => (
            <li key={tip} className="flex items-start gap-2 text-xs text-secondary">
              <span className="text-gold mt-0.5">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
