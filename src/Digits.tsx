import React from 'react'

interface IDigits {
  number: number,
}
const Digits = ({ number }: IDigits) => {


  const gStyle: React.CSSProperties = {
    overflow: 'hidden',
    textAnchor: 'middle',
    fontSize: 100,
    fontFamily: 'sans-serif',
    fill: 'none',
    stroke: 'white',
  }

  const glowStyle: React.CSSProperties = {
    filter: 'url(#glow)',
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <g transform=""
        style={gStyle}>
        <filter id="glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1 1"
            result="glow"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="glow"/>
          </feMerge>
        </filter>
        <text x="50%" y="50%" style={glowStyle}
          dominantBaseline="middle" textAnchor="middle"> {number}
        </text>
        <text className="stroke" x="50%" y="50%" style={undefined}
          dominantBaseline="middle" textAnchor="middle"> {number}
        </text>
      </g>
    </svg>
  )
}

export default Digits
