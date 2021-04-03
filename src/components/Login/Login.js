function Login() {
  return (
    <>
      <div className="main__container">
        <form action="" className="form">
          <a href="/">
            <div className="logo"></div>
          </a>
          <h1 className="form__title">Рады видеть!</h1>
          <fieldset className="form__set">
            <label>
              <span className={"form__label"}>E-mail</span>
              <input type="text" className="form__input" value={"pochta@yandex.ru"}/>
              <span className={"form__error"}>Ошибка</span>
            </label>
            <label>
              <span className={"form__label"}>Пароль</span>
              <input type="password" className="form__input" />
              <span className={"form__error"}>Ошибка</span>
            </label>
          </fieldset>
        </form>
        <div className="footernav">
          <button className="button button_submit">Войти</button>
          <p className="footernav__text">
            Еще не зарегистрированы?&nbsp;&nbsp;
            <a href="/signup" className="footernav__link">
              Регистрация
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
