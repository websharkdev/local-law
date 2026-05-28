'use client';

import { useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { Eye, EyeOff, type LucideIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { Field, FieldError, FieldLabel } from '@/components/ui/field.ui';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group.ui';
import { cn } from '@/lib/utils';
import { EASE_AWWWARDS } from '@/lib/animations.lib';

const authFieldVariants = {
  field: {
    default: 'gap-ds-8',
    invalid: 'gap-ds-8',
  },
  label: {
    default: 'text-ds-13 leading-ds-16 font-normal text-ink',
    invalid: 'text-ds-13 leading-ds-16 font-normal text-destructive',
  },
  group: {
    default:
      'h-ds-42 rounded-ds-99 border-ink/8 px-ds-14 py-ds-0 shadow-none has-[[data-slot=input-group-control]:focus-visible]:border-primary has-[[data-slot=input-group-control]:focus-visible]:ring-primary/10',
    invalid:
      'h-ds-42 rounded-ds-99 border-destructive/50 px-ds-14 py-ds-0 shadow-none has-[[data-slot=input-group-control]:focus-visible]:border-destructive has-[[data-slot=input-group-control]:focus-visible]:ring-destructive/10',
  },
} as const;

const passwordIconMotion = {
  initial: {
    opacity: 0,
    rotate: -12,
    scale: 1,
    y: 1,
  },
  animate: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    rotate: 12,
    scale: 1,
    y: -1,
  },
  transition: {
    duration: 0.16,
    ease: EASE_AWWWARDS,
  },
} as const;

type AuthFieldState = keyof typeof authFieldVariants.field;
type AuthInputType = 'email' | 'password' | 'text';
type BaseInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'defaultValue' | 'size' | 'type' | 'value'
>;

interface AuthFieldBaseProps extends BaseInputProps {
  defaultValue?: string | number;
  error?: string;
  icon: LucideIcon;
  id: string;
  label: string;
  labelAddon?: ReactNode;
  value?: string | number;
}

interface AuthTextFieldProps extends AuthFieldBaseProps {
  type?: Exclude<AuthInputType, 'password'>;
}

interface AuthPasswordFieldProps extends AuthFieldBaseProps {
  toggleLabel?: string;
}

type AuthFieldProps =
  | AuthTextFieldProps
  | (AuthPasswordFieldProps & { type: 'password' });

const AuthFieldFrame = ({
  className,
  error,
  icon: Icon,
  id,
  label,
  labelAddon,
  inputType,
  endAddon,
  ...props
}: AuthFieldBaseProps & {
  inputType: AuthInputType;
  endAddon?: ReactNode;
}) => {
  const state: AuthFieldState = error ? 'invalid' : 'default';

  return (
    <Field data-invalid={!!error} className={authFieldVariants.field[state]}>
      <div className="layout-between-center gap-ds-8 w-full">
        <FieldLabel htmlFor={id} className={authFieldVariants.label[state]}>
          {label}
        </FieldLabel>
        {labelAddon}
      </div>
      <InputGroup className={authFieldVariants.group[state]}>
        <InputGroupAddon align="inline-start" className="px-ds-0 pr-ds-10">
          <Icon aria-hidden="true" className="text-ink/60" />
        </InputGroupAddon>
        <InputGroupInput
          id={id}
          type={inputType}
          aria-invalid={!!error}
          className={cn(
            'px-ds-0 py-ds-0 text-ds-14 leading-ds-17 placeholder:text-ink/40 h-full',
            className,
          )}
          {...props}
        />
        {endAddon}
      </InputGroup>
      <FieldError>{error}</FieldError>
    </Field>
  );
};

const AuthPasswordField = ({
  toggleLabel,
  ...props
}: AuthPasswordFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const PasswordIcon = isPasswordVisible ? EyeOff : Eye;

  return (
    <AuthFieldFrame
      {...props}
      inputType={isPasswordVisible ? 'text' : 'password'}
      endAddon={
        <InputGroupAddon align="inline-end" className="px-ds-0 pl-ds-10">
          <InputGroupButton
            aria-label={toggleLabel}
            aria-pressed={isPasswordVisible}
            className="size-ds-24 text-ink hover:text-ink/95 rounded-full transition-[color,transform] duration-150 outline-none hover:bg-transparent active:scale-95"
            size="icon-xs"
            type="button"
            variant="ghost"
            onClick={() => setIsPasswordVisible((current) => !current)}
            disableScale
          >
            <span className="layout-center size-ds-20 relative overflow-hidden">
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={isPasswordVisible ? 'visible' : 'hidden'}
                  className="layout-center absolute inset-0"
                  initial={passwordIconMotion.initial}
                  animate={passwordIconMotion.animate}
                  exit={passwordIconMotion.exit}
                  transition={passwordIconMotion.transition}
                >
                  <PasswordIcon className="size-ds-20" aria-hidden="true" />
                </motion.span>
              </AnimatePresence>
            </span>
          </InputGroupButton>
        </InputGroupAddon>
      }
    />
  );
};

const AuthTextField = ({ type = 'text', ...props }: AuthTextFieldProps) => (
  <AuthFieldFrame {...props} inputType={type} />
);

const AuthField = (props: AuthFieldProps) => {
  if (props.type === 'password') {
    const { type: _type, ...passwordProps } = props;

    void _type;

    return <AuthPasswordField {...passwordProps} />;
  }

  return <AuthTextField {...props} />;
};

export { AuthField, AuthPasswordField, AuthTextField };
export type { AuthFieldProps, AuthPasswordFieldProps, AuthTextFieldProps };
