import { Link } from 'react-router';
import { useStateSelector } from 'store';
import { selectStoredFormData } from 'store/formsData.slice';
import EntryCard from './EntryCard';
import { useState } from 'react';

const View = () => {
  const data = useStateSelector(selectStoredFormData);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      onClick={() => {
        setShowMenu(false);
      }}
    >
      <h1>View</h1>
      <div className="flex flex-wrap justify-start gap-4 *:not-first:w-58 *:h-80 *:border *:rounded p-6">
        <div className="flex justify-center items-center relative w-50">
          <span
            className="text-4xl cursor-pointer"
            onClick={(ev) => {
              ev.stopPropagation();
              setShowMenu(true);
            }}
            title="Add card"
          >
            ➕
          </span>

          {showMenu && (
            <div
              className="absolute left-1/2 flex-col flex bg-gray-300 dark:bg-bgdark border rounded w-max space-y-2 *:p-2 *:hover:bg-gray-400 *:cursor-pointer *:text-left"
              onClick={(ev) => {
                ev.stopPropagation();
              }}
            >
              <Link to={'/native-form'}>With uncontrolled form</Link>
              <Link to={'/hook-form'}>With react-hook controlled form</Link>
            </div>
          )}
        </div>
        {data.map((entry) => (
          <EntryCard key={entry.timeStamp} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default View;
