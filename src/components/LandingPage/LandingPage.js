import Header from "../Header/Header";
import Main from "../Main/Main";
import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Footer from "../Footer/Footer";

function LandingPage({ loggedIn}) {
  return (
    <>
      <Header loggedIn={loggedIn}/>
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
    </>
  );
}
export default LandingPage;
