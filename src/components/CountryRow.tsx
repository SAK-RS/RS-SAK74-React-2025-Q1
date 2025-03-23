import { useStoredCountries } from 'hooks/useStoredCountries';
import type { FC, HtmlHTMLAttributes } from 'react';
import type { Country } from 'types';
import { cn } from 'utils/cn';

const CountryRow: FC<
  HtmlHTMLAttributes<HTMLElement> & { country: Country }
> = ({ country: { name, population, region, flags }, className }) => {
  const { countries } = useStoredCountries();

  return (
    <tr
      className={cn(
        'shadow-lg rounded-md outline-green-400',
        {
          'outline-2 ': countries.some((storedName) =>
            name.common.toUpperCase().includes(storedName.toUpperCase())
          ),
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

export default CountryRow;
