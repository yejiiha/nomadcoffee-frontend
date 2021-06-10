import React, { useEffect } from "react";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsisH,
  faStar as SolidStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "./Avatar";

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

const { kakao } = window;

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
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  svg {
    cursor: pointer;
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
  const fLatitude = parseFloat(latitude);
  const fLongitude = parseFloat(longitude);

  useEffect(() => {
    let container = document.getElementById("shopMap");
    let options = {
      center: new kakao.maps.LatLng(fLatitude, fLongitude),
      level: 3,
    };

    let map = new kakao.maps.Map(container, options);

    let markerPosition = new kakao.maps.LatLng(fLatitude, fLongitude);

    // 마커를 생성
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커를 지도 위에 표시
    marker.setMap(map);
  }, [fLatitude, fLongitude]);

  return (
    <CoffeeShopContainer key={id}>
      <HeaderContainer>
        <HeaderColumn />
        <Name>{name}</Name>
        <HeaderColumn>
          <Link to={`/shop/${id}`}>
            <FontAwesomeIcon icon={faEllipsisH} />
          </Link>
        </HeaderColumn>
      </HeaderContainer>

      {categories[0]?.name && (
        <CategoryContainer>
          {categories.map((c) => (
            <Category key={c.id}>{c?.name}</Category>
          ))}
        </CategoryContainer>
      )}

      {latitude && longitude && <MapContainer id="shopMap" />}

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
          />
        </Column>
      </UserInfoContainer>
    </CoffeeShopContainer>
  );
}

export default CoffeeShop;
