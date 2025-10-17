import { useState } from 'react'
import { InputFieldProps } from '../assets/types'

export default function InputField({ handleFetch }: InputFieldProps): JSX.Element {
  const [userInput, setUserInput] = useState('')

  return (
    <div className="flex border-2 border-blue-500 rounded-md py-1.5 px-1 w-4/5">
      <input
        placeholder="Amazon ASIN / URL"
        value={userInput}
        onChange={(ev) => setUserInput(ev.target.value)}
        className="w-[calc(100%-5rem)] outline-none bg-transparent ml-1"
      ></input>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => {
          handleFetch(userInput)
        }}
      >
        Fetch
      </button>
    </div>
  )
}
