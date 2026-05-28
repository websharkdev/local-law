import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageCenterLayoutProps {
  action?: ReactNode;
  description: string;
  icon: LucideIcon;
  iconClassName?: string;
  title: string;
}

const PageCenterLayout = ({
  action,
  description,
  icon: Icon,
  iconClassName,
  title,
}: PageCenterLayoutProps) => {
  return (
    <main className="page-center-shell">
      <div className="page-center-content">
        <div className={cn("page-icon-xl", iconClassName)}>
          <Icon aria-hidden="true" className="size-ds-36" />
        </div>
        <div className="layout-column-center gap-ds-8">
          <h1 className="text-ds-32 leading-[120%] font-normal text-ink">
            {title}
          </h1>
          <p className="ds-text-muted-16 max-w-ds-460">{description}</p>
        </div>
        {action}
      </div>
    </main>
  );
};

export { PageCenterLayout };
