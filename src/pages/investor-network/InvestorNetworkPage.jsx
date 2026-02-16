import React, { useState } from 'react';
import './InvestorNetworkPage.css';
import Header from '../../components/header/Header';

const InvestorNetworkPage = ({ isDarkMode, toggleTheme, sidebarCollapsed }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(2);
  const itemsPerPage = 4;
  const totalResults = 120;
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  // Stats data
  const stats = [
    {
      title: 'Total Investors',
      value: '50',
      change: '+8%',
      period: 'this quarter',
      trend: 'up',
      iconType: 'investors',
      iconColor: '#3B82F6'
    },
    {
      title: 'Active Investors',
      value: '42',
      change: '-3%',
      period: 'this month',
      trend: 'down',
      iconType: 'active',
      iconColor: '#10B981'
    },
    {
      title: 'Total Capital',
      value: '$45M',
      change: '+85.2M',
      period: 'in last quarter',
      trend: 'up',
      iconType: 'capital',
      iconColor: '#F59E0B'
    },
    {
      title: 'Zakat Pending',
      value: '$450K',
      change: '-50%',
      period: 'vs last quarter',
      trend: 'down',
      iconType: 'zakat',
      iconColor: '#8B5CF6'
    }
  ];

  // Investor type distribution data
  const investorTypes = [
    { name: 'Angel', value: 18, color: '#3B82F6' },
    { name: 'VC Fund', value: 12, color: '#06B6D4' },
    { name: 'Institutional', value: 8, color: '#10B981' },
    { name: 'Family Office', value: 7, color: '#F59E0B' },
    { name: 'Sovereign Wealth', value: 5, color: '#EC4899' }
  ];

  const totalInvestors = investorTypes.reduce((sum, type) => sum + type.value, 0);

  // Investment activity data (Last 6 months)
  const activityData = [
    { month: 'Jan', value: 14 },
    { month: 'Feb', value: 18 },
    { month: 'Mar', value: 21 },
    { month: 'Apr', value: 19 },
    { month: 'May', value: 22 },
    { month: 'Jun', value: 23 },
    { month: 'Jul', value: 21 }
  ];

  const maxValue = Math.max(...activityData.map(d => d.value));
  const minValue = Math.min(...activityData.map(d => d.value));

  // Investor directory data
  const allInvestors = [
    { id: 1, name: 'Mohammad Al-Farooq', type: 'Angel', portfolio: '5 Startups', invested: '1,250', available: '750', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', type: 'VC Fund', portfolio: '12 Startups', invested: '8,500', available: '16,500', status: 'Active' },
    { id: 3, name: 'Ahmed Khan', type: 'Institutional', portfolio: '3 Startups', invested: '600', available: '400', status: 'Reviewing' },
    { id: 4, name: 'Emma Wilson', type: 'Angel', portfolio: '7 Startups', invested: '2,100', available: '1,900', status: 'Active' },
    { id: 5, name: 'Li Wei', type: 'VC Fund', portfolio: '15 Startups', invested: '12,000', available: '8,000', status: 'Active' },
    { id: 6, name: 'Hassan Al-Rashid', type: 'Family Office', portfolio: '4 Startups', invested: '5,500', available: '4,500', status: 'Inactive' },
    { id: 7, name: 'Maria Garcia', type: 'Institutional', portfolio: '9 Startups', invested: '7,800', available: '2,200', status: 'Active' },
    { id: 8, name: 'James Chen', type: 'Angel', portfolio: '6 Startups', invested: '1,800', available: '2,200', status: 'Reviewing' }
  ];

  const filteredInvestors = allInvestors.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          investor.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || investor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const calculateDonutSegments = () => {
    let currentAngle = -90; // Start from top
    return investorTypes.map(type => {
      const percentage = (type.value / totalInvestors) * 100;
      const angle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      const x1 = 110 + 90 * Math.cos((Math.PI * startAngle) / 180);
      const y1 = 110 + 90 * Math.sin((Math.PI * startAngle) / 180);
      const x2 = 110 + 90 * Math.cos((Math.PI * endAngle) / 180);
      const y2 = 110 + 90 * Math.sin((Math.PI * endAngle) / 180);
      
      const largeArc = angle > 180 ? 1 : 0;
      const pathData = [
        `M 110 110`,
        `L ${x1} ${y1}`,
        `A 90 90 0 ${largeArc} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');
      
      currentAngle = endAngle;
      return { ...type, pathData, percentage };
    });
  };

  const donutSegments = calculateDonutSegments();

  const renderStatIcon = (type) => {
    const icons = {
      investors: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M21 17.0004C21 15.7702 19.7659 14.7129 18 14.25M3 17.0004C3 15.7702 4.2341 14.7129 6 14.25M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389M12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      active: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M16 7L12 3L8 7M8 17L12 21L16 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 3V21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      capital: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      zakat: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 3V5M15 3V5M9 19V21M15 19V21M5 9H3M5 15H3M21 9H19M21 15H19M7 19H17C18.1046 19 19 18.1046 19 17V7C19 5.89543 18.1046 5 17 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    };
    return icons[type] || null;
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="investor-network-page">
      <Header 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme}
        sidebarCollapsed={sidebarCollapsed}
      />
      
      <div className="investor-network-content">
        <div className="investor-network-header">
          <div>
            <h1>Investor Network</h1>
            <p className="subtitle">Manage and monitor investor activities and portfolios</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: stat.iconColor }}>
                {renderStatIcon(stat.iconType)}
              </div>
              <div className="stat-details">
                <div className="stat-label">{stat.title}</div>
                <div className="stat-value">{stat.value}</div>
                <div className={`stat-change ${stat.trend}`}>
                  <span className="change-arrow">{stat.trend === 'up' ? '↑' : '↓'}</span>
                  <span className="change-value">{stat.change}</span>
                  <span className="change-period">{stat.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="charts-row">
          {/* Investor Type Distribution */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Investor Type Distribution</h3>
              <div className="chart-actions">
                <button className="icon-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 2L14 14M2 14L14 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button className="icon-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 4V8M8 12H8.01M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button className="icon-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="4" r="1" fill="currentColor"/>
                    <circle cx="8" cy="8" r="1" fill="currentColor"/>
                    <circle cx="8" cy="12" r="1" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="chart-subtitle">Breakdown by investor category</div>
            <div className="donut-chart-container">
              <svg className="donut-chart" viewBox="0 0 220 220">
                {donutSegments.map((segment, index) => (
                  <path
                    key={index}
                    d={segment.pathData}
                    fill={segment.color}
                    className="donut-segment"
                  />
                ))}
                <circle cx="110" cy="110" r="60" fill="var(--card-bg)" />
              </svg>
              <div className="donut-legend">
                {investorTypes.map((type, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: type.color }}></div>
                    <div className="legend-label">{type.name}</div>
                    <div className="legend-value">{type.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Investment Activity */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Investment Activity (Last 6 Months)</h3>
              <div className="chart-actions">
                <button className="icon-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 2L14 14M2 14L14 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button className="icon-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 7L8 2L3 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="icon-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="4" r="1" fill="currentColor"/>
                    <circle cx="8" cy="8" r="1" fill="currentColor"/>
                    <circle cx="8" cy="12" r="1" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="chart-subtitle">Monthly investment trend with targets</div>
            <div className="line-chart-container">
              <svg className="line-chart" viewBox="0 0 600 300" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FCD34D" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                <line x1="0" y1="75" x2="600" y2="75" stroke="var(--border-color)" strokeWidth="1" opacity="0.3" />
                <line x1="0" y1="150" x2="600" y2="150" stroke="var(--border-color)" strokeWidth="1" opacity="0.3" />
                <line x1="0" y1="225" x2="600" y2="225" stroke="var(--border-color)" strokeWidth="1" opacity="0.3" />
                {/* Area under curve */}
                <path
                  d={`M 0 ${300 - ((activityData[0].value - minValue) / (maxValue - minValue)) * 250} 
                     ${activityData.map((d, i) => 
                       `L ${(i * 100)} ${300 - ((d.value - minValue) / (maxValue - minValue)) * 250}`
                     ).join(' ')}
                     L ${(activityData.length - 1) * 100} 300 L 0 300 Z`}
                  fill="url(#areaGradient)"
                />
                {/* Line */}
                <polyline
                  points={activityData.map((d, i) => 
                    `${i * 100},${300 - ((d.value - minValue) / (maxValue - minValue)) * 250}`
                  ).join(' ')}
                  fill="none"
                  stroke="#FCD34D"
                  strokeWidth="3"
                />
                {/* Data points */}
                {activityData.map((d, i) => (
                  <circle
                    key={i}
                    cx={i * 100}
                    cy={300 - ((d.value - minValue) / (maxValue - minValue)) * 250}
                    r="4"
                    fill="#FCD34D"
                    className="data-point"
                  />
                ))}
              </svg>
              <div className="chart-x-labels">
                {activityData.map((d, i) => (
                  <span key={i}>{d.month}</span>
                ))}
              </div>
              <div className="chart-tooltip">
                <div className="tooltip-content">
                  <div className="tooltip-label">4 JUN</div>
                  <div className="tooltip-value">Investments: 23</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Investor Directory */}
        <div className="directory-section">
          <div className="directory-header">
            <div>
              <h2>Investor Directory</h2>
              <p className="directory-subtitle">Complete list of all investors in your network</p>
            </div>
          </div>

          <div className="table-controls">
            <div className="filter-group">
              <select 
                className="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Reviewing">Reviewing</option>
              </select>
            </div>
            <div className="search-box">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M11.5 11.5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>TYPE</th>
                  <th>PORTFOLIO</th>
                  <th>INVESTED USD</th>
                  <th>AVAILABLE USD</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvestors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((investor) => (
                  <tr key={investor.id}>
                    <td>{investor.name}</td>
                    <td>
                      <span className="type-badge">{investor.type}</span>
                    </td>
                    <td>{investor.portfolio}</td>
                    <td>{investor.invested}</td>
                    <td>{investor.available}</td>
                    <td>
                      <span className={`status-badge status-${investor.status.toLowerCase()}`}>
                        {investor.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="4" r="1" fill="white"/>
                          <circle cx="8" cy="8" r="1" fill="white"/>
                          <circle cx="8" cy="12" r="1" fill="white"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <div className="results-info">
              Showing <strong>{String((currentPage - 1) * itemsPerPage + 1).padStart(2, '0')}</strong> / {totalResults} Results
            </div>
            <div className="pagination">
              <button 
                className="page-btn"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="page-ellipsis">...</span>
                ) : (
                  <button
                    key={page}
                    className={`page-number ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              ))}
              <button 
                className="page-btn"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="data-notice">
            Investor data is updated in real-time. Figures are for reference only and may vary across exchanges.
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorNetworkPage;
