import { NextPageContext } from 'next';
import Error from 'next/error';
import { useRouter } from 'next/router';

export default function ErrorPage({ statusCode }) {
  const is404Error = statusCode === 404;
  const { back } = useRouter();
  return (
    <div>
      <button
        onClick={() => {
          back();
        }}
      >
        Go back
      </button>
      {false ? (
        <h3>Custom 404 error</h3>
      ) : (
        <Error
          statusCode={statusCode}
          title={is404Error && 'It looks that is nothing here...'}
        />
      )}
    </div>
  );
}

ErrorPage.getInitialProps = ({ err, res }: NextPageContext) => {
  console.log({ err, res });
  const statusCode = res.statusCode;
  return { statusCode };
};
