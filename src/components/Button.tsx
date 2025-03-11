import { FC, HTMLProps, PropsWithChildren, Ref } from 'react';
import { cn } from 'utils/cn';

interface ButtonProps
  extends Omit<HTMLProps<HTMLButtonElement>, 'type' | 'size'> {
  ref?: Ref<HTMLButtonElement>;
  type?: 'submit' | 'reset' | 'button';
  variant?: 'primary' | 'warn';
  size?: 'small' | 'medium' | 'large';
}
const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  variant = 'primary',
  size = 'medium',
  ...props
}) => {
  return (
    <button
      className={cn(
        'border-2 not-disabled:cursor-pointer max-w-max px-4 py-2 rounded-md  hover:text-white disabled:hover:text-inherit disabled:hover:bg-inherit disabled:opacity-40',
        {
          'border-primary hover:bg-primary': variant === 'primary',
          'border-red-500 hover:bg-red-500/70': variant === 'warn',
          'text-sm p-1': size === 'small',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
