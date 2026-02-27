import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import "./Compliance.css";

export default function Compliance({ isDarkMode, toggleTheme, sidebarCollapsed }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const complianceData = [
    {
      id: 1,
      startup: "CureCloud",
      reviewType: "Initial Review",
      reviewer: "Dr. Ahmad Al-Shamsi",
      reviewDate: "2025-08-15",
      status: "Approved"
    },
    {
      id: 2,
      startup: "SukunPay",
      reviewType: "Annual Audit",
      reviewer: "Sheikh Mohammed Ibrahim",
      reviewDate: "2025-08-30",
      status: "In Review"
    },
    {
      id: 3,
      startup: "AqsaAI",
      reviewType: "Initial Review",
      reviewer: "Dr. Fatima Al-Nasser",
      reviewDate: "2025-10-15",
      status: "Pending"
    }
  ];

  const filteredData = complianceData.filter(item => {
    const matchesSearch = item.startup.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.reviewer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStartupInitials = (name) => {
    return name.substring(0, 1).toUpperCase();
  };

  const getStartupColor = (id) => {
    const colors = ['#3B82F6', '#8B5CF6', '#EC4899'];
    return colors[(id - 1) % colors.length];
  };

  return (
     <div className={`em-startup-overview in-page${sidebarCollapsed ? ' em-startup-overview--sidebar-collapsed' : ''}${isDarkMode ? ' dark' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />
      
      <main className={`em-compliance-main ${sidebarCollapsed ? 'em-compliance-main--expanded' : ''}`}>
        {/* Page Header - Exact Figma Match */}
        <div className="em-compliance-page-header">
          <div className="em-compliance-header-content">
            <h1 className="em-compliance-title">Shariah & Legal Compliance</h1>
            <p className="em-compliance-subtitle">Monitor compliance status and manage Shariah board activities</p>
          </div>
          <button 
            className="em-compliance-new-deal-btn"
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="em-compliance-plus-icon">
              <path 
                d="M8 3.33334V12.6667" 
                stroke="currentColor" 
                strokeWidth="1.45" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M3.33337 8H12.6667" 
                stroke="currentColor" 
                strokeWidth="1.45" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            New Deal
          </button>
        </div>

        {/* Stats Cards - 4 in a row matching Figma design exactly */}
        <div className="em-compliance-stats">
          {/* Shariah Compliant Card */}
          <div className="em-compliance-stat-card" 
               onClick={() => console.log('Shariah Compliant card clicked')}
               style={{cursor: 'pointer'}}>
            <div className="em-compliance-stat-icon-container">
              <div className="em-compliance-stat-icon em-compliance-stat-icon-green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 13C20 18 16.5 20.5 12.34 21.95C12.1222 22.0238 11.8855 22.0203 11.67 21.94C7.5 20.5 4 18 4 13V6.00002C4 5.73481 4.10536 5.48045 4.29289 5.29292C4.48043 5.10538 4.73478 5.00002 5 5.00002C7 5.00002 9.5 3.80002 11.24 2.28002C11.4519 2.09902 11.7214 1.99957 12 1.99957C12.2786 1.99957 12.5481 2.09902 12.76 2.28002C14.51 3.81002 17 5.00002 19 5.00002C19.2652 5.00002 19.5196 5.10538 19.7071 5.29292C19.8946 5.48045 20 5.73481 20 6.00002V13Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </div>
              <div className="em-compliance-stat-trend-badge em-compliance-trend-green">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_8518)">
<path d="M8 3.5H11V6.5" stroke="#00B031" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 3.5L6.75 7.75L4.25 5.25L1 8.5" stroke="#00B031" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_3_8518">
<rect width="12" height="12" fill="white"/>
</clipPath>
</defs>
</svg>

                <span className="em-compliance-trend-text">+2.3%</span>
              </div>
            </div>
            <div className="em-compliance-stat-content">
              <div className="em-compliance-stat-title">Shariah Compliant</div>
              <div className="em-compliance-stat-value">95%</div>
              <div className="em-compliance-stat-subtitle">31 out of 33 startups</div>
            </div>
          </div>

          {/* Audits Completed Card */}
          <div className="em-compliance-stat-card"
               onClick={() => console.log('Audits Completed card clicked')}
               style={{cursor: 'pointer'}}>
            <div className="em-compliance-stat-icon-container">
              <div className="em-compliance-stat-icon em-compliance-stat-icon-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 13L12 15L16 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="em-compliance-stat-period-badge em-compliance-period-blue">
                <span className="em-compliance-period-text">This week</span>
              </div>
            </div>
            <div className="em-compliance-stat-content">
              <div className="em-compliance-stat-title">Audits Completed</div>
              <div className="em-compliance-stat-value">124</div>
              <div className="em-compliance-stat-subtitle">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_8518)">
<path d="M8 3.5H11V6.5" stroke="#00B031" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 3.5L6.75 7.75L4.25 5.25L1 8.5" stroke="#00B031" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_3_8518">
<rect width="12" height="12" fill="white"/>
</clipPath>
</defs>
</svg>

                <span className="em-compliance-trend-positive">+18 vs last year</span>
              </div>
            </div>
          </div>

          {/* Board Members Card */}
          <div className="em-compliance-stat-card"
               onClick={() => console.log('Board Members card clicked')}
               style={{cursor: 'pointer'}}>
            <div className="em-compliance-stat-icon-container">
              <div className="em-compliance-stat-icon em-compliance-stat-icon-purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="em-compliance-stat-increment-badge em-compliance-increment-purple">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="em-compliance-increment-arrow">
                  <path d="M2 14L8 8L12 12L22 2" stroke="#8200DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="em-compliance-increment-text">+1</span>
              </div>
            </div>
            <div className="em-compliance-stat-content">
              <div className="em-compliance-stat-title">Board Members</div>
              <div className="em-compliance-stat-value">8</div>
              <div className="em-compliance-stat-subtitle">active scholars</div>
            </div>
          </div>

          {/* Pending Reviews Card */}
          <div className="em-compliance-stat-card"
               onClick={() => console.log('Pending Reviews card clicked')}
               style={{cursor: 'pointer'}}>
            <div className="em-compliance-stat-icon-container">
              <div className="em-compliance-stat-icon em-compliance-stat-icon-orange">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none"/>
                  <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="em-compliance-stat-period-badge em-compliance-period-orange">
                <span className="em-compliance-period-text">This year</span>
              </div>
            </div>
            <div className="em-compliance-stat-content">
              <div className="em-compliance-stat-title">Pending Reviews</div>
              <div className="em-compliance-stat-value">6</div>
              <div className="em-compliance-stat-subtitle em-compliance-decline">
               <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 8.5H11V5.5" stroke="#E7000B" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 8.5L6.75 4.25L4.25 6.75L1 3.5" stroke="#E7000B" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                <span className="em-compliance-decline-text">-2% this week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="em-compliance-charts">
          {/* Compliance Status Chart - Exact Figma Match */}
          <div className="em-compliance-chart-card em-compliance-status-card"
               onClick={() => console.log('Compliance Status chart clicked')}
               style={{cursor: 'pointer'}}>
            <div className="em-compliance-chart-header">
              <div className="em-compliance-chart-title-section">
                <div className="em-compliance-chart-title-row">
                  <h3 className="em-compliance-chart-title">Compliance Status</h3>
                  <div className="em-compliance-info-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#AFAFAF"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.305 6.2422C9.43 6.0234 9.5 5.7695 9.5 5.5C9.5 4.6719 8.828 4 8 4C7.172 4 6.5 4.6719 6.5 5.5C6.5 6.3281 7.172 7 8 7C8.559 7 9.047 6.6953 9.305 6.2422ZM7 8H7.5H8.5C9.053 8 9.5 8.4473 9.5 9V10V14C9.5 14.5527 9.053 15 8.5 15C7.947 15 7.5 14.5527 7.5 14V10.75C7.5 10.3359 7.164 10 6.75 10C6.336 10 6 9.6641 6 9.25V9C6 8.6484 6.182 8.3379 6.455 8.1602C6.611 8.0586 6.799 8 7 8Z" fill="white"/>
                    </svg>
                  </div>
                </div>
                <p className="em-compliance-chart-subtitle">Current status breakdown</p>
              </div>
              <div className="header-actions">
                <button 
                  className={`expand-btn ${isExpanded ? 'expanded' : ''}`}
                  title={isExpanded ? "Collapse" : "Expand"}
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-label={isExpanded ? "Collapse chart" : "Expand chart"}
                >
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.59019 16.3212H4.29507V12.026M12.0263 4.29483H16.3214V8.58994" stroke="#888888" strokeWidth="1.28853" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button 
                  className="edit-btn" 
                  title="Edit"
                  aria-label="Edit chart"
                >
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.6866 4.44129C13.2312 3.89915 14.112 3.90017 14.6554 4.44358L16.1735 5.96172C16.7169 6.50505 16.718 7.38562 16.176 7.93033L7.44958 16.7014L3.91558 16.7013L3.91558 13.1716L12.6866 4.44129Z" stroke="#888888" strokeWidth="1.28853" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.5802 5.55095L15.0647 9.03543" stroke="#888888" strokeWidth="1.28853" strokeLinecap="round"/>
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
                    <path d="M5.15518 8.71862C5.59317 8.71862 5.96544 8.87361 6.27823 9.18639C6.5908 9.49909 6.74553 9.87036 6.74503 10.3075C6.74503 10.7455 6.59004 11.1177 6.27725 11.4305C5.96448 11.7433 5.59246 11.8979 5.15518 11.8973C4.71739 11.8973 4.3458 11.7422 4.03311 11.4296C3.72033 11.1168 3.56578 10.7448 3.56631 10.3075C3.56638 9.86962 3.72137 9.49814 4.03409 9.18542C4.34683 8.8727 4.71795 8.71812 5.15518 8.71862ZM10.3095 8.71862C10.7475 8.71862 11.1197 8.87361 11.4325 9.18639C11.745 9.49908 11.8988 9.87039 11.8983 10.3075C11.8983 10.7455 11.7443 11.1178 11.4315 11.4305C11.1188 11.7433 10.7468 11.8979 10.3095 11.8973C9.87154 11.8973 9.49919 11.7423 9.18643 11.4296C8.87382 11.1168 8.72008 10.7447 8.72061 10.3075C8.72068 9.86979 8.87492 9.49807 9.18741 9.18542C9.46106 8.91177 9.78005 8.75893 10.1483 8.72546L10.3095 8.71862ZM15.4638 8.71862C15.9017 8.71863 16.274 8.87362 16.5868 9.18639C16.8993 9.49906 17.0531 9.87043 17.0526 10.3075C17.0526 10.7454 16.8986 11.1178 16.5858 11.4305C16.2731 11.7433 15.9011 11.8979 15.4638 11.8973L15.3026 11.8895C14.9337 11.8557 14.6144 11.7033 14.3407 11.4296C14.0281 11.1168 13.8744 10.7447 13.8749 10.3075C13.875 9.86975 14.0292 9.49808 14.3417 9.18542C14.6545 8.87263 15.0265 8.71809 15.4638 8.71862Z" fill="#888888" stroke="white" strokeWidth="0.257707"/>
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
            
            <div className="em-compliance-chart-content">
              <div className="compliance-donut-container">
                <svg width="192" height="192" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg" className="compliance-donut-chart">
                  <path 
                    d="M176 96C176 80.011 171.209 64.3888 162.245 51.1489C153.281 37.909 140.555 27.6589 125.709 21.7211C110.864 15.7833 94.5796 14.4302 78.9576 17.8364C63.3356 21.2425 49.0926 29.2516 38.0662 40.8304C27.0399 52.4092 19.7361 67.0264 17.0971 82.7962C14.4582 98.5659 16.6052 114.765 23.2611 129.302C29.917 143.84 40.7765 156.05 54.4385 164.357C68.1004 172.663 83.938 176.686 99.908 175.904L98.931 155.928C86.9535 156.514 75.0753 153.497 64.8288 147.268C54.5824 141.038 46.4378 131.88 41.4458 120.977C36.4539 110.073 34.8436 97.9245 36.8229 86.0971C38.8021 74.2698 44.2799 63.3069 52.5497 54.6228C60.8194 45.9387 71.5017 39.9319 83.2182 37.3773C94.9347 34.8227 107.148 35.8375 118.282 40.2908C129.416 44.7442 138.961 52.4318 145.684 62.3617C152.407 72.2916 156 84.0082 156 96H176Z" 
                    fill={hoveredSegment === 'approved' ? '#0EA37F' : '#10B981'} 
                    stroke="white" 
                    strokeWidth="2"
                    onMouseEnter={() => setHoveredSegment('approved')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{cursor: 'pointer', transition: 'fill 0.2s ease'}}
                  />
                  <path 
                    d="M102.694 175.719C114.993 174.687 126.885 170.823 137.442 164.429C147.999 158.036 156.933 149.287 163.546 138.866L146.66 128.15C141.7 135.965 134.999 142.527 127.082 147.322C119.164 152.117 110.245 155.015 101.021 155.79L102.694 175.719Z" 
                    fill={hoveredSegment === 'inreview' ? '#2563EB' : '#3B82F6'} 
                    stroke="white" 
                    strokeWidth="2"
                    onMouseEnter={() => setHoveredSegment('inreview')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{cursor: 'pointer', transition: 'fill 0.2s ease'}}
                  />
                  <path 
                    d="M165.001 136.483C169.154 129.404 172.194 121.727 174.012 113.724L154.509 109.293C153.145 115.296 150.866 121.053 147.751 126.362L165.001 136.483Z" 
                    fill={hoveredSegment === 'pending' ? '#D97706' : '#F59E0B'} 
                    stroke="white" 
                    strokeWidth="2"
                    onMouseEnter={() => setHoveredSegment('pending')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{cursor: 'pointer', transition: 'fill 0.2s ease'}}
                  />
                  <path 
                    d="M174.583 110.991C175.351 106.965 175.808 102.887 175.951 98.792L155.963 98.094C155.856 101.165 155.513 104.224 154.937 107.243L174.583 110.991Z" 
                    fill={hoveredSegment === 'rejected' ? '#DC2626' : '#E7000B'} 
                    stroke="white" 
                    strokeWidth="2"
                    onMouseEnter={() => setHoveredSegment('rejected')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{cursor: 'pointer', transition: 'fill 0.2s ease'}}
                  />
                  <text x="96" y="90" textAnchor="middle" fontSize="48" fontWeight="600" fill={isDarkMode ? '#F8FAFC' : '#0A0A0A'} className="chart-number">40</text>
                  <text x="96" y="115" textAnchor="middle" fontSize="14" fill={isDarkMode ? '#94A3B8' : '#717182'} className="chart-label">Total</text>
                </svg>
              </div>
              <div className="compliance-status-legend">
                <div 
                  className={`compliance-legend-item ${hoveredSegment === 'approved' ? 'highlighted' : ''}`}
                  onMouseEnter={() => setHoveredSegment('approved')}
                  onMouseLeave={() => setHoveredSegment(null)}
                  style={{cursor: 'pointer'}}
                >
                  <div className="legend-dot" style={{background: hoveredSegment === 'approved' ? '#0EA37F' : '#10B981'}}></div>
                  <span className="legend-label">Approved</span>
                  <span className="legend-value">31 <span className="legend-percentage">(78%)</span></span>
                </div>
                <div 
                  className={`compliance-legend-item ${hoveredSegment === 'inreview' ? 'highlighted' : ''}`}
                  onMouseEnter={() => setHoveredSegment('inreview')}
                  onMouseLeave={() => setHoveredSegment(null)}
                  style={{cursor: 'pointer'}}
                >
                  <div className="legend-dot" style={{background: hoveredSegment === 'inreview' ? '#2563EB' : '#3B82F6'}}></div>
                  <span className="legend-label">In Review</span>
                  <span className="legend-value">6 <span className="legend-percentage">(15%)</span></span>
                </div>
                <div 
                  className={`compliance-legend-item ${hoveredSegment === 'pending' ? 'highlighted' : ''}`}
                  onMouseEnter={() => setHoveredSegment('pending')}
                  onMouseLeave={() => setHoveredSegment(null)}
                  style={{cursor: 'pointer'}}
                >
                  <div className="legend-dot" style={{background: hoveredSegment === 'pending' ? '#D97706' : '#F59E0B'}}></div>
                  <span className="legend-label">Pending</span>
                  <span className="legend-value">2 <span className="legend-percentage">(5%)</span></span>
                </div>
                <div 
                  className={`compliance-legend-item ${hoveredSegment === 'rejected' ? 'highlighted' : ''}`}
                  onMouseEnter={() => setHoveredSegment('rejected')}
                  onMouseLeave={() => setHoveredSegment(null)}
                  style={{cursor: 'pointer'}}
                >
                  <div className="legend-dot" style={{background: hoveredSegment === 'rejected' ? '#DC2626' : '#E7000B'}}></div>
                  <span className="legend-label">Non-Compliant</span>
                  <span className="legend-value">1 <span className="legend-percentage">(2%)</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Audit Distribution Chart */}
          <div className="em-compliance-chart-card">
            <div className="em-compliance-chart-header">
              <div>
                <h3 className="em-compliance-chart-title">Audit Distribution</h3>
                <p className="em-compliance-chart-subtitle">Breakdown by audit type</p>
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
            <div className="em-compliance-chart-content">
              <div className="audit-distribution-chart">
                <div className="donut-chart-container">
                  <svg width="192" height="192" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
                    {/* Purple segment - Security Audit */}
                    <path
                      d="M176 96C176 84.3941 173.475 72.9271 168.6 62.3948C163.724 51.8625 156.616 42.517 147.767 35.0069C138.919 27.4968 128.542 22.002 117.357 18.9036C106.173 15.8051 94.4477 15.1774 82.9961 17.064L86.2471 36.798C94.8358 35.3831 103.629 35.8539 112.018 38.1777C120.407 40.5015 128.189 44.6226 134.825 50.2552C141.462 55.8878 146.793 62.8968 150.45 70.7961C154.106 78.6953 156 87.2955 156 96H176Z"
                      fill="#8B5CF6"
                      stroke="white"
                      className={`donut-segment ${hoveredSegment === 'initial-review' ? 'hovered' : ''}`}
                      onMouseEnter={() => setHoveredSegment('initial-review')}
                      onMouseLeave={() => setHoveredSegment(null)}
                      style={{ cursor: 'pointer' }}
                    />
                    {/* Cyan segment - Financial Audit */}
                    <path
                      d="M80.2492 17.5659C67.2292 20.1805 55.0649 25.9952 44.8535 34.4855C34.6422 42.9757 26.705 53.8745 21.758 66.1986C16.811 78.5227 15.0097 91.8845 16.5168 105.079C18.0238 118.273 22.7917 130.884 30.3904 141.775L46.7928 130.332C41.0938 122.163 37.5179 112.705 36.3876 102.809C35.2573 92.9134 36.6082 82.892 40.3185 73.6489C44.0287 64.4059 49.9816 56.2318 57.6401 49.8641C65.2987 43.4964 74.4219 39.1354 84.1869 37.1744L80.2492 17.5659Z"
                      fill="#06B6D4"
                      stroke="white"
                      className={`donut-segment ${hoveredSegment === 'due-diligence' ? 'hovered' : ''}`}
                      onMouseEnter={() => setHoveredSegment('due-diligence')}
                      onMouseLeave={() => setHoveredSegment(null)}
                      style={{ cursor: 'pointer' }}
                    />
                    {/* Orange segment - Operational Audit */}
                    <path
                      d="M32.0279 144.037C38.3954 152.517 46.3853 159.646 55.5328 165.01C64.6804 170.374 74.8031 173.866 85.3123 175.283C95.8216 176.7 106.508 176.013 116.749 173.262C126.99 170.512 136.583 165.753 144.968 159.262L132.726 143.447C126.437 148.315 119.243 151.884 111.562 153.947C103.881 156.01 95.8662 156.525 87.9843 155.462C80.1023 154.4 72.5103 151.781 65.6496 147.758C58.789 143.735 52.7966 138.388 48.0209 132.028L32.0279 144.037Z"
                      fill="#F59E0B"
                      stroke="white"
                      className={`donut-segment ${hoveredSegment === 'documentation' ? 'hovered' : ''}`}
                      onMouseEnter={() => setHoveredSegment('documentation')}
                      onMouseLeave={() => setHoveredSegment(null)}
                      style={{ cursor: 'pointer' }}
                    />
                    {/* Pink segment - Compliance Audit */}
                    <path
                      d="M147.146 157.515C155.814 150.308 162.86 141.351 167.824 131.232C172.788 121.112 175.558 110.057 175.951 98.792L155.963 98.094C155.668 106.543 153.591 114.834 149.868 122.424C146.145 130.014 140.86 136.731 134.36 142.136L147.146 157.515Z"
                      fill="#EC4899"
                      stroke="white"
                      className={`donut-segment ${hoveredSegment === 'closing' ? 'hovered' : ''}`}
                      onMouseEnter={() => setHoveredSegment('closing')}
                      onMouseLeave={() => setHoveredSegment(null)}
                      style={{ cursor: 'pointer' }}
                    />
                    {/* Center text */}
                    <text x="96" y="89" textAnchor="middle" className="donut-center-number">124</text>
                    <text x="96" y="109" textAnchor="middle" className="donut-center-label">Total</text>
                  </svg>
                </div>
                <div className="audit-distribution-legend">
                  <div 
                    className={`audit-distribution-legend-item ${hoveredSegment === 'initial-review' ? 'hovered' : ''}`}
                    onMouseEnter={() => setHoveredSegment('initial-review')}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    <div className="audit-distribution-legend-dot initial-review"></div>
                    <div className="audit-distribution-legend-info">
                      <span className="audit-distribution-legend-label">Initial Review</span>
                      <div className="audit-distribution-legend-stats">
                        <span className="audit-distribution-legend-count">31</span>
                        <span className="audit-distribution-legend-percentage">(28%)</span>
                      </div>
                    </div>
                  </div>
                  <div 
                    className={`audit-distribution-legend-item ${hoveredSegment === 'due-diligence' ? 'hovered' : ''}`}
                    onMouseEnter={() => setHoveredSegment('due-diligence')}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    <div className="audit-distribution-legend-dot due-diligence"></div>
                    <div className="audit-distribution-legend-info">
                      <span className="audit-distribution-legend-label">Due Diligence</span>
                      <div className="audit-distribution-legend-stats">
                        <span className="audit-distribution-legend-count">40</span>
                        <span className="audit-distribution-legend-percentage">(32%)</span>
                      </div>
                    </div>
                  </div>
                  <div 
                    className={`audit-distribution-legend-item ${hoveredSegment === 'documentation' ? 'hovered' : ''}`}
                    onMouseEnter={() => setHoveredSegment('documentation')}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    <div className="audit-distribution-legend-dot documentation"></div>
                    <div className="audit-distribution-legend-info">
                      <span className="audit-distribution-legend-label">Documentation</span>
                      <div className="audit-distribution-legend-stats">
                        <span className="audit-distribution-legend-count">32</span>
                        <span className="audit-distribution-legend-percentage">(26%)</span>
                      </div>
                    </div>
                  </div>
                  <div 
                    className={`audit-distribution-legend-item ${hoveredSegment === 'closing' ? 'hovered' : ''}`}
                    onMouseEnter={() => setHoveredSegment('closing')}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    <div className="audit-distribution-legend-dot closing"></div>
                    <div className="audit-distribution-legend-info">
                      <span className="audit-distribution-legend-label">Closing</span>
                      <div className="audit-distribution-legend-stats">
                        <span className="audit-distribution-legend-count">17</span>
                        <span className="audit-distribution-legend-percentage">(14%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Records Table */}
        <div className="em-compliance-table-section">
          <div className="compliance-records-header">
            <div className="compliance-records-title">
              <h3>Compliance Records</h3>
              <div 
                className="compliance-records-info-icon"
                onMouseEnter={() => setShowInfoTooltip(true)}
                onMouseLeave={() => setShowInfoTooltip(false)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="7.91351" cy="7.91351" r="7.91351" fill="#AFAFAF"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.2041 5.18552C9.32774 4.96914 9.3973 4.71798 9.3973 4.45136C9.3973 3.63219 8.73269 2.96758 7.91351 2.96758C7.09434 2.96758 6.42973 3.63219 6.42973 4.45136C6.42973 5.27053 7.09434 5.93514 7.91351 5.93514C8.46607 5.93514 8.94907 5.63375 9.2041 5.18552ZM6.92432 6.92433H7.41892H8.40811C8.95487 6.92433 9.3973 7.36676 9.3973 7.91352V8.90271V12.8595C9.3973 13.4062 8.95487 13.8487 8.40811 13.8487C7.86135 13.8487 7.41892 13.4062 7.41892 12.8595V9.6446C7.41892 9.23502 7.08661 8.90271 6.67703 8.90271C6.26744 8.90271 5.93513 8.5704 5.93513 8.16082V7.91352C5.93513 7.56576 6.11481 7.25857 6.38529 7.08276C6.53985 6.98229 6.72533 6.92433 6.92432 6.92433Z" fill="white"/>
                </svg>
                <div className={`compliance-records-info-tooltip ${showInfoTooltip ? 'show' : ''}`}>
                  Information about compliance records
                </div>
              </div>
            </div>
            <p className="compliance-records-subtitle">Detailed history of Shariah compliance reviews</p>
           
          </div>

          <div className="compliance-filter-controls">
            <div className="status-dropdown">
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="status-select"
              >
                <option value="All">Status</option>
                <option value="Approved">Approved</option>
                <option value="In Review">In Review</option>
                <option value="Pending">Pending</option>
                <option value="Non-Compliant">Non-Compliant</option>
              </select>
              <div className="status-dropdown-arrows">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.33325 4.66669L5.99992 2L8.66659 4.66669" stroke="#121212" strokeWidth="1.12943" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.66659 7.33331L5.99992 10L3.33325 7.33331" stroke="#121212" strokeWidth="1.12943" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="search-input-container">
              <div className="search-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#121212" strokeWidth="1.12943" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 14L11.1 11.1" stroke="#121212" strokeWidth="1.12943" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="em-compliance-table-wrapper">
            <table className="em-compliance-table">
              <thead>
                <tr>
                  <th>STARTUP</th>
                  <th>REVIEW TYPE</th>
                  <th>REVIEWER</th>
                  <th>REVIEW DATE</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="em-compliance-startup-cell">
                        <div 
                          className="em-compliance-startup-avatar"
                          style={{ backgroundColor: getStartupColor(item.id) }}
                        >
                          {getStartupInitials(item.startup)}
                        </div>
                        <span className="em-compliance-startup-name">{item.startup}</span>
                      </div>
                    </td>
                    <td className="em-compliance-review-cell">{item.reviewType}</td>
                    <td className="em-compliance-reviewer-cell">{item.reviewer}</td>
                    <td className="em-compliance-date-cell">{item.reviewDate}</td>
                    <td>
                      <span className={`em-compliance-status-badge em-compliance-status-${item.status.toLowerCase().replace(' ', '-')}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button className="em-compliance-action-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="em-compliance-table-footer">
            <div className="em-compliance-table-info">
              Showing <span className="em-compliance-table-info-highlight">03</span> / 15 Results
            </div>
            <div className="em-compliance-pagination">
              <button 
                className="em-compliance-pagination-btn em-compliance-pagination-prev" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className={`em-compliance-pagination-btn ${currentPage === 1 ? 'em-compliance-pagination-active' : ''}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button 
                className={`em-compliance-pagination-btn ${currentPage === 2 ? 'em-compliance-pagination-active' : ''}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button 
                className={`em-compliance-pagination-btn ${currentPage === 3 ? 'em-compliance-pagination-active' : ''}`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
              <span className="em-compliance-pagination-dots">...</span>
              <button 
                className={`em-compliance-pagination-btn ${currentPage === 10 ? 'em-compliance-pagination-active' : ''}`}
                onClick={() => setCurrentPage(10)}
              >
                10
              </button>
              <button 
                className="em-compliance-pagination-btn em-compliance-pagination-next"
                disabled={currentPage === 10}
                onClick={() => setCurrentPage(Math.min(10, currentPage + 1))}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
              <div className="em-compliance-disclaimer">
          <p>Market data is updated in real-time. Prices are for reference only and may vary across exchanges.</p>
        </div>
        </div>

        
      </main>
    </div>
  );
}
