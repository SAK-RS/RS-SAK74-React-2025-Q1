import { FC, HTMLAttributes } from 'react';
import { cn } from 'utils/cn';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  className?: HTMLAttributes<HTMLDivElement>['className'];
}
export const MySpinner: FC<SpinnerProps> = ({
  size = 'medium',
  loading = true,
  className,
}) => {
  const _className = cn(
    'mx-auto rounded-full border-primary border-l-primary/20 animate-spin text-transparent',
    {
      'size-6 border-3': size === 'small',
      'size-12 border-6': size === 'medium',
      'size-24 border-8': size === 'large',
    },
    className
  );
  return <>{loading && <div className={_className}>loading</div>}</>;
};

export default MySpinner;
