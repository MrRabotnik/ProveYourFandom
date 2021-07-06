import React from 'react'
import styled from 'styled-components'

export enum BUTTON_STATES {
  DEFAULT,
  DISABLED,
  MARKED_CORRECT,
  MARKED_WRONG,
}

interface IContainer {
  selected: boolean,
  state: BUTTON_STATES,
}

function bgColorFromState(state: BUTTON_STATES, selected: boolean) : string {
  switch (state) {
  case BUTTON_STATES.MARKED_CORRECT:
    return '#c31e96'
  default:
    return 'white'
  }
}

function opacityFromState(state: BUTTON_STATES, selected: boolean) : string {
  switch (state) {
  case BUTTON_STATES.MARKED_CORRECT:
    return '1'
  case BUTTON_STATES.DISABLED:
    return '.5'
  case BUTTON_STATES.MARKED_WRONG:
    return '.5'
  default:
    return '1'
  }
}

function colorFromState(state: BUTTON_STATES, selected: boolean) : string {
  switch (state) {
  case BUTTON_STATES.MARKED_CORRECT:
    return 'white'
  default:
    return 'black'
  }
}

function interactiveFromState(state: BUTTON_STATES) : string {
  switch(state) {
  case BUTTON_STATES.DISABLED:
  case BUTTON_STATES.MARKED_WRONG:
  case BUTTON_STATES.MARKED_CORRECT:
    return 'none'
  default:
    return 'auto'
  }
}

const Container = styled.div<IContainer>`
  background: ${({ state, selected }) => bgColorFromState(state, selected)};
  border: 10px solid ${({ selected }) => selected ? '#c31e96' : 'transparent'};
  opacity: ${({ state, selected }) => opacityFromState(state, selected)};
  border-radius: 6.25rem;
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 3rem;
  margin: .5rem auto;
  pointer-events: ${({ state }) => interactiveFromState(state)};
  touch-action: ${({ state }) => interactiveFromState(state)};
`

interface IText {
  index: number,
  selected: boolean,
  styleName: string,
  state: BUTTON_STATES,
}
const Text = styled.div<IText>`
  align-items: center;
  color: ${({ state, selected }) => colorFromState(state, selected)};
  display: flex;
  justify-content: center;
  font-family: ATTAleckCd, sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.15;
  letter-spacing: 0.075em;
  padding: 0 2em;
  text-transform: uppercase;
  z-index: 5;

  @media only screen and (max-width: 600px) {
    font-size: 1rem;
  }
`

interface IAnswerButton {
  index: number,
  action: () => void,
  actionName: string,
  text: string,
  isComplete: boolean,
  selected: boolean,
  state: BUTTON_STATES,
}

function AnswerButton ({ index, action, actionName, text, isComplete, selected, state }: IAnswerButton) {
  const [style, setStyle] = React.useState('')

  React.useEffect(() => {
    // ReturnType<typeof setTimeout> covers both a NodeJS env and browser env.
    let styleTimeout: ReturnType<typeof setTimeout>
    setStyle('')
    if (isComplete) {
      console.log('isComplete')
    }

    return () => {
      clearTimeout(styleTimeout)
    }
  }, [isComplete])

  const touchHandlers = {
    onTouchStart: (e: React.TouchEvent) : void => {
      if (state !== BUTTON_STATES.DEFAULT) return
      action()
    },
  }

  const clickHandler = () => {
    if (state !== BUTTON_STATES.DEFAULT) return
    action()
  }

  return (
    <Container
      className={'answer-button answer-button-' + (index + 1)}
      {...touchHandlers}
      onClick={clickHandler}
      data-action-name={actionName}
      selected={selected}
      state={state}
    >
      <Text index={index} styleName={style} selected={selected} state={state}> 
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </Text>
    </Container>
  )
}

export default AnswerButton
