import { FC, HTMLProps, PropsWithChildren, Ref } from 'react';
import { cn } from 'utils/cn';

interface ButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'type'> {
  ref?: Ref<HTMLButtonElement>;
  type?: 'submit' | 'reset' | 'button';
  variant?: 'primary' | 'warn';
}
const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  variant = 'primary',
  ...props
}) => {
  return (
    <button
      className={cn(
        'border-2  cursor-pointer max-w-max px-4 py-2 rounded-md  hover:text-white',
        {
          'border-primary hover:bg-primary': variant === 'primary',
          'border-red-500 hover:bg-red-500/70': variant === 'warn',
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
