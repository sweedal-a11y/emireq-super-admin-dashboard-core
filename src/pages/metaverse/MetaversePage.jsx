import React, { useState } from 'react';
import './MetaversePage.css';
import Header from '../../components/header/Header';

const MetaversePage = ({ isDarkMode, toggleTheme, sidebarCollapsed }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const resultsPerPage = 4;
  const totalResults = 100;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  // Stats data
  const stats = [
    {
      id: 1,
      icon: 'platforms',
      iconColor: '#10B981',
      iconBg: '#D1FAE5',
      label: 'Active Platforms',
      value: '5',
      subtext: 'Decentralized Sandbox mins',
      change: '+Active',
      isPositive: true
    },
    {
      id: 2,
      icon: 'events',
      iconColor: '#8B5CF6',
      iconBg: '#EDE9FE',
      label: 'Virtual Events',
      value: '18',
      subtext: '15 upcoming this month',
      change: '+3 this month',
      isPositive: true
    },
    {
      id: 3,
      icon: 'attendees',
      iconColor: '#3B82F6',
      iconBg: '#DBEAFE',
      label: 'Total Attendees',
      value: '2,450',
      subtext: 'Across this month',
      change: '+18% growth',
      isPositive: true
    },
    {
      id: 4,
      icon: 'parcels',
      iconColor: '#A855F7',
      iconBg: '#F3E8FF',
      label: 'Virtual Land Parcels',
      value: '12',
      subtext: 'Across 4 platforms',
      change: '$200K value',
      isPositive: true
    }
  ];

  // Platform distribution data
  const platformData = [
    { name: 'Decentraland', value: 8, color: '#EC4899', percentage: '40%' },
    { name: 'The Sandbox', value: 5, color: '#8B5CF6', percentage: '25%' },
    { name: 'Somnium Space', value: 4, color: '#3B82F6', percentage: '20%' },
    { name: 'Spatial', value: 2, color: '#F59E0B', percentage: '10%' },
    { name: 'Others', value: 1, color: '#6B7280', percentage: '5%' }
  ];

  // Events data
  const allEvents = [
    {
      id: 1,
      name: 'Startup Pitch Day',
      platform: 'Decentraland',
      date: '2025-08-15',
      time: '14:00-17:00',
      attendees: 350,
      status: 'Confirmed',
      iconBg: '#DBEAFE'
    },
    {
      id: 2,
      name: 'Investor Networking',
      platform: 'The Sandbox',
      date: '2025-08-18',
      time: '16:00-18:00',
      attendees: 200,
      status: 'Scheduled',
      iconBg: '#EDE9FE'
    },
    {
      id: 3,
      name: 'Islamic Finance Summit',
      platform: 'Somnium Space',
      date: '2025-08-16',
      time: '10:00-16:00',
      attendees: 500,
      status: 'Pending',
      iconBg: '#FEF3C7'
    },
    {
      id: 4,
      name: 'Tech Innovation Fair',
      platform: 'Spatial',
      date: '2025-08-20',
      time: '12:00-15:00',
      attendees: 180,
      status: 'Confirmed',
      iconBg: '#D1FAE5'
    }
  ];

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.platform.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Donut chart calculations
  const calculateDonutSegments = () => {
    let currentAngle = 0;
    return platformData.map(item => {
      const percentage = parseInt(item.percentage) / 100;
      const angle = percentage * 360;
      const segment = {
        ...item,
        startAngle: currentAngle,
        endAngle: currentAngle + angle
      };
      currentAngle += angle;
      return segment;
    });
  };

  const renderStatIcon = (iconType, color) => {
    const icons = {
      platforms: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="7" height="7" rx="2" stroke={color} strokeWidth="2"/>
          <rect x="14" y="3" width="7" height="7" rx="2" stroke={color} strokeWidth="2"/>
          <rect x="3" y="14" width="7" height="7" rx="2" stroke={color} strokeWidth="2"/>
          <rect x="14" y="14" width="7" height="7" rx="2" stroke={color} strokeWidth="2"/>
        </svg>
      ),
      events: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2"/>
          <path d="M12 7V12L15 15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      attendees: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2"/>
          <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      parcels: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.27 6.96L12 12.01L20.73 6.96" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 22.08V12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    };
    return icons[iconType] || null;
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      if (currentPage > 2) pages.push(currentPage - 1);
      if (currentPage !== 1 && currentPage !== totalPages) pages.push(currentPage);
      if (currentPage < totalPages - 1) pages.push(currentPage + 1);
      if (totalPages > 1) {
        if (currentPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    return [...new Set(pages)];
  };

  const donutSegments = calculateDonutSegments();

  return (
    <div className="metaverse-page">
      <Header 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme}
        sidebarCollapsed={sidebarCollapsed}
      />
      
      <div className="metaverse-content">
        <div className="metaverse-header">
          <div>
            <h1>Metaverse Initiatives</h1>
            <p className="subtitle">Track metaverse events, platforms, and virtual engagement</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map(stat => (
            <div key={stat.id} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: stat.iconBg }}>
                {renderStatIcon(stat.icon, stat.iconColor)}
              </div>
              <div className="stat-content">
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-subtext">{stat.subtext}</p>
              </div>
              <div className={`stat-change ${stat.isPositive ? 'positive' : 'neutral'}`}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="charts-row">
          {/* Event Distribution by Platform */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h3>Event Distribution by Platform</h3>
                <p className="chart-subtitle">Events scheduled across metaverse platforms</p>
              </div>
              <button className="info-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 14V10M10 6H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="chart-content">
              <svg className="donut-chart" viewBox="0 0 200 200">
                {donutSegments.map((segment, index) => {
                  const centerX = 100;
                  const centerY = 100;
                  const radius = 70;
                  const innerRadius = 45;
                  
                  const startAngle = (segment.startAngle - 90) * (Math.PI / 180);
                  const endAngle = (segment.endAngle - 90) * (Math.PI / 180);
                  
                  const x1 = centerX + radius * Math.cos(startAngle);
                  const y1 = centerY + radius * Math.sin(startAngle);
                  const x2 = centerX + radius * Math.cos(endAngle);
                  const y2 = centerY + radius * Math.sin(endAngle);
                  
                  const ix1 = centerX + innerRadius * Math.cos(startAngle);
                  const iy1 = centerY + innerRadius * Math.sin(startAngle);
                  const ix2 = centerX + innerRadius * Math.cos(endAngle);
                  const iy2 = centerY + innerRadius * Math.sin(endAngle);
                  
                  const largeArc = segment.endAngle - segment.startAngle > 180 ? 1 : 0;
                  
                  const pathData = [
                    `M ${x1} ${y1}`,
                    `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
                    `L ${ix2} ${iy2}`,
                    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1}`,
                    'Z'
                  ].join(' ');
                  
                  return (
                    <path
                      key={index}
                      d={pathData}
                      fill={segment.color}
                      className="donut-segment"
                    />
                  );
                })}
              </svg>
              <div className="chart-legend">
                {platformData.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-marker" style={{ backgroundColor: item.color }}></div>
                    <span className="legend-label">{item.name}</span>
                    <span className="legend-value">{item.value} events</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Attendee Growth */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h3>Monthly Attendee Growth</h3>
                <p className="chart-subtitle">Cumulative attendance trend over time</p>
              </div>
              <button className="chart-action">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="growth-chart">
              <div className="growth-tooltip">
                <span className="tooltip-label">JUN</span>
                <span className="tooltip-value">Attendees: 800</span>
              </div>
              <svg className="line-chart" viewBox="0 0 400 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05"/>
                  </linearGradient>
                  <linearGradient id="areaGradient2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0.05"/>
                  </linearGradient>
                </defs>
                <path
                  d="M 0 120 L 66 100 L 133 110 L 200 95 L 266 105 L 333 70 L 400 50 L 400 200 L 0 200 Z"
                  fill="url(#areaGradient)"
                />
                <path
                  d="M 0 140 L 66 125 L 133 130 L 200 120 L 266 125 L 333 100 L 400 90 L 400 200 L 0 200 Z"
                  fill="url(#areaGradient2)"
                />
                <path
                  d="M 0 120 L 66 100 L 133 110 L 200 95 L 266 105 L 333 70 L 400 50"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div className="chart-x-axis">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
              </div>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="table-section">
          <div className="table-header">
            <div className="table-title-group">
              <h2 className="table-title">
                Metaverse Events
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="7" stroke="#9CA3AF" strokeWidth="1.5"/>
                  <path d="M8 7V11M8 5h.01" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </h2>
              <p className="table-subtitle">Scheduled virtual events across platforms</p>
            </div>
          </div>

          <div className="table-filters">
            <div className="filter-dropdown">
              <button 
                className="filter-button"
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              >
                <span>Status</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {showStatusDropdown && (
                <div className="dropdown-menu">
                  {['All', 'Confirmed', 'Scheduled', 'Pending'].map(status => (
                    <div
                      key={status}
                      className="dropdown-item"
                      onClick={() => {
                        setStatusFilter(status);
                        setShowStatusDropdown(false);
                      }}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="search-container">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 19L14.65 14.65" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>EVENT NAME</th>
                  <th>PLATFORM</th>
                  <th>DATE</th>
                  <th>TIME (UTC)</th>
                  <th>EXPECTED ATTENDEES</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <tr key={event.id}>
                      <td>
                        <div className="event-cell">
                          <div className="event-icon" style={{ backgroundColor: event.iconBg }}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="8" fill="#3B82F6"/>
                            </svg>
                          </div>
                          <span className="event-name">{event.name}</span>
                        </div>
                      </td>
                      <td className="platform-cell">{event.platform}</td>
                      <td className="date-cell">{event.date}</td>
                      <td className="time-cell">{event.time}</td>
                      <td className="attendees-cell">{event.attendees}</td>
                      <td>
                        <span className={`status-badge ${event.status.toLowerCase()}`}>
                          {event.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-results">No events found matching your criteria</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <div className="pagination-info">
              <span>Showing </span>
              <span className="page-number">{String(currentPage * resultsPerPage).padStart(2, '0')}</span>
              <span> / {totalResults} Results</span>
            </div>
            
            <div className="pagination-controls">
              <button 
                className="pagination-arrow"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  className={`pagination-page ${page === currentPage ? 'active' : ''} ${page === '...' ? 'ellipsis' : ''}`}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  disabled={page === '...'}
                >
                  {page}
                </button>
              ))}
              
              <button 
                className="pagination-arrow"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="table-disclaimer">
            Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaversePage;
