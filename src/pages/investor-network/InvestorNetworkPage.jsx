import React, { useState, useMemo, useRef, useEffect } from 'react';
import Header from '../../components/header/Header';
import './InvestorNetworkPage.css';

// ── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon, bgColor, label, value, sub, subColor }) => (
  <div className="in-stat-card">
    <div className="in-stat-card__body">
      <div className="in-stat-card__text">
        <div className="in-stat-card__label">{label}</div>
        <div className="in-stat-card__value">{value}</div>
        <div className="in-stat-card__sub" style={{ color: subColor || '#6b7280' }}>{sub}</div>
      </div>
      <div className="in-stat-card__icon" style={{ background: bgColor }}>{icon}</div>
    </div>
  </div>
);

// ── Donut Chart ──────────────────────────────────────────────────────────────
const DonutChart = ({ data }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  let offset = 0;
  const R = 80, cx = 100, cy = 100, strokeW = 30;
  const circumference = 2 * Math.PI * R;

  const slices = data.map((d) => {
    const dash = (d.value / total) * circumference;
    const gap = circumference - dash;
    const rotation = (offset / total) * 360 - 90;
    offset += d.value;
    return { ...d, dash, gap, rotation };
  });

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {slices.map((s, i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={R}
          fill="none"
          stroke={s.color}
          strokeWidth={strokeW}
          strokeDasharray={`${s.dash} ${s.gap}`}
          strokeDashoffset={0}
          transform={`rotate(${s.rotation} ${cx} ${cy})`}
          className="in-donut-slice"
        />
      ))}
      {/* White center */}
      <circle cx={cx} cy={cy} r={R - strokeW / 2 - 2} fill="white" className="in-donut-center" />
    </svg>
  );
};

