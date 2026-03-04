"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhotoCardProps {
  imageUrl: string;
  alt: string;
  title: string;
  subtitle?: string;
  badge?: string;
  onClick?: () => void;
  className?: string;
}

export function PhotoCard({
  imageUrl,
  alt,
  title,
  subtitle,
  badge,
  onClick,
  className,
}: PhotoCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative w-full overflow-hidden rounded-xl group text-left",
        "h-48 sm:h-56",
        className
      )}
    >
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="gradient-overlay absolute inset-0" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
        {badge && (
          <span className="inline-flex self-start items-center rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-medium text-white mb-2">
            {badge}
          </span>
        )}
        <h3 className="text-base font-semibold leading-tight">{title}</h3>
        {subtitle && (
          <p className="text-xs text-white/80 mt-1 line-clamp-2">{subtitle}</p>
        )}
      </div>
    </button>
  );
}
