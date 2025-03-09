import { Route } from './+types/DetailsRoute';
import Details from 'components/home/Details';

export default function DetailsRoute({ params: { id } }: Route.ComponentProps) {
  return (
    <div className="w-md sticky top-16">
      <Details id={id} />
    </div>
  );
}
