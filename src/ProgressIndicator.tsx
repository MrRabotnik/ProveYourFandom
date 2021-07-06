import { pulse } from './Animations'
import styled from 'styled-components'
import { useMemo } from 'react'
import StarImg from './media/progress-star.svg'
import { ProgressState } from './modes/TakeQuiz'

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const Steps = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  > * {
    margin: .9rem;
  }

  @media only screen and (max-width: 600px) {
    flex-direction: row;
    justify-content: center;

    > * {
    margin: 2.5%;
    }
  }
`

interface IStep {
  isFilled: boolean,
  isCurrent: boolean,
  isCorrect: boolean,
}
const Step = styled.div<IStep>`
  align-items: center;
  background-color: ${({ isFilled, isCorrect }) =>
    isFilled 
      ? isCorrect 
        ? '#c31e96' 
        : '#0a0a32' 
      : 'transparent' };
  border: 5px solid ${({ isFilled, isCurrent }) => isFilled || isCurrent ? 'white' : '#0a0a32'};
  border-radius: 2.5rem;
  color: ${({ isFilled, isCurrent }) => isFilled || isCurrent ? 'white' : '#0a0a32'};
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
  height: 1.5rem;
  justify-content: center;
  width: 1.5rem;

  animation: ${({ isCurrent }) => isCurrent ? pulse : 'none'} 1s ease-in-out infinite;
  transition: border 300ms, color 300ms, background-color 300ms;

  @media only screen and (max-width: 600px) {
    width: 10%;
    height: 6vw;
  }

  @media only screen and (max-width: 450px) {
    font-size: 1.2rem;
    height: 5vw;
  }

  @media only screen and (max-width: 360px) {
    height: 1rem;
    width: 1rem;
    font-size: 1rem;
  }
`

interface IStar {
  isFilled: boolean,
}
const Star = styled.div<IStar>`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
`

interface IProgressIndicator {
  currentIndex: number,
  totalSteps: number,
  progress: ProgressState
}
function ProgressIndicator ({ currentIndex, totalSteps, progress } : IProgressIndicator) {
  const ProgSteps = useMemo(() => {
    const isFilled = (idx: number) => {
      return progress.steps[idx] ? progress.steps[idx].filled : false
    }
    const isCurrent = (idx: number) => {
      return currentIndex === idx
    }
    const isCorrect = (idx: number) => {
      return progress.steps[idx] ? progress.steps[idx].correct : false
    }

    const steps: JSX.Element[] = []
    for (let i = 0; i < totalSteps; i++) {
      steps.push(<Step key={`st-${i}`} isFilled={isFilled(i)} isCurrent={isCurrent(i)} isCorrect={isCorrect(i)}>{i + 1}</Step>)
    }
    return steps
  }, [progress, totalSteps, currentIndex])

  const FinalStar = useMemo(() => {
    return (
      <Star isFilled={false}>
        <StarImg />
      </Star>
    )
  }, [])

  return (
    <Container>
      <Steps>
        {ProgSteps}
        {FinalStar}
      </Steps>
    </Container>
  )
}

export default ProgressIndicator
