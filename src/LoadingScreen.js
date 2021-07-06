import React from 'react'
import styled, { keyframes } from 'styled-components'

const COLORS = ['#beebfe', '#0ba4dd']
const STROKE_WIDTH = 3

export const Loader = ({ isLoading }) => {
  return (
    <Screen isLoading={isLoading}>
      <Progress>
        <svg
          className="spinner"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient
              id="gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={COLORS[0]} />
              <stop offset="50%" stopColor={COLORS[1]} />
              <stop offset="100%" stopColor={COLORS[2]} />
            </linearGradient>
            <filter
              id="glow"
              filterUnits="userSpaceOnUse"
              x="-20"
              y="-20"
              width="140"
              height="140"
            >
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feOffset in="blur" dx="0" dy="0" result="offset" />
              <feMerge>
                <feMergeNode in="offset" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="url(#gradient)"
            strokeWidth={STROKE_WIDTH}
            fill="none"
            transform="rotate(90 50 50)"
            filter="url(#glow)"
          />
        </svg>
      </Progress>
    </Screen>
  )
}

const Screen = styled.div`
    position: absolute;
    z-index: 200;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: ${props => (props.isLoading ? 0 : 1)};
    visibility: ${props => (props.isLoading ? 'hidden' : 'show')};
    transition: 1s opacity, 1s visibility;
    pointer-events: none;
`

// Loader styles and anims are shamelessly stolen from
// https://jsfiddle.net/sojzu8a5/1/
const spin = keyframes`
    0%   {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const Progress = styled.div`
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 272px;
    height: 272px;
    transform: translate(-50%, -50%);

    & svg.spinner {
        animation: ${spin} 2s linear infinite;
    }
`
