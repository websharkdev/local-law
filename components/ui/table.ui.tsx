"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const tableContainerVariants = {
  variant: {
    default: "relative w-full overflow-x-auto",
    inline: "w-full overflow-x-auto rounded-ds-12 border border-border bg-white",
  },
} as const

const tableVariants = {
  variant: {
    default: "w-full caption-bottom text-ds-14",
    inline: "w-full caption-bottom border-collapse text-ds-15",
  },
} as const

const tableHeaderVariants = {
  variant: {
    default: "[&_tr]:border-b",
    inline: "bg-ink/[0.01] text-ds-12 font-semibold text-ink-40 uppercase",
  },
} as const

const tableFooterVariants = {
  variant: {
    default: "border-t bg-muted/50 font-medium",
    inline: "border-t border-border bg-ink/[0.01] font-medium",
  },
} as const

const tableRowVariants = {
  variant: {
    default:
      "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
    inline: "border-t border-border bg-white transition-colors hover:bg-ink/[0.015]",
  },
} as const

const tableHeadVariants = {
  variant: {
    default:
      "h-ds-40 px-ds-8 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-ds-0",
    inline:
      "h-ds-44 border-r border-ink/6 px-ds-16 py-ds-14 text-left align-middle text-ds-12 font-semibold whitespace-nowrap text-ink-40 uppercase first:pl-ds-24 last:border-r-0 [&:has([role=checkbox])]:pr-ds-0",
  },
} as const

const tableCellVariants = {
  variant: {
    default:
      "p-ds-8 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-ds-0",
    inline:
      "h-ds-45 border-r border-border px-ds-16 py-ds-12 align-middle text-ds-15 whitespace-nowrap first:pl-ds-24 last:border-r-0 [&:has([role=checkbox])]:pr-ds-0",
  },
} as const

type TableVariant = keyof typeof tableVariants.variant

const TableVariantContext = React.createContext<TableVariant>("default")

const useTableVariant = () => React.useContext(TableVariantContext)

type TableProps = React.ComponentProps<"table"> & {
  containerClassName?: string
  variant?: TableVariant
}

const Table = ({
  className,
  containerClassName,
  variant = "default",
  ...props
}: TableProps) => {
  return (
    <TableVariantContext.Provider value={variant}>
      <div
        data-slot="table-container"
        data-variant={variant}
        className={cn(tableContainerVariants.variant[variant], containerClassName)}
      >
        <table
          data-slot="table"
          data-variant={variant}
          className={cn(tableVariants.variant[variant], className)}
          {...props}
        />
      </div>
    </TableVariantContext.Provider>
  )
}

const TableHeader = ({ className, ...props }: React.ComponentProps<"thead">) => {
  const variant = useTableVariant()

  return (
    <thead
      data-slot="table-header"
      data-variant={variant}
      className={cn(tableHeaderVariants.variant[variant], className)}
      {...props}
    />
  )
}

const TableBody = ({ className, ...props }: React.ComponentProps<"tbody">) => {
  return (
    <tbody
      data-slot="table-body"
      className={className}
      {...props}
    />
  )
}

const TableFooter = ({ className, ...props }: React.ComponentProps<"tfoot">) => {
  const variant = useTableVariant()

  return (
    <tfoot
      data-slot="table-footer"
      data-variant={variant}
      className={cn(tableFooterVariants.variant[variant], className)}
      {...props}
    />
  )
}

const TableRow = ({ className, ...props }: React.ComponentProps<"tr">) => {
  const variant = useTableVariant()

  return (
    <tr
      data-slot="table-row"
      data-variant={variant}
      className={cn(tableRowVariants.variant[variant], className)}
      {...props}
    />
  )
}

const TableHead = ({ className, ...props }: React.ComponentProps<"th">) => {
  const variant = useTableVariant()

  return (
    <th
      data-slot="table-head"
      data-variant={variant}
      className={cn(tableHeadVariants.variant[variant], className)}
      {...props}
    />
  )
}

const TableCell = ({ className, ...props }: React.ComponentProps<"td">) => {
  const variant = useTableVariant()

  return (
    <td
      data-slot="table-cell"
      data-variant={variant}
      className={cn(tableCellVariants.variant[variant], className)}
      {...props}
    />
  )
}

const TableCaption = ({
  className,
  ...props
}: React.ComponentProps<"caption">) => {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-ds-16 text-ds-14 text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  tableVariants,
  type TableVariant,
}
