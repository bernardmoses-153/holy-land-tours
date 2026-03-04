"use client";

import { useState } from "react";
import { usePackingList, useCulturalTips, useHebrewPhrases, useHealthInfo, useCurrencyInfo } from "@/hooks/use-mock-data";
import { PageHeader, LoadingSkeleton } from "@/components/shared";
import { cn } from "@/lib/utils";
import {
  Backpack,
  Check,
  Globe,
  Heart,
  Languages,
  Coins,
  ShieldCheck,
  Camera,
  Clock,
  MessageCircle,
  Shirt,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shirt: Shirt,
  clock: Clock,
  coins: Coins,
  camera: Camera,
  "shield-check": ShieldCheck,
  "message-circle": MessageCircle,
};

const categoryLabels: Record<string, string> = {
  essentials: "Essentials",
  clothing: "Clothing",
  tech: "Tech",
  health: "Health",
  comfort: "Comfort",
};

export default function PreparePage() {
  const { data: packingItems, loading: packingLoading } = usePackingList();
  const { data: culturalTips, loading: tipsLoading } = useCulturalTips();
  const { data: phrases, loading: phrasesLoading } = useHebrewPhrases();
  const { data: healthInfo, loading: healthLoading } = useHealthInfo();
  const { data: currency, loading: currencyLoading } = useCurrencyInfo();

  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"packing" | "culture" | "phrases" | "health" | "currency">("packing");

  const loading = packingLoading || tipsLoading || phrasesLoading || healthLoading || currencyLoading;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-48" />
        <LoadingSkeleton variant="card" count={4} />
      </div>
    );
  }

  const toggleItem = (item: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  const tabs = [
    { key: "packing" as const, label: "Packing", icon: Backpack },
    { key: "culture" as const, label: "Culture", icon: Globe },
    { key: "phrases" as const, label: "Hebrew", icon: Languages },
    { key: "health" as const, label: "Health", icon: Heart },
    { key: "currency" as const, label: "Currency", icon: Coins },
  ];

  const packedCount = checkedItems.size;
  const totalItems = packingItems?.length || 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Prepare for Your Trip"
        description="Everything you need to know before you go"
      />

      {/* Tab Navigation */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors",
                activeTab === tab.key
                  ? "bg-foreground text-background"
                  : "bg-elevated text-secondary hover:bg-surface"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Packing List */}
      {activeTab === "packing" && packingItems && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted">{packedCount} of {totalItems} items packed</p>
            <div className="w-32 h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-success rounded-full transition-all duration-300"
                style={{ width: `${totalItems > 0 ? (packedCount / totalItems) * 100 : 0}%` }}
              />
            </div>
          </div>
          {Object.keys(categoryLabels).map((cat) => {
            const items = packingItems.filter((i) => i.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} className="space-y-2">
                <h3 className="text-xs font-medium text-secondary uppercase tracking-wider">
                  {categoryLabels[cat]}
                </h3>
                <div className="space-y-1">
                  {items.map((item) => (
                    <button
                      key={item.item}
                      type="button"
                      onClick={() => toggleItem(item.item)}
                      className={cn(
                        "w-full flex items-start gap-3 rounded-lg p-3 text-left transition-colors",
                        checkedItems.has(item.item) ? "bg-success-bg/50" : "hover:bg-surface"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center h-5 w-5 rounded border shrink-0 mt-0.5",
                          checkedItems.has(item.item)
                            ? "bg-success border-success text-white"
                            : "border-border"
                        )}
                      >
                        {checkedItems.has(item.item) && <Check className="h-3 w-3" />}
                      </div>
                      <div>
                        <p className={cn(
                          "text-sm",
                          checkedItems.has(item.item) ? "text-muted line-through" : "text-foreground"
                        )}>
                          {item.item}
                        </p>
                        {item.tip && (
                          <p className="text-xs text-muted mt-0.5">{item.tip}</p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cultural Tips */}
      {activeTab === "culture" && culturalTips && (
        <div className="space-y-4">
          {culturalTips.map((tip) => {
            const Icon = iconMap[tip.icon] || Globe;
            return (
              <div key={tip.title} className="rounded-xl border border-border bg-background p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-gold-bg">
                    <Icon className="h-4.5 w-4.5 text-gold" />
                  </div>
                  <h3 className="text-sm font-medium text-foreground">{tip.title}</h3>
                </div>
                <p className="text-xs text-secondary leading-relaxed">{tip.description}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Hebrew Phrases */}
      {activeTab === "phrases" && phrases && (
        <div className="space-y-3">
          <p className="text-xs text-muted">Learning a few Hebrew phrases goes a long way!</p>
          <div className="space-y-2">
            {phrases.map((phrase) => (
              <div key={phrase.transliteration} className="rounded-xl border border-border bg-background p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg font-medium text-foreground">{phrase.hebrew}</span>
                  <span className="text-xs text-muted">{phrase.usage}</span>
                </div>
                <p className="text-sm font-medium text-gold">{phrase.transliteration}</p>
                <p className="text-xs text-secondary mt-0.5">{phrase.english}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Health Info */}
      {activeTab === "health" && healthInfo && (
        <div className="space-y-4">
          {healthInfo.map((info) => (
            <div key={info.title} className="rounded-xl border border-border bg-background p-4 space-y-2">
              <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                <Heart className="h-4 w-4 text-error" />
                {info.title}
              </h3>
              <p className="text-xs text-secondary leading-relaxed">{info.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* Currency Info */}
      {activeTab === "currency" && currency && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-background p-6 text-center space-y-2">
            <p className="text-4xl font-bold text-foreground">{currency.symbol}</p>
            <p className="text-sm font-medium text-foreground">{currency.name} ({currency.code})</p>
            <p className="text-xs text-muted">
              1 USD ≈ {currency.exchangeRate} {currency.code}
            </p>
          </div>
          <div className="space-y-2">
            {currency.tips.map((tip) => (
              <div key={tip} className="flex items-start gap-3 rounded-lg border border-border bg-background p-3">
                <Coins className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <p className="text-xs text-secondary">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
