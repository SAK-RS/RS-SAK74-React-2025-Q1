import { Link } from 'react-router';
import { useStateSelector } from 'store';
import { selectStoredFormData } from 'store/formsData.slice';
import EntryCard from './EntryCard';

const View = () => {
  const data = useStateSelector(selectStoredFormData);
  // const countries = useStateSelector(selectAllowedCountries);
  // console.log({ data, countries });

  return (
    <>
      <nav className="space-x-6">
        <Link to={'/native-form'}>Native form</Link>
        <Link to={'/hook-form'}>Hook form</Link>
      </nav>
      <h1>View</h1>
      <div className="flex flex-wrap">
        {data.map((entry) => (
          <EntryCard key={entry.timeStamp} entry={entry} />
        ))}
      </div>
    </>
  );
};

export default View;
