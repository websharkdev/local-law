import {
  BookOpen,
  Bookmark,
  FileText,
  Languages,
  LayoutDashboard,
  Scale,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';

type SidebarNavItemConfig = {
  href: string;
  icon: LucideIcon;
  labelKey: string;
};

const SIDEBAR_PRIMARY_ITEM = {
  href: '/chat',
  icon: Sparkles,
  labelKey: 'aiChat',
} as const satisfies SidebarNavItemConfig;

const SIDEBAR_NAV_ITEMS = [
  {
    icon: LayoutDashboard,
    labelKey: 'dashboard',
    href: '/dashboard/user',
  },
] as const satisfies readonly SidebarNavItemConfig[];

const SIDEBAR_SERVICE_ITEMS = [
  { icon: FileText, labelKey: 'documents', href: '/documents' },
  { icon: Users, labelKey: 'lawyers', href: '/lawyers' },
  { icon: Scale, labelKey: 'notary', href: '/notary' },
  { icon: Languages, labelKey: 'legalTranslation', href: '/translation' },
  { icon: BookOpen, labelKey: 'browseLaws', href: '/laws' },
] as const satisfies readonly SidebarNavItemConfig[];

const SIDEBAR_SPACE_ITEMS = [
  { icon: Bookmark, labelKey: 'saved', href: '/saved' },
] as const satisfies readonly SidebarNavItemConfig[];

export {
  SIDEBAR_NAV_ITEMS,
  SIDEBAR_PRIMARY_ITEM,
  SIDEBAR_SERVICE_ITEMS,
  SIDEBAR_SPACE_ITEMS,
};
export type { SidebarNavItemConfig };
