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
import { moviesFilterSettings } from "../../utils/moviesFilterSettings";

import moviesapi from "../../utils/MoviesApi";
import mainapi from "../../utils/MainApi";
import * as auth from "../../utils/auth";

//Импортируем верстку
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import Movies from "../Movies/Movies";

import InfoTooltip from "../InfoTooltip/InfoTooltip";

import "./App.css";
import { trackPromise } from "react-promise-tracker";

import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import LandingPage from "../LandingPage/LandingPage";
import { debug } from "prettier/doc";
import Preloader from "../Preloader/Preloader";

function App() {
  const history = useHistory();
  const location = useLocation();

  //Настройки отображения карточек
  const getNumCardsInRow = (wScreen) => {
    if (wScreen >= 1280) {
      return moviesFilterSettings.cardsSettings.forWideScreen;
    } else if (wScreen >= 768) {
      return moviesFilterSettings.cardsSettings.forMiddleScreen;
    } else return moviesFilterSettings.cardsSettings.forMobileScreen;
  };

  const [isLoading, setIsLoading] = useState(false);

  //пользователь
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    _id: "",
  });
  const [currentUser, setCurrentUser] = useState(false);

  const [permissionsChecked, setPermissionsChecked] = useState(false);

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

  function showPopup(
    setOpen,
    isOk,
    message = "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
  ) {
    setIsInfotooltipOpened(setOpen);
    setInfotooltipStatus(isOk);
    setInfotooltipMessage(message);
  }

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
    localStorage.removeItem("saved-movies");
    setLoggedIn(false);

    history.push("/");
  }

  function getUser() {
    setIsLoading(true);
    return mainapi
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
        setLoggedIn(true);
        return data;
      })
      .catch((err) => {
        alert("Error:" + err);
      }).finally((res)=> {
          setIsLoading(false);
        });
  }

  function checkToken() {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem("jwt")) {
        let jwt = localStorage.getItem("jwt");
        auth
          .getContent(jwt)
          .then((res) => {
            if (res.email) {
              setLoggedIn(true);
              setUserData({
                email: res.email,
                name: res.name,
                _id: res._id,
              });
              resolve("Все ок");
            }
          })
          .catch(() => {
            reject("error");
          });
      } else {
        reject("Нет токена");
      }
    });
  }

  function handleRegister(name, email, password) {
    setIsLoading(true);
    return auth
      .register(name, email, password)
      .then((res) => {
        // if (
        //   !res ||
        //   res.status === 400 ||
        //   res.status === 500 ||
        //   res.status === 409
        // ) {
        //   setRegisterMessage("Что-то пошло не так! Попробуйте ещё раз.");
        //
        //   throw new Error("Что-то пошло не так!");
        // }
        // if (res.ok) {
        //          console.log("Что идет на вход", name, password);
        //          console.log(res);
        handleLogin(email, password)
          .then(() => {})
          .catch((err) => {
            showPopup(true, false, err);
          });
        //          history.push("/movies");
        // }
      })
      .catch((err) => {
        setRegisterMessage("Что-то пошло не так! Попробуйте ещё раз.");
        return Promise.reject(err);
      }).finally((res)=> {

          setIsLoading(false);
        });
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    return auth
      .login(email, password)
      .then((res) => {
        if (!res || res.status === 400 || res.status === 401) {
          setLoginMessage("Что-то пошло не так! Попробуйте ещё раз.");
          throw new Error("Ошибка авторизации");
        }
        return res;
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
      })
      .finally(() => {
        setPermissionsChecked(true);
        setIsLoading(false);
      });
  }

  function handleUpdateUser(name, email) {
    setIsLoading(true);
    return mainapi
      .updateUserInfo(name, email)
      .then((res) => {
        showPopup(true, true, "Данные о пользователе успешно изменены");
        setCurrentUser(res.data);
      })
      .catch((err) => {
        showPopup(true, false, "Что-то пошло не так, но не сдавайтесь!");
      })
      .finally((res) => {
        setIsLoading(false);
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
    setIsLoading(true);
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

        getSavedMoviesPromise(true);
      })
      .catch((err) => {
        showPopup(true, false);
      })
      .finally((res) => {
        setIsLoading(false);
      });
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
      setIsLoading(true);
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
          showPopup(true, false);
        })
        .finally((res) => {
          setIsLoading(false);
        });
    } else {
      // Берем данные из локального хранилища
      const moviesLocalStorage = JSON.parse(localStorage.getItem("movies"));
      setMovies(moviesLocalStorage);
    }
  }

  // function getSavedMovies(force = false) {
  //   if (!isLocalMovies("saved-movies") || force) {
  //     mainapi
  //       .getMovies()
  //       .then((data) => {
  //         localStorage.setItem("saved-movies", JSON.stringify(data));
  //         //_log("выполняем запрос к серверу фильмов");
  //         const movies = data.map((item) => {
  //           return item;
  //         });
  //
  //         setSavedMovies(() => {
  //           return movies;
  //         });
  //       })
  //       .catch((err) => {
  //         setIsInfotooltipOpened(true);
  //         setInfotooltipStatus(false);
  //         setInfotooltipMessage(
  //           "!!!!Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
  //         );
  //
  //         //alert(`Ошибка ${err}`);
  //       });
  //   } else {
  //     // Берем данные из локального хранилища
  //
  //     const moviesLocalStorage = JSON.parse(
  //       localStorage.getItem("saved-movies")
  //     );
  //     //      console.log("local storage saved-movies", moviesLocalStorage);
  //     setSavedMovies(() => {
  //       return moviesLocalStorage;
  //     });
  //   }
  // }

  function getSavedMoviesPromise(force = false) {
    return new Promise((resolve, reject) => {

      if (force || !isLocalMovies("saved-movies")) {
        setIsLoading(true);
        return mainapi
          .getMovies()
          .then((data) => {
            localStorage.setItem("saved-movies", JSON.stringify(data));
            getUser()
              .then((data) => {
                return data._id;
              })
              .catch((err) => {})
              .then((dataUser) => {
                const res = data.map((item) => {
                  if (item.owner === dataUser) {
                    return item;
                  }
                });

                resolve(res);
              })
              .catch((err) => {});
          })
          .then((res) => {})
          .catch((err) => {
            showPopup(true, false);
          })
          .finally((res)=> {
            setIsLoading(false);
          });
      }
      if (isLocalMovies("saved-movies")) {
        // Берем данные из локального хранилища
        const moviesLocalStorage = JSON.parse(
          localStorage.getItem("saved-movies")
        );

        resolve(moviesLocalStorage);
      }

      reject("error");
    });
  }

  function isLocalMovies(storageParam) {
    const moviesLocalStorage = JSON.parse(localStorage.getItem(storageParam));
    if (!moviesLocalStorage) return false;
    // if (!moviesLocalStorage[0].trailerLink) return false;
    return true;
  }

  function isSavedMovie(movieId) {
    if (
      localStorage.getItem("saved-movies") !== "undefined" &&
      localStorage.getItem("saved-movies") !== null
    ) {
      const moviesLocalStorage = JSON.parse(
        localStorage.getItem("saved-movies")
      );
      let finded = 0;
      moviesLocalStorage.forEach((i) => {
        if (i.movieId === movieId) {
          finded = i._id;
        }
      });

      return finded;
    } else {
      return 0;
    }
  }
  function deleteMovieFromSaved(id) {
    if (id) {
      setIsLoading(true);
      return mainapi
        .deleteMovie(id)
        .then((data) => {
          //            getSavedMovies(true);
          getSavedMoviesPromise(true)
            .then((res) => {
              setSavedMovies(res);
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
              //console.log("Ошибка" + err);
            })
            .finally((res) => {});
        })
        .catch((err) => {
          showPopup(true, false);
        }).finally((res) => {
            setIsLoading(false);
          });
    }
  }

  const filterMovies = (array, query = " ", shortFilm) => {
    const durationForSearch = !shortFilm
      ? 99999
      : moviesFilterSettings.durationShortMovies;

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

        res.length === 0
          ? setMoviesResultMessage("Ничего не найдено")
          : setMoviesResultMessage("");

        resolve(res);
      }
      if (source === "savedfilms") {
        const res = filterMovies(array, query || "", shortFilm);

        res.length === 0
          ? setMoviesResultMessage("Ничего не найдено")
          : setMoviesResultMessage("");
        resolve(res);
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

  useEffect(() => {}, []);

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
    setIsLoading(true);
    checkToken()
      .then(() => {
        getUser().then(() => {
          getSavedMoviesPromise()
            .then((res) => {
              setSavedMovies(res);
              renderMoviesWithFilter(
                res,
                moviesQueryFilter,
                moviesShortFilter,
                "savedfilms"
              );
            })
            .catch((err) => {});
        });
      })
      .catch(() => {})
      .finally(() => {
        //        console.log("set permission");
        setPermissionsChecked(true);
        setIsLoading(false);
      });
  }, [loggedIn]);

  if (!permissionsChecked) {
    return null;
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        {isLoading && <Preloader />}
        <InfoTooltip
          size="size_l"
          isOpened={isInfotooltipOpened}
          onClose={false}
          infotooltipStatus={infotooltipStatus}
          infotooltipMessage={infotooltipMessage}
          onInfotooltipClose={onInfotooltipClose}
        />
        <Switch>
          {/*{loggedIn && (*/}
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onUpdateProfile={handleUpdateUser}
            onSignout={handleSignout}
          />
          // )}
          {/*{loggedIn && (*/}
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
            showPopup={showPopup}
          />
          {/*)}*/}
          {/*{loggedIn && (*/}
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
            showPopup={showPopup}
          />
          {/*)}*/}
          <Route exact path="/">
            {/*{loggedIn ? <Redirect to="/movies" /> : <LandingPage />}*/}
            <LandingPage loggedIn={loggedIn} />
          </Route>
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
          <Route path="/">
            <NotFound />
          </Route>
          {/*{loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}*/}
        </Switch>
      </CurrentUserContext.Provider>
    </>
  );
}

export default withRouter(App);
