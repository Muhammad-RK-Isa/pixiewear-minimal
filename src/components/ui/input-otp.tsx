"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import * as React from "react";

import { cn } from "~/lib/utils";
;

const InputOTP: React.FC<React.ComponentProps<typeof OTPInput>> = ({ className, containerClassName, ...props }) => (
  <OTPInput
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName,
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div className={cn("flex items-center", className)} {...props} />
);
InputOTPGroup.displayName = "InputOTPGroup";

interface InputOTPSlotProps
  extends React.ComponentProps<"div"> {
  index: number;
}

const InputOTPSlot: React.FC<InputOTPSlotProps> = ({ index, className, ...props }) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index] ?? {};

  return (
    <div
      className={cn(
        "relative flex size-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 outline outline-1 border border-ring outline-accent-foreground",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-[2px] animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
};
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator: React.FC<React.ComponentProps<"div">> = ({ ...props }) => (
  <div role="separator" {...props}>
    <div className="rounded-full bg-muted-foreground h-1 w-4" />
  </div>
);
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };

