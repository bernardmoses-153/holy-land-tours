"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageHeroProps {
  imageUrl: string;
  alt: string;
  children?: React.ReactNode;
  height?: "sm" | "md" | "lg";
  className?: string;
}

const heightClasses = {
  sm: "h-48 sm:h-56",
  md: "h-64 sm:h-80",
  lg: "h-80 sm:h-96",
};

export function ImageHero({ imageUrl, alt, children, height = "md", className }: ImageHeroProps) {
  return (
    <div className={cn("relative w-full overflow-hidden rounded-2xl", heightClasses[height], className)}>
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        priority
      />
      <div className="gradient-overlay absolute inset-0" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        {children}
      </div>
    </div>
  );
}
