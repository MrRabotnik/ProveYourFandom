import React, { useEffect, useState } from 'react'
import ProgressIndicator from '../ProgressIndicator'
import Question from '../Question'
import { ScoreContext, Context } from '../contexts/ScoreContext'
import styled from 'styled-components'
import { QuestionSpec } from '../types'
import CountDown from '../CountDown'
import { QUESTION_DURATION_S } from '../constants/timing'
import Instructions from '../Instructions'
import Header2 from '../Header2'
import { Transition } from 'react-transition-group'
import { Transitionable } from '../types'
import { PAGE_TRANSITION_SPEED_MS } from '../constants/timing'

const Container = styled.div<Transitionable>`
  display: grid;
  grid-template-columns: 30% 40% 30%;
  grid-template-rows: 100%;
  height: 100%;
  width: 100%;
  opacity: ${props => props.transitionState === 'entered' ? '1' : '0'};
  transition: opacity ${PAGE_TRANSITION_SPEED_MS}ms;

  @media only screen and (max-width: 1024px) {
    display: flex;
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`

const ArtWrap = styled.div`
  background: #0a0a32;
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  z-index: 5;

  @media only screen and (max-width: 1024px) {
    display: none;
  }
`

const ArtFrame = styled.div`
  height: auto;
  width: 70%;
  border: 3px solid white;
  box-shadow: 0 0 20px 2px rgba(255,255,255,0.64);
  border-radius: 5px;
  line-height: 0.9;
`

const ArtImage = styled.img`
  width: 100%;
  height: 100%;
`

const MiddleWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 5;
  padding-left: 5rem;
  text-align: left;

  @media only screen and (max-width: 1024px) {
    padding-left: 3rem;
  }

  @media only screen and (max-width: 600px) {
    padding: 0 3rem;
    width: 80%;
    margin: auto;
    padding: 0;
  }
`

const HeaderWrapper = styled.div`
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`

const InstructionScreen = styled(Instructions)``

const QuestionScreen = styled(Question)``


// Not sure why styled(ProgressIndicator) didn't work, but it didn't, so I had to make a wrapper.
const Progress = styled.div`
  margin-top: 17rem;
  margin-left: 8.3125rem;
  position: relative;
  z-index: 5;
  width: 100px;

  @media only screen and (max-width: 1024px) {
    margin-top: 7rem;
    margin-right: 10rem;
    margin-left: 2rem;
    margin-top: 15rem;
  }

  @media only screen and (max-width: 800px) {
    margin-right: 7rem;
  }

  @media only screen and (max-width: 600px) {
    width: 80%;
    margin: 0 auto;
  }
`

const TimeLeft = styled(CountDown)<Transitionable>`
  position: absolute;
  right: 5%;
  width: 252.82px;

  opacity: ${props => props.transitionState === 'entered' ? '1' : '0'};
  transition: ${props => props.transitionState === 'entered' ? 'opacity 300ms, transform 300ms' : 'opacity 300ms 1000ms' };

  @media only screen and (max-width: 1700px) {
    right: 4%;
  }

  @media only screen and (max-width: 1600px) {
    right: -10%;
  }

  @media only screen and (max-width: 1400px) {
    right: -1%;
  }

  @media only screen and (max-width: 1300px) {
    right: -2%;
  }

  @media only screen and (max-width: 1200px) {
    right: -6%;
  }

  @media only screen and (max-width: 1200px) {
    right: -10%;
  }

  @media only screen and (max-width: 600px) {
    top: -80px;
    right: -15%;
  }

  @media only screen and (max-width: 600px) {
    right: -25%;
  }
`

export interface ProgressState {
  steps: {
    filled: boolean,
    correct: boolean,
  }[]
}

interface IQuizContext {
  totalTime: number,
  currentTime: number,
  setCurrentTime: React.Dispatch<React.SetStateAction<number>> | (() => void),
}

export const QuizContext = React.createContext<IQuizContext>({
  totalTime: 0,
  currentTime: 0,
  setCurrentTime: () => console.warn('missing setCurrentTime'),
})

interface ITaKeQuiz extends Transitionable {
  artPath: string,
  questions: QuestionSpec[],
  onFinish: () => void,
  onExit: () => void,
}
function TakeQuiz ({ artPath, questions, onFinish, onExit, transitionState }: ITaKeQuiz) {
  const [started, setStarted] = useState(false)
  const [questionNum, setQuestionNum] = useState(-1)
  const [progress, setProgress] = useState<ProgressState>({steps: []})
  const [timerRunning, setTimerRunning] = useState<boolean>(false)
  const [showTimer, setShowTimer] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [totalTime] = useState<number>(QUESTION_DURATION_S)
  const { addResult } = React.useContext(ScoreContext) as Context

  React.useEffect(() => {
    console.log('Missing: Analytics trackAppEvent', 'START')
  }, [])

  useEffect(() => {
    const qState = questions.map((q) => {
      return { filled: false, correct: false }
    })
    setProgress({steps: qState })
  }, [questions])

  useEffect(() => {
    if (questions[questionNum]) {
      setTimerRunning(true)
      setShowTimer(true)
    }
  }, [questions, questionNum])

  const onStartClick = () => {
    setQuestionNum(0)
    setStarted(true)
  }

  const onCancelClicked = () => {
    onExit()
  }

  const onChoice = () => {
    setTimerRunning(false)
  }

  const onResult = (result: { correct: boolean, value: number }) => {
    setProgress(p => {
      if (!p.steps[questionNum]) {
        return p
      }

      p.steps[questionNum] = {filled: true, correct: result.correct}
      return {steps: p.steps}
    })

    const question = questions[questionNum]

    // Lifestyle questions are "correct" for scoring if they're any value other than 1
    if (question.type === 'lifestyle') {
      const correct = result.value > 1
      addResult(question, correct)

    } else {
      addResult(question, result.correct)
    }
    setShowTimer(false)
  }

  const onQuestionComplete = () => {
    if (questionNum < questions.length - 1) {
      setQuestionNum(num => num + 1)
    } else {
      onFinish()
    }
  }

  return (
    <Container className="screen" transitionState={transitionState}>
      <ArtWrap>
        <ArtFrame>
          <ArtImage src={artPath} />
        </ArtFrame>
      </ArtWrap>
      <QuizContext.Provider value={{ totalTime: totalTime, currentTime: currentTime, setCurrentTime: setCurrentTime }}>
        <MiddleWrapper>
          <HeaderWrapper >
            <Header2 title={'Prove your fandom'} columnStart={true} />
          </HeaderWrapper>
          <Transition
            in={!started}
            timeout={300}
            appear
            unmountOnExit>
            { state =>
              <InstructionScreen transitionState={state} onStart={onStartClick} onCancel={onCancelClicked} src={ artPath }/>
            }
          </Transition>
          <Transition
            in={started}
            timeout={300}
            appear
            unmountOnExit>
            { state =>
              <QuestionScreen
                transitionState={state}
                questionNum={questionNum + 1}
                question={questions[questionNum]}
                onChoice={onChoice}
                onResult={onResult}
                onResponseComplete={onQuestionComplete}
                timerRunning={timerRunning}
                src={ artPath }
              />
            }
          </Transition>
        </MiddleWrapper>
        <Progress>
          <ProgressIndicator currentIndex={questionNum} totalSteps={questions.length} progress={progress}/>
        </Progress>
        <Transition in={showTimer} timeout={300}>
          {state => <TimeLeft transitionState={state} />}
        </Transition>
      </QuizContext.Provider>
    </Container>
  )
}

export default TakeQuiz
