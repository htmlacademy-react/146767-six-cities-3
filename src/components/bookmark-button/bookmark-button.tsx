import clsx from 'clsx';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getIsAuthStatus} from '@/store/user/user.selectors';
import {selectFavoriteIds} from '@/store/favorites/favorites.selectors';
import {postFavoriteAction} from '@/store/favorites/favorites.api';
import {
  useAppDispatch,
  useAppSelector
} from '@/hooks';
import {
  AppRoute,
  ClassByTypeButton,
  FavoriteStatus,
} from '@/constants';

interface BookmarkButtonProps {
  id: string;
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
  buttonClassName,
}: BookmarkButtonProps) {

  const [isLoadingStatus, setIsLoadingStatus] = useState({
    [id]: false,
  });

  const isAuth = useAppSelector(getIsAuthStatus);
  const isFavorite = useAppSelector(selectFavoriteIds).includes(id);

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
      setIsLoadingStatus(({[id]: true}));

      dispatch(postFavoriteAction({
        id,
        status: favoriteStatus
      }))
        .then(() => setIsLoadingStatus(({[id]: false})));
    }
  };

  return (
    <button
      className={clsx(
        `${className}__bookmark-button button`,
        isFavorite && isAuth && `${className}__bookmark-button--active`
      )}
      data-testid="bookmark-button"
      type="button"
      onClick={handleFavoriteButtonClick}
      disabled={isLoadingStatus[id]}
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
