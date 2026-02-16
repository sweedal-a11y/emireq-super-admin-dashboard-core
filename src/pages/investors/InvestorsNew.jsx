import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import "./InvestorsNew.css";

export default function Investors({ isDarkMode, toggleTheme, sidebarCollapsed }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const investorsData = [
    {
      id: 1,
      companyName: "Inspection & Clean",
      founder: "Ahmed Al-Rashid",
      email: "ahmed@techventures.com",
      stage: "Series A",
      onboarding: 85,
      status: "Approved"
    },
    {
      id: 2,
      companyName: "Define and Scope",
      founder: "John Doe",
      email: "johndoe@greenagi.com",
      stage: "Seed",
      onboarding: 45,
      status: "Pending"
    },
    {
      id: 3,
      companyName: "Quotation",
      founder: "Fatima Hassan",
      email: "fatima@healthcare.io",
      stage: "Series B",
      onboarding: 100,
      status: "Approved"
    },
    {
      id: 4,
      companyName: "Contract & Proceed",
      founder: "Sarah",
      email: "sarah@edutech.com",
      stage: "Pre-seed",
      onboarding: 35,
      status: "Pending"
    },
    {
      id: 5,
      companyName: "Site Delivery",
      founder: "Sarah Al-Mansoori",
      email: "sarah@fintech.ae",
      stage: "Seed",
      onboarding: 15,
      status: "Rejected"
    }
  ];

  const filteredData = investorsData.filter(item => {
    const matchesSearch = item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.founder.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === "all" || item.stage.toLowerCase().replace(/[- ]/g, '') === stageFilter.toLowerCase().replace(/[- ]/g, '');
    const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStage && matchesStatus;
  });

  const pendingCount = investorsData.filter(item => item.status === "Pending").length;
  const approvedCount = investorsData.filter(item => item.status === "Approved").length;
  const rejectedCount = investorsData.filter(item => item.status === "Rejected").length;

  return (
    <div className="em-investors-container">
      <Header 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme}
        sidebarCollapsed={sidebarCollapsed}
      />
      
      <main className="em-investors-main">
        {/* Page Header */}
        <div className="em-investors-page-header">
          <h1 className="em-investors-title">Investors Overview</h1>
          <p className="em-investors-subtitle">Manage and monitor all investors on the platform</p>
        </div>

        {/* Stats Cards */}
        <div className="em-investors-stats-row">
          {/* Pending Approval Card */}
          <div className="em-investors-stat-card em-investors-stat-card--orange">
            <div className="em-investors-stat-card-content">
              <div className="em-investors-stat-header">
                <div className="em-investors-stat-icon-wrapper">
                  <div className="em-investors-stat-icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 8V16L20 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <span className="em-investors-stat-title">Pending Approval</span>
              </div>
              <div className="em-investors-stat-number">{pendingCount}</div>
              <div className="em-investors-stat-bottom">
                <span className="em-investors-stat-subtitle">Awaiting review</span>
                <span className="em-investors-stat-badge em-investors-badge-orange">Action needed</span>
              </div>
            </div>
          </div>

          {/* Approved Card */}
          <div className="em-investors-stat-card em-investors-stat-card--green">
            <div className="em-investors-stat-card-content">
              <div className="em-investors-stat-header">
                <div className="em-investors-stat-icon-wrapper">
                  <div className="em-investors-stat-icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11 16L14.5 19.5L21 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <span className="em-investors-stat-title">Approved</span>
              </div>
              <div className="em-investors-stat-number">{approvedCount}</div>
              <div className="em-investors-stat-bottom">
                <span className="em-investors-stat-subtitle">Active investors</span>
                <span className="em-investors-stat-badge em-investors-badge-green">Verified</span>
              </div>
            </div>
          </div>

          {/* Rejected Card */}
          <div className="em-investors-stat-card em-investors-stat-card--red">
            <div className="em-investors-stat-card-content">
              <div className="em-investors-stat-header">
                <div className="em-investors-stat-icon-wrapper">
                  <div className="em-investors-stat-icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19 13L13 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13 13L19 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <span className="em-investors-stat-title">Rejected</span>
              </div>
              <div className="em-investors-stat-number">{rejectedCount}</div>
              <div className="em-investors-stat-bottom">
                <span className="em-investors-stat-subtitle">Not qualified</span>
                <span className="em-investors-stat-badge em-investors-badge-red">Declined</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Section */}
        <div className="em-investors-data-section">
          <div className="em-investors-data-header">
            <div className="em-investors-data-title-group">
              <h2 className="em-investors-data-title">
                Data
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="7.91351" cy="7.91351" r="7.91351" fill="#C1C1C1"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.20402 5.18552C9.32767 4.96914 9.39722 4.71798 9.39722 4.45136C9.39722 3.63219 8.73261 2.96758 7.91344 2.96758C7.09426 2.96758 6.42965 3.63219 6.42965 4.45136C6.42965 5.27053 7.09426 5.93514 7.91344 5.93514C8.46599 5.93514 8.94899 5.63375 9.20402 5.18552ZM6.92425 6.92433H7.41884H8.40803C8.95479 6.92433 9.39722 7.36676 9.39722 7.91352V8.90271V12.8595C9.39722 13.4062 8.95479 13.8487 8.40803 13.8487C7.86127 13.8487 7.41884 13.4062 7.41884 12.8595V9.6446C7.41884 9.23502 7.08654 8.90271 6.67695 8.90271C6.26736 8.90271 5.93506 8.5704 5.93506 8.16082V7.91352C5.93506 7.56576 6.11474 7.25857 6.38522 7.08276C6.53978 6.98229 6.72525 6.92433 6.92425 6.92433Z" fill="white"/>
                </svg>
              </h2>
              <p className="em-investors-data-subtitle">Comprehensive token statistics trading information</p>
            </div>
          </div>

          <div className="em-investors-filters-row">
            <div className="em-investors-filter-dropdown">
              <label>Stage</label>
              <select 
                value={stageFilter} 
                onChange={(e) => setStageFilter(e.target.value)}
                className="em-investors-select"
              >
                <option value="all">All</option>
                <option value="Idea">Idea</option>
                <option value="Pre-seed">Pre-seed</option>
                <option value="Seed">Seed</option>
                <option value="Series A">Series A</option>
                <option value="Series B">Series B</option>
              </select>
            </div>

            <div className="em-investors-filter-dropdown">
              <label>Status</label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="em-investors-select"
              >
                <option value="all">All</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="em-investors-search-container">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="em-investors-search-icon">
                <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 14L11.1 11.1" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="em-investors-search-input"
              />
            </div>
          </div>

          {/* Data Table */}
          <div className="em-investors-table-wrapper">
            <table className="em-investors-table">
              <thead>
                <tr>
                  <th>COMPANY NAME</th>
                  <th>FOUNDER</th>
                  <th>EMAIL</th>
                  <th>STAGE</th>
                  <th>ONBOARDING</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} onClick={() => navigate('/investors/details')} style={{cursor: 'pointer'}}>
                    <td className="em-investors-company-name">{item.companyName}</td>
                    <td>{item.founder}</td>
                    <td className="em-investors-email">{item.email}</td>
                    <td>
                      <span className={`em-investors-stage-badge ${item.stage === 'Series A' ? 'stage-series-a' : item.stage === 'Seed' ? 'stage-seed' : item.stage === 'Series B' ? 'stage-series-b' : 'stage-preseed'}`}>
                        {item.stage}
                      </span>
                    </td>
                    <td>
                      <div className="em-investors-progress-cell">
                        <div className="em-investors-progress-bar">
                          <div 
                            className="em-investors-progress-fill" 
                            style={{width: `${item.onboarding}%`}}
                          ></div>
                        </div>
                        <span className="em-investors-progress-text">{item.onboarding}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`em-investors-status-badge ${item.status === 'Approved' ? 'status-approved' : item.status === 'Pending' ? 'status-pending' : 'status-rejected'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button className="em-investors-action-btn" onClick={(e) => {e.stopPropagation(); /* handle action */}}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="em-investors-pagination">
            <div className="em-investors-pagination-info">
              Showing <span className="em-investors-pagination-current">05</span> / 1280 Results
            </div>
            <div className="em-investors-pagination-controls">
              <button 
                className="em-investors-page-btn" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className={`em-investors-page-btn ${currentPage === 1 ? 'em-investors-page-btn--active' : ''}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button 
                className={`em-investors-page-btn ${currentPage === 2 ? 'em-investors-page-btn--active' : ''}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button 
                className={`em-investors-page-btn ${currentPage === 3 ? 'em-investors-page-btn--active' : ''}`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
              <span className="em-investors-page-dots">...</span>
              <button 
                className={`em-investors-page-btn ${currentPage === 20 ? 'em-investors-page-btn--active' : ''}`}
                onClick={() => setCurrentPage(20)}
              >
                20
              </button>
              <button 
                className="em-investors-page-btn"
                disabled={currentPage === 20}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <p className="em-investors-disclaimer">
            Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
          </p>
        </div>
      </main>
    </div>
  );
}
