import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import Header from '../../components/header/Header';
import './InvestorNetworkPage.css';

// ── Info Icon SVG ─────────────────────────────────────────────────────────────
const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" fill="#AFAFAF"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M9.30469 5.24219C9.42969 5.02344 9.5 4.76953 9.5 4.5C9.5 3.67188 8.82812 3 8 3C7.17188 3 6.5 3.67188 6.5 4.5C6.5 5.32812 7.17188 6 8 6C8.55859 6 9.04688 5.69531 9.30469 5.24219ZM7 7H7.5H8.5C9.05273 7 9.5 7.44727 9.5 8V9V13C9.5 13.5527 9.05273 14 8.5 14C7.94727 14 7.5 13.5527 7.5 13V9.75C7.5 9.33594 7.16406 9 6.75 9C6.33594 9 6 8.66406 6 8.25V8C6 7.64844 6.18164 7.33789 6.45508 7.16016C6.61133 7.05859 6.79883 7 7 7Z" fill="white"/>
  </svg>
);

// ── Card Action Button SVG ────────────────────────────────────────────────────
const CardActionBtn = () => (
  <svg width="102" height="40" viewBox="0 0 102 40" fill="none">
    <g filter="url(#card-shadow)">
      <rect x="2" y="1" width="98" height="36" rx="12" fill="white" shapeRendering="crispEdges"/>
      <rect x="2.5" y="1.5" width="97" height="35" rx="11.5" stroke="#E0E0E0" shapeRendering="crispEdges"/>
      <path d="M20 26H15V21M24 12H29V17" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M54.7697 12.1712C55.4037 11.5401 56.429 11.5413 57.0616 12.1739L58.8289 13.9412C59.4614 14.5737 59.4627 15.5987 58.8318 16.2328L48.6732 26.4433L44.5593 26.4433L44.5593 22.3342L54.7697 12.1712Z" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M53.4805 13.463L57.5368 17.5193" stroke="#888888" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M76 17.1504C76.5099 17.1504 76.9425 17.3302 77.3066 17.6943C77.6708 18.0585 77.8502 18.4909 77.8496 19L77.8418 19.1875C77.8024 19.617 77.6243 19.988 77.3057 20.3066C76.9415 20.6708 76.5091 20.8502 76 20.8496C75.4901 20.8496 75.0575 20.6698 74.6934 20.3057C74.3292 19.9415 74.1498 19.5091 74.1504 19C74.1504 18.4901 74.3302 18.0575 74.6943 17.6934C75.0129 17.3748 75.3837 17.1971 75.8125 17.1582L76 17.1504ZM82 17.1504C82.5099 17.1504 82.9425 17.3302 83.3066 17.6943C83.6708 18.0585 83.8502 18.4909 83.8496 19L83.8418 19.1875C83.8024 19.617 83.6243 19.988 83.3057 20.3066C82.9415 20.6708 82.5091 20.8502 82 20.8496C81.4901 20.8496 81.0575 20.6698 80.6934 20.3057C80.3292 19.9415 80.1498 19.5091 80.1504 19C80.1504 18.4901 80.3302 18.0575 80.6943 17.6934C81.0129 17.3748 81.3837 17.1971 81.8125 17.1582L82 17.1504ZM88 17.1504C88.5099 17.1504 88.9425 17.3302 89.3066 17.6943C89.6708 18.0585 89.8502 18.4909 89.8496 19L89.8418 19.1875C89.8024 19.617 89.6243 19.988 89.3057 20.3066C88.9415 20.6708 88.5091 20.8502 88 20.8496C87.4901 20.8496 87.0575 20.6698 86.6934 20.3057C86.3292 19.9415 86.1498 19.5091 86.1504 19C86.1504 18.4901 86.3302 18.0575 86.6943 17.6934C87.0129 17.3748 87.3837 17.1971 87.8125 17.1582L88 17.1504Z" fill="#888888" stroke="white" strokeWidth="0.3"/>
    </g>
    <defs>
      <filter id="card-shadow" x="0" y="0" width="102" height="40" filterUnits="userSpaceOnUse">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="1"/>
        <feGaussianBlur stdDeviation="1"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
      </filter>
    </defs>
  </svg>
);

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

