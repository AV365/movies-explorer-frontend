import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <>
      <div className="search">
        <form className="search__form">
          <input placeholder="Фильм" type="text" className="search__field" />
          <button type="submit" className="button button_search" />
          <FilterCheckbox />
        </form>
      </div>
    </>
  );
}

export default SearchForm;
