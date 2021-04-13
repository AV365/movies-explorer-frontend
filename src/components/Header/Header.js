function Header({ loggedIn }) {
  return (
    <>
      <header className="header header_theme_dark">
        <div className="header__content">
          <a href="/">
            <div className="logo" />
          </a>
          <div className="navigation navigation_align_right">
            <ul className="navigation_links navigation__links_type_home">
              {loggedIn && (
                <>
                  <li className="button button_signin">
                    <a href="/movies">Фильмы</a>
                  </li>
                  <li className="button button_signin">
                    <a href="/saved-movies">Сохраненные фильмы</a>
                  </li>
                  <li className="button button_signin">
                    <a href="/profile">Аккаунт</a>
                  </li>
                </>
              )}
              {!loggedIn && (
                <>
                  <li className="navigation__link">
                    <a href="/signup">Регистрация</a>
                  </li>
                  <li className="button button_signin">
                    <a href="/signin">Войти</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
