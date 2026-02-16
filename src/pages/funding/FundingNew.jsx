import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import "./FundingNew.css";

export default function Funding({ isDarkMode, toggleTheme, sidebarCollapsed }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMenu, setShowMenu] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const chartRef = useRef(null);

  const fundingData = [
    {
      id: 1,
      company: "CureCloud",
      initial: "C",
      investor: "Ahmed Al-Rashid",
      amount: "250",
      stage: "Series A",
      status: "Completes",
      date: "2025-08-15"
    },
    {
      id: 2,
      company: "SukunPay",
      initial: "S",
      investor: "John Doe",
      amount: "250",
      stage: "Seed",
      status: "In progress",
      date: "2025-08-10"
    },
    {
      id: 3,
      company: "AqsaAI",
      initial: "A",
      investor: "Fatima Hassan",
      amount: "250",
      stage: "Series B",
      status: "Pending",
      date: "2025-08-05"
    },
    {
      id: 4,
      company: "HalalFoods INC",
      initial: "H",
      investor: "Sarah",
      amount: "250",
      stage: "Pre-seed",
      status: "Completes",
      date: "2025-07-28"
    },
    {
      id: 5,
      company: "GreenTech Solutions",
      initial: "G",
      investor: "Sarah Al-Mansoori",
      amount: "250",
      stage: "Seed",
      status: "Pending",
      date: "2025-07-20"
    }
  ];

  const filteredData = fundingData.filter(item => {
    const matchesSearch = item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.investor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === "All" || item.stage === stageFilter;
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStage && matchesStatus;
  });

  const getCompanyInitials = (company) => {
    return company.initial || company.company.charAt(0).toUpperCase();
  };

  const getCompanyColor = (id) => {
    const colors = ['#3B5998', '#6B46C1', '#3B5998', '#6B46C1', '#10B981'];
    return colors[(id - 1) % colors.length];
  };

  return (
    <div className="em-funding-container">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />
      
      <main className="em-funding-main">
        {/* Page Header */}
        <div className="em-funding-page-header">
          <div>
            <h1 className="em-funding-title">Funding Analytics</h1>
            <p className="em-funding-subtitle">Monitor funding activities and investment trends</p>
          </div>
        </div>

        {/* Stats Cards - 4 in a row */}
        <div className="em-funding-stats">
          <div className="em-funding-stat-card">
            <div className="em-funding-stat-icon em-funding-stat-icon-green">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2V22" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </div>
            <div className="em-funding-stat-content">
              <div className="em-funding-stat-meta">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_7105)">
