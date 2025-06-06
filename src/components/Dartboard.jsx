import React from 'react'
import './Dartboard.css'

const Dartboard = ({ config }) => {
  const { center, innerRing, outerRing } = config

  // Calculate positions for outer ring segments (13 segments)
  const outerSegments = outerRing.map((value, index) => {
    const angle = (360 / outerRing.length) * index - 90 // Start from top
    const nextAngle = (360 / outerRing.length) * (index + 1) - 90
    
    return {
      value,
      angle,
      nextAngle,
      id: `outer-${index}`
    }
  })

  // Calculate positions for inner ring segments (4 segments)
  const innerSegments = innerRing.map((value, index) => {
    const angle = (360 / innerRing.length) * index - 90 // Start from top
    const nextAngle = (360 / innerRing.length) * (index + 1) - 90
    
    return {
      value,
      angle,
      nextAngle,
      id: `inner-${index}`
    }
  })
  const createSegmentPath = (innerRadius, outerRadius, startAngle, endAngle) => {
    const startAngleRad = (startAngle * Math.PI) / 180
    const endAngleRad = (endAngle * Math.PI) / 180
    
    const x1 = 300 + innerRadius * Math.cos(startAngleRad)
    const y1 = 300 + innerRadius * Math.sin(startAngleRad)
    const x2 = 300 + outerRadius * Math.cos(startAngleRad)
    const y2 = 300 + outerRadius * Math.sin(startAngleRad)
    
    const x3 = 300 + outerRadius * Math.cos(endAngleRad)
    const y3 = 300 + outerRadius * Math.sin(endAngleRad)
    const x4 = 300 + innerRadius * Math.cos(endAngleRad)
    const y4 = 300 + innerRadius * Math.sin(endAngleRad)
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
    
    return [
      `M ${x1} ${y1}`,
      `L ${x2} ${y2}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x3} ${y3}`,
      `L ${x4} ${y4}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1}`,
      'Z'
    ].join(' ')
  }

  const getTextPosition = (radius, angle) => {
    const angleRad = (angle * Math.PI) / 180
    return {
      x: 300 + radius * Math.cos(angleRad),
      y: 300 + radius * Math.sin(angleRad)
    }
  }
  return (
    <div className="dartboard">
      <svg width="600" height="600" viewBox="0 0 600 600">
        {/* Outer ring segments */}
        {outerSegments.map((segment) => {
          const midAngle = (segment.angle + segment.nextAngle) / 2
          const textPos = getTextPosition(255, midAngle)
          
          return (
            <g key={segment.id}>
              <path
                d={createSegmentPath(180, 300, segment.angle, segment.nextAngle)}
                className="outer-segment"
                fill="#2a2a4a"
                stroke="#1a1a2e"
                strokeWidth="2"
              />
              <text
                x={textPos.x}
                y={textPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="segment-text"
                fill="white"
                fontSize="20"
                fontWeight="bold"
              >
                {segment.value}
              </text>
            </g>
          )
        })}
        
        {/* Inner ring segments */}
        {innerSegments.map((segment) => {
          const midAngle = (segment.angle + segment.nextAngle) / 2
          const textPos = getTextPosition(128, midAngle)
          
          return (
            <g key={segment.id}>
              <path
                d={createSegmentPath(75, 180, segment.angle, segment.nextAngle)}
                className="inner-segment"
                fill="#4a5cff"
                stroke="#2a3fff"
                strokeWidth="2"
              />
              <text
                x={textPos.x}
                y={textPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="segment-text"
                fill="white"
                fontSize="22"
                fontWeight="bold"
              >
                {segment.value}
              </text>
            </g>
          )
        })}
        
        {/* Center circle (bullseye) */}
        <circle
          cx="300"
          cy="300"
          r="75"
          fill="#ff4757"
          stroke="#ff3838"
          strokeWidth="3"
          className="center-circle"
        />
        <text
          x="300"
          y="300"
          textAnchor="middle"
          dominantBaseline="middle"
          className="center-text"
          fill="white"
          fontSize="32"
          fontWeight="bold"
        >
          {center}
        </text>
      </svg>
    </div>
  )
}

export default Dartboard
