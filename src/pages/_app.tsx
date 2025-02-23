import { AppProps } from 'next/app';
import 'index.css';

export default function App({ Component }: AppProps) {
  return (
    <div>
      <h1>Hi here!</h1>
      <Component />
    </div>
  );
}
