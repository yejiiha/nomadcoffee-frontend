import { useReactiveVar } from "@apollo/client";
import { faPlusSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import routes from "../routes";

interface IHeaderInput {
  keyword: string;
}

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.formColor};
  padding: 9px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Column = styled.div``;
const HTitle = styled.h1`
  cursor: pointer;
  font-size: 24px;
  font-family: "Shadows Into Light", cursive;
  margin-right: 10px;
  &:active {
    color: ${(props) => props.theme.darkGray};
  }
`;

const HeaderInput = styled.input`
  min-width: 125px;
  width: 185px;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  padding: 5px 10px;
  text-align: center;
  font-size: 14px;
  &:focus {
    text-align: left;
    border-color: rgb(38, 38, 38);
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  margin-left: 18px;
  cursor: pointer;
  svg {
    font-size: 25px;
  }
`;

const LButton = styled.span`
  background-color: ${(props) => props.theme.orangeColor};
  border-radius: 5px;
  padding: 5px 9px;
  color: white;
  font-weight: 600;
  margin-left: 15px;
`;

const SButton = styled(LButton)`
  background-color: ${(props) => props.theme.formColor};
  color: ${(props) => props.theme.orangeColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  font-weight: 600;
`;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { register, handleSubmit, getValues } = useForm({
    mode: "onChange",
  });

  const onValid: SubmitHandler<IHeaderInput> = () => {
    const { keyword } = getValues();
    console.log(keyword);
  };

  return (
    <HeaderContainer>
      <Wrapper>
        <Column>
          <Link to={routes.home}>
            <HTitle>NomadCoffee</HTitle>
          </Link>
        </Column>
        <Column>
          <form onSubmit={handleSubmit(onValid)}>
            <HeaderInput
              {...register("keyword")}
              name="keyword"
              type="text"
              placeholder="Search"
            />
          </form>
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconContainer>
              <Icon>
                <Link to={"/add"}>
                  <FontAwesomeIcon icon={faPlusSquare} />
                </Link>
              </Icon>
              <Icon>
                <Link to={"/"}>
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </Icon>
            </IconContainer>
          ) : (
            <>
              <Link to={routes.home}>
                <LButton>Log in</LButton>
              </Link>
              <Link to={routes.signUp}>
                <SButton>Sign up</SButton>
              </Link>
            </>
          )}
        </Column>
      </Wrapper>
    </HeaderContainer>
  );
}

export default Header;
