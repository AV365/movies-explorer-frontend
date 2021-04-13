
import { useState, useEffect } from "react";

import MoviesCard from "../MoviesCard/MoviesCard";
import MoreButton from "../MoreButton/MoreButton";


function MoviesCardList({
  movies,
  showSettings,
  moviesResultMessage,
  onSaveMovie,
  isSavedMovie,
  deleteMovieFromSaved,
  isSavedMovies,
}) {
  const { def, more } = showSettings;

  const [nowCards, setNowCards] = useState(def);


    function setNumCards() {
    setNowCards(nowCards + more);
  }

  return (
    <>
      <div className="films">
        {moviesResultMessage && <p>Ничего не найдено</p>}
        <ul className="cards">
          {movies.length !== 0 &&
            movies.slice(0, nowCards).map((movie) => {
              return (
                <MoviesCard
                  movie={movie}
                  onSaveMovie={onSaveMovie}
                  isSavedMovie={isSavedMovie}
                  deleteMovieFromSaved={deleteMovieFromSaved}
                  isSavedMovies={isSavedMovies}
                  key={movie.id || movie._id}
                />
              );
            })}
        </ul>
        {movies.length !== 0 && nowCards < movies.length && (
          <MoreButton setNumCards={setNumCards} />
        )}
      </div>
    </>
  );
}

export default MoviesCardList;
