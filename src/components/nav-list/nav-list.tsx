import {memo} from 'react';
import {LOCATIONS} from '@/constants';
import NavItem from '@/components/nav-item/nav-item';

interface NavListProps {
  city: string;
}

export default function NavList({city}:NavListProps): JSX.Element {
  const MemoNavItem = memo(NavItem);

  return (
    <div
      className="tabs"
      data-testid="nav-list"
    >
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            LOCATIONS.map((location) => (
              <MemoNavItem
                key={location}
                location={location}
                isActive={location === city}
              />
            ))
          }
        </ul>
      </section>
    </div>
  );
}
