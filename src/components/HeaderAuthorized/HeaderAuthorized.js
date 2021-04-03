
function HeaderAuthorized() {
  return (
    <>
      <header className="header">
        <div className="header__content">
          <a href="/" alt="Главная страница">
            <div className="logo"></div>
          </a>
          <nav className="navigation navigation_align_justify">
            <ul className="navigation_links">
              <li className="navigation__link navigation__link_mode_active navigation__link_theme_light">
                <a href="/movies">Фильмы</a>
              </li>
              <li className="navigation__link navigation__link_theme_light">
                <a href="/saved-movies">Сохраненные фильмы</a>
              </li>
            </ul>
            <a href="/profile" className="button button_account">Аккаунт</a>
            <div className="burger" id="burger">
              <input type="checkbox" className="burger__checkbox"/>
              <span className="burger__button burger__button_value_off"></span>
              <span className="burger__button burger__button_value_on"></span>
              <div className="burger__menu-container">
                <ul id="burger__menu">
                  <li><a href="/" className="burger__link">Главная</a></li>
                  <li><a href="/movies" className="burger__link">Фильмы</a></li>
                  <li><a href="/saved-movies" className="burger__link">Сохраненные фильмы</a></li>
                  <li><a href="/profile" className="button button_account button_account-mobile">Аккаунт</a></li>
                </ul>

              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default HeaderAuthorized;
