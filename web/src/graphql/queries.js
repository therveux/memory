import { gql } from "apollo-boost";

export const GET_CARD_SETS = gql`
  query getCardSets {
    getSets {
      name
    }
  }
`;
