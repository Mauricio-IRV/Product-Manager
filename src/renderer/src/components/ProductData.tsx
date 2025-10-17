import { useEffect, useRef } from 'react'
import { ProductDataProps } from '../assets/types'
import { enableTabToIndent } from 'indent-textarea'

export default function ProductData({
  urlLazyResponse,
  asinLazyResponse,
  content,
  setContent,
  handleFormatData,
  handleUpdateDatabase
}: ProductDataProps): JSX.Element {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textareaElement = textareaRef.current
    if (textareaElement) {
      enableTabToIndent(textareaElement)
    }
  }, [])

  if (
    urlLazyResponse.error ||
    asinLazyResponse.error ||
    urlLazyResponse.loading ||
    asinLazyResponse.loading
  )
    return (
      <>
        <textarea
          disabled
          className="resize-none overflow-auto whitespace-pre outline-none bg-transparent text-left w-4/5 py-2.5 px-2.5 border-2 rounded-md min-h-[calc(100%/2)]"
          value={
            urlLazyResponse.loading || asinLazyResponse.loading
              ? 'Loading...'
              : urlLazyResponse.error
                ? JSON.stringify(urlLazyResponse.error.message, undefined, 2)
                : asinLazyResponse.error
                  ? JSON.stringify(asinLazyResponse.error.message, undefined, 2)
                  : ''
          }
        ></textarea>
        <button
          onClick={() => window.location.reload()}
          className="absolute center text-2xl hover:text-sky-700"
        >
          {urlLazyResponse.error || asinLazyResponse.error ? '&#8635;' : null}
        </button>
      </>
    )

  return (
    <>
      <div className="w-4/5 pr-2 pb-1 text-right text-gray-400 w-4/5 border-2 rounded-tl-md rounded-tr-md min-h-fit">
        <button
          onClick={() => setContent(undefined)}
          className="relative -bottom-0.5 text-xl hover:text-sky-700"
        >
          &#9746;
        </button>
        <span className="p-2"></span>
        <button onClick={() => handleFormatData()} className="text-xl m-auto hover:text-sky-700">
          &#9778;
        </button>
        <span className="p-2"></span>
        <button
          onClick={() => handleUpdateDatabase()}
          className="relative -bottom-0.5 text-xl hover:text-sky-700"
        >
          &#10147;
        </button>
      </div>

      <textarea
        className="resize-none overflow-auto whitespace-pre outline-none bg-transparent text-left w-4/5 py-2.5 px-2.5 border-l-2 border-b-2 border-r-2 rounded-bl-md rounded-br-md min-h-[calc(100%/2)]"
        spellCheck="false"
        value={content ?? ''}
        onChange={(ev) => setContent(ev.target.value)}
        ref={textareaRef}
      ></textarea>
    </>
  )
}
