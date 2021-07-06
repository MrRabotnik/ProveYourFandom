import React, { useContext, useEffect, useState } from 'react'
import { elasticEasing, slideIn } from '../Animations'
import {
  PAGE_TRANSITION_SPEED_MS,
  TEXT_ENTRY_DURATION,
  CONGRATS_DURATION_S,
} from '../constants/timing'
import { Context, ScoreContext } from '../contexts/ScoreContext'
import styled from 'styled-components'
import BaseButton from '../Button'
import { Transition } from 'react-transition-group'
import { AWARD_IMGS } from '../constants/awards'
import Sparkles from '../media/stars.png'
import Header from '../Header'
import { Transitionable } from '../types'
import Share from '../Share'

const NEXT_LABEL = 'Next'
const SHARE_LABEL = 'Share'

const Container = styled.div<Transitionable>`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  opacity: ${props => props.transitionState === 'entered' ? '1' : '0'};
  transition: opacity ${PAGE_TRANSITION_SPEED_MS}ms;
`

const Congratulations = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-45%);
  width: 88%;
`

const NiceWork = styled.h3`
  font-family: ATTAleckCd;
  font-size: 5rem;
  font-weight: bold;
  letter-spacing: 0.03em;
  margin-top: -2rem;
  margin-bottom: 0;
  text-transform: uppercase;

  @media only screen and (max-width: 600px) {
    font-size: 3rem;
  }
`

const LetsSee = styled.p`
  font-family: ATTAleckCd;
  font-size: 5rem;
  letter-spacing: 0.03em;
  margin: 0;
  text-transform: uppercase;

  @media only screen and (max-width: 600px) {
    font-size: 3rem;
  }
`

const SparkleLayer = styled.div`
  background-image: url(${Sparkles});
  background-size: 100% auto;
  bottom: 0;
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
`

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Award = styled.img<{transitionState: string}>`
  align-content: center;
  display: flex;
  font-size: 100px;
  height: auto;
  justify-content: center;
  width: 35%;

  opacity: ${props => props.transitionState === 'entered' ? '1' : '0'};
  transform: ${props => props.transitionState === 'entered' ? 'scale(1)' : 'scale(0.1)'};
  transition: opacity 300ms, transform 600ms ${elasticEasing};

  @media only screen and (min-width: 1200px) {
    width: 30%;
  }

  @media only screen and (max-width: 800px) {
    width: 50%;
  }

  @media only screen and (max-width: 600px) {
    width: 65%;
  }

  @media only screen and (max-width: 400px) {
    width: 80%;
  }
`

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 3rem;

  @media only screen and (max-width: 600px) {
    margin-top: 0;
  }

  @media only screen and (min-width: 1200px) {
    margin-top: 0;
  }
`

const Button = styled(BaseButton)`
  line-height: 1;
  margin: 0 1rem;
  width: 20%;
  animation-name: ${slideIn};
  animation-duration: ${TEXT_ENTRY_DURATION}ms;
  animation-delay: 1.6s;
  animation-fill-mode: both;
  animation-timing-function: ease-out;

  @media only screen and (max-width: 600px) {
    width: 42%;
    margin: 0 0.7rem;
  }

  @media only screen and (min-width: 1500px) {
    width: 10%;
  }
`

const ShareNextButton = styled(Button)`
  font-size: 1rem;
  height: 2rem;
  height: auto;
  padding: 1rem 0;
  letter-spacing: .1em
`

interface IComplete extends Transitionable {
  onFinish: () => void,
}

function Complete ({ onFinish, transitionState }: IComplete) {
  const [showCongrats, setShowCongrats] = useState(true)
  const [showShare, setShowShare] = useState(false)
  const { fanLevel } = useContext(ScoreContext) as Context


  useEffect(() => {
    console.log('Unimplemented: Tracking anayltucs app event', 'COMPLETE')
  }, [])

  useEffect(() => {
    const gratsTimeout = setTimeout(() => {
      setShowCongrats(false)
    }, CONGRATS_DURATION_S * 1000)
    return () => {
      clearTimeout(gratsTimeout)
    }
  }, [])

  const nextTouchHandlers = {
    onTouchStart: () => {
      onFinish()
    },
  }

  const shareTouchHandlers = {
    onTouchStart: () => {
      alert()
    },
  }

  const showShareFn = () => {
    setShowShare(true)
  }


  return (
    <Container className="screen" transitionState={transitionState}>
      <Header title={'Prove your fandom'} isSecondary={false} columnStart={false} />
      {showShare && 
        <Share />
      }
      {showCongrats && 
        <Congratulations>
          <NiceWork>Nice work!</NiceWork>
          <LetsSee>Let's see how you did</LetsSee>
        </Congratulations>}
      {!showCongrats &&
        <Content>
          <SparkleLayer/>
          <Transition
            timeout={300}
            in={true}
            appear
            unmountOnExit
          >
            {(state) => {
              return <Award transitionState={state} src={AWARD_IMGS.get(fanLevel)} alt={''}/>
            }}
          </Transition>
          <Buttons>
            <ShareNextButton {...shareTouchHandlers}
              type={'button'}
              onPress={showShareFn}
              data-action-name={SHARE_LABEL}>{SHARE_LABEL}</ShareNextButton>
            <ShareNextButton {...nextTouchHandlers}
              type={'button'}
              onPress={onFinish}
              data-action-name={NEXT_LABEL}>{NEXT_LABEL}</ShareNextButton>
          </Buttons>
        </Content>
      }
    </Container>
  )
}

export default Complete
