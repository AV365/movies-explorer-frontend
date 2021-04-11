//todo - коммит
//todo - поставить логику с сохраненными фильмами только по владельцу
//todo - еще раз проверить по чеклисту
//todo деплой и пул реквест

import React from "react";

import { useState, useEffect } from "react";
import {
  Route,
  Switch,
  withRouter,
  useHistory,
  Redirect,
  useLocation,
} from "react-router-dom";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

//Импортируем мозги
import { _log, apiSettings } from "../../utils/utils";
import moviesapi from "../../utils/MoviesApi";
import mainapi from "../../utils/MainApi";
import * as auth from "../../utils/auth";

//Импортируем верстку
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

import Movies from "../Movies/Movies";
import HeaderAuthorized from "../HeaderAuthorized/HeaderAuthorized";
import SearchForm from "../SearchForm/SearchForm";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import "./App.css";
import { trackPromise } from "react-promise-tracker";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import LandingPage from "../LandingPage/LandingPage";
import { debug } from "prettier/doc";

function App() {
  const history = useHistory();
  const location = useLocation();

  const getNumCardsInRow = (wScreen) => {
    if (wScreen >= 1280) {
      return { def: 12, more: 3 };
    } else if (wScreen >= 768) {
      return { def: 8, more: 2 };
    } else return { def: 5, more: 2 };
  };
  //пользователь
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const [currentUser, setCurrentUser] = useState(false);

  //фильмы
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [moviesFiltered, setMoviesFiltered] = useState([]);
  const [moviesSavedFiltered, setMoviesSavedFiltered] = useState([]);
  const [moviesRender, setMoviesRender] = useState([]);
  const [moviesSavedRender, setMoviesSavedRender] = useState([]);
  const [moviesQueryFilter, setMoviesQueryFilter] = useState("");
  const [moviesShortFilter, setMoviesShortFilter] = useState(false);
  const [moviesResultMessage, setMoviesResultMessage] = useState("");

  //выдача карточек
  const [numCardsInRow, setNumCardsInRow] = useState(
    getNumCardsInRow(window.innerWidth)
  );
  const [numCardsInRender, setNumCardsInRender] = useState(
    getNumCardsInRow(window.innerWidth)
  );

  const [isInfotooltipOpened, setIsInfotooltipOpened] = useState(false);
  const [infotooltipStatus, setInfotooltipStatus] = useState(false);
  const [infotooltipMessage, setInfotooltipMessage] = useState("");

  const [registerMessage, setRegisterMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  function handleSignout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);

    history.push("/");
  }

  function getUser() {
    trackPromise(
      mainapi
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
          const setLoggedInNow = () => {
            setLoggedIn(true);
          };
          setLoggedInNow();
        })
        .catch((err) => {
          //        alert("Error:" + err);
        })
    );
  }

  function checkToken() {
    return new Promise((resolve) => {
      if (localStorage.getItem("jwt")) {
        let jwt = localStorage.getItem("jwt");
        trackPromise(
          auth.getContent(jwt).then((res) => {
            if (res.email) {
              // const setLoggedInNow = () => {
              //   setLoggedIn(true);
              // };
              // setLoggedInNow();
              setLoggedIn(() => {
                return true;
              });
              setUserData({
                email: res.email,
                name: res.name,
              });
              resolve("Все ок");
            }
          })
        );
      }
    });
  }

  function handleRegister(name, email, password) {
    return auth
      .register(name, email, password)
      .then((res) => {
        //console.log(res);
        if (
          !res ||
          res.status === 400 ||
          res.status === 500 ||
          res.status === 409
        ) {
          setRegisterMessage("Что-то пошло не так! Попробуйте ещё раз.");

          throw new Error("Что-то пошло не так!");
        }
        if (res.ok) {
          //          console.log(res);
          history.push("/movies");
        }
      })

      .catch((err) => {
        return Promise.reject(err);
      });
  }

  function handleLogin(email, password) {
    return auth
      .login(email, password)
      .then((res) => {
        if (!res || res.status === 400 || res.status === 401) {
          setLoginMessage("Что-то пошло не так! Попробуйте ещё раз.");
          throw new Error("Ошибка авторизации");
        }
        return res.json();
      })
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        checkToken().then(() => {
          history.push("/movies");
        });
      })
      .catch(() => {
        return Promise.reject("ошибка");
      });
  }

  function handleUpdateUser(name, email) {
    return mainapi
      .updateUserInfo(name, email)
      .then((res) => {
        setCurrentUser(res.data);
        setIsInfotooltipOpened(true);
        setInfotooltipStatus(true);
        setInfotooltipMessage("Данные о пользователе успешно изменены");
      })
      .catch((err) => {
        setIsInfotooltipOpened(true);
        setInfotooltipStatus(false);
        setInfotooltipMessage("Что-то пошло не так, но не сдавайтесь!");
      });
  }

  const onInfotooltipClose = () => {
    setIsInfotooltipOpened(false);
  };

  const handleSaveMovie = ({
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
    nameEN,
  }) => {
    mainapi
      .saveMovie(
        country,
        director,
        duration,
        year,
        description,
        apiSettings.movieUrl.slice(0, -1) + image.url,
        trailerLink,
        apiSettings.movieUrl.slice(0, -1) + image.formats.thumbnail.url,
        id,
        nameRU,
        nameEN
      )
      .then((savedMovie) => {
        //
        // setCards([newCard.data, ...cards]);
        // closeAllPopups();

        getSavedMovies(true);
      })
      .catch((err) => {});
  };

  //Задержка для ресайза
  function debounce(fn, ms) {
    let timer;
    return (_) => {
      clearTimeout(timer);
      timer = setTimeout((_) => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }
  const debouncedHandleResize = debounce(function handleResize() {
    setNumCardsInRow(getNumCardsInRow(window.innerWidth));
  }, 1000);

  function getMovies(force = false) {
    if (!isLocalMovies("movies") || force) {
      moviesapi
        .getMovies()
        .then((data) => {
          localStorage.setItem("movies", JSON.stringify(data));
          //_log("выполняем запрос к серверу фильмов");
          const movies = data.map((item) => {
            return item;
          });

          setMovies(movies);
        })
        .catch((err) => {
          setIsInfotooltipOpened(true);
          setInfotooltipStatus(false);
          setInfotooltipMessage(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          );
        });
    } else {
      // Берем данные из локального хранилища
      const moviesLocalStorage = JSON.parse(localStorage.getItem("movies"));
      setMovies(moviesLocalStorage);
    }
  }

  function getSavedMovies(force = false) {
    if (!isLocalMovies("saved-movies") || force) {
      mainapi
        .getMovies()
        .then((data) => {
          localStorage.setItem("saved-movies", JSON.stringify(data));
          //_log("выполняем запрос к серверу фильмов");
          const movies = data.map((item) => {
            return item;
          });

          setSavedMovies(() => {
            return movies;
          });
        })
        .catch((err) => {
          setIsInfotooltipOpened(true);
          setInfotooltipStatus(false);
          setInfotooltipMessage(
            "!!!!Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          );

          //alert(`Ошибка ${err}`);
        });
    } else {
      // Берем данные из локального хранилища

      const moviesLocalStorage = JSON.parse(
        localStorage.getItem("saved-movies")
      );
      //      console.log("local storage saved-movies", moviesLocalStorage);
      setSavedMovies(() => {
        return moviesLocalStorage;
      });
    }
  }

  function getSavedMoviesPromise(force = false) {
    return new Promise((resolve, reject) => {
      //!isLocalMovies("saved-movies")
      if (force) {
        return mainapi
          .getMovies()
          .then((data) => {
            localStorage.setItem("saved-movies", JSON.stringify(data));
            //_log("выполняем запрос к серверу фильмов");
            const movies = data.map((item) => {
              return item;
            });

            resolve(movies);
          })
          .catch((err) => {
            setIsInfotooltipOpened(true);
            setInfotooltipStatus(false);
            setInfotooltipMessage(
              "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
            );
          });
      } else if (isLocalMovies("saved-movies")) {
        // Берем данные из локального хранилища

        const moviesLocalStorage = JSON.parse(
          localStorage.getItem("saved-movies")
        );

        resolve(moviesLocalStorage);
      } else {
        reject("error");
      }
    });
  }

  function isLocalMovies(storageParam) {
    const moviesLocalStorage = JSON.parse(localStorage.getItem(storageParam));
    if (!moviesLocalStorage) return false;
    // if (!moviesLocalStorage[0].trailerLink) return false;
    return true;
  }

  function isSavedMovie(movieId) {
    const moviesLocalStorage = JSON.parse(localStorage.getItem("saved-movies"));

    let finded = 0;
    moviesLocalStorage.forEach((i) => {
      //      console.log("iiii", i._id);
      if (i.movieId === movieId) {
        finded = i._id;
      }
    });

    return finded;
  }

  function deleteMovieFromSaved(id) {
    if (id) {
      return mainapi
        .deleteMovie(id)
        .then((data) => {
          //            getSavedMovies(true);
          getSavedMoviesPromise(true)
            .then((res) => {
              setSavedMovies(() => {
                return res;
              });
              renderMoviesWithFilterPromise(
                res,
                " ",
                moviesShortFilter,
                "savedfilms"
              ).then((res) => {
                setMoviesSavedFiltered(() => {
                  return res;
                });
                setMoviesSavedRender(() => {
                  return res;
                });
              });
            })
            .catch((err) => {
              //                console.log(err);
            })
            .finally((res) => {});
        })
        .catch((err) => {
          setIsInfotooltipOpened(true);
          setInfotooltipStatus(false);
          setInfotooltipMessage(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          );

          //alert(`Ошибка ${err}`);
        });
    }
  }

  const filterMovies = (array, query = " ", shortFilm) => {
    const durationForSearch = !shortFilm ? 99999 : 40;

    let result = [];
    const filterStr = query.toString().toLowerCase();

    array.forEach((obj) => {
      const name = obj["nameRU"];
      const description = obj["description"];
      const duration = obj["duration"];

      if (query !== " ") {
        if (
          (name.toLowerCase().indexOf(filterStr) !== -1 ||
            description.toLowerCase().indexOf(filterStr) !== -1) &&
          duration <= durationForSearch
        ) {
          result.push(obj);
        }
      } else {
        if (duration <= durationForSearch) {
          result.push(obj);
        }
      }
    });
    if (array.length === 0) {
    }
    return result;
  };

  const renderMoviesWithFilterPromise = (
    array,
    query,
    shortFilm,
    source = "beatfilms"
  ) => {
    return new Promise((resolve, reject) => {
      if (source === "beatfilms" && query && query.length >= 2) {
        const res = filterMovies(array, query.trim(), shortFilm);

        resolve(res);
        res.length === 0
          ? setMoviesResultMessage("Ничего не найдено")
          : setMoviesResultMessage("");
      }
      if (source === "savedfilms") {
        const res = filterMovies(array, query || "", shortFilm);

        resolve(res);

        res.length === 0
          ? setMoviesResultMessage("Ничего не найдено")
          : setMoviesResultMessage("");
      }
    });
  };

  const renderMoviesWithFilter = (
    array,
    query,
    shortFilm,
    source = "beatfilms"
  ) => {
    if (source === "beatfilms" && query && query.length >= 2) {
      const res = filterMovies(array, query.trim(), shortFilm);
      setMoviesFiltered(() => {
        return res;
      });
      res.length === 0
        ? setMoviesResultMessage("Ничего не найдено")
        : setMoviesResultMessage("");
    }
    if (source === "savedfilms") {
      const res = filterMovies(array, query || " ", shortFilm);
      setMoviesSavedFiltered(() => {
        return res;
      });

      res.length === 0
        ? setMoviesResultMessage("Ничего не найдено")
        : setMoviesResultMessage("");
    }
  };

  const handleSearchFilm = (query) => {
    setMoviesQueryFilter(query);
    renderMoviesWithFilter(movies, query, moviesShortFilter);
  };

  const handleSearchSavedFilm = (query) => {
    setMoviesQueryFilter(query);
    renderMoviesWithFilter(savedMovies, query, moviesShortFilter, "savedfilms");
  };

  const handleFilterShortFilm = (value) => {
    value ? setMoviesShortFilter(true) : setMoviesShortFilter(false);
  };

  useEffect(() => {
    getSavedMoviesPromise()
      .then((res) => {
        setSavedMovies(() => {
          return res;
        });
        renderMoviesWithFilter(
          res,
          moviesQueryFilter,
          moviesShortFilter,
          "savedfilms"
        );
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    getMovies();
    window.addEventListener("resize", debouncedHandleResize);
    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", debouncedHandleResize);
    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [window.innerWidth]);

  useEffect(() => {
    setMoviesRender((value) => {
      return moviesFiltered;
    });
  }, [moviesFiltered]);

  useEffect(() => {
    setMoviesSavedRender(() => {
      return moviesSavedFiltered;
    });
  }, [moviesSavedFiltered]);

  useEffect(() => {
    renderMoviesWithFilter(movies, moviesQueryFilter, moviesShortFilter);
    renderMoviesWithFilter(
      savedMovies,
      moviesQueryFilter,
      moviesShortFilter,
      "savedfilms"
    );
  }, [moviesShortFilter]);

  useEffect(() => {
    checkToken().then(() => {
      getUser();
    });
  }, [loggedIn]);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <InfoTooltip
          size="size_l"
          isOpened={isInfotooltipOpened}
          onClose={false}
          infotooltipStatus={infotooltipStatus}
          infotooltipMessage={infotooltipMessage}
          onInfotooltipClose={onInfotooltipClose}
        />
        <Switch>
          {loggedIn && (
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              onUpdateProfile={handleUpdateUser}
              onSignout={handleSignout}
            />
          )}
          {loggedIn && (
            <ProtectedRoute
              component={Movies}
              exact
              path="/movies"
              loggedIn={loggedIn}
              handleSearchFilm={handleSearchFilm}
              moviesRender={moviesRender}
              numCardsInRow={numCardsInRow}
              moviesResultMessage={moviesResultMessage}
              handleSaveMovie={handleSaveMovie}
              isSavedMovie={isSavedMovie}
              deleteMovieFromSaved={deleteMovieFromSaved}
              handleFilterShortFilm={handleFilterShortFilm}
            />
          )}
          {loggedIn && (
            <ProtectedRoute
              component={SavedMovies}
              path="/saved-movies"
              loggedIn={loggedIn}
              handleSearchFilm={handleSearchSavedFilm}
              moviesRender={moviesSavedRender}
              numCardsInRow={numCardsInRow}
              moviesResultMessage={moviesResultMessage}
              handleSaveMovie={handleSaveMovie}
              isSavedMovie={isSavedMovie}
              deleteMovieFromSaved={deleteMovieFromSaved}
              handleFilterShortFilm={handleFilterShortFilm}
            />
          )}
          {
            <Route exact path="/">
              {/*{loggedIn ? <Redirect to="/movies" /> : <LandingPage />}*/}
              <LandingPage />
            </Route>
          }
          <Route exact path="/signin">
            {loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Login onLogin={handleLogin} loginMessage={loginMessage} />
            )}
          </Route>
          <Route exact path="/signup">
            {loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Register
                onRegister={handleRegister}
                registerMessage={registerMessage}
              />
            )}
          </Route>
          <Route exact path="/">
            <NotFound />
          </Route>
          {/*{loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}*/}
        </Switch>
      </CurrentUserContext.Provider>
    </>
  );
}

export default withRouter(App);
