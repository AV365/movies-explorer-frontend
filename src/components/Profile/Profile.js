function Profile() {
  return (
    <>
      <div className="main__container main__container_style_profile">
        <form action="" className="form">
          <h1 className="form__title form__title_page_profile">
            Привет, Виталий!
          </h1>
          <fieldset className="form__set">
            <label className="form__group">
              <span className={"form__label form__label_style_profile"}>
                Имя
              </span>
              <input
                type="text"
                className="form__input form__input_style_profile"
                placeholder={"Виталий"}
              />
            </label>
            <label className="form__group">
              <span className={"form__label form__label_style_profile"}>
                Почта
              </span>
              <input
                type="text"
                className="form__input form__input_style_profile form__input_style_profile-noborder"
                placeholder={"pochta@yandex.ru"}
              />
            </label>
          </fieldset>
        </form>
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
      </div>
    </>
  );
}

export default Profile;
