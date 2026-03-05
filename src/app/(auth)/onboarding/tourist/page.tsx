"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useMemo } from "react";
import {
  User,
  Users,
  Phone,
  Heart,
  CreditCard,
  PartyPopper,
  Calendar,
  FileText,
  Stethoscope,
  Plane,
  Shield,
  BedDouble,
  Check,
  MapPin,
  Sparkles,
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { useTouristOnboarding } from "@/hooks/use-onboarding";
import { getGroupInviteBySlug } from "@/data/onboarding-data";
import { getGroupById, getLeaderById, getItineraryById, getTouristsByGroup } from "@/data/mock-data";
import { holyLandImages } from "@/data/images";
import {
  dietaryOptions,
  roomOptions,
  relationshipOptions,
  touristAIMessages,
  depositConfig,
} from "@/data/onboarding-data";
import {
  OnboardingProgress,
  OnboardingStep,
  FormSection,
  ImageHero,
  AIAssistantCard,
  SafetyCard,
  DepositCard,
  CelebrationOverlay,
  TimelineStep,
  CountdownTimer,
  GroupMemberGrid,
  TouristAvatar,
} from "@/components/shared";

const inputStyles =
  "w-full rounded-lg border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2";

const stepLabels = ["Welcome", "Info", "Safety", "Deposit", "Welcome!"];

function TouristOnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupSlug = searchParams.get("group") || "";
  const { login } = useAuth();
  const {
    data,
    updatePersonalInfo,
    updateEmergencyContact,
    updatePreferences,
    updateData,
    nextStep,
    prevStep,
    complete,
  } = useTouristOnboarding();

  const [showCelebration, setShowCelebration] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Resolve group data
  const invite = useMemo(() => getGroupInviteBySlug(groupSlug || data.groupSlug), [groupSlug, data.groupSlug]);
  const group = useMemo(() => invite ? getGroupById(invite.groupId) : null, [invite]);
  const leader = useMemo(() => group ? getLeaderById(group.leaderId) : null, [group]);
  const itinerary = useMemo(() => group ? getItineraryById(group.itineraryId) : null, [group]);
  const tourists = useMemo(() => group ? getTouristsByGroup(group.id) : [], [group]);

  const spotsRemaining = group ? group.maxCapacity - group.currentSize : 0;
  const members = tourists.map((t) => ({ id: t.id, name: t.name, avatar: t.avatar }));

  // Set groupSlug on first render if from query
  if (groupSlug && data.groupSlug !== groupSlug) {
    updateData({ groupSlug });
  }

  const step = data.step;

  function getAIMessage(): string {
    if (step === 2) return touristAIMessages.passport;
    if (step === 3) return touristAIMessages.safety;
    if (step === 4) return touristAIMessages.deposit(group?.currentSize || 0);
    return touristAIMessages.welcome;
  }

  function canProceed(): boolean {
    if (step === 1) return true; // excitement step, no required fields
    if (step === 2) {
      return !!(data.emergencyContact.name && data.emergencyContact.phone && data.emergencyContact.relationship);
    }
    if (step === 3) return !!(data.preferences.room);
    if (step === 4) return termsAccepted;
    return true;
  }

  function handleSecureSpot() {
    updateData({ depositPaid: true });
    nextStep();
    setShowCelebration(true);
  }

  function handleComplete() {
    complete();
    login("tourist");
    router.push("/tourist");
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

      {/* Step 1: Excitement Moment */}
      {step === 1 && (
        <div className="animate-fade-in space-y-6">
          <ImageHero
            imageUrl={holyLandImages.jerusalem.url}
            alt="Jerusalem golden dome"
            height="lg"
            className="animate-slow-zoom"
          >
            <div className="text-center text-white space-y-4">
              <p className="text-sm font-semibold tracking-widest uppercase opacity-80">
                It&apos;s Official
              </p>
              <h1 className="font-display text-3xl sm:text-4xl text-white">
                You&apos;re Going to the Holy Land!
              </h1>
              {group && (
                <>
                  <CountdownTimer targetDate={group.startDate} />
                  <p className="text-sm text-white/80">
                    with {leader?.name || "your leader"} and {group.name}
                  </p>
                </>
              )}
            </div>
          </ImageHero>

          {members.length > 0 && (
            <div className="rounded-xl border border-border p-4 space-y-2">
              <p className="text-xs font-medium text-muted">Your fellow travelers</p>
              <GroupMemberGrid members={members} maxDisplay={8} />
            </div>
          )}

          <button
            type="button"
            onClick={nextStep}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Let&apos;s Get Started
            <PartyPopper className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Step 2: Personal + Emergency Info */}
      {step === 2 && (
        <OnboardingStep
          title="Tell Us About You"
          subtitle="We need a few details to prepare for your journey."
          onNext={nextStep}
          onBack={prevStep}
          nextDisabled={!canProceed()}
        >
          <FormSection title="About You" icon={User} description="Personal details for travel arrangements">
            <div className="space-y-1.5">
              <label htmlFor="dob" className="block text-sm font-medium text-foreground">
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                value={data.personalInfo.dob || ""}
                onChange={(e) => updatePersonalInfo({ dob: e.target.value })}
                className={cn(inputStyles)}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="passport" className="block text-sm font-medium text-foreground">
                Passport Number <span className="text-muted">(or add later)</span>
              </label>
              <input
                id="passport"
                type="text"
                value={data.personalInfo.passportNumber || ""}
                onChange={(e) => updatePersonalInfo({ passportNumber: e.target.value })}
                placeholder="Optional — you can add this later"
                className={cn(inputStyles)}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="passportExpiry" className="block text-sm font-medium text-foreground">
                Passport Expiry Date
              </label>
              <input
                id="passportExpiry"
                type="date"
                value={data.personalInfo.passportExpiry || ""}
                onChange={(e) => updatePersonalInfo({ passportExpiry: e.target.value })}
                className={cn(inputStyles)}
              />
            </div>

            <AIAssistantCard message={getAIMessage()} />
          </FormSection>

          <FormSection title="In Case of Emergency" icon={Phone} description="Someone we can reach if needed">
            <div className="space-y-1.5">
              <label htmlFor="emergName" className="block text-sm font-medium text-foreground">
                Contact Name
              </label>
              <input
                id="emergName"
                type="text"
                value={data.emergencyContact.name}
                onChange={(e) => updateEmergencyContact({ name: e.target.value })}
                placeholder="Full name"
                className={cn(inputStyles)}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="emergPhone" className="block text-sm font-medium text-foreground">
                Contact Phone
              </label>
              <input
                id="emergPhone"
                type="tel"
                value={data.emergencyContact.phone}
                onChange={(e) => updateEmergencyContact({ phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className={cn(inputStyles)}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="emergRelation" className="block text-sm font-medium text-foreground">
                Relationship
              </label>
              <select
                id="emergRelation"
                value={data.emergencyContact.relationship}
                onChange={(e) => updateEmergencyContact({ relationship: e.target.value })}
                className={cn(inputStyles)}
              >
                <option value="">Select relationship</option>
                {relationshipOptions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </FormSection>

          {/* Dietary restrictions */}
          <FormSection title="Dietary Needs" icon={Heart}>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map((option) => {
                const isSelected = data.preferences.dietary.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      const current = data.preferences.dietary;
                      if (option === "No restrictions") {
                        updatePreferences({ dietary: isSelected ? [] : ["No restrictions"] });
                      } else {
                        updatePreferences({
                          dietary: isSelected
                            ? current.filter((d) => d !== option)
                            : [...current.filter((d) => d !== "No restrictions"), option],
                        });
                      }
                    }}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                      isSelected
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-secondary hover:border-border-hover"
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {data.preferences.dietary.length > 0 &&
              !data.preferences.dietary.includes("No restrictions") && (
                <AIAssistantCard
                  message={touristAIMessages.dietary(data.preferences.dietary.join(", "))}
                />
              )}
          </FormSection>

          <div className="space-y-1.5">
            <label htmlFor="mobility" className="block text-sm font-medium text-foreground">
              Mobility Notes <span className="text-muted">(optional)</span>
            </label>
            <textarea
              id="mobility"
              value={data.preferences.mobility || ""}
              onChange={(e) => updatePreferences({ mobility: e.target.value })}
              placeholder="Any mobility considerations we should know about..."
              rows={2}
              className={cn(inputStyles, "resize-none")}
            />
          </div>
        </OnboardingStep>
      )}

      {/* Step 3: Safety & Preferences */}
      {step === 3 && (
        <OnboardingStep
          title="Safety & Comfort"
          subtitle="We've got your safety and comfort covered."
          onNext={nextStep}
          onBack={prevStep}
          nextDisabled={!canProceed()}
        >
          {/* Safety card */}
          <SafetyCard />

          <AIAssistantCard message={getAIMessage()} variant="gold" />

          {/* Room preferences */}
          <FormSection title="Room Preference" icon={BedDouble}>
            <div className="space-y-2">
              {roomOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updatePreferences({ room: option.value })}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all",
                    data.preferences.room === option.value
                      ? "border-foreground bg-surface shadow-sm"
                      : "border-border hover:border-border-hover"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                      data.preferences.room === option.value
                        ? "border-foreground bg-foreground"
                        : "border-border"
                    )}
                  >
                    {data.preferences.room === option.value && (
                      <Check className="h-3 w-3 text-background" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {option.label}
                      </span>
                      {option.badge && (
                        <span className="rounded-full bg-gold-bg px-2 py-0.5 text-[10px] font-medium text-gold">
                          {option.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted">{option.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </FormSection>

          {/* Roommate preference */}
          {data.preferences.room !== "single" && (
            <div className="space-y-1.5">
              <label htmlFor="roommate" className="block text-sm font-medium text-foreground">
                Preferred Roommate <span className="text-muted">(optional)</span>
              </label>
              <input
                id="roommate"
                type="text"
                value={data.preferences.roommate || ""}
                onChange={(e) => updatePreferences({ roommate: e.target.value })}
                placeholder="Name of someone in your group"
                className={cn(inputStyles)}
              />
            </div>
          )}
        </OnboardingStep>
      )}

      {/* Step 4: Secure Your Spot (Deposit) */}
      {step === 4 && (
        <OnboardingStep
          title="Secure Your Spot"
          subtitle="You're almost there — let's make it official."
          onBack={prevStep}
          showBack={true}
        >
          <AIAssistantCard message={getAIMessage()} variant="gold" />

          {group && (
            <DepositCard
              totalPrice={group.pricePerPerson}
              spotsRemaining={spotsRemaining}
              maxCapacity={group.maxCapacity}
              currentSize={group.currentSize}
              joinedCount={group.currentSize}
              termsAccepted={termsAccepted}
              onToggleTerms={() => setTermsAccepted(!termsAccepted)}
              onSecureSpot={handleSecureSpot}
            />
          )}

          {!group && (
            <div className="rounded-xl border border-border p-5 space-y-4">
              <p className="text-sm text-muted text-center">
                No group connected. This is a demo — click below to continue.
              </p>
              <button
                type="button"
                onClick={handleSecureSpot}
                className="w-full rounded-lg bg-foreground px-4 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Continue (Demo)
              </button>
            </div>
          )}
        </OnboardingStep>
      )}

      {/* Step 5: Welcome to the Group */}
      {step === 5 && (
        <div className="animate-fade-in space-y-6">
          <ImageHero
            imageUrl={holyLandImages.sunrise.url}
            alt="Golden sunrise over the Holy Land"
            height="sm"
          >
            <div className="text-center text-white space-y-2">
              <p className="text-sm font-semibold tracking-widest uppercase opacity-80">
                Welcome
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Welcome to {group?.name || "Your Group"}!
              </h1>
            </div>
          </ImageHero>

          {/* Member grid with highlight */}
          {members.length > 0 && (
            <div className="rounded-xl border border-border p-4 space-y-2">
              <p className="text-xs font-medium text-muted">Your group</p>
              <GroupMemberGrid members={members} maxDisplay={12} />
            </div>
          )}

          {/* Meet your leader */}
          {leader && (
            <div className="flex items-center gap-4 rounded-xl border border-border p-4">
              <TouristAvatar name={leader.name} size="lg" />
              <div>
                <p className="text-xs text-muted">Your Leader</p>
                <p className="font-semibold text-foreground">{leader.name}</p>
                <p className="text-sm text-secondary">
                  {leader.title}, {leader.organization}
                </p>
              </div>
            </div>
          )}

          <AIAssistantCard message={touristAIMessages.welcome} variant="gold" />

          {/* What happens next */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">What Happens Next</h3>
            <div className="space-y-0">
              <TimelineStep
                title="Deposit secured"
                description="Your spot is confirmed!"
                icon={Check}
                status="completed"
              />
              <TimelineStep
                title="Upload passport"
                description="Submit your passport copy for visa processing"
                icon={FileText}
                status="current"
              />
              <TimelineStep
                title="Medical form"
                description="Complete a brief health declaration"
                icon={Stethoscope}
                status="upcoming"
              />
              <TimelineStep
                title="Travel insurance"
                description="Verify your coverage details"
                icon={Shield}
                status="upcoming"
              />
              <TimelineStep
                title="Final payment"
                description="Due 60 days before departure"
                icon={CreditCard}
                status="upcoming"
              />
              <TimelineStep
                title="Departure!"
                description="Your Holy Land adventure begins"
                icon={Plane}
                status="upcoming"
                isLast
              />
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Itinerary", icon: MapPin, href: "/tourist/itinerary" },
              { label: "Documents", icon: FileText, href: "/tourist/documents" },
              { label: "Prepare", icon: Sparkles, href: "/tourist/prepare" },
              { label: "My Group", icon: Users, href: "/tourist/group" },
            ].map((link) => {
              const LinkIcon = link.icon;
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => {
                    handleComplete();
                    router.push(link.href);
                  }}
                  className="flex items-center gap-2 rounded-lg border border-border p-3 text-left text-xs font-medium text-foreground transition-colors hover:bg-surface"
                >
                  <LinkIcon className="h-4 w-4 text-muted" />
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Go to dashboard */}
          <button
            type="button"
            onClick={handleComplete}
            className="w-full rounded-lg bg-foreground px-4 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Go to My Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

export default function TouristOnboardingPage() {
  return (
    <Suspense>
      <TouristOnboardingContent />
    </Suspense>
  );
}
