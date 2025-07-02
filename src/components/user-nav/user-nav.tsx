import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {logoutAction} from '@/store/user/user.api';
import {fetchFavoritesAction} from '@/store/favorites/favorites.api';
import {getIsAuthStatus, getUserData} from '@/store/user/user.selectors';
import {getFavorites, getFavoritesStatus} from '@/store/favorites/favorites.selectors';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {AppRoute, RequestStatus} from '@/constants';

export default function UserNav(): JSX.Element {
  const userData = useAppSelector(getUserData);
  const favorites = useAppSelector(getFavorites);
  const requestFavoritesStatus = useAppSelector(getFavoritesStatus);
  const isAuth = useAppSelector(getIsAuthStatus);

  const {
    email,
    avatarUrl,
  } = userData ?? {};

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      requestFavoritesStatus === RequestStatus.Idle &&
      isAuth
    ) {
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, requestFavoritesStatus, isAuth]);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            className="header__nav-link header__nav-link--profile"
            to={
              isAuth
                ? AppRoute.Favorites
                : AppRoute.Login
            }
          >
            <div className="header__avatar-wrapper user__avatar-wrapper">
              {isAuth && (
                <img
                  className="header__avatar user__avatar"
                  src={avatarUrl}
                  alt="User avatar"
                />
              )}
            </div>
            {isAuth && (
              <>
                <span className="header__user-name user__name">
                  {email}
                </span>
                <span className="header__favorite-count">
                  {favorites.length}
                </span>
              </>
            )}
            {!isAuth && (
              <span className="header__login">
                Sign in
              </span>
            )}
          </Link>
        </li>
        {isAuth && (
          <li className="header__nav-item">
            <button
              className="header__nav-link"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => {
                dispatch(logoutAction());
              }}
            >
              <span className="header__signout">
                Sign out
              </span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
