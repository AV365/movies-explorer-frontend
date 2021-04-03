import React from "react";
import { useState, useEffect } from "react";
import {
  Route,
  Switch,
  withRouter,
  useHistory,
  Redirect,
} from "react-router-dom";

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

import Tmp from "../Tmp/Tmp";

import "./App.css";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Header />
          <Main>
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe>
              <Portfolio />
            </AboutMe>
          </Main>
          <Footer />
        </Route>

        <Route exact path="/movies">
          <HeaderAuthorized />
          <Movies>
            <SearchForm />
            {/*<Preloader/>*/}
            <MoviesCardList />
          </Movies>
          <Footer />
        </Route>

        <Route exact path="/saved-movies">
          <HeaderAuthorized />
          <SavedMovies>
            <SearchForm />
            <MoviesCardList saved="true" />
          </SavedMovies>
          <Footer />
        </Route>

        <Route exact path="/signin">
          <Main fullframe="true">
            <Login />
          </Main>
        </Route>

        <Route exact path="/signup">
          <Main fullframe="true">
            <Register />
          </Main>
        </Route>

        <Route exact path="/profile">
          <HeaderAuthorized />
          <Main>
            <Profile />
          </Main>
        </Route>

        <Route path="/">
          <Main fullframe="true">
            <NotFound />
          </Main>
        </Route>
      </Switch>
    </>
  );
}

export default withRouter(App);
