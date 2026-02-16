import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import "./Reports.css";

export default function Reports({ isDarkMode, toggleTheme, sidebarCollapsed }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [reportType, setReportType] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [exportFormat, setExportFormat] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);

  // Handle bar hover for the chart
  const handleBarHover = (event, month, value) => {
    const rect = event.target.getBoundingClientRect();
    const svg = event.target.closest('svg').getBoundingClientRect();
    setHoveredBar({
      month,
      value,
      x: event.target.getAttribute('x') - 0 + (event.target.getAttribute('width') / 2),
      y: event.target.getAttribute('y') - 0
    });
  };

  const handleBarLeave = () => {
    setHoveredBar(null);
  };

  const reportsData = [
    {
      id: 1,
      name: "Q3 Funding Summary",
      type: "Funding Analytics",
      generatedBy: "Admin User",
      date: "2025-08-15",
      format: "PDF"
    },
    {
      id: 2,
      name: "Investor Activity Aug 2025",
      type: "Investor Activity",
      generatedBy: "System",
      date: "2025-08-30",
      format: "Excel"
    },
    {
      id: 3,
      name: "Zakat Compliance Report",
      type: "Zakat Compliance",
      generatedBy: "Admin User",
      date: "2025-10-15",
      format: "PDF"
    }
  ];

  const filteredData = reportsData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.format === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getReportInitials = (name) => {
    const words = name.split(' ');
    if (words.length >= 2) {
      return words[0][0] + words[1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getReportColor = (id) => {
    const colors = ['#3B82F6', '#8B5CF6', '#F59E0B'];
    return colors[(id - 1) % colors.length];
  };

  // Generate Report Function
  const handleGenerate = async () => {
    if (!reportType || !dateRange || !exportFormat) {
      alert('Please fill in all fields to generate a report');
      return;
    }

    const button = document.querySelector('.em-reports-generate-btn');
    if (button) {
      button.classList.add('loading');
      button.disabled = true;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create mock report data
      const reportData = {
        type: reportType,
        dateRange: dateRange,
        format: exportFormat,
        timestamp: new Date().toISOString(),
        fileName: `${reportType.replace(' ', '_')}_${dateRange}_${Date.now()}.${exportFormat}`
      };

      // Log the report data (in a real app, this would trigger a download)
      console.log('Generated Report:', reportData);
      
      // Show success message
      const reportTypeDisplay = reportType.charAt(0).toUpperCase() + reportType.slice(1);
      alert(`${reportTypeDisplay} report generated successfully! Check console for details.`);
      
      // Reset form
      setReportType('');
      setDateRange('');
      setExportFormat('');
      
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Error generating report. Please try again.');
    } finally {
      if (button) {
        button.classList.remove('loading');
        button.disabled = false;
      }
    }
  };

  return (
    <div className="em-reports-container" data-sidebar-collapsed={sidebarCollapsed}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />
      
      <main className="em-reports-main">
        {/* Page Header */}
        <div className="em-reports-page-header">
          <div>
            <h1 className="em-reports-title">Reports & Analytics</h1>
            <p className="em-reports-subtitle">Generate and download comprehensive platform reports</p>
          </div>
        </div>

        {/* Stats Cards - 4 in a row */}
        <div className="em-reports-stats-row">
          {/* Card 1: Blue */}
          <div className="em-reports-stat-card">
            <div className="em-reports-stat-header">
              <div className="em-reports-icon-wrapper blue-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="16" y1="13" x2="8" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="16" y1="17" x2="8" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H9H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="em-reports-trend-pill blue-trend">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 9L4.5 5.5L6.5 7.5L11 3" stroke="#00B031" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 3H11V7" stroke="#00B031" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>+12%</span>
              </div>
            </div>
            <div className="em-reports-stat-body">
              <h3 className="em-reports-card-title">Total Reports</h3>
              <div className="em-reports-card-value">148</div>
              <div className="em-reports-card-divider"></div>
              <p className="em-reports-card-subtext">Generated this year</p>
            </div>
          </div>

          {/* Card 2: Green */}
          <div className="em-reports-stat-card">
            <div className="em-reports-stat-header">
              <div className="em-reports-icon-wrapper green-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                  <path d="M12 6V12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="em-reports-trend-pill green-trend">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 9L4.5 5.5L6.5 7.5L11 3" stroke="#00B031" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 3H11V7" stroke="#00B031" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>+3</span>
              </div>
            </div>
            <div className="em-reports-stat-body">
              <h3 className="em-reports-card-title">Schedule Reports</h3>
              <div className="em-reports-card-value">12</div>
              <div className="em-reports-card-divider"></div>
              <p className="em-reports-card-subtext">Active automations</p>
            </div>
          </div>

          {/* Card 3: Purple */}
          <div className="em-reports-stat-card">
            <div className="em-reports-stat-header">
              <div className="em-reports-icon-wrapper purple-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="em-reports-trend-pill purple-trend">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 9L4.5 5.5L6.5 7.5L11 3" stroke="#8200DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 3H11V7" stroke="#8200DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>+8</span>
              </div>
            </div>
            <div className="em-reports-stat-body">
              <h3 className="em-reports-card-title">Recent Downloads</h3>
              <div className="em-reports-card-value">42</div>
              <div className="em-reports-card-divider"></div>
              <p className="em-reports-card-subtext">Last 30 days</p>
            </div>
          </div>

          {/* Card 4: Orange */}
          <div className="em-reports-stat-card">
            <div className="em-reports-stat-header">
              <div className="em-reports-icon-wrapper orange-icon">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7L15 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 2V6C14 6.53043 14.2107 7.03914 14.5858 7.41421C14.9609 7.78929 15.4696 8 16 8H20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 13H10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 13H16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 17H10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 17H16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </div>
              <div className="em-reports-trend-pill orange-trend">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 9L4.5 5.5L6.5 7.5L11 3" stroke="#FF6900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 3H11V7" stroke="#FF6900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>+8</span>
              </div>
            </div>
            <div className="em-reports-stat-body">
              <h3 className="em-reports-card-title">Export Formats</h3>
              <div className="em-reports-card-value">6</div>
              <div className="em-reports-card-divider"></div>
              <p className="em-reports-card-subtext">PDF, Excel, CSV, JSON</p>
            </div>
          </div>
        </div>



        {/* Charts Row */}
        <div className="em-reports-charts">
          {/* Report Type Distribution Chart */}
          <div className="em-reports-chart-card">
            <div className="em-reports-chart-header">
              <div className="em-reports-title-section">
                <div className="em-reports-title-with-info">
                  <h3 className="em-reports-chart-title">Report Type Distribution</h3>
                  <button className="info-btn" title="Information">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="8" fill="#AFAFAF"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.30469 5.24219C9.42969 5.02344 9.5 4.76953 9.5 4.5C9.5 3.67188 8.82812 3 8 3C7.17188 3 6.5 3.67188 6.5 4.5C6.5 5.32812 7.17188 6 8 6C8.55859 6 9.04688 5.69531 9.30469 5.24219ZM7 7H7.5H8.5C9.05273 7 9.5 7.44727 9.5 8V9V13C9.5 13.5527 9.05273 14 8.5 14C7.94727 14 7.5 13.5527 7.5 13V9.75C7.5 9.33594 7.16406 9 6.75 9C6.33594 9 6 8.66406 6 8.25V8C6 7.64844 6.18164 7.33789 6.45508 7.16016C6.61133 7.05859 6.79883 7 7 7Z" fill="white"/>
                    </svg>
                  </button>
                </div>
                <p className="em-reports-chart-subtitle">Breakdown by report category</p>
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
            <div className="em-reports-chart-content-vertical">
              <div className="em-reports-donut-section">
                <svg viewBox="0 0 241 241" className="em-reports-donut-chart" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Blue - Funding */}
                  <path 
                    d="M234.737 120.671C234.737 93.3941 225.019 67.0091 207.326 46.2485C189.633 25.4879 165.122 11.7099 138.19 7.38565L131.575 48.5804C148.714 51.3323 164.312 60.1001 175.571 73.3113C186.83 86.5226 193.015 103.313 193.015 120.671H234.737Z" 
                    fill="#3B82F6" 
                    stroke="white" 
                    strokeWidth="1.04306"
                    className="donut-segment"
                    data-segment="funding"
                    onMouseEnter={() => setHoveredSegment('funding')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{cursor: 'pointer', opacity: hoveredSegment && hoveredSegment !== 'funding' ? 0.6 : 1}}
                  />
                  {/* Green - Investor */}
                  <path 
                    d="M132.236 6.58819C110.62 4.26991 88.7909 8.14024 69.2899 17.7485C49.789 27.3567 33.419 42.3074 22.0864 60.8593L57.6914 82.6089C64.9031 70.8031 75.3204 61.289 87.73 55.1747C100.14 49.0604 114.031 46.5974 127.786 48.0727L132.236 6.58819Z" 
                    fill="#10B981" 
                    stroke="white" 
                    strokeWidth="1.04306"
                    className="donut-segment"
                    data-segment="investor"
                    onMouseEnter={() => setHoveredSegment('investor')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{cursor: 'pointer', opacity: hoveredSegment && hoveredSegment !== 'investor' ? 0.6 : 1}}
                  />
                  {/* Purple - Startup */}
                  <path 
                    d="M19.0913 66.0683C10.983 81.0525 6.31344 97.6544 5.42178 114.668C4.53012 131.682 7.43869 148.681 13.9363 164.431L52.5054 148.519C48.3705 138.497 46.5196 127.679 47.087 116.852C47.6544 106.025 50.6259 95.46 55.7858 85.9246L19.0913 66.0683Z" 
                    fill="#8B5CF6" 
                    stroke="white" 
                    strokeWidth="1.04306"
                    className="donut-segment"
                    data-segment="startup"
                    onMouseEnter={() => setHoveredSegment('startup')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{cursor: 'pointer', opacity: hoveredSegment && hoveredSegment !== 'startup' ? 0.6 : 1}}
                  />
                  {/* Orange - Tokenization */}
                  <path 
                    d="M16.3713 169.923C28.4215 195.279 49.3499 215.337 75.1945 226.301L91.4877 187.891C75.0411 180.914 61.7231 168.15 54.0548 152.014L16.3713 169.923Z" 
                    fill="#F59E0B" 
                    stroke="white" 
                    strokeWidth="1.04306"
                    className="donut-segment"
                    data-segment="tokenization"
                    onMouseEnter={() => setHoveredSegment('tokenization')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{cursor: 'pointer', opacity: hoveredSegment && hoveredSegment !== 'tokenization' ? 0.6 : 1}}
                  />
                  {/* Pink - Zakat */}
                  <path 
                    d="M80.7843 228.499C102.696 236.468 126.515 237.572 149.069 231.666L138.499 191.304C124.146 195.063 108.988 194.36 95.045 189.289L80.7843 228.499Z" 
                    fill="#EC4899" 
                    stroke="white" 
                    strokeWidth="1.04306"
                    className="donut-segment"
                    data-segment="zakat"
                    onMouseEnter={() => setHoveredSegment('zakat')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{cursor: 'pointer', opacity: hoveredSegment && hoveredSegment !== 'zakat' ? 0.6 : 1}}
                  />
                  {/* Cyan - Platform */}
                  <path 
                    d="M154.838 229.992C177.053 222.912 196.584 209.233 210.829 190.776C225.075 172.319 233.36 149.960 234.58 126.676L192.915 124.493C192.138 139.310 186.866 153.538 177.801 165.284C168.735 177.029 156.307 185.734 142.17 190.239L154.838 229.992Z" 
                    fill="#06B6D4" 
                    stroke="white" 
                    strokeWidth="1.04306"
                    className="donut-segment"
                    data-segment="platform"
                    onMouseEnter={() => setHoveredSegment('platform')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{cursor: 'pointer', opacity: hoveredSegment && hoveredSegment !== 'platform' ? 0.6 : 1}}
                  />
                  {/* Outer Border */}
                  <circle cx="120.183" cy="120" r="119.519" stroke="#DFDFF2" strokeWidth="0.962003" fill="none" />
                </svg>
              </div>
              <div className="em-reports-chart-legend-figma">
                <div className="em-reports-legend-column">
                  <div 
                    className={`em-reports-legend-item-figma ${hoveredSegment === 'funding' ? 'highlighted' : ''}`}
                    onMouseEnter={() => setHoveredSegment('funding')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{cursor: 'pointer'}}
                  >
                    <div className="em-reports-legend-indicator" style={{background: '#3B82F6'}}></div>
                    <span className="em-reports-legend-label-figma">Funding</span>
                    <span className="em-reports-legend-value-figma">35</span>
                  </div>
                  <div 
                    className={`em-reports-legend-item-figma ${hoveredSegment === 'startup' ? 'highlighted' : ''}`}
                    onMouseEnter={() => setHoveredSegment('startup')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{cursor: 'pointer'}}
                  >
                    <div className="em-reports-legend-indicator" style={{background: '#8B5CF6'}}></div>
                    <span className="em-reports-legend-label-figma">Startup</span>
                    <span className="em-reports-legend-value-figma">22</span>
                  </div>
                  <div 
                    className={`em-reports-legend-item-figma ${hoveredSegment === 'zakat' ? 'highlighted' : ''}`}
                    onMouseEnter={() => setHoveredSegment('zakat')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{cursor: 'pointer'}}
                  >
                    <div className="em-reports-legend-indicator" style={{background: '#EC4899'}}></div>
                    <span className="em-reports-legend-label-figma">Zakat</span>
                    <span className="em-reports-legend-value-figma">15</span>
                  </div>
                </div>
                <div className="em-reports-legend-column">
                  <div 
                    className={`em-reports-legend-item-figma ${hoveredSegment === 'investor' ? 'highlighted' : ''}`}
                    onMouseEnter={() => setHoveredSegment('investor')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{cursor: 'pointer'}}
                  >
                    <div className="em-reports-legend-indicator" style={{background: '#10B981'}}></div>
                    <span className="em-reports-legend-label-figma">Investor</span>
                    <span className="em-reports-legend-value-figma">28</span>
                  </div>
                  <div 
                    className={`em-reports-legend-item-figma ${hoveredSegment === 'tokenization' ? 'highlighted' : ''}`}
                    onMouseEnter={() => setHoveredSegment('tokenization')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{cursor: 'pointer'}}
                  >
                    <div className="em-reports-legend-indicator" style={{background: '#F59E0B'}}></div>
                    <span className="em-reports-legend-label-figma">Tokenization</span>
                    <span className="em-reports-legend-value-figma">18</span>
                  </div>
                  <div 
                    className={`em-reports-legend-item-figma ${hoveredSegment === 'platform' ? 'highlighted' : ''}`}
                    onMouseEnter={() => setHoveredSegment('platform')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{cursor: 'pointer'}}
                  >
                    <div className="em-reports-legend-indicator" style={{background: '#06B6D4'}}></div>
                    <span className="em-reports-legend-label-figma">Platform</span>
                    <span className="em-reports-legend-value-figma">30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reports Generated Chart */}
          <div className="em-reports-chart-card">
            <div className="em-reports-chart-header">
              <div className="em-reports-title-section">
                <div className="em-reports-title-with-info">
                  <h3 className="em-reports-chart-title">Reports Generated</h3>
                  <button className="info-btn" title="Information">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="8" fill="#AFAFAF"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.30469 5.24219C9.42969 5.02344 9.5 4.76953 9.5 4.5C9.5 3.67188 8.82812 3 8 3C7.17188 3 6.5 3.67188 6.5 4.5C6.5 5.32812 7.17188 6 8 6C8.55859 6 9.04688 5.69531 9.30469 5.24219ZM7 7H7.5H8.5C9.05273 7 9.5 7.44727 9.5 8V9V13C9.5 13.5527 9.05273 14 8.5 14C7.94727 14 7.5 13.5527 7.5 13V9.75C7.5 9.33594 7.16406 9 6.75 9C6.33594 9 6 8.66406 6 8.25V8C6 7.64844 6.18164 7.33789 6.45508 7.16016C6.61133 7.05859 6.79883 7 7 7Z" fill="white"/>
                    </svg>
                  </button>
                </div>
                <p className="em-reports-chart-subtitle">Last 6 months trend</p>
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
            <div className="em-reports-bar-chart-container">
              <svg viewBox="0 0 517 305" className="em-reports-bar-chart-figma">
                <defs>
                  <linearGradient id="barGradientFigma" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#83A9FE" />
                    <stop offset="100%" stopColor="#155DFC" />
                  </linearGradient>
                  <filter id="tooltipShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.05)"/>
                  </filter>
                </defs>
                
                {/* Horizontal Grid Lines - Dashed */}
                <line x1="49.4186" y1="58.1395" x2="499.85" y2="58.1395" stroke="#C1C1C1" strokeWidth="1.16279" strokeLinecap="round" strokeDasharray="3.88 3.88"/>
                <line x1="49.4186" y1="7.75192" x2="499.85" y2="7.75192" stroke="#C1C1C1" strokeWidth="1.16279" strokeLinecap="round" strokeDasharray="3.88 3.88"/>
                <line x1="49.5686" y1="158.915" x2="500" y2="158.915" stroke="#C1C1C1" strokeWidth="1.16279" strokeLinecap="round" strokeDasharray="3.88 3.88"/>
                <line x1="49.5686" y1="108.527" x2="500" y2="108.527" stroke="#C1C1C1" strokeWidth="1.16279" strokeLinecap="round" strokeDasharray="3.88 3.88"/>
                <line x1="49.5686" y1="209.302" x2="500" y2="209.302" stroke="#C1C1C1" strokeWidth="1.16279" strokeLinecap="round" strokeDasharray="3.88 3.88"/>
                <line x1="49.5686" y1="258.721" x2="500" y2="258.721" stroke="#C1C1C1" strokeOpacity="0.5" strokeWidth="1.45349" strokeLinecap="round"/>
                
                {/* Vertical Dotted Line */}
                <g className="vertical-indicator-line">
                  <circle cx="438.953" cy="13.7066" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="19.6128" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="25.519" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="31.4253" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="37.3315" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="43.2378" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="49.144" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="55.0502" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="60.9565" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="66.8627" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="72.7689" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="78.6752" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="84.5814" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="90.4876" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="96.3939" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="102.3" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="108.206" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="114.113" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="120.019" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="125.925" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="131.831" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="137.738" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="143.644" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="149.55" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="155.456" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="161.362" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="167.269" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="173.175" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="179.081" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="184.987" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="190.894" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="196.8" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="202.706" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="208.612" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="214.519" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="220.425" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="226.331" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="232.237" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="238.143" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="244.05" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="249.956" r="0.484496" fill="#121212"/>
                  <circle cx="438.953" cy="255.765" r="0.484496" fill="#121212"/>
                </g>
                
                {/* Y-axis Labels */}
                <text x="18.6753" y="13.186" fontSize="11" fill="#8D8D99" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif">50</text>
                <text x="19.9765" y="63.8837" fontSize="11" fill="#8D8D99" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif">40</text>
                <text x="18.4574" y="114.953" fontSize="11" fill="#8D8D99" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif">30</text>
                <text x="14.907" y="165.651" fontSize="11" fill="#8D8D99" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif">20</text>
                <text x="20.8431" y="216.535" fontSize="11" fill="#8D8D99" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif">10</text>
                <text x="28.2325" y="267.605" fontSize="11" fill="#8D8D99" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif">0</text>
                
                {/* X-axis Labels */}
                <text x="69.3461" y="294.194" fontSize="11" fill="#8D8D99" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif">Jan</text>
                <text x="131.486" y="294.008" fontSize="11" fill="#8D8D99" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif">Feb</text>
                <text x="196.37" y="294.008" fontSize="11" fill="#8D8D99" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif">Mar</text>
                <text x="261.653" y="294.008" fontSize="11" fill="#8D8D99" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif">Apr</text>
                <text x="325.539" y="294.008" fontSize="11" fill="#8D8D99" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif">May</text>
                <text x="395.355" y="294.194" fontSize="11" fill="#8D8D99" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif">Jun</text>
                <text x="463.327" y="294.194" fontSize="11" fill="#8D8D99" fontFamily="-apple-system, BlinkMacSystemFont, 'Segue UI', system-ui, sans-serif">Jul</text>
                
                {/* Bar Chart Data - Interactive Bars */}
                <g className="chart-bars">
                  {/* January - Value: 5 */}
                  <rect 
                    x="60.0775" 
                    y="234.528" 
                    width="55.065" 
                    height="21.2859" 
                    rx="10.643" 
                    fill="#83A9FE"
                    className="chart-bar"
                    data-month="Jan"
                    data-value="5"
                    onMouseEnter={(e) => handleBarHover(e, 'Jan', 5)}
                    onMouseLeave={handleBarLeave}
                    style={{cursor: 'pointer'}}
                  />
                  
                  {/* February - Value: 25 */}
                  <rect 
                    x="123.251" 
                    y="131.783" 
                    width="55.065" 
                    height="124.031" 
                    rx="12.1634" 
                    fill="#83A9FE"
                    className="chart-bar"
                    data-month="Feb"
                    data-value="25"
                    onMouseEnter={(e) => handleBarHover(e, 'Feb', 25)}
                    onMouseLeave={handleBarLeave}
                    style={{cursor: 'pointer'}}
                  />
                  
                  {/* March - Value: 15 */}
                  <rect 
                    x="186.425" 
                    y="185.077" 
                    width="55.065" 
                    height="70.7364" 
                    rx="12.1634" 
                    fill="#83A9FE"
                    className="chart-bar"
                    data-month="Mar"
                    data-value="15"
                    onMouseEnter={(e) => handleBarHover(e, 'Mar', 15)}
                    onMouseLeave={handleBarLeave}
                    style={{cursor: 'pointer'}}
                  />
                  
                  {/* April - Value: 23 */}
                  <rect 
                    x="249.599" 
                    y="139.535" 
                    width="55.065" 
                    height="116.279" 
                    rx="12.1634" 
                    fill="#83A9FE"
                    className="chart-bar"
                    data-month="Apr"
                    data-value="23"
                    onMouseEnter={(e) => handleBarHover(e, 'Apr', 23)}
                    onMouseLeave={handleBarLeave}
                    style={{cursor: 'pointer'}}
                  />
                  
                  {/* May - Value: 35 */}
                  <rect 
                    x="312.773" 
                    y="85.2713" 
                    width="55.065" 
                    height="170.543" 
                    rx="12.1634" 
                    fill="#83A9FE"
                    className="chart-bar"
                    data-month="May"
                    data-value="35"
                    onMouseEnter={(e) => handleBarHover(e, 'May', 35)}
                    onMouseLeave={handleBarLeave}
                    style={{cursor: 'pointer'}}
                  />
                  
                  {/* June - Value: 25 */}
                  <rect 
                    x="375.947" 
                    y="131.783" 
                    width="55.065" 
                    height="124.031" 
                    rx="12.1634" 
                    fill="#83A9FE"
                    className="chart-bar"
                    data-month="Jun"
                    data-value="25"
                    onMouseEnter={(e) => handleBarHover(e, 'Jun', 25)}
                    onMouseLeave={handleBarLeave}
                    style={{cursor: 'pointer'}}
                  />
                  
                  {/* July - Value: 37 (Highlighted) */}
                  <rect 
                    x="439.121" 
                    y="72.6744" 
                    width="55.065" 
                    height="172.14" 
                    rx="12.1634" 
                    fill="url(#barGradientFigma)"
                    className="chart-bar chart-bar-highlighted"
                    data-month="Jul"
                    data-value="37"
                    onMouseEnter={(e) => handleBarHover(e, 'Jul', 37)}
                    onMouseLeave={handleBarLeave}
                    style={{cursor: 'pointer'}}
                  />
                </g>
                
                {/* Tooltip - Shows on hover */}
                {hoveredBar && (
                  <g className="chart-tooltip">
                    <rect 
                      x={hoveredBar.x - 42} 
                      y={hoveredBar.y - 58} 
                      width="84.2558" 
                      height="47.3798" 
                      rx="7.75194" 
                      fill="#121212"
                      filter="url(#tooltipShadow)"
                      className="tooltip-bg"
                    />
                    <rect 
                      x={hoveredBar.x - 42 + 0.484} 
                      y={hoveredBar.y - 58 + 0.484} 
                      width="83.2868" 
                      height="46.4109" 
                      rx="7.26744" 
                      stroke="#C1C1C1" 
                      strokeOpacity="0.24" 
                      strokeWidth="0.968992"
                      fill="none"
                    />
                    <text 
                      x={hoveredBar.x} 
                      y={hoveredBar.y - 35} 
                      fontSize="12" 
                      fill="white" 
                      textAnchor="middle"
                      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
                    >
                      {hoveredBar.month}
                    </text>
                    <text 
                      x={hoveredBar.x} 
                      y={hoveredBar.y - 20} 
                      fontSize="11" 
                      fill="#DFDFF2" 
                      textAnchor="middle"
                      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
                    >
                      Reports: {hoveredBar.value}
                    </text>
                  </g>
                )}
                
                {/* Active Indicator Dot for July */}
                <circle 
                  cx="472.407" 
                  cy="67.7287" 
                  r="4.84496" 
                  fill="white" 
                  stroke="#03A9F5" 
                  strokeWidth="1.93798"
                  className="chart-indicator-dot"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Generate New Report Section */}
        <div className="em-reports-generate-section">
          <div className="em-reports-generate-header">
            <div className="em-reports-generate-icon">
             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.7038 17.4074V10.6699C13.7038 10.4173 13.9185 10.2126 14.1667 10.2126C14.4224 10.2126 14.6297 10.4122 14.6297 10.6699V17.4074H15.5625C16.5742 17.4074 17.4075 16.5765 17.4075 15.5624V4.43748C17.4075 3.42583 16.5766 2.5925 15.5625 2.5925H4.43762C3.42596 2.5925 2.59263 3.42339 2.59263 4.43748V15.5624C2.59263 16.5741 3.42352 17.4074 4.43762 17.4074H5.37047V12.9919C5.37047 12.7313 5.58519 12.52 5.83341 12.52C6.08906 12.52 6.29636 12.7253 6.29636 12.9919V17.4074H8.14822V8.3649C8.14822 8.11111 8.36294 7.90544 8.61116 7.90544C8.86693 7.90544 9.07422 8.10354 9.07422 8.3649V17.4074H10.926V4.9051C10.926 4.65073 11.1408 4.44448 11.389 4.44448C11.6447 4.44448 11.852 4.65095 11.852 4.9051V17.4074H13.7038ZM1.66669 4.43754C1.66669 2.90726 2.91936 1.66667 4.43756 1.66667H15.5625C17.0928 1.66667 18.3334 2.91934 18.3334 4.43754V15.5625C18.3334 17.0928 17.0807 18.3333 15.5625 18.3333H4.43756C2.90727 18.3333 1.66669 17.0807 1.66669 15.5625V4.43754Z" fill="white"/>
</svg>

            </div>
            <div>
              <h3 className="em-reports-generate-title">Generate New Report</h3>
              <p className="em-reports-generate-subtitle">Create custom reports with flexible parameters</p>
            </div>
          </div>
          <div className="em-reports-generate-controls">
            <div className="em-reports-generate-inputs">
              <div className="em-reports-generate-field">
                <label className="em-reports-generate-label">Report Type</label>
                <select 
                  value={reportType} 
                  onChange={(e) => setReportType(e.target.value)}
                  className="em-reports-generate-select"
                >
                  <option value="">Select report type</option>
                  <option value="funding">Funding Analytics</option>
                  <option value="investor">Investor Activity</option>
                  <option value="startup">Startup Performance</option>
                  <option value="compliance">Compliance Report</option>
                </select>
              </div>
              <div className="em-reports-generate-field">
                <label className="em-reports-generate-label">Date Range</label>
                <select 
                  value={dateRange} 
                  onChange={(e) => setDateRange(e.target.value)}
                  className="em-reports-generate-select"
                >
                  <option value="">Select date range</option>
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </div>
              <div className="em-reports-generate-field">
                <label className="em-reports-generate-label">Export Format</label>
                <select 
                  value={exportFormat} 
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="em-reports-generate-select"
                >
                  <option value="">Select format</option>
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                </select>
              </div>
            </div>
            <button 
              className="em-reports-generate-btn" 
              onClick={handleGenerate}
              disabled={!reportType || !dateRange || !exportFormat}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 10V2" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 10V12.6667C14 13.0203 13.8595 13.3595 13.6095 13.6095C13.3594 13.8596 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8596 2.39052 13.6095C2.14048 13.3595 2 13.0203 2 12.6667V10" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.66666 6.6667L7.99999 10L11.3333 6.6667" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Generate Report
            </button>
          </div>
        </div>

        {/* Recent Reports Table */}
        <div className="em-reports-table-section">
          <div className="em-reports-table-header">
            <div>
              <div className="em-reports-table-title-container">
                <h3 className="em-reports-table-title">Recent Reports</h3>
                <div className="em-reports-info-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7.91351" cy="7.91351" r="7.91351" fill="#AFAFAF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.2041 5.18554C9.32774 4.96915 9.3973 4.71799 9.3973 4.45137C9.3973 3.6322 8.73269 2.96759 7.91351 2.96759C7.09434 2.96759 6.42973 3.6322 6.42973 4.45137C6.42973 5.27055 7.09434 5.93516 7.91351 5.93516C8.46607 5.93516 8.94907 5.63376 9.2041 5.18554ZM6.92432 6.92435H7.41892H8.40811C8.95487 6.92435 9.3973 7.36678 9.3973 7.91354V8.90273V12.8595C9.3973 13.4062 8.95487 13.8487 8.40811 13.8487C7.86135 13.8487 7.41892 13.4062 7.41892 12.8595V9.64462C7.41892 9.23503 7.08661 8.90273 6.67703 8.90273C6.26744 8.90273 5.93513 8.57042 5.93513 8.16083V7.91354C5.93513 7.56577 6.11481 7.25858 6.38529 7.08277C6.53985 6.98231 6.72533 6.92435 6.92432 6.92435Z" fill="white"/>
                  </svg>
                  <div className="em-reports-info-tooltip">
                    View and download your previously generated reports. Reports remain available for 30 days after generation.
                  </div>
                </div>
              </div>
              <p className="em-reports-table-subtitle">Previously generated reports available for download</p>
            </div>
          </div>

          <div className="em-reports-table-controls-figma">
            <div className="em-reports-status-dropdown-figma">
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="em-reports-status-select-figma"
              >
                <option value="All">Status</option>
                <option value="PDF">PDF</option>
                <option value="Excel">Excel</option>
                <option value="CSV">CSV</option>
              </select>
              <div className="em-reports-status-arrows-figma">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 5.5L10.5 2.5L13.5 5.5" stroke="#121212" strokeWidth="1.13" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.5 10.5L10.5 13.5L7.5 10.5" stroke="#121212" strokeWidth="1.13" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="em-reports-search-container-figma">
              <div className="em-reports-search-icon-figma">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="7.33333" cy="7.33333" r="5.33333" stroke="#121212" strokeWidth="1.13" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 14L11.1 11.1" stroke="#121212" strokeWidth="1.13" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="em-reports-search-input-figma"
              />
            </div>
          </div>

          <div className="em-reports-table-wrapper">
            <table className="em-reports-table">
              <thead>
                <tr>
                  <th>REPORT NAME</th>
                  <th>TYPE</th>
                  <th>GENERATED BY</th>
                  <th>DATE</th>
                  <th>FORMAT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="em-reports-name-cell">
                        <div className="em-reports-document-icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="24" height="24" rx="5" fill="#1C1C1F"/>
<path d="M13.3333 5.33331H7.99999C7.64637 5.33331 7.30723 5.47379 7.05718 5.72384C6.80713 5.97389 6.66666 6.31302 6.66666 6.66665V17.3333C6.66666 17.6869 6.80713 18.0261 7.05718 18.2761C7.30723 18.5262 7.64637 18.6666 7.99999 18.6666H16C16.3536 18.6666 16.6928 18.5262 16.9428 18.2761C17.1928 18.0261 17.3333 17.6869 17.3333 17.3333V9.33331L13.3333 5.33331Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.3333 5.33331V9.33331H17.3333" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6667 12.6667H9.33334" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6667 15.3333H9.33334" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.6667 10H10H9.33334" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                        </div>
                        <span className="em-reports-name-text">{item.name}</span>
                      </div>
                    </td>
                    <td className="em-reports-type-cell">{item.type}</td>
                    <td className="em-reports-generated-cell">{item.generatedBy}</td>
                    <td className="em-reports-date-cell">{item.date}</td>
                    <td>
                      <span className="em-reports-format-badge">{item.format}</span>
                    </td>
                    <td>
                      <div className="em-reports-action-buttons">
                        <button className="em-reports-action-btn em-reports-download-btn" title="Download Report">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4.66667 6.66667L8 10L11.3333 6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 10V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button className="em-reports-action-btn em-reports-menu-btn" title="More Actions">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
                            <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                            <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="em-reports-table-footer">
            <div className="em-reports-table-info">
              Showing <span className="em-reports-table-info-highlight">{String(filteredData.length).padStart(2, '0')}</span> / 15 Results
            </div>
            <div className="em-reports-pagination">
              <button 
                className="em-reports-pagination-btn em-reports-pagination-prev"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                title="Previous page"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className={`em-reports-pagination-btn ${currentPage === 1 ? 'em-reports-pagination-active' : ''}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button 
                className={`em-reports-pagination-btn ${currentPage === 2 ? 'em-reports-pagination-active' : ''}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button 
                className={`em-reports-pagination-btn ${currentPage === 3 ? 'em-reports-pagination-active' : ''}`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
              <span className="em-reports-pagination-dots">...</span>
              <button 
                className={`em-reports-pagination-btn ${currentPage === 10 ? 'em-reports-pagination-active' : ''}`}
                onClick={() => setCurrentPage(10)}
              >
                10
              </button>
              <button 
                className="em-reports-pagination-btn em-reports-pagination-next"
                onClick={() => setCurrentPage(prev => Math.min(10, prev + 1))}
                disabled={currentPage === 10}
                title="Next page"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="em-reports-disclaimer">
            Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
          </div>
        </div>
      </main>
    </div>
  );
}
