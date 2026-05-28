"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { motion, AnimatePresence } from "motion/react"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const checkboxVariants = cva(
    "peer relative shrink-0 rounded-ds-4 border transition-all outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center overflow-hidden",
    {
        variants: {
            variant: {
                default: "border-border bg-white focus-visible:border-primary focus-visible:ring-primary/5 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white",
                accent: "border-border bg-white focus-visible:border-primary focus-visible:ring-primary/5 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white",
            },
            size: {
                default: "size-ds-18",
                sm: "size-ds-16",
                lg: "size-ds-20",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

interface CheckboxProps
    extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
    onCheckedChange?: (checked: boolean) => void
}

function Checkbox({
    className,
    variant,
    size,
    checked: controlledChecked,
    onCheckedChange,
    disabled,
    ...props
}: CheckboxProps) {
    const [checked, setChecked] = React.useState<boolean>(false)
    const isControlled = controlledChecked !== undefined
    const isChecked = isControlled ? (controlledChecked as boolean) : checked

    const handleCheckedChange = (value: boolean | 'indeterminate') => {
        const boolValue = value === 'indeterminate' ? true : value
        if (!isControlled) {
            setChecked(boolValue)
        }
        onCheckedChange?.(boolValue)
    }

    return (
        <CheckboxPrimitive.Root
            data-slot="checkbox"
            checked={isChecked}
            onCheckedChange={handleCheckedChange}
            disabled={disabled}
            className={cn(checkboxVariants({ variant, size }), className)}
            {...props}
        >
            <motion.div
                className="size-full flex items-center justify-center"
                whileTap={disabled ? undefined : { scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
                <CheckboxPrimitive.Indicator
                    data-slot="checkbox-indicator"
                    forceMount
                    className="flex items-center justify-center text-current"
                    asChild
                >
                    <AnimatePresence>
                        {isChecked && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                    mass: 0.8
                                }}
                            >
                                <CheckIcon 
                                    className={cn(
                                        size === "sm" ? "size-ds-12" : size === "lg" ? "size-ds-16" : "size-ds-14"
                                    )} 
                                    strokeWidth={3} 
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CheckboxPrimitive.Indicator>
            </motion.div>
        </CheckboxPrimitive.Root>
    )
}

export { Checkbox }