<path d="M9.33333 4.08331H12.8333V7.58331" stroke="#007A55" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.8333 4.08331L7.87501 9.04165L4.95834 6.12498L1.16667 9.91665" stroke="#007A55" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_3_7105">
<rect width="14" height="14" fill="white"/>
</clipPath>
</defs>
</svg>

                <span className="em-funding-stat-trend">+7%</span>
              </div>
              <div className="em-funding-stat-label">TOTAL FUNDING RAISED</div>
              <div className="em-funding-stat-value em-funding-stat-value-green">$3.27M</div>
              <div className="em-funding-stat-footer">
                <div className="em-funding-stat-bar em-funding-stat-bar-green-bg">
                  <div className="em-funding-stat-bar-fill em-funding-stat-bar-green" style={{width: '70%'}}></div>
                </div>
                <span className="em-funding-stat-subtext">from last month</span>
              </div>
            </div>
          </div>

          <div className="em-funding-stat-card">
            <div className="em-funding-stat-icon em-funding-stat-icon-blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 17L13 19C13.197 19.197 13.4308 19.3532 13.6882 19.4598C13.9456 19.5665 14.2214 19.6213 14.5 19.6213C14.7786 19.6213 15.0544 19.5665 15.3118 19.4598C15.5692 19.3532 15.803 19.197 16 19C16.197 18.803 16.3532 18.5692 16.4598 18.3118C16.5665 18.0544 16.6213 17.7786 16.6213 17.5C16.6213 17.2214 16.5665 16.9456 16.4598 16.6882C16.3532 16.4308 16.197 16.197 16 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 14L16.5 16.5C16.8978 16.8978 17.4374 17.1213 18 17.1213C18.5626 17.1213 19.1022 16.8978 19.5 16.5C19.8978 16.1022 20.1213 15.5626 20.1213 15C20.1213 14.4374 19.8978 13.8978 19.5 13.5L15.62 9.62002C15.0575 9.05821 14.295 8.74265 13.5 8.74265C12.705 8.74265 11.9425 9.05821 11.38 9.62002L10.5 10.5C10.1022 10.8978 9.56261 11.1213 9 11.1213C8.43739 11.1213 7.89782 10.8978 7.5 10.5C7.10217 10.1022 6.87868 9.56262 6.87868 9.00002C6.87868 8.43741 7.10217 7.89784 7.5 7.50002L10.31 4.69002C11.2222 3.78016 12.4119 3.20057 13.6906 3.04299C14.9694 2.88541 16.2642 3.15885 17.37 3.82002L17.84 4.10002C18.2658 4.357 18.772 4.44613 19.26 4.35002L21 4.00002" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21 3L22 14H20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 3L2 14L8.5 20.5C8.89782 20.8978 9.43739 21.1213 10 21.1213C10.5626 21.1213 11.1022 20.8978 11.5 20.5C11.8978 20.1022 12.1213 19.5626 12.1213 19C12.1213 18.4374 11.8978 17.8978 11.5 17.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 4H11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


            </div>
            <div className="em-funding-stat-content">
              <div className="em-funding-stat-meta">
                <span className="em-funding-stat-period">3 this week</span>
              </div>
              <div className="em-funding-stat-label">ACTIVE DEALS</div>
              <div className="em-funding-stat-value em-funding-stat-value-blue">8</div>
              <div className="em-funding-stat-footer">
                <div className="em-funding-stat-bar em-funding-stat-bar-blue-bg">
                  <div className="em-funding-stat-bar-fill em-funding-stat-bar-blue" style={{width: '60%'}}></div>
                </div>
                <span className="em-funding-stat-subtext">ongoing negotiations</span>
              </div>
            </div>
          </div>

          <div className="em-funding-stat-card">
            <div className="em-funding-stat-icon em-funding-stat-icon-purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 17H14V19C14 19.2652 14.1054 19.5196 14.2929 19.7071C14.4804 19.8946 14.7348 20 15 20H17C17.2652 20 17.5196 19.8946 17.7071 19.7071C17.8946 19.5196 18 19.2652 18 19V16C18.4658 15.8449 18.8891 15.5834 19.2363 15.2363C19.5834 14.8891 19.8449 14.4658 20 14H21C21.2652 14 21.5196 13.8946 21.7071 13.7071C21.8946 13.5196 22 13.2652 22 13V11C22 10.7348 21.8946 10.4804 21.7071 10.2929C21.5196 10.1054 21.2652 10 21 10H20C20 9.22377 19.8193 8.45821 19.4721 7.76393C19.125 7.06966 18.621 6.46574 18 6V3C17.379 3 16.7666 3.14458 16.2111 3.42229C15.6557 3.7 15.1726 4.10322 14.8 4.6L14.5 5H11C9.4087 5 7.88258 5.63214 6.75736 6.75736C5.63214 7.88258 5 9.4087 5 11V12C5 12.7762 5.18073 13.5418 5.52786 14.2361C5.875 14.9303 6.37902 15.5343 7 16V19C7 19.2652 7.10536 19.5196 7.29289 19.7071C7.48043 19.8946 7.73478 20 8 20H10C10.2652 20 10.5196 19.8946 10.7071 19.7071C10.8946 19.5196 11 19.2652 11 19V17Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 10H16.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2 8V9C2 9.53043 2.21071 10.0391 2.58579 10.4142C2.96086 10.7893 3.46957 11 4 11H5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </div>
            <div className="em-funding-stat-content">
              <div className="em-funding-stat-meta">
                <span className="em-funding-stat-period">Q3 2025</span>
              </div>
              <div className="em-funding-stat-label">AVERAGE DEAL SIZE</div>
              <div className="em-funding-stat-value em-funding-stat-value-purple">$408K</div>
              <div className="em-funding-stat-footer">
                <div className="em-funding-stat-bar em-funding-stat-bar-purple-bg">
                  <div className="em-funding-stat-bar-fill em-funding-stat-bar-purple" style={{width: '75%'}}></div>
                </div>
                <span className="em-funding-stat-subtext">from last quarter</span>
              </div>
            </div>
          </div>

          <div className="em-funding-stat-card">
            <div className="em-funding-stat-icon em-funding-stat-icon-blue2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </div>
            <div className="em-funding-stat-content">
              <div className="em-funding-stat-meta em-funding-stat-meta-indigo">
               <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_7182)">
