import { useState, useEffect } from "react";
function FilterCheckbox({handleFilterShortFilm}) {
  const [shortFilmCheckbox, setShortFilmCheckbox] = useState("");
  const [styleCheckbox, setStyleCheckbox] = useState("");
  function handleShortFilmCheckbox(e) {
      setShortFilmCheckbox(e.target.checked);
      handleFilterShortFilm(e.target.checked);


  }
  return (
    <>
      <div className="search__shortfilm-content">
        <span className="search__shortfilm-text">Короткометражки</span>
        <label className="search__shortfilm-label">
          <input
            type="checkbox"
            className="search__shortfilm-checkbox"
            name="shortFilmCheckbox"
            onChange={handleShortFilmCheckbox}
            checked={shortFilmCheckbox}
          />
          <span className="search__shortfilm-slider"></span>
        </label>
      </div>
    </>
  );
}

export default FilterCheckbox;
