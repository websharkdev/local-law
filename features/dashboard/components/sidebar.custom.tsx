'use client';

import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Scale,
  UserRound,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { AvatarDisplay } from '@/components/ui/avatar.ui';
import { Button } from '@/components/ui/button.ui';
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar.ui';
import {
  SIDEBAR_NAV_ITEMS,
  SIDEBAR_PRIMARY_ITEM,
  SIDEBAR_SERVICE_ITEMS,
  SIDEBAR_SPACE_ITEMS,
} from '@/features/dashboard/navigation';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { signOut } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

const sidebarItemVariants = {
  tone: {
    primary:
      'bg-[linear-gradient(91.12deg,#BA8747_0.96%,#634928_100%)] text-white hover:opacity-95 active:opacity-95',
    active: 'bg-white/5 text-white hover:bg-white/8 active:bg-white/8',
    default:
      'bg-transparent text-white/80 hover:bg-white/5 hover:text-white active:bg-white/5',
  },
  padding: {
    default: 'px-ds-14 py-ds-12',
    primary: 'py-ds-12 pr-ds-14 pl-ds-6',
  },
  weight: {
    normal: 'font-normal',
    medium: 'font-medium',
  },
  icon: {
    strong: 'text-white',
    muted: 'text-white/80',
  },
} as const;

type SidebarItemTone = keyof typeof sidebarItemVariants.tone;
type SidebarItemPadding = keyof typeof sidebarItemVariants.padding;
type SidebarItemWeight = keyof typeof sidebarItemVariants.weight;
type SidebarIconTone = keyof typeof sidebarItemVariants.icon;

interface SidebarNavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  tone?: SidebarItemTone;
  weight?: SidebarItemWeight;
  iconTone?: SidebarIconTone;
  side?: 'left' | 'right' | 'center';
  className?: string;
}

interface SidebarSectionProps {
  title?: string;
  items: readonly {
    icon: LucideIcon;
    labelKey: string;
    href: string;
  }[];
  pathname: string;
  getLabel: (key: string) => string;
}

interface SidebarProps {
  user: {
    name: string;
    lastName: string;
    email: string;
    image: string | null;
  };
}

const getInitials = (user: SidebarProps['user']) => {
  const initials = `${user.name.at(0) ?? ''}${user.lastName.at(0) ?? ''}`;

  return initials || user.email.at(0)?.toUpperCase() || 'U';
};

const isItemActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

const getNavTone = (pathname: string, href: string): SidebarItemTone =>
  isItemActive(pathname, href) ? 'active' : 'default';

