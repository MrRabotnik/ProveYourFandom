import React from 'react'
import styled from 'styled-components'
import HBOMaxLogo from './HBOmaxLogo'

interface iHeader {
  title: string,
  isSecondary?: boolean,
  columnStart?: boolean,
}

const Header = ({ title, isSecondary, columnStart }: iHeader) => {
  return (
    <Container isSecondary={isSecondary}>
      <HBOMaxLogo columnStart={columnStart}/>
      <HeaderText isSecondary={isSecondary}>
        {title}
      </HeaderText>
    </Container>
  )
}

export default Header

const Container = styled.div<{ isSecondary?: boolean, columnStart?: boolean}>`
  width: 100%;
  display: flex;
  flex-direction: ${props => props.isSecondary ? 'row' : 'column'};
  justify-content: ${props => props.isSecondary ? 'flex-start' : 'center'};
  justify-content: ${props => props.columnStart ? 'flex-start' : 'center'};
  align-items: ${props => props.isSecondary ? 'flex-start' : 'center'};
  align-items: ${props => props.columnStart ? 'flex-start' : 'center'};

  @media only screen and (max-width: 600px) {
    width: 80%;
    margin: 0 auto;
  }
`
// position: absolute;
// top: ${ props => props.isSecondary ? '4rem' : '0' };
// left: ${ props => props.isSecondary ? '36%' : '0' };

const HeaderText = styled.div<{isSecondary?: boolean}>`
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  margin-top: ${props => props.isSecondary ? '1.2rem' : '1rem'};
  margin-left: ${props => props.isSecondary ? '2.5rem' : '0'};
  text-shadow: 0 0 10px rgb(255 255 255 / 46%);

  @media only screen and (max-width: 600px) {
    font-size: 1.6rem;
  }
`