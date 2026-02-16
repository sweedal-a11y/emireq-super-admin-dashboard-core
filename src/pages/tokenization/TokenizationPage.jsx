import React, { useState } from 'react';
import './TokenizationPage.css';
import Header from '../../components/header/Header';

const TokenizationPage = ({ isDarkMode, toggleTheme, sidebarCollapsed }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [hoveredLegend, setHoveredLegend] = useState(null);
  const [hoveredBarLegend, setHoveredBarLegend] = useState(null);

  const resultsPerPage = 4;
  const totalResults = 100;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  // Stats data
  const stats = [
    {
      id: 1,
      icon: 'tokens',
      iconColor: '#fff',
      iconBg: 'linear-gradient(135deg, #AD46FF 0%, #7F22FE 100%)',
      label: 'Total Tokens Issued',
      value: '2.4M',
      subtext: 'Across 15 startups',
      change: '+12.5%',
      isPositive: true
    },
    {
      id: 2,
      icon: 'market',
      iconColor: '#fff',
      iconBg: 'linear-gradient(135deg, #2B7FFF 0%, #0092B8 100%)',
      label: 'Market Cap',
      value: '$8.4M',
      subtext: 'Since this month',
      change: '+8.2%',
      isPositive: true
    },
    {
      id: 3,
      icon: 'active',
      iconColor: '#fff',
      iconBg: 'linear-gradient(135deg, #F6339A 0%, #E60076 100%)',
      label: 'Active Tokens',
      value: '100',
      subtext: 'In this quarter',
      change: '15 Active',
      isPositive: false
    },
    {
      id: 4,
      icon: 'volume',
      iconColor: '#fff',
      iconBg: 'linear-gradient(135deg, #00BC7D 0%, #00A63E 100%)',
      label: 'Trading Volume',
      value: '$1.2M',
      subtext: 'Last 30 days',
      change: '+7%',
      isPositive: true
    }
  ];

  // Token status distribution data
  const tokenStatusData = [
    { label: 'Active', value: 60, color: '#10B981' },
    { label: 'Pending', value: 25, color: '#3B82F6' },
    { label: 'Paused', value: 15, color: '#F59E0B' }
  ];

  // Token type distribution data
  const tokenTypeData = [
    { label: 'Equity', value: 45, color: '#8B5CF6' },
    { label: 'Revenue Share', value: 35, color: '#06B6D4' },
    { label: 'Hybrid', value: 20, color: '#EC4899' }
  ];

  // Startup companies data
  const allCompanies = [
    {
      id: 1,
      name: 'CureCloud',
      symbol: 'CURE',
      iconBg: '#395698',
      totalSupply: '500,000',
      price: '$250',
      marketCap: '$250',
      status: 'Active'
    },
    {
      id: 2,
      name: 'SolarPay',
      symbol: 'SPAY',
      iconBg: '#395698',
      totalSupply: '1,000,000',
      price: '$250',
      marketCap: '$250',
      status: 'Active'
    },
    {
      id: 3,
      name: 'AquaAI',
      symbol: 'AQUA',
      iconBg: '#395698',
      totalSupply: '250,000',
      price: '$250',
      marketCap: '$250',
      status: 'Pending'
    },
    {
      id: 4,
      name: 'GreenAgri',
      symbol: 'GRNG',
      iconBg: '#395698',
      totalSupply: '750,000',
      price: '$250',
      marketCap: '$250',
      status: 'Active'
    }
  ];

  // Filter companies based on status and search
  const filteredCompanies = allCompanies.filter(company => {
    const matchesStatus = statusFilter === 'All' || company.status === statusFilter;
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Render stat card icon
  const renderStatIcon = (iconType, iconColor) => {
    switch (iconType) {
      case 'tokens':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="5" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.09 11.37C17.0353 11.7224 17.8765 12.3075 18.5357 13.0712C19.195 13.8349 19.6511 14.7524 19.8617 15.7391C20.0724 16.7257 20.0309 17.7495 19.741 18.7158C19.4512 19.6822 18.9223 20.5598 18.2034 21.2676C17.4845 21.9754 16.5987 22.4905 15.628 22.7652C14.6572 23.04 13.6329 23.0655 12.6497 22.8395C11.6665 22.6134 10.7561 22.1431 10.0028 21.472C9.24949 20.8009 8.67757 19.9507 8.34 19" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 7H9.01V10" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14.71 14.88L15.41 15.59L12.59 18.41" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'market':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3v18" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 6H9.5C8.57174 6 7.6815 6.36875 7.02513 7.02513C6.36875 7.6815 6 8.57174 6 9.5C6 10.4283 6.36875 11.3185 7.02513 11.9749C7.6815 12.6313 8.57174 13 9.5 13H14.5C15.4283 13 16.3185 13.3687 16.9749 14.0251C17.6313 14.6815 18 15.5717 18 16.5C18 17.4283 17.6313 18.3185 16.9749 18.9749C16.3185 19.6313 15.4283 20 14.5 20H6" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'active':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'volume':
        return (
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 7H22V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 7L13.5 15.5L8.5 10.5L2 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        );
      case 'layers':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'dollar':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke={iconColor} strokeWidth="2"/>
            <path d="M12 6V18M15 9C15 7.89543 13.6569 7 12 7C10.3431 7 9 7.89543 9 9C9 10.1046 10.3431 11 12 11C13.6569 11 15 11.8954 15 13C15 14.1046 13.6569 15 12 15C10.3431 15 9 14.1046 9 13" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'activity':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 12H18L15 21L9 3L6 12H2" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'trending':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 6H23V12" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return null;
    }
  };

  // Calculate donut chart segments
  const calculateDonutSegments = () => {
    const total = tokenStatusData.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    
    return tokenStatusData.map(item => {
      const percentage = (item.value / total) * 100;
      const angle = (percentage / 100) * 360;
      const segment = {
        ...item,
        percentage,
        startAngle: currentAngle,
        endAngle: currentAngle + angle
      };
      currentAngle += angle;
      return segment;
    });
  };

  const donutSegments = calculateDonutSegments();

  // Get page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (currentPage > 2) pages.push(currentPage - 1);
    if (currentPage !== 1 && currentPage !== totalPages) pages.push(currentPage);
    if (currentPage < totalPages - 1) pages.push(currentPage + 1);
    if (totalPages > 1) {
      if (currentPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    return [...new Set(pages)];
  };

  return (
    <div className="tokenization-page">
      <Header 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme}
        sidebarCollapsed={sidebarCollapsed}
      />
      
      <div className="tokenization-header">
        <div>
          <h1>Tokenization Management</h1>
          <p className="subtitle">Manage tokenized startup assets and distributions</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map(stat => (
          <div key={stat.id} className="stat-card">
            <div className="stat-card-header">
              <div className="stat-icon" style={{ background: stat.iconBg }}>
                {renderStatIcon(stat.icon, stat.iconColor)}
              </div>
              <div className={`stat-badge ${stat.isPositive ? 'positive' : 'neutral'}`}>
                {stat.id === 4 && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px' }}>
                    <g clipPath="url(#clip0_3_9841)">
                      <path d="M9.33331 4.08331H12.8333V7.58331" stroke="#007A55" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12.8334 4.08331L7.87502 9.04165L4.95835 6.12498L1.16669 9.91665" stroke="#007A55" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_3_9841">
                        <rect width="14" height="14" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                )}
                {stat.change}
              </div>
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
        {/* Token Status Distribution */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3>Token Status Distribution</h3>
              <p className="chart-subtitle">Current status of all tokens</p>
            </div>
          </div>
          <div className="donut-chart-container">
            <svg className="donut-chart" viewBox="0 0 488 346" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Active - 60% - Orange */}
              <path d="M201.081 38.8856C200.448 36.9408 201.511 34.8466 203.471 34.2643C226.304 27.4819 250.482 26.4638 273.838 31.3284C297.194 36.193 318.955 46.7797 337.181 62.1138C338.746 63.4304 338.884 65.7748 337.528 67.3053L309.422 99.0186C308.066 100.549 305.73 100.684 304.148 99.3888C292.427 89.7965 278.55 83.159 263.687 80.0633C248.824 76.9676 233.452 77.513 218.876 81.6281C216.908 82.1837 214.82 81.1275 214.188 79.1827L201.081 38.8856Z" fill="#10B981" className={`donut-segment ${hoveredLegend === 'Active' ? 'highlighted' : hoveredLegend ? 'dimmed' : ''}`} data-segment="Active"/>
              {/* Pending - 25% - Blue */}
              <path d="M151.689 277.536C150.337 279.07 147.993 279.221 146.495 277.829C129.118 261.696 115.98 241.506 108.272 219.042C100.162 195.41 98.3409 170.075 102.987 145.526C107.633 120.976 118.586 98.0587 134.771 79.0243C150.155 60.9311 169.762 46.9386 191.832 38.2704C193.736 37.5228 195.862 38.5193 196.561 40.4413L211.033 80.2702C211.732 82.1923 210.736 84.3098 208.843 85.0832C194.888 90.7844 182.486 99.7594 172.697 111.272C162.108 123.726 154.941 138.721 151.901 154.783C148.861 170.845 150.053 187.422 155.359 202.884C160.264 217.177 168.528 230.063 179.436 240.47C180.915 241.882 181.068 244.217 179.715 245.751L151.689 277.536Z" fill="#3B82F6" className={`donut-segment ${hoveredLegend === 'Pending' ? 'highlighted' : hoveredLegend ? 'dimmed' : ''}`} data-segment="Pending"/>
              {/* Paused - 15% - Yellow */}
              <path d="M340.929 70.4209C342.335 68.9359 344.683 68.8685 346.131 70.3121C371.606 95.7018 386.69 129.749 388.327 165.767C390.019 203.021 377.194 239.478 352.549 267.466C327.905 295.454 293.364 312.79 256.196 315.825C220.26 318.76 184.577 308.105 156.168 286.048C154.553 284.794 154.323 282.456 155.618 280.874L182.456 248.081C183.751 246.499 186.081 246.273 187.713 247.505C206.132 261.408 229.058 268.095 252.144 266.21C276.463 264.224 299.063 252.881 315.188 234.568C331.313 216.256 339.705 192.402 338.597 168.027C337.546 144.887 328.012 122.992 311.889 106.48C310.461 105.017 310.39 102.678 311.796 101.193L340.929 70.4209Z" fill="#F59E0B" className={`donut-segment ${hoveredLegend === 'Paused' ? 'highlighted' : hoveredLegend ? 'dimmed' : ''}`} data-segment="Paused"/>
              {/* Border Circle */}
              <circle cx="244.475" cy="172.303" r="149.4" stroke="#DFDFF2" strokeWidth="1.2" fill="none" className="donut-border"/>
            </svg>
          </div>
          <div className="chart-legend">
            {tokenStatusData.map((item, index) => (
              <div 
                key={index} 
                className="legend-item"
                onMouseEnter={() => setHoveredLegend(item.label)}
                onMouseLeave={() => setHoveredLegend(null)}
              >
                <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
                <span className="legend-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Token Type Distribution */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3>Token Type Distribution</h3>
              <p className="chart-subtitle">Breakdown by token type</p>
            </div>
          </div>
          <div className="bar-chart-wrapper">
            <svg className="bar-chart-svg" viewBox="0 0 552 433" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Grid Lines */}
              <path d="M125.429 294.66H507.767" stroke="#F0F0F0" strokeWidth="1.43736" strokeDasharray="4.31 4.31" className="grid-line"/>
              <path d="M125.429 222.791H507.767" stroke="#F0F0F0" strokeWidth="1.43736" strokeDasharray="4.31 4.31" className="grid-line"/>
              <path d="M125.429 150.923H507.767" stroke="#F0F0F0" strokeWidth="1.43736" strokeDasharray="4.31 4.31" className="grid-line"/>
              <path d="M125.429 79.0566H507.767" stroke="#F0F0F0" strokeWidth="1.43736" strokeDasharray="4.31 4.31" className="grid-line"/>
              <path d="M125.429 7.1871H507.766" stroke="#F0F0F0" strokeWidth="1.43736" strokeDasharray="4.31 4.31" className="grid-line"/>
              
              {/* Vertical Grid Lines */}
              <path d="M189.152 7.18686V294.659" stroke="#F0F0F0" strokeWidth="1.43736" strokeDasharray="4.31 4.31" className="grid-line"/>
              <path d="M316.598 7.18686V294.659" stroke="#F0F0F0" strokeWidth="1.43736" strokeDasharray="4.31 4.31" className="grid-line"/>
              <path d="M444.044 7.18686V294.659" stroke="#F0F0F0" strokeWidth="1.43736" strokeDasharray="4.31 4.31" className="grid-line"/>
              <path d="M125.429 7.1871V294.659" stroke="#F0F0F0" strokeWidth="1.43736" strokeDasharray="4.31 4.31" className="grid-line"/>
              <path d="M507.767 7.18686V294.659" stroke="#F0F0F0" strokeWidth="1.43736" strokeDasharray="4.31 4.31" className="grid-line"/>
              
              {/* X-axis and Y-axis */}
              <path d="M125.429 294.66H507.766" stroke="#888888" strokeWidth="1.43736"/>
              <path d="M125.429 7.1871V294.659" stroke="#888888" strokeWidth="1.43736"/>
              
              {/* Bars */}
              <path d="M138.174 90.5537C138.174 87.504 139.385 84.5792 141.542 82.4228C143.698 80.2663 146.623 79.0548 149.673 79.0548H227.29C230.34 79.0548 233.264 80.2663 235.421 82.4228C237.577 84.5792 238.789 87.504 238.789 90.5537V294.659H138.174V90.5537Z" 
                    fill="#8650FF" 
                    className={`bar-segment ${hoveredBarLegend === 'Equity' ? 'bar-highlighted' : hoveredBarLegend ? 'bar-dimmed' : ''}`}
                    data-bar="Equity"/>
              
              <path d="M265.619 138.465C265.619 135.416 266.831 132.491 268.987 130.334C271.143 128.178 274.068 126.967 277.118 126.967H354.735C357.785 126.967 360.71 128.178 362.866 130.334C365.023 132.491 366.234 135.416 366.234 138.465V294.658H265.619V138.465Z" 
                    fill="#03A9F5" 
                    className={`bar-segment ${hoveredBarLegend === 'Revenue Share' ? 'bar-highlighted' : hoveredBarLegend ? 'bar-dimmed' : ''}`}
                    data-bar="Revenue Share"/>
              
              <path d="M393.065 210.334C393.065 207.284 394.277 204.359 396.433 202.203C398.589 200.046 401.514 198.835 404.564 198.835H482.181C485.231 198.835 488.156 200.046 490.312 202.203C492.469 204.359 493.68 207.284 493.68 210.334V294.659H393.065V210.334Z" 
                    fill="#FB3496" 
                    className={`bar-segment ${hoveredBarLegend === 'Hybrid' ? 'bar-highlighted' : hoveredBarLegend ? 'bar-dimmed' : ''}`}
                    data-bar="Hybrid"/>
              
              {/* Y-axis Labels */}
              <text x="108" y="300" fontSize="12" fill="#888888" textAnchor="end" className="axis-label">0</text>
              <text x="108" y="228" fontSize="12" fill="#888888" textAnchor="end" className="axis-label">15</text>
              <text x="108" y="156" fontSize="12" fill="#888888" textAnchor="end" className="axis-label">30</text>
              <text x="108" y="85" fontSize="12" fill="#888888" textAnchor="end" className="axis-label">45</text>
              <text x="108" y="13" fontSize="12" fill="#888888" textAnchor="end" className="axis-label">60</text>
              
              {/* X-axis Labels */}
              <text x="188" y="318" fontSize="14" fill="#888888" textAnchor="middle" className="axis-label">Equity</text>
              <text x="316" y="318" fontSize="14" fill="#888888" textAnchor="middle" className="axis-label">Revenue Share</text>
              <text x="443" y="318" fontSize="14" fill="#888888" textAnchor="middle" className="axis-label">Hybrid</text>
            </svg>
          </div>
          <div className="chart-legend bar-chart-legend">
            {tokenTypeData.map((item, index) => (
              <div 
                key={index} 
                className="legend-item"
                onMouseEnter={() => setHoveredBarLegend(item.label)}
                onMouseLeave={() => setHoveredBarLegend(null)}
              >
                <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
                <span className="legend-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tokenized Startups Table */}
      <div className="table-section">
        <div className="table-header">
          <div className="table-title">
            <h3>Tokenized Startups</h3>
            <button className="info-icon" aria-label="Information">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7.91351" cy="7.91351" r="7.91351" fill="#AFAFAF"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M9.2041 5.18552C9.32774 4.96914 9.3973 4.71798 9.3973 4.45136C9.3973 3.63219 8.73269 2.96758 7.91351 2.96758C7.09434 2.96758 6.42973 3.63219 6.42973 4.45136C6.42973 5.27053 7.09434 5.93514 7.91351 5.93514C8.46607 5.93514 8.94907 5.63375 9.2041 5.18552ZM6.92432 6.92433H7.41892H8.40811C8.95487 6.92433 9.3973 7.36676 9.3973 7.91352V8.90271V12.8595C9.3973 13.4062 8.95487 13.8487 8.40811 13.8487C7.86135 13.8487 7.41892 13.4062 7.41892 12.8595V9.6446C7.41892 9.23502 7.08661 8.90271 6.67703 8.90271C6.26744 8.90271 5.93513 8.5704 5.93513 8.16082V7.91352C5.93513 7.56576 6.11481 7.25857 6.38529 7.08276C6.53985 6.98229 6.72533 6.92433 6.92432 6.92433Z" fill="white"/>
              </svg>
            </button>
          </div>
          <p className="table-subtitle">Overview of all tokenized companies</p>
        </div>

        {/* Filter Controls */}
        <div className="tokenization-table-controls-figma">
          <div className="tokenization-status-dropdown-figma">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="tokenization-status-select-figma"
            >
              <option value="All">Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Paused">Paused</option>
            </select>
            <div className="tokenization-status-arrows-figma">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 5.5L10.5 2.5L13.5 5.5" stroke="#121212" strokeWidth="1.13" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.5 10.5L10.5 13.5L7.5 10.5" stroke="#121212" strokeWidth="1.13" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div className="tokenization-search-container-figma">
            <div className="tokenization-search-icon-figma">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7.33333" cy="7.33333" r="5.33333" stroke="#121212" strokeWidth="1.13" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 14L11.1 11.1" stroke="#121212" strokeWidth="1.13" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="tokenization-search-input-figma"
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="tokenization-table">
            <thead>
              <tr>
                <th>COMPANY NAME</th>
                <th>TOKEN SYMBOL</th>
                <th>TOTAL SUPPLY</th>
                <th>PRICE ($)</th>
                <th>MARKET CAP ($M)</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company, index) => (
                  <tr key={company.id} className={index === 0 ? 'first-row' : ''}>
                    <td>
                      <div className="company-cell-figma">
                        <div className="company-avatar-figma" style={{ backgroundColor: company.iconBg }}>
                          <span className="avatar-initial-figma">{company.name.charAt(0)}</span>
                        </div>
                        <span className="company-name-figma">{company.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="token-symbol-figma">
                        {company.symbol}
                      </div>
                    </td>
                    <td className="total-supply-figma">{company.totalSupply}</td>
                    <td className="price-figma">{company.price}</td>
                    <td className="market-cap-figma">{company.marketCap}</td>
                    <td>
                      <span className={`status-badge-figma status-${company.status.toLowerCase()}-figma`}>
                        {company.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-results">No companies found matching your criteria</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-footer-figma">
          <div className="pagination-info-figma">
            <span className="pagination-showing-text">Showing</span>
            <span className="pagination-current-box">{String(currentPage * resultsPerPage).padStart(2, '0')}</span>
            <span className="pagination-showing-text">/ {totalResults} Results</span>
          </div>
          
          <div className="pagination-controls-figma">
            <button 
              className="pagination-arrow-btn-figma pagination-prev"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <svg width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21L13 17L17 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                className={`pagination-page-btn-figma ${
                  page === currentPage ? 'active' : ''
                } ${page === '...' ? 'ellipsis' : ''}`}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                disabled={page === '...'}
              >
                {page}
              </button>
            ))}
            
            <button 
              className="pagination-arrow-btn-figma pagination-next"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <svg width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 21L18 17L14 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="table-disclaimer">
          Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
        </div>
      </div>
    </div>
  );
};

export default TokenizationPage;
