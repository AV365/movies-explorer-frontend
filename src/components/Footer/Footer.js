function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer__content">
          <p className="footer__text">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </p>
          <ul className="footer__links">
            <li className="footer__link">
              <a href="https://praktikum.yandex.ru/" target="_blank">
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__link">
              <a href="https://github.com/" target="_blank">
                Github
              </a>
            </li>
            <li className="footer__link">
              <a href="https://www.facebook.com/" target="_blank">
                Facebook
              </a>
            </li>
          </ul>
          <p className="footer__copyright">© 2020</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
