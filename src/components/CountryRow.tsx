import { type FC, type HtmlHTMLAttributes, memo } from 'react';
import type { Country } from 'types';
import { cn } from 'utils/cn';

const CountryRow: FC<
  HtmlHTMLAttributes<HTMLElement> & { country: Country; hasVisited?: boolean }
> = ({
  country: { name, population, region, flags },
  className,
  hasVisited,
}) => {
  return (
    <tr
      className={cn(
        'shadow-lg rounded-md outline-green-400',
        {
          'outline-2 ': hasVisited,
        },
        className
      )}
    >
      <td>{name.common}</td>
      <td>{population}</td>
      <td>{region}</td>
      <td>
        <img src={flags.png} alt={flags.alt} width={70} />
      </td>
    </tr>
  );
};

export default memo(CountryRow);
