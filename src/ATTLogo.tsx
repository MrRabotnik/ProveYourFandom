import styled from 'styled-components'
import attImage from './media/logo-att.png'

function ATTLogo() {
  return (
    <LogoImage src={attImage}/>
  )
}

export default ATTLogo

const LogoImage = styled.img`
  position: absolute;
  bottom: 50px;
  right: 60px;
  pointer-events: none;
  touch-action: none;
`
