import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const lightTheme: DefaultTheme = {
  fontColor: "rgb(38, 38, 38)",
  bgColor: "#fafafa",
  formColor: "white",
  borderColor: "rgb(219, 219, 219)",
  darkModeColor: "#ffe227",
  darkModeBgColor: "#374045",
  inputColor: "rgb(38, 38, 38)",
  orangeColor: "#FF9500",
  darkGray: "#8e8e8e",
};

export const darkTheme: DefaultTheme = {
  fontColor: "white",
  bgColor: "#272121",
  formColor: "#2c2c2c",
  borderColor: "#525252",
  darkModeColor: "#ffe227",
  darkModeBgColor: "#374045",
  inputColor: "rgb(38, 38, 38)",
  orangeColor: "#FF9500",
  darkGray: "#8e8e8e",
};

export const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  input {
    all: unset;
  }
  body {  
    background-color: ${(props) => props.theme.bgColor};
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
    color: ${(props) => props.theme.fontColor};
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
