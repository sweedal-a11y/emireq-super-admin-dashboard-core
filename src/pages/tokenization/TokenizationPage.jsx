import React, { useState } from 'react';
import './TokenizationPage.css';
import Header from "../../components/header/Header";


// ─── Donut Chart ────────────────────────────────────────────────────────────
const DonutChart = ({ data, hovered, onHover }) => {
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 120;
  const innerR = 72;

  const total = data.reduce((s, d) => s + d.value, 0);
  let cumAngle = -90; // start at top

  const toRad = (deg) => (deg * Math.PI) / 180;

  const arcPath = (startDeg, endDeg, oR, iR) => {
    const start = toRad(startDeg);
    const end = toRad(endDeg);
    const x1 = cx + oR * Math.cos(start);
    const y1 = cy + oR * Math.sin(start);
    const x2 = cx + oR * Math.cos(end);
    const y2 = cy + oR * Math.sin(end);
    const x3 = cx + iR * Math.cos(end);
    const y3 = cy + iR * Math.sin(end);
    const x4 = cx + iR * Math.cos(start);
    const y4 = cy + iR * Math.sin(start);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M${x1},${y1} A${oR},${oR},0,${large},1,${x2},${y2} L${x3},${y3} A${iR},${iR},0,${large},0,${x4},${y4} Z`;
  };

  const segments = data.map((item) => {
    const angle = (item.value / total) * 360;
    const seg = { ...item, startAngle: cumAngle, endAngle: cumAngle + angle - 1.5 };
    cumAngle += angle;
    return seg;
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* subtle border ring */}
      <circle cx={cx} cy={cy} r={outerR + 8} fill="none" stroke="#E5E7EB" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={innerR - 8} fill="none" stroke="#E5E7EB" strokeWidth="1" />
      {segments.map((seg) => {
        const isHovered = hovered === seg.label;
        const isDimmed = hovered && !isHovered;
        return (
          <path
            key={seg.label}
            d={arcPath(seg.startAngle, seg.endAngle, isHovered ? outerR + 4 : outerR, innerR)}
            fill={seg.color}
            opacity={isDimmed ? 0.35 : 1}
            style={{ transition: 'all 0.25s ease', cursor: 'pointer' }}
            onMouseEnter={() => onHover(seg.label)}
            onMouseLeave={() => onHover(null)}
          />
        );
      })}
    </svg>
  );
};

// ─── Bar Chart ───────────────────────────────────────────────────────────────
const BarChart = ({ data, hovered, onHover }) => {
  const W = 360, H = 240, padL = 40, padB = 36, padT = 16, padR = 16;
  const chartW = W - padL - padR;
  const chartH = H - padB - padT;
  const maxVal = 60;
  const yTicks = [0, 15, 30, 45, 60];
  const barW = 64;
  const gap = (chartW - data.length * barW) / (data.length + 1);

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      {/* Y grid lines */}
      {yTicks.map((tick) => {
        const y = padT + chartH - (tick / maxVal) * chartH;
        return (
          <g key={tick}>
            <line x1={padL} x2={W - padR} y1={y} y2={y} stroke="#F0F0F0" strokeWidth="1" strokeDasharray="4 3" />
            <text x={padL - 6} y={y + 4} fontSize="10" fill="#9CA3AF" textAnchor="end">{tick}</text>
          </g>
        );
      })}
      {/* Axes */}
      <line x1={padL} x2={padL} y1={padT} y2={padT + chartH} stroke="#D1D5DB" strokeWidth="1" />
      <line x1={padL} x2={W - padR} y1={padT + chartH} y2={padT + chartH} stroke="#D1D5DB" strokeWidth="1" />

      {/* Bars */}
      {data.map((item, i) => {
        const x = padL + gap + i * (barW + gap);
        const barH = (item.value / maxVal) * chartH;
        const y = padT + chartH - barH;
        const isHovered = hovered === item.label;
        const isDimmed = hovered && !isHovered;
        return (
          <g key={item.label} onMouseEnter={() => onHover(item.label)} onMouseLeave={() => onHover(null)} style={{ cursor: 'pointer' }}>
            <rect
              x={x} y={y} width={barW} height={barH}
              fill={item.color}
              rx="6" ry="6"
              opacity={isDimmed ? 0.35 : isHovered ? 1 : 0.9}
              style={{ transition: 'all 0.25s ease', filter: isHovered ? 'brightness(1.1)' : 'none' }}
            />
            <text x={x + barW / 2} y={padT + chartH + 20} fontSize="11" fill="#9CA3AF" textAnchor="middle">{item.label}</text>
          </g>
        );
      })}
    </svg>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const TokenizationPage = ({ isDarkMode, toggleTheme, sidebarCollapsed }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [hoveredLegend, setHoveredLegend] = useState(null);
  const [hoveredBarLegend, setHoveredBarLegend] = useState(null);

  const resultsPerPage = 4;
  const totalResults = 100;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const stats = [
    { id: 1, icon: 'tokens', iconBg: 'linear-gradient(135deg, #AD46FF 0%, #7F22FE 100%)', label: 'Total Tokens Issued', value: '2.4M', subtext: 'Across 15 startups', change: '+12.5%', isPositive: true },
    { id: 2, icon: 'market', iconBg: 'linear-gradient(135deg, #2B7FFF 0%, #0092B8 100%)', label: 'Market Cap', value: '$8.4M', subtext: 'Since this month', change: '+8.2%', isPositive: true },
    { id: 3, icon: 'active', iconBg: 'linear-gradient(135deg, #F6339A 0%, #E60076 100%)', label: 'Active Tokens', value: '100', subtext: 'In this quarter', change: '15 Active', isPositive: false },
    { id: 4, icon: 'volume', iconBg: 'linear-gradient(135deg, #00BC7D 0%, #00A63E 100%)', label: 'Trading Volume', value: '$1.2M', subtext: 'Last 30 days', change: '+7%', isPositive: true },
  ];

  const tokenStatusData = [
    { label: 'Active', value: 60, color: '#10B981' },
    { label: 'Pending', value: 25, color: '#3B82F6' },
    { label: 'Paused', value: 15, color: '#F59E0B' },
  ];

  const tokenTypeData = [
    { label: 'Equity', value: 45, color: '#8B5CF6' },
    { label: 'Revenue Share', value: 35, color: '#06B6D4' },
    { label: 'Hybrid', value: 20, color: '#EC4899' },
  ];

  const allCompanies = [
    { id: 1, name: 'CureCloud', symbol: 'CURE', totalSupply: '500,000', price: '$250', marketCap: '$250', status: 'Active' },
    { id: 2, name: 'SolarPay', symbol: 'SPAY', totalSupply: '1,000,000', price: '$250', marketCap: '$250', status: 'Active' },
    { id: 3, name: 'AquaAI', symbol: 'AQUA', totalSupply: '250,000', price: '$250', marketCap: '$250', status: 'Pending' },
    { id: 4, name: 'GreenAgri', symbol: 'GRNG', totalSupply: '750,000', price: '$250', marketCap: '$250', status: 'Active' },
  ];

  const filteredCompanies = allCompanies.filter((c) => {
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchSearch = c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const getPageNumbers = () => {
    const pages = [1];
    if (currentPage > 2) pages.push(currentPage - 1);
    if (currentPage !== 1 && currentPage !== totalPages) pages.push(currentPage);
    if (currentPage < totalPages - 1) pages.push(currentPage + 1);
    if (totalPages > 1) {
      if (currentPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    return [...new Set(pages)];
  };

  const icons = {
    tokens: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="9" r="5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16.09 11.37C17.04 11.72 17.88 12.31 18.54 13.07C19.2 13.83 19.65 14.75 19.86 15.74C20.07 16.73 20.03 17.75 19.74 18.72C19.45 19.68 18.92 20.56 18.2 21.27C17.48 21.98 16.6 22.49 15.63 22.77C14.66 23.04 13.63 23.07 12.65 22.84C11.67 22.61 10.76 22.14 10 21.47C9.25 20.8 8.68 19.95 8.34 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    market: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3v18" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M17 6H9.5C8.57 6 7.68 6.37 7.03 7.03C6.37 7.68 6 8.57 6 9.5C6 10.43 6.37 11.32 7.03 11.97C7.68 12.63 8.57 13 9.5 13H14.5C15.43 13 16.32 13.37 16.97 14.03C17.63 14.68 18 15.57 18 16.5C18 17.43 17.63 18.32 16.97 18.97C16.32 19.63 15.43 20 14.5 20H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    active: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    volume: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M16 7H22V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 7L13.5 15.5L8.5 10.5L2 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  };

  return (
    <div className="tp-page">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />
      {/* Page Header */}
      <div className="tp-header" style={{ marginTop: '32px' }}>
        <h1 className="tp-title">Tokenization Management</h1>
        <p className="tp-subtitle">Manage tokenized startup assets and distributions</p>
      </div>

      {/* ── Stats ── */}
      <div className="tp-stats-grid" style={{ cursor: 'pointer' }}>
        {stats.map((stat) => (
          <div key={stat.id} className="tp-stat-card">
            <div className="tp-stat-top">
              <div className="tp-stat-icon" style={{ background: stat.iconBg }}>{icons[stat.icon]}</div>
              <span className={`tp-stat-badge ${stat.isPositive ? 'badge-pos' : 'badge-neu'} badge-${stat.id}`}>
                {stat.id === 4 && (
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" style={{ marginRight: 3 }}>
                    <path d="M9.33 4.08H12.83V7.58" stroke="#007A55" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.83 4.08L7.88 9.04L4.96 6.12L1.17 9.92" stroke="#007A55" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {stat.change}
              </span>
            </div>
            <p className="tp-stat-label">{stat.label}</p>
            <h3 className="tp-stat-value">{stat.value}</h3>
            <p className="tp-stat-sub">{stat.subtext}</p>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="tp-charts-row" style={{ background: 'white' }}>

        {/* Token Status Donut */}
        <div className="tp-chart-card"  style={{ background: 'white' }}>
          <div className="tp-chart-head">
            <h3 className="tp-chart-title">Token Status Distribution</h3>
            <p className="tp-chart-sub">Current status of all tokens</p>
          </div>
          <div className="tp-donut-wrap">
            <div style={{ marginTop: '22px' }}>
              <DonutChart data={tokenStatusData} hovered={hoveredLegend} onHover={setHoveredLegend} />
            </div>
          </div>
          <div className="tp-legend" style={{ marginTop: '24px' }}>
            {tokenStatusData.map((item) => (
              <div key={item.label} className="tp-legend-item" onMouseEnter={() => setHoveredLegend(item.label)} onMouseLeave={() => setHoveredLegend(null)}>
                <span className="tp-legend-dot" style={{ background: item.color }} />
                <span className="tp-legend-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Token Type Bar Chart */}
        <div className="tp-chart-card" style={{ background: 'white' }}>
          <div className="tp-chart-head">
            <h3 className="tp-chart-title">Token Type Distribution</h3>
            <p className="tp-chart-sub">Breakdown by token type</p>
          </div>
          <div className="tp-bar-wrap">
            <BarChart data={tokenTypeData} hovered={hoveredBarLegend} onHover={setHoveredBarLegend} />
          </div>
          <div className="tp-legend tp-legend-bar">
            {tokenTypeData.map((item) => (
              <div key={item.label} className="tp-legend-item" onMouseEnter={() => setHoveredBarLegend(item.label)} onMouseLeave={() => setHoveredBarLegend(null)}>
                <span className="tp-legend-dot" style={{ background: item.color }} />
                <span className="tp-legend-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Table Section ── */}
      <div className="tp-table-section"  style={{ background: 'white' }}>
        {/* Table Header */}
        <div className="tp-table-header">
          <div className="tp-table-title-row">
            <h3 className="tp-table-title">Tokenized Startups</h3>
            <button className="tp-info-btn" aria-label="Information">
              <svg width="17" height="17" viewBox="0 0 16 16" fill="none">
                <circle cx="7.91" cy="7.91" r="7.91" fill="#AFAFAF"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M9.2 5.19C9.33 4.97 9.4 4.72 9.4 4.45C9.4 3.63 8.73 2.97 7.91 2.97C7.09 2.97 6.43 3.63 6.43 4.45C6.43 5.27 7.09 5.94 7.91 5.94C8.47 5.94 8.95 5.63 9.2 5.19ZM6.92 6.92H7.42H8.41C8.95 6.92 9.4 7.37 9.4 7.91V8.9V12.86C9.4 13.41 8.95 13.85 8.41 13.85C7.86 13.85 7.42 13.41 7.42 12.86V9.64C7.42 9.24 7.09 8.9 6.68 8.9C6.27 8.9 5.94 8.57 5.94 8.16V7.91C5.94 7.57 6.11 7.26 6.39 7.08C6.54 6.98 6.73 6.92 6.92 6.92Z" fill="white"/>
              </svg>
            </button>
          </div>
          <p className="tp-table-sub">Overview of all tokenized companies</p>
        </div>

        {/* Controls */}
        <div className="tp-controls">
          <div className="tp-status-wrap">
            <select className="tp-status-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Paused">Paused</option>
            </select>
            <div className="tp-select-arrow">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M7.5 5.5L10.5 2.5L13.5 5.5" stroke="#121212" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.5 10.5L10.5 13.5L7.5 10.5" stroke="#121212" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="tp-search-wrap">
            <svg className="tp-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7.33" cy="7.33" r="5.33" stroke="#9CA3AF" strokeWidth="1.1"/>
              <path d="M14 14L11.1 11.1" stroke="#9CA3AF" strokeWidth="1.1" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="tp-search-input"
            />
          </div>
        </div>

        {/* Table */}
        <div className="tp-table-wrap" style={{ cursor: 'pointer' }}>
          <table className="tp-table">
            <thead>
              <tr>
                <th>COMPANY NAME</th>
                <th>TOKEN SYMBOL</th>
                <th>TOTAL SUPPLY</th>
                <th>PRICE ($)</th>
                <th>MARKET CAP ($M)</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.length > 0 ? filteredCompanies.map((company, idx) => (
                <tr key={company.id} className={idx === 0 ? 'tp-row-first' : ''} style={idx === 0 ? { background: 'white' } : {}}>
                  <td>
                    <div className="tp-company-cell">
                      <div className="tp-avatar" style={{ background: '#2D4A8A' }}>
                        <span className="tp-avatar-letter">{company.name.charAt(0)}</span>
                      </div>
                      <span className="tp-company-name">{company.name}</span>
                    </div>
                  </td>
                  <td><span className="tp-symbol">{company.symbol}</span></td>
                  <td className="tp-cell-muted">{company.totalSupply}</td>
                  <td className="tp-cell-muted">{company.price}</td>
                  <td className="tp-cell-muted">{company.marketCap}</td>
                  <td>
                    <span className={`tp-status-badge tp-status-${company.status.toLowerCase()}`}>{company.status}</span>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="6" className="tp-no-results">No companies found matching your criteria</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="tp-footer">
          <div className="tp-pagination-info">
            <span className="tp-page-text">Showing</span>
            <span className="tp-page-box">{String(currentPage * resultsPerPage).padStart(2, '0')}</span>
            <span className="tp-page-text">/ {totalResults} Results</span>
          </div>
          <div className="tp-pagination">
            <button className="tp-page-arrow" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 14L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {getPageNumbers().map((page, i) => (
              <button
                key={i}
                className={`tp-page-btn${page === currentPage ? ' active' : ''}${page === '...' ? ' ellipsis' : ''}`}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                disabled={page === '...'}
              >{page}</button>
            ))}
            <button className="tp-page-arrow" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 14L12 10L8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        <div className="tp-disclaimer">
          Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
        </div>
      </div>
    </div>
  );
};

export default TokenizationPage;