import { cn } from "~/lib/utils";

interface SpinnerProps {
  containerClassName?: string;
  barClassName?: string;
}

export function Spinner({ containerClassName, barClassName }: SpinnerProps) {
  const bars = Array(12).fill(0);

  return (
    <div className={cn("size-4", containerClassName)}>
      <div className="relative top-1/2 left-1/2 h-[inherit] w-[inherit]">
        {bars.map((_, i) => (
          <div
            aria-label={`spinner-bar-${i + 1}`}
            className={cn(
              `absolute -top-[3.9%] -left-[10%] h-[8%] w-[24%] animate-spinner rounded-md bg-primary bar:nth-child(${i + 1})`,
              barClassName
            )}
            key={`spinner-bar-${i}`}
            style={{
              animationDelay: `-${1.3 - i * 0.1}s`,
              transform: `rotate(${30 * i}deg) translate(146%)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
