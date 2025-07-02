import {Helmet} from 'react-helmet-async';
import {useAppSelector} from '@/hooks';
import {getOffersError} from '@/store/offers/offers.selectors';
import {getFullOfferError} from '@/store/full-offer/full-offer.selectors';
import {RequestMessageError} from '@/constants';
import styles from './error-message.module.css';

export default function ErrorMessage(): JSX.Element {
  const offersErrorMessage = useAppSelector(getOffersError);
  const fullOfferErrorMessage = useAppSelector(getFullOfferError);

  const offerErrorText = RequestMessageError.OffersLoadingFailed;
  const fullOfferErrorText = RequestMessageError.FullOfferLoadingFailed;

  return (
    <div
      className="page page--gray page--main"
      data-testid="error-message"
    >

      <Helmet>
        <title>
          6 cities | Что-то сломалось...
        </title>
      </Helmet>

      <main className={`${styles.page__main} page__main--index`}>
        <h1 className="visually-hidden">Page Error</h1>

        <img className={styles.image__main}
          src="img/error-message.jpg" alt="Страница не найдена"
        />

        <p className={styles.title__main}>
          {offersErrorMessage && (
            `${offerErrorText} ${offersErrorMessage}`
          )}
          {fullOfferErrorMessage && (
            `${fullOfferErrorText} ${fullOfferErrorMessage}`
          )}
        </p>

        <p className={styles.text__main}>
          Что-то пошло не так...
          &#34;- Ошибку исправляете?&#34;
          &#34;- Только показываем!&#34;
        </p>

        <button
          className={styles.link__main}
          onClick={() => location.reload()}
        >
          Обновить страницу
        </button>

      </main>
    </div>
  );
}
