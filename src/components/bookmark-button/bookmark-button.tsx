import clsx from 'clsx';
import {useNavigate} from 'react-router-dom';
import {getIsAuthStatus} from '@/store/user/user.selectors';
import {postFavoriteAction} from '@/store/favorites/favorites.api';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {
  AppRoute,
  ClassByTypeButton,
  FavoriteStatus
} from '@/constants';

interface BookmarkButtonProps {
  id: string;
  isFavorite: boolean;
  buttonClassName: string;
}

const typesCard = {
  [ClassByTypeButton.OfferCardButtonType]: {
    className: ClassByTypeButton.OfferCardButtonType,
    size: {
      width: 18,
      height: 19
    }
  },
  [ClassByTypeButton.FullOfferButtonType]: {
    className: ClassByTypeButton.FullOfferButtonType,
    size: {
      width: 31,
      height: 33
    }
  },
};

export default function BookmarkButton({
  id,
  isFavorite,
  buttonClassName,
}: BookmarkButtonProps) {
  const isAuth = useAppSelector(getIsAuthStatus);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {className, size} = typesCard[buttonClassName];

  const favoriteStatus = (
    isFavorite ?
      FavoriteStatus.Removed :
      FavoriteStatus.Added
  );

  const handleFavoriteButtonClick = () => {
    if (!isAuth) {
      navigate(AppRoute.Login);
    }

    if (isAuth) {
      dispatch(postFavoriteAction({
        id,
        status: favoriteStatus
      }));
    }
  };

  return (
    <button
      className={clsx(
        `${className}__bookmark-button button`,
        isFavorite && `${className}__bookmark-button--active`
      )}
      type="button"
      onClick={handleFavoriteButtonClick}
    >
      <svg
        className={`${className}__bookmark-icon`}
        {...size}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
