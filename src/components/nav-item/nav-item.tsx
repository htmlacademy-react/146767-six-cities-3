import clsx from 'clsx';
import {Link} from 'react-router-dom';
import {AppRoute, DEFAULT_SORTING_TYPE} from '@/constants';
import {useAppDispatch} from '@/hooks';
import {changeCity, changeSorting} from '@/store/user-action/user-action';

interface NavItemProps {
  location: string;
  isActive: boolean;
}

export default function NavItem({location, isActive}: NavItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <li className="locations__item">
      <Link
        to={AppRoute.Root}
        className={clsx(
          'locations__item-link tabs__item',
          isActive && 'locations__item-link tabs__item tabs__item--active'
        )}
        onClick={
          () => {
            dispatch(changeCity(location));
            dispatch(changeSorting(DEFAULT_SORTING_TYPE));
          }
        }
      >
        <span>
          {location}
        </span>
      </Link>
    </li>
  );
}
