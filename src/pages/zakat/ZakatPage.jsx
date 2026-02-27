import React, { useState, useMemo, useCallback } from 'react';
import Header from '../../components/header/Header';
import './ZakatPage.css';

// ── DonutChart ───────────────────────────────────────────────────────────────
const DonutChart = ({ data, isDarkMode }) => {
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const total   = data.reduce((s, d) => s + d.value, 0);
  const CX = 140, CY = 140, R_OUTER = 110, R_INNER = 72, GAP_DEG = 2.2;

  const polar = (cx, cy, r, deg) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };
  const arcPath = (s, e, rx = R_OUTER, ri = R_INNER) => {
    const p1 = polar(CX, CY, rx, s), p2 = polar(CX, CY, rx, e);
    const i1 = polar(CX, CY, ri, e), i2 = polar(CX, CY, ri, s);
    const lg = e - s > 180 ? 1 : 0;
    return `M${p1.x.toFixed(3)} ${p1.y.toFixed(3)} A${rx} ${rx} 0 ${lg} 1 ${p2.x.toFixed(3)} ${p2.y.toFixed(3)} L${i1.x.toFixed(3)} ${i1.y.toFixed(3)} A${ri} ${ri} 0 ${lg} 0 ${i2.x.toFixed(3)} ${i2.y.toFixed(3)} Z`;
  };

  let cursor = 0;
  const segments = data.map((d, i) => {
    const span = (d.value / total) * 360;
    const seg  = { ...d, startDeg: cursor + GAP_DEG / 2, endDeg: cursor + span - GAP_DEG / 2, index: i };
    cursor += span;
    return seg;
  });

  const handleMove = useCallback((e, i) => {
    const rect = e.currentTarget.closest('svg').getBoundingClientRect();
    setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, ...data[i] });
  }, [data]);

  return (
    <div className="zk-donut-outer">
      <svg width="280" height="280" viewBox="0 0 280 280" style={{ overflow: 'visible', display: 'block', margin: '0 auto' }}>
        <circle cx={CX} cy={CY} r={(R_OUTER + R_INNER) / 2} fill="none"
          stroke={isDarkMode ? '#334155' : '#DFDFF2'} strokeWidth={R_OUTER - R_INNER + 2} opacity="0.45" />
        {segments.map((seg, i) => (
          <path key={i} d={arcPath(seg.startDeg, seg.endDeg)} fill={seg.color}
            opacity={hovered !== null && hovered !== i ? 0.35 : 1}
            style={{ cursor: 'pointer', transition: 'opacity 0.2s, transform 0.18s',
              transformOrigin: `${CX}px ${CY}px`, transform: hovered === i ? 'scale(1.035)' : 'scale(1)' }}
            onMouseEnter={e => { setHovered(i); handleMove(e, i); }}
            onMouseMove={e => handleMove(e, i)}
            onMouseLeave={() => { setHovered(null); setTooltip(null); }} />
        ))}
        <text x={CX} y={CY - 8} textAnchor="middle" fontSize="22" fontWeight="700"
          fill={isDarkMode ? '#f1f5f9' : '#111827'} fontFamily="system-ui,sans-serif"
          style={{ pointerEvents: 'none', transition: 'fill 0.3s' }}>
          {hovered !== null ? data[hovered].value + '%' : '100%'}
        </text>
        <text x={CX} y={CY + 14} textAnchor="middle" fontSize="12"
          fill={isDarkMode ? '#94a3b8' : '#6b7280'} fontFamily="system-ui,sans-serif"
          style={{ pointerEvents: 'none', transition: 'fill 0.3s' }}>
          {hovered !== null ? data[hovered].label : 'of Total'}
        </text>
        {tooltip && (
          <g style={{ pointerEvents: 'none' }}>
            <rect x={tooltip.x - 54} y={tooltip.y - 44} width={108} height={34} rx={7}
              fill={isDarkMode ? '#1e293b' : '#1f2937'} filter="drop-shadow(0 2px 6px rgba(0,0,0,0.25))" />
            <circle cx={tooltip.x - 38} cy={tooltip.y - 27} r={5} fill={tooltip.color} />
            <text x={tooltip.x - 28} y={tooltip.y - 23} fontSize="11" fontWeight="600"
              fill="#fff" fontFamily="system-ui,sans-serif">{tooltip.label}: {tooltip.value}%</text>
          </g>
        )}
      </svg>
    </div>
  );
};

