/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCoffeeShop
// ====================================================

export interface seeCoffeeShop_seeCoffeeShop_user {
  __typename: "User";
  id: number;
  username: string;
  avatarUrl: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

export interface seeCoffeeShop_seeCoffeeShop_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string;
}

export interface seeCoffeeShop_seeCoffeeShop_categories {
  __typename: "Category";
  id: number;
  name: string;
}

export interface seeCoffeeShop_seeCoffeeShop {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  isMine: boolean;
  user: seeCoffeeShop_seeCoffeeShop_user | null;
  photos: (seeCoffeeShop_seeCoffeeShop_photos | null)[] | null;
  categories: (seeCoffeeShop_seeCoffeeShop_categories | null)[] | null;
}

export interface seeCoffeeShop {
  seeCoffeeShop: seeCoffeeShop_seeCoffeeShop | null;
}

export interface seeCoffeeShopVariables {
  id: number;
}
