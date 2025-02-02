import { FC, HTMLProps, PropsWithChildren, Ref } from 'react';

interface ButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'type'> {
  ref?: Ref<HTMLButtonElement>;
  type?: 'submit' | 'reset' | 'button';
}
const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={
        'border-2 border-primary cursor-pointer max-w-max px-4 py-2 rounded-md hover:bg-primary hover:text-white' +
        ` ${className ?? ''}`
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
