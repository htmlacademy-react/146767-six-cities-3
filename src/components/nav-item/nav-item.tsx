import clsx from 'clsx';
import {Link} from 'react-router-dom';
import {AppRoute} from '@/constants';

interface NavItemProps {
  location: string;
  isActive: boolean;
  onCityChangeClick: (city: string) => void;
}

export default function NavItem({location, isActive, onCityChangeClick}: NavItemProps): JSX.Element {
  return (
    <li className="locations__item">

      <Link to={AppRoute.Root}
        className={clsx(
          'locations__item-link tabs__item',
          isActive && 'locations__item-link tabs__item tabs__item--active'
        )}
        onClick={
          (evt) => onCityChangeClick(evt.currentTarget.textContent || '')
        }
      >
        <span>{location}</span>
      </Link>
    </li>
  );
}
