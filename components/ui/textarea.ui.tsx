"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const textareaVariants = cva(
    "flex field-sizing-content w-full rounded-ds-12 border text-ink outline-none placeholder:text-ink/40 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 transition-[border-color,box-shadow,background-color] duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
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
                sm: "min-h-ds-64 px-ds-12 py-ds-8 text-ds-14",
                default: "min-h-ds-100 px-ds-16 py-ds-12 text-ds-16",
                lg: "min-h-ds-140 px-ds-20 py-ds-16 text-ds-18",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export type TextareaProps = React.ComponentProps<"textarea"> &
    VariantProps<typeof textareaVariants>;

const MotionTextarea = motion.textarea;

function Textarea({ className, variant, size, ...props }: TextareaProps) {
    return (
        <MotionTextarea
            data-slot="textarea"
            whileFocus={{ scale: 1.003 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className={cn(textareaVariants({ variant, size }), className)}
            {...(props as React.ComponentProps<typeof MotionTextarea>)}
        />
    );
}

export { Textarea, textareaVariants };
