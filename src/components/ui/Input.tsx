import type { FC, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from 'utils/cn';

type InputPropsType = {
  label: string;
  error?: string;
  menuOptions?: ReactNode;
};

const Input: FC<InputHTMLAttributes<HTMLInputElement> & InputPropsType> = ({
  label,
  error,
  menuOptions,
  ...inputProps
}) => {
  return (
    <label className="flex w-full flex-col p-1">
      <div className="flex justify-between items-center gap-6">
        <span className={cn('', { 'text-error': error })}>{label}</span>
        <div className="relative">
          <input
            {...inputProps}
            className={cn('dark:text-textdark dark:bg-bgdark', {
              'border-error border-2': error,
            })}
          />
          {menuOptions && (
            <div className="absolute bottom-full w-full z-10 bg-gray-200 dark:bg-bgdark border rounded-md max-h-screen overflow-auto">
              {menuOptions}
            </div>
          )}
        </div>
      </div>
      <div className="error">{error}</div>
    </label>
  );
};

export default Input;
