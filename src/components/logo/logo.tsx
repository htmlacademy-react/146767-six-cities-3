import {Link} from 'react-router-dom';
import {useAppDispatch} from '@/hooks';
import {changeCity, changeSorting} from '@/store/user/user.slice';
import {AppRoute, DEFAULT_CITY, DEFAULT_SORTING_TYPE} from '@/constants';

type LogoProps = {
  type: 'header' | 'footer';
}

const sizes = {
  header: {
    width: 81,
    height: 41,
  },
  footer: {
    width: 64,
    height: 33,
  }
};

export default function Logo({type}: LogoProps): JSX.Element {
  const dispatch = useAppDispatch();
  const size = sizes[type];

  return (
    <Link
      to={AppRoute.Root}
      className={`${type}__logo-link`}
      data-testid="logo"
      onClick={
        () => {
          dispatch(changeCity(DEFAULT_CITY));
          dispatch(changeSorting(DEFAULT_SORTING_TYPE));
        }
      }
    >
      <img
        className={`${type}__logo`}
        src="img/logo.svg"
        alt="6 cities logo"
        {...size}
      />
    </Link>
  );
}
