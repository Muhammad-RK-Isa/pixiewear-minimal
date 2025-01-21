import * as React from "react";

import { cn } from "~/lib/utils";

interface SpinnerProps {
  containerClassName?: string;
  barClassName?: string;
}

export function Spinner({ containerClassName, barClassName }: SpinnerProps) {
  const bars = Array(12).fill(0);

  return (
    <div className={cn("size-4", containerClassName)}>
      <div className="relative left-1/2 top-1/2 h-[inherit] w-[inherit]">
        {bars.map((_, i) => (
          <div
            key={`spinner-bar-${i}`}
            aria-label={`spinner-bar-${i + 1}`}
            className={cn(
              `absolute -left-[10%] -top-[3.9%] h-[8%] w-[24%] animate-spinner rounded-md bg-primary bar:nth-child(${i + 1})`,
              barClassName,
            )}
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
