import { useState } from 'react'
import styled from 'styled-components'
import { useIdleTimer } from 'react-idle-timer'
import { Transition } from 'react-transition-group'

import Attract from './Attract'
import MainGame from './Challenge'
import bgImage from './media/hbomax-bg.png'
import { APP_TRANSITION_MS } from './constants/timing'
import { ChallengeContent, Transitionable } from './types'

const USE_MENU: boolean = (window as any).CONFIG.USE_MENU

export const MODES: {[key: string]: string} = {
  ATTRACT: 'Attract/CTA',
  GAME: 'Main Game',
}

export type setMode = (mode: string) => void

interface iApp {
  content: ChallengeContent[],
}
function App({ content }: iApp) {
  const defaultMode = USE_MENU ? MODES.ATTRACT : MODES.GAME
  const [mode, setMode] = useState<string>(defaultMode)
  const [isIdle, setIsIdle] = useState<boolean>(false)

  const onIdle = () => {
    console.log('IDLE!')
    setMode(defaultMode)
    if (!USE_MENU) {
      setIsIdle(true)
    }
  }

  const onActive = () => {
    setIsIdle(false)
    console.log('ACTIVE!')
  }

  useIdleTimer({
    timeout: (window as any).CONFIG.IDLE_TIMEOUT_S * 1000,
    onIdle: onIdle,
    onActive: onActive,
    debounce: 200,
    // element: appRef.current, // TODO: get this to work on apps independently
  })

  return (
    <AppContainer>
      <div>
        <Transition in={mode === MODES.ATTRACT} timeout={APP_TRANSITION_MS} appear mountOnEnter unmountOnExit>
          { state =>
            <TransitionContainer transitionState={state}>
              <Attract setMode={setMode} />
            </TransitionContainer>
          }
        </Transition>
        <Transition in={mode === MODES.GAME} timeout={APP_TRANSITION_MS} appear mountOnEnter unmountOnExit>
          { state =>
            <TransitionContainer transitionState={state}>
              <MainGame isIdle={isIdle} content={content} />
            </TransitionContainer>
          }
        </Transition>
      </div>
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-image: url(${bgImage});
  background-size: cover;

  > div {
    width: 100%;
    height: 100%;
    position: relative;
  }
`

interface ITransitonContainer extends Transitionable { delay?: number }
const TransitionContainer = styled.div<ITransitonContainer>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: ${props => props.transitionState === 'entered' ? 'auto' : 'none'};
  opacity: ${props => props.transitionState === 'entered' ? '1' : '0'};
  transition: opacity ${APP_TRANSITION_MS}ms ease;
  transition-delay: ${props => (props.delay && props.transitionState.includes('enter')) ? props.delay + 'ms' : '0ms'};
`

