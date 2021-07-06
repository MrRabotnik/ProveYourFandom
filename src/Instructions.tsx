import React from 'react'
import Button from './Button'
import styled from 'styled-components'
import QLineUrl from './media/q-line.png'
// import GoArrow from './media/icon_arrowUp.png'
import BackToSelectionButton from './BackToSelectionButton'
import { Transitionable } from './types'

const Container = styled.div<Transitionable>`
  height: 100%;
  position: relative;
  width: 100%;

  opacity: ${props => props.transitionState === 'entered' ? '1' : '0'};
  transition: opacity 150ms;

  @media only screen and (max-width: 600px) {
    text-align: center;
  }
`

const QuestionHolder = styled.div`
  width: 100%;
  padding-top: 4rem;
  justify-content: center;
  align-items: center;
  position: relative;
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

const List = styled.ol`
  font-size: 1.25rem;
  font-family: ATTAleckCd, sans-serif;
  margin-top: 3rem;
  margin-left: -16px;
  text-align: left;

  @media only screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }

  @media only screen and (max-width: 600px) {
    font-size: 2rem;
  }
`

const Item = styled.li`
  line-height: 1.15;
  padding-bottom: 1.5rem;
  text-align: start;
  
  &::marker {
    font-family: 'ATTAleckCd', sans-serif;
    font-variant-numeric: normal;
    font-weight: bolder;
    color: rgba(255,255,255,0.5);
  }
`

const GoButton = styled(Button)`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 0 25px;
  width: 12rem;
  white-space: nowrap;
  font-size: 1rem;
  height: 3.5rem;
  letter-spacing: 0.2em;
  
  @media only screen and (max-width: 600px) {
    width: 100%;
    justify-content: center;
    margin-left: 0;
  }
`

const ArtImage = styled.img`
  width: 30%;
  height: auto;
  margin-top: 3rem;

  @media only screen and (min-width: 1024px) {
    display: none;
  }

  @media only screen and (max-width: 1024px) {
    width: 35%;
  }

  @media only screen and (max-width: 800px) {
    width: 40%
  }
`

// const Arrow = styled.img`
//   display: inline;
//   vertical-align: top;
// `

const BackWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 25rem;
  width: 100%;

  @media only screen and (max-width: 1024px) {
    left: 40%;
    top: 30rem;
  }

  @media only screen and (max-width: 800px) {
    left: 45%;
    top: 33rem;
  }

  @media only screen and (max-width: 600px) {
    position: static;
    margin: 3rem 0;
  }
`

interface IInstruction extends Transitionable {
  onStart: () => void,
  onCancel: () => void,
  src: string,
}

const Instructions = ({ onStart, onCancel, transitionState, src}: IInstruction) => {
  const goClicked = () => {
    onStart()
  }

  const backClicked = () => {
    onCancel()
  }

  return (
    <Container transitionState={transitionState}>
      <QuestionHolder>
        <QuestionLabel>
          <span>{'Instructions'}</span>
          <QuestionLine/>
        </QuestionLabel>
        <List>
          <Item>A trivia or lifestyle question is presented</Item>
          <Item>Select your answer before time runs out</Item>
          <Item>See your results and share your fandom status</Item>
        </List>
      </QuestionHolder>
      <GoButton onPress={goClicked}>Let's Go</GoButton>
      <BackWrapper>
        <BackToSelectionButton onBack={backClicked} />
      </BackWrapper>
      <ArtImage src={src} />
    </Container>
  )
}

export default Instructions
