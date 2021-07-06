import React from 'react'
import ReactDOM from 'react-dom'
import './fonts/fonts.css'
import GlobalStyles from './GlobalStyles'
import App from './App'
import useDirectus from './hooks/useDirectus'
import useContent from './hooks/useContent'
import { Loader } from './LoadingScreen'

const ROOT_ELEMENT = document.getElementById('root')

function Root() {
  const [cmsData, /* refresh */, isLoading] = useDirectus(
    'https://hbomax-archive-directus.attexp.com/graphql')
  const [content] = useContent(cmsData)

  if (isLoading) {
    return (
      <>
        <GlobalStyles />
        <Loader />
      </>
    )
  }

  return (
    <>
      <GlobalStyles />
      <App
        content={content}
      />
    </>
  )
}

ReactDOM.render(<Root />, ROOT_ELEMENT)
