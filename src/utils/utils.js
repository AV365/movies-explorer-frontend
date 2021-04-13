export const apiSettings = {
  // mainUrl: "http://localhost:3001/",
  mainUrl: "https://api.movies-explorer.av365.ru/",
  movieUrl: "https://api.nomoreparties.co/",
};

export const _log = (...data) => {
  data.forEach((item) => {
    console.dir(item);
  });
}
