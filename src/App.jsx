import { useState, useEffect } from 'react'
import './App.css'
import Dartboard from './components/Dartboard'
import Sidebar from './components/Sidebar'
import Scoreboard from './components/Scoreboard'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [teamNames, setTeamNames] = useState({
    team1: 'Team Alpha',
    team2: 'Team Beta'
  })
  
  // Initial dartboard configuration matching the image - 4 layers
  const [dartboardConfig, setDartboardConfig] = useState({
    center: 1296,
    thirdRing: [216, 144, 120], // 3 segments
    secondRing: [72, 54, 48, 36, 24, 16], // 6 segments  
    outerRing: [12, 8, 6, 4, 2, 1, 0.5, -1] // 8 segments
  })

  // Point system configuration
  const [pointSystem, setPointSystem] = useState({
    outerRing: 1,
    secondRing: 3,
    thirdRing: 2,
    center: 5
  })

  // Track segment states: 0 = normal, 1 = team1 (red), 2 = team2 (yellow)
  const [segmentStates, setSegmentStates] = useState({
    outer: new Array(8).fill(0),
    second: new Array(6).fill(0),
    third: new Array(3).fill(0),
    center: 0
  })

  const [scores, setScores] = useState({
    team1: 0,
    team2: 0
  })

  const calculateScores = (states, points) => {
    let team1Score = 0
    let team2Score = 0

    // Calculate outer ring scores
    states.outer.forEach(state => {
      if (state === 1) team1Score += points.outerRing
      else if (state === 2) team2Score += points.outerRing
    })

    // Calculate second ring scores
    states.second.forEach(state => {
      if (state === 1) team1Score += points.secondRing
      else if (state === 2) team2Score += points.secondRing
    })

    // Calculate third ring scores
    states.third.forEach(state => {
      if (state === 1) team1Score += points.thirdRing
      else if (state === 2) team2Score += points.thirdRing
    })

    // Calculate center score
    if (states.center === 1) team1Score += points.center
    else if (states.center === 2) team2Score += points.center

    return { team1: team1Score, team2: team2Score }
  }

  const handleSegmentClick = (value, segmentType, index) => {
    setSegmentStates(prev => {
      let newStates = { ...prev }
      
      if (segmentType === 'center') {
        // Cycle through states: 0 -> 1 -> 2 -> 0
        newStates.center = (prev.center + 1) % 3
      } else {
        // Map segment types to state array keys
        const stateKey = segmentType === 'outer' ? 'outer' : 
                        segmentType === 'second' ? 'second' : 'third'
        
        newStates[stateKey] = [...prev[stateKey]]
        newStates[stateKey][index] = (prev[stateKey][index] + 1) % 3
      }
      
      // Recalculate scores
      const newScores = calculateScores(newStates, pointSystem)
      setScores(newScores)
      
      return newStates
    })
  }

  // Recalculate scores when point system changes
  useEffect(() => {
    const newScores = calculateScores(segmentStates, pointSystem)
    setScores(newScores)
  }, [pointSystem])

  const resetDartboard = () => {
    setSegmentStates({
      outer: new Array(8).fill(0),
      second: new Array(6).fill(0),
      third: new Array(3).fill(0),
      center: 0
    })
    setScores({ team1: 0, team2: 0 })
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="app">
      <div className="app-content">
        <div className="header-scoreboard">
          <Scoreboard 
            teamNames={teamNames} 
            scores={scores}
          />
          <button className="settings-btn" onClick={toggleSidebar}>
            ⚙️
          </button>
        </div>
        
        <div className="dartboard-container">
          <Dartboard 
            config={dartboardConfig} 
            onSegmentClick={handleSegmentClick}
            segmentStates={segmentStates}
          />
        </div>
      </div>
      
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        teamNames={teamNames}
        setTeamNames={setTeamNames}
        dartboardConfig={dartboardConfig}
        setDartboardConfig={setDartboardConfig}
        pointSystem={pointSystem}
        setPointSystem={setPointSystem}
        onResetDartboard={resetDartboard}
      />
    </div>
  )
}

export default App
