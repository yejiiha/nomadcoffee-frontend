import React from "react";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { darkTheme, GlobalStyles, lightTheme } from "./styles/styles";
import SignUp from "./screens/SignUp";
import routes from "./routes";
import HomeLayout from "./components/HomeLayout";
import AddShop from "./screens/AddShop";
import EditShop from "./screens/EditShop";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route exact path={routes.home}>
                {isLoggedIn ? (
                  <HomeLayout>
                    <Home />
                  </HomeLayout>
                ) : (
                  <Login />
                )}
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp}>
                  <SignUp />
                </Route>
              ) : null}

              <Route path={routes.add}>
                <HomeLayout>
                  <AddShop />
                </HomeLayout>
              </Route>
              <Route path={"/shop/:id"}>
                <HomeLayout>
                  <EditShop />
                </HomeLayout>
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
