"use client"

import { RotateCcw, ShieldAlert } from "lucide-react"

import { Button } from "@/components/ui/button.ui"

export default function GlobalError({
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html lang="en">
            <body>
                <div className="page-center-shell" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    <div className="page-center-content">
                        <div className="page-icon-xl bg-red-50 text-red-500">
                            <ShieldAlert className="size-ds-48" />
                        </div>
                        <div className="layout-column gap-ds-8">
                            <h1 className="text-ds-40 font-normal leading-[1.2] text-ink">
                                Critical Error
                            </h1>
                            <p className="ds-text-muted-16 max-w-ds-400">
                                A critical error occurred that prevented the application from loading.
                            </p>
                        </div>
                        <Button
                            onClick={() => reset()}
                            className="error-recovery-button gap-ds-8"
                        >
                            <RotateCcw className="size-ds-20" />
                            Restart Application
                        </Button>
                    </div>
                </div>
            </body>
        </html>
    )
}
