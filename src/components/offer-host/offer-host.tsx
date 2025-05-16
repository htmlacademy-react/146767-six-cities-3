import {Host} from '@/types/offers';

interface OfferHostProps {
  host: Host;
  description: string;
}

export default function OfferHost({host, description}: OfferHostProps): JSX.Element {

  const {
    isPro,
    avatarUrl,
    name
  } = host;

  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
          <img
            className="offer__avatar user__avatar"
            src={avatarUrl}
            width="74"
            height="74"
            alt="Host avatar"
          />
        </div>
        <span className="offer__user-name">
          {name}
        </span>
        {
          isPro && (
            <span className="offer__user-status">
              Pro
            </span>
          )
        }
      </div>
      <div className="offer__description">
        <p className="offer__text">
          {description}
        </p>
      </div>
    </div>
  );
}
