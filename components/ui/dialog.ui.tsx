'use client';

import * as React from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button.ui';
import { XIcon } from 'lucide-react';

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        'inset-ds-0 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs',
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          'gap-ds-16 rounded-ds-12 bg-popover p-ds-16 text-ds-14 text-popover-foreground ring-foreground/10 sm:max-w-ds-384 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-var(--ds-32))] -translate-x-1/2 -translate-y-1/2 ring-1 duration-100 outline-none',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <Button
              variant="ghost"
              className="top-ds-8 right-ds-8 absolute"
              size="icon-sm"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('gap-ds-8 flex flex-col', className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        '-mx-ds-16 -mb-ds-16 gap-ds-8 rounded-b-ds-12 bg-muted/50 p-ds-16 flex flex-col-reverse border-t sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        'font-heading text-ds-16 leading-none font-medium',
        className,
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        'text-ds-14 text-muted-foreground *:[a]:hover:text-foreground *:[a]:underline *:[a]:underline-offset-3',
        className,
      )}
      {...props}
    />
  );
}

function DialogHeaderWithIcon({
  icon,
  iconColor = 'default',
  title,
  onClose,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  icon: React.ReactNode;
  iconColor?: 'default' | 'danger' | 'warning' | 'success';
  title: string;
  onClose?: () => void;
}) {
  const iconColorClass = {
    default: 'text-ink',
    danger: 'text-danger',
    warning: 'text-warning',
    success: 'text-success',
  }[iconColor];

  return (
    <div
      data-slot="dialog-header-with-icon"
      className={cn(
        'h-ds-71 gap-ds-10 border-ink/8 px-ds-24 py-ds-20 flex items-center border-b',
        className,
      )}
      {...props}
    >
      <div className="min-w-ds-0 gap-ds-12 flex flex-1 items-center">
        <span
          className={cn(
            'size-ds-24 flex shrink-0 items-center justify-center pb-px',
            iconColorClass,
          )}
        >
          {icon}
        </span>
        <DialogTitle className="min-w-ds-0 text-ds-22 text-ink flex-1 leading-[1.4] font-medium">
          {title}
        </DialogTitle>
      </div>
      {onClose ? (
        <Button
          type="button"
          variant="ghost"
          size="xsIcon"
          disableScale
          aria-label="Close dialog"
          onClick={onClose}
          className="size-ds-24 text-ink-60 hover:text-ink hover:bg-transparent"
        >
          <XIcon className="size-ds-24" strokeWidth={2} />
        </Button>
      ) : null}
    </div>
  );
}

function DialogBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-body"
      className={cn('gap-ds-8 px-ds-24 py-ds-20 flex flex-col', className)}
      {...props}
    />
  );
}

function DialogActionFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-action-footer"
      className={cn(
        'h-ds-94 gap-ds-16 border-ink/8 px-ds-24 py-ds-24 flex items-center justify-end border-t bg-white',
        className,
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogActionFooter,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogHeaderWithIcon,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
