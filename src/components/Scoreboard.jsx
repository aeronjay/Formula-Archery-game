import React from 'react'
import './Scoreboard.css'

const Scoreboard = ({ teamNames }) => {
  // Placeholder scores
  const team1Score = 2450
  const team2Score = 1890

  return (
    <div className="scoreboard">
      <div className="team-score">
        <h2 className="team-name">{teamNames.team1}</h2>
        <div className="score">{team1Score}</div>
      </div>
      
      <div className="vs-divider">VS</div>
      
      <div className="team-score">
        <h2 className="team-name">{teamNames.team2}</h2>
        <div className="score">{team2Score}</div>
      </div>
    </div>
  )
}

export default Scoreboard
