import clsx from 'clsx';
import {useRef, useState} from 'react';
import {useClickAway} from 'react-use';
import {useAppSelector, useAppDispatch} from '@/hooks';
import {changeSorting} from '@/store/user-action/user-action';
import {getCurrentSorting} from '@/store/user-action/selectors';
import {SortingType} from '@/constants';

export default function PlacesSorting(): JSX.Element {
  const currentSorting = useAppSelector(getCurrentSorting);
  const [isOpened, setIsOpened] = useState(false);
  const sortRef = useRef(null);

  const dispatch = useAppDispatch();

  useClickAway(
    sortRef,
    () => {
      setIsOpened(false);
    });

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      ref={sortRef}
    >
      <span className="places__sorting-caption">
        Sort by&nbsp;
      </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened((prevActive) => !prevActive)}
      >
        {currentSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={clsx(
          'places__options places__options--custom',
          isOpened && 'places__options--opened'
        )}
        tabIndex={0}
      >
        {
          Object.values(SortingType).map((type) => (
            <li
              key={type}
              className={clsx(
                'places__option',
                type === currentSorting && 'places__option--active',
              )}
              tabIndex={0}
              onClick={() => {
                dispatch(changeSorting(type));
                setIsOpened((prevActive) => !prevActive);
              }}
            >
              {type}
            </li>
          ))
        }
      </ul>
    </form>
  );
}
