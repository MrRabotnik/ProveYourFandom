import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import useInterval from '@use-it/interval'
import AnswerButton, { BUTTON_STATES } from './AnswerButton'
import styled from 'styled-components'
import { slideIn, slideOut } from './Animations'
import QLineUrl from './media/q-line.png'
import { QuestionSpec } from './types'
import { QuizContext } from './modes/TakeQuiz'
import { Transitionable } from './types'
import { SwitchTransition, Transition } from 'react-transition-group'

const FADE_DUR_S = 1

enum STATUS {
  IN_PROGRESS,
  SELECTED,
  TIMES_UP,
  RESULT,
}

const Container = styled.div<Transitionable>`
  width: 100%;
  height: 100%;
`

const QuestionHolder = styled.div<Transitionable>`
  width: 100%;
  padding-top: 4rem;
  justify-content: center;
  align-items: center;
  position: relative;
  opacity: ${props => props.transitionState === 'entered' ? '1' : '0'};
  transition: opacity ${FADE_DUR_S}s;
`
const QuestionLabel = styled.div`
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.2em;
  line-height: 1;
  position: relative;
  text-align: start;
  text-shadow: 0 0 15px rgb(255 255 255 / 50%);
  text-transform: uppercase;
  width: 100%;
`

const QuestionLine = styled.div`
  background-image: url(${QLineUrl});
  background-repeat: repeat-x;
  background-position: center center;
  height: 18px;
  mask-image: linear-gradient(90deg, rgba(0, 0, 0, 1.0) 73%, transparent 100%);
  position: absolute;
  top: 0;
  left: 10rem;
  width: 62%;

  @media only screen and (max-width: 600px) {
    width: 60%;
  }

  @media only screen and (max-width: 600px) {
    width: 60%;
  }

  @media only screen and (max-width: 361px) {
    width: 40%;
  }
`

interface IQuestionWrapper {
  questionLength: number,
  animateOff: boolean,
}
const QuestionWrapper = styled.div<IQuestionWrapper>`
  animation-name: ${({ animateOff }) => animateOff ? slideOut : slideIn};
  animation-duration: ${({ animateOff }) => animateOff ? '3000ms' : '600ms'};
  animation-timing-function: ${({ animateOff }) => animateOff ? 'ease-in' : 'ease-out'};
  animation-delay: ${({ animateOff }) => animateOff ? '0' : '100'}ms;
  animation-fill-mode: both;
  margin-top: 3rem;
`
interface IQuestionText {
  questionLength: number,
}
const QuestionText = styled.div<IQuestionText>`
  font-family: ATTAleckCd, sans-serif;
  letter-spacing: 0.03em;
  line-height: 1.25;
  margin: 12px 0;
  font-size: ${({ questionLength }) => questionLength > 150 ? '2' : '1.625'}rem;
  text-align: left;
  
  p {
    margin: 0;
    padding: 0;
  }
`

const AnswerHolder = styled.div<Transitionable>`
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-content: space-around;

  opacity: ${props => props.transitionState === 'entered' ? '1' : '0'};
  transition: opacity ${FADE_DUR_S}s;
`

interface IAnswerColumn {
  animateOff: boolean,
}
const AnswerColumn = styled.div<IAnswerColumn>`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  overflow: hidden;
  width: 100%;

  &:nth-child(2) { 
    align-items: flex-end;
  }

  animation-name: ${({ animateOff }) => animateOff ? slideOut : slideIn};
  animation-duration: ${({ animateOff }) => animateOff ? '3000ms' : '600ms'};
  animation-timing-function: ${({ animateOff }) => animateOff ? 'ease-in' : 'ease-out'};
  animation-delay: ${({ animateOff }) => animateOff ? '0' : '100'}ms;
  animation-fill-mode: both;
`

const AnswerItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
`

const AnswerLabel = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ATTAleckCd, sans-serif;
  font-size: 3.375rem;
  font-weight: bold;
  height: 100%;
  justify-content: center;
  left: 1.5625rem;
  line-height: 1;
  position: absolute;
  top: 0;
  opacity: 0;
`

const ArtImage = styled.img`
  width: 30%;
  height: auto;
  margin-top: 1rem;

  @media only screen and (min-width: 1024px) {
    display: none;
  }

  @media only screen and (max-width: 800px) {
    width: 40%
  }

  @media only screen and (max-width: 600px) {
    display: none;
  }
`

interface IQuestion extends Transitionable {
  questionNum: number,
  question: QuestionSpec,
  onChoice: () => void,
  onResult: (result: { correct: boolean, value: number }) => void,
  onResponseComplete: (correct: boolean) => void,
  timerRunning: boolean,
  src: string,
}

const TIMER_INTERVAL = 1000

