import { useRouteError, isRouteErrorResponse } from 'react-router';

const ErrorElement = () => {
  const error = useRouteError();
  let message = 'Something went wrong...';
  console.log({ error });
  if (isRouteErrorResponse(error)) {
    message = error.data;
  }
  if (error instanceof Error) {
    message = error.message;
  }

  return <div>{message}</div>;
};

export default ErrorElement;
