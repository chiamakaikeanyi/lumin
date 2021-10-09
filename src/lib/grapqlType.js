import { gql } from '@apollo/client';

export const CURRENCY = gql`
  {
    currency
  }
`;

export const PRODUCT = gql`
  query Products($currency: Currency) {
    products {
      id
      title
      image_url
      price(currency: $currency)
      product_options {
        title
        prefix
        suffix
        options {
          id
          value
        }
      }
    }
  }
`;
