import { MouseEventHandler, type FC } from 'react';
import { useTypedDispatch } from 'store';
import {
  // selectAllSelectedCharacters,
  unselectAll,
} from 'store/selectedHeroesSlice';

const MenuSelected: FC<{ quantity: number }> = ({ quantity }) => {
  // const allSelected = useStateSelector(selectAllSelectedCharacters);
  const isMoreThan_1 = quantity > 1;
  const dispatch = useTypedDispatch();
  const handleClick: MouseEventHandler<HTMLButtonElement> = ({
    currentTarget: { name },
  }) => {
    switch (name) {
      case 'unselect':
        dispatch(unselectAll());
        break;
      case 'download' /*TODO: downloadSCV(allSelected) */:
        break;
      default:
        throw Error('unhandled click...');
    }
  };

  return (
    <div className="fixed left-2 bottom-2 w-[35vw] h-20 bg-green-500 rounded-md animate-fade">
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
      </div>
    </div>
  );
};

export default MenuSelected;
