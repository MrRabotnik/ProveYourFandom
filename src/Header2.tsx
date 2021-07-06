import React from 'react'
import styled from 'styled-components'
import HBOMaxLogo from './HBOmaxLogo'

interface iHeader {
  title: string,
  columnStart?: boolean,
}
const Header2 = ({ title, columnStart }: iHeader) => {
  return (
    <Container>
      <HBOMaxLogo columnStart={columnStart}/>
      <HeaderText >
        {title}
      </HeaderText>
    </Container>
  )
}

export default Header2

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`
// position: absolute;
// top: ${ props => props.columnStart ? '4rem' : '0' };
// left: ${ props => props.columnStart ? '36%' : '0' };

const HeaderText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  margin-top: 1.2rem;
  text-shadow: 0 0 10px rgb(255 255 255 / 46%);
`