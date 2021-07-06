import React from 'react'
import styled, { keyframes } from 'styled-components'
import { SELECTION_DELAY_MS } from './constants/timing'
import { elasticEasing } from './Animations'

const Container = styled.div<{fadeOut: boolean}>`
  height: 100%;
  width: 30%;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  opacity: ${props => props.fadeOut ? '0' : '1'};
  transition: opacity ${SELECTION_DELAY_MS}ms ease-out;
`

// const TitleArea = styled.div`
//   width: 100%;
//   height: 26%;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
// `

// const Title = styled.h3<{selected: boolean}>`
//   color: white;
//   font-family: ATTAleckCD;
//   font-weight: bold;
//   letter-spacing: 0.15em;
//   line-height: 1.2;
//   margin: 3.4rem 3.2rem;
//   text-transform: uppercase;
//   text-shadow: ${props => props.selected ? '0 0 35px rgb(255 255 255 / 60%)' : 'none'};
// `

const animation = keyframes`
  0% { transform: scale(0.5); opacity: 0; }
  5% { transform: scale(1); opacity: 1; }
  93% { transform: scale(1); opacity: 1; }
  98% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(0.5); opacity: 0; }
`
const PosterWrapper = styled.div<{index: number, isAnimating: boolean}>`
  animation-name: ${props => props.isAnimating ? animation : 'none'};
  animation-duration: 15s;
  animation-delay: ${props => props.index * 200}ms;
  animation-fill-mode: both;
  animation-timing-function: ${elasticEasing};
  animation-iteration-count: infinite;
`

const Poster = styled.div<{selected: boolean, completed: boolean}>`
  height: 100%;
  width: 80%;
  margin: auto;
  border-radius: 5px;
  pointer-events: ${props => props.completed ? 'none' : 'auto'};
  border: ${props => getPosterBorder(props.selected, props.completed)};
  box-shadow: ${props => getPosterShadow(props.selected, props.completed)};
  transition: all ${SELECTION_DELAY_MS / 2}ms ease;
  line-height: 1;
`
const getPosterBorder = (selected: boolean, completed: boolean) => {
  if (completed) {
    if (selected) {
      return '2px solid #c31e96'
    } else {
      return '2px solid transparent'
    }
  } else {
    return '2px solid white'
  }
}
const getPosterShadow = (selected: boolean, completed: boolean) => {
  if (completed) {
    if (selected) {
      return '0 0 50px 20px hsl(316 76% 66% / 50%)'
    } else {
      return 'none'
    }
  } else {
    return '0 0 35px 5px rgb(255 255 255 / 46%)'
  }
}

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
`

// const Line = styled.div`
//   height: 5px;
//   width: 16rem;
//   margin-top: 0.9rem;
//   background-color: #9a35ef;
// `

interface IContentChoice {
  index: number,
  coverArt: string,
  selected: boolean,
  completed: boolean,
  title: string,
  onClick: React.UIEventHandler,
}
const ContentChoice = ({ index, coverArt, title, selected, completed, onClick }: IContentChoice) =>  {
  const shouldFadeOut = completed && !selected
  return (
    <Container fadeOut={shouldFadeOut}>
      {/* <TitleArea>
        <Title selected={selected}>{title}</Title>
      </TitleArea> */}
      <PosterWrapper index={index} isAnimating={!completed}>
        <Poster
          selected={selected}
          completed={completed}
          onClick={onClick} data-content-name={title}
        >
          <PosterImage src={coverArt} />
        </Poster>
      </PosterWrapper>
      {/* <Line /> */}
    </Container>
  )
}

export default ContentChoice
