import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps {
  as?: ElementType;
  size?: "md" | "lg";
  className?: string;
  children: ReactNode;
}

const SIZES = { md: "max-w-3xl", lg: "max-w-5xl" } as const;

export function Container({ as: Tag = "div", size = "lg", className, children }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full px-5 sm:px-8", SIZES[size], className)}>{children}</Tag>;
}
