/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCoffeeShops
// ====================================================

export interface seeCoffeeShops_seeCoffeeShops_user {
  __typename: "User";
  id: number;
  username: string;
  avatarUrl: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

export interface seeCoffeeShops_seeCoffeeShops_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string;
}

export interface seeCoffeeShops_seeCoffeeShops_categories {
  __typename: "Category";
  id: number;
  name: string;
}

export interface seeCoffeeShops_seeCoffeeShops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  isMine: boolean;
  user: seeCoffeeShops_seeCoffeeShops_user | null;
  photos: (seeCoffeeShops_seeCoffeeShops_photos | null)[] | null;
  categories: (seeCoffeeShops_seeCoffeeShops_categories | null)[] | null;
}

export interface seeCoffeeShops {
  seeCoffeeShops: (seeCoffeeShops_seeCoffeeShops | null)[] | null;
}

export interface seeCoffeeShopsVariables {
  offset: number;
}
