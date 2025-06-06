import { useState, useEffect } from 'react'
import './App.css'
import Dartboard from './components/Dartboard'
import Sidebar from './components/Sidebar'
import Scoreboard from './components/Scoreboard'

function App() {
  // Default values
  const defaultTeamNames = {
    team1: 'Team Alpha',
    team2: 'Team Beta'
  }
  
  const defaultDartboardConfig = {
    center: 1296,
    thirdRing: [216, 144, 120], // 3 segments
    secondRing: [72, 54, 48, 36, 24, 16], // 6 segments  
    outerRing: [12, 8, 6, 4, 2, 1, 0.5, -1] // 8 segments
  }

  const defaultPointSystem = {
    outerRing: 1,
    secondRing: 3,
    thirdRing: 2,
    center: 5
  }

  const defaultSegmentStates = {
    outer: new Array(8).fill(0),
    second: new Array(6).fill(0),
    third: new Array(3).fill(0),
    center: 0
  }

  const defaultScores = {
    team1: 0,
    team2: 0
  }

  // Load saved data from localStorage or use defaults
  const loadFromStorage = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : defaultValue
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
      return defaultValue
    }
  }

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [teamNames, setTeamNames] = useState(() => 
    loadFromStorage('archery-team-names', defaultTeamNames)
  )
  
  const [dartboardConfig, setDartboardConfig] = useState(() => 
    loadFromStorage('archery-dartboard-config', defaultDartboardConfig)
  )

  const [pointSystem, setPointSystem] = useState(() => 
    loadFromStorage('archery-point-system', defaultPointSystem)
  )

  const [segmentStates, setSegmentStates] = useState(() => 
    loadFromStorage('archery-segment-states', defaultSegmentStates)
  )

  const [scores, setScores] = useState(() => 
    loadFromStorage('archery-scores', defaultScores)
  )

  // Save data to localStorage
  const saveToStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }

  // Auto-save data when state changes
  useEffect(() => {
    saveToStorage('archery-team-names', teamNames)
  }, [teamNames])

  useEffect(() => {
    saveToStorage('archery-dartboard-config', dartboardConfig)
  }, [dartboardConfig])

  useEffect(() => {
    saveToStorage('archery-point-system', pointSystem)
  }, [pointSystem])

  useEffect(() => {
    saveToStorage('archery-segment-states', segmentStates)
  }, [segmentStates])

  useEffect(() => {
    saveToStorage('archery-scores', scores)
  }, [scores])

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
    // Save current game state to localStorage with timestamp
    const gameBackup = {
      timestamp: new Date().toISOString(),
      teamNames,
      dartboardConfig,
      pointSystem,
      segmentStates,
      scores
    }
    
    // Save to a special backup key
    saveToStorage('archery-last-game-backup', gameBackup)
    
    // Also save to a history of games (keep last 5 games)
    const gameHistory = loadFromStorage('archery-game-history', [])
    gameHistory.unshift(gameBackup)
    if (gameHistory.length > 5) {
      gameHistory.pop()
    }
    saveToStorage('archery-game-history', gameHistory)
    
    // Reset to defaults
    setSegmentStates(defaultSegmentStates)
    setScores(defaultScores)
    
    console.log('Game data saved to backup before reset')
  }

  // Function to restore last game backup
  const restoreLastGame = () => {
    const backup = loadFromStorage('archery-last-game-backup', null)
    if (backup) {
      setTeamNames(backup.teamNames)
      setDartboardConfig(backup.dartboardConfig)
      setPointSystem(backup.pointSystem)
      setSegmentStates(backup.segmentStates)
      setScores(backup.scores)
      console.log('Last game restored from backup')
    } else {
      console.log('No backup found')
    }
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
        onRestoreLastGame={restoreLastGame}
      />
    </div>
  )
}

export default App
