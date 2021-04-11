import React, { useState, useEffect } from "react";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import validator from "validator";
import Main from "../Main/Main";

function Login({ onLogin, loginMessage }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  function submitButtonDisabled() {
    if (
      errorEmailMessage === "" &&
      errorPasswordMessage === "" &&
      userData.email !== "" &&
      userData.password.length >= 8
    ) {
      setButtonDisabled(false);
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

    //Проверка пароля
    if (userData.password.length < 8 && userData.password !== "") {
      setErrorPasswordMessage(
        "Поле Пароль должно содержать минимум 8 символов"
      );

      setButtonDisabled(true);
    } else {
      setErrorPasswordMessage("");
    }
  }

  useEffect(() => {
    checkFormValid();
    submitButtonDisabled();
  }, [userData, buttonDisabled, errorEmailMessage, errorPasswordMessage]);

  function handleChange(e) {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {

    e.preventDefault();
    let { email, password } = userData;
    if (validator.isEmail(email) && password.length >= 8) {
      onLogin(email, password)
        .then(() => {})
        .catch(() => {});
    }
  }

  return (
    <>
      <Main fullframe="true">
      <div className="main__container">
        <form action="" className="form">
          <a href="/">
            <div className="logo"></div>
          </a>
          <h1 className="form__title">Рады видеть!</h1>
          <fieldset className="form__set">
            <label>
              <span className={"form__label"}>E-mail</span>
              <input
                type="text"
                className={
                  "form__input " +
                  (errorEmailMessage && "form__input_valid_false")
                }
                name="email"
                required
                onChange={handleChange}
              />
              <span
                className={
                  "form__error " +
                  (errorEmailMessage && "form__error_visibility_visible")
                }
              >
                {errorEmailMessage}
              </span>
            </label>
            <label>
              <span className={"form__label"}>Пароль</span>
              <input
                type="password"
                className={
                  "form__input " +
                  (errorPasswordMessage && "form__input_valid_false")
                }
                name="password"
                required
                onChange={handleChange}
              />
              <span
                className={
                  "form__error " +
                  (errorPasswordMessage && "form__error_visibility_visible")
                }
              >
                {errorPasswordMessage}
              </span>
            </label>
          </fieldset>

        <div className="footernav">
          {loginMessage && <p>{loginMessage}</p> }
          <button
            className={"button button_submit "  + (buttonDisabled && "button_disabled")}
            onClick={handleSubmit}
            disabled={buttonDisabled}
          >
            Войти
          </button>
          <p className="footernav__text">
            Еще не зарегистрированы?&nbsp;&nbsp;
            <a href="/signup" className="footernav__link">
              Регистрация
            </a>
          </p>
        </div>
        </form>
      </div>
      </Main>
    </>
  );
}

export default Login;
