import { useNavigate } from 'react-router';

const Form = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Hook form</h1>
      <form action=""></form>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back
      </button>
    </>
  );
};

export default Form;
