import { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Header.css";
import avatar from "../../assets/arab1.png";

export default function Header({ isDarkMode, toggleTheme }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();

  // Close dropdown on OUTSIDE click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const isTokenPage = location.pathname === "/dashboard/token";
  const isAnalyticsPage = location.pathname === "/dashboard/analytics";
  const isOutreachPage = location.pathname === "/dashboard/outreach";
  const isStartupsPage = location.pathname === "/startups";
  const isInvestorsPage = location.pathname === "/investors";
  const isFundingPage = location.pathname === "/funding";
  const isDealPage = location.pathname === "/deal";
  const isCompliancePage = location.pathname === "/compliance";
  const isReportsPage = location.pathname === "/reports";
  const isStartupDetailsPage = location.pathname === "/startups/details";
  const isInvestorDetailsPage = location.pathname === "/investors/details";
  const isTokenizationPage = location.pathname === "/tokenization";
  const isMetaversePage = location.pathname === "/metaverse";
  const isZakatPage = location.pathname === "/zakat";
  const isInvestorNetworkPage = location.pathname === "/investor-network";
  const isSettingsPage = location.pathname === "/settings";

  return (
    <header className={`em-header ${isTokenizationPage ? 'em-header--tokenization' : ''}`}>
      {isTokenPage ? (
        <div className="em-header-breadcrumb">
          <span className="em-breadcrumb-item">Dashboard</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="em-breadcrumb-arrow">
            <path d="M6 12L10 8L6 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="em-breadcrumb-item em-breadcrumb-item--active">Token</span>
        </div>
      ) : isAnalyticsPage ? (
        <div className="em-header-breadcrumb">
          <span className="em-breadcrumb-item">Dashboard</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="em-breadcrumb-arrow">
            <path d="M6 12L10 8L6 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="em-breadcrumb-item em-breadcrumb-item--active">Analytics</span>
        </div>
      ) : isOutreachPage ? (
        <div className="em-header-breadcrumb">
          <span className="em-breadcrumb-item">Dashboard</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="em-breadcrumb-arrow">
            <path d="M6 12L10 8L6 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="em-breadcrumb-item em-breadcrumb-item--active">Outreach</span>
        </div>
      ) : isStartupsPage ? (
        <div className="em-header-breadcrumb">
          <Link to="/overview" className="em-breadcrumb-item em-breadcrumb-link">Dashboard</Link>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="em-breadcrumb-arrow">
            <path d="M6 12L10 8L6 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="em-breadcrumb-item em-breadcrumb-item--active">Startups</span>
        </div>
      ) : isInvestorsPage ? (
        <div className="em-header-breadcrumb">
          <Link to="/overview" className="em-breadcrumb-item em-breadcrumb-link">Dashboard</Link>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="em-breadcrumb-arrow">
            <path d="M6 12L10 8L6 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="em-breadcrumb-item em-breadcrumb-item--active">Investors</span>
        </div>
      ) : isFundingPage ? (
        <div className="em-header-breadcrumb">
          <Link to="/overview" className="em-breadcrumb-item em-breadcrumb-link">Dashboard</Link>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="em-breadcrumb-arrow">
            <path d="M6 12L10 8L6 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="em-breadcrumb-item em-breadcrumb-item--active">Funding</span>
        </div>
      ) : isDealPage ? (
        <div className="em-header-breadcrumb">
          <Link to="/overview" className="em-breadcrumb-item em-breadcrumb-link">Dashboard</Link>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="em-breadcrumb-arrow">
            <path d="M6 12L10 8L6 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="em-breadcrumb-item em-breadcrumb-item--active">Deal</span>
        </div>
      ) : isCompliancePage ? (
        <div className="em-header-breadcrumb">
          <Link to="/overview" className="em-breadcrumb-item em-breadcrumb-link">Dashboard</Link>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="em-breadcrumb-arrow">
            <path d="M6 12L10 8L6 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="em-breadcrumb-item em-breadcrumb-item--active">Compliance</span>
        </div>
      ) : isReportsPage ? (
        <div className="em-header-breadcrumb">
          <Link to="/overview" className="em-breadcrumb-item em-breadcrumb-link">Dashboard</Link>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="em-breadcrumb-arrow">
            <path d="M6 12L10 8L6 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="em-breadcrumb-item em-breadcrumb-item--active">Reports</span>
        </div>
      ) : isStartupDetailsPage ? (
        <div className="em-header-breadcrumb">
          <Link to="/overview" className="em-breadcrumb-item em-breadcrumb-link">Dashboard</Link>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="em-breadcrumb-arrow">
            <path d="M6 12L10 8L6 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <Link to="/startups" className="em-breadcrumb-item em-breadcrumb-link">Startups</Link>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="em-breadcrumb-arrow">
            <path d="M6 12L10 8L6 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="em-breadcrumb-item em-breadcrumb-item--active">Startup Details</span>
        </div>
      ) : isInvestorDetailsPage ? (
        <div className="em-header-breadcrumb">
          <Link to="/overview" className="em-breadcrumb-item em-breadcrumb-link">Dashboard</Link>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="em-breadcrumb-arrow">
            <path d="M6 12L10 8L6 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <Link to="/investors" className="em-breadcrumb-item em-breadcrumb-link">Investors</Link>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="em-breadcrumb-arrow">
            <path d="M6 12L10 8L6 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="em-breadcrumb-item em-breadcrumb-item--active">Investor Details</span>
        </div>
      ) : isTokenizationPage ? (
        <div className="em-header-breadcrumb">
          <Link to="/overview" className="em-breadcrumb-item em-breadcrumb-link">Dashboard</Link>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="em-breadcrumb-arrow">
            <path d="M6 12L10 8L6 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="em-breadcrumb-item em-breadcrumb-item--active">Tokenization</span>
        </div>
      ) : isMetaversePage ? (
        <div className="em-header-breadcrumb">
          <Link to="/overview" className="em-breadcrumb-item em-breadcrumb-link">Dashboard</Link>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="em-breadcrumb-arrow">
            <path d="M6 12L10 8L6 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="em-breadcrumb-item em-breadcrumb-item--active">Metaverse</span>
        </div>
      ) : isZakatPage ? (
        <div className="em-header-breadcrumb">
          <Link to="/overview" className="em-breadcrumb-item em-breadcrumb-link">Dashboard</Link>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="em-breadcrumb-arrow">
            <path d="M6 12L10 8L6 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="em-breadcrumb-item em-breadcrumb-item--active">Zakat</span>
        </div>
      ) : isInvestorNetworkPage ? (
        <div className="em-header-breadcrumb">
          <Link to="/overview" className="em-breadcrumb-item em-breadcrumb-link">Dashboard</Link>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="em-breadcrumb-arrow">
            <path d="M6 12L10 8L6 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="em-breadcrumb-item em-breadcrumb-item--active">Investor Network</span>
        </div>
      ) : isSettingsPage ? (
        <div className="em-header-breadcrumb">
          <Link to="/overview" className="em-breadcrumb-item em-breadcrumb-link">Dashboard</Link>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="em-breadcrumb-arrow">
            <path d="M6 12L10 8L6 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="em-breadcrumb-item em-breadcrumb-item--active">Settings</span>
        </div>
      ) : (
        <h2 className="em-header-title">Dashboard</h2>
      )}

      <div className="em-header-actions">
        {/* THEME TOGGLE */}
        <button
          className="em-header-theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {/* SVG kept unchanged */}
         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_114_12193)">
<path d="M7.99935 11.3327C9.8403 11.3327 11.3327 9.8403 11.3327 7.99935C11.3327 6.1584 9.8403 4.66602 7.99935 4.66602C6.1584 4.66602 4.66602 6.1584 4.66602 7.99935C4.66602 9.8403 6.1584 11.3327 7.99935 11.3327Z" stroke="#2F2F33" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 0.666016V1.99935" stroke="#2F2F33" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 14V15.3333" stroke="#2F2F33" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.8125 2.8125L3.75917 3.75917" stroke="#2F2F33" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.2402 12.2402L13.1869 13.1869" stroke="#2F2F33" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M0.666016 8H1.99935" stroke="#2F2F33" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 8H15.3333" stroke="#2F2F33" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.8125 13.1869L3.75917 12.2402" stroke="#2F2F33" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.2402 3.75917L13.1869 2.8125" stroke="#2F2F33" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_114_12193">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

        </button>

 {/* SEARCH */}
<div className="em-header-search">
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="em-header-search-icon"
  >
    <path
      d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
      stroke="#2F2F33"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.9996 13.9996L11.0996 11.0996"
      stroke="#2F2F33"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>

  <input
    type="text"
    placeholder="Search"
    className="em-header-search-input"
  />
</div>


       {/* NOTIFICATION */}
<button
  className="em-header-notification"
  aria-label="Notifications"
>
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="em-header-notification-icon"
  >
    <path
      d="M12 5.33398C12 4.27312 11.5786 3.2557 10.8284 2.50556C10.0783 1.75541 9.06087 1.33398 8 1.33398C6.93913 1.33398 5.92172 1.75541 5.17157 2.50556C4.42143 3.2557 4 4.27312 4 5.33398C4 10.0007 2 11.334 2 11.334H14C14 11.334 12 10.0007 12 5.33398Z"
      stroke="#2F2F33"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.15237 14C9.03516 14.2021 8.86693 14.3698 8.66452 14.4864C8.46211 14.6029 8.23262 14.6643 7.99904 14.6643C7.76545 14.6643 7.53596 14.6029 7.33355 14.4864C7.13114 14.3698 6.96291 14.2021 6.8457 14"
      stroke="#2F2F33"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>

  <span className="em-header-notification-dot"></span>
</button>


        {/* PROFILE */}
        <div className="em-header-profile" ref={profileRef}>
          {/* MENU BUTTON (ONLY THIS TOGGLES DROPDOWN) */}
          <button
            className="em-header-profile-menu"
            aria-label="Profile menu"
            onClick={(e) => {
              e.stopPropagation();
              setProfileOpen((prev) => !prev);
            }}
          >
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
              <path
                d="M0.75 0.75H14.75"
                stroke="#2F2F33"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M0.75 6.75H11.75"
                stroke="#2F2F33"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* AVATAR (NO TOGGLE HERE) */}
          <div className="em-header-profile-avatar">
            <img
              src={avatar}
              alt="User profile"
              className="em-header-avatar-img"
            />
          </div>

          {/* DROPDOWN */}
          {profileOpen && (
            <div
              className="em-profile-dropdown"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="em-profile-user">
                <img src={avatar} alt="User" />
                <div>
                  <div className="em-profile-name">John Doe</div>
                  <div className="em-profile-email">
                    johndoe@gmail.com
                  </div>
                </div>
              </div>

              <div className="em-profile-divider" />

              <button className="em-profile-item">
                <span className="em-profile-item-icon">👤</span>
                My Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
