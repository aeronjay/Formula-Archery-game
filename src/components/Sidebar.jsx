import React from 'react'
import './Sidebar.css'

const Sidebar = ({ 
  isOpen, 
  onClose, 
  teamNames, 
  setTeamNames, 
  dartboardConfig, 
  setDartboardConfig,
  pointSystem,
  setPointSystem,
  onResetDartboard
}) => {
  
  const handleTeamNameChange = (team, value) => {
    setTeamNames(prev => ({
      ...prev,
      [team]: value
    }))
  }

  const handleCenterValueChange = (value) => {
    setDartboardConfig(prev => ({
      ...prev,
      center: parseFloat(value) || 0
    }))
  }
  const handleThirdRingChange = (index, value) => {
    setDartboardConfig(prev => ({
      ...prev,
      thirdRing: prev.thirdRing.map((item, i) => 
        i === index ? (parseFloat(value) || 0) : item
      )
    }))
  }

  const handleSecondRingChange = (index, value) => {
    setDartboardConfig(prev => ({
      ...prev,
      secondRing: prev.secondRing.map((item, i) => 
        i === index ? (parseFloat(value) || 0) : item
      )
    }))
  }

  const handlePointSystemChange = (ring, value) => {
    setPointSystem(prev => ({
      ...prev,
      [ring]: parseInt(value) || 0
    }))
  }

  const handleOuterRingChange = (index, value) => {
    setDartboardConfig(prev => ({
      ...prev,
      outerRing: prev.outerRing.map((item, i) => 
        i === index ? (parseFloat(value) || 0) : item
      )
    }))
  }

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Settings</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
          <div className="sidebar-content">
          {/* Reset Button */}
          <div className="settings-section">
            <button 
              className="reset-btn"
              onClick={onResetDartboard}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#ff4757',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '1rem'
              }}
            >
              Reset Dartboard
            </button>
          </div>

          {/* Team Names Section */}
          <div className="settings-section">
            <h3>Team Names</h3>
            <div className="input-group">
              <label>Team 1:</label>
              <input
                type="text"
                value={teamNames.team1}
                onChange={(e) => handleTeamNameChange('team1', e.target.value)}
                placeholder="Enter team 1 name"
              />
            </div>
            <div className="input-group">
              <label>Team 2:</label>
              <input
                type="text"
                value={teamNames.team2}
                onChange={(e) => handleTeamNameChange('team2', e.target.value)}
                placeholder="Enter team 2 name"
              />
            </div>
          </div>

          {/* Point System Section */}
          <div className="settings-section">
            <h3>Point System</h3>
            <div className="input-group">
              <label>Outer Ring Points:</label>
              <input
                type="number"
                min="0"
                value={pointSystem.outerRing}
                onChange={(e) => handlePointSystemChange('outerRing', e.target.value)}
                placeholder="Points per outer segment"
              />
            </div>
            <div className="input-group">
              <label>Second Ring Points:</label>
              <input
                type="number"
                min="0"
                value={pointSystem.secondRing}
                onChange={(e) => handlePointSystemChange('secondRing', e.target.value)}
                placeholder="Points per second ring segment"
              />
            </div>
            <div className="input-group">
              <label>Third Ring Points:</label>
              <input
                type="number"
                min="0"
                value={pointSystem.thirdRing}
                onChange={(e) => handlePointSystemChange('thirdRing', e.target.value)}
                placeholder="Points per third ring segment"
              />
            </div>
            <div className="input-group">
              <label>Center Points:</label>
              <input
                type="number"
                min="0"
                value={pointSystem.center}
                onChange={(e) => handlePointSystemChange('center', e.target.value)}
                placeholder="Points for center"
              />
            </div>
          </div>

          {/* Center Value Section */}
          <div className="settings-section">
            <h3>Center (Bullseye)</h3>
            <div className="input-group">
              <label>Value:</label>
              <input
                type="number"
                step="0.1"
                value={dartboardConfig.center}
                onChange={(e) => handleCenterValueChange(e.target.value)}
                placeholder="Center value"
              />
            </div>
          </div>          {/* Third Ring Section (3 segments) */}
          <div className="settings-section">
            <h3>Third Ring Values (3 segments)</h3>
            <div className="ring-inputs">
              {dartboardConfig.thirdRing.map((value, index) => (
                <div key={`third-${index}`} className="input-group small">
                  <label>Segment {index + 1}:</label>
                  <input
                    type="number"
                    step="0.1"
                    value={value}
                    onChange={(e) => handleThirdRingChange(index, e.target.value)}
                    placeholder="Value"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Second Ring Section (6 segments) */}
          <div className="settings-section">
            <h3>Second Ring Values (6 segments)</h3>
            <div className="ring-inputs">
              {dartboardConfig.secondRing.map((value, index) => (
                <div key={`second-${index}`} className="input-group small">
                  <label>Segment {index + 1}:</label>
                  <input
                    type="number"
                    step="0.1"
                    value={value}
                    onChange={(e) => handleSecondRingChange(index, e.target.value)}
                    placeholder="Value"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Outer Ring Section (8 segments) */}
          <div className="settings-section">
            <h3>Outer Ring Values (8 segments)</h3>
            <div className="ring-inputs">
              {dartboardConfig.outerRing.map((value, index) => (
                <div key={`outer-${index}`} className="input-group small">
                  <label>Segment {index + 1}:</label>
                  <input
                    type="number"
                    step="0.1"
                    value={value}
                    onChange={(e) => handleOuterRingChange(index, e.target.value)}
                    placeholder="Value"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
