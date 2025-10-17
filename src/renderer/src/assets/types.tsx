import { ApolloError } from '@apollo/client'

export interface DataResponse {
  data: AmazonProductResponse | null
}

export interface AmazonProductResponse {
  amazonProduct: {
    asin: string
    title: string | null
    subtitle: string | null
    brand: string | null
    mainImageUrl: string | null
    ratingsTotal: number | null
    rating: number | null
    price: {
      value: number
    } | null
    featureBullets: string[] | null
    technicalSpecifications:
      | {
          name: string | null
          value: string | null
        }[]
      | null
    imageUrls: string[] | null
    url: string | null
    videos: {
      thumbnailImageUrl: string | null
      title: string | null
      url: string | null
    }[]
    seller: {
      name: string | null
      rating: number | null
    } | null
    categories:
      | {
          name: string | null
        }[]
      | null
    reviewsTotal: number | null
    __typename: string | null
  } | null
}

export interface QueryResponse {
  data?: AmazonProductResponse
  error?: ApolloError | undefined
  loading: boolean
}

export interface TextAreaProps {
  text: string
}

export type InputFieldProps = {
  handleFetch: (amazonASIN: string) => void
}

export type ProductDataProps = {
  urlLazyResponse: QueryResponse
  asinLazyResponse: QueryResponse
  content: string | undefined
  setContent: (content: string | undefined) => void
  handleFormatData: () => string
  handleUpdateDatabase: () => void
}
