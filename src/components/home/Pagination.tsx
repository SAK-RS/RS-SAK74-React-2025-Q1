import Button from 'components/Button';
import { FC, ReactEventHandler } from 'react';
import { cn } from 'utils/cn';

interface PaginationProps extends React.HTMLProps<HTMLDivElement> {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const Pagination: FC<PaginationProps> = ({
  page,
  totalPages,
  setPage,
  className,
  ...other
}) => {
  const handlePageChange: ReactEventHandler<HTMLButtonElement> = (ev) => {
    const { name } = ev.currentTarget;
    if (name === 'decrease') {
      setPage(Math.max(page - 1, 1));
    } else if (name === 'increase') {
      setPage(Math.min(page + 1, totalPages));
    }
  };

  return (
    <div className={cn('space-x-4 mt-4', className)} {...other}>
      <Button
        size="small"
        name="decrease"
        onClick={handlePageChange}
        disabled={page === 1}
      >
        ◀
      </Button>
      <span>
        Page {page} of {totalPages}
      </span>
      <Button
        size="small"
        name="increase"
        onClick={handlePageChange}
        disabled={page === totalPages}
      >
        ▶
      </Button>
    </div>
  );
};

export default Pagination;
