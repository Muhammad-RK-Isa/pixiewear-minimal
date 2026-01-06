"use client";

import { motion } from "motion/react";
import { cn } from "~/lib/utils";

export function TextShine({
  text,
  duration = 2,
  className,
}: {
  text: string;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.h1
      animate={{ backgroundPosition: "-200% 0" }}
      className={cn(
        "bg-[length:200%_100%] bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-clip-text font-medium text-base text-transparent",
        className
      )}
      initial={{ backgroundPosition: "200% 0" }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration,
        ease: "linear",
      }}
    >
      {text}
    </motion.h1>
  );
}
