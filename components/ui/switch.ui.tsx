"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const SWITCH_THUMB_DEBOUNCE_MS = 80

const switchVariants = {
  root:
    "cursor-pointer peer group/switch relative inline-flex shrink-0 items-center justify-start transition-colors duration-200 outline-none after:absolute after:-inset-x-ds-12 after:-inset-y-ds-8 focus-visible:ring-[var(--ds-3)] focus-visible:ring-ring/50 aria-invalid:ring-[var(--ds-3)] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50",
  thumb:
    "pointer-events-none block rounded-full bg-white ring-0 shadow-[0_var(--ds-1)_var(--ds-3)_rgba(16,24,40,0.1),0_var(--ds-1)_var(--ds-2)_rgba(16,24,40,0.06)] transition-[transform,background-color] duration-200 data-[visual-state=checked]:translate-x-[var(--switch-thumb-translate)] data-[visual-state=unchecked]:translate-x-0 absolute top-1/2 -translate-y-1/2 dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground",
  size: {
    default: {
      root: "h-ds-21 w-ds-36 rounded-ds-12 p-ds-2 [--switch-thumb-translate:var(--ds-16)]",
      thumb: "size-ds-16",
    },
    sm: {
      root: "h-ds-14 w-ds-24 rounded-ds-8 p-ds-1 [--switch-thumb-translate:var(--ds-10)]",
      thumb: "size-ds-12",
    },
  },
} as const

type SwitchSize = keyof typeof switchVariants.size

interface SwitchProps extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  size?: SwitchSize
}

const getInitialVisualChecked = (checked?: boolean, defaultChecked?: boolean) =>
  checked ?? defaultChecked ?? false

const Switch = ({
  checked,
  className,
  defaultChecked,
  onCheckedChange,
  size = "default",
  ...props
}: SwitchProps) => {
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const [visualChecked, setVisualChecked] = React.useState(() =>
    getInitialVisualChecked(checked, defaultChecked)
  )

  const scheduleVisualChecked = React.useCallback((nextChecked: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setVisualChecked(nextChecked)
      timeoutRef.current = null
    }, SWITCH_THUMB_DEBOUNCE_MS)
  }, [])

  const handleCheckedChange = React.useCallback(
    (nextChecked: boolean) => {
      scheduleVisualChecked(nextChecked)
      onCheckedChange?.(nextChecked)
    },
    [onCheckedChange, scheduleVisualChecked]
  )

  React.useEffect(() => {
    if (checked === undefined) {
      return
    }

    scheduleVisualChecked(checked)
  }, [checked, scheduleVisualChecked])

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <SwitchPrimitive.Root
      checked={checked}
      data-slot="switch"
      data-size={size}
      defaultChecked={defaultChecked}
      onCheckedChange={handleCheckedChange}
      className={cn(
        switchVariants.root,
        switchVariants.size[size].root,
        className,
        'transition-all ease-expo-in'
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        data-visual-state={visualChecked ? "checked" : "unchecked"}
        className={cn(switchVariants.thumb, switchVariants.size[size].thumb, 'transition-all ease-expo-in')}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
