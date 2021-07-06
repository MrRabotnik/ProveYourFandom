import React from 'react'
import styled from 'styled-components'
import iconImage from './media/button-arrow-left.png'

interface IBackToSelectionButton {
  onBack: () => void,
}

const BackToSelectionButton = ({ onBack }: IBackToSelectionButton) => {
  const onClick = (e: React.MouseEvent) => {
    onBack()
  }

  return (
    <Container>
      <Icon onClick={onClick}/>
      <Text>Select A Different Title</Text>
    </Container>
  )
}

export default BackToSelectionButton

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Icon = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.75);
  background: transparent url(${iconImage}) no-repeat center;
  background-size: cover;
  border: none;

  @media only screen and (max-width: 800px) {
    width: 30px;
    height: 30px;
  }

  @media only screen and (max-width: 600px) {
    width: 50px;
    height: 50px;
    flex-shrink: 0;
  }
`

const Text = styled.div`
  font-size: 1.2rem;
  text-shadow: 0 0 15px rgb(255 255 255 / 50%);
  padding: 15px 30px;
  letter-spacing: 0.1em;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  text-align: left;

  @media only screen and (max-width: 1024px) {
    font-size: .8rem;
    padding: 15px 20px;
  }

  @media only screen and (max-width: 800px) {
    font-size: .6rem;
    padding: 15px 10px;
  }

  @media only screen and (max-width: 600px) {
    font-size: 1.2rem;
    padding: 15px 15px;
  }
`
