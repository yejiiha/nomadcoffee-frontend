import React from "react";
import styled from "styled-components";

interface AvatarProps {
  lg?: boolean;
  xxl?: boolean;
  xl?: boolean;
  sm?: boolean;
}

interface AvatarProp {
  url: string;
  lg?: boolean;
  xxl?: boolean;
  xl?: boolean;
  sm?: boolean;
}

const AvatarContainer = styled.div<AvatarProps>`
  width: ${(props) =>
    props.lg
      ? "35px"
      : props.xxl
      ? "60px"
      : props.xl
      ? "50px"
      : props.sm
      ? "25px"
      : "30px"};
  height: ${(props) =>
    props.lg
      ? "35px"
      : props.xxl
      ? "60px"
      : props.xl
      ? "50px"
      : props.sm
      ? "25px"
      : "30px"};
  border-radius: 50%;
  background-color: ${(props) => props.theme.borderColor};
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.darkGray};
  cursor: pointer;
`;

const Img = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: cover;
`;

function Avatar({
  url = "",
  lg = false,
  xxl = false,
  xl = false,
  sm = false,
}: AvatarProp) {
  return (
    <AvatarContainer lg={lg} xxl={xxl} xl={xl} sm={sm}>
      {url !== "" ? <Img src={url} /> : null}
    </AvatarContainer>
  );
}

export default Avatar;
