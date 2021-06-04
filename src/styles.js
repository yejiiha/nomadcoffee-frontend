import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  fontColor: "rgb(38, 38, 38)",
  bgColor: "#fafafa",
};

export const darkTheme = {
  fontColor: "white",
  bgColor: "#272121",
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
