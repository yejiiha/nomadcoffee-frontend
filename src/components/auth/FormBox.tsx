import React from "react";
import styled from "styled-components";

type AuthLayoutProps = React.PropsWithChildren<{}>;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.formColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
  padding: 35px 0 20px 0;
  margin-bottom: 10px;
  form {
    width: 100%;
    margin-top: 30px;
    padding: 0 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

function FormBox({ children, ...props }: AuthLayoutProps) {
  return <Container {...props}>{children}</Container>;
}

export default FormBox;
