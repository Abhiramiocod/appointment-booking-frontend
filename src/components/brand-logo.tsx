import { CalendarCheck2 } from "lucide-react";
import { cn } from "../lib/utils";

export function BrandLogo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-brand text-primary-foreground shadow-sm">
        <CalendarCheck2 className="h-4.5 w-4.5" />
      </div>
      {showText && (
        <span className="text-base font-semibold tracking-tight text-foreground">Bookly</span>
      )}
    </div>
  );
}