<path d="M9.33331 4.08331H12.8333V7.58331" stroke="#432DD7" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.8334 4.08331L7.87502 9.04165L4.95835 6.12498L1.16669 9.91665" stroke="#432DD7" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_3_7182">
<rect width="14" height="14" fill="white"/>
</clipPath>
</defs>
</svg>

                <span className="em-funding-stat-trend em-funding-stat-trend-indigo">+3%</span>
              </div>
              <div className="em-funding-stat-label">SUCCESS RATE</div>
              <div className="em-funding-stat-value em-funding-stat-value-blue2">85%</div>
              <div className="em-funding-stat-footer">
                <div className="em-funding-stat-bar em-funding-stat-bar-blue-bg">
                  <div className="em-funding-stat-bar-fill em-funding-stat-bar-blue" style={{width: '85%'}}></div>
                </div>
                <span className="em-funding-stat-subtext">from last year</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="em-funding-charts">
          <div className="em-funding-chart-card">
            <div className="em-funding-chart-header">
              <div>
                <h3 className="em-funding-chart-title">Monthly Funding Trends ($K)</h3>
                <p className="em-funding-chart-subtitle">Funding growth over time</p>
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
            <div className="em-funding-chart-content">
              <svg width="532" height="276" viewBox="0 0 532 276" fill="none" xmlns="http://www.w3.org/2000/svg" className="em-funding-line-chart" preserveAspectRatio="xMidYMid meet">
                <g clipPath="url(#clip0_funding_trends)">
                  {/* Horizontal grid lines */}
                  <path d="M63.9448 241.023H526.315" stroke="#F0F0F0" strokeWidth="0.983767" strokeDasharray="2.95 2.95"/>
                  <path d="M63.9448 181.997H526.315" stroke="#F0F0F0" strokeWidth="0.983767" strokeDasharray="2.95 2.95"/>
                  <path d="M63.9448 122.971H526.315" stroke="#F0F0F0" strokeWidth="0.983767" strokeDasharray="2.95 2.95"/>
                  <path d="M63.9448 63.9448H526.315" stroke="#F0F0F0" strokeWidth="0.983767" strokeDasharray="2.95 2.95"/>
                  <path d="M63.9448 4.91887H526.315" stroke="#F0F0F0" strokeWidth="0.983767" strokeDasharray="2.95 2.95"/>
                  
                  {/* X-axis */}
                  <path d="M63.9449 241.023H526.315" stroke="#94A3B8" strokeWidth="0.983767"/>
                  
                  {/* X-axis labels with ticks */}
                  <path d="M63.9449 246.926V241.023" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="56.6725" y="257.614" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif">Jan</text>
                  
                  <path d="M129.998 246.926V241.023" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="120.82" y="257.614" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif">Feb</text>
                  
                  <path d="M196.051 246.926V241.023" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="186.6" y="257.614" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif">Mar</text>
                  
                  <path d="M262.104 246.926V241.023" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="252.665" y="257.614" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif">Apr</text>
                  
                  <path d="M328.157 246.926V241.023" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="317.697" y="257.614" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif">May</text>
                  
                  <path d="M394.21 246.926V241.023" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="386.762" y="257.614" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif">Jun</text>
                  
                  <path d="M460.262 246.926V241.023" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="454.891" y="257.614" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif">Jul</text>
                  
                  <path d="M526.315 246.926V241.023" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="509.951" y="257.614" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif">Aug</text>
                  
                  {/* Y-axis */}
                  <path d="M63.9446 4.91887V241.023" stroke="#94A3B8" strokeWidth="0.983767"/>
                  
                  {/* Y-axis labels with ticks */}
                  <path d="M58.0418 241.023H63.9444" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="52.1171" y="245.552" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif" textAnchor="end">0</text>
                  
                  <path d="M58.0418 181.997H63.9444" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="45.4016" y="186.526" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif" textAnchor="end">55</text>
                  
                  <path d="M58.0418 122.971H63.9444" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="42.5272" y="127.356" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif" textAnchor="end">110</text>
                  
                  <path d="M58.042 63.945H63.9446" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="39.8761" y="68.3304" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif" textAnchor="end">165</text>
                  
                  <path d="M58.042 4.91887H63.9446" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="34.302" y="13.2395" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif" textAnchor="end">220</text>
                  
                  {/* Line path - smooth curve */}
                  <path className="em-funding-chart-line" d="M63.9448 149.801C85.9625 147.118 107.98 144.435 129.998 139.07C152.016 133.703 174.033 123.865 196.051 117.605C218.069 111.345 240.086 106.873 262.104 101.507C284.122 96.1409 306.138 91.6697 328.156 85.409C350.174 79.1493 372.191 71.1001 394.209 63.9451C416.227 56.7902 438.244 50.5305 460.262 42.4813C482.28 34.4321 504.298 25.0421 526.315 15.651" stroke="#00B031" strokeWidth="2.9513"/>
                  
                  {/* Data points with stroke and fill */}
                  <path d="M63.9448 153.736C66.1181 153.736 67.8798 151.974 67.8798 149.801C67.8798 147.628 66.1181 145.866 63.9448 145.866C61.7715 145.866 60.0097 147.628 60.0097 149.801C60.0097 151.974 61.7715 153.736 63.9448 153.736Z" fill="#10B981" stroke="#10B981" strokeWidth="1.96753" className="em-funding-chart-point"/>
                  
                  <path d="M129.998 143.004C132.171 143.004 133.933 141.242 133.933 139.069C133.933 136.896 132.171 135.134 129.998 135.134C127.825 135.134 126.063 136.896 126.063 139.069C126.063 141.242 127.825 143.004 129.998 143.004Z" fill="#10B981" stroke="#10B981" strokeWidth="1.96753" className="em-funding-chart-point"/>
                  
                  <path d="M196.05 121.54C198.224 121.54 199.985 119.778 199.985 117.605C199.985 115.432 198.224 113.67 196.05 113.67C193.877 113.67 192.115 115.432 192.115 117.605C192.115 119.778 193.877 121.54 196.05 121.54Z" fill="#10B981" stroke="#10B981" strokeWidth="1.96753" className="em-funding-chart-point"/>
                  
                  <path d="M262.103 105.442C264.277 105.442 266.039 103.68 266.039 101.507C266.039 99.3337 264.277 97.5719 262.103 97.5719C259.93 97.5719 258.168 99.3337 258.168 101.507C258.168 103.68 259.93 105.442 262.103 105.442Z" fill="#10B981" stroke="#10B981" strokeWidth="1.96753" className="em-funding-chart-point"/>
                  
                  <path d="M328.157 89.3442C330.33 89.3442 332.092 87.5824 332.092 85.4091C332.092 83.2359 330.33 81.4741 328.157 81.4741C325.983 81.4741 324.221 83.2359 324.221 85.4091C324.221 87.5824 325.983 89.3442 328.157 89.3442Z" fill="#10B981" stroke="#10B981" strokeWidth="1.96753" className="em-funding-chart-point"/>
                  
                  <path d="M394.21 67.88C396.383 67.88 398.145 66.1182 398.145 63.9449C398.145 61.7716 396.383 60.0098 394.21 60.0098C392.036 60.0098 390.275 61.7716 390.275 63.9449C390.275 66.1182 392.036 67.88 394.21 67.88Z" fill="#10B981" stroke="#10B981" strokeWidth="1.96753" className="em-funding-chart-point"/>
                  
                  <path d="M460.262 46.416C462.435 46.416 464.197 44.6542 464.197 42.4809C464.197 40.3077 462.435 38.5459 460.262 38.5459C458.089 38.5459 456.327 40.3077 456.327 42.4809C456.327 44.6542 458.089 46.416 460.262 46.416Z" fill="#10B981" stroke="#10B981" strokeWidth="1.96753" className="em-funding-chart-point"/>
                  
                  <path d="M526.315 19.5861C528.488 19.5861 530.25 17.8243 530.25 15.651C530.25 13.4777 528.488 11.7159 526.315 11.7159C524.142 11.7159 522.38 13.4777 522.38 15.651C522.38 17.8243 524.142 19.5861 526.315 19.5861Z" fill="#10B981" stroke="#10B981" strokeWidth="1.96753" className="em-funding-chart-point"/>
                </g>
                <defs>
                  <clipPath id="clip0_funding_trends">
                    <rect width="531.234" height="275.455" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>

          <div className="em-funding-chart-card em-investment-deals-card">
            <div className="em-funding-chart-header">
              <div>
                <h3 className="em-funding-chart-title">Investment Deals Count</h3>
                <p className="em-funding-chart-subtitle">Number of deals per month</p>
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
            <div className="em-funding-chart-content">
              <svg width="532" height="276" viewBox="0 0 532 276" fill="none" xmlns="http://www.w3.org/2000/svg" className="em-investment-deals-chart" preserveAspectRatio="xMidYMid meet" ref={chartRef}>
                <g clipPath="url(#clip0_3_7293)">
                  {/* Horizontal gridlines */}
                  <path d="M63.9448 241.023H526.315" stroke="#F0F0F0" strokeWidth="0.983767" strokeDasharray="2.95 2.95"/>
                  <path d="M63.9448 181.997H526.315" stroke="#F0F0F0" strokeWidth="0.983767" strokeDasharray="2.95 2.95"/>
                  <path d="M63.9448 122.971H526.315" stroke="#F0F0F0" strokeWidth="0.983767" strokeDasharray="2.95 2.95"/>
                  <path d="M63.9448 63.9448H526.315" stroke="#F0F0F0" strokeWidth="0.983767" strokeDasharray="2.95 2.95"/>
                  <path d="M63.9448 4.91887H526.315" stroke="#F0F0F0" strokeWidth="0.983767" strokeDasharray="2.95 2.95"/>
                  
                  {/* X-axis */}
                  <path d="M63.9449 241.023H526.315" stroke="#94A3B8" strokeWidth="0.983767"/>
                  
                  {/* X-axis labels with ticks */}
                  <path d="M63.9449 246.926V241.023" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="56.6725" y="257.614" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif">Jan</text>
                  
                  <path d="M129.998 246.926V241.023" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="120.82" y="257.614" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif">Feb</text>
                  
                  <path d="M196.051 246.926V241.023" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="186.6" y="257.614" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif">Mar</text>
                  
                  <path d="M262.104 246.926V241.023" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="252.665" y="257.614" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif">Apr</text>
                  
                  <path d="M328.157 246.926V241.023" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="317.697" y="257.614" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif">May</text>
                  
                  <path d="M394.21 246.926V241.023" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="386.762" y="257.614" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif">Jun</text>
                  
                  <path d="M460.262 246.926V241.023" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="454.891" y="257.614" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif">Jul</text>
                  
                  <path d="M526.315 246.926V241.023" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="509.951" y="257.614" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif">Aug</text>
                  
                  {/* Y-axis */}
                  <path d="M63.9451 4.91887V241.023" stroke="#94A3B8" strokeWidth="0.983767"/>
                  
                  {/* Y-axis labels with ticks */}
                  <path d="M58.0423 241.023H63.9449" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="52.1176" y="245.552" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif" textAnchor="end">0</text>
                  
                  <path d="M58.0423 181.997H63.9449" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="50.0587" y="186.382" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif" textAnchor="end">2</text>
                  
                  <path d="M58.0423 122.971H63.9449" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="53.6197" y="127.356" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif" textAnchor="end">4</text>
                  
                  <path d="M58.0423 63.945H63.9449" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="52.5816" y="68.4744" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif" textAnchor="end">6</text>
                  
                  <path d="M58.0425 4.91887H63.9451" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <text x="52.5521" y="13.3835" fontSize="11" fill="#94A3B8" fontFamily="Inter, sans-serif" textAnchor="end">8</text>
                  
                  {/* Area fill with gradient */}
                  <path d="M63.9448 152.484C85.9625 142.646 107.98 132.809 129.998 122.971C152.016 113.133 174.033 93.4579 196.051 93.4579C218.069 93.4579 240.086 122.971 262.104 122.971C284.122 122.971 306.138 63.9449 328.156 63.9449C350.174 63.9449 372.191 93.4579 394.209 93.4579C416.227 93.4579 438.245 49.1884 460.262 34.4319C482.28 19.6754 504.298 12.2971 526.315 4.91887V241.023C504.298 241.023 482.28 241.023 460.262 241.023C438.245 241.023 416.227 241.023 394.209 241.023C372.191 241.023 350.174 241.023 328.156 241.023C306.138 241.023 284.122 241.023 262.104 241.023C240.086 241.023 218.069 241.023 196.051 241.023C174.033 241.023 152.016 241.023 129.998 241.023C107.98 241.023 85.9625 241.023 63.9448 241.023V152.484Z" fill="url(#paint0_linear_3_7293)" fillOpacity="0.6"/>
                  
                  {/* Line path */}
                  <path className="em-investment-line" d="M63.9448 152.484C85.9625 142.646 107.98 132.809 129.998 122.971C152.016 113.133 174.033 93.4579 196.051 93.4579C218.069 93.4579 240.086 122.971 262.104 122.971C284.122 122.971 306.138 63.9449 328.156 63.9449C350.174 63.9449 372.191 93.4579 394.209 93.4579C416.227 93.4579 438.245 49.1884 460.262 34.4319C482.28 19.6754 504.298 12.2971 526.315 4.91887" stroke="#6366F1" strokeWidth="1.96753"/>
                  
                  {/* Interactive data points */}
                  <circle cx="63.9448" cy="152.484" r="4" fill="#6366F1" className="em-chart-point" 
                    onMouseEnter={() => setHoveredPoint({month: 'Jan', value: 3})}
                    onMouseLeave={() => setHoveredPoint(null)}
                    style={{cursor: 'pointer', transition: 'r 0.2s'}}/>
                  <circle cx="129.998" cy="122.971" r="4" fill="#6366F1" className="em-chart-point"
                    onMouseEnter={() => setHoveredPoint({month: 'Feb', value: 4})}
                    onMouseLeave={() => setHoveredPoint(null)}
                    style={{cursor: 'pointer', transition: 'r 0.2s'}}/>
                  <circle cx="196.051" cy="93.4579" r="4" fill="#6366F1" className="em-chart-point"
                    onMouseEnter={() => setHoveredPoint({month: 'Mar', value: 5})}
                    onMouseLeave={() => setHoveredPoint(null)}
                    style={{cursor: 'pointer', transition: 'r 0.2s'}}/>
                  <circle cx="262.104" cy="122.971" r="4" fill="#6366F1" className="em-chart-point"
                    onMouseEnter={() => setHoveredPoint({month: 'Apr', value: 4})}
                    onMouseLeave={() => setHoveredPoint(null)}
                    style={{cursor: 'pointer', transition: 'r 0.2s'}}/>
                  <circle cx="328.156" cy="63.9449" r="4" fill="#6366F1" className="em-chart-point"
                    onMouseEnter={() => setHoveredPoint({month: 'May', value: 6})}
                    onMouseLeave={() => setHoveredPoint(null)}
                    style={{cursor: 'pointer', transition: 'r 0.2s'}}/>
                  <circle cx="394.209" cy="93.4579" r="4" fill="#6366F1" className="em-chart-point"
                    onMouseEnter={() => setHoveredPoint({month: 'Jun', value: 5})}
                    onMouseLeave={() => setHoveredPoint(null)}
                    style={{cursor: 'pointer', transition: 'r 0.2s'}}/>
                  <circle cx="460.262" cy="34.4319" r="4" fill="#6366F1" className="em-chart-point"
                    onMouseEnter={() => setHoveredPoint({month: 'Jul', value: 7})}
                    onMouseLeave={() => setHoveredPoint(null)}
                    style={{cursor: 'pointer', transition: 'r 0.2s'}}/>
                  <circle cx="526.315" cy="4.91887" r="4" fill="#6366F1" className="em-chart-point"
                    onMouseEnter={() => setHoveredPoint({month: 'Aug', value: 8})}
                    onMouseLeave={() => setHoveredPoint(null)}
                    style={{cursor: 'pointer', transition: 'r 0.2s'}}/>
                  
                  {/* Tooltip */}
                  {hoveredPoint && (
                    <g className="em-chart-tooltip">
                      <rect x={hoveredPoint.month === 'Jan' ? 40 : hoveredPoint.month === 'Feb' ? 105 : hoveredPoint.month === 'Mar' ? 171 : hoveredPoint.month === 'Apr' ? 237 : hoveredPoint.month === 'May' ? 303 : hoveredPoint.month === 'Jun' ? 369 : hoveredPoint.month === 'Jul' ? 435 : 485} 
                            y={hoveredPoint.month === 'Jan' ? 130 : hoveredPoint.month === 'Feb' ? 100 : hoveredPoint.month === 'Mar' ? 71 : hoveredPoint.month === 'Apr' ? 100 : hoveredPoint.month === 'May' ? 41 : hoveredPoint.month === 'Jun' ? 71 : hoveredPoint.month === 'Jul' ? 12 : -15}
                            width="65" 
                            height="32" 
                            rx="6" 
                            fill="#1F2937" 
                            fillOpacity="0.95"
                            filter="drop-shadow(0 2px 8px rgba(0,0,0,0.15))"/>
                      <text x={hoveredPoint.month === 'Jan' ? 72.5 : hoveredPoint.month === 'Feb' ? 137.5 : hoveredPoint.month === 'Mar' ? 203.5 : hoveredPoint.month === 'Apr' ? 269.5 : hoveredPoint.month === 'May' ? 335.5 : hoveredPoint.month === 'Jun' ? 401.5 : hoveredPoint.month === 'Jul' ? 467.5 : 517.5}
                            y={hoveredPoint.month === 'Jan' ? 145 : hoveredPoint.month === 'Feb' ? 115 : hoveredPoint.month === 'Mar' ? 86 : hoveredPoint.month === 'Apr' ? 115 : hoveredPoint.month === 'May' ? 56 : hoveredPoint.month === 'Jun' ? 86 : hoveredPoint.month === 'Jul' ? 27 : 0}
                            fontSize="11" 
                            fill="#fff" 
                            fontFamily="Inter, sans-serif" 
                            fontWeight="600"
                            textAnchor="middle"
                            dy="0.35em">
                        {hoveredPoint.month}: {hoveredPoint.value}
                      </text>
                    </g>
                  )}
                </g>
                <defs>
                  <linearGradient id="paint0_linear_3_7293" x1="63.9448" y1="4.91887" x2="63.9448" y2="241.023" gradientUnits="userSpaceOnUse">
                    <stop offset="0.05" stopColor="#6366F1" stopOpacity="0.3"/>
                    <stop offset="0.95" stopColor="#6366F1" stopOpacity="0"/>
                  </linearGradient>
                  <clipPath id="clip0_3_7293">
                    <rect width="531.234" height="275.455" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Recent Funding Deals Table */}
        <div className="em-funding-table-section">
          <div className="em-funding-table-header">
            <div>
              <div className="em-funding-table-title-row">
                <h3 className="em-funding-table-title">Recent Funding Deals</h3>
                <svg className="em-funding-info-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="7.91351" fill="#C1C1C1" fillOpacity="0.5"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.29 5.7126C9.413 5.4962 9.483 5.2451 9.483 4.9785C9.483 4.1593 8.818 3.4947 7.999 3.4947C7.18 3.4947 6.515 4.1593 6.515 4.9785C6.515 5.7976 7.18 6.4623 7.999 6.4623C8.552 6.4623 9.035 6.1609 9.29 5.7126ZM7.01 7.4514H7.505H8.494C9.04 7.4514 9.483 7.8939 9.483 8.4406V9.4298V13.3866C9.483 13.9333 9.04 14.3758 8.494 14.3758C7.947 14.3758 7.505 13.9333 7.505 13.3866V10.1717C7.505 9.7621 7.172 9.4298 6.763 9.4298C6.353 9.4298 6.021 9.0975 6.021 8.6879V8.4406C6.021 8.0929 6.2 7.7857 6.471 7.6099C6.625 7.5094 6.811 7.4514 7.01 7.4514Z" fill="white"/>
                </svg>
              </div>
              <p className="em-funding-table-subtitle">Latest investment transactions</p>
            </div>
          </div>

          <div className="em-funding-table-controls">
            <div className="em-funding-table-filters">
              <div className="em-funding-filter-dropdown">
                <select 
                  value={stageFilter} 
                  onChange={(e) => setStageFilter(e.target.value)}
                  className="em-funding-filter-select"
                >
                  <option value="All">Stage</option>
                  <option value="Pre-seed">Pre-seed</option>
                  <option value="Seed">Seed</option>
                  <option value="Series A">Series A</option>
                  <option value="Series B">Series B</option>
                </select>
              </div>
              <div className="em-funding-filter-dropdown">
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="em-funding-filter-select"
                >
                  <option value="All">Status</option>
                  <option value="Complete">Complete</option>
                  <option value="In progress">In progress</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="em-funding-search-box">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.59596 12.0957C9.81189 12.0957 12.419 9.48864 12.419 6.27271C12.419 3.05678 9.81189 0.449646 6.59596 0.449646C3.38003 0.449646 0.772903 3.05678 0.772903 6.27271C0.772903 9.48864 3.38003 12.0957 6.59596 12.0957Z" stroke="#121212" strokeWidth="1.12943" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.8749 13.5532L10.7078 10.3869" stroke="#121212" strokeWidth="1.12943" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="em-funding-search-input"
              />
            </div>
          </div>

          <div className="em-funding-table-wrapper">
            <table className="em-funding-table">
              <thead>
                <tr>
                  <th>COMPANY NAME</th>
                  <th>INVESTOR</th>
                  <th>AMOUNT ($K)</th>
                  <th>STAGE</th>
                  <th>STATUS</th>
                  <th>DATE</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="em-funding-company-cell">
                        <div 
                          className="em-funding-company-avatar"
                          style={{ backgroundColor: getCompanyColor(item.id) }}
                        >
                          {item.initial}
                        </div>
                        <span className="em-funding-company-name">{item.company}</span>
                      </div>
                    </td>
                    <td className="em-funding-investor-cell">{item.investor}</td>
                    <td className="em-funding-amount-cell">${item.amount}</td>
                    <td>
                      <span className={`em-funding-stage-badge em-funding-stage-${item.stage.toLowerCase().replace(' ', '-')}`}>
                        {item.stage}
                      </span>
                    </td>
                    <td>
                      <span className={`em-funding-status-badge em-funding-status-${item.status.toLowerCase().replace(' ', '-')}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="em-funding-date-cell">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="em-funding-table-footer">
            <div className="em-funding-table-info">
              Showing <span className="em-funding-table-info-number">05</span> / 1280 Results
            </div>
            <div className="em-funding-pagination">
              <button 
                className="em-funding-pagination-arrow" 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 13L7 9L11 5" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className={`em-funding-pagination-number ${currentPage === 1 ? 'em-funding-pagination-active' : ''}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button 
                className={`em-funding-pagination-number ${currentPage === 2 ? 'em-funding-pagination-active' : ''}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button 
                className={`em-funding-pagination-number ${currentPage === 3 ? 'em-funding-pagination-active' : ''}`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
              <span className="em-funding-pagination-ellipsis">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="3" cy="8" r="1.2" fill="#717182"/>
                  <circle cx="8" cy="8" r="1.2" fill="#717182"/>
                  <circle cx="13" cy="8" r="1.2" fill="#717182"/>
                </svg>
              </span>
              <button 
                className={`em-funding-pagination-number ${currentPage === 20 ? 'em-funding-pagination-active' : ''}`}
                onClick={() => setCurrentPage(20)}
              >
                20
              </button>
              <button 
                className="em-funding-pagination-arrow" 
                onClick={() => setCurrentPage(Math.min(20, currentPage + 1))}
                disabled={currentPage === 20}
                aria-label="Next page"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 5L11 9L7 13" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="em-funding-disclaimer">
            Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
          </div>
        </div>
      </main>
    </div>
  );
}
