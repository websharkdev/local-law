import CLogo from '@/components/common/logo.common';

interface AuthPageShellProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  subtitle?: React.ReactNode;
  title: React.ReactNode;
}

const AuthPageShell = ({
  children,
  footer,
  subtitle,
  title,
}: AuthPageShellProps) => {
  return (
    <section className="layout-column rounded-ds-24 bg-card px-ds-24 py-ds-24 text-ink relative min-h-dvh w-full overflow-y-auto lg:min-h-[calc(100dvh-var(--ds-16))]">
      <div className="layout-center">
        <CLogo />
      </div>

      <div className="layout-center py-ds-24 min-h-0 flex-1">
        <div className="max-w-ds-552 gap-ds-24 mx-auto flex w-full flex-col items-center">
          <header className="layout-column-center gap-ds-6 text-center">
            <h1 className="text-ds-24 leading-[120%] font-normal">{title}</h1>
            {subtitle ? (
              <p className="text-ds-16 leading-ds-20 text-ink/40">{subtitle}</p>
            ) : null}
          </header>
          {children}
          {footer ? (
            <div className="layout-center text-ds-16 leading-ds-20 text-center">
              {footer}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export { AuthPageShell };
