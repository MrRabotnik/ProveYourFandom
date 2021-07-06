import { QuestionSpec } from './types'
import React, { useEffect, useState } from 'react'
import Screen from './Screen'
import modes from './constants/modes'

const INITIAL_MODE = modes.Quiz

interface TakingChallengeProps {
  contentName: string,
  questions: QuestionSpec[],
  artPath: string,
  onChallengeComplete: () => void,
}

const TakingChallenge = ({ contentName , questions, artPath, onChallengeComplete }: TakingChallengeProps) => {
  const [mode, setMode] = useState(INITIAL_MODE)

  useEffect(() => {
    console.log(`TODO: Track page view for ${contentName}, mode ${mode}`)
  }, [contentName, mode])

  const incrementModeIndex = () => {
    const modeNames = Object.values(modes)
    const modeCount = modeNames.length
    const current = modeNames.indexOf(mode)
    const next = current + 1
    if (next > modeCount - 1) {
      onChallengeComplete()
      return
    }
    const nextMode = modeNames[next]
    setMode(nextMode)
  }

  return (
    <>
      <Screen
        artPath={artPath}
        mode={mode}
        onModeFinished={incrementModeIndex}
        questions={questions}
        onExit={onChallengeComplete}
      />
    </>
  )
}

export default TakingChallenge
