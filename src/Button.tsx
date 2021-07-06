import styled from 'styled-components'
import React, { useRef } from 'react'
import { useButton } from '@react-aria/button'
import type { AriaButtonProps } from '@react-types/button'

const BaseButton = styled.button<{isPressed: boolean}>`
  background-color: white;
  border: none;
  border-radius: 4rem;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.75);
  display: block;
  font-weight: bold;
  font-size: 1.878rem;
  font-family: ATTAleckSans,sans-serif;
  height: 6.125rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;

  transform: scale(${props => props.isPressed ? '0.95' : '1'});
  transition: transform 60ms ease;

  :disabled {
    opacity: 0.5;
  }
`

export const GradientButton = styled(Button)`
  color: white;
  background-image: linear-gradient(to right, #4173c8, #9a35ef);
`

interface IButton extends AriaButtonProps {
  className?: string,
}
function Button(props: IButton) {
  let ref = useRef<HTMLButtonElement | null>(null)
  let {buttonProps, isPressed} = useButton(props, ref)
  let {children} = props

  return (
    <BaseButton
      ref={ref}
      className={props.className}
      {...buttonProps}
      isPressed={isPressed} >
      {children}
    </BaseButton>
  )
}

export default Button
