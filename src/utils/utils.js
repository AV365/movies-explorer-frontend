export const apiSettings = {
  mainUrl: "http://localhost:3001/",
  movieUrl: "https://api.nomoreparties.co/",
};

export const _log = (...data) => {
  data.forEach((item) => {
    console.dir(item);
  });
}
