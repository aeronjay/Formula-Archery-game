import React from 'react'
import './Dartboard.css'

const Dartboard = ({ config, onSegmentClick, segmentStates }) => {
  const { center, thirdRing, secondRing, outerRing } = config

  const handleSegmentClick = (value, segmentType, index) => {
    if (onSegmentClick) {
      onSegmentClick(value, segmentType, index)
    }
  }

  const getSegmentFill = (segmentType, index) => {
    let state = 0
    
    if (segmentType === 'center') {
      state = segmentStates.center
    } else if (segmentType === 'outer') {
      state = segmentStates.outer[index]
    } else if (segmentType === 'second') {
      state = segmentStates.second[index]
    } else if (segmentType === 'third') {
      state = segmentStates.third[index]
    }
    
    if (state === 1) return '#ff4757' // Team 1 - Red
    if (state === 2) return '#ffd700' // Team 2 - Yellow
    
    // Default colors
    if (segmentType === 'outer') return '#2a2a4a'
    if (segmentType === 'second') return '#3a3a5a'
    if (segmentType === 'third') return '#4a5cff'
    if (segmentType === 'center') return '#ff4757'
    
    return '#2a2a4a'
  }

  // Calculate positions for outer ring segments (8 segments)
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

  // Calculate positions for second ring segments (6 segments)
  const secondSegments = secondRing.map((value, index) => {
    const angle = (360 / secondRing.length) * index - 90 // Start from top
    const nextAngle = (360 / secondRing.length) * (index + 1) - 90
    
    return {
      value,
      angle,
      nextAngle,
      id: `second-${index}`
    }
  })

  // Calculate positions for third ring segments (3 segments)
  const thirdSegments = thirdRing.map((value, index) => {
    const angle = (360 / thirdRing.length) * index - 90 // Start from top
    const nextAngle = (360 / thirdRing.length) * (index + 1) - 90
    
    return {
      value,
      angle,
      nextAngle,
      id: `third-${index}`
    }  })

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
      <svg width="600" height="600" viewBox="0 0 600 600">        {/* Outer ring segments (8 segments) */}
        {outerSegments.map((segment, index) => {
          const midAngle = (segment.angle + segment.nextAngle) / 2
          const textPos = getTextPosition(255, midAngle)
          
          return (
            <g key={segment.id}>
              <path
                d={createSegmentPath(210, 300, segment.angle, segment.nextAngle)}
                className="outer-segment clickable-segment"
                fill={getSegmentFill('outer', index)}
                stroke="#1a1a2e"
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSegmentClick(segment.value, 'outer', index)}
              />
              <text
                x={textPos.x}
                y={textPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="segment-text"
                fill="white"
                fontSize="18"
                fontWeight="bold"
                style={{ pointerEvents: 'none' }}
              >
                {segment.value}
              </text>
            </g>
          )
        })}          {/* Second ring segments (6 segments) */}
        {secondSegments.map((segment, index) => {
          const midAngle = (segment.angle + segment.nextAngle) / 2
          const textPos = getTextPosition(165, midAngle)
          
          return (
            <g key={segment.id}>
              <path
                d={createSegmentPath(120, 210, segment.angle, segment.nextAngle)}
                className="second-segment clickable-segment"
                fill={getSegmentFill('second', index)}
                stroke="#2a2a4a"
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSegmentClick(segment.value, 'second', index)}
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
                style={{ pointerEvents: 'none' }}
              >
                {segment.value}
              </text>
            </g>
          )
        })}        {/* Third ring segments (3 segments) */}
        {thirdSegments.map((segment, index) => {
          const midAngle = (segment.angle + segment.nextAngle) / 2
          const textPos = getTextPosition(90, midAngle)
          
          return (
            <g key={segment.id}>
              <path
                d={createSegmentPath(60, 120, segment.angle, segment.nextAngle)}
                className="third-segment clickable-segment"
                fill={getSegmentFill('third', index)}
                stroke="#2a3fff"
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSegmentClick(segment.value, 'third', index)}
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
                style={{ pointerEvents: 'none' }}
              >
                {segment.value}
              </text>
            </g>
          )
        })}          {/* Center circle (bullseye) */}
        <circle
          cx="300"
          cy="300"
          r="60"
          fill={getSegmentFill('center', 0)}
          stroke="#ff3838"
          strokeWidth="3"
          className="center-circle clickable-segment"
          style={{ cursor: 'pointer' }}
          onClick={() => handleSegmentClick(center, 'center', 0)}
        />
        <text
          x="300"
          y="300"
          textAnchor="middle"
          dominantBaseline="middle"
          className="center-text"
          fill="white"
          fontSize="28"
          fontWeight="bold"
          style={{ pointerEvents: 'none' }}
        >
          {center}
        </text>
      </svg>
    </div>
  )
}

export default Dartboard
