export function isObjectMatch(validObject: object, receivedObject: object): boolean {
  const validKeys = Object.keys(validObject)
  const receivedKeys = Object.keys(receivedObject)
  return (
    validKeys.length === receivedKeys.length &&
    validKeys.every((value) => ~receivedKeys.indexOf(value))
  )
}

export function isValidUrl(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch (ev) {
    return false
  }
}

export const removeQuotes = (string: string): string => string.replace(/['"]+/g, '')
export const containsQuotes = (string: string): boolean => string.match(/['"]+/g) !== null
