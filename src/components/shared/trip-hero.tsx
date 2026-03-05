import { Calendar, Users, MapPin } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

interface TripHeroProps {
  tripName: string;
  imageUrl: string;
  leaderName: string;
  leaderTitle: string;
  dates: { start: string; end: string };
  duration: number;
  pricePerPerson: number;
  installmentMonths?: number;
  spotsLeft: number;
  maxCapacity: number;
}

export function TripHero({
  tripName,
  imageUrl,
  leaderName,
  leaderTitle,
  dates,
  duration,
  pricePerPerson,
  installmentMonths = 12,
  spotsLeft,
  maxCapacity,
}: TripHeroProps) {
  const monthlyPrice = Math.ceil(pricePerPerson / installmentMonths);

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Background image */}
      <div
        className="h-[400px] sm:h-[480px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                <MapPin className="h-3 w-3" />
                Israel
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                <Calendar className="h-3 w-3" />
                {duration} Days
              </span>
              {spotsLeft <= 10 && spotsLeft > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/80 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white animate-pulse-soft">
                  <Users className="h-3 w-3" />
                  {spotsLeft} spots left
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {tripName}
            </h1>

            <p className="text-white/70 text-sm">
              Led by {leaderTitle} {leaderName} &middot; {formatDate(dates.start)} &ndash; {formatDate(dates.end)}
            </p>

            <div className="flex flex-wrap items-end gap-4 pt-2">
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider">From</p>
                <p className="text-2xl sm:text-3xl font-bold text-white mono">
                  {formatCurrency(pricePerPerson)}
                </p>
              </div>
              {installmentMonths > 0 && (
                <div className="pb-0.5">
                  <p className="text-white/80 text-sm">
                    or <span className="font-semibold">{formatCurrency(monthlyPrice)}/mo</span> for {installmentMonths} months
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
