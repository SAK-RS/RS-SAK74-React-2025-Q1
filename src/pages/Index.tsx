import { redirect } from 'react-router';

export async function loader() {
  return redirect('/search');
}

export default function Index() {
  return null;
}