function Question ({ questionNum, question, onChoice, onResult, onResponseComplete, timerRunning, transitionState, src }: IQuestion) {
  const [status, setStatus] = useState(STATUS.IN_PROGRESS)
  const [pickedIndex, setPickedIndex] = useState(null)
  const [completed, setCompleted] = useState(false)
  const [hideQuestion, setHideQuestion] = useState(false)
  const [timerInterval, setTimerInterval] = useState<number | null>(TIMER_INTERVAL)
  const { totalTime, currentTime, setCurrentTime } = useContext(QuizContext)

  const tick = useCallback(() => {
    setCurrentTime(seconds => seconds + 1)
  }, [setCurrentTime])

  useEffect(() => {
    setTimerInterval(timerRunning ? 1000 : null)
  }, [timerRunning])

  useInterval(tick, timerInterval)

  const onSelection = useCallback((index) => {
    setPickedIndex(index)
    setCompleted(true)
    setStatus(STATUS.SELECTED)
  }, [])

  // Kick off the question feedback stages once time is up.
  useEffect(() => {
    if (status !== STATUS.IN_PROGRESS) {
      return
    }
    const secondsLeft = totalTime - currentTime
    if (secondsLeft <= 0) {
      setStatus(STATUS.TIMES_UP)
    }
  }, [status, totalTime, currentTime])


  // A kind of state machine is defined in this useEffect, that triggers
  // behavior depending on the newest STATUS being set.
  const lastStatus = useRef(status)
  useEffect(() => {
    // callback dependencies might trigger useEffect more than we want
    // Ensure that only the status is changing.
    if (lastStatus.current === status) {
      return
    }

    lastStatus.current = status
    if (status === STATUS.SELECTED) {
      if (pickedIndex === null) {
        console.error('picked index is null.  Halting.')
      }
      question.answers[pickedIndex!].picked = true
      const isCorrect = question.answers[pickedIndex!].correct === true || question.type === 'lifestyle'
      if (isCorrect) {
        question.correct = isCorrect
      }
      onChoice()

      setTimeout(() => {
        setStatus(STATUS.RESULT)
        onResult.call(undefined, {correct: isCorrect, value: question.answers[pickedIndex!].value || 0 })
      }, 0.3 * 1000)
      return
    }

    if (status === STATUS.TIMES_UP) {
      setCompleted(true)
      onChoice()
      setTimeout(() => {
        setStatus(STATUS.RESULT)
      }, 0.3 * 1000)
      return
    }

    if (status === STATUS.RESULT) {
      // Time's up should make this incorrect.
      if (pickedIndex === null) {
        onResult.call(undefined, {correct: false, value: 0} )
      }
      setTimeout(() => {
        setHideQuestion(true)
      }, 1000)
      setTimeout(onResponseComplete, 2000)
    }
  }, [status, onChoice, onResponseComplete, onResult, pickedIndex, question])

  // reset with new question
  useEffect(() => {
    setCurrentTime(0)
    setPickedIndex(null)
    setCompleted(false)
    setStatus(STATUS.IN_PROGRESS)
    setHideQuestion(false)
  }, [question, setCurrentTime])

  const answers = useMemo(() => {
    return question.answers.map((answer, idx) => {
      let buttonState = BUTTON_STATES.DEFAULT

      if (status === STATUS.SELECTED || status === STATUS.TIMES_UP || status === STATUS.RESULT) {
        buttonState = BUTTON_STATES.DISABLED
      }

      if (status === STATUS.RESULT) {
        if (question.type === 'lifestyle') {
          if (pickedIndex === idx) {
            buttonState = BUTTON_STATES.MARKED_CORRECT
          } else {
            buttonState = BUTTON_STATES.DISABLED
          }
        } else if (answer.correct) {
          buttonState = BUTTON_STATES.MARKED_CORRECT
        } else if (!answer.correct) {
          buttonState = BUTTON_STATES.MARKED_WRONG
        }
      } else if (pickedIndex !== null) {
        buttonState = BUTTON_STATES.DISABLED
      }

      return (
        <AnswerItem key={'aitem-' + idx}>
          <AnswerLabel>{_letterIndexFromNum(idx)}</AnswerLabel>
          <AnswerButton
            index={idx}
            action={() => onSelection(idx)}
            actionName={answer.text}
            text={answer.text}
            isComplete={completed}
            selected={pickedIndex === idx}
            state={buttonState}
          />
        </AnswerItem>)
    })
  }, [question.answers, question.type, status, pickedIndex, completed, onSelection])

  return (
    <Container transitionState={transitionState}>
      <SwitchTransition mode={'out-in'}>
        <Transition
          key={questionNum}
          timeout={FADE_DUR_S * 2}
          enter
          mountOnEnter
          unmountOnExit
        >
          {(state) => {
            return <>
              <QuestionHolder className="question-content" transitionState={state}>
                <QuestionLabel className="question-label" >
                  <span>{'Question ' + questionNum}</span>
                  <QuestionLine/>
                </QuestionLabel>
                <QuestionWrapper questionLength={question.text.length} animateOff={hideQuestion}>
                  <QuestionText
                    className="question-text"
                    questionLength={question.text.length}
                    dangerouslySetInnerHTML={{ __html: question.text }} />
                </QuestionWrapper>
              </QuestionHolder>
              <AnswerHolder className="answer-holder" transitionState={state}>
                <AnswerColumn animateOff={hideQuestion}>
                  {answers}
                </AnswerColumn>
              </AnswerHolder>
              <ArtImage src={src} />
            </>
          }}
        </Transition>
      </SwitchTransition>
    </Container>
  )
}

function _letterIndexFromNum(num : number) : string {
  switch (num) {
  case 0: return 'A'
  case 1: return 'B'
  case 2: return 'C'
  case 3: return 'D'
  default: return ''
  }
}

export default Question
