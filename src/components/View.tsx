import { Link } from 'react-router';

const View = () => {
  return (
    <>
      <nav className="space-x-6">
        <Link to={'/native-form'}>Native form</Link>
        <Link to={'/hook-form'}>Hook form</Link>
      </nav>
      <h1>View</h1>
    </>
  );
};

export default View;
