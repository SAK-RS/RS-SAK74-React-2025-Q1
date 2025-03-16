import { FC } from 'react';
import { FormDataType } from 'schemas';
import { cn } from 'utils/cn';
import { split } from 'utils/split';

const EntryCard: FC<{ entry: FormDataType }> = ({ entry }) => {
  const { name, picture, password, timeStamp, ...restFields } = entry;
  const showPassword = password.split('').reduce((acc) => acc + '*', '');
  return (
    <div
      className={cn(
        'overflow-auto border-2 border-primary p-4 rounded-md shadow-lg flex flex-col bg-gray-100 dark:bg-gray-600',
        {
          'animate-blink': Date.now() - timeStamp < 1000 * 10,
        }
      )}
    >
      <h2 className="font-semibold">Name: {name}</h2>
      <img src={picture.data} alt={picture.name} className="h-20 my-2" />
      <div className="text-left">
        <p>Password: {showPassword}</p>
        {split(restFields)}
      </div>
    </div>
  );
};

export default EntryCard;
