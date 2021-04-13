import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import validator from "validator";
import Main from "../Main/Main";
import HeaderAuthorized from "../HeaderAuthorized/HeaderAuthorized";

function Profile({ onUpdateProfile, onSignout }) {
  const currentUser = useContext(CurrentUserContext);

  const [formDisabled, setFormDisabled] = useState(false);

  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");

  const [errorNameMessage, setErrorNameMessage] = useState("");
  const [errorEmailMessage, setErrorEmailMessage] = useState("");

  const nameCheckRegexp = /^[-яА-Яa-zA-Z0-9- ]{2,30}$/gim;

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  function submitButtonDisabled() {
    if (
      errorNameMessage === "" &&
      errorEmailMessage === "" &&
      userData.email !== "" &&
      userData.name.length >= 2 &&
      userData.name.length <= 30 &&
      !isInitValues()
    ) {
      setButtonDisabled(false);
    }
  }

  function isInitValues() {

    if (
      userData.email === currentUser.email &&
      userData.name === currentUser.name
    ) {

      return true;
    } else {
      return false;
    }
  }

  function checkFormValid() {
    //  Проверка почты
    if (!validator.isEmail(userData.email) && userData.email !== "") {
      setErrorEmailMessage("Поле Email должно содержать корректный адрес");

      setButtonDisabled(true);
    } else {
      setErrorEmailMessage("");
    }

    if (nameCheckRegexp.test(userData.name) == false && userData.name !== "") {
      setErrorNameMessage(
        "Поле Имя должно содержать только латиницу, кириллицу, пробел или дефис"
      );

      setButtonDisabled(true);
    } else {
      setErrorNameMessage("");
    }

    if (isInitValues()) {
      setButtonDisabled(true);
    }
  }

  useEffect(() => {
    checkFormValid();
    submitButtonDisabled();
  }, [userData, buttonDisabled, errorNameMessage, errorEmailMessage]);

  function handleChange(e) {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit() {
    let { name, email } = userData;
    if (validator.isEmail(email)) {
      setButtonDisabled(true);
      setFormDisabled();
      onUpdateProfile(name, email);
    }
  }

  useEffect(() => {
    setProfileName(currentUser.name || "");
    // setProfileEmail(currentUser.email || "");
    setUserData({
      name: currentUser.name || "",
      email: currentUser.email || "",
    });
  }, [currentUser]);

  return (
    <>
      <Main>
        <HeaderAuthorized />
        <div className="main__container main__container_style_profile">
          <form action="" className="form">
            <h1 className="form__title form__title_page_profile">
              Привет, {profileName}!
            </h1>
            <fieldset className="form__set">
              <label className="form__group">
                <span className={"form__label form__label_style_profile"}>
                  Имя
                </span>
                <input
                  type="text"
                  name="name"
                  className="form__input form__input_style_profile"
                  placeholder="Имя пользователя"
                  onChange={handleChange}
                  value={userData.name}
                  disabled={formDisabled}
                />
              </label>
              <label className="form__group">
                <span className={"form__label form__label_style_profile"}>
                  Почта
                </span>
                <input
                  type="text"
                  className="form__input form__input_style_profile form__input_style_profile-noborder"
                  placeholder="Электронная почта"
                  name="email"
                  onChange={handleChange}
                  value={userData.email}
                  disabled={formDisabled}
                />
              </label>
            </fieldset>
          </form>
          <div className="footernav">
            <ul className="footernav__links">
              <li
                className={
                  "footernav__links-item " +
                  (buttonDisabled && "footernav__links-items_style_disabled")
                }
              >
                <a href="#" onClick={handleSubmit}>
                  Редактировать
                </a>
              </li>
              <li className="footernav__links-item footernav__links-items_style_highlighted">
                <a href="#" onClick={onSignout}>
                  Выйти из аккаунта
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Main>
    </>
  );
}

export default Profile;
