import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import "./DealNew.css";

export default function DealNew({ isDarkMode, toggleTheme, sidebarCollapsed }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [itemsPerPage] = useState(4);
  const totalResults = 100;
  
  const handleSegmentHover = (segment) => {
    setHoveredSegment(segment);
  };
  
  const handleSegmentLeave = () => {
    setHoveredSegment(null);
  };
  
  const handleBarHover = (bar) => {
    setHoveredBar(bar);
  };
  
  const handleBarLeave = () => {
    setHoveredBar(null);
  };

  const dealsData = [
    {
      id: 1,
      startup: "CureCloud",
      investor: "Mohammed Al-Farooq",
      amount: "250",
      status: "Active",
      probability: "75%",
      expectedClose: "2025-09-15"
    },
    {
      id: 2,
      startup: "SukunPay",
      investor: "Sarah Johnson",
      amount: "2,400",
      status: "Active",
      probability: "85%",
      expectedClose: "2025-09-30"
    },
    {
      id: 3,
      startup: "AqsaAI",
      investor: "Ahmed Khan",
      amount: "120",
      status: "Reviewing",
      probability: "45%",
      expectedClose: "2025-10-15"
    },
    {
      id: 4,
      startup: "TechVenture",
      investor: "Emily Chen",
      amount: "1,500",
      status: "Active",
      probability: "90%",
      expectedClose: "2025-08-20"
    }
  ];

  const filteredData = dealsData.filter(deal => {
    const matchesSearch = deal.startup.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.investor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === "All" || deal.status === stageFilter;
    return matchesSearch && matchesStage;
  });

  return (
    <div className={`em-startup-overview in-page${sidebarCollapsed ? ' em-startup-overview--sidebar-collapsed' : ''}${isDarkMode ? ' dark' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />
      
      <main className="em-deal-main">
        <div className="em-deal-header">
          <div className="em-deal-header-left">
            <h1 className="em-deal-title">Deal Flow Management</h1>
            <p className="em-deal-subtitle">Track and manage investment deals pipeline</p>
          </div>
          <button className="em-deal-new-btn" onClick={() => console.log('New Deal')}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2.5" y="2.5" width="13" height="13" rx="1.5" stroke="white" strokeWidth="1.4589" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 5.5V12.5" stroke="white" strokeWidth="1.4589" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.5 9H12.5" stroke="white" strokeWidth="1.4589" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            New Deal
          </button>
        </div>

        {/* Stats Cards */}
        <div className="em-deal-stats">
          <div className="em-deal-card">
            <div className="em-deal-card-header">
              <div className="em-deal-card-icon em-deal-card-icon--green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.97 12.92C2.67476 13.0974 2.43033 13.348 2.26039 13.6476C2.09045 13.9472 2.00075 14.2856 2 14.63V17.87C2.00075 18.2144 2.09045 18.5528 2.26039 18.8524C2.43033 19.152 2.67476 19.4026 2.97 19.58L5.97 21.38C6.28106 21.5669 6.63711 21.6656 7 21.6656C7.36289 21.6656 7.71894 21.5669 8.03 21.38L12 19V13.5L7 10.5L2.97 12.92Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.00001 16.5L2.26001 13.65" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 16.5L12 13.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 16.5V21.67" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 13.5V19L15.97 21.38C16.2811 21.5669 16.6371 21.6656 17 21.6656C17.3629 21.6656 17.7189 21.5669 18.03 21.38L21.03 19.58C21.3252 19.4026 21.5697 19.152 21.7396 18.8524C21.9096 18.5528 21.9992 18.2144 22 17.87V14.63C21.9992 14.2856 21.9096 13.9472 21.7396 13.6476C21.5697 13.348 21.3252 13.0974 21.03 12.92L17 10.5L12 13.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 16.5L12 13.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 16.5L21.74 13.65" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 16.5V21.67" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.97 4.41997C7.67476 4.59735 7.43033 4.84797 7.26039 5.14756C7.09045 5.44714 7.00075 5.78554 7 6.12997V10.5L12 13.5L17 10.5V6.12997C16.9992 5.78554 16.9096 5.44714 16.7396 5.14756C16.5697 4.84797 16.3252 4.59735 16.03 4.41997L13.03 2.61997C12.7189 2.43308 12.3629 2.33435 12 2.33435C11.6371 2.33435 11.2811 2.43308 10.97 2.61997L7.97 4.41997Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 8.00002L7.26001 5.15002" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 8.00002L16.74 5.15002" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 13.5V8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </div>
              <div className="em-deal-card-badge em-deal-card-badge--green">+4 new</div>
            </div>
            <div className="em-deal-card-content">
              <p className="em-deal-card-label">Active Deals</p>
              <h3 className="em-deal-card-value">24</h3>
              <p className="em-deal-card-footer">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 10L6 2M6 2L2 6M6 2L10 6" stroke="#00BC4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="em-deal-card-change em-deal-card-change--positive">+12%</span>
                <span className="em-deal-card-text em-deal-card-change--positive">from last week</span>
              </p>
            </div>
          </div>

          <div className="em-deal-card">
            <div className="em-deal-card-header">
              <div className="em-deal-card-icon em-deal-card-icon--orange">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="em-deal-card-badge em-deal-card-badge--orange">+22.5%</div>
            </div>
            <div className="em-deal-card-content">
              <p className="em-deal-card-label">Total Value</p>
              <h3 className="em-deal-card-value">$8.2M</h3>
              <p className="em-deal-card-footer">
                <span className="em-deal-card-text">In pipeline</span>
              </p>
            </div>
          </div>

          <div className="em-deal-card">
            <div className="em-deal-card-header">
              <div className="em-deal-card-icon em-deal-card-icon--blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01L9 11.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="em-deal-card-badge em-deal-card-badge--blue">This quarter</div>
            </div>
            <div className="em-deal-card-content">
              <p className="em-deal-card-label">Closed Deals</p>
              <h3 className="em-deal-card-value">16</h3>
              <p className="em-deal-card-footer">
                <span className="em-deal-card-text">$4.2m total value</span>
              </p>
            </div>
          </div>

          <div className="em-deal-card">
            <div className="em-deal-card-header">
              <div className="em-deal-card-icon em-deal-card-icon--purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="em-deal-card-badge em-deal-card-badge--purple">-5 days</div>
            </div>
            <div className="em-deal-card-content">
              <p className="em-deal-card-label">Avg. Close Time</p>
              <h3 className="em-deal-card-value">45d</h3>
              <p className="em-deal-card-footer">
                
                <span className="em-deal-card-change em-deal-card-change--negative">5 days</span>
                <span className="em-deal-card-text">vs last quarter</span>
              </p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="em-deal-charts">
          {/* Deal Stage Distribution */}
          <div className="em-deal-chart-card">
            <div className="em-deal-chart-header">
              <div className="em-deal-chart-header-left">
                <div className="em-deal-chart-title-row">
                  <h3 className="em-deal-chart-title">Deal Stage Distribution</h3>
                  <button className="em-deal-info-btn" title="Information">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="8" fill="#AFAFAF"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M13.305 9.24219C13.43 9.02344 13.5 8.76953 13.5 8.5C13.5 7.67188 12.828 7 12 7C11.172 7 10.5 7.67188 10.5 8.5C10.5 9.32812 11.172 10 12 10C12.559 10 13.047 9.69531 13.305 9.24219ZM11 11H11.5H12.5C13.053 11 13.5 11.4473 13.5 12V13V17C13.5 17.5527 13.053 18 12.5 18C11.947 18 11.5 17.5527 11.5 17V13.75C11.5 13.3359 11.164 13 10.75 13C10.336 13 10 12.6641 10 12.25V12C10 11.6484 10.182 11.3379 10.455 11.1602C10.611 11.0586 10.799 11 11 11Z" fill="white"/>
                    </svg>
                  </button>
                </div>
                <p className="em-deal-chart-subtitle">Current pipeline breakdown</p>
              </div>
              <div className="em-deal-chart-actions-container">
                <button className="em-deal-action-icon-btn" title="Expand">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 15H2V10M11 3H16V8" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="em-deal-action-icon-btn" title="Edit">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.77 3.17119C12.404 2.54006 13.429 2.54131 14.062 3.17394L15.829 4.94119C16.461 5.57369 16.463 6.59869 15.832 7.23281L5.67297 17.4433H1.55897V13.3342L11.77 3.17119Z" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.48 4.463L14.537 8.51931" stroke="#888888" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                <button className="em-deal-action-icon-btn" title="More options">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 8.15039C9.51 8.15039 9.943 8.33024 10.307 8.69434C10.671 9.05845 10.85 9.49086 10.85 10L10.842 10.1875C10.802 10.617 10.624 10.988 10.306 11.3066C9.942 11.6708 9.509 11.8502 9 11.8496C8.49 11.8496 8.057 11.6698 7.693 11.3057C7.329 10.9415 7.15 10.5091 7.15 10C7.15 9.49008 7.33 9.0575 7.694 8.69339C8.013 8.37482 8.384 8.1971 8.812 8.15821L9 8.15039ZM15 8.15039C15.51 8.15039 15.943 8.33024 16.307 8.69434C16.671 9.05845 16.85 9.49086 16.85 10L16.842 10.1875C16.802 10.617 16.624 10.988 16.306 11.3066C15.942 11.6708 15.509 11.8502 15 11.8496C14.49 11.8496 14.057 11.6698 13.693 11.3057C13.329 10.9415 13.15 10.5091 13.15 10C13.15 9.49008 13.33 9.0575 13.694 8.69339C14.013 8.37482 14.384 8.1971 14.812 8.15821L15 8.15039ZM3 8.15039C3.51 8.15039 3.943 8.33024 4.307 8.69434C4.671 9.05845 4.85 9.49086 4.85 10L4.842 10.1875C4.802 10.617 4.624 10.988 4.306 11.3066C3.942 11.6708 3.509 11.8502 3 11.8496C2.49 11.8496 2.057 11.6698 1.693 11.3057C1.329 10.9415 1.15 10.5091 1.15 10C1.15 9.49008 1.33 9.0575 1.694 8.69339C2.013 8.37482 2.384 8.1971 2.812 8.15821L3 8.15039Z" fill="#888888" stroke="white" strokeWidth="0.3"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="em-deal-donut-container">
              <svg className="em-deal-donut-chart" viewBox="0 0 200 200">
                {/* Border circle */}
                <circle cx="100" cy="100" r="89.5" fill="none" stroke="#DFDFF2" strokeWidth="0.72"/>
                
                {/* Purple segment - Negotiation (largest) */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="60" 
                  fill="none" 
                  stroke="#8B5CF6" 
                  strokeWidth="40" 
                  strokeDasharray="126 251" 
                  transform="rotate(-90 100 100)"
                  className={`em-deal-donut-segment em-deal-segment-negotiation ${hoveredSegment && hoveredSegment !== 'negotiation' ? 'em-deal-segment-dimmed' : ''}`}
                  data-segment="negotiation"
                  onMouseEnter={() => handleSegmentHover('negotiation')}
                  onMouseLeave={handleSegmentLeave}
                  style={{ cursor: 'pointer' }}
                />
                
                {/* Orange segment - Initial Review */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="60" 
                  fill="none" 
                  stroke="#F59E0B" 
                  strokeWidth="40" 
                  strokeDasharray="94 283" 
                  strokeDashoffset="-126" 
                  transform="rotate(-90 100 100)"
                  className={`em-deal-donut-segment em-deal-segment-initial ${hoveredSegment && hoveredSegment !== 'initial' ? 'em-deal-segment-dimmed' : ''}`}
                  data-segment="initial"
                  onMouseEnter={() => handleSegmentHover('initial')}
                  onMouseLeave={handleSegmentLeave}
                  style={{ cursor: 'pointer' }}
                />
                
                {/* Blue segment - Due Diligence */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="60" 
                  fill="none" 
                  stroke="#3B82F6" 
                  strokeWidth="40" 
                  strokeDasharray="75 302" 
                  strokeDashoffset="-220" 
                  transform="rotate(-90 100 100)"
                  className={`em-deal-donut-segment em-deal-segment-diligence ${hoveredSegment && hoveredSegment !== 'diligence' ? 'em-deal-segment-dimmed' : ''}`}
                  data-segment="diligence"
                  onMouseEnter={() => handleSegmentHover('diligence')}
                  onMouseLeave={handleSegmentLeave}
                  style={{ cursor: 'pointer' }}
                />
                
                {/* Cyan segment - Documentation */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="60" 
                  fill="none" 
                  stroke="#06B6D4" 
                  strokeWidth="40" 
                  strokeDasharray="47 330" 
                  strokeDashoffset="-295" 
                  transform="rotate(-90 100 100)"
                  className={`em-deal-donut-segment em-deal-segment-documentation ${hoveredSegment && hoveredSegment !== 'documentation' ? 'em-deal-segment-dimmed' : ''}`}
                  data-segment="documentation"
                  onMouseEnter={() => handleSegmentHover('documentation')}
                  onMouseLeave={handleSegmentLeave}
                  style={{ cursor: 'pointer' }}
                />
                
                {/* Pink segment - Closing (smallest) */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="60" 
                  fill="none" 
                  stroke="#EC4899" 
                  strokeWidth="40" 
                  strokeDasharray="35 342" 
                  strokeDashoffset="-342" 
                  transform="rotate(-90 100 100)"
                  className={`em-deal-donut-segment em-deal-segment-closing ${hoveredSegment && hoveredSegment !== 'closing' ? 'em-deal-segment-dimmed' : ''}`}
                  data-segment="closing"
                  onMouseEnter={() => handleSegmentHover('closing')}
                  onMouseLeave={handleSegmentLeave}
                  style={{ cursor: 'pointer' }}
                />
                
                {/* Center white circle */}
                <circle cx="100" cy="100" r="40" fill="white" className="em-deal-donut-center"/>
              </svg>
              <div className="em-deal-donut-legend">
                <div 
                  className={`em-deal-legend-item ${hoveredSegment === 'negotiation' ? 'em-deal-legend-active' : hoveredSegment ? 'em-deal-legend-dimmed' : ''}`}
                  data-segment="negotiation"
                  onMouseEnter={() => handleSegmentHover('negotiation')}
                  onMouseLeave={handleSegmentLeave}
                >
                  <span className="em-deal-legend-dot" style={{ backgroundColor: '#8B5CF6' }}></span>
                  <span className="em-deal-legend-label">Negotiation</span>
                  <span className="em-deal-legend-value">5 deals</span>
                </div>
                <div 
                  className={`em-deal-legend-item ${hoveredSegment === 'initial' ? 'em-deal-legend-active' : hoveredSegment ? 'em-deal-legend-dimmed' : ''}`}
                  data-segment="initial"
                  onMouseEnter={() => handleSegmentHover('initial')}
                  onMouseLeave={handleSegmentLeave}
                >
                  <span className="em-deal-legend-dot" style={{ backgroundColor: '#F59E0B' }}></span>
                  <span className="em-deal-legend-label">Initial Review</span>
                  <span className="em-deal-legend-value">7 deals</span>
                </div>
                <div 
                  className={`em-deal-legend-item ${hoveredSegment === 'diligence' ? 'em-deal-legend-active' : hoveredSegment ? 'em-deal-legend-dimmed' : ''}`}
                  data-segment="diligence"
                  onMouseEnter={() => handleSegmentHover('diligence')}
                  onMouseLeave={handleSegmentLeave}
                >
                  <span className="em-deal-legend-dot" style={{ backgroundColor: '#3B82F6' }}></span>
                  <span className="em-deal-legend-label">Due Diligence</span>
                  <span className="em-deal-legend-value">6 deals</span>
                </div>
                <div 
                  className={`em-deal-legend-item ${hoveredSegment === 'documentation' ? 'em-deal-legend-active' : hoveredSegment ? 'em-deal-legend-dimmed' : ''}`}
                  data-segment="documentation"
                  onMouseEnter={() => handleSegmentHover('documentation')}
                  onMouseLeave={handleSegmentLeave}
                >
                  <span className="em-deal-legend-dot" style={{ backgroundColor: '#06B6D4' }}></span>
                  <span className="em-deal-legend-label">Documentation</span>
                  <span className="em-deal-legend-value">3 deals</span>
                </div>
                <div 
                  className={`em-deal-legend-item ${hoveredSegment === 'closing' ? 'em-deal-legend-active' : hoveredSegment ? 'em-deal-legend-dimmed' : ''}`}
                  data-segment="closing"
                  onMouseEnter={() => handleSegmentHover('closing')}
                  onMouseLeave={handleSegmentLeave}
                >
                  <span className="em-deal-legend-dot" style={{ backgroundColor: '#EC4899' }}></span>
                  <span className="em-deal-legend-label">Closing</span>
                  <span className="em-deal-legend-value">3 deals</span>
                </div>
              </div>
            </div>
          </div>

          {/* Deal Value by Month */}
          <div className="em-deal-chart-card">
            <div className="em-deal-chart-header">
              <div className="em-deal-chart-header-left">
                <div className="em-deal-chart-title-row">
                  <h3 className="em-deal-chart-title">Deal Value by Month ($K)</h3>
                  <button className="em-deal-info-btn" title="Information">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="8" fill="#AFAFAF"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M13.305 9.24219C13.43 9.02344 13.5 8.76953 13.5 8.5C13.5 7.67188 12.828 7 12 7C11.172 7 10.5 7.67188 10.5 8.5C10.5 9.32812 11.172 10 12 10C12.559 10 13.047 9.69531 13.305 9.24219ZM11 11H11.5H12.5C13.053 11 13.5 11.4473 13.5 12V13V17C13.5 17.5527 13.053 18 12.5 18C11.947 18 11.5 17.5527 11.5 17V13.75C11.5 13.3359 11.164 13 10.75 13C10.336 13 10 12.6641 10 12.25V12C10 11.6484 10.182 11.3379 10.455 11.1602C10.611 11.0586 10.799 11 11 11Z" fill="white"/>
                    </svg>
                  </button>
                </div>
                <p className="em-deal-chart-subtitle">Value growth</p>
              </div>
              <div className="em-deal-chart-actions-container">
                <button className="em-deal-action-icon-btn" title="Expand">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 15H2V10M11 3H16V8" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="em-deal-action-icon-btn" title="Edit">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.77 3.17119C12.404 2.54006 13.429 2.54131 14.062 3.17394L15.829 4.94119C16.461 5.57369 16.463 6.59869 15.832 7.23281L5.67297 17.4433H1.55897V13.3342L11.77 3.17119Z" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.48 4.463L14.537 8.51931" stroke="#888888" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                <button className="em-deal-action-icon-btn" title="More options">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 8.15039C9.51 8.15039 9.943 8.33024 10.307 8.69434C10.671 9.05845 10.85 9.49086 10.85 10L10.842 10.1875C10.802 10.617 10.624 10.988 10.306 11.3066C9.942 11.6708 9.509 11.8502 9 11.8496C8.49 11.8496 8.057 11.6698 7.693 11.3057C7.329 10.9415 7.15 10.5091 7.15 10C7.15 9.49008 7.33 9.0575 7.694 8.69339C8.013 8.37482 8.384 8.1971 8.812 8.15821L9 8.15039ZM15 8.15039C15.51 8.15039 15.943 8.33024 16.307 8.69434C16.671 9.05845 16.85 9.49086 16.85 10L16.842 10.1875C16.802 10.617 16.624 10.988 16.306 11.3066C15.942 11.6708 15.509 11.8502 15 11.8496C14.49 11.8496 14.057 11.6698 13.693 11.3057C13.329 10.9415 13.15 10.5091 13.15 10C13.15 9.49008 13.33 9.0575 13.694 8.69339C14.013 8.37482 14.384 8.1971 14.812 8.15821L15 8.15039ZM3 8.15039C3.51 8.15039 3.943 8.33024 4.307 8.69434C4.671 9.05845 4.85 9.49086 4.85 10L4.842 10.1875C4.802 10.617 4.624 10.988 4.306 11.3066C3.942 11.6708 3.509 11.8502 3 11.8496C2.49 11.8496 2.057 11.6698 1.693 11.3057C1.329 10.9415 1.15 10.5091 1.15 10C1.15 9.49008 1.33 9.0575 1.694 8.69339C2.013 8.37482 2.384 8.1971 2.812 8.15821L3 8.15039Z" fill="#888888" stroke="white" strokeWidth="0.3"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="em-deal-bar-container">
              <svg className="em-deal-bar-chart" viewBox="0 0 524 305" preserveAspectRatio="xMidYMid meet">
                {/* Horizontal grid lines */}
                <line x1="56.355" y1="58.14" x2="506.786" y2="58.14" stroke="#C1C1C1" strokeWidth="1.163" strokeLinecap="round" strokeDasharray="3.88 3.88" />
                <line x1="56.355" y1="7.752" x2="506.786" y2="7.752" stroke="#C1C1C1" strokeWidth="1.163" strokeLinecap="round" strokeDasharray="3.88 3.88" />
                <line x1="56.505" y1="158.915" x2="506.936" y2="158.915" stroke="#C1C1C1" strokeWidth="1.163" strokeLinecap="round" strokeDasharray="3.88 3.88" />
                <line x1="56.505" y1="108.527" x2="506.936" y2="108.527" stroke="#C1C1C1" strokeWidth="1.163" strokeLinecap="round" strokeDasharray="3.88 3.88" />
                <line x1="56.505" y1="209.302" x2="506.936" y2="209.302" stroke="#C1C1C1" strokeWidth="1.163" strokeLinecap="round" strokeDasharray="3.88 3.88" />
                
                {/* Bottom baseline */}
                <line x1="56.505" y1="258.721" x2="506.936" y2="258.721" stroke="#C1C1C1" strokeOpacity="0.5" strokeWidth="1.453" strokeLinecap="round" />
                
                {/* Y-axis labels */}
                <text x="30" y="13" fontSize="11" fill="#8D8D99" fontFamily="Inter">2500</text>
                <text x="30" y="63.88" fontSize="11" fill="#8D8D99" fontFamily="Inter">2000</text>
                <text x="30" y="114.77" fontSize="11" fill="#8D8D99" fontFamily="Inter">1500</text>
                <text x="30" y="165.65" fontSize="11" fill="#8D8D99" fontFamily="Inter">1000</text>
                <text x="30" y="216.73" fontSize="11" fill="#8D8D99" fontFamily="Inter">500</text>
                <text x="30" y="267.61" fontSize="11" fill="#8D8D99" fontFamily="Inter">0</text>
                
                {/* Bars - Jan */}
                <rect 
                  x="67.014" 
                  y="234.528" 
                  width="55.065" 
                  height="21.286" 
                  rx="10.643" 
                  fill={hoveredBar === 'jan' ? '#03A9F5' : '#CDEEFD'}
                  className="em-deal-bar"
                  onMouseEnter={() => handleBarHover('jan')}
                  onMouseLeave={handleBarLeave}
                  style={{ cursor: 'pointer', transition: 'fill 0.3s ease' }}
                />
                
                {/* Bars - Feb */}
                <rect 
                  x="130.188" 
                  y="153.439" 
                  width="55.065" 
                  height="102.375" 
                  rx="12.163" 
                  fill={hoveredBar === 'feb' ? '#03A9F5' : '#CDEEFD'}
                  className="em-deal-bar"
                  onMouseEnter={() => handleBarHover('feb')}
                  onMouseLeave={handleBarLeave}
                  style={{ cursor: 'pointer', transition: 'fill 0.3s ease' }}
                />
                
                {/* Bars - Mar */}
                <rect 
                  x="193.362" 
                  y="199.051" 
                  width="55.065" 
                  height="56.763" 
                  rx="12.163" 
                  fill={hoveredBar === 'mar' ? '#03A9F5' : '#CDEEFD'}
                  className="em-deal-bar"
                  onMouseEnter={() => handleBarHover('mar')}
                  onMouseLeave={handleBarLeave}
                  style={{ cursor: 'pointer', transition: 'fill 0.3s ease' }}
                />
                
                {/* Bars - Apr */}
                <rect 
                  x="256.536" 
                  y="113.908" 
                  width="55.065" 
                  height="141.906" 
                  rx="12.163" 
                  fill={hoveredBar === 'apr' ? '#03A9F5' : '#CDEEFD'}
                  className="em-deal-bar"
                  onMouseEnter={() => handleBarHover('apr')}
                  onMouseLeave={handleBarLeave}
                  style={{ cursor: 'pointer', transition: 'fill 0.3s ease' }}
                />
                
                {/* Bars - May */}
                <rect 
                  x="319.709" 
                  y="144.316" 
                  width="55.065" 
                  height="111.498" 
                  rx="12.163" 
                  fill={hoveredBar === 'may' ? '#03A9F5' : '#CDEEFD'}
                  className="em-deal-bar"
                  onMouseEnter={() => handleBarHover('may')}
                  onMouseLeave={handleBarLeave}
                  style={{ cursor: 'pointer', transition: 'fill 0.3s ease' }}
                />
                
                {/* Bars - Jun */}
                <rect 
                  x="382.883" 
                  y="180.806" 
                  width="55.065" 
                  height="75.008" 
                  rx="12.163" 
                  fill={hoveredBar === 'jun' ? '#03A9F5' : '#CDEEFD'}
                  className="em-deal-bar"
                  onMouseEnter={() => handleBarHover('jun')}
                  onMouseLeave={handleBarLeave}
                  style={{ cursor: 'pointer', transition: 'fill 0.3s ease' }}
                />
                
                {/* Bars - Jul (tallest) */}
                <rect 
                  x="446.057" 
                  y="72.674" 
                  width="55.065" 
                  height="171.512" 
                  rx="12.163" 
                  fill={hoveredBar === 'jul' ? '#03A9F5' : '#CDEEFD'}
                  className="em-deal-bar"
                  onMouseEnter={() => handleBarHover('jul')}
                  onMouseLeave={handleBarLeave}
                  style={{ cursor: 'pointer', transition: 'fill 0.3s ease' }}
                />
                
                {/* Dotted vertical line for Jul when hovered */}
                {hoveredBar === 'jul' && (
                  <>
                    <line 
                      x1="473.59" 
                      y1="255.814" 
                      x2="473.59" 
                      y2="72.674" 
                      stroke="#121212" 
                      strokeWidth="0.969" 
                      strokeDasharray="0.969 0.969"
                    />
                    <circle cx="473.59" cy="67.729" r="4.845" fill="white" stroke="#03A9F5" strokeWidth="1.938" />
                  </>
                )}
                
                {/* X-axis month labels */}
                <text x="94.5" y="294" fontSize="11" fill="#8D8D99" fontFamily="Inter" textAnchor="middle">Jan</text>
                <text x="157.7" y="294" fontSize="11" fill="#8D8D99" fontFamily="Inter" textAnchor="middle">Feb</text>
                <text x="220.9" y="294" fontSize="11" fill="#8D8D99" fontFamily="Inter" textAnchor="middle">Mar</text>
                <text x="284.1" y="294" fontSize="11" fill="#8D8D99" fontFamily="Inter" textAnchor="middle">Apr</text>
                <text x="347.2" y="294" fontSize="11" fill="#8D8D99" fontFamily="Inter" textAnchor="middle">May</text>
                <text x="410.4" y="294" fontSize="11" fill="#8D8D99" fontFamily="Inter" textAnchor="middle">Jun</text>
                <text x="473.6" y="294" fontSize="11" fill="#8D8D99" fontFamily="Inter" textAnchor="middle">Jul</text>
                
                {/* Tooltip for hovered bar */}
                {hoveredBar === 'jan' && (
                  <g className="em-deal-bar-tooltip">
                    <rect x="67" y="11.628" width="114.256" height="47.38" rx="7.752" fill="#152B5A" />
                    <rect x="67.485" y="12.112" width="113.287" height="46.411" rx="7.267" stroke="#C1C1C1" strokeOpacity="0.24" strokeWidth="0.969" fill="none" />
                    <text x="85" y="32.5" fontSize="12" fill="white" fontFamily="Inter">Jan</text>
                    <text x="85" y="49.26" fontSize="11" fill="#DFDFF2" fontFamily="Inter">Deal value: 200</text>
                  </g>
                )}
                
                {hoveredBar === 'feb' && (
                  <g className="em-deal-bar-tooltip">
                    <rect x="103" y="11.628" width="114.256" height="47.38" rx="7.752" fill="#152B5A" />
                    <rect x="103.485" y="12.112" width="113.287" height="46.411" rx="7.267" stroke="#C1C1C1" strokeOpacity="0.24" strokeWidth="0.969" fill="none" />
                    <text x="120" y="32.5" fontSize="12" fill="white" fontFamily="Inter">Feb</text>
                    <text x="120" y="49.26" fontSize="11" fill="#DFDFF2" fontFamily="Inter">Deal value: 1,050</text>
                  </g>
                )}
                
                {hoveredBar === 'mar' && (
                  <g className="em-deal-bar-tooltip">
                    <rect x="166" y="11.628" width="114.256" height="47.38" rx="7.752" fill="#152B5A" />
                    <rect x="166.485" y="12.112" width="113.287" height="46.411" rx="7.267" stroke="#C1C1C1" strokeOpacity="0.24" strokeWidth="0.969" fill="none" />
                    <text x="183" y="32.5" fontSize="12" fill="white" fontFamily="Inter">Mar</text>
                    <text x="183" y="49.26" fontSize="11" fill="#DFDFF2" fontFamily="Inter">Deal value: 600</text>
                  </g>
                )}
                
                {hoveredBar === 'apr' && (
                  <g className="em-deal-bar-tooltip">
                    <rect x="229" y="11.628" width="114.256" height="47.38" rx="7.752" fill="#152B5A" />
                    <rect x="229.485" y="12.112" width="113.287" height="46.411" rx="7.267" stroke="#C1C1C1" strokeOpacity="0.24" strokeWidth="0.969" fill="none" />
                    <text x="246" y="32.5" fontSize="12" fill="white" fontFamily="Inter">Apr</text>
                    <text x="246" y="49.26" fontSize="11" fill="#DFDFF2" fontFamily="Inter">Deal value: 1,450</text>
                  </g>
                )}
                
                {hoveredBar === 'may' && (
                  <g className="em-deal-bar-tooltip">
                    <rect x="292" y="11.628" width="114.256" height="47.38" rx="7.752" fill="#152B5A" />
                    <rect x="292.485" y="12.112" width="113.287" height="46.411" rx="7.267" stroke="#C1C1C1" strokeOpacity="0.24" strokeWidth="0.969" fill="none" />
                    <text x="309" y="32.5" fontSize="12" fill="white" fontFamily="Inter">May</text>
                    <text x="309" y="49.26" fontSize="11" fill="#DFDFF2" fontFamily="Inter">Deal value: 1,150</text>
                  </g>
                )}
                
                {hoveredBar === 'jun' && (
                  <g className="em-deal-bar-tooltip">
                    <rect x="355" y="11.628" width="114.256" height="47.38" rx="7.752" fill="#152B5A" />
                    <rect x="355.485" y="12.112" width="113.287" height="46.411" rx="7.267" stroke="#C1C1C1" strokeOpacity="0.24" strokeWidth="0.969" fill="none" />
                    <text x="372" y="32.5" fontSize="12" fill="white" fontFamily="Inter">Jun</text>
                    <text x="372" y="49.26" fontSize="11" fill="#DFDFF2" fontFamily="Inter">Deal value: 800</text>
                  </g>
                )}
                
                {hoveredBar === 'jul' && (
                  <g className="em-deal-bar-tooltip">
                    <rect x="407.215" y="11.628" width="114.256" height="47.38" rx="7.752" fill="#152B5A" />
                    <rect x="407.7" y="12.112" width="113.287" height="46.411" rx="7.267" stroke="#C1C1C1" strokeOpacity="0.24" strokeWidth="0.969" fill="none" />
                    <text x="424" y="32.5" fontSize="12" fill="white" fontFamily="Inter">Jul</text>
                    <text x="424" y="49.26" fontSize="11" fill="#DFDFF2" fontFamily="Inter">Deal value: 1,700</text>
                  </g>
                )}
              </svg>
            </div>
          </div>
        </div>

        {/* Current Deals Section */}
        <div className="em-deal-current-deals">
          <div className="em-deal-current-header">
            <div className="em-deal-current-header-left">
              <div className="em-deal-current-title-row">
                <h2 className="em-deal-current-title">Current Deals</h2>
                <button className="em-deal-current-info-btn" aria-label="Information">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="7.91351" fill="#AFAFAF"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.291 6.21359C9.41401 5.99719 9.48401 5.74609 9.48401 5.47949C9.48401 4.66029 8.81901 3.99609 8.00001 3.99609C7.18101 3.99609 6.51601 4.66029 6.51601 5.47949C6.51601 6.29869 7.18101 6.96289 8.00001 6.96289C8.55301 6.96289 9.03601 6.66149 9.291 6.21359ZM6.51101 7.95239H7.00601H7.99501C8.54101 7.95239 8.98401 8.39489 8.98401 8.94159V9.93079V13.8876C8.98401 14.4343 8.54101 14.8768 7.99501 14.8768C7.44801 14.8768 7.00601 14.4343 7.00601 13.8876V10.6727C7.00601 10.2631 6.67301 9.93079 6.26401 9.93079C5.85401 9.93079 5.52201 9.59849 5.52201 9.18889V8.94159C5.52201 8.59389 5.70101 8.28669 5.97201 8.11089C6.12601 8.01039 6.31201 7.95239 6.51101 7.95239Z" fill="white"/>
                  </svg>
                </button>
              </div>
              <p className="em-deal-current-subtitle">Active Deals</p>
            </div>
          </div>

          <div className="em-deal-current-controls">
            <div className="em-deal-current-controls-wrapper">
              <div className="em-deal-current-stage-wrapper">
                <select 
                  value={stageFilter} 
                  onChange={(e) => setStageFilter(e.target.value)}
                  className="em-deal-current-stage-select"
                >
                  <option value="All">Stage</option>
                  <option value="Active">Active</option>
                  <option value="Reviewing">Reviewing</option>
                </select>
              </div>
              <div className="em-deal-current-search-wrapper">
                <svg className="em-deal-current-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 14L11.1 11.1" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input 
                  type="text" 
                  className="em-deal-current-search-input" 
                  placeholder="Search" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search deals"
                />
              </div>
            </div>
          </div>

          <div className="em-deal-current-table-wrapper">
            <table className="em-deal-current-table">
              <thead>
                <tr>
                  <th>STARTUP</th>
                  <th>INVESTOR</th>
                  <th>AMOUNT ($K)</th>
                  <th>STATUS</th>
                  <th>PROBABILITY</th>
                  <th>EXPECTED CLOSE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((deal) => (
                  <tr key={deal.id}>
                    <td className="em-deal-current-startup">{deal.startup}</td>
                    <td className="em-deal-current-investor">{deal.investor}</td>
                    <td className="em-deal-current-amount">{deal.amount}</td>
                    <td>
                      <span className={`em-deal-current-status em-deal-current-status--${deal.status.toLowerCase()}`}>
                        {deal.status}
                      </span>
                    </td>
                    <td className="em-deal-current-probability">{deal.probability}</td>
                    <td className="em-deal-current-date">{deal.expectedClose}</td>
                    <td>
                      <button className="em-deal-current-action-btn" aria-label="View deal details">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.61342 8.23201C1.52262 8.08235 1.52262 7.91765 1.61342 7.76799C2.16264 6.45588 3.07277 5.33401 4.25027 4.54455C5.42778 3.75509 6.81971 3.33356 8.24123 3.33356C9.66274 3.33356 11.0547 3.75509 12.2322 4.54455C13.4097 5.33401 14.3198 6.45588 14.869 7.76799C14.9598 7.91765 14.9598 8.08235 14.869 8.23201C14.3198 9.54412 13.4097 10.666 12.2322 11.4555C11.0547 12.2449 9.66274 12.6664 8.24123 12.6664C6.81971 12.6664 5.42778 12.2449 4.25027 11.4555C3.07277 10.666 2.16264 9.54412 1.61342 8.23201Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8.24123 10C9.34579 10 10.2412 9.10457 10.2412 8C10.2412 6.89543 9.34579 6 8.24123 6C7.13666 6 6.24123 6.89543 6.24123 8C6.24123 9.10457 7.13666 10 8.24123 10Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="em-deal-current-footer">
            <div className="em-deal-current-pagination-info">
              Showing <span className="em-deal-current-page-num">{filteredData.length.toString().padStart(2, '0')}</span> / {filteredData.length} Results
            </div>
            <div className="em-deal-current-pagination">
              <button 
                className="em-deal-current-page-btn em-deal-current-page-arrow" 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className={`em-deal-current-page-btn ${currentPage === 1 ? 'em-deal-current-page-btn--active' : ''}`}
                onClick={() => setCurrentPage(1)}
                aria-label="Page 1"
              >
                1
              </button>
              <button 
                className={`em-deal-current-page-btn ${currentPage === 2 ? 'em-deal-current-page-btn--active' : ''}`}
                onClick={() => setCurrentPage(2)}
                aria-label="Page 2"
              >
                2
              </button>
              <button 
                className={`em-deal-current-page-btn ${currentPage === 3 ? 'em-deal-current-page-btn--active' : ''}`}
                onClick={() => setCurrentPage(3)}
                aria-label="Page 3"
              >
                3
              </button>
              <span className="em-deal-current-page-ellipsis" aria-hidden="true">...</span>
              <button 
                className="em-deal-current-page-btn"
                onClick={() => setCurrentPage(20)}
                aria-label="Page 20"
              >
                20
              </button>
              <button 
                className="em-deal-current-page-btn em-deal-current-page-arrow" 
                onClick={() => setCurrentPage(Math.min(20, currentPage + 1))}
                disabled={currentPage === 20}
                aria-label="Next page"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="em-deal-current-disclaimer">
            <p>Market data is updated in real-time. Prices are for reference only and may vary across exchanges.</p>
          </div>
        </div>

      </main>
    </div>
  );
}