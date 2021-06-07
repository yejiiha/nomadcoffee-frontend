import React from "react";
import styled from "styled-components";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../apollo";
import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type AuthLayoutProps = React.PropsWithChildren<{}>;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Footer = styled.footer`
  margin-top: 20px;
`;

const DarkModeBtn = styled.button`
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.theme.formColor};
  color: ${(props) => props.theme.fontColor};
  border-radius: 50px;
  border: none;
  --tw-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  &:hover {
    color: ${(props) => props.theme.darkModeColor};
    background-color: ${(props) => props.theme.darkModeBgColor};
  }
  &:focus {
    border: none;
    outline: none;
  }
`;

function AuthLayout({ children, ...props }: AuthLayoutProps) {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <Container>
      <Wrapper {...props}>{children}</Wrapper>
      <Footer>
        <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="lg" />
        </DarkModeBtn>
      </Footer>
    </Container>
  );
}

export default AuthLayout;
