import { gql } from '@apollo/client'

export const URL_FETCH_PRODUCT = gql`
  query urlFetchProduct($amazonURL: String!) {
    amazonProduct(input: { urlLookup: { url: $amazonURL } }) {
      asin
      title
      subtitle
      brand
      mainImageUrl
      ratingsTotal
      rating
      price {
        value
      }
      categories {
        name
      }
      featureBullets
      technicalSpecifications {
        name
        value
      }
      imageUrls
      reviewsTotal
      url
      videos {
        thumbnailImageUrl
        title
        url
      }
      seller {
        name
        rating
      }
    }
  }
`

export const ASIN_FETCH_PRODUCT = gql`
  query asinFetchProduct($amazonASIN: String!) {
    amazonProduct(input: { asinLookup: { asin: $amazonASIN } }) {
      asin
      title
      subtitle
      brand
      mainImageUrl
      ratingsTotal
      rating
      price {
        value
      }
      categories {
        name
      }
      featureBullets
      technicalSpecifications {
        name
        value
      }
      imageUrls
      reviewsTotal
      url
      videos {
        thumbnailImageUrl
        title
        url
      }
      seller {
        name
        rating
      }
    }
  }
`
