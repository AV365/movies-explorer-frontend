function MoviesCard({ name, duration, pic, saved }) {
  return (
    <>
      <li className="card">
        <a href="#">
          <img src={pic} alt={name} className="card__pic" />
        </a>

        <div className="card__footer">
          <h3 className="card__title">{name}</h3>
          <p className="card__duration">{duration}</p>
        </div>
        {saved && <button className="button button_delete" />}
        {!saved && <button className="button button_save">Сохранить</button>}
      </li>
    </>
  );
}

export default MoviesCard;
