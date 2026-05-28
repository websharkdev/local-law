import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  className?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
  title?: string;
  titleClassName?: string;
  subtitle?: string;
  subtitleClassName?: string;
  href?: string;
};

const CLogo = ({
  className = '',
  iconClassName = 'size-ds-16',
  iconContainerClassName = '',
  titleClassName,
  subtitleClassName,
  href,
}: Props) => {
  const t = useTranslations('Company');

  return (
    <Link
      href={href || '/'}
      className={cn('layout-row-center gap-ds-13', className)}
    >
      <div
        className={cn(
          'layout-center size-ds-40 rounded-ds-12 bg-primary text-primary-foreground',
          iconContainerClassName,
        )}
      >
        <Image
          src="/logo.svg"
          alt="logo"
          width={16}
          height={16}
          className={iconClassName}
        />
      </div>
      <p
        className={cn(
          'text-ds-16 leading-ds-20 text-ink font-medium',
          titleClassName,
        )}
      >
        {t('name')}{' '}
        <span className={cn('text-primary', subtitleClassName)}>
          {t('accent')}
        </span>
      </p>
    </Link>
  );
};

export default CLogo;
