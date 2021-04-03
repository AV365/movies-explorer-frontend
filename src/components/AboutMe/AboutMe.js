import pic1 from "../../images/student_photo.png";

function AboutMe(props) {
  return (
    <>
      <div className="aboutme" id="aboutme">
        <div className="title">Студент</div>
        <img src={pic1} alt="Фото Виталия" className="aboutme__pic" />
        <p className="aboutme__name">Виталий</p>
        <p className="aboutme__info">Фронтенд-разработчик, 30 лет</p>
        <p className="aboutme__text">
          Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет
          экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать
          музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015
          года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как
          прошёл курс по&nbsp;веб-разработке, начал заниматься фриланс-заказами
          и&nbsp;ушёл с&nbsp;постоянной работы.
        </p>
        <ul className="aboutme__links">
          <li className="aboutme__link">
            <a href="https://www.facebook.com/andrew.vodyanitsky" target="_blank">Facebook</a>
          </li>
          <li className="aboutme__link">
            <a href="https://github.com/AV365/" target="_blank">Github</a>
          </li>
        </ul>
        {props.children}
      </div>
    </>
  );
}
export default AboutMe;
