import { FC } from 'react';
import RingLoader from 'react-spinners/RingLoader';

const spinnerProps: Parameters<typeof RingLoader>[number] = {
  size: 100,
  color: 'var(--color-primary)',
  cssOverride: {
    margin: '20px auto',
    opacity: 0.7,
  },
};

const Spinner: FC<{ loading: boolean }> = ({ loading }) => {
  return <RingLoader {...spinnerProps} loading={loading} />;
};

export default Spinner;
