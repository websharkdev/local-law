import {
    ArrowUp,
    Bell,
    FileText,
    HelpCircle,
    Scale,
    Search,
    Settings
} from 'lucide-react';

import { Button } from '@/components/ui/button.ui';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group.ui';
import { AIChatPanel } from '@/features/dashboard/user/components/ai-chat-panel.custom';
import { HelpBanner } from '@/features/dashboard/user/components/help-banner.custom';
import { LegalCategoriesPanel } from '@/features/dashboard/user/components/legal-categories-panel.custom';
import { RecentDocumentsPanel } from '@/features/dashboard/user/components/recent-documents-panel.custom';
import { StatCard } from '@/features/dashboard/user/components/stat-card.custom';
import { TopLawyersPanel } from '@/features/dashboard/user/components/top-lawyers-panel.custom';
import { TrendingQuestionsPanel } from '@/features/dashboard/user/components/trending-questions-panel.custom';

const STATS = [
  {
    icon: HelpCircle,
    trendIcon: ArrowUp,
    trendColor: 'text-success',
    label: 'Questions Asked',
    value: 24,
    trend: '2 this week',
  },
  {
    icon: FileText,
    trendIcon: ArrowUp,
    trendColor: 'text-success',
    label: 'Documents Created',
    value: 8,
    trend: '2 today',
  },
  {
    icon: Scale,
    label: 'Laws Saved',
    value: 12,
    trend: '2 new updates',
    trendColor: 'text-success',
  },
] as const;

interface UserDashboardFeatureProps {
  user: {
    name: string;
    lastName: string;
    email: string;
    image: string | null;
  };
}

const UserDashboardFeature = ({ user }: UserDashboardFeatureProps) => {
  return (
    <div className="gap-ds-24 p-ds-24 flex h-full w-full flex-col overflow-y-auto">
      <div className="gap-ds-12 flex flex-row items-center justify-between">
        <p className="text-ds-14 text-ink/40 leading-tight">Dashboard</p>

        <div className="gap-ds-12 flex flex-row items-center">
          <InputGroup className="h-ds-43 px-ds-16 bg-muted gap-ds-8 flex-1 rounded-full border-0 focus-within:ring-0">
            <InputGroupAddon align="inline-start">
              <Search className="size-ds-18 text-ink/60" strokeWidth={1.25} />
            </InputGroupAddon>
            <InputGroupInput
              type="search"
              placeholder="Search"
              className="text-ds-15 bg-muted rounded-r-full"
            />
          </InputGroup>

          <Button
            variant="muted"
            size="icon"
            disableScale
            className="size-ds-43 p-ds-0 text-ink relative shrink-0 rounded-full"
          >
            <Bell className="size-ds-18" strokeWidth={1.25} />
            <span className="right-ds-0 top-ds-0 size-ds-8 border-muted absolute rounded-full border bg-[#ED4E2B]" />
          </Button>

          <Button
            variant="muted"
            size="icon"
            disableScale
            className="size-ds-43 p-ds-0 text-ink shrink-0 rounded-full"
          >
            <Settings className="size-ds-18" strokeWidth={1.25} />
          </Button>
        </div>
      </div>

      <div className="gap-ds-16 flex flex-row items-center justify-between">
        <h1 className="text-ds-28 text-ink leading-tight font-normal">
          Welcome back,
          <br />
          <em>{user.name.split(' ')[0]}</em>!
        </h1>

        <div className="gap-ds-16 flex flex-row items-start">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      <HelpBanner />

      <div className="gap-ds-16 grid grid-cols-3">
        <div className="gap-ds-16 flex flex-1 flex-col">
          <LegalCategoriesPanel />
          <RecentDocumentsPanel />
        </div>

        <div className="gap-ds-16 flex shrink-0 flex-col">
          <TopLawyersPanel />
          <TrendingQuestionsPanel />
        </div>

        <div className="shrink-0">
          <AIChatPanel />
        </div>
      </div>
    </div>
  );
};

export { UserDashboardFeature };
