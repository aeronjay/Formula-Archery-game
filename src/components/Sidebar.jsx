import React from 'react'
import './Sidebar.css'

const Sidebar = ({ 
  isOpen, 
  onClose, 
  teamNames, 
  setTeamNames, 
  dartboardConfig, 
  setDartboardConfig 
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

  const handleInnerRingChange = (index, value) => {
    setDartboardConfig(prev => ({
      ...prev,
      innerRing: prev.innerRing.map((item, i) => 
        i === index ? (parseFloat(value) || 0) : item
      )
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
          </div>

          {/* Inner Ring Section */}
          <div className="settings-section">
            <h3>Inner Ring Values</h3>
            <div className="ring-inputs">
              {dartboardConfig.innerRing.map((value, index) => (
                <div key={`inner-${index}`} className="input-group small">
                  <label>Segment {index + 1}:</label>
                  <input
                    type="number"
                    step="0.1"
                    value={value}
                    onChange={(e) => handleInnerRingChange(index, e.target.value)}
                    placeholder="Value"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Outer Ring Section */}
          <div className="settings-section">
            <h3>Outer Ring Values</h3>
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
