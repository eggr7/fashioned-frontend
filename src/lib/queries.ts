// src/lib/queries.ts
import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
    products {
      name
      slug
      price
      category {
        name
      }
      sizes {
        label
      }
      colors {
        name
        hexCode
      }
    }
  }
`;
