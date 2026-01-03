import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerSize?: "default" | "narrow" | "wide";
  background?: "white" | "muted" | "dark";
  spacing?: "default" | "tight" | "loose";
}

export function Section({
  children,
  className,
  containerSize = "default",
  background = "white",
  spacing = "default",
}: SectionProps) {
  return (
    <section
      className={cn(
        {
          "bg-background": background === "white",
          "bg-muted/30": background === "muted",
          "bg-[var(--hero-bg)] text-white": background === "dark",
        },
        {
          "py-8 sm:py-10 lg:py-12": spacing === "default",
          "py-6 sm:py-8 lg:py-10": spacing === "tight",
          "py-12 sm:py-16 lg:py-20": spacing === "loose",
        },
        className
      )}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 sm:mb-10 lg:mb-12",
        {
          "text-center": align === "center",
          "text-left": align === "left",
        },
        className
      )}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0">
          {description}
        </p>
      )}
    </div>
  );
}



