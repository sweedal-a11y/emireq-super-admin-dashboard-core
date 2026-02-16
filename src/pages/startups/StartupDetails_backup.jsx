import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import "./StartupDetails.css";

export default function StartupDetails({ isDarkMode, toggleTheme, sidebarCollapsed }) {
  const [activeTab, setActiveTab] = useState("basic");
  const navigate = useNavigate();

  const handleReject = () => {
    alert("Startup rejected");
    navigate("/startups");
  };

  const handleApprove = () => {
    alert("Startup approved");
    navigate("/startups");
  };

  return (
    <div className="em-startup-details-container">
      <Header 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        sidebarCollapsed={sidebarCollapsed}
      />
      
      <main className="em-startup-details-main">
        {/* Back Button */}
        <button 
          className="em-startup-details-back-btn"
          onClick={() => navigate("/startups")}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.00004 12.6667L3.33337 8.00001L8.00004 3.33334" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.6667 8H3.33337" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Startups
        </button>

        {/* Page Header */}
        <div className="em-startup-details-header">
          <div className="em-startup-details-title-row">
            <div className="em-startup-details-title-group">
              <h1 className="em-startup-details-title">Inspection & Clean</h1>
              <span className="em-startup-details-badge-shariah">Shariah Compliant</span>
              <span className="em-startup-details-badge-stage">Series A</span>
            </div>
            <div className="em-startup-details-actions">
              <button 
                className="em-startup-details-btn em-startup-details-btn-reject"
                onClick={handleReject}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Reject
              </button>
              <button 
                className="em-startup-details-btn em-startup-details-btn-approve"
                onClick={handleApprove}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Approve
              </button>
            </div>
          </div>
          <div className="em-startup-details-meta-row">
            <span className="em-startup-details-meta-text">Founded 2025 • Ideal Stage</span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="em-startup-details-content">
          {/* Main Content */}
          <div className="em-startup-details-main-content">

            {/* Tabs */}
            <div className="em-startup-details-tabs">
              <button
                className={`em-startup-details-tab ${activeTab === "basic" ? "active" : ""}`}
                onClick={() => setActiveTab("basic")}
              >
                Basic Information
              </button>
              <button
                className={`em-startup-details-tab ${activeTab === "business" ? "active" : ""}`}
                onClick={() => setActiveTab("business")}
              >
                Business Deals
              </button>
              <button
                className={`em-startup-details-tab ${activeTab === "founders" ? "active" : ""}`}
                onClick={() => setActiveTab("founders")}
              >
                Founders
              </button>
              <button
                className={`em-startup-details-tab ${activeTab === "visions" ? "active" : ""}`}
                onClick={() => setActiveTab("visions")}
              >
                Visions
              </button>
            </div>

            {/* Tab Content */}
            <div className="em-startup-details-tab-content">
              {activeTab === "basic" && (
                <>
                  {/* Basic Information Section */}
                  <div className="em-startup-details-section">
                    <h2 className="em-startup-details-section-title">Basic Information</h2>
                    <p className="em-startup-details-section-subtitle">Core details about the startup</p>
                    
                    <div className="em-startup-details-grid">
                      <div className="em-startup-details-field">
                        <label>Company Name</label>
                        <p>Inspection & Clean</p>
                      </div>
                      <div className="em-startup-details-field">
                        <label>Founded Year</label>
                        <p>2024</p>
                      </div>
                      <div className="em-startup-details-field">
                        <label>Stage</label>
                        <p>Idea</p>
                      </div>
                      <div className="em-startup-details-field">
                        <label>Location</label>
                        <p>Not provided</p>
                      </div>
                      <div className="em-startup-details-field">
                        <label>Website</label>
                        <p className="em-startup-details-link">Not provided</p>
                      </div>
                      <div className="em-startup-details-field">
                        <label>LinkedIn</label>
                        <p className="em-startup-details-link">Not provided</p>
                      </div>
                    </div>
                  </div>

                  {/* Compliance Status Section */}
                  <div className="em-startup-details-section">
                    <h2 className="em-startup-details-section-title">Compliance Status</h2>
                    <p className="em-startup-details-section-subtitle">Regulatory and compliance information</p>
                    
                    <div className="em-startup-details-compliance-list">
                      <div className="em-startup-details-compliance-item em-startup-details-compliance-active">
                        <div className="em-startup-details-compliance-icon em-startup-details-compliance-icon-green">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M16.5 5.5L7.5 14.5L3.5 10.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="em-startup-details-compliance-content">
                          <h3>Shariah Compliant</h3>
                          <p>Verified and approved</p>
                        </div>
                        <span className="em-startup-details-compliance-badge em-startup-details-compliance-badge-active">Active</span>
                      </div>

                      <div className="em-startup-details-compliance-item em-startup-details-compliance-verified">
                        <div className="em-startup-details-compliance-icon em-startup-details-compliance-icon-green">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 1.66666H5.00004C4.55801 1.66666 4.13409 1.84225 3.82153 2.15481C3.50897 2.46737 3.33337 2.8913 3.33337 3.33332V16.6667C3.33337 17.1087 3.50897 17.5326 3.82153 17.8452C4.13409 18.1577 4.55801 18.3333 5.00004 18.3333H15C15.4421 18.3333 15.866 18.1577 16.1786 17.8452C16.4911 17.5326 16.6667 17.1087 16.6667 16.6667V5.83332L12.5 1.66666Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.6666 1.66666V4.99999C11.6666 5.44202 11.8422 5.86594 12.1548 6.1785C12.4673 6.49106 12.8913 6.66666 13.3333 6.66666H16.6666" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.5 12.5L9.16667 14.1667L12.5 10.8333" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                        </div>
                        <div className="em-startup-details-compliance-content">
                          <h3>Business Registration</h3>
                          <p>Documents Verified</p>
                        </div>
                        <span className="em-startup-details-compliance-badge em-startup-details-compliance-badge-verified">Verified</span>
                      </div>

                      <div className="em-startup-details-compliance-item em-startup-details-compliance-pending">
                        <div className="em-startup-details-compliance-icon em-startup-details-compliance-icon-gray">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.66675 11.6667C9.42817 11.6667 11.6667 9.42811 11.6667 6.66669C11.6667 3.90526 9.42817 1.66669 6.66675 1.66669C3.90532 1.66669 1.66675 3.90526 1.66675 6.66669C1.66675 9.42811 3.90532 11.6667 6.66675 11.6667Z" stroke="#121212" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.075 8.64166C15.8628 8.93535 16.5638 9.42294 17.1132 10.0593C17.6625 10.6957 18.0426 11.4604 18.2182 12.2826C18.3937 13.1047 18.3591 13.9579 18.1176 14.7632C17.876 15.5685 17.4353 16.2998 16.8362 16.8897C16.2371 17.4795 15.499 17.9087 14.69 18.1377C13.8811 18.3666 13.0275 18.3879 12.2081 18.1995C11.3888 18.0112 10.6301 17.6192 10.0024 17.06C9.37465 16.5007 8.89806 15.7922 8.6167 15" stroke="#121212" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.83325 5H6.66659V8.33333" stroke="#121212" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.925 11.5667L14.5083 12.1583L12.1583 14.5083" stroke="#121212" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                        </div>
                        <div className="em-startup-details-compliance-content">
                          <h3>Tokenized</h3>
                          <p>Not yet tokenized</p>
                        </div>
                        <span className="em-startup-details-compliance-badge em-startup-details-compliance-badge-pending">Pending</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "business" && (
                <div className="em-startup-details-section">
                  <h2 className="em-startup-details-section-title">Business Modal</h2>
                  <p className="em-startup-details-section-subtitle">Core business strategy and approach</p>
                  
                  <div className="em-startup-details-business-fields">
                    <div className="em-startup-details-business-field">
                      <label>Problem Statement</label>
                      <p>Information to be provided by the startup team.</p>
                    </div>
                    <div className="em-startup-details-business-field">
                      <label>Product Description</label>
                      <p>Information to be provided by the startup team.</p>
                    </div>
                    <div className="em-startup-details-business-field">
                      <label>Target Customers</label>
                      <p>SMEs in MENA retail</p>
                    </div>
                    <div className="em-startup-details-business-field">
                      <label>Competitive Advantage</label>
                      <p>Information to be provided by the startup team.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "founders" && (
                <div className="em-startup-details-section">
                  <h2 className="em-startup-details-section-title">Founder Information</h2>
                  <p className="em-startup-details-section-subtitle">Details about the founding team</p>
                  
                  <div className="em-startup-details-business-fields">
                    <div className="em-startup-details-business-field">
                      <label>Foundation List</label>
                      <p>Information to be provided by the startup team.</p>
                    </div>
                    <div className="em-startup-details-business-field">
                      <label>Professional Backgrounds</label>
                      <p>Information to be provided by the startup team.</p>
                    </div>
                    <div className="em-startup-details-business-field">
                      <label>Origin Story</label>
                      <p>SMEs in MENA retail</p>
                    </div>
                    <div className="em-startup-details-business-field">
                      <label>Motivation</label>
                      <p>Information to be provided by the startup team.</p>
                    </div>
                    <div className="em-startup-details-business-field">
                      <label>Founder Roles</label>
                      <p>Information to be provided by the startup team.</p>
                    </div>
                    <div className="em-startup-details-business-field">
                      <label>Founder Strengths</label>
                      <p>Information to be provided by the startup team.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "visions" && (
                <div className="em-startup-details-section">
                  <h2 className="em-startup-details-section-title">Vision & Goals</h2>
                  <p className="em-startup-details-section-subtitle">Details about the founding team</p>
                  
                  <div className="em-startup-details-business-fields">
                    <div className="em-startup-details-business-field">
                      <label>Short-term Vision</label>
                      <p>Information to be provided by the startup team.</p>
                    </div>
                    <div className="em-startup-details-business-field">
                      <label>Long-term Vision</label>
                      <p>Information to be provided by the startup team.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="em-startup-details-sidebar">
            {/* Founder Contact Card */}
            <div className="em-startup-details-card">
              <h3 className="em-startup-details-card-title">Founder Contact</h3>
              
              <div className="em-startup-details-founder-profile">
                <img 
                  src="https://i.pravatar.cc/150?img=5" 
                  alt="Emma Harrison" 
                  className="em-startup-details-founder-avatar"
                />
                <h4 className="em-startup-details-founder-name">Emma Harrison</h4>
              </div>

              <div className="em-startup-details-founder-actions">
              <div className="em-startup-details-founder-actions">
                <button className="em-startup-details-icon-btn" title="Edit">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_267_4107)">
<path d="M7.33325 2.66667H2.66659C2.31296 2.66667 1.97382 2.80715 1.72378 3.0572C1.47373 3.30724 1.33325 3.64638 1.33325 4.00001V13.3333C1.33325 13.687 1.47373 14.0261 1.72378 14.2761C1.97382 14.5262 2.31296 14.6667 2.66659 14.6667H11.9999C12.3535 14.6667 12.6927 14.5262 12.9427 14.2761C13.1928 14.0261 13.3333 13.687 13.3333 13.3333V8.66667" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.3333 1.66667C12.5985 1.40145 12.9582 1.25246 13.3333 1.25246C13.7083 1.25246 14.068 1.40145 14.3333 1.66667C14.5985 1.93189 14.7475 2.2916 14.7475 2.66667C14.7475 3.04174 14.5985 3.40145 14.3333 3.66667L7.99992 10L5.33325 10.6667L5.99992 8L12.3333 1.66667Z" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_267_4107">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
                </button>
                <button className="em-startup-details-icon-btn" title="Email">
                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.66659 2.66667H13.3333C14.0666 2.66667 14.6666 3.26667 14.6666 4.00001V12C14.6666 12.7333 14.0666 13.3333 13.3333 13.3333H2.66659C1.93325 13.3333 1.33325 12.7333 1.33325 12V4.00001C1.33325 3.26667 1.93325 2.66667 2.66659 2.66667Z" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6666 4L7.99992 8.66667L1.33325 4" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                </button>
                <button className="em-startup-details-icon-btn" title="Call">
                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_267_4115)">
<path d="M12.6667 0.666672L15.3334 3.33334L12.6667 6.00001" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 3.33333H15.3333" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6667 11.28V13.28C14.6675 13.4657 14.6294 13.6494 14.555 13.8196C14.4807 13.9897 14.3716 14.1424 14.2348 14.2679C14.0979 14.3934 13.9364 14.489 13.7605 14.5485C13.5847 14.608 13.3983 14.63 13.2134 14.6133C11.1619 14.3904 9.19137 13.6894 7.46004 12.5667C5.84926 11.5431 4.48359 10.1774 3.46004 8.56667C2.33336 6.82747 1.6322 4.84733 1.41337 2.78667C1.39671 2.60231 1.41862 2.41651 1.4777 2.24108C1.53679 2.06566 1.63175 1.90446 1.75655 1.76775C1.88134 1.63103 2.03324 1.5218 2.20256 1.44701C2.37189 1.37222 2.55493 1.33351 2.74004 1.33333H4.74004C5.06357 1.33015 5.37723 1.44472 5.62254 1.65569C5.86786 1.86666 6.02809 2.15963 6.07337 2.48C6.15779 3.12004 6.31434 3.74848 6.54004 4.35333C6.62973 4.59195 6.64915 4.85127 6.59597 5.10059C6.5428 5.3499 6.41928 5.57874 6.24004 5.76L5.39337 6.60667C6.34241 8.2757 7.72434 9.65763 9.39337 10.6067L10.24 9.76C10.4213 9.58076 10.6501 9.45723 10.8994 9.40406C11.1488 9.35089 11.4081 9.3703 11.6467 9.46C12.2516 9.6857 12.88 9.84225 13.52 9.92667C13.8439 9.97235 14.1396 10.1355 14.3511 10.385C14.5625 10.6345 14.6748 10.953 14.6667 11.28Z" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_267_4115">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
                </button>
                <button className="em-startup-details-icon-btn" title="Share">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.33333 2H14V6.66667M14 9.82467V13C14 13.2652 13.8946 13.5196 13.7071 13.7071C13.5196 13.8946 13.2652 14 13 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H6M8.6 7.4L13.7 2.3" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                </button>
                <button className="em-startup-details-icon-btn" title="More">
                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.99992 8.66666C8.36811 8.66666 8.66659 8.36818 8.66659 7.99999C8.66659 7.63181 8.36811 7.33333 7.99992 7.33333C7.63173 7.33333 7.33325 7.63181 7.33325 7.99999C7.33325 8.36818 7.63173 8.66666 7.99992 8.66666Z" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.6667 8.66666C13.0349 8.66666 13.3333 8.36818 13.3333 7.99999C13.3333 7.63181 13.0349 7.33333 12.6667 7.33333C12.2985 7.33333 12 7.63181 12 7.99999C12 8.36818 12.2985 8.66666 12.6667 8.66666Z" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.33341 8.66666C3.7016 8.66666 4.00008 8.36818 4.00008 7.99999C4.00008 7.63181 3.7016 7.33333 3.33341 7.33333C2.96522 7.33333 2.66675 7.63181 2.66675 7.99999C2.66675 8.36818 2.96522 8.66666 3.33341 8.66666Z" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                </button>
              </div>

              <div className="em-startup-details-founder-info">
              <div className="em-startup-details-founder-info">
                <div className="em-startup-details-info-row">
                  <label>Gender</label>
                  <span>Female</span>
                </div>
                <div className="em-startup-details-info-row">
                  <label>Contact</label>
                  <span>+1-555-123-4567</span>
                </div>
                <div className="em-startup-details-info-row">
                  <label>Email ID</label>
                  <span className="em-startup-details-email">emmaharrison@mail.com</span>
                </div>
                <div className="em-startup-details-info-row">
                  <label>Address</label>
                  <span>123 Maplewood Drive, Apt 4B<br/>Springfield, IL 62704, United States</span>
                </div>
              </div>
            </div>

            {/* Funding Card */}
            <div className="em-startup-details-card">
              <h3 className="em-startup-details-card-title">Funding</h3>
              
              <div className="em-startup-details-funding-amount">
                <label>Funds Raised</label>
                <p className="em-startup-details-amount">$0</p>
              </div>
            </div>

            {/* Timeline Card */}
            <div className="em-startup-details-card">
              <h3 className="em-startup-details-card-title">Timeline</h3>
              
              <div className="em-startup-details-timeline">
                <div className="em-startup-details-timeline-item">
                  <div className="em-startup-details-timeline-icon em-startup-details-timeline-icon-blue">
                   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.33325 1.33334V4.00001" stroke="#155DFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.6667 1.33334V4.00001" stroke="#155DFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.6667 2.66666H3.33333C2.59695 2.66666 2 3.26361 2 3.99999V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V3.99999C14 3.26361 13.403 2.66666 12.6667 2.66666Z" stroke="#155DFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2 6.66666H14" stroke="#155DFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                  </div>
                  <div className="em-startup-details-timeline-content">
                    <label>Registered</label>
                    <p>October 26, 2025</p>
                  </div>
                </div>
                <div className="em-startup-details-timeline-item">
                  <div className="em-startup-details-timeline-icon em-startup-details-timeline-icon-purple">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_267_4165)">
<path d="M7.99992 14.6667C11.6818 14.6667 14.6666 11.6819 14.6666 8.00001C14.6666 4.31811 11.6818 1.33334 7.99992 1.33334C4.31802 1.33334 1.33325 4.31811 1.33325 8.00001C1.33325 11.6819 4.31802 14.6667 7.99992 14.6667Z" stroke="#9810FA" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 4V8L10.6667 9.33333" stroke="#9810FA" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_267_4165">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
                  </div>
                  <div className="em-startup-details-timeline-content">
                    <label>Last Updated</label>
                    <p>October 26, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
