import NavItem from '@/components/nav-item/nav-item';
import {Locations} from '@/constants';

interface NavListProps {
  city: string;
  onCityChangeClick: (city: string) => void;
}

export default function NavList({city, onCityChangeClick}:NavListProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            Locations.map((location) => (
              <NavItem
                key={location}
                location={location}
                isActive={location === city}
                onCityChangeClick={onCityChangeClick}
              />
            ))
          }
        </ul>
      </section>
    </div>
  );
}
