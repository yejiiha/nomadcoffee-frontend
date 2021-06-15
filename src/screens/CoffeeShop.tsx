import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import styled from "styled-components";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsisH,
  faStar as SolidStar,
} from "@fortawesome/free-solid-svg-icons";
import { SEE_COFFEE_SHOP } from "../components/Queries";
import { IdParams } from "./EditShop";
import {
  HeaderContainer,
  HeaderColumn,
  Category,
  CategoryContainer,
  MapContainer,
  UserInfoContainer,
  Column,
  Username,
} from "../components/home/CoffeeShops";
import { Map, Marker } from "react-kakao-maps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "../components/Avatar";
import CoffeeShopUtilModal from "../components/home/CoffeeShopUtilModal";
import useModal from "../components/useModal";
import Loader from "../components/Loader";

const ShopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ShopPhoto = styled.img`
  height: 13em;
`;

const HContainer = styled(HeaderContainer)`
  width: 100%;
`;

const ShopName = styled.h1`
  display: flex;
  font-weight: 600;
  font-size: 3em;
  text-align: center;
  margin-bottom: 20px;
`;

const SMapContainer = styled(MapContainer)`
  width: 100%;
`;

function CoffeeShop() {
  const { id } = useParams<IdParams>();
  const { data, loading } = useQuery(SEE_COFFEE_SHOP, {
    variables: { id: Number(id) },
  });
  const shopData = data?.seeCoffeeShop;
  const { kakao } = window;
  const { toggle, visible } = useModal();

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <ShopContainer>
          {shopData?.photos[0]?.url.length > 0 && (
            <ShopPhoto src={shopData?.photos[0]?.url} />
          )}
          <HContainer>
            <HeaderColumn />
            <ShopName>{shopData?.name}</ShopName>
            <HeaderColumn>
              <FontAwesomeIcon icon={faEllipsisH} onClick={toggle} />
              <CoffeeShopUtilModal
                visible={visible}
                toggle={toggle}
                isMine={shopData?.isMine}
                id={shopData?.id}
              />
            </HeaderColumn>
          </HContainer>

          {shopData?.categories[0]?.name && (
            <CategoryContainer>
              {shopData?.categories.map((c: any) => (
                <Category key={c.id}>{c?.name}</Category>
              ))}
            </CategoryContainer>
          )}

          {shopData?.latitude && shopData?.longitude && (
            <SMapContainer>
              <Map
                options={{
                  center: new kakao.maps.LatLng(
                    Number(shopData?.latitude),
                    Number(shopData?.longitude)
                  ),
                }}
              >
                <Marker
                  options={{
                    position: new kakao.maps.LatLng(
                      Number(shopData?.latitude),
                      Number(shopData?.longitude)
                    ),
                  }}
                />
              </Map>
            </SMapContainer>
          )}

          <UserInfoContainer>
            <Column>
              <Avatar url={shopData?.user?.avatarUrl} xxl />
              <Username>{shopData?.user?.username}</Username>
            </Column>
            <Column>
              <FontAwesomeIcon
                icon={shopData?.user?.isFollowing ? SolidStar : faStar}
                color={shopData?.user?.isFollowing ? "#FF9500" : "inherit"}
              />
            </Column>
          </UserInfoContainer>
        </ShopContainer>
      )}
    </>
  );
}

export default CoffeeShop;
