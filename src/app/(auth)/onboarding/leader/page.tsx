"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, Building, Map, Users, Rocket, Sparkles, Globe, Mail, DollarSign, QrCode, Facebook, Printer, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { useLeaderOnboarding } from "@/hooks/use-onboarding";
import { itineraries } from "@/data/mock-data";
import {
  leaderTitles,
  organizationTypes,
  groupSizeOptions,
  seasonOptions,
  tourStyles,
  leaderAIMessages,
  generateGroupNameSuggestions,
  generateInviteMessage,
  groupInvites,
} from "@/data/onboarding-data";
import { holyLandImages } from "@/data/images";
import {
  OnboardingProgress,
  OnboardingStep,
  FormSection,
  ImageHero,
  AIAssistantCard,
  ItineraryPreviewCard,
  GroupPreviewCard,
  InviteLinkShare,
  CelebrationOverlay,
  TimelineStep,
} from "@/components/shared";

const inputStyles =
  "w-full rounded-lg border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2";

const stepLabels = ["Welcome", "Organization", "Tour", "Group", "Launch"];

export default function LeaderOnboardingPage() {
  const router = useRouter();
  const { login } = useAuth();
  const {
    data,
    updatePersonalInfo,
    updateOrganizationInfo,
    updateTourPreferences,
    updateGroupSetup,
    nextStep,
    prevStep,
    complete,
    updateData,
  } = useLeaderOnboarding();

  const [showCelebration, setShowCelebration] = useState(false);
  const [pricingConfig, setPricingConfig] = useState({
    pricePerPerson: 2800,
    allowInstallments: true,
    installmentOptions: [6, 12] as number[],
    depositAmount: 500,
    pastorFreeTrip: true,
    spouseFreeTrip: true,
  });
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const step = data.step;

  // Computed
  const selectedItinerary = itineraries.find(
    (i) => i.id === data.tourPreferences.itineraryId
  );
  const invite = groupInvites[0]; // Default to first invite for demo

  // AI message logic
  function getAIMessage(): string {
    if (step === 1) {
      const titleKey = data.personalInfo.title;
      if (titleKey && leaderAIMessages.titleResponses[titleKey]) {
        return leaderAIMessages.titleResponses[titleKey];
      }
      return leaderAIMessages.welcome;
    }
    if (step === 2) {
      const sizeKey = data.organizationInfo.estimatedSize;
      if (sizeKey && leaderAIMessages.sizeResponses[sizeKey]) {
        return leaderAIMessages.sizeResponses[sizeKey];
      }
      return "Tell us about your organization so we can tailor the experience.";
    }
    if (step === 3) {
      const itinKey = data.tourPreferences.itineraryId;
      if (itinKey && leaderAIMessages.itineraryResponses[itinKey]) {
        return leaderAIMessages.itineraryResponses[itinKey];
      }
      return "Choose the itinerary that best fits your group's interests.";
    }
    if (step === 4) return leaderAIMessages.groupSetup;
    return leaderAIMessages.launch;
  }

  function handleComplete() {
    setShowCelebration(true);
    complete();
    login("leader");
  }

  function handleGoToDashboard() {
    router.push("/leader");
  }

  // Validation
  function canProceed(): boolean {
    if (step === 1) {
      return !!(data.personalInfo.name && data.personalInfo.title && data.personalInfo.phone);
    }
    if (step === 2) {
      return !!(data.organizationInfo.name && data.organizationInfo.type && data.organizationInfo.estimatedSize);
    }
    if (step === 3) {
      return !!(data.tourPreferences.itineraryId && data.tourPreferences.season);
    }
    if (step === 4) {
      return !!(data.groupSetup.name && data.groupSetup.description);
    }
    return true;
  }

  function handleSuggestNames() {
    const suggestions = generateGroupNameSuggestions(
      data.organizationInfo.name || "My Group",
      data.tourPreferences.season || "spring"
    );
    updateGroupSetup({ name: suggestions[0] });
  }

  function handleGenerateInvite() {
    const message = generateInviteMessage(
      data.personalInfo.name || "Leader",
      data.groupSetup.name || "Holy Land Tour"
    );
    updateGroupSetup({ inviteMessage: message });
  }

  return (
    <div className="space-y-6">
      <CelebrationOverlay show={showCelebration} />

      {/* Progress */}
      <OnboardingProgress
        currentStep={step}
        totalSteps={5}
        labels={stepLabels}
      />

      {/* Step 1: Welcome + Personal Info */}
      {step === 1 && (
        <OnboardingStep
          title="Welcome, future group leader!"
          subtitle="Let's set up your Holy Land tour in just a few steps."
          onNext={nextStep}
          nextDisabled={!canProceed()}
          showBack={false}
        >
          <ImageHero
            imageUrl={holyLandImages.jerusalem.url}
            alt="Jerusalem panorama"
            height="sm"
          />

          <AIAssistantCard message={getAIMessage()} variant="gold" />

          <FormSection title="About You" icon={User}>
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={data.personalInfo.name}
                onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                placeholder="Your full name"
                className={cn(inputStyles)}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="title" className="block text-sm font-medium text-foreground">
                Title
              </label>
              <select
                id="title"
                value={data.personalInfo.title}
                onChange={(e) => updatePersonalInfo({ title: e.target.value })}
                className={cn(inputStyles)}
              >
                <option value="">Select your title</option>
                {leaderTitles.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="phone" className="block text-sm font-medium text-foreground">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className={cn(inputStyles)}
              />
            </div>
          </FormSection>
        </OnboardingStep>
      )}

      {/* Step 2: Organization Details */}
      {step === 2 && (
        <OnboardingStep
          title="Your Organization"
          subtitle="Tell us about the community you're bringing."
          onNext={nextStep}
          onBack={prevStep}
          nextDisabled={!canProceed()}
        >
          <AIAssistantCard message={getAIMessage()} />

          <FormSection title="Organization Details" icon={Building}>
            <div className="space-y-1.5">
              <label htmlFor="orgName" className="block text-sm font-medium text-foreground">
                Organization Name
              </label>
              <input
                id="orgName"
                type="text"
                value={data.organizationInfo.name}
                onChange={(e) => updateOrganizationInfo({ name: e.target.value })}
                placeholder="e.g. Grace Community Church"
                className={cn(inputStyles)}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="orgType" className="block text-sm font-medium text-foreground">
                Type
              </label>
              <select
                id="orgType"
                value={data.organizationInfo.type}
                onChange={(e) => updateOrganizationInfo({ type: e.target.value })}
                className={cn(inputStyles)}
              >
                <option value="">Select type</option>
                {organizationTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </FormSection>

          {/* Group size as tiles */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Estimated Group Size
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {groupSizeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateOrganizationInfo({ estimatedSize: option.value })}
                  className={cn(
                    "rounded-lg border p-3 text-center transition-all",
                    data.organizationInfo.estimatedSize === option.value
                      ? "border-foreground bg-surface shadow-sm"
                      : "border-border hover:border-border-hover"
                  )}
                >
                  <p className="text-sm font-semibold text-foreground">{option.label}</p>
                  <p className="text-[10px] text-muted">{option.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="website" className="block text-sm font-medium text-foreground">
              Website <span className="text-muted">(optional)</span>
            </label>
            <input
              id="website"
              type="url"
              value={data.organizationInfo.website || ""}
              onChange={(e) => updateOrganizationInfo({ website: e.target.value })}
              placeholder="https://yourchurch.org"
              className={cn(inputStyles)}
            />
          </div>
        </OnboardingStep>
      )}

      {/* Step 3: Tour Preferences */}
      {step === 3 && (
        <OnboardingStep
          title="Tour Preferences"
          subtitle="Choose the perfect journey for your group."
          onNext={nextStep}
          onBack={prevStep}
          nextDisabled={!canProceed()}
        >
          <AIAssistantCard message={getAIMessage()} />

          {/* Itinerary selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Select an Itinerary
            </label>
            <div className="space-y-2">
              {itineraries.map((itin) => (
                <ItineraryPreviewCard
                  key={itin.id}
                  itinerary={itin}
                  selected={data.tourPreferences.itineraryId === itin.id}
                  onSelect={() => updateTourPreferences({ itineraryId: itin.id })}
                />
              ))}
            </div>
          </div>

          {/* Season tiles */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Preferred Season
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {seasonOptions.map((season) => (
                <button
                  key={season.value}
                  type="button"
                  onClick={() => updateTourPreferences({ season: season.value })}
                  className={cn(
                    "rounded-lg border p-3 text-center transition-all",
                    data.tourPreferences.season === season.value
                      ? "border-foreground bg-surface shadow-sm"
                      : "border-border hover:border-border-hover"
                  )}
                >
                  <p className="text-sm font-semibold text-foreground">{season.label}</p>
                  <p className="text-[10px] text-muted">{season.months}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Tour style checkboxes */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Tour Style <span className="text-muted">(select all that apply)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {tourStyles.map((style) => {
                const isSelected = data.tourPreferences.style.includes(style);
                return (
                  <button
                    key={style}
                    type="button"
                    onClick={() => {
                      const current = data.tourPreferences.style;
                      updateTourPreferences({
                        style: isSelected
                          ? current.filter((s) => s !== style)
                          : [...current, style],
                      });
                    }}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                      isSelected
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-secondary hover:border-border-hover"
                    )}
                  >
                    {style}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing & Payment Plan Configuration */}
          <FormSection title="Pricing & Payment Plans" icon={DollarSign}>
            <div className="space-y-1.5">
              <label htmlFor="price" className="block text-sm font-medium text-foreground">
                Trip Price Per Person
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
                <input
                  id="price"
                  type="number"
                  value={pricingConfig.pricePerPerson}
                  onChange={(e) => setPricingConfig(prev => ({ ...prev, pricePerPerson: Number(e.target.value) }))}
                  className={cn(inputStyles, "pl-8")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pricingConfig.allowInstallments}
                  onChange={(e) => setPricingConfig(prev => ({ ...prev, allowInstallments: e.target.checked }))}
                  className="rounded border-border h-4 w-4"
                />
                <span className="text-sm font-medium text-foreground">Allow installment payments</span>
              </label>

              {pricingConfig.allowInstallments && (
                <div className="ml-6 space-y-2">
                  <p className="text-xs text-muted">Payment plan options:</p>
                  <div className="flex gap-2">
                    {[6, 12].map((months) => {
                      const isSelected = pricingConfig.installmentOptions.includes(months);
                      return (
                        <button
                          key={months}
                          type="button"
                          onClick={() => {
                            setPricingConfig(prev => ({
                              ...prev,
                              installmentOptions: isSelected
                                ? prev.installmentOptions.filter(m => m !== months)
                                : [...prev.installmentOptions, months].sort((a, b) => a - b),
                            }));
                          }}
                          className={cn(
                            "rounded-lg border px-4 py-2 text-xs font-medium transition-all",
                            isSelected
                              ? "border-foreground bg-foreground text-background"
                              : "border-border text-secondary hover:border-border-hover"
                          )}
                        >
                          {months} monthly
                        </button>
                      );
                    })}
                  </div>
                  {pricingConfig.installmentOptions.length > 0 && (
                    <p className="text-xs text-olive">
                      Example: ${Math.ceil((pricingConfig.pricePerPerson - pricingConfig.depositAmount) / pricingConfig.installmentOptions[pricingConfig.installmentOptions.length - 1])}/month for {pricingConfig.installmentOptions[pricingConfig.installmentOptions.length - 1]} months
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="deposit" className="block text-sm font-medium text-foreground">
                Required Deposit
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
                <input
                  id="deposit"
                  type="number"
                  value={pricingConfig.depositAmount}
                  onChange={(e) => setPricingConfig(prev => ({ ...prev, depositAmount: Number(e.target.value) }))}
                  className={cn(inputStyles, "pl-8")}
                />
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-border">
              <p className="text-xs font-medium text-foreground uppercase tracking-wider">Leader Benefits</p>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pricingConfig.pastorFreeTrip}
                  onChange={(e) => setPricingConfig(prev => ({ ...prev, pastorFreeTrip: e.target.checked }))}
                  className="rounded border-border h-4 w-4"
                />
                <span className="text-sm text-foreground">Free trip for group leader</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pricingConfig.spouseFreeTrip}
                  onChange={(e) => setPricingConfig(prev => ({ ...prev, spouseFreeTrip: e.target.checked }))}
                  className="rounded border-border h-4 w-4"
                />
                <span className="text-sm text-foreground">Free trip for spouse</span>
              </label>
            </div>
          </FormSection>

          <div className="space-y-1.5">
            <label htmlFor="notes" className="block text-sm font-medium text-foreground">
              Special Notes <span className="text-muted">(optional)</span>
            </label>
            <textarea
              id="notes"
              value={data.tourPreferences.notes || ""}
              onChange={(e) => updateTourPreferences({ notes: e.target.value })}
              placeholder="Any special requests or considerations..."
              rows={3}
              className={cn(inputStyles, "resize-none")}
            />
          </div>
        </OnboardingStep>
      )}

      {/* Step 4: Group Setup */}
      {step === 4 && (
        <OnboardingStep
          title="Set Up Your Group"
          subtitle="Create your group's identity and invite message."
          onNext={() => {
            nextStep();
            setShowCelebration(true);
          }}
          onBack={prevStep}
          nextLabel="Launch Group"
          nextDisabled={!canProceed()}
        >
          <AIAssistantCard message={getAIMessage()} variant="gold" />

          <FormSection title="Group Identity" icon={Users}>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="groupName" className="block text-sm font-medium text-foreground">
                  Group Name
                </label>
                <button
                  type="button"
                  onClick={handleSuggestNames}
                  className="flex items-center gap-1 text-xs font-medium text-gold hover:opacity-80 transition-opacity"
                >
                  <Sparkles className="h-3 w-3" />
                  Suggest Names
                </button>
              </div>
              <input
                id="groupName"
                type="text"
                value={data.groupSetup.name}
                onChange={(e) => updateGroupSetup({ name: e.target.value })}
                placeholder="e.g. Grace Church Holy Land 2027"
                className={cn(inputStyles)}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="groupDesc" className="block text-sm font-medium text-foreground">
                Description
              </label>
              <textarea
                id="groupDesc"
                value={data.groupSetup.description}
                onChange={(e) => updateGroupSetup({ description: e.target.value })}
                placeholder="A short description for potential travelers..."
                rows={3}
                className={cn(inputStyles, "resize-none")}
              />
            </div>
          </FormSection>

          {/* Invite message */}
          <FormSection title="Invite Message" icon={Mail}>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="inviteMsg" className="block text-sm font-medium text-foreground">
                  Personal Invitation
                </label>
                <button
                  type="button"
                  onClick={handleGenerateInvite}
                  className="flex items-center gap-1 text-xs font-medium text-gold hover:opacity-80 transition-opacity"
                >
                  <Sparkles className="h-3 w-3" />
                  Generate Message
                </button>
              </div>
              <textarea
                id="inviteMsg"
                value={data.groupSetup.inviteMessage}
                onChange={(e) => updateGroupSetup({ inviteMessage: e.target.value })}
                placeholder="Write a personal message that will be shown to potential travelers..."
                rows={6}
                className={cn(inputStyles, "resize-none")}
              />
            </div>
          </FormSection>

          {/* Live preview */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Live Preview</p>
            <GroupPreviewCard
              name={data.groupSetup.name}
              leaderName={data.personalInfo.name}
              leaderTitle={data.personalInfo.title}
              description={data.groupSetup.description}
              itineraryName={selectedItinerary?.name}
              season={data.tourPreferences.season}
              estimatedSize={data.organizationInfo.estimatedSize}
            />
          </div>
        </OnboardingStep>
      )}

      {/* Step 5: Share & Launch */}
      {step === 5 && (
        <div className="animate-fade-in space-y-6">
          <ImageHero
            imageUrl={holyLandImages.sunrise.url}
            alt="Golden sunrise"
            height="sm"
          >
            <div className="text-center text-white space-y-2">
              <p className="text-sm font-semibold tracking-widest uppercase opacity-80">
                Congratulations
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Your Group is Live!
              </h1>
            </div>
          </ImageHero>

          <AIAssistantCard message={getAIMessage()} variant="gold" />

          {/* Group preview */}
          <GroupPreviewCard
            name={data.groupSetup.name}
            leaderName={data.personalInfo.name}
            leaderTitle={data.personalInfo.title}
            description={data.groupSetup.description}
            itineraryName={selectedItinerary?.name}
            season={data.tourPreferences.season}
            estimatedSize={data.organizationInfo.estimatedSize}
          />

          {/* Invite sharing */}
          <InviteLinkShare slug={invite.slug} code={invite.code} />

          {/* Enhanced Sharing Tools */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Share Your Trip</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(`Join me on a Holy Land pilgrimage! ${data.groupSetup.name} — register at holylandtours.com/trip/${invite.slug}`)}`, '_blank');
                }}
                className="flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-secondary hover:bg-surface transition-colors"
              >
                <Facebook className="h-4 w-4" />
                Share to Facebook
              </button>
              <button
                type="button"
                onClick={() => {
                  const emailBody = `Subject: Join Our Holy Land Trip!\n\nDear Friends,\n\n${data.groupSetup.inviteMessage || `I'm organizing a trip to the Holy Land and would love for you to join!`}\n\nRegister here: holylandtours.com/trip/${invite.slug}\n\nPrice: $${pricingConfig.pricePerPerson}/person (installments available)\n\n${data.personalInfo.name}`;
                  navigator.clipboard.writeText(emailBody);
                  setCopiedEmail(true);
                  setTimeout(() => setCopiedEmail(false), 2000);
                }}
                className="flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-secondary hover:bg-surface transition-colors"
              >
                {copiedEmail ? <Check className="h-4 w-4 text-green-600" /> : <Mail className="h-4 w-4" />}
                {copiedEmail ? "Copied!" : "Email Template"}
              </button>
              <button
                type="button"
                onClick={() => {
                  // Simulated print bulletin
                  window.print();
                }}
                className="flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-secondary hover:bg-surface transition-colors"
              >
                <Printer className="h-4 w-4" />
                Print Bulletin
              </button>
              <div className="flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-secondary bg-surface">
                <QrCode className="h-4 w-4" />
                QR Code
              </div>
            </div>
          </div>

          {/* Trip Page Preview */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Your Public Trip Page</p>
            <div className="rounded-xl border border-border overflow-hidden">
              <div
                className="h-32 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${holyLandImages.jerusalem.url})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <div>
                    <p className="text-white text-sm font-bold">{data.groupSetup.name || "Your Trip"}</p>
                    <p className="text-white/70 text-xs">Led by {data.personalInfo.title} {data.personalInfo.name}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold mono text-foreground">${pricingConfig.pricePerPerson}</span>
                  {pricingConfig.allowInstallments && pricingConfig.installmentOptions.length > 0 && (
                    <span className="text-xs text-secondary">
                      or ${Math.ceil((pricingConfig.pricePerPerson - pricingConfig.depositAmount) / pricingConfig.installmentOptions[pricingConfig.installmentOptions.length - 1])}/mo
                    </span>
                  )}
                </div>
                <button className="w-full rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background">
                  Reserve Your Spot &rarr;
                </button>
              </div>
            </div>
            <p className="text-xs text-muted text-center">
              This is how your congregation sees the trip page
            </p>
          </div>

          {/* What's Next timeline */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">What&apos;s Next</h3>
            <div className="space-y-0">
              <TimelineStep
                title="Share your invite link"
                description="Send to your community via email, WhatsApp, or social media"
                icon={Rocket}
                status="current"
              />
              <TimelineStep
                title="Tourists join your group"
                description="They'll register, review the itinerary, and secure their spot"
                icon={Users}
                status="upcoming"
              />
              <TimelineStep
                title="Track progress"
                description="Monitor sign-ups, documents, and payments from your dashboard"
                icon={Map}
                status="upcoming"
              />
              <TimelineStep
                title="Depart for the Holy Land!"
                description="Lead your group on the journey of a lifetime"
                icon={Globe}
                status="upcoming"
                isLast
              />
            </div>
          </div>

          {/* Go to dashboard */}
          <button
            type="button"
            onClick={() => {
              handleComplete();
              handleGoToDashboard();
            }}
            className="w-full rounded-lg bg-foreground px-4 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

