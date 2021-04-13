import pic1 from "../../images/student_photo.png";

function Tmp() {
  return (
    <>
      <header className="header">
        <div className="header__content   ">
          <div className="logo"></div>
          <div className="navigation navigation_align_justify">
            <ul className="navigation_links">
              <li className="navigation__link navigation__link_mode_active">
                Фильмы
              </li>
              <li className="navigation__link">Сохраненные фильмы</li>
            </ul>
            <button className="button button_account">Аккаунт</button>
          </div>
        </div>
      </header>

      <main>
        <div className="about">
          <h2 className="title">О проекте</h2>
          <div className="about__content">
            <div className="about__item">
              <h3 className="about__header">
                Дипломный проект включал 5 этапов
              </h3>
              <p className="about__text">
                Составление плана, работу над бэкендом, вёрстку, добавление
                функциональности и финальные доработки.
              </p>
            </div>
            <div className="about__item">
              <h3 className="about__header">
                На выполнение диплома ушло 5 недель
              </h3>
              <p className="about__text">
                У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                соблюдать, чтобы успешно защититься.
              </p>
            </div>
          </div>
          <div className="timeline">
            <div className="timeline__item  timeline__item_size_20">
              <div className="timeline__step timeline__step_style_one">
                <p className="timeline__time">1 неделя</p>
              </div>
              <p className="timeline__note">Back-end</p>
            </div>
            <div className="timeline__item timeline__item_size_80">
              <div className="timeline__step timeline__step_style_two">
                <p className="timeline__time">4 недели</p>
              </div>
              <p className="timeline__note">Front-end</p>
            </div>
          </div>
        </div>
        <div className="technology">
          <div className="technology__content">
            <h3 className="title">Технологии</h3>
            <p className="technology__header">7 технологий</p>
            <p className="technology__text">
              На курсе веб-разработки мы освоили технологии, которые применили в
              дипломном проекте.
            </p>
            <ul className="tabs">
              <li className="tabs__item">HTML</li>
              <li className="tabs__item">CSS</li>
              <li className="tabs__item">JS</li>
              <li className="tabs__item">REACT</li>
              <li className="tabs__item">Git</li>
              <li className="tabs__item">Express.js</li>
              <li className="tabs__item">MongoDB</li>
            </ul>
          </div>
        </div>
        <div className="aboutme">
          <div className="title">Студент</div>
          <img src={pic1} alt="Фото Виталия" className="aboutme__pic" />
          <p className="aboutme__name">Виталий</p>
          <p className="aboutme__info">Фронтенд-разработчик, 30 лет</p>
          <p className="aboutme__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <ul className="aboutme__links">
            <li className="aboutme__link">Facebook</li>
            <li className="aboutme__link">Github</li>
          </ul>
          <div className="portfolio">
            <p className="portfolio__header">Портфолио</p>
            <ul className="portfolio__links">
              <li className="portfolio__link">Статичный сайт</li>
              <li className="portfolio__link">Адаптивный сайт</li>
              <li className="portfolio__link">Одностраничное приложение</li>
            </ul>
          </div>
        </div>
      </main>
      <div className="search">
        <form className="search__form">
          <input placeholder="Фильм" type="text" className="search__field" />
          <button type="submit" className="button button_search" />
          <label className="search__shortfilm-label">
            <input type="checkbox" className="search__shortfilm-checkbox" />
            <span className="search__shortfilm-slider"></span>
            <span className="search__shortfilm-text">Короткометражки</span>
          </label>
        </form>
      </div>
      <div className="films">
        <ul className="cards">
          <li className="card">
            <img src={pic1} alt="" className="card__pic" />

            <div className="card__footer">
              <h3 className="card__title">43 слова о дизайне</h3>
              <p className="card__duration">1ч 17м</p>
            </div>
            <button className="button button_save">Сохранить</button>
            <button className="button button_delete" />
          </li>
          <li className="card">
            <img src={pic1} alt="" className="card__pic" />

            <div className="card__footer">
              <h3 className="card__title">
                33 слова о дизайне 33 слова о дизайне 33 слова о дизайне 33
                слова о дизайне
              </h3>
              <p className="card__duration">1ч 17м</p>
            </div>
            <button className="button button_save">Сохранить</button>
            <button className="button button_delete" />
          </li>
          <li className="card">
            <img src={pic1} alt="" className="card__pic" />

            <div className="card__footer">
              <h3 className="card__title">33 слова о дизайне</h3>
              <p className="card__duration">1ч 17м</p>
            </div>
            <button className="button button_save">Сохранить</button>
            <button className="button button_delete" />
          </li>
          <li className="card">
            <img src={pic1} alt="" className="card__pic" />

            <div className="card__footer">
              <h3 className="card__title">33 слова о дизайне</h3>
              <p className="card__duration">1ч 17м</p>
            </div>
            <button className="button button_save">Сохранить</button>
            <button className="button button_delete" />
          </li>
          <li className="card">
            <img src={pic1} alt="" className="card__pic" />

            <div className="card__footer">
              <h3 className="card__title">33 слова о дизайне</h3>
              <p className="card__duration">1ч 17м</p>
            </div>
            <button className="button button_save">Сохранить</button>
            <button className="button button_delete" />
          </li>
        </ul>
        <button className="button button_main">Еще</button>
      </div>

      <form action="" className="form">
        <div className="logo"></div>
        <h1 className="form__title">Добро пожаловать!</h1>
        <fieldset className="form__set">
          <label>
            <span className={"form__label"}>Имя</span>
            <input type="text" className="form__input" />
            <span className={"form__error form__error_visibility_hidden"}>
              Ошибка
            </span>
          </label>
          <label>
            <span className={"form__label"}>E-mail</span>
            <input type="text" className="form__input" />
            <span className={"form__error"}>Ошибка</span>
          </label>
          <label>
            <span className={"form__label"}>Пароль</span>
            <input type="text" className="form__input" />
            <span className={"form__error"}>Ошибка</span>
          </label>
        </fieldset>
        <button className="button button_submit">Зарегистрироваться</button>
      </form>

      <div className="footernav">
        <p className="footernav__text">
          Уже зарегистрированы?{" "}
          <a href="#" className="footernav__link">
            Войти
          </a>
        </p>
      </div>
      <div className="footernav">
        <ul className="footernav__links">
          <li className="footernav__links-item">
            <a href="#">Редактировать</a>
          </li>
          <li className="footernav__links-item footernav__links-items_style_highlighted">
            <a href="#">Выйти из аккаунта</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Tmp;
