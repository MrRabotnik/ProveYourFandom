import React from 'react'
import styled from 'styled-components'
import logoImage from './media/logo-hbomax.png'

interface ILogo {
  columnStart?: boolean,
}

function HBOMaxLogo({ columnStart }: ILogo) {
  return (
    <LogoImage src={logoImage}/>
  )
}

export default HBOMaxLogo

const LogoImage = styled.img<{ columnStart?: boolean}>`
  padding-top: 3rem;
  width: ${props => props.columnStart ? '40%' : 'auto'};

  @media only screen and (max-width: 600px) {
    font-size: 1.5rem;
    width: 10rem;
  }
`
