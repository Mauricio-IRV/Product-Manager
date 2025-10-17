import { useLazyQuery } from '@apollo/client'
import { ASIN_FETCH_PRODUCT, URL_FETCH_PRODUCT } from './graphql/queries'
import InputField from './components/InputField'
import ProductData from './components/ProductData'
import { useState } from 'react'
import { DataResponse } from './assets/types'
import { Responses } from './assets/responses'
import { isValidUrl, isObjectMatch, removeQuotes, containsQuotes } from './assets/utilites'

function App(): JSX.Element {
  const [urlFetchProduct, urlLazyResponse] = useLazyQuery(URL_FETCH_PRODUCT, {
    errorPolicy: 'all'
  })
  const [asinFetchProduct, asinLazyResponse] = useLazyQuery(ASIN_FETCH_PRODUCT, {
    errorPolicy: 'all'
  })

  const [dataWrapper, setDataWrapper] = useState<DataResponse | undefined>()

  const [content, setContent] = useState<string | undefined>()

  const handleFetch = (userInput: string): void => {
    if (containsQuotes(userInput)) userInput = removeQuotes(userInput)

    // No user input
    if (userInput === '') {
      setContent(Responses.noAsinResponse)
      return
    } else if (isValidUrl(userInput)) {
      // URL input
      urlFetchProduct({ variables: { amazonURL: userInput } }).then((result) => {
        const resultWrapper = { data: result.data }

        setDataWrapper(resultWrapper)
        setContent(JSON.stringify(resultWrapper, undefined, 2))
      })
    } else {
      // ASIN input
      asinFetchProduct({ variables: { amazonASIN: userInput } }).then((result) => {
        const resultWrapper = { data: result.data }

        setDataWrapper(resultWrapper)
        setContent(JSON.stringify(resultWrapper, undefined, 2))
      })
    }
  }

  const handleFormatData = (): string => {
    let results = dataWrapper

    if (!dataWrapper) {
      if (content == undefined || Responses.containsResponse(content)) {
        setContent(Responses.emptyResponse)
        return ''
      }

      try {
        results = JSON.parse(content)
      } catch (error) {
        setContent(Responses.invalidResponse)
        return ''
      }
    }

    const newProduct = `{
  "PK": "PRODUCTID#${results?.data?.amazonProduct?.asin}",
  "product_id": "${results?.data?.amazonProduct?.asin}",
  "title": "${results?.data?.amazonProduct?.title ?? ''}",
  "subtitle": "${results?.data?.amazonProduct?.subtitle ?? ''}",
  "price": ${results?.data?.amazonProduct?.price?.value ?? null},
  "url": "${results?.data?.amazonProduct?.url ?? ''}",
  "main_image_url": "${results?.data?.amazonProduct?.mainImageUrl ?? ''}",
  "image_urls": [${results?.data?.amazonProduct?.imageUrls ? results?.data?.amazonProduct?.imageUrls.map((url) => `"${url}"`) : ''}],
  "videos":
    ${
      results?.data?.amazonProduct?.videos && results?.data.amazonProduct.videos.length > 0
        ? `[${results?.data.amazonProduct.videos.map(
            (video) => `
          {
            "thumbnail_image_url": "${video.thumbnailImageUrl ?? ''}",
            "title": "${video.title ?? ''}",
            "url": "${video.url ?? ''}"
          }`
          )}]`
        : '""'
    },
  "brand": "${results?.data?.amazonProduct?.brand ?? ''}",
  "technical_specs": ${
    results?.data?.amazonProduct?.technicalSpecifications &&
    results?.data.amazonProduct.technicalSpecifications.length > 0
      ? `[${results?.data.amazonProduct.technicalSpecifications.map(
          (technicalSpecification) => `
          {
            "name": "${technicalSpecification.name ?? ''}",
            "value": ${JSON.stringify(technicalSpecification.value) ?? ''}
          }`
        )}]`
      : '""'
  },
  "feature_bullets": ${
    results?.data?.amazonProduct?.featureBullets &&
    results?.data.amazonProduct.featureBullets.length > 0
      ? `[${results?.data.amazonProduct.featureBullets.map((bullet) => `${JSON.stringify(bullet)}`)}]`
      : '""'
  },
  "tags": ${
    results?.data?.amazonProduct?.categories && results?.data.amazonProduct.categories.length > 0
      ? `[${results?.data.amazonProduct.categories.map((category) => `"${category.name}"`)}]`
      : '""'
  },
  "seller": {
    "name": "${results?.data?.amazonProduct?.seller?.name ?? ''}",
    "rating": ${results?.data?.amazonProduct?.seller?.rating ?? null}
  },
  "ratings_total": ${results?.data?.amazonProduct?.ratingsTotal ?? null},
  "rating": ${results?.data?.amazonProduct?.rating ?? null},
  "reviews_total": ${results?.data?.amazonProduct?.reviewsTotal ?? null},
  "provider_product": "${results?.data?.amazonProduct?.__typename ?? 'AmazonProduct'}",
  "date_added": "${new Date().toISOString()}",
  "categories": {
    "equipment": false,
    "supplies": false,
    "books": false,
    "newest": false,
    "on_sale": false,
    "gadgets": false
  },
  "plan_type": ["Standard"],
  "sell_count": 0
}`
    setContent(newProduct)
    return newProduct
  }

  const handleUpdateDatabase = (): void => {
    const parsedContent = JSON.parse(content ?? '')

    let parsedDataWrapper
    if (dataWrapper) parsedDataWrapper = JSON.parse(JSON.stringify(dataWrapper, undefined, 2))
    else parsedDataWrapper = ''

    let newProduct = parsedContent
    if (isObjectMatch(parsedDataWrapper, parsedContent)) newProduct = JSON.parse(handleFormatData())

    console.log('Database Update Sent!')
    console.log(newProduct)
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center text-center w-screen h-screen">
        <InputField handleFetch={handleFetch}></InputField>
        <div className="py-2"></div>
        <ProductData
          urlLazyResponse={urlLazyResponse}
          asinLazyResponse={asinLazyResponse}
          content={content}
          setContent={setContent}
          handleFormatData={handleFormatData}
          handleUpdateDatabase={handleUpdateDatabase}
        ></ProductData>
      </div>
    </>
  )
}

export default App
