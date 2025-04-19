import clsx from 'clsx';
import {ClassByTypeCard} from '@/constants';
import {OfferListItem} from '@/types/offers';
import OfferCard from '@/components/offer-card/offer-card';

interface OfferListProps {
  offers: OfferListItem[];
  cardClassName: string;
  onCardAction?: (id: string | null) => void;
}

export default function OffersList({offers, cardClassName, onCardAction}: OfferListProps): JSX.Element {

  return (
    <div className={clsx(
      cardClassName === ClassByTypeCard.MainPageCardType && `${cardClassName}__places-list places__list tabs__content`,
      cardClassName === ClassByTypeCard.FavoritesPageCardType && `${cardClassName}__places`,
      cardClassName === ClassByTypeCard.OfferPageCardType && `${cardClassName}__list places__list`
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
            cardClassName={cardClassName}
            onCardHover={onCardAction}
          />
        ))
      }
    </div>
  );
}
