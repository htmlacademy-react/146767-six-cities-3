import clsx from 'clsx';
import {
  TypeCard,
  MAIN_PAGE_CLASS,
  FAVORITES_PAGE_CLASS,
  OFFER_PAGE_CLASS
} from '@/constants';
import {OfferListItem} from '@/types/offers';
import OfferCard from '@/components/offer-card/offer-card';

interface OfferListProps {
  offers: OfferListItem[];
  typeCard: TypeCard;
  onCardAction?: (id: string | null) => void;
}

const typesCard = {
  [TypeCard.MainPageCardType]: {
    className: MAIN_PAGE_CLASS,
    size: {
      width: 260,
      height: 200
    }
  },
  [TypeCard.FavoritesPageCardType]: {
    className: FAVORITES_PAGE_CLASS,
    size: {
      width: 150,
      height: 110
    }
  },
  [TypeCard.OfferPageCardType]: {
    className: OFFER_PAGE_CLASS,
    size: {
      width: 260,
      height: 200
    }
  }
};

export default function OffersList({offers, typeCard, onCardAction}: OfferListProps): JSX.Element {
  const {className, size} = typesCard[typeCard];

  return (
    <div className={clsx(
      className === MAIN_PAGE_CLASS && `${className}__places-list places__list tabs__content`,
      className === FAVORITES_PAGE_CLASS && `${className}__places`,
      className === OFFER_PAGE_CLASS && `${className}__list places__list`
    )}
    >
      {
        offers.map((offer) => (
          <OfferCard
            key={offer.id}
            id={offer.id}
            title={offer.title}
            type={offer.type}
            price={offer.price}
            isFavorite={offer.isFavorite}
            isPremium={offer.isPremium}
            rating={offer.rating}
            previewImage={offer.previewImage}
            className={className}
            size={size}
            onCardHover={onCardAction}
          />
        ))
      }
    </div>
  );
}
