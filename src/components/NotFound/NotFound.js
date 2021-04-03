function NotFound() {
  return (
    <>
        <div className="main__container">
        <div className="notfound">
            <h1 className="notfound__header">404</h1>
            <p className="notfound__text">Страница не найдена</p>
        </div>
      <div className="footernav">
        <p className="footernav__text">
          <a href="/" className="footernav__link">
            Назад
          </a>
        </p>
      </div>
        </div>
    </>
  );
}

export default NotFound;
