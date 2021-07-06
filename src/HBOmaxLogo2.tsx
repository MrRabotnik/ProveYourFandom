import React from 'react'
import styled from 'styled-components'
import logoImage from './media/logo-hbomax.png'

function HBOMaxLogo2() {
  return (
    <LogoImage src={logoImage}/>
  )
}

export default HBOMaxLogo2

const LogoImage = styled.img`
  position: absolute;
  right: 5%;
  bottom: 5%;
  width: 20%;
`
