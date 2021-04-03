function AboutProject() {
  return (
    <>
      <div className="about" id="about">
        <h2 className="title">О проекте</h2>
        <div className="about__content">
          <div className="about__item">
            <h3 className="about__header">
              Дипломный проект включал 5&nbsp;этапов
            </h3>
            <p className="about__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и&nbsp;финальные доработки.
            </p>
          </div>
          <div className="about__item">
            <h3 className="about__header">
              На&nbsp;выполнение диплома ушло 5&nbsp;недель
            </h3>
            <p className="about__text">
              У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
              нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="timeline">
          <div className="timeline__item  timeline__item_size_20">
            <div className="timeline__step timeline__step_style_one">
              <p className="timeline__time">1&nbsp;неделя</p>
            </div>
            <p className="timeline__note">Back&#8209;end</p>
          </div>
          <div className="timeline__item timeline__item_size_80">
            <div className="timeline__step timeline__step_style_two">
              <p className="timeline__time">4&nbsp;недели</p>
            </div>
            <p className="timeline__note">Front&#8209;end</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutProject;
