import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import "./InvestorDetails.css";

export default function InvestorDetails({ isDarkMode, toggleTheme, sidebarCollapsed }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleReject = () => {
    navigate("/investors");
  };

  const handleApprove = () => {
    navigate("/investors");
  };

  return (
    <div className="em-investor-details-container">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />

      <main className="em-investor-details-main">
        {/* Back Button and Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <button 
            className="em-investor-details-back-btn"
            onClick={() => navigate('/investors')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.00004 12.6667L3.33337 8.00001L8.00004 3.33334" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.6667 8H3.33337" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Investors
          </button>
          <div className="em-investor-details-actions">
            <button 
              className="em-investor-details-btn em-investor-details-btn-reject"
              onClick={handleReject}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Reject
            </button>
            <button 
              className="em-investor-details-btn em-investor-details-btn-approve"
              onClick={handleApprove}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Approve
            </button>
          </div>
        </div>

        {/* Page Header */}
        <div className="em-investor-details-header">
          <div className="em-investor-details-title-row">
            <div className="em-investor-details-title-group">
              <h1 className="em-investor-details-title">Aurum Strategies</h1>
              <span className="em-investor-details-badge-warning">Not Verified</span>
              <button className="em-investor-details-type-btn">Angel Investor</button>
            </div>
          </div>
          <div className="em-investor-details-meta-row">
            <span className="em-investor-details-meta-text">investor_aurum • London, UK</span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="em-investor-details-content">
          {/* Main Content */}
          <div className="em-investor-details-main-content">
            {/* Tabs */}
            <div className="em-investor-details-tabs">
              <button 
                className={`em-investor-details-tab ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`em-investor-details-tab ${activeTab === 'investor-profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('investor-profile')}
              >
                Investor Profile
              </button>
              <button 
                className={`em-investor-details-tab ${activeTab === 'financials' ? 'active' : ''}`}
                onClick={() => setActiveTab('financials')}
              >
                Financials
              </button>
              <button 
                className={`em-investor-details-tab ${activeTab === 'interests' ? 'active' : ''}`}
                onClick={() => setActiveTab('interests')}
              >
                Interests
              </button>
            </div>

            {/* Tab Content */}
            <div className="em-investor-details-tab-content">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="em-investor-details-overview-tab">
                  {/* Personal Information */}
                  <div className="em-investor-details-section">
                    <h2 className="em-investor-details-section-title">Personal Information</h2>
                    <p className="em-investor-details-section-subtitle">Core details about the Investor</p>
                    
                    <div className="em-investor-details-info-grid">
                      <div className="em-investor-details-info-item">
                        <label>Full Name</label>
                        <p>Aurum Strategies</p>
                      </div>
                      <div className="em-investor-details-info-item">
                        <label>Username</label>
                        <p>investor_aurum</p>
                      </div>
                      <div className="em-investor-details-info-item">
                        <label>Email</label>
                        <p>invest@aurumstrategies.uk</p>
                      </div>
                      <div className="em-investor-details-info-item">
                        <label>Mobile Number</label>
                        <p>+442071230123</p>
                      </div>
                      <div className="em-investor-details-info-item">
                        <label>Country</label>
                        <p>UK</p>
                      </div>
                      <div className="em-investor-details-info-item">
                        <label>City</label>
                        <p>London</p>
                      </div>
                    </div>
                  </div>

                  {/* Location & Contact */}
                  <div className="em-investor-details-section">
                    <h2 className="em-investor-details-section-title">Location & Contact</h2>
                    <p className="em-investor-details-section-subtitle">Additional contact information</p>
                    
                    <div className="em-investor-details-info-grid em-investor-details-location-grid">
                      <div className="em-investor-details-info-item">
                        <label>Address</label>
                        <p>Not provided</p>
                      </div>
                      <div className="em-investor-details-info-item">
                        <label>LinkedIn</label>
                        <p className="em-investor-details-link">Not provided</p>
                      </div>
                      <div className="em-investor-details-info-item">
                        <label>Twitter</label>
                        <p className="em-investor-details-link">Not provided</p>
                      </div>
                    </div>
                  </div>

                  {/* KYC & Compliance */}
                  <div className="em-investor-details-section">
                    <h2 className="em-investor-details-section-title">KYC & Compliance</h2>
                    <p className="em-investor-details-section-subtitle">Regulatory and compliance information</p>
                    
                    <div className="em-investor-details-compliance-list">
                      <div className="em-investor-details-compliance-item em-investor-details-compliance-success">
                        <div className="em-investor-details-compliance-left">
                          <div className="em-investor-details-compliance-icon-circle">
                           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                          </div>
                          <div className="em-investor-details-compliance-text">
                            <h3>Terms & Conditions</h3>
                            <span>Accepted</span>
                          </div>
                        </div>
                        <span className="em-investor-details-compliance-badge">Active</span>
                      </div>

                      <div className="em-investor-details-compliance-item em-investor-details-compliance-warning">
                        <div className="em-investor-details-compliance-left">
                          <div className="em-investor-details-compliance-icon-circle">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.99996 18.3333C14.6023 18.3333 18.3333 14.6024 18.3333 9.99999C18.3333 5.39762 14.6023 1.66666 9.99996 1.66666C5.39759 1.66666 1.66663 5.39762 1.66663 9.99999C1.66663 14.6024 5.39759 18.3333 9.99996 18.3333Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 6.66663V9.99996" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 13.3333H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                          </div>
                          <div className="em-investor-details-compliance-text">
                            <h3>KYC Verification</h3>
                            <span>Under review</span>
                          </div>
                        </div>
                        <span className="em-investor-details-compliance-badge">Pending</span>
                      </div>

                      <div className="em-investor-details-compliance-item em-investor-details-compliance-neutral">
                        <div className="em-investor-details-compliance-left">
                          <div className="em-investor-details-compliance-icon-circle">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.66675 11.6666C9.42817 11.6666 11.6667 9.42805 11.6667 6.66663C11.6667 3.9052 9.42817 1.66663 6.66675 1.66663C3.90532 1.66663 1.66675 3.9052 1.66675 6.66663C1.66675 9.42805 3.90532 11.6666 6.66675 11.6666Z" stroke="#121212" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.075 8.64166C15.8628 8.93535 16.5638 9.42294 17.1132 10.0593C17.6625 10.6957 18.0426 11.4604 18.2182 12.2826C18.3937 13.1047 18.3591 13.9579 18.1176 14.7632C17.876 15.5685 17.4353 16.2998 16.8362 16.8897C16.2371 17.4795 15.499 17.9087 14.69 18.1377C13.8811 18.3666 13.0275 18.3879 12.2081 18.1995C11.3888 18.0112 10.6301 17.6192 10.0024 17.06C9.37465 16.5007 8.89806 15.7922 8.6167 15" stroke="#121212" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.83325 5H6.66659V8.33333" stroke="#121212" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.925 11.5667L14.5083 12.1584L12.1583 14.5084" stroke="#121212" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                          </div>
                          <div className="em-investor-details-compliance-text">
                            <h3>Shariah Compliance</h3>
                            <span>Not verified</span>
                          </div>
                        </div>
                        <span className="em-investor-details-compliance-badge">Pending</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Investor Profile Tab */}
              {activeTab === 'investor-profile' && (
                <div className="em-investor-details-profile-tab">
                  <div className="em-investor-details-section">
                    <h2 className="em-investor-details-section-title">Investor Profile</h2>
                    <p className="em-investor-details-section-subtitle">Investor strategy and preferences</p>
                    
                    <div className="em-investor-details-profile-info">
                      <div className="em-investor-details-profile-item">
                        <label>Investor Type</label>
                        <p>Angel Investor / Venture Capital</p>
                      </div>
                      <div className="em-investor-details-profile-item">
                        <label>Organization</label>
                        <p>Individual</p>
                      </div>
                      <div className="em-investor-details-profile-item">
                        <label>Investment Goal</label>
                        <p>Create a balanced halal portfolio</p>
                      </div>
                      <div className="em-investor-details-profile-item">
                        <label>Preferred Stages</label>
                        <div className="em-investor-details-stages">
                          <span className="em-investor-details-stage-badge em-investor-details-stage-seed">Seed</span>
                          <span className="em-investor-details-stage-badge em-investor-details-stage-mvp">MVP</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Financials Tab */}
              {activeTab === 'financials' && (
                <div className="em-investor-details-financials-tab">
                  <div className="em-investor-details-section">
                    <h2 className="em-investor-details-section-title">Financial Overview</h2>
                    <p className="em-investor-details-section-subtitle">Investment capacity and portfolio details</p>
                    
                    <div className="em-investor-details-financial-grid">
                      <div className="em-investor-details-financial-card">
                        <label>Total Funds Available</label>
                        <p className="em-investor-details-financial-value">$6,000,000</p>
                      </div>
                      <div className="em-investor-details-financial-card">
                        <label>Total Invested</label>
                        <p className="em-investor-details-financial-value">$1,900,000</p>
                      </div>
                      <div className="em-investor-details-financial-card">
                        <label>Available Balance</label>
                        <p className="em-investor-details-financial-value em-investor-details-financial-value-green">$4,100,000</p>
                      </div>
                      <div className="em-investor-details-financial-card">
                        <label>Portfolio Value</label>
                        <p className="em-investor-details-financial-value">$1,900,000</p>
                      </div>
                    </div>
                  </div>

                  <div className="em-investor-details-section">
                    <h2 className="em-investor-details-section-title">Investment Summary</h2>
                    <p className="em-investor-details-section-subtitle">Key financial metrics</p>
                    
                    <div className="em-investor-details-capacity">
                      <label>Investment Capacity</label>
                      <p className="em-investor-details-capacity-text">68.3% available ($4.1M of $6M total)</p>
                      <div className="em-investor-details-capacity-bar">
                        <div className="em-investor-details-capacity-fill" style={{ width: '68.3%' }}></div>
                      </div>
                    </div>

                    <div className="em-investor-details-summary-grid">
                      <div className="em-investor-details-summary-item">
                        <label>Active Investments</label>
                        <p>Information to be provided</p>
                      </div>
                      <div className="em-investor-details-summary-item">
                        <label>Average Investment Size</label>
                        <p>Information to be provided</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Interests Tab */}
              {activeTab === 'interests' && (
                <div className="em-investor-details-interests-tab">
                  <div className="em-investor-details-section">
                    <h2 className="em-investor-details-section-title">Investment Interest</h2>
                    <p className="em-investor-details-section-subtitle">Sectors and areas of focus</p>
                    
                    <div className="em-investor-details-interests-info">
                      <div className="em-investor-details-interest-item">
                        <label>Sectors</label>
                        <p>No sectors selected</p>
                      </div>
                      <div className="em-investor-details-interest-item">
                        <label>Emireq Coins Interest</label>
                        <div className="em-investor-details-stages">
                          <span className="em-investor-details-coin-badge">Aurioux</span>
                        </div>
                      </div>
                      <div className="em-investor-details-interest-item">
                        <label>Geographic Preferences</label>
                        <p>Information to be provided</p>
                      </div>
                      <div className="em-investor-details-interest-item">
                        <label>Additional Criteria</label>
                        <p>Information to be provided</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="em-investor-details-sidebar">
            {/* Contact Information Card */}
            <div className="em-investor-details-card">
              <h3 className="em-investor-details-card-title">Contact Information</h3>
              
              <div className="em-investor-details-profile-section">
                <div className="em-investor-details-profile-icon">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect width="48" height="48" rx="12" fill="#E5E7EB"/>
                    <path d="M16 32V28C16 26.9391 16.4214 25.9217 17.1716 25.1716C17.9217 24.4214 18.9391 24 20 24H28C29.0609 24 30.0783 24.4214 30.8284 25.1716C31.5786 25.9217 32 26.9391 32 28V32M20 20C20 22.2091 21.7909 24 24 24C26.2091 24 28 22.2091 28 20C28 17.7909 26.2091 16 24 16C21.7909 16 20 17.7909 20 20Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                
                <div className="em-investor-details-profile-name">Aurum Strategies</div>
                
                <div className="em-investor-details-profile-actions">
                  <button className="em-investor-details-action-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_267_3873)">
<path d="M7.33337 2.66666H2.66671C2.31309 2.66666 1.97395 2.80713 1.7239 3.05718C1.47385 3.30723 1.33337 3.64637 1.33337 3.99999V13.3333C1.33337 13.6869 1.47385 14.0261 1.7239 14.2761C1.97395 14.5262 2.31309 14.6667 2.66671 14.6667H12C12.3537 14.6667 12.6928 14.5262 12.9428 14.2761C13.1929 14.0261 13.3334 13.6869 13.3334 13.3333V8.66666" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.3334 1.66665C12.5986 1.40144 12.9583 1.25244 13.3334 1.25244C13.7084 1.25244 14.0682 1.40144 14.3334 1.66665C14.5986 1.93187 14.7476 2.29158 14.7476 2.66665C14.7476 3.04173 14.5986 3.40144 14.3334 3.66665L8.00004 9.99999L5.33337 10.6667L6.00004 7.99999L12.3334 1.66665Z" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_267_3873">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

                  </button>
                  <button className="em-investor-details-action-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.66665 2.66666H13.3333C14.0666 2.66666 14.6666 3.26666 14.6666 3.99999V12C14.6666 12.7333 14.0666 13.3333 13.3333 13.3333H2.66665C1.93331 13.3333 1.33331 12.7333 1.33331 12V3.99999C1.33331 3.26666 1.93331 2.66666 2.66665 2.66666Z" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6666 4L7.99998 8.66667L1.33331 4" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  </button>
                  <button className="em-investor-details-action-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_267_3881)">
<path d="M12.6667 0.666656L15.3334 3.33332L12.6667 5.99999" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 3.33334H15.3333" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6666 11.28V13.28C14.6674 13.4657 14.6294 13.6495 14.555 13.8196C14.4806 13.9897 14.3715 14.1424 14.2347 14.2679C14.0979 14.3934 13.9364 14.489 13.7605 14.5485C13.5846 14.608 13.3982 14.6301 13.2133 14.6133C11.1619 14.3904 9.19131 13.6894 7.45998 12.5667C5.84919 11.5431 4.48353 10.1775 3.45998 8.56668C2.33329 6.82748 1.63214 4.84734 1.41331 2.78668C1.39665 2.60233 1.41856 2.41652 1.47764 2.2411C1.53673 2.06567 1.63169 1.90447 1.75649 1.76776C1.88128 1.63105 2.03318 1.52182 2.2025 1.44703C2.37183 1.37224 2.55487 1.33352 2.73998 1.33335H4.73998C5.06351 1.33016 5.37717 1.44473 5.62248 1.6557C5.8678 1.86667 6.02803 2.15964 6.07331 2.48001C6.15772 3.12006 6.31428 3.7485 6.53998 4.35335C6.62967 4.59196 6.64908 4.85129 6.59591 5.1006C6.54274 5.34991 6.41922 5.57875 6.23998 5.76001L5.39331 6.60668C6.34235 8.27571 7.72428 9.65764 9.39331 10.6067L10.24 9.76001C10.4212 9.58077 10.6501 9.45725 10.8994 9.40408C11.1487 9.35091 11.408 9.37032 11.6466 9.46001C12.2515 9.68571 12.8799 9.84227 13.52 9.92668C13.8438 9.97237 14.1396 10.1355 14.351 10.385C14.5624 10.6345 14.6748 10.9531 14.6666 11.28Z" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_267_3881">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

                  </button>
                  <button className="em-investor-details-action-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.33333 2H14V6.66667M14 9.82467V13C14 13.2652 13.8946 13.5196 13.7071 13.7071C13.5196 13.8946 13.2652 14 13 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H6M8.6 7.4L13.7 2.3" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  </button>
                  <button className="em-investor-details-action-icon">
                   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.99998 8.66668C8.36817 8.66668 8.66665 8.3682 8.66665 8.00001C8.66665 7.63182 8.36817 7.33334 7.99998 7.33334C7.63179 7.33334 7.33331 7.63182 7.33331 8.00001C7.33331 8.3682 7.63179 8.66668 7.99998 8.66668Z" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.6667 8.66668C13.0349 8.66668 13.3333 8.3682 13.3333 8.00001C13.3333 7.63182 13.0349 7.33334 12.6667 7.33334C12.2985 7.33334 12 7.63182 12 8.00001C12 8.3682 12.2985 8.66668 12.6667 8.66668Z" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.33335 8.66668C3.70154 8.66668 4.00002 8.3682 4.00002 8.00001C4.00002 7.63182 3.70154 7.33334 3.33335 7.33334C2.96516 7.33334 2.66669 7.63182 2.66669 8.00001C2.66669 8.3682 2.96516 8.66668 3.33335 8.66668Z" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  </button>
                </div>
              </div>

              <div className="em-investor-details-contact-info">
                <div className="em-investor-details-contact-item">
                  <span className="em-investor-details-contact-label">Contact</span>
                  <span className="em-investor-details-contact-value">+1-555-123-4567</span>
                </div>
                <div className="em-investor-details-contact-item">
                  <span className="em-investor-details-contact-label">Email ID</span>
                  <span className="em-investor-details-contact-value em-investor-details-contact-link">invest@aurumstrategies.uk</span>
                </div>
                <div className="em-investor-details-contact-item">
                  <span className="em-investor-details-contact-label">Address</span>
                  <span className="em-investor-details-contact-value">123 Maplewood Drive, Apt 4B Springfield, IL 62704 United States</span>
                </div>
              </div>
            </div>

            {/* Financial Capacity Card */}
            <div className="em-investor-details-card">
              <h3 className="em-investor-details-card-title">Financial Capacity</h3>
              
              <div className="em-investor-details-capacity-summary">
                <label>Available Balance</label>
                <p className="em-investor-details-amount">$4.1M</p>
                <span className="em-investor-details-capacity-total">of $6M total</span>
              </div>
            </div>

            {/* Timeline Card */}
            <div className="em-investor-details-card">
              <h3 className="em-investor-details-card-title">Timeline</h3>
              
              <div className="em-investor-details-timeline">
                <div className="em-investor-details-timeline-item">
                  <div className="em-investor-details-timeline-icon em-investor-details-timeline-icon-green">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M8 12L10.6667 14.6667L16 9.33333M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="em-investor-details-timeline-content">
                    <p className="em-investor-details-timeline-label">Approved</p>
                    <p className="em-investor-details-timeline-date">October 26, 2025</p>
                  </div>
                </div>

                <div className="em-investor-details-timeline-item">
                  <div className="em-investor-details-timeline-icon em-investor-details-timeline-icon-blue">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M16 3V7M8 3V7M4 11H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="em-investor-details-timeline-content">
                    <p className="em-investor-details-timeline-label">Registered</p>
                    <p className="em-investor-details-timeline-date">October 26, 2025</p>
                  </div>
                </div>

                <div className="em-investor-details-timeline-item">
                  <div className="em-investor-details-timeline-icon em-investor-details-timeline-icon-purple">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="em-investor-details-timeline-content">
                    <p className="em-investor-details-timeline-label">Last Updated</p>
                    <p className="em-investor-details-timeline-date">October 26, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