// ── Area / Line Chart ────────────────────────────────────────────────────────
const AreaChart = ({ data, targetLine }) => {
  const [tooltip, setTooltip] = useState(null);
  const svgRef = useRef(null);

  const W = 500, H = 200, padL = 40, padR = 20, padT = 20, padB = 40;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const maxVal = Math.max(...data.map(d => d.value), targetLine) + 4;
  const minVal = 0;

  const xScale = (i) => padL + (i / (data.length - 1)) * chartW;
  const yScale = (v) => padT + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;

  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(d.value)}`).join(' ');
  const areaPath = linePath + ` L${xScale(data.length - 1)},${padT + chartH} L${padL},${padT + chartH} Z`;

  const yTicks = [0, 7, 14, 21, 28];
  const targetY = yScale(targetLine);

  return (
    <div className="in-area-chart-wrap">
      <svg
        ref={svgRef}
        width="100%" viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Y grid lines */}
        {yTicks.map(t => (
          <g key={t}>
            <line x1={padL} y1={yScale(t)} x2={W - padR} y2={yScale(t)} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
            <text x={padL - 8} y={yScale(t) + 4} fontSize="10" fill="#9ca3af" textAnchor="end">{t}</text>
          </g>
        ))}

        {/* Target dashed line */}
        <line x1={padL} y1={targetY} x2={W - padR} y2={targetY} stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="6 4" />

        {/* Area fill */}
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#areaGrad)" />
        <path d={linePath} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

        {/* X axis labels */}
        {data.map((d, i) => (
          <text key={i} x={xScale(i)} y={H - 8} fontSize="11" fill="#9ca3af" textAnchor="middle">{d.label}</text>
        ))}

        {/* Hover areas */}
        {data.map((d, i) => (
          <rect
            key={i}
            x={xScale(i) - chartW / (data.length - 1) / 2}
            y={padT}
            width={chartW / (data.length - 1)}
            height={chartH}
            fill="transparent"
            style={{ cursor: 'crosshair' }}
            onMouseEnter={(e) => setTooltip({ index: i, data: d, x: xScale(i), y: yScale(d.value) })}
          />
        ))}

        {/* Tooltip */}
        {tooltip && (
          <>
            <line x1={tooltip.x} y1={padT} x2={tooltip.x} y2={padT + chartH} stroke="#374151" strokeWidth="1" strokeDasharray="4 3" />
            <circle cx={tooltip.x} cy={tooltip.y} r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
            <rect x={tooltip.x - 70} y={tooltip.y - 42} width="120" height="36" rx="6" fill="#111827" />
            <text x={tooltip.x - 10} y={tooltip.y - 26} fontSize="11" fill="#fff" fontWeight="700" textAnchor="middle">{tooltip.data.label.toUpperCase()}</text>
            <text x={tooltip.x - 10} y={tooltip.y - 13} fontSize="10" fill="#d1d5db" textAnchor="middle">Investments – {tooltip.data.value}</text>
          </>
        )}
      </svg>
    </div>
  );
};

// ── Type Badge ───────────────────────────────────────────────────────────────
const TypeBadge = ({ type }) => (
  <span className="in-type-badge">{type}</span>
);

const StatusBadge = ({ status }) => {
  const map = {
    Active:    { bg: '#d1fae5', color: '#065f46' },
    Reviewing: { bg: '#dbeafe', color: '#1e40af' },
    Inactive:  { bg: '#f3f4f6', color: '#374151' },
  };
  const s = map[status] || map.Inactive;
  return <span className="in-status-badge" style={{ background: s.bg, color: s.color }}>{status}</span>;
};

// ── Main Page ────────────────────────────────────────────────────────────────
const InvestorNetworkPage = ({ isDarkMode, toggleTheme, sidebarCollapsed }) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPerPage, setShowPerPage] = useState(4);
  const [sortConfig, setSortConfig] = useState({ key: null, dir: 'asc' });

  const donutData = [
    { label: 'Angel',          value: 18, color: '#6366f1' },
    { label: 'VC Fund',        value: 12, color: '#06b6d4' },
    { label: 'Institutional',  value: 8,  color: '#22c55e' },
    { label: 'Family Office',  value: 7,  color: '#f97316' },
    { label: 'Sovereign Wealth', value: 5, color: '#ec4899' },
  ];

  const activityData = [
    { label: 'Jan', value: 15 },
    { label: 'Feb', value: 17 },
    { label: 'Mar', value: 14 },
    { label: 'Apr', value: 16 },
    { label: 'May', value: 20 },
    { label: 'Jun', value: 22 },
    { label: 'Jul', value: 20 },
  ];

  const allInvestors = [
    { id: 1, name: 'Mohammed Al-Farooq', type: 'Angel',       portfolio: '5 Startups',  invested: 1250,  available: 750,   status: 'Active' },
    { id: 2, name: 'Sarah Johnson',      type: 'VC Fund',     portfolio: '12 Startups', invested: 8500,  available: 15500, status: 'Active' },
    { id: 3, name: 'Ahmed Khan',         type: 'Institutional', portfolio: '3 Startups', invested: 600,  available: 400,   status: 'Reviewing' },
    { id: 4, name: 'Fatima Hassan',      type: 'Family Office', portfolio: '7 Startups', invested: 3200, available: 2100,  status: 'Active' },
    { id: 5, name: 'Omar Abdullah',      type: 'Sovereign Wealth', portfolio: '2 Startups', invested: 12000, available: 8000, status: 'Active' },
    { id: 6, name: 'Layla Ibrahim',      type: 'Angel',       portfolio: '4 Startups',  invested: 900,   available: 600,   status: 'Reviewing' },
    { id: 7, name: 'Yusuf Al-Rashid',    type: 'VC Fund',     portfolio: '9 Startups',  invested: 5500,  available: 9000,  status: 'Active' },
    { id: 8, name: 'Nour Khalid',        type: 'Institutional', portfolio: '1 Startup',  invested: 200,   available: 300,   status: 'Inactive' },
  ];

  const handleSort = (key) => {
    setSortConfig(prev => ({ key, dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc' }));
  };

  const filtered = useMemo(() => {
    let rows = allInvestors;
    if (statusFilter !== 'All') rows = rows.filter(r => r.status === statusFilter);
    if (searchQuery) rows = rows.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (sortConfig.key) {
      rows = [...rows].sort((a, b) => {
        const va = a[sortConfig.key], vb = b[sortConfig.key];
        if (va < vb) return sortConfig.dir === 'asc' ? -1 : 1;
        if (va > vb) return sortConfig.dir === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return rows;
  }, [statusFilter, searchQuery, sortConfig]);

  const totalPages = Math.ceil(filtered.length / showPerPage);
  const paginated = filtered.slice((currentPage - 1) * showPerPage, currentPage * showPerPage);

  const SortIcon = ({ col }) => (
    <span className={`in-sort-icon ${sortConfig.key === col ? 'active' : ''}`}>
      {sortConfig.key === col ? (sortConfig.dir === 'asc' ? '↑' : '↓') : '⇅'}
    </span>
  );

  const statuses = ['All', 'Active', 'Reviewing', 'Inactive'];

  return (
    <div className={`em-startup-overview in-page ${sidebarCollapsed ? 'em-startup-overview--sidebar-collapsed' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />

      <div className="in-content">
        {/* Page Header */}
        <div className="in-page-header">
          <h1 className="in-page-title">Investor Network</h1>
          <p className="in-page-subtitle">Manage and monitor investor activities and portfolios</p>
        </div>

        {/* Stat Cards */}
        <div className="in-stats-grid">
          <StatCard
            bgColor="#dbeafe"
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
            label="Total Investors"
            value="50"
            sub="↑ +8% this quarter"
            subColor="#22c55e"
          />
          <StatCard
            bgColor="#d1fae5"
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>}
            label="Active Investors"
            value="42"
            sub="↑ +5% this month"
            subColor="#22c55e"
          />
          <StatCard
            bgColor="#fef3c7"
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
            label="Total Capital"
            value="$45M"
            sub="↑ +$8.2M vs last quarter"
            subColor="#22c55e"
          />
          <StatCard
            bgColor="#ede9fe"
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>}
            label="Zakat Pending"
            value="$450K"
            sub="↓ -$50K vs last quarter"
            subColor="#ef4444"
          />
        </div>

        {/* Charts Row */}
        <div className="in-charts-row">
          {/* Donut */}
          <div className="in-card in-chart-card">
            <div className="in-card-header-row">
              <div>
                <h2 className="in-card-title">
                  Investor Type Distribution
                  <span className="in-info-icon" title="Breakdown by investor category">ℹ</span>
                </h2>
                <p className="in-card-sub">Breakdown by investor category</p>
              </div>
              <div className="in-card-actions">
                <button className="in-card-action-btn" title="Expand">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                </button>
                <button className="in-card-action-btn" title="Edit">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button className="in-card-action-btn" title="More">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                </button>
              </div>
            </div>

            <div className="in-donut-wrap">
              <DonutChart data={donutData} />
            </div>

            <div className="in-donut-legend">
              {donutData.map(d => (
                <div key={d.label} className="in-donut-legend-row">
                  <div className="in-donut-legend-left">
                    <span className="in-legend-dot" style={{ background: d.color }} />
                    <span className="in-legend-label">{d.label}</span>
                  </div>
                  <span className="in-legend-count">{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Area Chart */}
          <div className="in-card in-chart-card">
            <div className="in-card-header-row">
              <div>
                <h2 className="in-card-title">
                  Investment Activity (Last 6 Months)
                  <span className="in-info-icon" title="Monthly investment trend with targets">ℹ</span>
                </h2>
                <p className="in-card-sub">Monthly investment trend with targets</p>
              </div>
              <div className="in-card-actions">
                <button className="in-card-action-btn" title="Expand">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                </button>
                <button className="in-card-action-btn" title="Edit">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button className="in-card-action-btn" title="More">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                </button>
              </div>
            </div>
            <AreaChart data={activityData} targetLine={14} />
          </div>
        </div>

        {/* Investor Directory Table */}
        <div className="in-card in-table-card">
          <div className="in-card-header-row">
            <div>
              <h2 className="in-card-title">
                Investor Directory
                <span className="in-info-icon" title="Complete list of all investors in your network">ℹ</span>
              </h2>
              <p className="in-card-sub">Complete list of all investors in your network</p>
            </div>
          </div>

          {/* Filters */}
          <div className="in-table-filters">
            <div className="in-filter-group">
              {statuses.map(s => (
                <button
                  key={s}
                  className={`in-filter-btn ${statusFilter === s ? 'in-filter-btn--active' : ''}`}
                  onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="in-search-wrap">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                className="in-search"
                placeholder="Search"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>

          {/* Table */}
          <div className="in-table-wrap">
            <table className="in-table">
              <thead>
                <tr>
                  {[
                    { key: 'name',      label: 'NAME' },
                    { key: 'type',      label: 'TYPE' },
                    { key: 'portfolio', label: 'PORTFOLIO' },
                    { key: 'invested',  label: 'INVESTED ($K)' },
                    { key: 'available', label: 'AVAILABLE ($K)' },
                    { key: 'status',    label: 'STATUS' },
                  ].map(col => (
                    <th key={col.key} className="in-th" onClick={() => handleSort(col.key)}>
                      {col.label} <SortIcon col={col.key} />
                    </th>
                  ))}
                  <th className="in-th">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan={7} className="in-empty">No investors found</td></tr>
                ) : paginated.map(row => (
                  <tr key={row.id} className="in-tr">
                    <td className="in-td in-td--name">{row.name}</td>
                    <td className="in-td"><TypeBadge type={row.type} /></td>
                    <td className="in-td">{row.portfolio}</td>
                    <td className="in-td in-td--num">{row.invested.toLocaleString()}</td>
                    <td className="in-td in-td--num">{row.available.toLocaleString()}</td>
                    <td className="in-td"><StatusBadge status={row.status} /></td>
                    <td className="in-td">
                      <button className="in-view-btn" title="View investor">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="in-pagination">
            <div className="in-pagination__info">
              Showing{' '}
              <select
                className="in-perpage-select"
                value={showPerPage}
                onChange={e => { setShowPerPage(Number(e.target.value)); setCurrentPage(1); }}
              >
                {[4, 8, 16].map(n => <option key={n} value={n}>{String(n).padStart(2, '0')}</option>)}
              </select>
              {' '}/ {filtered.length} Results
            </div>
            <div className="in-pagination__pages">
              <button className="in-page-btn" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>‹</button>
              {Array.from({ length: Math.min(totalPages, 4) }, (_, i) => i + 1).map(p => (
                <button key={p} className={`in-page-btn ${currentPage === p ? 'in-page-btn--active' : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>
              ))}
              {totalPages > 4 && <span className="in-page-ellipsis">...</span>}
              {totalPages > 4 && (
                <button className={`in-page-btn ${currentPage === totalPages ? 'in-page-btn--active' : ''}`} onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
              )}
              <button className="in-page-btn" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>›</button>
            </div>
          </div>
        </div>

        <div className="in-footer-note">
          Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
        </div>
      </div>
    </div>
  );
};

export default InvestorNetworkPage;
