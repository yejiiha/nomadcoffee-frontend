import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fontColor: string;
    bgColor: string;
    formColor: string;
    borderColor: string;
    darkModeColor: string;
    darkModeBgColor: string;
    inputColor: string;
    orangeColor: string;
    darkGray: string;
  }
}
