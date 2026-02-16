import React, { useState } from 'react';
import './TokenizationStatus.css';

const TokenizationStatus = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  
  const periods = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
  
  // Data - adjusted to match Figma (tokenized appears smaller, around 40%)
  const tokenizedPercent = 40;
  const notTokenizedPercent = 60;
  
  // SVG dimensions
  const size = 320;
  const strokeWidth = 35;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate stroke dash offsets for donut segments
  const tokenizedDashArray = circumference;
  const tokenizedDashOffset = circumference - (tokenizedPercent / 100) * circumference;
  
  const notTokenizedDashArray = circumference;
  const notTokenizedDashOffset = circumference - (notTokenizedPercent / 100) * circumference;
  
  // Badge position calculation - position it at the right side around tokenized/not-tokenized boundary
  const angleForBadge = (tokenizedPercent / 100) * 360;
  const radians = ((angleForBadge - 90) * Math.PI) / 180;
  const badgeRadius = radius + 8;
  const badgeX = center + badgeRadius * Math.cos(radians);
  const badgeY = center + badgeRadius * Math.sin(radians);
  
  return (
    <div className="tokenization-status-card">
      <div className="tokenization-header">
        <h3>Tokenization Status</h3>
        <div className="dropdown-container">
          <button 
            className="dropdown-trigger"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-expanded={showDropdown}
          >
            {selectedPeriod}
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {showDropdown && (
            <div className="dropdown-menu-period">
              {periods.map(period => (
                <button
                  key={period}
                  className={selectedPeriod === period ? 'active' : ''}
                  onClick={() => {
                    setSelectedPeriod(period);
                    setShowDropdown(false);
                  }}
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="tokenization-content">
        <div className="donut-chart-container">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="donut-chart">
            {/* Shadow filter for badge */}
            <defs>
              <filter id="badge-shadow" x="-100%" y="-100%" width="300%" height="300%">
                <feDropShadow dx="0" dy="2" stdDeviation="6" floodOpacity="0.1"/>
              </filter>
            </defs>
            
            {/* Background circle with light purple/lavender tint */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#E9D5FF"
              strokeWidth={strokeWidth}
              className="background-circle"
            />
            
            {/* Cyan/Blue segment (Tokenized) - starts from bottom going counter-clockwise */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#00BCD4"
              strokeWidth={hoveredSegment === 'tokenized' ? strokeWidth + 4 : strokeWidth}
              strokeDasharray={tokenizedDashArray}
              strokeDashoffset={tokenizedDashOffset}
              strokeLinecap="butt"
              transform={`rotate(90 ${center} ${center})`}
              className={`chart-segment tokenized ${hoveredSegment === 'tokenized' ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredSegment('tokenized')}
              onMouseLeave={() => setHoveredSegment(null)}
              style={{ 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
            
            {/* Purple segment (Not Tokenized) - continues after cyan */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#A855F7"
              strokeWidth={hoveredSegment === 'not-tokenized' ? strokeWidth + 4 : strokeWidth}
              strokeDasharray={notTokenizedDashArray}
              strokeDashoffset={notTokenizedDashOffset}
              strokeLinecap="butt"
              transform={`rotate(${90 + (tokenizedPercent / 100) * 360} ${center} ${center})`}
              className={`chart-segment not-tokenized ${hoveredSegment === 'not-tokenized' ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredSegment('not-tokenized')}
              onMouseLeave={() => setHoveredSegment(null)}
              style={{ 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
            
            {/* Inner circle with light lavender fill */}
            <circle
              cx={center}
              cy={center}
              r={radius - strokeWidth / 2}
              fill="#F5F3FF"
              className="inner-circle"
            />
            
            {/* Percentage badge */}
            <g className="percentage-badge">
              <circle
                cx={badgeX}
                cy={badgeY}
                r="32"
                fill="white"
                filter="url(#badge-shadow)"
              />
              <text
                x={badgeX}
                y={badgeY + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                className="percentage-text"
                fontSize="22"
                fontWeight="700"
                fill="#000000"
              >
                50%
              </text>
            </g>
          </svg>
        </div>
        
        <div className="chart-legend">
          <div 
            className={`legend-item ${hoveredSegment === 'tokenized' ? 'highlighted' : ''}`}
            onMouseEnter={() => setHoveredSegment('tokenized')}
            onMouseLeave={() => setHoveredSegment(null)}
            style={{ cursor: 'pointer' }}
          >
            <div className="legend-color" style={{ backgroundColor: '#00BCD4' }}></div>
            <span className="legend-label">Startup Tokenized</span>
          </div>
          
          <div 
            className={`legend-item ${hoveredSegment === 'not-tokenized' ? 'highlighted' : ''}`}
            onMouseEnter={() => setHoveredSegment('not-tokenized')}
            onMouseLeave={() => setHoveredSegment(null)}
            style={{ cursor: 'pointer' }}
          >
            <div className="legend-color" style={{ backgroundColor: '#A855F7' }}></div>
            <span className="legend-label">Not Tokenized</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenizationStatus;
