function FilterCheckbox() {
  return (
    <>
      <div className="search__shortfilm-content">
        <span className="search__shortfilm-text">Короткометражки</span>
        <label className="search__shortfilm-label">
          <input type="checkbox" className="search__shortfilm-checkbox" />
          <span className="search__shortfilm-slider"></span>
        </label>
      </div>
    </>
  );
}

export default FilterCheckbox;
