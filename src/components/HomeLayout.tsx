import React from "react";
import styled from "styled-components";
import Header from "./Header";

type HomeLayoutProps = React.PropsWithChildren<{}>;

const Content = styled.main`
  margin: 0 auto;
  margin-top: 95px;
  max-width: 930px;
  width: 100%;
  min-height: 76vh;
`;

function HomeLayout({ children, ...props }: HomeLayoutProps) {
  return (
    <>
      <Header />
      <Content {...props}>{children}</Content>
    </>
  );
}

export default HomeLayout;
