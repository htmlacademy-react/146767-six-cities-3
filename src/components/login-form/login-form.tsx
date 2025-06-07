import {ChangeEvent, useState} from 'react';
import {getLoginStatus} from '@/store/user/user.selectors';
import {loginAction} from '@/store/user/user.api';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {RequestStatus} from '@/constants';

const enum TextButtonSubmit {
  LOGIN = 'Sign in',
  IN_PROGRESS = 'Loading…',
}

const enum FormValidMessage {
  LOGIN_VALID_ERR = 'Введен не корректный e-mail',
  PASSWORD_VALID_ERR = 'Пароль должен состоять минимум из одной буквы и цифры',
  EMPTY_FORM_ERR = 'Заполните все поля',
}

const validateLogin = (login: string) =>
  (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(login));
const validatePassword = (password: string) =>
  (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/.test(password));

export default function LoginForm () {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isTouched, setTouched] = useState({
    email: false,
    password: false,
  });

  const {email, password} = formData;
  const {email: isEmail, password: isPassword} = isTouched;

  const dispatch = useAppDispatch();

  const loginStatus = useAppSelector(getLoginStatus);

  const isSubmitting = loginStatus === RequestStatus.Loading;

  const isLogValid = validateLogin(email);
  const isPassValid = validatePassword(password);

  const isLogEmpty = email === '';
  const isPassEmpty = password === '';
  const isValidForm = isLogValid && isPassValid;

  const handleFormChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = evt.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFocus = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name} = evt.target;

    setTouched({
      ...isTouched,
      [name]: true
    });
  };

  const handleBlur = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name} = evt.target;

    setTouched({
      ...isTouched,
      [name]: false
    });
  };

  const handleFormSubmit = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isValidForm) {
      return;
    }

    dispatch(loginAction({
      login: email,
      password: password
    }));
  };

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form
        className="login__form form"
        action="#"
        method="post"
        onSubmit={handleFormSubmit}
      >
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">E-mail</label>
          <input
            className="login__input form__input"
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleFormChange}
          />
        </div>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">Password</label>
          <input
            className="login__input form__input"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleFormChange}
          />
        </div>
        <button
          className="login__submit form__submit button"
          type="submit"
          disabled={!isValidForm || isSubmitting}
        >
          {
            isSubmitting ?
              TextButtonSubmit.IN_PROGRESS :
              TextButtonSubmit.LOGIN
          }
        </button>
        {
          !isValidForm && (
            <>
              <div
                style={{
                  paddingTop: '10px',
                  color: 'red',
                  fontStyle: 'oblique',
                }}
              >
                <span>
                  {!isLogValid &&
                  !isLogEmpty &&
                  isEmail &&
                  FormValidMessage.LOGIN_VALID_ERR}
                </span>
                <span>
                  {!isPassValid &&
                  !isPassEmpty &&
                  isPassword &&
                  FormValidMessage.PASSWORD_VALID_ERR}
                </span>
              </div>
              <div
                style={{
                  paddingTop: '10px',
                  color: 'gray',
                  fontWeight: 'bold',
                  fontStyle: 'oblique',
                  opacity: '0.6',
                }}
              >
                <span>
                  {(isLogEmpty ||
                    isPassEmpty) &&
                    (isEmail ||
                    isPassword) &&
                    FormValidMessage.EMPTY_FORM_ERR}
                </span>
              </div>
            </>
          )
        }
      </form>
    </section>
  );
}
