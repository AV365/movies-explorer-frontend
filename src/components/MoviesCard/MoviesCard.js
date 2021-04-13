import { apiSettings, _log } from "../../utils/utils";

function MoviesCard({
  movie,
  onSaveMovie,
  isSavedMovie,
  deleteMovieFromSaved,
  isSavedMovies,
}) {
  const durationHour = Math.floor(movie.duration / 60);
  const durationMin = movie.duration % 60;

  const handlerSaveMovie = (e) => {
    e.preventDefault();
    onSaveMovie(movie);
    // console.log(movie);
  };

  const handlerDeleteMovie = (e) => {
    e.preventDefault();
    !isSavedMovies
      ? deleteMovieFromSaved(isSavedMovie(movie.id))
      : deleteMovieFromSaved(movie._id);
  };

  return (
    <>
      <li className="card">
        <a href={!isSavedMovies ? movie.trailerLink : movie.trailer} target="_blank">
          <img
            src={
              !isSavedMovies && movie.image && movie.image.url
                ? apiSettings.movieUrl.slice(0, -1) + movie.image.url
                : isSavedMovies
                ? movie.image
                : "https://placehold.co/600x400?text=обложка появится чуть позже"
            }
            alt={movie.nameRU}
            className="card__pic"
          />
        </a>

        <div className="card__footer">
          <h3 className="card__title">{movie.nameRU}</h3>
          <p className="card__duration">{`${durationHour}ч ${durationMin}м`}</p>
        </div>

        {isSavedMovie(movie.id) === 0 && !isSavedMovies ? (
          <button className="button button_save" onClick={handlerSaveMovie}>
            Сохранить
          </button>
        ) : (
          <button
            className="button button_delete"
            onClick={handlerDeleteMovie}
          />
        )}
      </li>
    </>
  );
}

export default MoviesCard;
