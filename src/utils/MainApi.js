import { apiSettings } from "./utils";

class MainApi {
  constructor(config) {
    this.url = config.url;

    if (localStorage.getItem("jwt")) {
      const jwtHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      };
      config.headers = jwtHeaders;
    }

    this.headers = config.headers;
  }

  //обновляем информацию о пользователе
  updateUserInfo(name, email) {
    return fetch(`${this.url}users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(
          `Ошибка изменения информации о пользователе: ${res.status}`
        );
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        //        this._displayErr(err);
      });
  }

  //Получаем информацию о пользователе
  getUserInfo() {
    return fetch(`${this.url}users/me`, { headers: this.headers })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(
          `Ошибка получения информации о пользователе: ${res.status}`
        );
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        //        this._displayErr(err);
      });
  }

  //Забираем все карточки
  getMovies() {
    return fetch(`${this.url + "movies/"}`, { headers: this.headers })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка получения карточек: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        //        this._displayErr(err);
      });
  }

  //Удаляем карточку
  deleteMovie(id) {
    return fetch(`${this.url}movies/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(
          `Ошибка удаления карточки ${id} карточки: ${res.status}`
        );
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        //        this._displayErr(err);
      });
  }

  //Добавляем фильм в сохраненные

  saveMovie(
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    id,
    nameRU,
    nameEN
  ) {
    return fetch(`${this.url}movies`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        country: country,
        director: director,
        duration: duration,
        year: year,
        description: description,
        image: image,
        trailer: trailerLink,
        thumbnail: thumbnail,
        movieId: id,
        nameRU: nameRU,
        nameEN: nameEN,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка сохранения фильма: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        //        this._displayErr(err);
      });
  }

  _displayErr(err) {
    // console.log(err);
  }
}
const mainapi = new MainApi({
  url: apiSettings.mainUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainapi;
