import React, { useState } from 'react';
import './TotalInvestment.css';

const TotalInvestment = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(5); // Default to Jun (index 5)
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const dataPoints = [45, 65, 50, 55, 70, 68, 85];
  const dataValues = ['$75K', '$88K', '$79K', '$82K', '$91K', '$89K', '$94K'];
  
  const width = 640;
  const height = 200;
  const paddingLeft = 40;
  const paddingRight = 40;
  const paddingTop = 40;
  const paddingBottom = 40;
  
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  
  const max = Math.max(...dataPoints);
  const min = Math.min(...dataPoints) - 10;
  const range = max - min;
  
  const points = dataPoints.map((value, index) => {
    const x = paddingLeft + (index * chartWidth) / (dataPoints.length - 1);
    const y = paddingTop + chartHeight - ((value - min) / range) * chartHeight;
    return { x, y, value };
  });
  
  const pathData = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
  
  // Create highlight area path for last two points (Jun and Jul)
  const highlightStartIndex = 5;
  const highlightPoints = points.slice(highlightStartIndex);
  const highlightPath = `
    M ${highlightPoints[0].x},${height - paddingBottom}
    L ${highlightPoints[0].x},${highlightPoints[0].y}
    L ${highlightPoints[1].x},${highlightPoints[1].y}
    L ${highlightPoints[1].x},${height - paddingBottom}
    Z
  `;
  
  return (
    <div className="total-investment-card">
      <div className="investment-header">
        <div className="investment-title">
          <div className="title-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 7H19C20.1046 7 21 7.89543 21 9V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9C3 7.89543 3.89543 7 5 7H6" stroke="#FFC300" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 4.5H11C10.1716 4.5 9.5 5.17157 9.5 6C9.5 6.82843 10.1716 7.5 11 7.5H13C13.8284 7.5 14.5 8.17157 14.5 9C14.5 9.82843 13.8284 10.5 13 10.5H10" stroke="#FFC300" stroke-width="2" stroke-linecap="round"/>
<path d="M12 4.5V3" stroke="#FFC300" stroke-width="2" stroke-linecap="round"/>
<path d="M12 12V10.5" stroke="#FFC300" stroke-width="2" stroke-linecap="round"/>
</svg>

          </div>
          <h3>Total Investment</h3>
          <button 
            className="info-btn" 
            title="Information"
            aria-label="Show investment information"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="8" fill="#C1C1C1"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M9.30469 5.24219C9.42969 5.02344 9.5 4.76953 9.5 4.5C9.5 3.67188 8.82812 3 8 3C7.17188 3 6.5 3.67188 6.5 4.5C6.5 5.32812 7.17188 6 8 6C8.55859 6 9.04688 5.69531 9.30469 5.24219ZM7 7H7.5H8.5C9.05273 7 9.5 7.44727 9.5 8V9V13C9.5 13.5527 9.05273 14 8.5 14C7.94727 14 7.5 13.5527 7.5 13V9.75C7.5 9.33594 7.16406 9 6.75 9C6.33594 9 6 8.66406 6 8.25V8C6 7.64844 6.18164 7.33789 6.45508 7.16016C6.61133 7.05859 6.79883 7 7 7Z" fill="white"/>
            </svg>
          </button>
        </div>
        <div className="header-actions">
          <button 
            className={`expand-btn ${isExpanded ? 'expanded' : ''}`}
            title={isExpanded ? "Collapse" : "Expand"}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Collapse chart" : "Expand chart"}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 19H5V14M14 5H19V10" stroke="#717182" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          </button>
          <button 
            className={`more-options ${showMenu ? 'active' : ''}`}
            title="More options"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Show more options"
            aria-expanded={showMenu}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 11.1504C6.50986 11.1504 6.94254 11.3302 7.30664 11.6943C7.67075 12.0585 7.85024 12.4909 7.84961 13L7.8418 13.1875C7.80241 13.617 7.62432 13.988 7.30566 14.3066C6.94155 14.6708 6.50912 14.8502 6 14.8496C5.49014 14.8496 5.05746 14.6698 4.69336 14.3057C4.32925 13.9415 4.14976 13.5091 4.15039 13C4.15039 12.4901 4.33017 12.0575 4.69434 11.6934C5.01287 11.3748 5.38366 11.1971 5.8125 11.1582L6 11.1504ZM12 11.1504C12.5099 11.1504 12.9425 11.3302 13.3066 11.6943C13.6708 12.0585 13.8502 12.4909 13.8496 13L13.8418 13.1875C13.8024 13.617 13.6243 13.988 13.3057 14.3066C12.9415 14.6708 12.5091 14.8502 12 14.8496C11.4901 14.8496 11.0575 14.6698 10.6934 14.3057C10.3292 13.9415 10.1498 13.5091 10.1504 13C10.1504 12.4901 10.3302 12.0575 10.6943 11.6934C11.0129 11.3748 11.3837 11.1971 11.8125 11.1582L12 11.1504ZM18 11.1504C18.5099 11.1504 18.9425 11.3302 19.3066 11.6943C19.6708 12.0585 19.8502 12.4909 19.8496 13L19.8418 13.1875C19.8024 13.617 19.6243 13.988 19.3057 14.3066C18.9415 14.6708 18.5091 14.8502 18 14.8496C17.4901 14.8496 17.0575 14.6698 16.6934 14.3057C16.3292 13.9415 16.1498 13.5091 16.1504 13C16.1504 12.4901 16.3302 12.0575 16.6943 11.6934C17.0129 11.3748 17.3837 11.1971 17.8125 11.1582L18 11.1504Z" fill="#717182" stroke="white" strokeWidth="0.3"/>
            </svg>
          </button>
          {showMenu && (
            <div className="dropdown-menu">
              <button onClick={() => { setShowMenu(false); alert('Export data'); }}>Export Data</button>
              <button onClick={() => { setShowMenu(false); alert('View details'); }}>View Details</button>
              <button onClick={() => { setShowMenu(false); alert('Share'); }}>Share</button>
            </div>
          )}
        </div>
      </div>
      
      <div className="investment-value-section">
        <div className="investment-amount">$94,127</div>
        <div className="investment-change-wrapper">
          <div className="investment-change positive">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 8V2M5 2L2 5M5 2L8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>12%</span>
          </div>
          <span className="change-period">vs last month</span>
        </div>
      </div>
      
      <div className="investment-chart">
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradientInvestment" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#facc15', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#fef3c7', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: '#fef3c7', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          
          {/* Highlight background area for Jun-Jul */}
          <path
            d={highlightPath}
            fill="url(#highlightGradient)"
            className="highlight-area"
          />
          
          {/* Horizontal dotted line for Avg 6.8% */}
          <line
            x1={paddingLeft}
            y1={paddingTop + chartHeight * 0.5}
            x2={width - paddingRight}
            y2={paddingTop + chartHeight * 0.5}
            stroke="#d1d5db"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="avg-line"
          />
          
          {/* Main chart line */}
          <path
            d={pathData}
            fill="none"
            stroke="url(#lineGradientInvestment)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="chart-line"
          />
          
          {/* Data points */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r={hoveredPoint === index || selectedMonth === index ? "7" : "5"}
                fill="#fbbf24"
                className="chart-point"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredPoint(index)}
                onMouseLeave={() => setHoveredPoint(null)}
                onClick={() => setSelectedMonth(index)}
                aria-label={`${months[index]}: ${dataValues[index]}`}
              />
              {(hoveredPoint === index || selectedMonth === index) && (
                <g className="tooltip-group">
                  <rect
                    x={point.x - 35}
                    y={point.y - 40}
                    width="70"
                    height="30"
                    rx="6"
                    fill="#1e293b"
                    className="tooltip-bg"
                  />
                  <text
                    x={point.x}
                    y={point.y - 28}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill="#ffffff"
                    className="tooltip-text"
                  >
                    {months[index]}
                  </text>
                  <text
                    x={point.x}
                    y={point.y - 16}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill="#fbbf24"
                    className="tooltip-value"
                  >
                    {dataValues[index]}
                  </text>
                </g>
              )}
            </g>
          ))}
          
          {/* Avg label */}
          <g className="avg-label-group">
            <rect
              x={paddingLeft - 5}
              y={paddingTop + chartHeight * 0.5 - 13}
              width="65"
              height="24"
              rx="12"
              fill="#1e293b"
              className="avg-label-bg"
            />
            <text
              x={paddingLeft + 27}
              y={paddingTop + chartHeight * 0.5 + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="500"
              fill="#ffffff"
              className="avg-label-text"
            >
              Avg 6.8%
            </text>
          </g>
          
          {/* Month labels */}
          {months.map((month, index) => {
            const x = paddingLeft + (index * chartWidth) / (months.length - 1);
            const isHighlighted = index === selectedMonth;
            return (
              <g key={month}>
                {isHighlighted && (
                  <rect
                    x={x - 20}
                    y={height - paddingBottom + 8}
                    width="40"
                    height="24"
                    rx="12"
                    fill="#fef3c7"
                    className="month-highlight"
                  />
                )}
                <text
                  x={x}
                  y={height - paddingBottom + 24}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight={isHighlighted ? "600" : "400"}
                  fill={isHighlighted ? "#92400e" : "#9ca3af"}
                  className="month-label"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedMonth(index)}
                >
                  {month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default TotalInvestment;
