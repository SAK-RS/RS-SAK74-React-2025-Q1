import { useNavigate } from 'react-router';

const ExamplePage = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };
  return (
    <>
      <h1>Here you are...</h1>
      <button className="cursor-pointer" onClick={onClick}>
        Go back
      </button>
    </>
  );
};

export default ExamplePage;
