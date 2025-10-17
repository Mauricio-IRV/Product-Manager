import './assets/style.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

// TODO: Remove hardcoded API-KEY Later

const client = new ApolloClient({
  uri: 'https://graphql.canopyapi.co/',
  headers: {
    'API-KEY': '1b069d8d-5936-45fa-a34e-bfe2d26a5d34'
  },
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
