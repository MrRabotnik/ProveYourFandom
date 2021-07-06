import React, { useContext } from 'react'
import styled from 'styled-components'
import Digits from './Digits'
import { QuizContext } from './modes/TakeQuiz'

interface IContainer {
  currentTime: number,
  totalTime: number,
}
const Container = styled.div<IContainer>`
  position: relative; 
  transform: ${(props) => `translateY(-${(props.totalTime - props.currentTime) * 252.815}px)`};
  transition: transform 500ms;
  line-height: 0.8;
  
  & text {
    font-family: ATTAleckCd, sans-serif;
    font-weight: 300;
  }
  & .stroke {
    stroke-width: 2px;
  }

  @media only screen and (min-width: 1500px) {
    & svg g{
      font-size: 200px !important;
    }
  }

  @media only screen and (max-width: 600px) {
    & svg g{
      font-size: 50px !important;
    }
  }
`

const Wrapper = styled.div`
  height: 500px;
  width: 252.82px;
  position: absolute;
  right: -3%;
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0)), linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));

  @media only screen and (min-width: 1500px) {
    right: 3%;
    top: 100px;
  }

  @media only screen and (max-width: 600px) {
    height: 25%;
    right: 4%;
  }
`

interface ICountDown {
  className?: string,
}
const CountDown: React.FunctionComponent<ICountDown> = ({ className } : ICountDown) => {
  const { currentTime, totalTime } = useContext(QuizContext)

  const digits: JSX.Element[] = []

  for (let i = 0; i <= totalTime; i++) {
    digits.push(<Digits key={`d-${i}`} number={i}/>)
  }

  return (
    <Wrapper>
      <Container className={className} currentTime={currentTime} totalTime={totalTime}>
        {digits}
      </Container>
    </Wrapper>
  )
}

export default CountDown
