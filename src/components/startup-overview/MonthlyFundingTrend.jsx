import React, { useState } from 'react';
import './MonthlyFundingTrend.css';

const MonthlyFundingTrend = () => {
  const [selectedMonth, setSelectedMonth] = useState(6); // Default to Jul (index 6)
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const dataPoints = [30, 60, 145, 85, 105, 105, 140, 105, 190];
  const dataValues = ['$30K', '$60K', '$145K', '$85K', '$105K', '$105K', '$400K', '$105K', '$190K'];
  const dataChanges = ['+8%', '+15%', '+22%', '-5%', '+10%', '+2%', '+12%', '-3%', '+5%'];
  
  const width = 640;
  const height = 340;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 40;
  
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  
  const max = 250;
  const min = 0;
  const range = max - min;
  
  const points = dataPoints.map((value, index) => {
    const x = paddingLeft + (index * chartWidth) / (dataPoints.length - 1);
    const y = paddingTop + chartHeight - ((value - min) / range) * chartHeight;
    return { x, y, value };
  });
  
  const pathData = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
  
  const yAxisLabels = [0, 50, 100, 150, 200, 250];
  
  return (
    <div className="monthly-funding-card">
      <div className="funding-header">
        <div className="funding-title-section">
          <div className="funding-icon">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.11728 9.951C7.7172 9.16555 8.43182 8.47987 9.28306 7.9608H14.5973C18.3917 10.2746 19.4715 15.899 19.7787 18.9127C19.8902 20.0062 19.0099 20.8971 17.9108 20.8971H13.9304" stroke="#5654D4" stroke-width="1.9902" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.4761 3.28915L14.9265 3.48286L12.2684 3.03984C12.0517 3.00373 11.8306 3.00373 11.614 3.03984L8.95583 3.48286L7.40622 3.28915C6.51999 3.17838 5.94782 4.20079 6.50575 4.8982L8.95583 7.9608H14.9265L17.3765 4.8982C17.9345 4.20079 17.3623 3.17838 16.4761 3.28915Z" stroke="#5654D4" stroke-width="1.9902" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.98529 18.9069C2.98529 18.0825 3.65357 17.4142 4.47794 17.4142H8.45834C9.2827 17.4142 9.95098 18.0825 9.95098 18.9069V19.4044C9.95098 20.2288 9.2827 20.8971 8.45834 20.8971H4.47794C3.65357 20.8971 2.98529 20.2288 2.98529 19.4044V18.9069Z" stroke="#5654D4" stroke-width="1.9902" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.98529 15.424C2.98529 14.5997 3.65357 13.9314 4.47794 13.9314H8.45834C9.2827 13.9314 9.95098 14.5997 9.95098 15.424V15.9216C9.95098 16.746 9.2827 17.4142 8.45834 17.4142H4.47794C3.65357 17.4142 2.98529 16.746 2.98529 15.9216V15.424Z" stroke="#5654D4" stroke-width="1.9902" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          </div>
          <h3>Monthly Funding Trend ($K)</h3>
          <button 
            className="info-btn" 
            title="Information"
            aria-label="Show funding information"
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
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.59019 16.3212H4.29507V12.026M12.0263 4.29483H16.3214V8.58994" stroke="#888888" stroke-width="1.28853" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          </button>
          <button 
            className="edit-btn" 
            title="Edit"
            aria-label="Edit chart"
          >
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6866 4.44129C13.2312 3.89915 14.112 3.90017 14.6554 4.44358L16.1735 5.96172C16.7169 6.50505 16.718 7.38562 16.176 7.93033L7.44958 16.7014L3.91558 16.7013L3.91558 13.1716L12.6866 4.44129Z" stroke="#888888" stroke-width="1.28853" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.5802 5.55095L15.0647 9.03543" stroke="#888888" stroke-width="1.28853" stroke-linecap="round"/>
</svg>

          </button>
          <button 
            className={`more-options ${showMenu ? 'active' : ''}`}
            title="More options"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Show more options"
            aria-expanded={showMenu}
          >
           <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.15518 8.71862C5.59317 8.71862 5.96544 8.87361 6.27823 9.18639C6.5908 9.49909 6.74553 9.87036 6.74503 10.3075C6.74503 10.7455 6.59004 11.1177 6.27725 11.4305C5.96448 11.7433 5.59246 11.8979 5.15518 11.8973C4.71739 11.8973 4.3458 11.7422 4.03311 11.4296C3.72033 11.1168 3.56578 10.7448 3.56631 10.3075C3.56638 9.86962 3.72137 9.49814 4.03409 9.18542C4.34683 8.8727 4.71795 8.71812 5.15518 8.71862ZM10.3095 8.71862C10.7475 8.71862 11.1197 8.87361 11.4325 9.18639C11.745 9.49908 11.8988 9.87039 11.8983 10.3075C11.8983 10.7455 11.7443 11.1178 11.4315 11.4305C11.1188 11.7433 10.7468 11.8979 10.3095 11.8973C9.87154 11.8973 9.49919 11.7423 9.18643 11.4296C8.87382 11.1168 8.72008 10.7447 8.72061 10.3075C8.72068 9.86979 8.87492 9.49807 9.18741 9.18542C9.46106 8.91177 9.78005 8.75893 10.1483 8.72546L10.3095 8.71862ZM15.4638 8.71862C15.9017 8.71863 16.274 8.87362 16.5868 9.18639C16.8993 9.49906 17.0531 9.87043 17.0526 10.3075C17.0526 10.7454 16.8986 11.1178 16.5858 11.4305C16.2731 11.7433 15.9011 11.8979 15.4638 11.8973L15.3026 11.8895C14.9337 11.8557 14.6144 11.7033 14.3407 11.4296C14.0281 11.1168 13.8744 10.7447 13.8749 10.3075C13.875 9.86975 14.0292 9.49808 14.3417 9.18542C14.6545 8.87263 15.0265 8.71809 15.4638 8.71862Z" fill="#888888" stroke="white" stroke-width="0.257707"/>
</svg>

          </button>
          {showMenu && (
            <div className="dropdown-menu">
              <button onClick={() => { setShowMenu(false); }}>Export Data</button>
              <button onClick={() => { setShowMenu(false); }}>View Details</button>
              <button onClick={() => { setShowMenu(false); }}>Share</button>
            </div>
          )}
        </div>
      </div>
      
      <div className="funding-chart">
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="lineGradientFunding" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#818cf8', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {yAxisLabels.map((label, index) => {
            const y = paddingTop + chartHeight - ((label - min) / range) * chartHeight;
            return (
              <g key={index}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={paddingLeft + chartWidth}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingLeft - 18}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="16"
                  fill="#94a3b8"
                >
                  {label}
                </text>
              </g>
            );
          })}
          
          <path
            d={pathData}
            fill="none"
            stroke="url(#lineGradientFunding)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r={hoveredPoint === index || selectedMonth === index ? 5 : 4}
                fill="#6366f1"
                className="chart-point"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedMonth(index)}
                onMouseEnter={() => setHoveredPoint(index)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              {(index === selectedMonth || hoveredPoint === index) && (
                <g className="tooltip-group">
                  <rect
                    x={index === 7 ? point.x - 60 : (index >= months.length - 2 ? point.x - 70 : point.x - 40)}
                    y={index === 7 ? point.y - 60 : point.y - 42}
                    width="80"
                    height="30"
                    fill="white"
                    rx="8"
                    className="value-tooltip"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <text
                    x={index === 7 ? point.x - 20 : (index >= months.length - 2 ? point.x - 30 : point.x)}
                    y={index === 7 ? point.y - 45 : point.y - 27}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="600"
                    fill="#111827"
                  >
                    {dataValues[index]}
                  </text>
                  <text
                    x={index === 7 ? point.x - 20 : (index >= months.length - 2 ? point.x - 30 : point.x)}
                    y={index === 7 ? point.y - 32 : point.y - 14}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="500"
                    fill={dataChanges[index].startsWith('+') ? '#6366f1' : '#ef4444'}
                  >
                    {dataChanges[index]}
                  </text>
                </g>
              )}
            </g>
          ))}
          
          {months.map((month, index) => {
            const x = paddingLeft + (index * chartWidth) / (months.length - 1);
            const isSelected = index === selectedMonth;
            return (
              <g key={month}>
                {isSelected && (
                  <rect
                    x={x - 18}
                    y={paddingTop + chartHeight + 12}
                    width="36"
                    height="22"
                    fill="#ede9fe"
                    rx="8"
                    className="month-highlight"
                  />
                )}
                <text
                  x={x}
                  y={paddingTop + chartHeight + 26}
                  textAnchor="middle"
                  fontSize="12"
                  fill={isSelected ? '#6366f1' : '#94a3b8'}
                  fontWeight={isSelected ? '600' : '400'}
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

export default MonthlyFundingTrend;
