import HeaderAuthorized from "../HeaderAuthorized/HeaderAuthorized";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";

function Movies({
                    handleSearchFilm,
                    moviesRender,
                    numCardsInRow,
                    moviesResultMessage,
                    handleSaveMovie,
                    isSavedMovie,
                    deleteMovieFromSaved,
                    handleFilterShortFilm,
                    showPopup={showPopup}
                }) {


  return (
    <>
      <HeaderAuthorized />
      <Main>
          <SearchForm
              handleSearchFilm={handleSearchFilm}
              handleFilterShortFilm={handleFilterShortFilm}
              showPopup={showPopup}
          />
          <MoviesCardList
              movies={moviesRender}
              showSettings={numCardsInRow}
              moviesResultMessage={moviesResultMessage}
              onSaveMovie={handleSaveMovie}
              isSavedMovie={isSavedMovie}
              deleteMovieFromSaved={deleteMovieFromSaved}
          />
      </Main>
      <Footer />
    </>
  );
}

export default Movies;
