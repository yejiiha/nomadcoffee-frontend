import React from "react";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { keyframes } from "styled-components";

const Animation = keyframes`
    0%{
        opacity:0
    }
    50%{
        opacity:1
    }
    100%{
        opacity:0;
    }
`;

const Container = styled.div`
  animation: ${Animation} 1.5s linear infinite;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Loader() {
  return (
    <Container>
      <FontAwesomeIcon icon={faCoffee} size="3x" color="#FF9500" />
    </Container>
  );
}

export default Loader;
