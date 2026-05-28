"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type AvatarSize = "default" | "sm" | "lg" | "xl";
type AvatarVariant = "default" | "primary" | "secondary" | "muted";

function Avatar({
  className,
  size = "default",
  variant = "default",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: AvatarSize;
  variant?: AvatarVariant;
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      data-variant={variant}
      className={cn(
        "group/avatar relative aspect-square flex size-ds-40 shrink-0 rounded-ds-12 select-none after:absolute after:inset-ds-0 after:rounded-ds-12 after:border after:border-border after:mix-blend-darken data-[size=lg]:size-ds-64 data-[size=sm]:size-ds-24 data-[size=xl]:size-ds-124 data-[size=xl]:rounded-ds-20 data-[size=xl]:bg-white data-[size=xl]:after:rounded-ds-20 dark:after:mix-blend-lighten",
        className
      )}
      {...props}
    />
  )
}

interface AvatarDisplayProps extends Omit<React.ComponentProps<typeof AvatarPrimitive.Root>, "children"> {
  src?: string | null;
  alt: string;
  fallback: React.ReactNode;
  size?: AvatarSize;
  variant?: AvatarVariant;
  imageClassName?: string;
  fallbackClassName?: string;
}

function AvatarDisplay({
  src,
  alt,
  fallback,
  size = "default",
  variant = "default",
  className,
  imageClassName,
  fallbackClassName,
  ...props
}: AvatarDisplayProps) {
  return (
    <Avatar
      size={size}
      variant={variant}
      className={className}
      {...props}
    >
      {src ? (
        <AvatarImage
          src={src}
          alt={alt}
          className={imageClassName}
        />
      ) : null}
      <AvatarFallback className={fallbackClassName}>
        {fallback}
      </AvatarFallback>
    </Avatar>
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-ds-12 object-cover group-data-[size=xl]/avatar:rounded-ds-20",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "aspect-square flex size-full items-center justify-center rounded-ds-12 bg-muted text-ds-14 text-muted-foreground group-data-[size=sm]/avatar:text-ds-12 group-data-[size=lg]/avatar:text-ds-18 group-data-[size=lg]/avatar:font-semibold group-data-[size=xl]/avatar:rounded-ds-20 group-data-[size=xl]/avatar:bg-white group-data-[size=xl]/avatar:text-ds-48 group-data-[size=xl]/avatar:font-normal group-data-[variant=primary]/avatar:text-primary group-data-[variant=secondary]/avatar:text-brand-royal group-data-[variant=secondary]/avatar:text-ds-12 group-data-[variant=secondary]/avatar:font-semibold group-data-[variant=muted]/avatar:text-ink/60",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-ds-0 bottom-ds-0 z-10 inline-flex items-center justify-center rounded-ds-12 bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-ds-8 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-ds-10 group-data-[size=default]/avatar:[&>svg]:size-ds-8",
        "group-data-[size=lg]/avatar:size-ds-12 group-data-[size=lg]/avatar:[&>svg]:size-ds-8",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-ds-8 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-ds-40 shrink-0 items-center justify-center rounded-ds-12 bg-muted text-ds-14 text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-ds-40 group-has-data-[size=sm]/avatar-group:size-ds-24 [&>svg]:size-ds-16 group-has-data-[size=lg]/avatar-group:[&>svg]:size-ds-20 group-has-data-[size=sm]/avatar-group:[&>svg]:size-ds-12",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarDisplay,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}
