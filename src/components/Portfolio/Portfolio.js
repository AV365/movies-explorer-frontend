function Portfolio() {
  return (
    <>
      <div className="portfolio">
        <p className="portfolio__header">Портфолио</p>
        <ul className="portfolio__links">
          <li>
            <a
              href="https://github.com/AV365/how-to-learn"
              target="_blank"
              className="portfolio__link"
            >
              Статичный сайт
            </a>
          </li>
          <li>
            <a
              href="https://github.com/AV365/russian-travel"
              target="_blank"
              className="portfolio__link"
            >
              Адаптивный сайт
            </a>
          </li>
          <li>
            <a
              href="https://github.com/AV365/react-mesto-api-full"
              target="_blank"
              className="portfolio__link"
            >
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Portfolio;
