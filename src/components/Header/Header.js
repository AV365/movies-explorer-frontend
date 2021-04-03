function Header() {
  return (
    <>
      <header className="header header_theme_dark">
        <div className="header__content">
          <a href="/">
            <div className="logo"/>
          </a>
          <div className="navigation navigation_align_right">
            <ul className="navigation_links navigation__links_type_home">
              <li className="navigation__link">
                <a href="/signup">Регистрация</a>
              </li>
              <li className="button button_signin">
                <a href="/signin">Войти</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
