import { ReactNode } from "react";
import styled from "styled-components";

type ErrorMessageProps = {
  message: ReactNode;
};

const SErrorMessage = styled.div`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  margin: 10px 0 0 0;
`;

function ErrorMessage({ message }: any) {
  return message === "" || !message ? null : (
    <SErrorMessage>{message}</SErrorMessage>
  );
}

export default ErrorMessage;
