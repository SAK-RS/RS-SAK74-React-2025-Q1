import type { FC, InputHTMLAttributes, ReactNode } from 'react';

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
    <label>
      {label}
      <div className="relative">
        <input {...inputProps} />
        <div>{error}</div>
        {menuOptions && <div className="">{menuOptions}</div>}
      </div>
    </label>
  );
};

export default Input;
