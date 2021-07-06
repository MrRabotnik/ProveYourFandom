import React, { useContext } from 'react'
import styled from 'styled-components'
import Header from './Header'
import Sparkles from './media/stars.png'
import bgImage from './media/hbomax-bg.png'
import BaseButton from './Button'
import { elasticEasing, slideIn } from './Animations'
import {
  TEXT_ENTRY_DURATION,
} from './constants/timing'
import { Transition } from 'react-transition-group'
import { AWARD_IMGS } from './constants/awards'
import { Context, ScoreContext } from './contexts/ScoreContext'
import HBOMaxLogo2 from './HBOmaxLogo2'

const DOWNLOAD_LABEL = 'Download Badge'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  background: #170930;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  height: 100%;
  margin: auto;
  padding: 0 5%;
  box-sizing: border-box;

  @media only screen and (max-width: 1200px) {
    width: 50%;
    padding: 0 5rem;
  }

  @media only screen and (max-width: 800px) {
    padding: 0;
  }

  @media only screen and (max-width: 600px) {
    width: 90%;
    padding: 0 5rem;
  }

  @media only screen and (max-width: 400px) {
    padding: 0 1rem;
  }
`
const YourBadgeContainer = styled.div`
  background-image: url(${ bgImage });
  background-size: cover;
  margin: 2rem auto;
  width: 90%;
`

const YourBadge = styled.div`
  background-image: url(${Sparkles});
  background-size: 150% 150%;
  background-position: center;
  position: relative;
`

const Award = styled.img<{ transitionState: string }>`
  align-content: center;
  display: flex;
  font-size: 100px;
  height: auto;
  justify-content: center;
  width: 55%;
  margin: auto;

  opacity: ${props => props.transitionState === 'entered' ? '1' : '0'};
  transform: ${props => props.transitionState === 'entered' ? 'scale(1)' : 'scale(0.1)'};
  transition: opacity 300ms, transform 600ms ${elasticEasing};

  @media only screen and (min-width: 1200px) {
    width: 50%;
  }

  @media only screen and (max-width: 800px) {
    width: 50%;
  }

  @media only screen and (max-width: 600px) {
    width: 80%;
  }
`

const ShowOff = styled.h4`
  font-family: ATTAleckCd;
  font-size: 1.8rem;
  letter-spacing: 0.03em;
  font-weight: bold;
  margin: 0;
  text-transform: uppercase;

  @media only screen and (max-width: 1200px) {
    font-size: 1.5rem;
  }

  @media only screen and (max-width: 600px) {
    font-size: 1.2rem;
  }
`

const ShareResult = styled.p`
  font-family: ATTAleckCd;
  font-size: 1.6rem;
  letter-spacing: 0.03em;
  margin: 0;
  text-transform: uppercase;

  @media only screen and (max-width: 1200px) {
    font-size: 1.3rem;
  }

  @media only screen and (max-width: 600px) {
    font-size: 1rem;
  }
`
const Hashtags = styled.h3`
  font-family: ATTAleckCd;
  font-size: 1.6rem;
  font-weight: bold;
  letter-spacing: 0.03em;
  margin: 2rem 0;
  text-transform: uppercase;
  color: #C01D94;

  @media only screen and (max-width: 1200px) {
    font-size: 1.5rem;
  }

  @media only screen and (max-width: 600px) {
    margin: 1rem 0;
    font-size: 1.2rem;
  }
`
const Buttons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Button = styled(BaseButton)`
  line-height: 1;
  margin: 0 1rem;
  width: 90%;
  animation-name: ${slideIn};
  animation-duration: ${TEXT_ENTRY_DURATION}ms;
  animation-delay: 1.6s;
  animation-fill-mode: both;
  animation-timing-function: ease-out;
  letter-spacing: .2rem;
`
const DownloadButton = styled(Button)`
  font-size: 1.2rem;
  height: 2rem;
  height: auto;
  padding: 1rem 0;
`

const Share = () => {
  const { fanLevel } = useContext(ScoreContext) as Context

  return (
    <>
      <Container>
        <Header title={'Prove your fandom'} isSecondary={false} columnStart={false} />
        <Content>
          <YourBadgeContainer>
            <YourBadge>
              <Transition
                timeout={300}
                in={true}
                appear
                unmountOnExit
              >
                {(state) => {
                  return <Award transitionState={state} src={AWARD_IMGS.get(fanLevel)} alt={''} />
                }}
              </Transition>
              <HBOMaxLogo2 />
            </YourBadge>
          </YourBadgeContainer>
          <ShowOff>Show Off Your Skills</ShowOff>
          <ShareResult>Share Your Results with your fans and lorem ipsum dolor sit amet</ShareResult>
          <Hashtags>
            #ATTEXP #ChampaignHashtag
          </Hashtags>
          <Buttons>
            <a href={AWARD_IMGS.get(fanLevel)} download={AWARD_IMGS.get(fanLevel)} style={{ textDecoration: 'none', width: '100%' }}>
              <DownloadButton
                type={'button'}
                data-action-name={DOWNLOAD_LABEL}>{DOWNLOAD_LABEL}</DownloadButton>
            </a>
          </Buttons>
        </Content>
      </Container>
    </>
  )
}

export default Share