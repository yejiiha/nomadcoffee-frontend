import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";

interface BottomBoxProps {
  cta: string;
  link: string;
  linkText: string;
}

const SBottomBox = styled(BaseBox)`
  padding: 25px 0px;
  text-align: center;
  a {
    margin-left: 5px;
    font-weight: 600;
    color: ${(props) => props.theme.orangeColor};
  }
`;

function BottomBox({ cta, link, linkText }: BottomBoxProps) {
  return (
    <SBottomBox>
      <span> {cta} </span>
      <Link to={link}>{linkText}</Link>
    </SBottomBox>
  );
}

export default BottomBox;