// ── BarChart ─────────────────────────────────────────────────────────────────
const BarChart = ({ isDarkMode }) => {
  const [hovered, setHovered] = useState(null);

  const bars = [
    { label: 'Equity',    value: 90,  color: '#00B031', legendLabel: 'Annual' },
    { label: 'Quarterly', value: 68,  color: '#FFC300', legendLabel: 'Quarterly' },
    { label: 'Monthly',   value: 40,  color: '#8650FF', legendLabel: 'Monthly' },
  ];

  const VW = 560, VH = 450;
  const LEFT = 130, RIGHT = 512, TOP = 100, BOT = 415;
  const CHART_W = RIGHT - LEFT;
  const CHART_H = BOT - TOP;
  const Y_MAX = 120;
  const Y_TICKS = [0, 30, 60, 90, 120];

  const SLOT_W = CHART_W / 3;
  const BAR_W  = Math.round(SLOT_W * 0.795);
  const BAR_R  = 12;

  const barX = i => LEFT + i * SLOT_W + (SLOT_W - BAR_W) / 2;
  const barH = v => (v / Y_MAX) * CHART_H;
  const barY = v => BOT - barH(v);

  const topRounded = (x, y, w, h, r) => {
    const rr = Math.min(r, w / 2, h / 2);
    return `M${x + rr},${y} H${x + w - rr} Q${x + w},${y} ${x + w},${y + rr} V${y + h} H${x} V${y + rr} Q${x},${y} ${x + rr},${y} Z`;
  };

  const gridC  = isDarkMode ? '#334155'   : '#F0F0F0';
  const axisC  = isDarkMode ? '#475569'   : '#C1C1C1';
  const labelC = isDarkMode ? '#94a3b8'   : '#717182';
  const DASH   = '4.31 4.31';

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block', overflow: 'visible' }}>
      {Y_TICKS.map(t => {
        const y = BOT - (t / Y_MAX) * CHART_H;
        return (
          <g key={t}>
            <line x1={LEFT} y1={y} x2={RIGHT} y2={y}
              stroke={t === 0 ? axisC : gridC}
              strokeWidth="1.43736"
              strokeDasharray={t === 0 ? undefined : DASH} />
            {t === 0 && <line x1={LEFT - 8} y1={y} x2={LEFT} y2={y} stroke={axisC} strokeWidth="1.43736" />}
            <text x={LEFT - 14} y={y + 5} fontSize="15" fill={labelC}
              textAnchor="end" fontFamily="system-ui,-apple-system,sans-serif">{t}</text>
          </g>
        );
      })}
      <line x1={LEFT} y1={TOP} x2={LEFT} y2={BOT}
        stroke={gridC} strokeWidth="1.43736" strokeDasharray={DASH} />
      <line x1={RIGHT} y1={TOP} x2={RIGHT} y2={BOT}
        stroke={gridC} strokeWidth="1.43736" strokeDasharray={DASH} />
      {[1, 2].map(i => (
        <line key={i}
          x1={LEFT + i * SLOT_W} y1={TOP}
          x2={LEFT + i * SLOT_W} y2={BOT}
          stroke={gridC} strokeWidth="1.43736" strokeDasharray={DASH} />
      ))}
      {bars.map((bar, i) => {
        const x    = barX(i);
        const h    = barH(bar.value);
        const y    = barY(bar.value);
        const cx   = x + BAR_W / 2;
        const isH  = hovered === i;
        const isDm = hovered !== null && !isH;

        return (
          <g key={i} style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}>
            <path
              d={topRounded(x, y, BAR_W, h, BAR_R)}
              fill={bar.color}
              opacity={isDm ? 0.38 : 1}
              style={{
                transition: 'opacity 0.18s, filter 0.18s, transform 0.15s',
                transformOrigin: `${cx}px ${BOT}px`,
                transform: isH ? 'scaleY(1.025)' : 'scaleY(1)',
                filter: isH ? 'brightness(1.1) drop-shadow(0 4px 12px rgba(0,0,0,0.22))' : 'none',
              }} />
            {isH && (() => {
              const TW = 100, TH = 30, TX = Math.min(Math.max(cx - TW / 2, LEFT), RIGHT - TW);
              const TY = y - TH - 10;
              return (
                <g style={{ pointerEvents: 'none' }}>
                  <rect x={TX} y={TY} width={TW} height={TH} rx={8}
                    fill={isDarkMode ? '#1e293b' : '#1f2937'}
                    filter="drop-shadow(0 3px 8px rgba(0,0,0,0.35))" />
                  <polygon points={`${cx - 6},${TY + TH} ${cx + 6},${TY + TH} ${cx},${TY + TH + 7}`}
                    fill={isDarkMode ? '#1e293b' : '#1f2937'} />
                  <text x={cx} y={TY + TH / 2 + 5} fontSize="13" fontWeight="700"
                    fill="#fff" textAnchor="middle" fontFamily="system-ui,sans-serif">
                    {bar.legendLabel}: {bar.value}
                  </text>
                </g>
              );
            })()}
            <text x={cx} y={BOT + 30} fontSize="15" fill={labelC}
              textAnchor="middle" fontFamily="system-ui,-apple-system,sans-serif">
              {bar.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ── Status / Type Badges ─────────────────────────────────────────────────────
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

// ── Status Dropdown ──────────────────────────────────────────────────────────
const StatusDropdown = ({ value, onChange, isDarkMode }) => {
  const [open, setOpen] = useState(false);
  const options = ['All', 'Paid', 'Pending', 'Upcoming', 'Overdue'];

  const statusColors = {
    All:     null,
    Paid:     { dot: '#1DBF73' },
    Pending:  { dot: '#ED7601' },
    Upcoming: { dot: '#2B7FFF' },
    Overdue:  { dot: '#E7000B' },
  };

  return (
    <div className="zk-dropdown" style={{ position: 'relative' }}>
      <button
        className="zk-dropdown-trigger"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {value !== 'All' && statusColors[value] && (
          <span className="zk-dropdown-dot" style={{ background: statusColors[value].dot }} />
        )}
        <span className="zk-dropdown-label">
          {value === 'All' ? 'Status' : value}
        </span>
        <svg
          className={`zk-dropdown-chevron ${open ? 'zk-dropdown-chevron--open' : ''}`}
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <>
          <div className="zk-dropdown-backdrop" onClick={() => setOpen(false)} />
          <ul className="zk-dropdown-menu" role="listbox">
            {options.map(opt => (
              <li
                key={opt}
                role="option"
                aria-selected={value === opt}
                className={`zk-dropdown-option ${value === opt ? 'zk-dropdown-option--active' : ''}`}
                onClick={() => { onChange(opt); setOpen(false); }}
              >
                {opt !== 'All' && statusColors[opt] && (
                  <span className="zk-dropdown-dot" style={{ background: statusColors[opt].dot }} />
                )}
                <span>{opt}</span>
                {value === opt && (
                  <svg className="zk-dropdown-check" width="14" height="14" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const ZakatPage = ({ sidebarCollapsed, isDarkMode, toggleTheme }) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery,  setSearchQuery]  = useState('');
  const [currentPage,  setCurrentPage]  = useState(1);
  const [showPerPage,  setShowPerPage]  = useState(4);
  const [sortConfig,   setSortConfig]   = useState({ key: null, dir: 'asc' });

  const allRecords = [
    { id: 1,  investor: 'Mohammed Al-Farooq', type: 'ANNUAL',    amount: 6250,  dueDate: '2025-08-15', paidDate: '2025-08-15', status: 'Paid' },
    { id: 2,  investor: 'Ahmed Khan',          type: 'QUARTERLY', amount: 2300,  dueDate: '2025-08-15', paidDate: null,         status: 'Pending' },
    { id: 3,  investor: 'Fatima Hassan',       type: 'QUARTERLY', amount: 1500,  dueDate: '2025-08-15', paidDate: null,         status: 'Upcoming' },
    { id: 4,  investor: 'Sarah Johnson',       type: 'Monthly',   amount: 3200,  dueDate: '2025-08-15', paidDate: null,         status: 'Upcoming' },
    { id: 5,  investor: 'Omar Abdullah',       type: 'ANNUAL',    amount: 8900,  dueDate: '2025-09-01', paidDate: null,         status: 'Overdue' },
    { id: 6,  investor: 'Layla Ibrahim',       type: 'QUARTERLY', amount: 1100,  dueDate: '2025-09-15', paidDate: '2025-09-14', status: 'Paid' },
    { id: 7,  investor: 'Yusuf Al-Rashid',     type: 'Monthly',   amount: 750,   dueDate: '2025-10-01', paidDate: null,         status: 'Upcoming' },
    { id: 8,  investor: 'Nour Khalid',         type: 'ANNUAL',    amount: 4500,  dueDate: '2025-10-15', paidDate: null,         status: 'Pending' },
    { id: 9,  investor: 'Aisha Rahman',        type: 'QUARTERLY', amount: 3750,  dueDate: '2025-10-20', paidDate: null,         status: 'Upcoming' },
    { id: 10, investor: 'Ibrahim Al-Sayed',    type: 'ANNUAL',    amount: 12000, dueDate: '2025-11-01', paidDate: null,         status: 'Pending' },
  ];

  const donutData = [
    { label: 'Paid',     value: 65, color: '#1DBF73' },
    { label: 'Pending',  value: 15, color: '#ED7601' },
    { label: 'Overdue',  value: 8,  color: '#E7000B' },
    { label: 'Upcoming', value: 12, color: '#2B7FFF' },
  ];

  const barLegend = [
    { label: 'Annual',    color: '#00B031' },
    { label: 'Quarterly', color: '#FFC300' },
    { label: 'Monthly',   color: '#8650FF' },
  ];

  const handleSort = key =>
    setSortConfig(prev => ({ key, dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc' }));

  const filtered = useMemo(() => {
    let rows = allRecords;
    if (statusFilter !== 'All') rows = rows.filter(r => r.status === statusFilter);
    if (searchQuery) rows = rows.filter(r => r.investor.toLowerCase().includes(searchQuery.toLowerCase()));
    if (sortConfig.key) {
      rows = [...rows].sort((a, b) => {
        const [va, vb] = [a[sortConfig.key], b[sortConfig.key]];
        if (va < vb) return sortConfig.dir === 'asc' ? -1 : 1;
        if (va > vb) return sortConfig.dir === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return rows;
  }, [statusFilter, searchQuery, sortConfig]);

  const totalPages = Math.ceil(filtered.length / showPerPage);
  const paginated  = filtered.slice((currentPage - 1) * showPerPage, currentPage * showPerPage);

  const SortIcon = ({ col }) => {
    if (sortConfig.key !== col) return <span className="zk-sort-icon">⇅</span>;
    return <span className="zk-sort-icon active">{sortConfig.dir === 'asc' ? '↑' : '↓'}</span>;
  };

  const getPageNums = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [1];
    if (currentPage > 3) pages.push('...');
    for (let p = Math.max(2, currentPage - 1); p <= Math.min(totalPages - 1, currentPage + 1); p++) pages.push(p);
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className={`em-startup-overview zk-page ${sidebarCollapsed ? 'em-startup-overview--sidebar-collapsed' : ''} ${isDarkMode ? 'dark' : ''}`} style={{ fontSize: '17px' }}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="zk-content">

        <div className="zk-page-header">
          <h1 className="zk-page-title">Zakat Management</h1>
          <p className="zk-page-subtitle">Manage Shariah-compliant Zakat contributions and distributions</p>
        </div>

        <div className="zk-stats-grid">
          <StatCard
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 3.10602L11.492 3.65802C11.6304 3.78521 11.8115 3.8558 11.9995 3.8558C12.1875 3.8558 12.3686 3.78521 12.507 3.65802L12 3.10602ZM10.592 8.19602C9.902 7.69302 9.165 7.08102 8.609 6.43602C8.035 5.77102 7.75 5.18202 7.75 4.71502H6.25C6.25 5.73202 6.828 6.66902 7.473 7.41602C8.136 8.18402 8.974 8.87302 9.708 9.40802L10.592 8.19602ZM7.75 4.71502C7.75 3.65602 8.27 3.05202 8.896 2.84202C9.548 2.62202 10.52 2.76402 11.492 3.65802L12.507 2.55402C11.23 1.38002 9.704 0.988018 8.418 1.42002C7.105 1.86202 6.25 3.09602 6.25 4.71502H7.75ZM14.292 9.40802C15.026 8.87402 15.864 8.18402 16.527 7.41602C17.172 6.66902 17.75 5.73202 17.75 4.71502H16.25C16.25 5.18202 15.966 5.77102 15.391 6.43602C14.835 7.08102 14.099 7.69302 13.409 8.19602L14.292 9.40802ZM17.75 4.71502C17.75 3.09602 16.895 1.86202 15.583 1.42002C14.297 0.988018 12.77 1.38002 11.493 2.55402L12.508 3.65802C13.48 2.76402 14.453 2.62202 15.105 2.84202C15.73 3.05202 16.25 3.65602 16.25 4.71502H17.75Z" fill="white"/>
              <path d="M5 20.388H7.26C8.27 20.388 9.293 20.494 10.276 20.696C12.0311 21.0555 13.8367 21.0954 15.606 20.814C16.474 20.674 17.326 20.459 18.098 20.087C18.794 19.75 19.647 19.277 20.22 18.746C20.792 18.216 21.388 17.349 21.81 16.671C22.174 16.089 21.998 15.376 21.424 14.943C21.1013 14.7088 20.7127 14.5827 20.314 14.5827C19.9153 14.5827 19.5267 14.7088 19.204 14.943L17.397 16.308C16.697 16.838 15.932 17.325 15.021 17.47C14.911 17.4874 14.796 17.503 14.676 17.517" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M5 15.5C5 14.6716 4.32843 14 3.5 14C2.67157 14 2 14.6716 2 15.5V20.5C2 21.3284 2.67157 22 3.5 22C4.32843 22 5 21.3284 5 20.5V15.5Z" stroke="white" strokeWidth="1.5"/>
            </svg>}
            bgColor="#22c55e" label="Total Zakat Collected" value="$187K"
            sub="+12.3% from last year" badge="This year" badgeColor="#22c55e" />
          <StatCard
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
            bgColor="#f97316" label="Pending Zakat" value="$24K"
            sub="Awaiting payment" badge="This Month" badgeColor="#f97316" />
          <StatCard
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
            bgColor="#3b82f6" label="Compliant Investors" value="42"
            sub="Out of 50 total" badge="100% rate" badgeColor="#3b82f6" />
          <StatCard
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>}
            bgColor="#a855f7" label="Distributed Zakat" value="$163k"
            sub="To beneficiaries" badge="87.2% rate" badgeColor="#a855f7" />
        </div>

        <div className="zk-charts-row">
          {/* Donut */}
          <div className="zk-card zk-chart-card">
            <div className="zk-card-header">
              <h2 className="zk-card-title">Zakat Status Distribution
                <span className="zk-info-icon" title="Current status breakdown">  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}>
      <circle cx="8" cy="8" r="8" fill="#AFAFAF"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.30469 5.24219C9.42969 5.02344 9.5 4.76953 9.5 4.5C9.5 3.67188 8.82812 3 8 3C7.17188 3 6.5 3.67188 6.5 4.5C6.5 5.32812 7.17188 6 8 6C8.55859 6 9.04688 5.69531 9.30469 5.24219ZM7 7H7.5H8.5C9.05273 7 9.5 7.44727 9.5 8V9V13C9.5 13.5527 9.05273 14 8.5 14C7.94727 14 7.5 13.5527 7.5 13V9.75C7.5 9.33594 7.16406 9 6.75 9C6.33594 9 6 8.66406 6 8.25V8C6 7.64844 6.18164 7.33789 6.45508 7.16016C6.61133 7.05859 6.79883 7 7 7Z" fill="white"/>
    </svg></span>
              </h2>
              <p className="zk-card-sub">Current status of all tokens</p>
            </div>
            <DonutChart data={donutData} isDarkMode={isDarkMode} />
            <div className="zk-legend zk-legend--grid" style={{ fontSize: '15px' }}>
              {donutData.map(d => (
                <div key={d.label} className="zk-legend-item" style={{ cursor: 'pointer', fontSize: '18px', padding: '8px 18px' }}>
                  <span className="zk-legend-dot" style={{ background: d.color, width: '22px', height: '22px', display: 'inline-block', borderRadius: '50%', marginRight: '10px' }} />
                  <span className="zk-legend-label" style={{ fontWeight: '600', fontSize: '18px', marginRight: '10px' }}>{d.label}</span>
                  <span className="zk-legend-pct" style={{ fontSize: '18px' }}>{d.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="zk-card zk-chart-card">
            <div className="zk-card-header">
              <h2 className="zk-card-title">
                Payment Type Distribution
                <span className="zk-info-icon" title="Breakdown by token type">  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}>
      <circle cx="8" cy="8" r="8" fill="#AFAFAF"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.30469 5.24219C9.42969 5.02344 9.5 4.76953 9.5 4.5C9.5 3.67188 8.82812 3 8 3C7.17188 3 6.5 3.67188 6.5 4.5C6.5 5.32812 7.17188 6 8 6C8.55859 6 9.04688 5.69531 9.30469 5.24219ZM7 7H7.5H8.5C9.05273 7 9.5 7.44727 9.5 8V9V13C9.5 13.5527 9.05273 14 8.5 14C7.94727 14 7.5 13.5527 7.5 13V9.75C7.5 9.33594 7.16406 9 6.75 9C6.33594 9 6 8.66406 6 8.25V8C6 7.64844 6.18164 7.33789 6.45508 7.16016C6.61133 7.05859 6.79883 7 7 7Z" fill="white"/>
    </svg></span>
              </h2>
              <p className="zk-card-sub">Breakdown by token type</p>
            </div>
            <div className="zk-bar-wrap">
              <BarChart isDarkMode={isDarkMode} />
            </div>
            <div className="zk-bar-legend">
              {barLegend.map(d => (
                <div key={d.label} className="zk-bar-legend-item" style={{ cursor: 'pointer' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" className="zk-bar-legend-sq">
                    <rect width="18" height="18" rx="4" fill={d.color} />
                  </svg>
                  <span className="zk-bar-legend-label">{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Table Card ── */}
        <div className="zk-card zk-table-card">
          {/* Card Header */}
          <div className="zk-table-card__header">
            <div>
              <h2 className="zk-card-title">
                Zakat Records
                <span className="zk-info-icon" title="Detailed payment tracking">  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}>
      <circle cx="8" cy="8" r="8" fill="#AFAFAF"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.30469 5.24219C9.42969 5.02344 9.5 4.76953 9.5 4.5C9.5 3.67188 8.82812 3 8 3C7.17188 3 6.5 3.67188 6.5 4.5C6.5 5.32812 7.17188 6 8 6C8.55859 6 9.04688 5.69531 9.30469 5.24219ZM7 7H7.5H8.5C9.05273 7 9.5 7.44727 9.5 8V9V13C9.5 13.5527 9.05273 14 8.5 14C7.94727 14 7.5 13.5527 7.5 13V9.75C7.5 9.33594 7.16406 9 6.75 9C6.33594 9 6 8.66406 6 8.25V8C6 7.64844 6.18164 7.33789 6.45508 7.16016C6.61133 7.05859 6.79883 7 7 7Z" fill="white"/>
    </svg></span>
              </h2>
              <p className="zk-card-sub">Detailed payment tracking and status</p>
            </div>
          </div>

          {/* Filters Row — Status dropdown left, Search right (matches Figma) */}
          <div className="zk-table-filters">
            <StatusDropdown
              value={statusFilter}
              onChange={v => { setStatusFilter(v); setCurrentPage(1); }}
              isDarkMode={isDarkMode}
            />
            <div className="zk-search-wrap">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="zk-search-icon">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                className="zk-search"
                placeholder="Search"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
              {searchQuery && (
                <button className="zk-search-clear" onClick={() => { setSearchQuery(''); setCurrentPage(1); }} aria-label="Clear search">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
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
                {paginated.length === 0
                  ? <tr><td colSpan={6} className="zk-empty">No records found</td></tr>
                  : paginated.map(row => (
                    <tr key={row.id} className="zk-tr">
                      <td className="zk-td zk-td--investor">{row.investor}</td>
                      <td className="zk-td"><TypeBadge type={row.type} /></td>
                      <td className="zk-td zk-td--amount">${row.amount.toLocaleString()}</td>
                      <td className="zk-td">{row.dueDate}</td>
                      <td className="zk-td">{row.paidDate || '—'}</td>
                      <td className="zk-td"><StatusBadge status={row.status} /></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          {/* Pagination — matches Figma SVG exactly */}
          <div className="zk-pagination">
            {/* Left: "Showing [04] / 100 Results" */}
            <div className="zk-pagination__info">
              <span className="zk-pagination__showing-text">Showing</span>
              <div className="zk-perpage-box">
                <select
                  className="zk-perpage-select"
                  value={showPerPage}
                  onChange={e => { setShowPerPage(Number(e.target.value)); setCurrentPage(1); }}
                  aria-label="Results per page"
                >
                  {[4, 8, 16].map(n => (
                    <option key={n} value={n}>{String(n).padStart(2, '0')}</option>
                  ))}
                </select>
              </div>
              <span className="zk-pagination__results-text">/ {filtered.length} Results</span>
            </div>

            {/* Right: ‹ 1 2 3 … 10 › */}
            <div className="zk-pagination__pages">
              {/* Prev button — rounded rect, gray fill */}
              <button
                className="zk-page-nav-btn"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>

              {/* Page number buttons */}
              {getPageNums().map((p, idx) =>
                p === '...' ? (
                  <span key={`ellipsis-${idx}`} className="zk-page-ellipsis">...</span>
                ) : (
                  <button
                    key={p}
                    className={`zk-page-num-btn${p === currentPage ? ' zk-page-num-btn--active' : ''}`}
                    onClick={() => setCurrentPage(p)}
                    aria-label={`Page ${p}`}
                    aria-current={p === currentPage ? 'page' : undefined}
                  >
                    {p}
                  </button>
                )
              )}

              {/* Next button — rounded rect, gray fill */}
              <button
                className="zk-page-nav-btn"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>

           <div className="zk-footer-note">
          Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
        </div>
        </div>

       
      </div>
    </div>
  );
};

export default ZakatPage;