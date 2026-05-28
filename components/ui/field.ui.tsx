"use client"

import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label.ui"
import { Separator } from "@/components/ui/separator.ui"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
    return (
        <fieldset
            data-slot="field-set"
            className={cn(
                "flex flex-col gap-ds-20 has-[>[data-slot=checkbox-group]]:gap-ds-12 has-[>[data-slot=radio-group]]:gap-ds-12",
                className
            )}
            {...props}
        />
    )
}

function FieldLegend({
    className,
    variant = "legend",
    ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
    return (
        <legend
            data-slot="field-legend"
            data-variant={variant}
            className={cn(
                "mb-ds-6 font-medium data-[variant=label]:text-ds-14 data-[variant=legend]:text-ds-16",
                className
            )}
            {...props}
        />
    )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="field-group"
            className={cn(
                "group/field-group @container/field-group flex w-full flex-col gap-ds-20 data-[slot=checkbox-group]:gap-ds-12 *:data-[slot=field-group]:gap-ds-16",
                className
            )}
            {...props}
        />
    )
}

const fieldVariants = cva(
    "group/field flex w-full gap-ds-6 data-[invalid=true]:text-destructive",
    {
        variants: {
            orientation: {
                vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
                horizontal:
                    "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
                responsive:
                    "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
            },
        },
        defaultVariants: {
            orientation: "vertical",
        },
    }
)

function Field({
    className,
    orientation = "vertical",
    ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
    return (
        <div
            role="group"
            data-slot="field"
            data-orientation={orientation}
            className={cn(fieldVariants({ orientation }), className)}
            {...props}
        />
    )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="field-content"
            className={cn(
                "group/field-content flex flex-1 flex-col gap-ds-2 leading-snug",
                className
            )}
            {...props}
        />
    )
}

function FieldLabel({
    className,
    ...props
}: React.ComponentProps<typeof Label>) {
    return (
        <Label
            data-slot="field-label"
            className={cn(
                "group/field-label peer/field-label flex w-fit gap-ds-8 group-data-[disabled=true]/field:opacity-50",
                "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
                className
            )}
            {...props}
        />
    )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="field-label"
            className={cn(
                "flex w-fit items-center gap-ds-8 text-ds-14 font-medium group-data-[disabled=true]/field:opacity-50",
                className
            )}
            {...props}
        />
    )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
    return (
        <p
            data-slot="field-description"
            className={cn(
                "text-left text-ds-14 leading-normal font-normal text-muted-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-ds-6",
                "last:mt-ds-0 nth-last-2:-mt-ds-4",
                "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
                className
            )}
            {...props}
        />
    )
}

function FieldSeparator({
    children,
    className,
    ...props
}: React.ComponentProps<"div"> & {
    children?: React.ReactNode
}) {
    return (
        <div
            data-slot="field-separator"
            data-content={!!children}
            className={cn(
                "flex -my-ds-8 h-ds-20 items-center text-ds-14 group-data-[variant=outline]/field-group:-mb-ds-8",
                className
            )}
            {...props}
        >
            <Separator className="flex-1" />
            {children && (
                <span
                    className="block w-fit bg-background px-ds-8 text-muted-foreground"
                    data-slot="field-separator-content"
                >
                    {children}
                </span>
            )}
            {children ? <Separator className="flex-1" /> : null}
        </div>
    )
}

function FieldError({
    className,
    children,
    errors,
    ...props
}: React.ComponentProps<"div"> & {
    errors?: Array<{ message?: string } | undefined>
}) {
    const content = useMemo(() => {
        if (children) {
            return children
        }

        if (!errors?.length) {
            return null
        }

        const uniqueErrors = [
            ...new Map(errors.map((error) => [error?.message, error])).values(),
        ]

        if (uniqueErrors?.length == 1) {
            return uniqueErrors[0]?.message
        }

        return (
            <ul className="ml-ds-16 flex list-disc flex-col gap-ds-4">
                {uniqueErrors.map(
                    (error, index) =>
                        error?.message && <li key={index}>{error.message}</li>
                )}
            </ul>
        )
    }, [children, errors])

    if (!content) {
        return null
    }

    return (
        <div
            role="alert"
            data-slot="field-error"
            className={cn("text-ds-14 font-normal text-destructive", className)}
            {...props}
        >
            {content}
        </div>
    )
}

export {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldContent,
    FieldTitle,
}
