import React, { useState } from 'react';
import './ZakatPage.css';
import Header from '../../components/header/Header';

const ZakatPage = ({ isDarkMode, toggleTheme, sidebarCollapsed }) => {
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
      icon: 'zakat',
      iconColor: '#10B981',
      iconBg: '#D1FAE5',
      label: 'Total Zakat Collected',
      value: '$187K',
      subtext: '+12.3% from last year',
      badge: 'This year',
      badgeColor: '#D1FAE5'
    },
    {
      id: 2,
      icon: 'pending',
      iconColor: '#F59E0B',
      iconBg: '#FEF3C7',
      label: 'Pending Zakat',
      value: '$24K',
      subtext: 'Awaiting payment',
      badge: 'This Month',
      badgeColor: '#FEF3C7'
    },
    {
      id: 3,
      icon: 'investors',
      iconColor: '#3B82F6',
      iconBg: '#DBEAFE',
      label: 'Compliant Investors',
      value: '42',
      subtext: 'Out of 50 total',
      badge: '100% rate',
      badgeColor: '#DBEAFE'
    },
    {
      id: 4,
      icon: 'distributed',
      iconColor: '#A855F7',
      iconBg: '#F3E8FF',
      label: 'Distributed Zakat',
      value: '$163k',
      subtext: 'To beneficiaries',
      badge: '87.2% rate',
      badgeColor: '#F3E8FF'
    }
  ];

  // Status distribution data
  const statusData = [
    { name: 'Paid', value: 50, color: '#10B981', percentage: '50%' },
    { name: 'Pending', value: 25, color: '#F59E0B', percentage: '25%' },
    { name: 'Overdue', value: 10, color: '#EF4444', percentage: '10%' },
    { name: 'Upcoming', value: 15, color: '#3B82F6', percentage: '15%' }
  ];

  // Payment type data
  const paymentTypeData = [
    { name: 'Annual', value: 90, color: '#10B981' },
    { name: 'Quarterly', value: 68, color: '#F59E0B' },
    { name: 'Monthly', value: 38, color: '#A855F7' }
  ];

  // Zakat records
  const allRecords = [
    {
      id: 1,
      investor: 'Mohammed Al-Farooq',
      type: 'ANNUAL',
      amount: '6,250',
      dueDate: '2025-08-15',
      paidDate: '2025-08-15',
      status: 'Paid'
    },
    {
      id: 2,
      investor: 'Ahmed Khan',
      type: 'QUARTERLY',
      amount: '2,300',
      dueDate: '2025-08-15',
      paidDate: '—',
      status: 'Pending'
    },
    {
      id: 3,
      investor: 'Fatima Hassan',
      type: 'QUARTERLY',
      amount: '1,500',
      dueDate: '2025-08-15',
      paidDate: '—',
      status: 'Upcoming'
    },
    {
      id: 4,
      investor: 'Sarah Johnson',
      type: 'Monthly',
      amount: '3,200',
      dueDate: '2025-08-15',
      paidDate: '—',
      status: 'Upcoming'
    }
  ];

  const filteredRecords = allRecords.filter(record => {
    const matchesSearch = record.investor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Donut chart calculations
  const calculateDonutSegments = () => {
    let currentAngle = 0;
    return statusData.map(item => {
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
      zakat: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="14" r="2" fill={color}/>
        </svg>
      ),
      pending: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2"/>
          <path d="M12 7V12L15 15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      investors: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2"/>
          <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      distributed: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12L18 8M22 12L18 16M22 12H12M12 2.5V5.5M12 18.5V21.5M5.5 5L7.5 7M5.5 19L7.5 17M2 12H5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8V16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
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
        if (currentPage < totalPages - 2) pages.push('...');
        pages.push(totalPages);
      }
    }
    return [...new Set(pages)];
  };

  const donutSegments = calculateDonutSegments();

  return (
    <div className="zakat-page">
      <Header 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme}
        sidebarCollapsed={sidebarCollapsed}
      />
      
      <div className="zakat-content">
        <div className="zakat-header">
          <div>
            <h1>Zakat Management</h1>
            <p className="subtitle">Manage Shariah-compliant Zakat contributions and distributions</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map(stat => (
            <div key={stat.id} className="stat-card">
              <div className="stat-top">
                <div className="stat-icon" style={{ backgroundColor: stat.iconBg }}>
                  {renderStatIcon(stat.icon, stat.iconColor)}
                </div>
                <span className="stat-badge" style={{ backgroundColor: stat.badgeColor }}>
                  {stat.badge}
                </span>
              </div>
              <div className="stat-content">
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-subtext">{stat.subtext}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="charts-row">
          {/* Zakat Status Distribution */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h3>Zakat Status Distribution</h3>
                <p className="chart-subtitle">Current status of all tokens</p>
              </div>
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
                {statusData.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-marker" style={{ backgroundColor: item.color }}></div>
                    <span className="legend-label">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Type Distribution */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h3>Payment Type Distribution</h3>
                <p className="chart-subtitle">Breakdown by token type</p>
              </div>
            </div>
            <div className="bar-chart-wrapper">
              <div className="bar-chart">
                <div className="chart-y-axis">
                  <span>120</span>
                  <span>90</span>
                  <span>60</span>
                  <span>30</span>
                  <span>0</span>
                </div>
                <div className="bars-container">
                  {paymentTypeData.map((item, index) => (
                    <div key={index} className="bar-group">
                      <div className="bar-wrapper">
                        <div 
                          className="bar" 
                          style={{ 
                            height: `${(item.value / 120) * 100}%`,
                            backgroundColor: item.color
                          }}
                        ></div>
                      </div>
                      <span className="bar-label">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="chart-legend">
                {paymentTypeData.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-marker" style={{ backgroundColor: item.color }}></div>
                    <span className="legend-label">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Records Table */}
        <div className="table-section">
          <div className="table-header">
            <div className="table-title-group">
              <h2 className="table-title">
                Zakat Records
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="7" stroke="#9CA3AF" strokeWidth="1.5"/>
                  <path d="M8 7V11M8 5h.01" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </h2>
              <p className="table-subtitle">Detailed payment tracking and status</p>
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
                  {['All', 'Paid', 'Pending', 'Upcoming'].map(status => (
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
                  <th>INVESTOR</th>
                  <th>TYPE</th>
                  <th>AMOUNT</th>
                  <th>DUE DATE</th>
                  <th>PAID DATE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <tr key={record.id}>
                      <td className="investor-cell">{record.investor}</td>
                      <td>
                        <span className={`type-badge ${record.type.toLowerCase()}`}>
                          {record.type}
                        </span>
                      </td>
                      <td className="amount-cell">{record.amount}</td>
                      <td className="date-cell">{record.dueDate}</td>
                      <td className="date-cell">{record.paidDate}</td>
                      <td>
                        <span className={`status-badge ${record.status.toLowerCase()}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-results">No records found matching your criteria</td>
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

export default ZakatPage;
