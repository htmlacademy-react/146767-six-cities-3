import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {AppRoute, PageTitle} from '@/constants';
import styles from './not-found-page.module.css';

export default function NotFoundPage(): JSX.Element {
  return (
    <div
      className="page page--gray page--main"
      data-testid="not-found-page"
    >

      <Helmet>
        <title>
          {PageTitle.PageNotFound}
        </title>
      </Helmet>

      <main className={`${styles.page__main} page__main--index`}>
        <h1 className="visually-hidden">Page 404</h1>

        <img className={styles.image__main}
          src="img/page-not-found.jpg" alt="Страница не найдена"
        />

        <p className={styles.title__main}>
          Ошибка: 404
        </p>

        <p className={styles.text__main}>
          Ничего не найдено по этому адресу | не пугайте так кота!
        </p>

        <Link
          className={styles.link__main}
          to={AppRoute.Root}
        >
          К списку городов
        </Link>

      </main>
    </div>
  );
}