// ── Donut Chart (fully interactive) ──────────────────────────────────────────
const DonutChart = ({ data, isDarkMode }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [tooltip, setTooltip]       = useState(null);
  const svgRef = useRef(null);

  const total        = data.reduce((s, d) => s + d.value, 0);
  const R            = 78;
  const cx = 100, cy = 100;
  const strokeW      = 28;
  const GAP_DEG      = 2.5;   // gap between slices in degrees
  const circumference = 2 * Math.PI * R;

  // Build slices with gap
  let offsetDeg = -90; // start at top
  const slices = data.map((d, i) => {
    const spanDeg  = (d.value / total) * 360;
    const startDeg = offsetDeg + GAP_DEG / 2;
    const endDeg   = offsetDeg + spanDeg - GAP_DEG / 2;
    offsetDeg += spanDeg;

    // Convert to stroke-dasharray on the circumference circle
    const sliceArc  = ((endDeg - startDeg) / 360) * circumference;
    const gapArc    = circumference - sliceArc;
    // rotation: we rotate the circle so the start of the visible arc aligns
    const rotation  = startDeg;   // already accounting for -90 offset

    return { ...d, sliceArc, gapArc, rotation, index: i };
  });

  const handleMouseMove = useCallback((e, i) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, ...data[i] });
  }, [data]);

  const centerFill   = isDarkMode ? '#1e293b' : '#fff';
  const trackColor   = isDarkMode ? '#1e3055' : '#f0f4ff';
  const hovered      = hoveredIdx !== null ? data[hoveredIdx] : null;

  return (
    <div className="in-donut-wrap" style={{ position: 'relative' }}>
      <svg
        ref={svgRef}
        width="200" height="200" viewBox="0 0 200 200"
        style={{ display: 'block', margin: '0 auto', overflow: 'visible' }}
      >
        {/* Background track */}
        <circle
          cx={cx} cy={cy} r={R}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeW}
        />

        {/* Slices */}
        {slices.map((s, i) => {
          const isHov = hoveredIdx === i;
          const isDim = hoveredIdx !== null && !isHov;
          return (
            <circle
              key={i}
              cx={cx} cy={cy} r={R}
              fill="none"
              stroke={s.color}
              strokeWidth={isHov ? strokeW + 5 : strokeW}
              strokeDasharray={`${s.sliceArc} ${s.gapArc}`}
              transform={`rotate(${s.rotation} ${cx} ${cy})`}
              opacity={isDim ? 0.32 : 1}
              style={{
                cursor: 'pointer',
                transition: 'opacity 0.2s, stroke-width 0.18s',
                filter: isHov ? `drop-shadow(0 0 6px ${s.color}88)` : 'none',
              }}
              onMouseEnter={e => { setHoveredIdx(i); handleMouseMove(e, i); }}
              onMouseMove={e => handleMouseMove(e, i)}
              onMouseLeave={() => { setHoveredIdx(null); setTooltip(null); }}
            />
          );
        })}

        {/* White/dark center */}
        <circle cx={cx} cy={cy} r={R - strokeW / 2 - 3} fill={centerFill}
          style={{ transition: 'fill 0.3s' }} />

        {/* Center label */}
        <text x={cx} y={cy - 9} textAnchor="middle" fontSize="22" fontWeight="700"
          fill={isDarkMode ? '#f1f5f9' : '#111827'}
          style={{ pointerEvents: 'none', transition: 'fill 0.3s' }}>
          {hovered ? hovered.value : total}
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="11"
          fill={isDarkMode ? '#94a3b8' : '#6b7280'}
          style={{ pointerEvents: 'none', transition: 'fill 0.3s' }}>
          {hovered ? hovered.label : 'Total'}
        </text>
        {hovered && (
          <text x={cx} y={cy + 25} textAnchor="middle" fontSize="10"
            fill={hovered.color}
            style={{ pointerEvents: 'none' }}>
            {Math.round((hovered.value / total) * 100)}%
          </text>
        )}

        {/* SVG tooltip */}
        {tooltip && (
          <g style={{ pointerEvents: 'none' }}>
            <rect
              x={Math.min(tooltip.x + 8, 150)} y={tooltip.y - 30}
              width={110} height={32} rx={7}
              fill={isDarkMode ? '#1e293b' : '#111827'}
              filter="drop-shadow(0 3px 8px rgba(0,0,0,0.3))"
            />
            <circle
              cx={Math.min(tooltip.x + 8, 150) + 12}
              cy={tooltip.y - 14} r={4}
              fill={tooltip.color}
            />
            <text
              x={Math.min(tooltip.x + 8, 150) + 22}
              y={tooltip.y - 10}
              fontSize="11" fontWeight="600" fill="#fff">
              {tooltip.label}: {tooltip.value} ({Math.round((tooltip.value / total) * 100)}%)
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

// ── Area / Line Chart ─────────────────────────────────────────────────────────
const AreaChart = ({ data, targetLine, isDarkMode }) => {
  const [tooltip, setTooltip] = useState(null);
  const svgRef = useRef(null);

  const W = 500, H = 200, padL = 42, padR = 20, padT = 24, padB = 40;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const maxVal = Math.max(...data.map(d => d.value), targetLine) + 4;
  const minVal = 0;

  const xScale = i  => padL + (i / (data.length - 1)) * chartW;
  const yScale = v  => padT + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;

  const linePath  = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i).toFixed(2)},${yScale(d.value).toFixed(2)}`).join(' ');
  const areaPath  = linePath + ` L${xScale(data.length - 1).toFixed(2)},${(padT + chartH).toFixed(2)} L${padL},${(padT + chartH).toFixed(2)} Z`;
  const targetY   = yScale(targetLine);

  const gridC   = isDarkMode ? '#334155' : '#e5e7eb';
  const labelC  = isDarkMode ? '#64748b' : '#9ca3af';
  const yTicks  = [0, 7, 14, 21, 28];

  const handleMouseEnter = useCallback((e, d, i) => {
    setTooltip({ index: i, data: d, x: xScale(i), y: yScale(d.value) });
  }, [data]);

  return (
    <div className="in-area-chart-wrap">
      <svg
        ref={svgRef}
        width="100%" viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', cursor: 'crosshair', overflow: 'visible' }}
        onMouseLeave={() => setTooltip(null)}
      >
        <defs>
          <linearGradient id="areaGradIN" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#f59e0b" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.02" />
          </linearGradient>
          <clipPath id="chartClip">
            <rect x={padL} y={padT} width={chartW} height={chartH} />
          </clipPath>
        </defs>

        {/* Grid lines */}
        {yTicks.map(t => (
          <g key={t}>
            <line x1={padL} y1={yScale(t)} x2={W - padR} y2={yScale(t)}
              stroke={gridC} strokeWidth="1" strokeDasharray="4 4" />
            <text x={padL - 6} y={yScale(t) + 4} fontSize="10" fill={labelC} textAnchor="end">{t}</text>
          </g>
        ))}

        {/* Target dashed line */}
        <line x1={padL} y1={targetY} x2={W - padR} y2={targetY}
          stroke={isDarkMode ? '#475569' : '#d1d5db'} strokeWidth="1.5" strokeDasharray="6 4" />
        <text x={W - padR + 4} y={targetY + 4} fontSize="9" fill={labelC}></text>

        {/* Hover vertical line */}
        {tooltip && (
          <line x1={tooltip.x} y1={padT} x2={tooltip.x} y2={padT + chartH}
            stroke={isDarkMode ? '#64748b' : '#374151'} strokeWidth="1" strokeDasharray="4 3" />
        )}

        {/* Area + Line */}
        <path d={areaPath} fill="url(#areaGradIN)" clipPath="url(#chartClip)" />
        <path d={linePath} fill="none" stroke="#f59e0b" strokeWidth="2.5"
          strokeLinejoin="round" strokeLinecap="round" clipPath="url(#chartClip)" />

        {/* Data points */}
        {data.map((d, i) => {
          const isHov = tooltip?.index === i;
          return (
            <circle
              key={i}
              cx={xScale(i)} cy={yScale(d.value)}
              r={isHov ? 6 : 3.5}
              fill={isHov ? '#f59e0b' : (isDarkMode ? '#1e293b' : '#fff')}
              stroke="#f59e0b"
              strokeWidth={isHov ? 2.5 : 1.5}
              style={{ transition: 'r 0.15s', cursor: 'crosshair' }}
            />
          );
        })}

        {/* X labels */}
        {data.map((d, i) => (
          <text key={i} x={xScale(i)} y={H - 8} fontSize="11" fill={labelC} textAnchor="middle">
            {d.label}
          </text>
        ))}

        {/* Hover hit zones */}
        {data.map((d, i) => (
          <rect
            key={i}
            x={xScale(i) - chartW / (data.length - 1) / 2}
            y={padT}
            width={chartW / (data.length - 1)}
            height={chartH}
            fill="transparent"
            style={{ cursor: 'crosshair' }}
            onMouseEnter={e => handleMouseEnter(e, d, i)}
          />
        ))}

        {/* Tooltip */}
        {tooltip && (() => {
          const TX = Math.min(Math.max(tooltip.x - 55, padL), W - padR - 115);
          const TY = tooltip.y - 52;
          return (
            <g style={{ pointerEvents: 'none' }}>
              <rect x={TX} y={TY} width={115} height={38} rx={7}
                fill={isDarkMode ? '#1e293b' : '#111827'}
                filter="drop-shadow(0 4px 10px rgba(0,0,0,0.35))" />
              <circle cx={TX + 12} cy={TY + 12} r={4} fill="#f59e0b" />
              <text x={TX + 20} y={TY + 16} fontSize="11" fontWeight="700" fill="#fff">
                {tooltip.data.label}
              </text>
              <text x={TX + 12} y={TY + 30} fontSize="10" fill="#d1d5db">
                Investments: {tooltip.data.value}
              </text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
};

// ── Status Dropdown ───────────────────────────────────────────────────────────
const StatusDropdown = ({ value, onChange, isDarkMode, options, label = 'Status' }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const statusColors = {
    Active:    '#22c55e',
    Reviewing: '#3b82f6',
    Inactive:  '#9ca3af',
    Paid:      '#1DBF73',
    Pending:   '#ED7601',
    Upcoming:  '#2B7FFF',
    Overdue:   '#E7000B',
  };

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="in-dropdown" ref={ref}>
      <button
        className="in-dropdown-trigger"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {value !== 'All' && statusColors[value] && (
          <span className="in-dropdown-dot" style={{ background: statusColors[value] }} />
        )}
        <span className="in-dropdown-label">{value === 'All' ? label : value}</span>
        <svg className={`in-dropdown-chevron${open ? ' open' : ''}`}
          width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <ul className="in-dropdown-menu" role="listbox">
          {options.map(opt => (
            <li key={opt} role="option" aria-selected={value === opt}
              className={`in-dropdown-option${value === opt ? ' active' : ''}`}
              onClick={() => { onChange(opt); setOpen(false); }}>
              {opt !== 'All' && statusColors[opt] && (
                <span className="in-dropdown-dot" style={{ background: statusColors[opt] }} />
              )}
              <span>{opt}</span>
              {value === opt && (
                <svg className="in-dropdown-check" width="13" height="13" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ── Type Badge ────────────────────────────────────────────────────────────────
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

// ── Donut Legend (interactive) ────────────────────────────────────────────────
const DonutLegend = ({ data, hoveredIdx, onHover }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div className="in-donut-legend">
      {data.map((d, i) => {
        const isHov = hoveredIdx === i;
        const isDim = hoveredIdx !== null && !isHov;
        return (
          <div
            key={d.label}
            className={`in-donut-legend-row${isHov ? ' hovered' : ''}${isDim ? ' dimmed' : ''}`}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
            style={{ cursor: 'pointer' }}
          >
            <div className="in-donut-legend-left">
              <span className="in-legend-dot" style={{
                background: d.color,
                transform: isHov ? 'scale(1.4)' : 'scale(1)',
                boxShadow: isHov ? `0 0 6px ${d.color}88` : 'none',
              }} />
              <span className="in-legend-label">{d.label}</span>
            </div>
            <div className="in-donut-legend-right">
              <span className="in-legend-pct" style={{ color: isHov ? d.color : undefined }}>
                {Math.round((d.value / total) * 100)}%
              </span>
              <span className="in-legend-count">{d.value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── Sort Icon ─────────────────────────────────────────────────────────────────
const SortIcon = ({ col, sortConfig }) => (
  <span className={`in-sort-icon${sortConfig.key === col ? ' active' : ''}`}>
    {sortConfig.key === col ? (sortConfig.dir === 'asc' ? '↑' : '↓') : '⇅'}
  </span>
);

// ── Pagination (Figma-matched) ────────────────────────────────────────────────
const Pagination = ({ currentPage, totalPages, filteredLen, showPerPage, onPageChange, onPerPageChange }) => {
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
    <div className="zk-pagination">
      <div className="zk-pagination__info">
        <span className="zk-pagination__showing-text">Showing</span>
        <div className="zk-perpage-box">
          <select
            className="zk-perpage-select"
            value={showPerPage}
            onChange={e => onPerPageChange(Number(e.target.value))}
            aria-label="Results per page"
          >
            {[4, 8, 16].map(n => (
              <option key={n} value={n}>{String(n).padStart(2, '0')}</option>
            ))}
          </select>
        </div>
        <span className="zk-pagination__results-text">/ {filteredLen} Results</span>
      </div>
      <div className="zk-pagination__pages">
        <button className="zk-page-nav-btn"
          onClick={() => onPageChange(p => Math.max(1, p - 1))}
          disabled={currentPage === 1} aria-label="Previous page">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        {getPageNums().map((p, idx) =>
          p === '...' ? (
            <span key={`e${idx}`} className="zk-page-ellipsis">...</span>
          ) : (
            <button key={p}
              className={`zk-page-num-btn${p === currentPage ? ' zk-page-num-btn--active' : ''}`}
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`} aria-current={p === currentPage ? 'page' : undefined}>
              {p}
            </button>
          )
        )}
        <button className="zk-page-nav-btn"
          onClick={() => onPageChange(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages || totalPages === 0} aria-label="Next page">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const InvestorNetworkPage = ({ isDarkMode, toggleTheme, sidebarCollapsed }) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery,  setSearchQuery]  = useState('');
  const [currentPage,  setCurrentPage]  = useState(1);
  const [showPerPage,  setShowPerPage]  = useState(4);
  const [sortConfig,   setSortConfig]   = useState({ key: null, dir: 'asc' });
  const [donutHovered, setDonutHovered] = useState(null);

  const donutData = [
    { label: 'Angel',           value: 18, color: '#6366f1' },
    { label: 'VC Fund',         value: 12, color: '#06b6d4' },
    { label: 'Institutional',   value: 8,  color: '#22c55e' },
    { label: 'Family Office',   value: 7,  color: '#f97316' },
    { label: 'Sovereign Wealth',value: 5,  color: '#ec4899' },
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
    { id: 1, name: 'Mohammed Al-Farooq', type: 'Angel',           portfolio: '5 Startups',  invested: 1250,  available: 750,   status: 'Active' },
    { id: 2, name: 'Sarah Johnson',      type: 'VC Fund',         portfolio: '12 Startups', invested: 8500,  available: 15500, status: 'Active' },
    { id: 3, name: 'Ahmed Khan',         type: 'Institutional',   portfolio: '3 Startups',  invested: 600,   available: 400,   status: 'Reviewing' },
    { id: 4, name: 'Fatima Hassan',      type: 'Family Office',   portfolio: '7 Startups',  invested: 3200,  available: 2100,  status: 'Active' },
    { id: 5, name: 'Omar Abdullah',      type: 'Sovereign Wealth',portfolio: '2 Startups',  invested: 12000, available: 8000,  status: 'Active' },
    { id: 6, name: 'Layla Ibrahim',      type: 'Angel',           portfolio: '4 Startups',  invested: 900,   available: 600,   status: 'Reviewing' },
    { id: 7, name: 'Yusuf Al-Rashid',    type: 'VC Fund',         portfolio: '9 Startups',  invested: 5500,  available: 9000,  status: 'Active' },
    { id: 8, name: 'Nour Khalid',        type: 'Institutional',   portfolio: '1 Startup',   invested: 200,   available: 300,   status: 'Inactive' },
  ];

  const handleSort = key =>
    setSortConfig(prev => ({ key, dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc' }));

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
  const paginated  = filtered.slice((currentPage - 1) * showPerPage, currentPage * showPerPage);

  const handlePerPageChange = n => { setShowPerPage(n); setCurrentPage(1); };
  const handleStatusChange  = v => { setStatusFilter(v); setCurrentPage(1); };
  const handleSearch        = e => { setSearchQuery(e.target.value); setCurrentPage(1); };
  const handleDonutHover    = idx => setDonutHovered(idx);

  return (
    <div className={`em-startup-overview in-page${sidebarCollapsed ? ' em-startup-overview--sidebar-collapsed' : ''}${isDarkMode ? ' dark' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />

      <div className="in-content" style={{ marginTop: '-18px' }}>
        {/* Page Header */}
        <div className="in-page-header">
          <h1 className="in-page-title">Investor Network</h1>
          <p className="in-page-subtitle">Manage and monitor investor activities and portfolios</p>
        </div>

        {/* Stat Cards */}
        <div className="in-stats-grid">
          <StatCard bgColor="#256dca"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 7.16C17.94 7.15 17.87 7.15 17.81 7.16C16.43 7.11 15.33 5.98 15.33 4.58C15.33 3.15 16.48 2 17.91 2C19.34 2 20.49 3.16 20.49 4.58C20.48 5.98 19.38 7.11 18 7.16Z" stroke="white" strokeWidth="1.15603" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.97 14.44C18.34 14.67 19.85 14.43 20.91 13.72C22.32 12.78 22.32 11.24 20.91 10.3C19.84 9.59004 18.31 9.35003 16.94 9.59003" stroke="white" strokeWidth="1.15603" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.96997 7.16C6.02997 7.15 6.09997 7.15 6.15997 7.16C7.53997 7.11 8.63997 5.98 8.63997 4.58C8.63997 3.15 7.48997 2 6.05997 2C4.62997 2 3.47997 3.16 3.47997 4.58C3.48997 5.98 4.58997 7.11 5.96997 7.16Z" stroke="white" strokeWidth="1.15603" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.99999 14.44C5.62999 14.67 4.11999 14.43 3.05999 13.72C1.64999 12.78 1.64999 11.24 3.05999 10.3C4.12999 9.59004 5.65998 9.35003 7.02998 9.59003" stroke="white" strokeWidth="1.15603" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 14.63C11.94 14.62 11.87 14.62 11.81 14.63C10.43 14.58 9.32996 13.45 9.32996 12.05C9.32996 10.62 10.48 9.46997 11.91 9.46997C13.34 9.46997 14.49 10.63 14.49 12.05C14.48 13.45 13.38 14.59 12 14.63Z" stroke="white" strokeWidth="1.15603" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.08997 17.78C7.67997 18.72 7.67997 20.26 9.08997 21.2C10.69 22.27 13.31 22.27 14.91 21.2C16.32 20.26 16.32 18.72 14.91 17.78C13.32 16.72 10.69 16.72 9.08997 17.78Z" stroke="white" strokeWidth="1.15603" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>}
            label="Total Investors" value="50" sub="↑ +8% this quarter" subColor="#22c55e" />

          <StatCard bgColor="#24ce76"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M16 7H22V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 7L13.5 15.5L8.5 10.5L2 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>}
            label="Active Investors" value="42" sub="↑ +5% this month" subColor="#22c55e" />

          <StatCard bgColor="#c6a625"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>}
            label="Total Capital" value="$45M" sub="↑ +$8.2M vs last quarter" subColor="#22c55e" />

          <StatCard bgColor="#5238c2"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 7V4C19 3.73478 18.8946 3.48043 18.7071 3.29289C18.5196 3.10536 18.2652 3 18 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5C3 5.53043 3.21071 6.03914 3.58579 6.41421C3.96086 6.78929 4.46957 7 5 7H20C20.2652 7 20.5196 7.10536 20.7071 7.29289C20.8946 7.48043 21 7.73478 21 8V12M21 12H18C17.4696 12 16.9609 12.2107 16.5858 12.5858C16.2107 12.9609 16 13.4696 16 14C16 14.5304 16.2107 15.0391 16.5858 15.4142C16.9609 15.7893 17.4696 16 18 16H21C21.2652 16 21.5196 15.8946 21.7071 15.7071C21.8946 15.5196 22 15.2652 22 15V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>}
            label="Zakat Pending" value="$450K" sub="↓ -$50K vs last quarter" subColor="#ef4444" />
        </div>

        {/* Charts Row */}
        <div className="in-charts-row">

          {/* Donut Card */}
          <div className="in-card in-chart-card">
            <div className="in-card-header-row">
              <div>
                <h2 className="in-card-title">
                  Investor Type Distribution
                  <span className="in-info-icon" title="Breakdown by investor category"><InfoIcon /></span>
                </h2>
                <p className="in-card-sub">Breakdown by investor category</p>
              </div>
              <div className="in-card-actions-btn" style={{ cursor: 'pointer' }}><CardActionBtn /></div>
            </div>

            {/* Donut — both chart and legend share hover state */}
            <DonutChart data={donutData} isDarkMode={isDarkMode} externalHover={donutHovered} onHover={handleDonutHover} />
            <DonutLegend data={donutData} hoveredIdx={donutHovered} onHover={handleDonutHover} />
          </div>

          {/* Area Chart Card */}
          <div className="in-card in-chart-card">
            <div className="in-card-header-row">
              <div>
                <h2 className="in-card-title">
                  Investment Activity (Last 6 Months)
                  <span className="in-info-icon" title="Monthly investment trend with targets"><InfoIcon /></span>
                </h2>
                <p className="in-card-sub">Monthly investment trend with targets</p>
              </div>
              <div className="in-card-actions-btn" style={{ cursor: 'pointer' }}><CardActionBtn /></div>
            </div>
            <div style={{ marginTop: '48px' }}>
              <AreaChart data={activityData} targetLine={14} isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>

        {/* Investor Directory Table */}
        <div className="in-card in-table-card">
          <div className="in-card-header-row">
            <div>
              <h2 className="in-card-title">
                Investor Directory
                <span className="in-info-icon" title="Complete list of all investors in your network"><InfoIcon /></span>
              </h2>
              <p className="in-card-sub">Complete list of all investors in your network</p>
            </div>
          </div>

          {/* Filters */}
          <div className="in-table-filters">
            <StatusDropdown
              value={statusFilter}
              onChange={handleStatusChange}
              isDarkMode={isDarkMode}
              options={['All', 'Active', 'Reviewing', 'Inactive']}
              label="Status"
            />
            <div className="in-search-wrap">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="in-search-icon">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                className="in-search"
                placeholder="Search investors..."
                value={searchQuery}
                onChange={handleSearch}
              />
              {searchQuery && (
                <button className="in-search-clear"
                  onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
                  aria-label="Clear search">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
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
                      {col.label} <SortIcon col={col.key} sortConfig={sortConfig} />
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
                      <button className="in-view-btn" title="View investor details">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            filteredLen={filtered.length}
            showPerPage={showPerPage}
            onPageChange={setCurrentPage}
            onPerPageChange={handlePerPageChange}
          />

          <div className="zk-footer-note">
            Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorNetworkPage;