import React from 'react'
import './Scoreboard.css'

const Scoreboard = ({ teamNames, scores }) => {
  return (
    <div className="scoreboard">
      <div className="team-score">
        <h2 className="team-name" style={{color: '#ff4757'}}>{teamNames.team1}</h2>
        <div className="score">{scores.team1}</div>
      </div>
      
      <div className="vs-divider">VS</div>
      
      <div className="team-score">
        <h2 className="team-name" style={{color: '#ffd700'}}>{teamNames.team2}</h2>
        <div className="score">{scores.team2}</div>
      </div>
    </div>
  )
}

export default Scoreboard
