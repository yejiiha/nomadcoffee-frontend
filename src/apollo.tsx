import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const TOKEN = "token";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = (history: any) => {
  localStorage.removeItem(TOKEN);
  history.replace();
  window.location.reload();
};

export const darkModeVar = makeVar(
  Boolean(localStorage.getItem(DARK_MODE) === "enabled")
);

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  darkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

const httpLink = createUploadLink({
  uri: "https://yejiiha-nomadcoffee-backend.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
