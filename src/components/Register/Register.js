import React, { useState, useEffect } from "react";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import validator from "validator";
import Main from "../Main/Main";

function Register({
                    onRegister,
                    registerMessage,
                 }) {

  console.log(registerMessage);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });



  const [errorNameMessage, setErrorNameMessage] = useState("");
  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const nameCheckRegexp = /^[-яА-Яa-zA-Z0-9- ]{2,30}$/gim;

  function submitButtonDisabled() {
    if (
      errorNameMessage === "" &&
      errorEmailMessage === "" &&
      errorPasswordMessage === "" &&
      userData.email !== "" &&
      userData.password.length >= 8 &&
      userData.name.length >= 2 &&
      userData.name.length <= 30
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



    if (nameCheckRegexp.test(userData.name) == false && userData.name !== "") {
      setErrorNameMessage(
        "Поле Имя должно содержать только латиницу, кириллицу, пробел или дефис"
      );

      setButtonDisabled(true);
    } else {
      setErrorNameMessage("");
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
  }, [
    userData,
    buttonDisabled,
    errorNameMessage,
    errorEmailMessage,
    errorPasswordMessage,
  ]);

  function handleChange(e) {

    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let { name, email, password } = userData;
    if (validator.isEmail(email) && password.length >=8 ) {

      onRegister(name, email, password)
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
          <h1 className="form__title">Добро пожаловать!</h1>
          <fieldset className="form__set">
            <label>
              <span className={"form__label"}>Имя</span>
              <input
                type="text"
                className={
                  "form__input " +
                  (errorNameMessage && "form__input_valid_false")
                }
                required
                name="name"
                onChange={handleChange}
              />
              <span
                className={
                  "form__error " +
                  (errorNameMessage && "form__error_visibility_visible")
                }
              >
                {errorNameMessage}
              </span>
            </label>
            <label>
              <span className={"form__label"}>E-mail</span>
              <input
                type="text"
                className={
                  "form__input " +
                  (errorEmailMessage && "form__input_valid_false")
                }
                required
                name="email"
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
                required
                name="password"
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
          {registerMessage && <p>{registerMessage}</p>}
          <button type="submit"
            className={"button button_submit " + (buttonDisabled && "button_disabled")}
            onClick={handleSubmit}
            disabled={buttonDisabled}
          >
            Зарегистрироваться
          </button>
          <p className="footernav__text">
            Уже зарегистрированы?&nbsp;&nbsp;
            <a href="/signin" className="footernav__link">
              Войти
            </a>
          </p>
        </div>
        </form>
      </div>
      </Main>
    </>
  );
}

export default Register;
