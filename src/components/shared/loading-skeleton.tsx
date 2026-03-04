import { cn } from "@/lib/utils";

type SkeletonVariant = "card" | "table-row" | "stat" | "text";

interface LoadingSkeletonProps {
  variant: SkeletonVariant;
  count?: number;
}

function SkeletonCard() {
  return (
    <div className="rounded-lg border border-border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="skeleton h-4 w-24" />
        <div className="skeleton h-5 w-5 rounded-full" />
      </div>
      <div className="skeleton h-8 w-32" />
      <div className="skeleton h-3 w-20" />
    </div>
  );
}

function SkeletonTableRow() {
  return (
    <tr>
      <td className="px-4 py-3">
        <div className="skeleton h-4 w-28" />
      </td>
      <td className="px-4 py-3">
        <div className="skeleton h-4 w-20" />
      </td>
      <td className="px-4 py-3">
        <div className="skeleton h-4 w-16" />
      </td>
      <td className="px-4 py-3">
        <div className="skeleton h-4 w-24" />
      </td>
    </tr>
  );
}

function SkeletonStat() {
  return (
    <div className="rounded-lg border border-border p-6 space-y-3">
      <div className="skeleton h-3 w-20" />
      <div className="skeleton h-7 w-28" />
    </div>
  );
}

function SkeletonText() {
  return (
    <div className="space-y-2">
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-4/5" />
      <div className="skeleton h-4 w-3/5" />
    </div>
  );
}

const variantComponents: Record<SkeletonVariant, () => React.JSX.Element> = {
  card: SkeletonCard,
  "table-row": SkeletonTableRow,
  stat: SkeletonStat,
  text: SkeletonText,
};

export function LoadingSkeleton({ variant, count = 1 }: LoadingSkeletonProps) {
  const Component = variantComponents[variant];

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Component key={i} />
      ))}
    </>
  );
}
