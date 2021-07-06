import { keyframes, css } from 'styled-components'

export const slideIn = keyframes`
 0% { opacity: 0; transform: translate(-100px); }
 100% { opacity: 1; transform: translate(0); }
`

export const slideOut = keyframes`
 0% { opacity: 1; transform: translate(0); }
 100% { opacity: 0; transform: translate(100px); }
`

export const scaleUp = keyframes`
 0% { opacity: 0; transform: scale(0.5); }
 100% { opacity: 1; transform: scale(1); }
`

export const pulse = keyframes`
  0% { transform: scale(1, 1); }
  50% { transform: scale(1.1, 1.1); }
  100% { transform: scale(1, 1); }
`

export const elasticEasing = css`cubic-bezier(0.175, 0.885, 0.320, 1.275); /* easeOutBack */`

export const inOutEasing = css`cubic-bezier(0.770, 0.000, 0.175, 1.000); /* easeInOutQuart */`
