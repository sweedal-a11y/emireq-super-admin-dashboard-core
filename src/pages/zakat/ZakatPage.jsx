import React, { useState, useMemo } from 'react';
import Header from '../../components/header/Header';
import './ZakatPage.css';

// ── Icons (inline SVG helpers) ──────────────────────────────────────────────
const Icon = ({ d, size = 18, color = 'currentColor', viewBox = '0 0 24 24' }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

// ── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon, bgColor, label, value, sub, badge, badgeColor }) => (
  <div className="zk-stat-card">
    <div className="zk-stat-card__top">
      <div className="zk-stat-card__icon" style={{ background: bgColor }}>{icon}</div>
      {badge && <span className="zk-stat-card__badge" style={{ color: badgeColor, background: badgeColor + '18' }}>{badge}</span>}
    </div>
    <div className="zk-stat-card__label">{label}</div>
    <div className="zk-stat-card__value">{value}</div>
    <div className="zk-stat-card__sub">{sub}</div>
  </div>
);

// ── Donut Chart ──────────────────────────────────────────────────────────────
const DonutChart = ({ data }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  let offset = 0;
  const R = 70, cx = 90, cy = 90, stroke = 28;
  const circumference = 2 * Math.PI * R;

  const slices = data.map((d) => {
    const dash = (d.value / total) * circumference;
    const gap = circumference - dash;
    const rotation = (offset / total) * 360 - 90;
    offset += d.value;
    return { ...d, dash, gap, rotation };
  });

  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      {slices.map((s, i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={R}
          fill="none"
          stroke={s.color}
          strokeWidth={stroke}
          strokeDasharray={`${s.dash} ${s.gap}`}
          strokeDashoffset={0}
          transform={`rotate(${s.rotation} ${cx} ${cy})`}
          className="zk-donut-slice"
          style={{ '--dash': s.dash, '--circ': circumference }}
        />
      ))}
    </svg>
  );
};

// ── Bar Chart ────────────────────────────────────────────────────────────────
const BarChart = ({ data }) => {
  const maxVal = Math.max(...data.flatMap(d => d.values));
  const yTicks = [0, 30, 60, 90, 120];
  const barW = 18, groupGap = 48, startX = 40;

  return (
    <svg width="100%" height="220" viewBox="0 0 340 220" preserveAspectRatio="xMidYMid meet">
      {/* Y grid */}
      {yTicks.map((t) => {
        const y = 180 - (t / maxVal) * 150;
        return (
          <g key={t}>
            <line x1="35" y1={y} x2="330" y2={y} stroke="#e5e7eb" strokeWidth="1" />
            <text x="28" y={y + 4} fontSize="10" fill="#9ca3af" textAnchor="end">{t}</text>
          </g>
        );
      })}
      {/* Bars */}
      {data.map((group, gi) => {
        const gx = startX + gi * groupGap;
        return (
          <g key={gi}>
            {group.values.map((v, vi) => {
              const barH = (v / maxVal) * 150;
              const x = gx + vi * (barW + 2);
              return (
                <rect
                  key={vi}
                  x={x} y={180 - barH}
                  width={barW} height={barH}
                  fill={group.colors[vi]}
                  rx="3"
                  className="zk-bar"
                />
              );
            })}
            <text x={gx + (group.values.length * (barW + 2)) / 2} y="198" fontSize="11" fill="#6b7280" textAnchor="middle">{group.label}</text>
          </g>
        );
      })}
    </svg>
  );
};

// ── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    Paid:     { bg: '#d1fae5', color: '#065f46' },
    Pending:  { bg: '#fef3c7', color: '#92400e' },
    Upcoming: { bg: '#dbeafe', color: '#1e40af' },
    Overdue:  { bg: '#fee2e2', color: '#991b1b' },
  };
  const s = map[status] || { bg: '#f3f4f6', color: '#374151' };
  return <span className="zk-status-badge" style={{ background: s.bg, color: s.color }}>{status}</span>;
};

const TypeBadge = ({ type }) => {
  const map = {
    ANNUAL:    { bg: '#d1fae5', color: '#065f46' },
    QUARTERLY: { bg: '#fef3c7', color: '#92400e' },
    Monthly:   { bg: '#ede9fe', color: '#5b21b6' },
  };
  const s = map[type] || { bg: '#f3f4f6', color: '#374151' };
  return <span className="zk-type-badge" style={{ background: s.bg, color: s.color }}>{type}</span>;
};

