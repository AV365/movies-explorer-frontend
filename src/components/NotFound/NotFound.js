import {useLocation, useHistory } from "react-router-dom"
import Main from "../Main/Main";


function NotFound() {
const history = useHistory();

  return (
    <>
        <Main fullframe="true">
        <div className="main__container">
        <div className="notfound">
            <h1 className="notfound__header">404</h1>
            <p className="notfound__text">Страница не найдена</p>
        </div>
      <div className="footernav">
        <p className="footernav__text">
          <a href="#" className="footernav__link" onClick={() => history.goBack()}>
            Назад
          </a>
        </p>
      </div>
        </div>
        </Main>
    </>
  );
}

export default NotFound;
