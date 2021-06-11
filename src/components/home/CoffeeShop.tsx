import React, { useState } from "react";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsisH,
  faStar as SolidStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Map, Marker } from "react-kakao-maps";
import Avatar from "../Avatar";
import useModal from "../useModal";
import CoffeeShopUtilModal from "./CoffeeShopUtilModal";

export interface CoffeeShopProps {
  key: number;
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  isMine: boolean;
  user: {
    id: number;
    username: string;
    avatarUrl: string;
    isFollowing: boolean;
    isMe: boolean;
  };
  photos: {
    id: number;
    url: string;
  }[];
  categories: {
    id: number;
    name: string;
  }[];
}

declare global {
  interface Window {
    kakao: any;
  }
}

interface CategoryProps {
  starbucks?: boolean;
}

const CoffeeShopContainer = styled.div`
  background-color: ${(props) => props.theme.formColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 40px;
  max-width: 615px;
  border-radius: 16px;
  padding: 20px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderColumn = styled.div`
  svg {
    cursor: pointer;
  }
`;

const Name = styled.h1`
  font-size: 40px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 20px;
`;

const CategoryContainer = styled.div`
  display: flex;
`;

const Category = styled.div<CategoryProps>`
  cursor: pointer;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.orangeColor};
  color: white;
  border-radius: 20px;
  margin-right: 10px;
`;

const MapContainer = styled.div`
  width: 90%;
  height: 300px;
  border-radius: 16px;
  margin: 30px 0;
  z-index: 0;
`;

const PhotoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const Photo = styled.img`
  width: 90%;
  height: 300px;
  border-radius: 16px;
`;

const UserInfoContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  svg {
    cursor: pointer;
  }
  &:last-child {
    flex-direction: column;
  }
`;

const Username = styled.span`
  cursor: pointer;
  margin-left: 20px;
  font-size: 16px;
  &:hover {
    text-decoration: underline;
  }
`;

const Bubble = styled.div`
  position: absolute;
  left: 43%;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: ${(props) => props.theme.warningColor};
`;

function CoffeeShop({
  id,
  name,
  latitude,
  longitude,
  isMine,
  user: { username, avatarUrl, isFollowing },
  photos,
  categories,
}: CoffeeShopProps) {
  const [show, setShow] = useState(false);
  const { toggle, visible } = useModal();
  const { kakao } = window;

  return (
    <>
      <CoffeeShopContainer key={id}>
        <HeaderContainer>
          <HeaderColumn />
          <Name>{name}</Name>
          <HeaderColumn>
            <FontAwesomeIcon icon={faEllipsisH} onClick={toggle} />
            <CoffeeShopUtilModal
              visible={visible}
              toggle={toggle}
              isMine={isMine}
              id={id}
            />
          </HeaderColumn>
        </HeaderContainer>

        {categories[0]?.name && (
          <CategoryContainer>
            {categories.map((c) => (
              <Category key={c.id}>{c?.name}</Category>
            ))}
          </CategoryContainer>
        )}

        {latitude && longitude && (
          <MapContainer>
            <Map
              options={{
                center: new kakao.maps.LatLng(
                  Number(latitude),
                  Number(longitude)
                ),
              }}
            >
              <Marker
                options={{
                  position: new kakao.maps.LatLng(
                    Number(latitude),
                    Number(longitude)
                  ),
                }}
              />
            </Map>
          </MapContainer>
        )}

        {photos[0]?.url && (
          <PhotoContainer>
            <Photo src={photos[0]?.url} />
          </PhotoContainer>
        )}

        <UserInfoContainer>
          <Column>
            <Avatar url={avatarUrl} lg />
            <Username>{username}</Username>
          </Column>
          <Column>
            <FontAwesomeIcon
              icon={isFollowing ? SolidStar : faStar}
              color={isFollowing ? "#FF9500" : "inherit"}
              onClick={() => setShow(!show)}
            />
          </Column>
          {isMine && show && <Bubble>You cannot follow yourself !</Bubble>}
        </UserInfoContainer>
      </CoffeeShopContainer>
    </>
  );
}

export default CoffeeShop;
