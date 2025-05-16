import {Helmet} from 'react-helmet-async';
import {useAppSelector} from '@/hooks';
import {getError} from '@/store/load-action/selectors';
import styles from './error-message.module.css';

export default function ErrorMessage(): JSX.Element {
  const error = useAppSelector(getError);

  return (
    <div className="page page--gray page--main">

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
          Ошибка: {error}
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
