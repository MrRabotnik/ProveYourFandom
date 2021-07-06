import React, { useState, useEffect } from 'react'
import useChallenge from './hooks/useChallenge'
import TakingChallenge from './TakingChallenge'
import ContentSelection from './ContentSelection'
import { ScoreProvider } from './contexts/ScoreContext'
import { ChallengeContent } from './types'


enum CHALLENGE_STEPS {
  CHOOSING,
  TAKING
}
const INITIAL_STEP = CHALLENGE_STEPS.CHOOSING

interface ChallengeProps {
  isIdle: boolean,
  content: ChallengeContent[],
}

const LIFESTYLE_RATIO = 0.5

function Challenge ({ isIdle, content } : ChallengeProps) {
  const [step, setStep] = useState(INITIAL_STEP)
  const [challenge, getNewChallenge] = useChallenge(content, LIFESTYLE_RATIO)

  useEffect(() => {
    if (isIdle) {
      setStep(INITIAL_STEP)
    }
  }, [isIdle])

  const onContentSelected= (choice: string) => {
    getNewChallenge(choice)
    setStep(CHALLENGE_STEPS.TAKING)
  }

  const onChallengeComplete = () => {
    setStep(CHALLENGE_STEPS.CHOOSING)
  }

  useEffect(() => {
    console.log('challenge changed', challenge.questions)
  }, [challenge])

  return (
    <>
      {step === CHALLENGE_STEPS.CHOOSING &&
        <ContentSelection
          contentChoices={content}
          onSelected={onContentSelected}/>
      }
      {step === CHALLENGE_STEPS.TAKING &&
        <ScoreProvider>
          <TakingChallenge
            artPath={challenge.keyArt}
            contentName={challenge.title}
            questions={challenge.questions}
            onChallengeComplete={onChallengeComplete}
          />
        </ScoreProvider>
      }
    </>
  )
}

export default Challenge
