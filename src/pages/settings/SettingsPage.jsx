import React, { useState } from 'react';
import './SettingsPage.css';
import Header from '../../components/header/Header';

const SettingsPage = ({ isDarkMode, toggleTheme, sidebarCollapsed }) => {
  const [activeTab, setActiveTab]               = useState('general');
  const [platformName, setPlatformName]         = useState('EmiraQ');
  const [supportEmail, setSupportEmail]         = useState('support@emireq.com');
  const [contactPhone, setContactPhone]         = useState('+971-4-1234567');
  const [defaultCurrency, setDefaultCurrency]   = useState('USD ($)');
  const [timezone, setTimezone]                 = useState('Asia/Dubai (UTC+4)');
  const [dateFormat, setDateFormat]             = useState('YYYY-MM-DD');
  const [language, setLanguage]                 = useState('English');
  const [numberFormat, setNumberFormat]         = useState('1,234.56');
  const [shariahCompliance, setShariahCompliance] = useState(true);
  const [automatedZakat, setAutomatedZakat]     = useState(true);
  const [kycVerification, setKycVerification]   = useState(true);
  const [tokenizationModule, setTokenizationModule] = useState(true);
  const [metaverseIntegration, setMetaverseIntegration] = useState(true);
  const [aiMatching, setAiMatching]             = useState(true);

  const menuItems = [
    { id: 'general',         label: 'General',         icon: 'settings'  },
    { id: 'user-management', label: 'User Management', icon: 'users'     },
    { id: 'security',        label: 'Security',        icon: 'shield'    },
    { id: 'notifications',   label: 'Notifications',   icon: 'bell'      },
    { id: 'data-management', label: 'Data Management', icon: 'database'  },
    { id: 'integrations',    label: 'Integrations',    icon: 'plug'      },
    { id: 'api-settings',    label: 'API Settings',    icon: 'code'      },
  ];

  const icons = {
    settings: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    users: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    shield: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bell: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    database: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    plug: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <path d="M18 6H6M6 6v6a6 6 0 0 0 12 0V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 2v4M15 2v4M12 18v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    code: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };

  // Chevron for selects
  const ChevronDown = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="sp-select-chevron">
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const Toggle = ({ on, onToggle, label }) => (
    <button
      className={`sp-toggle${on ? ' sp-toggle--on' : ''}`}
      onClick={onToggle}
      aria-label={label}
      role="switch"
      aria-checked={on}
    >
      <span className="sp-toggle__knob" />
    </button>
  );

  return (
    <div className={`sp-root em-startup-overview in-page${sidebarCollapsed ? ' sp-root--collapsed em-startup-overview--sidebar-collapsed' : ''}${isDarkMode ? ' dark' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />

      <div className="sp-body">
        {/* ── Left sidebar ── */}
        <aside className="sp-sidebar">
          <nav className="sp-nav">
            {menuItems.map(item => (
              <button
                key={item.id}
                className={`sp-nav-item${activeTab === item.id ? ' sp-nav-item--active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="sp-nav-icon">{icons[item.icon]}</span>
                <span className="sp-nav-label">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Main content ── */}
        <main className="sp-main">
          {activeTab === 'general' ? (
            <>
              {/* Page heading */}
              <div className="sp-page-head">
                <h1 className="sp-page-title">Platform Settings</h1>
                <p className="sp-page-sub">Configure platform preferences and system settings</p>
              </div>

              {/* ── Platform Information ── */}
              <section className="sp-card">
                <h2 className="sp-card-title">Platform Information</h2>
                <div className="sp-form-grid">
                  <div className="sp-field">
                    <label className="sp-label">Platform Name</label>
                    <input className="sp-input" type="text" value={platformName} onChange={e => setPlatformName(e.target.value)} />
                  </div>
                  <div className="sp-field">
                    <label className="sp-label">Support Email</label>
                    <input className="sp-input" type="email" value={supportEmail} onChange={e => setSupportEmail(e.target.value)} />
                  </div>
                  <div className="sp-field">
                    <label className="sp-label">Contact Phone</label>
                    <input className="sp-input" type="tel" value={contactPhone} onChange={e => setContactPhone(e.target.value)} />
                  </div>
                  <div className="sp-field">
                    <label className="sp-label">Default Currency</label>
                    <input className="sp-input" type="text" value={defaultCurrency} onChange={e => setDefaultCurrency(e.target.value)} />
                  </div>
                </div>
              </section>

              {/* ── Regional Settings ── */}
              <section className="sp-card">
                <h2 className="sp-card-title">Regional Settings</h2>
                <div className="sp-form-grid">
                  <div className="sp-field">
                    <label className="sp-label">Timezone</label>
                    <div className="sp-select-wrap">
                      <select className="sp-select" value={timezone} onChange={e => setTimezone(e.target.value)}>
                        <option>Asia/Dubai (UTC+4)</option>
                        <option>America/New_York (UTC-5)</option>
                        <option>Europe/London (UTC+0)</option>
                        <option>Asia/Tokyo (UTC+9)</option>
                      </select>
                      <ChevronDown />
                    </div>
                  </div>
                  <div className="sp-field">
                    <label className="sp-label">Date Format</label>
                    <div className="sp-select-wrap">
                      <select className="sp-select" value={dateFormat} onChange={e => setDateFormat(e.target.value)}>
                        <option>YYYY-MM-DD</option>
                        <option>DD/MM/YYYY</option>
                        <option>MM/DD/YYYY</option>
                      </select>
                      <ChevronDown />
                    </div>
                  </div>
                  <div className="sp-field">
                    <label className="sp-label">Language</label>
                    <div className="sp-select-wrap">
                      <select className="sp-select" value={language} onChange={e => setLanguage(e.target.value)}>
                        <option>English</option>
                        <option>Arabic</option>
                        <option>French</option>
                        <option>Spanish</option>
                      </select>
                      <ChevronDown />
                    </div>
                  </div>
                  <div className="sp-field">
                    <label className="sp-label">Number Format</label>
                    <div className="sp-select-wrap">
                      <select className="sp-select" value={numberFormat} onChange={e => setNumberFormat(e.target.value)}>
                        <option>1,234.56</option>
                        <option>1.234,56</option>
                        <option>1234.56</option>
                      </select>
                      <ChevronDown />
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Shariah & Compliance ── */}
              <section className="sp-card">
                <h2 className="sp-card-title">Shariah &amp; Compliance</h2>
                <div className="sp-toggle-list">
                  {[
                    { label: 'Shariah Compliance Enforcement', desc: 'Require Shariah approval for all investments', val: shariahCompliance, set: setShariahCompliance },
                    { label: 'Automated Zakat Calculation',    desc: 'Calculate Zakat automatically for investors',  val: automatedZakat,     set: setAutomatedZakat  },
                    { label: 'KYC/AML Verification',          desc: 'Mandatory verification for all users',         val: kycVerification,    set: setKycVerification },
                  ].map((item, i, arr) => (
                    <div key={item.label} className={`sp-toggle-row${i < arr.length - 1 ? ' sp-toggle-row--border' : ''}`}>
                      <div className="sp-toggle-info">
                        <p className="sp-toggle-title">{item.label}</p>
                        <p className="sp-toggle-desc">{item.desc}</p>
                      </div>
                      <Toggle on={item.val} onToggle={() => item.set(!item.val)} label={item.label} />
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Platform Features ── */}
              <section className="sp-card">
                <h2 className="sp-card-title">Platform Features</h2>
                <div className="sp-toggle-list">
                  {[
                    { label: 'Tokenization Module',   desc: 'Enable blockchain tokenization features',      val: tokenizationModule,   set: setTokenizationModule   },
                    { label: 'Metaverse Integration', desc: 'Enable virtual events and metaverse features', val: metaverseIntegration, set: setMetaverseIntegration },
                    { label: 'AI-Powered Matching',   desc: 'Use AI to match startups with investors',     val: aiMatching,           set: setAiMatching           },
                  ].map((item, i, arr) => (
                    <div key={item.label} className={`sp-toggle-row${i < arr.length - 1 ? ' sp-toggle-row--border' : ''}`}>
                      <div className="sp-toggle-info">
                        <p className="sp-toggle-title">{item.label}</p>
                        <p className="sp-toggle-desc">{item.desc}</p>
                      </div>
                      <Toggle on={item.val} onToggle={() => item.set(!item.val)} label={item.label} />
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Save ── */}
              <div className="sp-actions">
                <button className="sp-save-btn" onClick={() => console.log('saved')}>
                  Save Changes
                </button>
              </div>
            </>
          ) : (
            <div className="sp-page-head">
              <h1 className="sp-page-title">{menuItems.find(m => m.id === activeTab)?.label}</h1>
              <p className="sp-page-sub">Content for this section coming soon…</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;