const SidebarNavItem = ({
  icon: Icon,
  label,
  href,
  tone = 'default',
  weight = 'normal',
  iconTone = 'muted',
  side = 'left',
  className = '',
}: SidebarNavItemProps) => {
  const padding: SidebarItemPadding =
    tone === 'primary' ? 'primary' : 'default';

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={tone === 'active'}
        tooltip={label}
        className={cn(
          'h-ds-42 gap-ds-8 text-ds-15 leading-ds-18 [&_svg]:size-ds-18 w-full rounded-full transition-[width,height,padding] hover:bg-white/8 hover:text-white [&>span:last-child]:truncate',
          'group-data-[collapsible=icon]:size-ds-42! group-data-[collapsible=icon]:w-ds-42! group-data-[collapsible=icon]:p-ds-0! group-data-[collapsible=icon]:justify-center',
          sidebarItemVariants.padding[padding],
          sidebarItemVariants.tone[tone],
          sidebarItemVariants.weight[weight],
          side === 'center' ? 'flex items-center justify-center' : '',
          className,
        )}
      >
        <Link href={href}>
          <Icon
            aria-hidden="true"
            className={cn('shrink-0', sidebarItemVariants.icon[iconTone])}
            strokeWidth={1.12}
            size={18}
          />
          <span
            className={cn(
              'pt-ds-1 min-w-0 group-data-[collapsible=icon]:hidden',
              side === 'center' ? 'text-center' : 'flex-1',
            )}
          >
            {label}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const SidebarSection = ({
  title,
  items,
  pathname,
  getLabel,
}: SidebarSectionProps) => (
  <SidebarGroup className="gap-ds-4 p-ds-0">
    {title ? (
      <SidebarGroupLabel className="h-ds-17 px-ds-16 text-ds-14 leading-ds-17 font-normal text-white/40">
        {title}
      </SidebarGroupLabel>
    ) : null}
    <SidebarGroupContent>
      <SidebarMenu className="gap-ds-4">
        {items.map((item) => {
          const tone = getNavTone(pathname, item.href);
          const label = getLabel(item.labelKey);

          return (
            <SidebarNavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              iconTone={tone === 'active' ? 'strong' : 'muted'}
              label={label}
              tone={tone}
            />
          );
        })}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
);

const Sidebar = ({ user }: SidebarProps) => {
  const t = useTranslations('Dashboard.sidebar');
  const pathname = usePathname();
  const router = useRouter();
  const { state, toggleSidebar } = useSidebar();
  const [signOutError, setSignOutError] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const isCollapsed = state === 'collapsed';
  const fullName = `${user.name} ${user.lastName}`.trim();
  const displayName = fullName || user.email;

  const handleSignOut = async () => {
    setSignOutError(null);
    setIsSigningOut(true);

    try {
      const response = await signOut();

      if (response?.error) {
        setSignOutError(t('signOutError'));
        return;
      }

      router.push('/auth/sign-in');
    } catch {
      setSignOutError(t('signOutError'));
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <SidebarRoot
      collapsible="none"
      data-collapsible={isCollapsed ? 'icon' : undefined}
      className={cn(
        'group flex h-[calc(100dvh-var(--ds-32))] shrink-0 flex-col border-0 bg-transparent text-white transition-[width] duration-200 ease-linear',
        isCollapsed ? 'w-(--sidebar-width-icon)' : 'w-(--sidebar-width)',
      )}
    >
      <div className="gap-ds-16 flex min-h-0 flex-1 flex-col overflow-hidden">
        <SidebarHeader className="gap-ds-16 p-ds-0 shrink-0">
          <div
            className={cn(
              'h-ds-40 gap-ds-13 flex w-full items-center',
              'group-data-[collapsible=icon]:gap-ds-8 group-data-[collapsible=icon]:h-auto group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:justify-center',
            )}
          >
            <div className="size-ds-40 rounded-ds-12 flex shrink-0 items-center justify-center bg-[#BA8747] text-white">
              <Scale
                aria-hidden="true"
                className="size-ds-16"
                strokeWidth={1.1}
              />
            </div>
            <Link
              href="/"
              className="text-ds-16 leading-ds-20 min-w-0 flex-1 truncate font-medium text-white group-data-[collapsible=icon]:hidden"
            >
              LocalLaw <span className="text-primary">AI</span>
            </Link>
            <Button
              aria-expanded={!isCollapsed}
              aria-label={isCollapsed ? t('expand') : t('collapse')}
              variant="ghost"
              size="xsIcon"
              disableScale
              type="button"
              onClick={toggleSidebar}
              className="size-ds-18 p-ds-0 shrink-0 text-white/40 hover:bg-transparent hover:text-white/70"
            >
              {isCollapsed ? (
                <PanelLeftOpen
                  aria-hidden="true"
                  className="size-ds-18"
                  strokeWidth={2.25}
                />
              ) : (
                <PanelLeftClose
                  aria-hidden="true"
                  className="size-ds-18"
                  strokeWidth={2.25}
                />
              )}
            </Button>
          </div>

          <SidebarSeparator className="mx-ds-0 h-px w-full bg-white/5" />
        </SidebarHeader>

        <SidebarContent className="gap-ds-16 pt-ds-0 min-h-0 flex-1 overflow-y-auto">
          <SidebarMenu className="gap-ds-4">
            <SidebarNavItem
              href={SIDEBAR_PRIMARY_ITEM.href}
              icon={SIDEBAR_PRIMARY_ITEM.icon}
              iconTone="strong"
              label={t(`items.${SIDEBAR_PRIMARY_ITEM.labelKey}`)}
              side="center"
              tone="primary"
              weight="medium"
              className="hover:text-white"
            />
          </SidebarMenu>

          <SidebarSection
            getLabel={(key) => t(`items.${key}`)}
            items={SIDEBAR_NAV_ITEMS}
            pathname={pathname}
          />

          <SidebarSeparator className="mx-ds-0 h-px w-full bg-white/5" />

          <SidebarSection
            getLabel={(key) => t(`items.${key}`)}
            items={SIDEBAR_SERVICE_ITEMS}
            pathname={pathname}
            title={t('sections.services')}
          />

          <SidebarSeparator className="mx-ds-0 h-px w-full bg-white/5" />

          <SidebarSection
            getLabel={(key) => t(`items.${key}`)}
            items={SIDEBAR_SPACE_ITEMS}
            pathname={pathname}
            title={t('sections.mySpace')}
          />
        </SidebarContent>
      </div>

      <SidebarFooter className="mt-ds-16 p-ds-0 shrink-0">
        <div
          className={cn(
            'h-ds-42 gap-ds-8 py-ds-6 pr-ds-12 pl-ds-6 flex w-full items-center rounded-full bg-white/5 backdrop-blur-[62.5px]',
            'group-data-[collapsible=icon]:size-ds-42 group-data-[collapsible=icon]:gap-ds-8 group-data-[collapsible=icon]:p-ds-8 group-data-[collapsible=icon]:h-auto group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:justify-center',
          )}
        >
          <AvatarDisplay
            alt={displayName}
            fallback={
              user.image ? (
                getInitials(user)
              ) : (
                <UserRound
                  aria-hidden="true"
                  className="size-ds-16 text-white/20"
                  strokeWidth={1.5}
                />
              )
            }
            src={user.image}
            size="sm"
            className="size-ds-30 rounded-full bg-[#3C3F47] after:rounded-full after:border-0"
            fallbackClassName="rounded-full bg-[#3C3F47] text-ds-11 font-medium text-white/45"
            imageClassName="rounded-full"
          />
          <p className="pt-ds-1 text-ds-15 leading-ds-18 min-w-0 flex-1 truncate font-medium text-white group-data-[collapsible=icon]:hidden">
            {displayName}
          </p>
          <Button
            aria-label={t('signOut')}
            variant="ghost"
            size="xsIcon"
            disableScale
            type="button"
            disabled={isSigningOut}
            onClick={handleSignOut}
            className="size-ds-18 p-ds-0 shrink-0 text-white/40 hover:bg-transparent hover:text-white/70"
          >
            <LogOut
              aria-hidden="true"
              className="size-ds-18"
              strokeWidth={2.25}
            />
          </Button>
        </div>
        {signOutError ? (
          <p className="mt-ds-8 text-ds-12 text-destructive">{signOutError}</p>
        ) : null}
      </SidebarFooter>
    </SidebarRoot>
  );
};

export { Sidebar };
