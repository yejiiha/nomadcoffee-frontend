import React from "react";
import styled, { keyframes } from "styled-components";

const Animation = keyframes`
  0% { 
    transform: rotate(0deg); 
  }
  100% { 
    transform: rotate(360deg); 
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.div`
  border: 4px solid ${(props) => props.theme.borderColor};
  border-top: 4px solid ${(props) => props.theme.darkGray};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${Animation} 1.5s linear infinite;
`;

function Loader() {
  return (
    <Container>
      <Loading />
    </Container>
  );
}

export default Loader;
