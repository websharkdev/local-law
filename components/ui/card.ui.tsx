"use client"

import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

function Card({
    className,
    size = "default",
    disableHover = false,
    ...props
}: React.ComponentProps<typeof motion.div> & { size?: "default" | "sm"; disableHover?: boolean }) {
    return (
        <motion.div
            whileHover={disableHover ? undefined : { y: -2, boxShadow: "0 var(--ds-10) var(--ds-30) calc(-1 * var(--ds-10)) rgba(0,0,0,0.08)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            data-slot="card"
            data-size={size}
            className={cn(
                "group/card flex flex-col gap-ds-16 overflow-hidden rounded-ds-12 bg-card py-ds-16 text-ds-14 text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-ds-0 has-[>img:first-child]:pt-ds-0 data-[size=sm]:gap-ds-12 data-[size=sm]:py-ds-12 data-[size=sm]:has-data-[slot=card-footer]:pb-ds-0 *:[img:first-child]:rounded-t-ds-12 *:[img:last-child]:rounded-b-ds-12",
                "bg-white dark:bg-black",
                className
            )}
            {...(props as unknown as React.ComponentProps<typeof motion.div>)}
        />
    )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-header"
            className={cn(
                "group/card-header @container/card-header grid auto-rows-min items-start gap-ds-4 rounded-t-ds-12 px-ds-16 group-data-[size=sm]/card:px-ds-12 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-ds-16 group-data-[size=sm]/card:[.border-b]:pb-ds-12",
                className
            )}
            {...props}
        />
    )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-title"
            className={cn(
                "font-heading text-ds-16 leading-snug font-medium group-data-[size=sm]/card:text-ds-14",
                className
            )}
            {...props}
        />
    )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-description"
            className={cn("text-ds-14 text-muted-foreground", className)}
            {...props}
        />
    )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-action"
            className={cn(
                "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
                className
            )}
            {...props}
        />
    )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-content"
            className={cn("px-ds-16 group-data-[size=sm]/card:px-ds-12", className)}
            {...props}
        />
    )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-footer"
            className={cn(
                "flex items-center rounded-b-ds-12 border-t bg-muted/50 p-ds-16 group-data-[size=sm]/card:p-ds-12",
                className
            )}
            {...props}
        />
    )
}

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent,
}
