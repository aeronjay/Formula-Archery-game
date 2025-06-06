import { useState } from 'react'
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
  
  // Initial dartboard configuration matching the image
  const [dartboardConfig, setDartboardConfig] = useState({
    center: 1296,
    innerRing: [216, 144, 120, 36],
    outerRing: [1, 8, 54, 72, 2, 48, 4, -1, 0.5, 6, 24, 16, 12]
  })

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="app">
      <div className="app-content">
        <div className="header-scoreboard">
          <Scoreboard teamNames={teamNames} />
          <button className="settings-btn" onClick={toggleSidebar}>
            ⚙️
          </button>
        </div>
        
        <div className="dartboard-container">
          <Dartboard config={dartboardConfig} />
        </div>
      </div>
      
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        teamNames={teamNames}
        setTeamNames={setTeamNames}
        dartboardConfig={dartboardConfig}
        setDartboardConfig={setDartboardConfig}
      />
    </div>
  )
}

export default App
