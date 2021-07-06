import React from 'react'
import styled from 'styled-components'

interface iLegalText {
  hideHBO?: boolean
}
function LegalText({ hideHBO }: iLegalText) {
  return (
    <Container>
      ©2021 AT&T Intellectual Property. All rights reserved. AT&T and the AT&T logo are trademarks of AT&T Intellectual Property.<br/>
      { !hideHBO && 
        <span>HBO Max™ and related service marks are the property of Warner Media Direct, LLC. All rights reserved.</span>
      }
    </Container>
  )
}

export default LegalText

const Container = styled.div`
  position: absolute;
  bottom: 45px;
  left: 0;
  right: 0;
  font-size: 1rem;
  letter-spacing: 0.02em;
  opacity: 0.5;
  pointer-events: none;
  touch-action: none;
`
