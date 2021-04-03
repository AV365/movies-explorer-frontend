
import movie1 from "../../images/tmp/movie1.png";
import movie2 from "../../images/tmp/movie2.png";
import movie3 from "../../images/tmp/movie3.png";
import movie4 from "../../images/tmp/movie4.png";
import movie5 from "../../images/tmp/movie5.png";
import movie6 from "../../images/tmp/movie6.png";
import movie7 from "../../images/tmp/movie7.png";
import movie8 from "../../images/tmp/movie8.png";
import movie9 from "../../images/tmp/movie9.png";
import movie10 from "../../images/tmp/movie10.png";
import movie11 from "../../images/tmp/movie11.png";
import movie12 from "../../images/tmp/movie12.png";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ saved }) {
  return (
    <>
      <div className="films">
        <ul className="cards">
          {saved && <MoviesCard
            name={"33 слова о дизайне"}
            duration={"1ч 17м"}
            pic={movie1}

          />}
          {saved && <MoviesCard
              name={"Киноальманах «100 лет дизайна»"}
              duration={"1ч 17м"}
              pic={movie2}
              saved="true"
          />}
          {saved && <MoviesCard
              name={"В погоне за Бенкси"}
              duration={"1ч 17м"}
              pic={movie3}
              saved="true"
          />}
          {!saved && <MoviesCard
              name={"Баския: Взрыв реальности"}
              duration={"1ч 17м"}
              pic={movie4}
              saved="true"
          />}
          {!saved && <MoviesCard
              name={"Бег это свобода"}
              duration={"1ч 17м"}
              pic={movie5}
              saved="true"
          />}
          {!saved && <MoviesCard
              name={"Книготорговцы"}
              duration={"1ч 17м"}
              pic={movie6}
              saved="true"
          />}
          {!saved && <MoviesCard
              name={"Когда я думаю о Германии ночью"}
              duration={"1ч 17м"}
              pic={movie7}
              saved="true"
          />}
          {!saved && <MoviesCard
              name={"Gimme Danger: История Игги и The Stooges"}
              duration={"1ч 17м"}
              pic={movie8}
              saved="true"
          />}
          {!saved && <MoviesCard
            name={"Дженис: Маленькая девочка грустит"}
            duration={"1ч 17м"}
            pic={movie9}
            saved="true"
        />}
          {!saved && <MoviesCard
            name={"Соберись перед прыжком"}
            duration={"1ч 17м"}
            pic={movie10}
            saved="true"
        />}
            {!saved && <MoviesCard
                name={"Пи Джей Харви: A dog called money"}
                duration={"1ч 17м"}
                pic={movie11}
                saved="true"
            />}
            {!saved && <MoviesCard
                name={"По волнам: Искусство звука в кино"}
                duration={"1ч 17м"}
                pic={movie12}
                saved="true"
            />}
        </ul>
        <button className="button button_main button_more">Еще</button>
      </div>
    </>
  );
}

export default MoviesCardList;
