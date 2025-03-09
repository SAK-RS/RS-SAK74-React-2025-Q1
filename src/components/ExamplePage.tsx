import { useNavigate } from 'react-router';

export default function Page() {
  const navigate = useNavigate();
  return (
    <main>
      <h1>Test page</h1>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="cursor-pointer"
      >
        Go back
      </button>
    </main>
  );
}
