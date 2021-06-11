import gql from "graphql-tag";
import { COFFEESHOP_FRAGMENT, USER_FRAGMENT } from "./Fragment";

export const SEE_COFFEE_SHOPS = gql`
  query seeCoffeeShops($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
      ...CoffeeShopFragment
      user {
        ...UserFragment
      }
      photos {
        id
        url
      }
      categories {
        id
        name
      }
    }
  }
  ${COFFEESHOP_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const CREATE_COFFEE_SHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String
    $longitude: String
    $categories: String
    $photos: Upload
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      categories: $categories
      photos: $photos
    ) {
      id
      ok
      error
    }
  }
`;

export const SEE_COFFEE_SHOP = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      ...CoffeeShopFragment
      user {
        ...UserFragment
      }
      photos {
        id
        url
      }
      categories {
        id
        name
      }
    }
  }
  ${COFFEESHOP_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const EDIT_COFFEE_SHOP_MUTATION = gql`
  mutation editCoffeeShop(
    $id: Int!
    $name: String
    $latitude: String
    $longitude: String
    $categories: String
    $photos: Upload
  ) {
    editCoffeeShop(
      id: $id
      name: $name
      latitude: $latitude
      longitude: $longitude
      categories: $categories
      photos: $photos
    ) {
      id
      ok
      error
    }
  }
`;

export const DELETE_COFFEE_SHOP_MUTATION = gql`
  mutation deleteCoffeeShop($id: Int!) {
    deleteCoffeeShop(id: $id) {
      id
      ok
      error
    }
  }
`;

export const SEE_ME = gql`
  query me {
    me {
      id
      username
      avatarUrl
    }
  }
`;
