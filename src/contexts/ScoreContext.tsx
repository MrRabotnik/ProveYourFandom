import React, { useState, useEffect } from 'react'
import { QuestionSpec } from '../types'

export enum FAN_LEVELS {
  EARLY,
  SOLID,
  REAL,
  MEGA,
  SUPER,
}

export interface Context {
  fanLevel: number,
  addResult: (question: QuestionSpec, wasCorrect: boolean) => void,
}
const ScoreContext = React.createContext<Context | {}>({})

interface ScoreProviderProps {
  children: JSX.Element,
}

const ScoreProvider = ({ children } : ScoreProviderProps) => {
  const [fanLevel, setFanLevel] = useState<number>(() => {return Object.keys(FAN_LEVELS).length / 2 - 1})

  const addResult = (question: QuestionSpec, wasCorrect: boolean) => {
    //console.log('addResult correct?', wasCorrect)
    if (!wasCorrect) {
      setFanLevel((current) => {
        return fanLevel === 0 ? 0 : fanLevel - 1
      })
    }
  }

  useEffect(() => {
    console.log('fanLevel set to', fanLevel)
  }, [fanLevel])

  return (
    <ScoreContext.Provider value={{ fanLevel, addResult }}>
      {children}
    </ScoreContext.Provider>
  )
}

export { ScoreProvider, ScoreContext }