// ── Main Component ────────────────────────────────────────────────────────────
const ZakatPage = ({ sidebarCollapsed, isDarkMode, toggleTheme }) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPerPage, setShowPerPage] = useState(4);
  const [sortConfig, setSortConfig] = useState({ key: null, dir: 'asc' });

  const allRecords = [
    { id: 1, investor: 'Mohammed Al-Farooq', type: 'ANNUAL',    amount: 6250, dueDate: '2025-08-15', paidDate: '2025-08-15', status: 'Paid' },
    { id: 2, investor: 'Ahmed Khan',          type: 'QUARTERLY', amount: 2300, dueDate: '2025-08-15', paidDate: null,         status: 'Pending' },
    { id: 3, investor: 'Fatima Hassan',       type: 'QUARTERLY', amount: 1500, dueDate: '2025-08-15', paidDate: null,         status: 'Upcoming' },
    { id: 4, investor: 'Sarah Johnson',       type: 'Monthly',   amount: 3200, dueDate: '2025-08-15', paidDate: null,         status: 'Upcoming' },
    { id: 5, investor: 'Omar Abdullah',       type: 'ANNUAL',    amount: 8900, dueDate: '2025-09-01', paidDate: null,         status: 'Overdue' },
    { id: 6, investor: 'Layla Ibrahim',       type: 'QUARTERLY', amount: 1100, dueDate: '2025-09-15', paidDate: '2025-09-14', status: 'Paid' },
    { id: 7, investor: 'Yusuf Al-Rashid',     type: 'Monthly',   amount: 750,  dueDate: '2025-10-01', paidDate: null,         status: 'Upcoming' },
    { id: 8, investor: 'Nour Khalid',         type: 'ANNUAL',    amount: 4500, dueDate: '2025-10-15', paidDate: null,         status: 'Pending' },
  ];

  const donutData = [
    { label: 'Paid',     value: 65, color: '#22c55e' },
    { label: 'Pending',  value: 15, color: '#f97316' },
    { label: 'Upcoming', value: 12, color: '#3b82f6' },
    { label: 'Overdue',  value: 8,  color: '#ef4444' },
  ];

  const barData = [
    { label: 'Equity',    values: [92, 70], colors: ['#22c55e', '#eab308'] },
    { label: 'Quarterly', values: [68, 48], colors: ['#22c55e', '#eab308'] },
    { label: 'Monthly',   values: [42, 38], colors: ['#22c55e', '#a855f7'] },
  ];

  const handleSort = (key) => {
    setSortConfig(prev => ({ key, dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc' }));
  };

  const filtered = useMemo(() => {
    let rows = allRecords;
    if (statusFilter !== 'All') rows = rows.filter(r => r.status === statusFilter);
    if (searchQuery) rows = rows.filter(r => r.investor.toLowerCase().includes(searchQuery.toLowerCase()));
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

  const SortIcon = ({ col }) => {
    if (sortConfig.key !== col) return <span className="zk-sort-icon">⇅</span>;
    return <span className="zk-sort-icon active">{sortConfig.dir === 'asc' ? '↑' : '↓'}</span>;
  };

  const statuses = ['All', 'Paid', 'Pending', 'Upcoming', 'Overdue'];

  return (
    <div className={`em-startup-overview zk-page ${sidebarCollapsed ? 'em-startup-overview--sidebar-collapsed' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <div className="zk-content">
        {/* Page Header */}
        <div className="zk-page-header">
          <h1 className="zk-page-title">Zakat Management</h1>
          <p className="zk-page-subtitle">Manage Shariah-compliant Zakat contributions and distributions</p>
        </div>

        {/* Stat Cards */}
        <div className="zk-stats-grid">
          <StatCard
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 3.10602L11.492 3.65802C11.6304 3.78521 11.8115 3.8558 11.9995 3.8558C12.1875 3.8558 12.3686 3.78521 12.507 3.65802L12 3.10602ZM10.592 8.19602C9.902 7.69302 9.165 7.08102 8.609 6.43602C8.035 5.77102 7.75 5.18202 7.75 4.71502H6.25C6.25 5.73202 6.828 6.66902 7.473 7.41602C8.136 8.18402 8.974 8.87302 9.708 9.40802L10.592 8.19602ZM7.75 4.71502C7.75 3.65602 8.27 3.05202 8.896 2.84202C9.548 2.62202 10.52 2.76402 11.492 3.65802L12.507 2.55402C11.23 1.38002 9.704 0.988018 8.418 1.42002C7.105 1.86202 6.25 3.09602 6.25 4.71502H7.75ZM14.292 9.40802C15.026 8.87402 15.864 8.18402 16.527 7.41602C17.172 6.66902 17.75 5.73202 17.75 4.71502H16.25C16.25 5.18202 15.966 5.77102 15.391 6.43602C14.835 7.08102 14.099 7.69302 13.409 8.19602L14.292 9.40802ZM17.75 4.71502C17.75 3.09602 16.895 1.86202 15.583 1.42002C14.297 0.988018 12.77 1.38002 11.493 2.55402L12.508 3.65802C13.48 2.76402 14.453 2.62202 15.105 2.84202C15.73 3.05202 16.25 3.65602 16.25 4.71502H17.75ZM9.708 9.40802C10.463 9.95802 11.062 10.426 12 10.426V8.92602C11.635 8.92602 11.435 8.81102 10.592 8.19602L9.708 9.40802ZM13.408 8.19602C12.565 8.81102 12.365 8.92602 12 8.92602V10.426C12.938 10.426 13.537 9.95902 14.292 9.40802L13.408 8.19602Z" fill="white"/>
<path d="M5 20.388H7.26C8.27 20.388 9.293 20.494 10.276 20.696C12.0311 21.0555 13.8367 21.0954 15.606 20.814C16.474 20.674 17.326 20.459 18.098 20.087C18.794 19.75 19.647 19.277 20.22 18.746C20.792 18.216 21.388 17.349 21.81 16.671C22.174 16.089 21.998 15.376 21.424 14.943C21.1013 14.7088 20.7127 14.5827 20.314 14.5827C19.9153 14.5827 19.5267 14.7088 19.204 14.943L17.397 16.308C16.697 16.838 15.932 17.325 15.021 17.47C14.911 17.4874 14.796 17.503 14.676 17.517M14.676 17.517L14.566 17.529M14.676 17.517C14.836 17.4737 14.9828 17.3912 15.103 17.277C15.2539 17.1468 15.3772 16.9877 15.4655 16.809C15.5538 16.6302 15.6054 16.4356 15.6171 16.2367C15.6289 16.0377 15.6006 15.8384 15.5339 15.6505C15.4672 15.4627 15.3636 15.2901 15.229 15.143C15.0987 14.9984 14.9469 14.8746 14.779 14.776C11.982 13.107 7.629 14.378 5 16.243M14.676 17.517C14.6399 17.5251 14.603 17.5291 14.566 17.529M14.566 17.529C13.9629 17.5895 13.3554 17.5908 12.752 17.533" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
<path d="M5 15.5C5 14.6716 4.32843 14 3.5 14C2.67157 14 2 14.6716 2 15.5V20.5C2 21.3284 2.67157 22 3.5 22C4.32843 22 5 21.3284 5 20.5V15.5Z" stroke="white" stroke-width="1.5"/>
</svg>
}
            bgColor="#22c55e"
            label="Total Zakat Collected"
            value="$187K"
            sub="+12.3% from last year"
            badge="This year"
            badgeColor="#22c55e"
          />
          <StatCard
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
            bgColor="#f97316"
            label="Pending Zakat"
            value="$24K"
            sub="Awaiting payment"
            badge="This Month"
            badgeColor="#f97316"
          />
          <StatCard
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
            bgColor="#3b82f6"
            label="Compliant Investors"
            value="42"
            sub="Out of 50 total"
            badge="100% rate"
            badgeColor="#3b82f6"
          />
          <StatCard
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>}
            bgColor="#a855f7"
            label="Distributed Zakat"
            value="$163k"
            sub="To beneficiaries"
            badge="87.2% rate"
            badgeColor="#a855f7"
          />
        </div>

        {/* Charts Row */}
        <div className="zk-charts-row">
          {/* Donut Chart */}
          <div className="zk-card zk-chart-card">
            <div className="zk-card-header">
              <h2 className="zk-card-title">Zakat Status Distribution</h2>
              <p className="zk-card-sub">Current status of all tokens</p>
            </div>
            <div className="zk-donut-wrap">
              <DonutChart data={donutData} />
            </div>
            <div className="zk-legend">
              {donutData.map(d => (
                <div key={d.label} className="zk-legend-item">
                  <span className="zk-legend-dot" style={{ background: d.color }} />
                  <span>{d.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="zk-card zk-chart-card">
            <div className="zk-card-header">
              <h2 className="zk-card-title">Payment Type Distribution</h2>
              <p className="zk-card-sub">Breakdown by token type</p>
            </div>
            <div className="zk-bar-wrap">
              <BarChart data={barData} />
            </div>
            <div className="zk-legend">
              {[{ label: 'Annual', color: '#22c55e' }, { label: 'Quarterly', color: '#eab308' }, { label: 'Monthly', color: '#a855f7' }].map(d => (
                <div key={d.label} className="zk-legend-item">
                  <span className="zk-legend-dot" style={{ background: d.color }} />
                  <span>{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Records Table */}
        <div className="zk-card zk-table-card">
          <div className="zk-card-header">
            <div>
              <h2 className="zk-card-title">
                Zakat Records
                <span className="zk-info-icon" title="Detailed payment tracking and status">ℹ</span>
              </h2>
              <p className="zk-card-sub">Detailed payment tracking and status</p>
            </div>
          </div>

          {/* Filters */}
          <div className="zk-table-filters">
            <div className="zk-filter-group">
              {statuses.map(s => (
                <button
                  key={s}
                  className={`zk-filter-btn ${statusFilter === s ? 'zk-filter-btn--active' : ''}`}
                  onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="zk-search-wrap">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                className="zk-search"
                placeholder="Search investors..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>

          {/* Table */}
          <div className="zk-table-wrap">
            <table className="zk-table">
              <thead>
                <tr>
                  {[
                    { key: 'investor', label: 'INVESTOR' },
                    { key: 'type',     label: 'TYPE' },
                    { key: 'amount',   label: 'AMOUNT' },
                    { key: 'dueDate',  label: 'DUE DATE' },
                    { key: 'paidDate', label: 'PAID DATE' },
                    { key: 'status',   label: 'STATUS' },
                  ].map(col => (
                    <th key={col.key} onClick={() => handleSort(col.key)} className="zk-th">
                      {col.label} <SortIcon col={col.key} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan={6} className="zk-empty">No records found</td></tr>
                ) : paginated.map(row => (
                  <tr key={row.id} className="zk-tr">
                    <td className="zk-td zk-td--investor">{row.investor}</td>
                    <td className="zk-td"><TypeBadge type={row.type} /></td>
                    <td className="zk-td zk-td--amount">{row.amount.toLocaleString()}</td>
                    <td className="zk-td">{row.dueDate}</td>
                    <td className="zk-td">{row.paidDate || '—'}</td>
                    <td className="zk-td"><StatusBadge status={row.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="zk-pagination">
            <div className="zk-pagination__info">
              Showing{' '}
              <select
                className="zk-perpage-select"
                value={showPerPage}
                onChange={e => { setShowPerPage(Number(e.target.value)); setCurrentPage(1); }}
              >
                {[4, 8, 16].map(n => <option key={n} value={n}>{String(n).padStart(2, '0')}</option>)}
              </select>
              {' '}/ {filtered.length} Results
            </div>
            <div className="zk-pagination__pages">
              <button
                className="zk-page-btn"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  className={`zk-page-btn ${currentPage === p ? 'zk-page-btn--active' : ''}`}
                  onClick={() => setCurrentPage(p)}
                >
                  {p > 3 && p < totalPages - 1 && currentPage !== p ? (p === 4 ? '...' : null) : p}
                  {p === totalPages && totalPages > 5 ? p : null}
                </button>
              )).filter(Boolean)}
              <button
                className="zk-page-btn"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >›</button>
            </div>
          </div>
        </div>

        <div className="zk-footer-note">
          Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
        </div>
      </div>
    </div>
  );
};

export default ZakatPage;

