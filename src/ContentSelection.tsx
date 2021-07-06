import React, { useEffect, useState } from 'react'
import ContentChoice from './ContentChoice'
import { ChallengeContent } from './types'
import styled from 'styled-components'
import { SELECTION_DELAY_MS } from './constants/timing'
import Header from './Header'
import Welcome from './modes/Welcome'
import {
  WELCOME_DURATION_S,
} from './constants/timing'

const Container = styled.div`
  width: 100%;
  height: 50%;
`
const Choices = styled.div`
  align-content: space-around;
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  max-width: 1024px;
  margin: auto;
  margin-top: 2rem;
`
const CTA = styled.div`
  color: white;
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-top: 3.3rem;
`

interface ContentSelectionProps {
  contentChoices: ChallengeContent[],
  onSelected: (choice: string) => void,
}
const ContentSelection = ({ contentChoices, onSelected } : ContentSelectionProps) => {
  const [selection, setSelection] = useState('')
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const welcomeTimeout = setTimeout(() => {
      setShowWelcome(false)
    }, WELCOME_DURATION_S * 1000)
    return () => {
      clearTimeout(welcomeTimeout)
    }
  }, [])

  function choiceClicked (this: any, e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) {
    // Once a selection happens, that's it.  No mind changing until later!
    if (selection !== '') return
    const target = e.currentTarget
    if (!target.dataset.contentName) {
      console.warn('Selection has no contentName dataset.')
      return
    }
    const newSelection = target.dataset['contentName']
    setSelection(newSelection)
  }

  useEffect(() => {
    if (!selection) return
    const timeout = setTimeout(() => {
      onSelected(selection)
    }, SELECTION_DELAY_MS)
    return () => {
      clearTimeout(timeout)
    }
  }, [onSelected, selection])

  return (
    <Container>
      <Header title={'Prove your fandom'} isSecondary={false} columnStart={true} />
      {showWelcome &&
        <Welcome />}

      {!showWelcome &&
        <>
          <CTA>Select a TV show below.</CTA>
          <Choices>
            {
              contentChoices.map((content, idx) => {
                return (
                  <ContentChoice
                    index={idx}
                    key={`ch-${idx}`}
                    coverArt={content.keyArt}
                    title={content.title}
                    selected={selection === content.title}
                    completed={selection !== ''}
                    onClick={choiceClicked}
                  />
                )
              })
            }
          </Choices></>}
    </Container>
  )
}

export default ContentSelection

