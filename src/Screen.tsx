import React from 'react'
import { TransitionGroup, Transition } from 'react-transition-group'
import modes from './constants/modes'
import { PAGE_TRANSITION_SPEED_MS } from './constants/timing'
import TakeQuiz from './modes/TakeQuiz'
import Complete from './modes/Complete'
import styled from 'styled-components'
import { QuestionSpec } from './types'

const Main = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-size: cover;
`

interface IScreen {
  mode: string,
  onModeFinished: () => void,
  questions: QuestionSpec[],
  artPath: string,
  onExit: () => void,
}
const Screen = ({ mode, onModeFinished, questions, artPath, onExit } : IScreen) => {
  return (
    <>
      <Main>
        <TransitionGroup component={null}>
          <Transition key={mode} timeout={PAGE_TRANSITION_SPEED_MS}>
            {
              state => (
                <>
                  {mode === modes.Quiz &&
                  <TakeQuiz
                    artPath={artPath}
                    questions={questions}
                    onFinish={onModeFinished}
                    onExit={onExit}
                    transitionState={state}
                  />
                  }
                  {mode === modes.Complete &&
                  <Complete
                    onFinish={onModeFinished}
                    transitionState={state}
                  />
                  }
                </>
              )
            }
          </Transition>
        </TransitionGroup>
      </Main>
    </>
  )
}

export default Screen
