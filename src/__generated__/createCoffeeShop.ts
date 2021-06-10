/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createCoffeeShop
// ====================================================

export interface createCoffeeShop_createCoffeeShop {
  __typename: "MutationResponse";
  id: number | null;
  ok: boolean;
  error: string | null;
}

export interface createCoffeeShop {
  createCoffeeShop: createCoffeeShop_createCoffeeShop;
}

export interface createCoffeeShopVariables {
  name: string;
  latitude?: string | null;
  longitude?: string | null;
  categories?: string | null;
  photos?: any | null;
}
