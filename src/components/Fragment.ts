import gql from "graphql-tag";

export const COFFEESHOP_FRAGMENT = gql`
  fragment CoffeeShopFragment on CoffeeShop {
    id
    name
    latitude
    longitude
    isMine
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    avatarUrl
    isFollowing
    isMe
  }
`;
