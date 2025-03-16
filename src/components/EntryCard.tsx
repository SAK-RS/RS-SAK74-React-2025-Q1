import { FC } from 'react';
import { FormDataType } from 'schemas';
import { cn } from 'utils/cn';
import { split } from 'utils/split';

const EntryCard: FC<{ entry: FormDataType }> = ({ entry }) => {
  const { name, picture, password, timeStamp, ...restFields } = entry;
  const showPassword = password.split('').reduce((acc) => acc + '*', '');
  return (
    <div
      className={cn('border p-4 my-4 w-1/6', {
        'border-red-500': Date.now() - timeStamp < 1000 * 5,
      })}
    >
      <h2>{name}</h2>
      <img src={picture.data} alt={picture.name} />
      <p>Password: {showPassword}</p>
      {split(restFields)}
    </div>
  );
};

export default EntryCard;
