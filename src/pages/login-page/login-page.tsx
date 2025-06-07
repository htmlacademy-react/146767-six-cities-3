import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {useAppDispatch} from '@/hooks';
import {changeCity} from '@/store/user/user.slice';
import {AppRoute, LOCATIONS, PageTitle} from '@/constants';
import Header from '@/components/header/header';
import LoginForm from '@/components/login-form/login-form';

export default function LoginPage(): JSX.Element {
  const randomIndex = Math.floor(Math.random() * LOCATIONS.length);
  const randomLocation = LOCATIONS[randomIndex];

  const dispatch = useAppDispatch();

  return (
    <div className="page page--gray page--login">

      <Helmet>
        <title>
          {PageTitle.LoginPage}
        </title>
      </Helmet>

      <Header hiddenUserNav />

      <main className="page__main page__main--login">
        <div className="page__login-container container">

          <LoginForm />

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Root}
                onClick={() => dispatch(changeCity(randomLocation))}
              >
                <span>
                  {randomLocation}
                </span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
