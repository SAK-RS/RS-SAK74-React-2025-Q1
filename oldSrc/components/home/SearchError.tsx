import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { FC } from 'react';

const SearchError: FC<{ error: unknown }> = ({ error }) => {
  let message: string;
  console.log(error);
  switch (true) {
    case error instanceof Error:
      message = error.message;
      break;
    case isFetchBaseQueryError(error): {
      message = error.status + ' ' + error.data;
      break;
    }
    default:
      message = 'Query error...';
  }

  return (
    <div className="text-red-500 text-2xl" data-testid="error-message">
      {message}... 😥{' '}
    </div>
  );
};

export default SearchError;

function isFetchBaseQueryError(err: unknown): err is FetchBaseQueryError {
  return Boolean((err as FetchBaseQueryError).status);
}
