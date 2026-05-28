import { AlertCircle, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

const authFormStatusVariants = {
  variant: {
    error: "border-destructive/20 bg-destructive/8 text-destructive",
    success: "border-success/20 bg-success/8 text-success",
  },
} as const;

type AuthFormStatusVariant = keyof typeof authFormStatusVariants.variant;

interface AuthFormStatusProps {
  children: React.ReactNode;
  variant: AuthFormStatusVariant;
}

const authFormStatusIcons = {
  error: AlertCircle,
  success: CheckCircle2,
} as const;

const AuthFormStatus = ({ children, variant }: AuthFormStatusProps) => {
  const Icon = authFormStatusIcons[variant];

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "layout-row-center gap-ds-8 rounded-ds-14 border px-ds-14 py-ds-10 text-ds-13 leading-ds-18",
        authFormStatusVariants.variant[variant],
      )}
    >
      <Icon aria-hidden="true" className="size-ds-16 shrink-0" />
      <p>{children}</p>
    </div>
  );
};

export { AuthFormStatus };
