"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
    "w-full min-w-ds-0 rounded-ds-12 border text-ink outline-none placeholder:text-ink/40 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 transition-[border-color,box-shadow,background-color] duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
    {
        variants: {
            variant: {
                default:
                    "border-border bg-white hover:border-ink/25 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/5",
                ghost:
                    "border-transparent bg-transparent hover:bg-ink/4 focus-visible:border-primary focus-visible:bg-white focus-visible:ring-3 focus-visible:ring-primary/5",
                filled:
                    "border-transparent bg-ink/6 hover:bg-ink/9 focus-visible:border-primary focus-visible:bg-white focus-visible:ring-3 focus-visible:ring-primary/5",
            },
            size: {
                sm: "h-ds-32 px-ds-12 py-ds-6 text-ds-14",
                default: "px-ds-16 py-ds-12 text-ds-16",
                lg: "h-ds-56 px-ds-20 py-ds-16 text-ds-18",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

type InputValue = string | number;

export type InputProps = Omit<React.ComponentProps<"input">, "defaultValue" | "size" | "value"> &
    VariantProps<typeof inputVariants> & {
        defaultValue?: InputValue;
        value?: InputValue;
    };

const MotionInput = motion.input;

const Input = ({ className, type, variant, size, ...props }: InputProps) => {
    return (
        <MotionInput
            type={type}
            data-slot="input"
            whileFocus={{ scale: 1.004 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
                inputVariants({ variant, size }),
                "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                className
            )}
            {...(props as React.ComponentProps<typeof MotionInput>)}
        />
    );
};

export { Input, inputVariants };
