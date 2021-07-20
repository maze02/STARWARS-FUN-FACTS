import { Route, Switch } from "react-router";
import { Fragment } from "react";

//PAGE & COMPONENTS IMPORTS
import Layout from "./components/layout/Layout";
import MainNavigation from "./components/layout/MainNavigation";
import Registration from "./components/registration/Registration";
import Login from "./components/login/LoginForm";
import Welcome from "./components/pages/Welcome";
import Home from "./components/pages/Home";
import AllStarships from "./components/pages/AllStarships";
import Actors from "./components/pages/AllActors";
import StarshipDetail from "./components/pages/StarshipDetail";
import ActorDetail from "./components/pages/ActorDetail";

//CONTEXT IMPORTS
//import Welcome from "./components/pages/Welcome";
//import MainHeader from "./components/layout/MainHeader";
import AuthContextMyProvider from "./components/context/auth/auth-context.js";
import AppContextMyProvider from "./components/context/auth/test-context";
//import StarshipsProvider from "./components/context/StarshipsContext";
//import Home from "./components/";
//import ShowState from "./components/login/Showstate";

function App() {
  return (
    <Fragment>
      <AuthContextMyProvider>
        <Layout>
          <Switch>
            <Route path="/" exact>
              <Welcome />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/starships">
              <AllStarships />
            </Route>
            <Route path="/starship-detail">
              <StarshipDetail />
            </Route>
            <Route path="/actors">
              <Actors />
            </Route>
            <Route path="/actors-detail">
              <ActorDetail />
            </Route>
          </Switch>
        </Layout>
      </AuthContextMyProvider>
    </Fragment>
  );
}

export default App;

/*
          {!loginStatus && <Welcome />}
          {loginStatus && <Home />}
*/
