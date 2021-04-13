import { apiSettings } from "./utils";

class MoviesApi {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
//    console.log(this.headers);

    //this.headers = config.headers;
  }

  //Забираем все карточки
  getMovies() {
    return fetch(`${this.url+'beatfilm-movies/'}`, { headers: this.headers })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка получения карточек: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      // .catch((err) => this._displayErr(err));
  }

  _displayErr(err) {
    alert(err);
  }
}

const moviesapi = new MoviesApi({
  url: apiSettings.movieUrl,
  headers: {
      "Content-Type": "application/json",
  },
});

export default moviesapi;
