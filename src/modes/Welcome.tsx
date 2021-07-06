import styled from 'styled-components'

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-45%);
  width: 90%;

  @media only screen and (max-width: 600px) {
    width: 80%;
  }
`

const DoYouHave = styled.p`
  font-family: ATTAleckCd;
  font-size: 5rem;
  letter-spacing: 0.03em;
  margin-top: -2rem;
  margin-bottom: 0;
  text-transform: uppercase;

  @media only screen and (max-width: 600px) {
    font-size: 3rem;
  }
`

const SuperFan = styled.h3`
  font-family: ATTAleckCd;
  font-size: 5rem;
  letter-spacing: 0.03em;
  font-weight: bold;
  margin: 0;
  text-transform: uppercase;

  @media only screen and (max-width: 600px) {
    font-size: 3rem;
  }
`

const Welcome = () => {
  return (
    <>
      <WelcomeContainer>
        <DoYouHave>Do You Have What It Takes To Be a</DoYouHave>
        <SuperFan>Super Fan?</SuperFan>
      </WelcomeContainer>
    </>
  )
}

export default Welcome