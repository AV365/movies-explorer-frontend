import { useState, useEffect } from "react";
import { _log } from "../../utils/utils";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  handleSearchFilm,
  handleFilterShortFilm,
  isSavedMovies,
}) {
  const [searchFilmQuery, setSearchFilmQuery] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  function checkSearchForm() {
    if (searchFilmQuery.length >= 2 && !isSavedMovies) {
      setButtonDisabled(false);
    }
  }

  useEffect(() => {
    checkSearchForm();
  }, [searchFilmQuery]);

  useEffect(()=> {
      handleSearchFilm(" ");
  }, []);

  function handleChangeSearchFilm(e) {
    setSearchFilmQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleSearchFilm(searchFilmQuery);
  }

  return (
    <>
      <div className="search">
        <form className="search__form">
          <input
            placeholder="Фильм"
            type="text"
            className="search__field"
            onChange={handleChangeSearchFilm}
            value={searchFilmQuery}
          />
          <button
            type="submit"
            className="button button_search"
            onClick={handleSubmit}
            disabled={buttonDisabled}
          />
          <FilterCheckbox handleFilterShortFilm={handleFilterShortFilm} />
        </form>
      </div>
    </>
  );
}

export default SearchForm;
