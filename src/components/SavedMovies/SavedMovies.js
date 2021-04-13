import { useState, useContext } from "react";
import HeaderAuthorized from "../HeaderAuthorized/HeaderAuthorized";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedMovies({
  handleSearchFilm,
  moviesRender,
  numCardsInRow,
  moviesResultMessage,
  handleSaveMovie,
  isSavedMovie,
  deleteMovieFromSaved,
  handleFilterShortFilm,
  savedMovies,
  showPopup,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <HeaderAuthorized />
      <Main>
        <SearchForm
          handleSearchFilm={handleSearchFilm}
          handleFilterShortFilm={handleFilterShortFilm}
          isSavedMoves={true}
          showPopup={showPopup}
        />
        <MoviesCardList
          movies={moviesRender}
          savedMovies={savedMovies}
          showSettings={numCardsInRow}
          moviesResultMessage={moviesResultMessage}
          onSaveMovie={handleSaveMovie}
          isSavedMovie={isSavedMovie}
          deleteMovieFromSaved={deleteMovieFromSaved}
          isSavedMovies={true}
        />
      </Main>
      <Footer />
    </>
  );
}

export default SavedMovies;
