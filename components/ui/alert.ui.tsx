import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "group/alert relative grid w-full gap-ds-2 rounded-ds-8 border px-ds-10 py-ds-8 text-left text-ds-14 has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-ds-72 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-ds-8 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-ds-16",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
        primary:
          "border-ink/5 bg-primary/3 text-ink",
      },
      size: {
        default: "rounded-ds-8 px-ds-10 py-ds-8",
        sm: "gap-ds-12 rounded-ds-16 px-ds-16 pt-ds-12 pb-ds-16",
        lg: "gap-ds-16 rounded-ds-16 px-ds-20 py-ds-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Alert({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      data-size={size}
      role="alert"
      className={cn(alertVariants({ variant, size }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2 group-data-[variant=primary]/alert:text-ink group-data-[size=lg]/alert:text-ds-18 group-data-[size=sm]/alert:text-ds-16 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-ds-14 text-balance text-muted-foreground group-data-[variant=primary]/alert:font-normal group-data-[size=lg]/alert:text-ink/60 group-data-[size=sm]/alert:text-ink-60 md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-ds-16",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-ds-8 right-ds-8", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
