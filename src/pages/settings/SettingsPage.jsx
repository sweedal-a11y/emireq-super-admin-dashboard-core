import React, { useState } from 'react';
import './SettingsPage.css';
import Header from '../../components/header/Header';

const SettingsPage = ({ isDarkMode, toggleTheme, sidebarCollapsed }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [platformName, setPlatformName] = useState('EmireQ');
  const [supportEmail, setSupportEmail] = useState('support@emireq.com');
  const [contactPhone, setContactPhone] = useState('+971-4-1234567');
  const [defaultCurrency, setDefaultCurrency] = useState('USD ($)');
  const [timezone, setTimezone] = useState('Asia/Dubai (UTC+4)');
  const [dateFormat, setDateFormat] = useState('YYYY-MM-DD');
  const [language, setLanguage] = useState('English');
  const [numberFormat, setNumberFormat] = useState('1234.56');
  const [shariahCompliance, setShariahCompliance] = useState(true);
  const [automatedZakat, setAutomatedZakat] = useState(true);
  const [kycVerification, setKycVerification] = useState(true);
  const [tokenizationModule, setTokenizationModule] = useState(true);
  const [metaverseIntegration, setMetaverseIntegration] = useState(true);
  const [aiMatching, setAiMatching] = useState(true);

  const menuItems = [
    { id: 'general', label: 'General', icon: 'settings' },
    { id: 'user-management', label: 'User Management', icon: 'users' },
    { id: 'security', label: 'Security', icon: 'shield' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' },
    { id: 'data-management', label: 'Data Management', icon: 'database' },
    { id: 'integrations', label: 'Integrations', icon: 'plug' },
    { id: 'api-settings', label: 'API Settings', icon: 'code' }
  ];

  const renderIcon = (type) => {
    const icons = {
      settings: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.93 9.17C12.86 9.39 12.87 9.63 12.96 9.85L13.61 11.43C13.78 11.84 13.62 12.31 13.24 12.53L12.58 12.93C12.36 13.06 12.11 13.1 11.87 13.06C11.63 13.01 11.42 12.88 11.27 12.69L10.69 11.95C10.53 11.76 10.3 11.64 10.06 11.61C9.82 11.59 9.58 11.66 9.38 11.81L7.62 13.08C7.25 13.34 6.75 13.29 6.43 12.96L5.89 12.43C5.71 12.24 5.61 12 5.61 11.75C5.61 11.5 5.71 11.26 5.89 11.07L6.69 10.27C6.87 10.09 6.98 9.85 6.98 9.6C6.98 9.35 6.87 9.11 6.69 8.93L5.89 8.13C5.52 7.76 5.52 7.16 5.89 6.79L6.43 6.25C6.75 5.92 7.25 5.87 7.62 6.13L9.38 7.4C9.58 7.55 9.82 7.62 10.06 7.6C10.3 7.57 10.53 7.45 10.69 7.26L11.27 6.52C11.42 6.33 11.63 6.2 11.87 6.15C12.11 6.11 12.36 6.15 12.58 6.28L13.24 6.68C13.62 6.9 13.78 7.37 13.61 7.78L12.96 9.36C12.87 9.58 12.86 9.82 12.93 10.04" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      users: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M11 14C11 12.3431 9.20914 11 7 11C4.79086 11 3 12.3431 3 14M13 11.5C14.3968 11.5 15 12.8431 15 14M1 11.5C2.39683 11.5 3 12.8431 3 14M7 8C8.65685 8 10 6.65685 10 5C10 3.34315 8.65685 2 7 2C5.34315 2 4 3.34315 4 5C4 6.65685 5.34315 8 7 8ZM13 7C13.5523 7 14 6.55228 14 6C14 5.44772 13.5523 5 13 5C12.4477 5 12 5.44772 12 6C12 6.55228 12.4477 7 13 7ZM1 7C1.55228 7 2 6.55228 2 6C2 5.44772 1.55228 5 1 5C0.447715 5 0 5.44772 0 6C0 6.55228 0.447715 7 1 7Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      shield: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1L3 3V7C3 10.5 5.5 13.5 8 14C10.5 13.5 13 10.5 13 7V3L8 1Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      bell: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 5.33333C12 4.27247 11.5786 3.25505 10.8284 2.50491C10.0783 1.75476 9.06087 1.33333 8 1.33333C6.93913 1.33333 5.92172 1.75476 5.17157 2.50491C4.42143 3.25505 4 4.27247 4 5.33333C4 10 2 11.3333 2 11.3333H14C14 11.3333 12 10 12 5.33333Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.15335 14C9.03614 14.2021 8.86791 14.3698 8.6655 14.4864C8.46309 14.603 8.23344 14.6643 8.00001 14.6643C7.76659 14.6643 7.53694 14.603 7.33453 14.4864C7.13212 14.3698 6.96389 14.2021 6.84668 14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      database: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3C11.3137 3 14 2.32843 14 1.5C14 0.671573 11.3137 0 8 0C4.68629 0 2 0.671573 2 1.5C2 2.32843 4.68629 3 8 3Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 1.5V4.5C14 5.32843 11.3137 6 8 6C4.68629 6 2 5.32843 2 4.5V1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 4.5V7.5C14 8.32843 11.3137 9 8 9C4.68629 9 2 8.32843 2 7.5V4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      plug: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 6V2M10 6V2M5 6H11C11.5523 6 12 6.44772 12 7V9C12 11.2091 10.2091 13 8 13C5.79086 13 4 11.2091 4 9V7C4 6.44772 4.44772 6 5 6ZM8 13V15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      code: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10.6667 4L14 8L10.6667 12M5.33333 4L2 8L5.33333 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    };
    return icons[type] || null;
  };

  const handleSaveChanges = () => {
    console.log('Settings saved');
    // Add save logic here
  };

  return (
    <div className="settings-page">
      <Header 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme}
        sidebarCollapsed={sidebarCollapsed}
      />
      
      <div className="settings-content">
        <div className="settings-layout">
          {/* Left Sidebar Menu */}
          <div className="settings-sidebar">
            {menuItems.map(item => (
              <button
                key={item.id}
                className={`settings-menu-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="menu-icon">{renderIcon(item.icon)}</span>
                <span className="menu-label">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="settings-main">
            {activeTab === 'general' && (
              <>
                <div className="settings-section-header">
                  <h1>Platform Settings</h1>
                  <p className="section-subtitle">Configure platform preferences and system settings</p>
                </div>

                {/* Platform Information */}
                <div className="settings-section">
                  <h2 className="section-title">Platform Information</h2>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Platform Name</label>
                      <input
                        type="text"
                        value={platformName}
                        onChange={(e) => setPlatformName(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Support Email</label>
                      <input
                        type="email"
                        value={supportEmail}
                        onChange={(e) => setSupportEmail(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Contact Phone</label>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Default Currency</label>
                      <input
                        type="text"
                        value={defaultCurrency}
                        onChange={(e) => setDefaultCurrency(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Regional Settings */}
                <div className="settings-section">
                  <h2 className="section-title">Regional Settings</h2>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Timezone</label>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="form-select"
                      >
                        <option>Asia/Dubai (UTC+4)</option>
                        <option>America/New_York (UTC-5)</option>
                        <option>Europe/London (UTC+0)</option>
                        <option>Asia/Tokyo (UTC+9)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Date Format</label>
                      <select
                        value={dateFormat}
                        onChange={(e) => setDateFormat(e.target.value)}
                        className="form-select"
                      >
                        <option>YYYY-MM-DD</option>
                        <option>DD/MM/YYYY</option>
                        <option>MM/DD/YYYY</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Language</label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="form-select"
                      >
                        <option>English</option>
                        <option>Arabic</option>
                        <option>French</option>
                        <option>Spanish</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Number Format</label>
                      <input
                        type="text"
                        value={numberFormat}
                        onChange={(e) => setNumberFormat(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Shariah & Compliance */}
                <div className="settings-section">
                  <h2 className="section-title">Shariah & Compliance</h2>
                  <div className="toggle-list">
                    <div className="toggle-item">
                      <div className="toggle-info">
                        <h3 className="toggle-title">Shariah Compliance Enforcement</h3>
                        <p className="toggle-description">Require Shariah approval for all investments</p>
                      </div>
                      <button
                        className={`toggle-switch ${shariahCompliance ? 'active' : ''}`}
                        onClick={() => setShariahCompliance(!shariahCompliance)}
                        aria-label="Toggle Shariah Compliance"
                      >
                        <span className="toggle-slider"></span>
                      </button>
                    </div>
                    <div className="toggle-item">
                      <div className="toggle-info">
                        <h3 className="toggle-title">Automated Zakat Calculation</h3>
                        <p className="toggle-description">Calculate Zakat automatically for investors</p>
                      </div>
                      <button
                        className={`toggle-switch ${automatedZakat ? 'active' : ''}`}
                        onClick={() => setAutomatedZakat(!automatedZakat)}
                        aria-label="Toggle Automated Zakat"
                      >
                        <span className="toggle-slider"></span>
                      </button>
                    </div>
                    <div className="toggle-item">
                      <div className="toggle-info">
                        <h3 className="toggle-title">KYC/AML Verification</h3>
                        <p className="toggle-description">Mandatory verification for all users</p>
                      </div>
                      <button
                        className={`toggle-switch ${kycVerification ? 'active' : ''}`}
                        onClick={() => setKycVerification(!kycVerification)}
                        aria-label="Toggle KYC Verification"
                      >
                        <span className="toggle-slider"></span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Platform Features */}
                <div className="settings-section">
                  <h2 className="section-title">Platform Features</h2>
                  <div className="toggle-list">
                    <div className="toggle-item">
                      <div className="toggle-info">
                        <h3 className="toggle-title">Tokenization Module</h3>
                        <p className="toggle-description">Enable blockchain tokenization features</p>
                      </div>
                      <button
                        className={`toggle-switch ${tokenizationModule ? 'active' : ''}`}
                        onClick={() => setTokenizationModule(!tokenizationModule)}
                        aria-label="Toggle Tokenization"
                      >
                        <span className="toggle-slider"></span>
                      </button>
                    </div>
                    <div className="toggle-item">
                      <div className="toggle-info">
                        <h3 className="toggle-title">Metaverse Integration</h3>
                        <p className="toggle-description">Enable virtual events and metaverse features</p>
                      </div>
                      <button
                        className={`toggle-switch ${metaverseIntegration ? 'active' : ''}`}
                        onClick={() => setMetaverseIntegration(!metaverseIntegration)}
                        aria-label="Toggle Metaverse"
                      >
                        <span className="toggle-slider"></span>
                      </button>
                    </div>
                    <div className="toggle-item">
                      <div className="toggle-info">
                        <h3 className="toggle-title">AI-Powered Matching</h3>
                        <p className="toggle-description">Use AI to match startups with investors</p>
                      </div>
                      <button
                        className={`toggle-switch ${aiMatching ? 'active' : ''}`}
                        onClick={() => setAiMatching(!aiMatching)}
                        aria-label="Toggle AI Matching"
                      >
                        <span className="toggle-slider"></span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="settings-actions">
                  <button className="save-button" onClick={handleSaveChanges}>
                    Save Changes
                  </button>
                </div>
              </>
            )}

            {activeTab !== 'general' && (
              <div className="settings-section-header">
                <h1>{menuItems.find(item => item.id === activeTab)?.label}</h1>
                <p className="section-subtitle">Content for this section coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
