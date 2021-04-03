function Register() {
    return (
        <>
            <div className="main__container">
                <form action="" className="form">
                    <a href="/">
                        <div className="logo"></div>
                    </a>
                    <h1 className="form__title">Добро пожаловать!</h1>
                    <fieldset className="form__set">
                        <label>
                            <span className={"form__label"}>Имя</span>
                            <input type="text" className="form__input" value={"Виталий"}/>
                            <span className={"form__error"}>Ошибка</span>
                        </label>
                        <label>
                            <span className={"form__label"}>E-mail</span>
                            <input type="text" className="form__input" value={"pochta@yandex.ru"}/>
                            <span className={"form__error"}>Ошибка</span>
                        </label>
                        <label>
                            <span className={"form__label"}>Пароль</span>
                            <input type="password" className="form__input form__input_valid_false" value={"12345678"}/>
                            <span className={"form__error form__error_visibility_visible"}>Что-то пошло не так...</span>
                        </label>
                    </fieldset>
                </form>
                <div className="footernav">
                    <button className="button button_submit">Зарегистрироваться</button>
                    <p className="footernav__text">
                        Уже зарегистрированы?&nbsp;&nbsp;
                        <a href="/signin" className="footernav__link">
                            Войти
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Register;
