import { HTMLAttributes, MouseEventHandler, useRef, type FC } from 'react';
import { useStateSelector, useTypedDispatch } from 'store';
import {
  selectAllSelectedCharacters,
  unselectAll,
} from 'store/selectedHeroesSlice';
import generateCSV_URL from 'utils/csvContent';

const MenuSelected: FC<
  { quantity: number } & HTMLAttributes<HTMLDivElement>
> = ({ quantity, ...restProps }) => {
  const allSelected = useStateSelector(selectAllSelectedCharacters);
  const isMoreThan_1 = quantity > 1;
  const dispatch = useTypedDispatch();

  const handleDownload = () => {
    if (!linkRef.current) {
      throw Error('no ref mounted');
    }
    const link = linkRef.current;
    const url = generateCSV_URL(allSelected);
    link.download = `${quantity}_character${isMoreThan_1 ? 's' : ''}`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };
  const handleClick: MouseEventHandler<HTMLButtonElement> = ({
    currentTarget: { name },
  }) => {
    switch (name) {
      case 'unselect':
        dispatch(unselectAll());
        break;
      case 'download':
        handleDownload();
        break;
      default:
        throw Error('unhandled click...');
    }
  };
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <div
      className="fixed left-2 bottom-2 w-[35vw] h-20 bg-green-500 rounded-md animate-fade"
      {...restProps}
    >
      <h5>
        {quantity} item{isMoreThan_1 && 's'} {!isMoreThan_1 ? 'is' : 'are'}{' '}
        selected
      </h5>
      <div className="flex items-center justify-around ">
        <button
          onClick={handleClick}
          name="unselect"
          className="cursor-pointer border-2 p-1 rounded-md border-transparent hover:border-red-600 transition duration-300"
        >
          Unselect all
        </button>
        <button
          onClick={handleClick}
          name="download"
          className="cursor-pointer border-2 p-1 rounded-md border-transparent hover:border-blue-800 transition duration-300"
        >
          Download
        </button>
        <a href={''} download={'test.csv'} ref={linkRef} className="hidden">
          test
        </a>
      </div>
    </div>
  );
};

export default MenuSelected;
