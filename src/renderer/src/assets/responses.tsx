export const Responses = {
  RESPONSES_OBJ: {
    noAsin: 'Result: Please provide an ASIN and try again...',
    noData: 'Error: Failed to retrieve any data...',
    empty: 'Format Result: Please provide a valid response and try again...',
    invalid: 'Format Result: Invalid JSON provided, please try again...'
  },

  RESPONSES_SET: new Set([
    'Result: Please provide an ASIN and try again...',
    'Error: Failed to retrieve any data...',
    'Format Result: Please provide a valid response and try again...',
    'Format Result: Invalid JSON provided, please try again...'
  ]),

  containsResponse: (response: string): boolean => Responses.RESPONSES_SET.has(response),
  noAsinResponse: (): string => Responses.RESPONSES_OBJ.noAsin,
  noDataResponse: (): string => Responses.RESPONSES_OBJ.noData,
  emptyResponse: (): string => Responses.RESPONSES_OBJ.empty,
  invalidResponse: (): string => Responses.RESPONSES_OBJ.invalid
}
