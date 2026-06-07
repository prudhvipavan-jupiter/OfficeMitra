import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export function Container({ children, className, narrow }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        narrow ? "max-w-[720px]" : "max-w-[1280px]",
        className
      )}
    >
      {children}
    </div>
  );
}

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionHeading({ title, subtitle, action }: SectionHeadingProps) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-navy-900 md:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-base leading-relaxed text-gray-600">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
