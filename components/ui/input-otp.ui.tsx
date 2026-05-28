"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

function InputOTP({
    className,
    containerClassName,
    ...props
}: React.ComponentProps<typeof OTPInput>) {
    return (
        <OTPInput
            data-slot="input-otp"
            containerClassName={cn(
                "flex items-center gap-ds-8 has-disabled:opacity-50",
                containerClassName
            )}
            className={cn("disabled:cursor-not-allowed", className)}
            {...props}
        />
    )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="input-otp-group"
            className={cn("flex items-center gap-ds-12", className)}
            {...props}
        />
    )
}

function InputOTPSlot({
    index,
    className,
    ...props
}: React.ComponentProps<"div"> & { index: number }) {
    const inputOTPContext = React.useContext(OTPInputContext)
    const slot = inputOTPContext.slots[index]

    if (!slot) return null

    const { char, hasFakeCaret, isActive } = slot

    return (
        <div
            data-slot="input-otp-slot"
            data-active={isActive}
            className={cn(
                "grid h-ds-92 w-ds-82 place-items-center rounded-ds-12 border border-ink/8 bg-white text-ds-24 font-medium transition-all duration-300",
                isActive && "border-primary ring-3 ring-primary/10",
                char !== null && "border-primary",
                className
            )}
            {...props}
        >
            {char ? <span className="col-start-1 row-start-1">{char}</span> : null}
            {hasFakeCaret && (
                <div className="pointer-events-none col-start-1 row-start-1 flex items-center justify-center">
                    <div className="h-ds-24 w-px animate-caret-blink bg-primary duration-1000" />
                </div>
            )}
        </div>
    )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
    return (
        <div data-slot="input-otp-separator" role="separator" {...props}>
            <Dot />
        </div>
    )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
