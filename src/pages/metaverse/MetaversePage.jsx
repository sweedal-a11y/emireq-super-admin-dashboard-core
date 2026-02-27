import React, { useState, useRef, useCallback } from 'react';
import './MetaversePage.css';
import Header from '../../components/header/Header';

// ── Donut Chart ──────────────────────────────────────────────────────────────
const DonutChart = ({ data, hovered, onHover }) => {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 110;
  const innerR = 66;

  const total = data.reduce((s, d) => s + d.value, 0);
  let cumAngle = -90;
  const toRad = (deg) => (deg * Math.PI) / 180;

  const arcPath = (startDeg, endDeg, oR, iR) => {
    const s = toRad(startDeg);
    const e = toRad(endDeg);
    const x1 = cx + oR * Math.cos(s), y1 = cy + oR * Math.sin(s);
    const x2 = cx + oR * Math.cos(e), y2 = cy + oR * Math.sin(e);
    const x3 = cx + iR * Math.cos(e), y3 = cy + iR * Math.sin(e);
    const x4 = cx + iR * Math.cos(s), y4 = cy + iR * Math.sin(s);
    const large = (endDeg - startDeg) > 180 ? 1 : 0;
    return `M${x1},${y1} A${oR},${oR},0,${large},1,${x2},${y2} L${x3},${y3} A${iR},${iR},0,${large},0,${x4},${y4} Z`;
  };

  const segments = data.map((item) => {
    const angle = (item.value / total) * 360;
    const seg = { ...item, startAngle: cumAngle, endAngle: cumAngle + angle - 1.2 };
    cumAngle += angle;
    return seg;
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={outerR + 2} fill="none" stroke="#E5E7EB" strokeWidth="1.5" />
      {segments.map((seg) => {
        const isHov = hovered === seg.label;
        const isDim = hovered && !isHov;
        return (
          <path
            key={seg.label}
            d={arcPath(seg.startAngle, seg.endAngle, isHov ? outerR + 5 : outerR, innerR)}
            fill={seg.color}
            opacity={isDim ? 0.3 : 1}
            style={{ transition: 'all 0.22s ease', cursor: 'pointer' }}
            onMouseEnter={() => onHover(seg.label)}
            onMouseLeave={() => onHover(null)}
          />
        );
      })}
    </svg>
  );
};

// ── Gradient Line Chart ──────────────────────────────────────────────────────
const CHART_DATA = [
  { month: 'Jan', value: 550 },
  { month: 'Feb', value: 820 },
  { month: 'Mar', value: 580 },
  { month: 'Apr', value: 650 },
  { month: 'May', value: 680 },
  { month: 'Jun', value: 900 },
  { month: 'Jul', value: 880 },
];

const GradientLineChart = () => {
  const [tooltip, setTooltip] = useState(null);
  const svgRef = useRef(null);

  const W = 500, H = 240;
  const PL = 48, PR = 16, PT = 20, PB = 38;
  const CW = W - PL - PR, CH = H - PT - PB;
  const Y_MAX = 1200;
  const Y_TICKS = [0, 300, 600, 900, 1200];

  const px = (i) => PL + (i / (CHART_DATA.length - 1)) * CW;
  const py = (v) => PT + CH - (v / Y_MAX) * CH;

  const linePath = CHART_DATA.map((d, i) => `${i === 0 ? 'M' : 'L'}${px(i).toFixed(1)},${py(d.value).toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L${px(CHART_DATA.length - 1).toFixed(1)},${py(0).toFixed(1)} L${px(0).toFixed(1)},${py(0).toFixed(1)} Z`;

  const handleMouseMove = useCallback((e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) * (W / rect.width);
    let closest = 0, minDist = Infinity;
    CHART_DATA.forEach((_, i) => {
      const d = Math.abs(px(i) - mouseX);
      if (d < minDist) { minDist = d; closest = i; }
    });
    setTooltip({ index: closest, x: px(closest), y: py(CHART_DATA[closest].value) });
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: '100%', height: 'auto', overflow: 'visible', cursor: 'crosshair' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTooltip(null)}
    >
      <defs>
        <linearGradient id="mv-area-h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#FC5452" stopOpacity="0.5"/>
          <stop offset="50%"  stopColor="#DC6FB3" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#5654D4" stopOpacity="0.28"/>
        </linearGradient>
        <linearGradient id="mv-area-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="white" stopOpacity="0"/>
          <stop offset="100%" stopColor="white" stopOpacity="0.85"/>
        </linearGradient>
        <linearGradient id="mv-stroke" x1={PL} y1="0" x2={W - PR} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor="#FC5452"/>
          <stop offset="50%" stopColor="#DC6FB3"/>
          <stop offset="100%" stopColor="#5654D4"/>
        </linearGradient>
        <clipPath id="mv-clip">
          <rect x={PL} y={PT} width={CW} height={CH}/>
        </clipPath>
      </defs>

      {/* Y grid lines */}
      {Y_TICKS.map((v) => (
        <g key={v}>
          <line
            x1={PL} x2={W - PR} y1={py(v)} y2={py(v)}
            stroke="#C1C1C1"
            strokeWidth={v === 0 ? 1.5 : 1}
            strokeDasharray={v === 0 ? undefined : '4 4'}
            strokeOpacity={v === 0 ? 0.6 : 0.8}
          />
          <text x={PL - 8} y={py(v) + 4} textAnchor="end" fontSize="11" fill="#9CA3AF" fontFamily="system-ui">{v}</text>
        </g>
      ))}

      {/* Area fill */}
      <path d={areaPath} fill="url(#mv-area-h)" clipPath="url(#mv-clip)" opacity="0.9"/>
      <path d={areaPath} fill="url(#mv-area-v)" clipPath="url(#mv-clip)"/>

      {/* Stroke line */}
      <path d={linePath} fill="none" stroke="url(#mv-stroke)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Crosshair vertical */}
      {tooltip && (
        <line
          x1={tooltip.x} x2={tooltip.x}
          y1={PT} y2={PT + CH}
          stroke="#666" strokeWidth="1" strokeDasharray="4 3"
        />
      )}

      {/* Dots */}
      {CHART_DATA.map((d, i) => {
        const active = tooltip?.index === i;
        return (
          <circle key={i} cx={px(i)} cy={py(d.value)}
            r={active ? 5 : 3}
            fill={active ? '#fff' : 'transparent'}
            stroke={active ? 'url(#mv-stroke)' : 'transparent'}
            strokeWidth="2"
            style={{ transition: 'r 0.1s', pointerEvents: 'none' }}
          />
        );
      })}

      {/* X labels */}
      {CHART_DATA.map((d, i) => (
        <text key={i} x={px(i)} y={H - 6} textAnchor="middle" fontSize="11" fill="#9CA3AF" fontFamily="system-ui">{d.month}</text>
      ))}

      {/* Tooltip box */}
      {tooltip && (() => {
        const d = CHART_DATA[tooltip.index];
        const TW = 155, TH = 52, TR = 8;
        const bx = Math.min(Math.max(tooltip.x - TW / 2, PL), W - PR - TW);
        const by = Math.max(tooltip.y - TH - 14, PT);
        return (
          <g style={{ pointerEvents: 'none' }}>
            <rect x={bx + 2} y={by + 2} width={TW} height={TH} rx={TR} fill="#000" opacity="0.12"/>
            <rect x={bx} y={by} width={TW} height={TH} rx={TR} fill="#1a1a2e"/>
            <text x={bx + 14} y={by + 21} fontSize="12" fontWeight="700" fill="#fff" fontFamily="system-ui">
              {d.month.toUpperCase()}
            </text>
            <text x={bx + 14} y={by + 39} fontSize="11" fill="#DC6FB3" fontFamily="system-ui">
              Attendees – {d.value}
            </text>
          </g>
        );
      })()}
    </svg>
  );
};

// ── Action Buttons (expand, edit, more) ──────────────────────────────────────
const ActionButtons = ({ id }) => (
  <div className="mv-action-btns">
    <button className="mv-action-btn" aria-label="Expand">
     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 19H5V14M14 5H19V10" stroke="#888888" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    </button>
    <button className="mv-action-btn" aria-label="Edit">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.7697 5.17121C15.4037 4.54008 16.429 4.54127 17.0616 5.17387L18.8289 6.94116C19.4614 7.57365 19.4627 8.59873 18.8318 9.23284L8.67324 19.4433L4.55927 19.4433L4.55927 15.3342L14.7697 5.17121Z" stroke="#888888" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.4805 6.46295L17.5368 10.5193" stroke="#888888" stroke-width="1.5" stroke-linecap="round"/>
</svg>

    </button>
    <button className="mv-action-btn" aria-label="More">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 10.1504C6.50986 10.1504 6.94252 10.3302 7.30664 10.6943C7.67076 11.0585 7.85023 11.4909 7.84961 12L7.8418 12.1875C7.8024 12.617 7.6243 12.988 7.30566 13.3066C6.94155 13.6708 6.50908 13.8502 6 13.8496C5.49014 13.8496 5.05748 13.6698 4.69336 13.3057C4.32924 12.9415 4.14977 12.5091 4.15039 12C4.15039 11.4901 4.33022 11.0575 4.69434 10.6934C5.01294 10.3748 5.38368 10.1971 5.8125 10.1582L6 10.1504ZM12 10.1504C12.5099 10.1504 12.9425 10.3302 13.3066 10.6943C13.6708 11.0585 13.8502 11.4909 13.8496 12L13.8418 12.1875C13.8024 12.617 13.6243 12.988 13.3057 13.3066C12.9415 13.6708 12.5091 13.8502 12 13.8496C11.4901 13.8496 11.0575 13.6698 10.6934 13.3057C10.3292 12.9415 10.1498 12.5091 10.1504 12C10.1504 11.4901 10.3302 11.0575 10.6943 10.6934C11.0129 10.3748 11.3837 10.1971 11.8125 10.1582L12 10.1504ZM18 10.1504C18.5099 10.1504 18.9425 10.3302 19.3066 10.6943C19.6708 11.0585 19.8502 11.4909 19.8496 12L19.8418 12.1875C19.8024 12.617 19.6243 12.988 19.3057 13.3066C18.9415 13.6708 18.5091 13.8502 18 13.8496C17.4901 13.8496 17.0575 13.6698 16.6934 13.3057C16.3292 12.9415 16.1498 12.5091 16.1504 12C16.1504 11.4901 16.3302 11.0575 16.6943 10.6934C17.0129 10.3748 17.3837 10.1971 17.8125 10.1582L18 10.1504Z" fill="#888888" stroke="white" stroke-width="0.3"/>
</svg>

    </button>
  </div>
);

// ── Info Icon ────────────────────────────────────────────────────────────────
const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, cursor: 'pointer' }}>
    <circle cx="8" cy="8" r="8" fill="#C4C4C4"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M9.2 5.19C9.33 4.97 9.4 4.72 9.4 4.45C9.4 3.63 8.73 2.97 7.91 2.97C7.09 2.97 6.43 3.63 6.43 4.45C6.43 5.27 7.09 5.94 7.91 5.94C8.47 5.94 8.95 5.63 9.2 5.19ZM6.92 6.92H7.42H8.41C8.95 6.92 9.4 7.37 9.4 7.91V8.9V12.86C9.4 13.41 8.95 13.85 8.41 13.85C7.86 13.85 7.42 13.41 7.42 12.86V9.64C7.42 9.24 7.09 8.9 6.68 8.9C6.27 8.9 5.94 8.57 5.94 8.16V7.91C5.94 7.57 6.11 7.26 6.39 7.08C6.54 6.98 6.73 6.92 6.92 6.92Z" fill="white"/>
  </svg>
);

// ── Platform Avatar Colors ───────────────────────────────────────────────────
const platformColors = {
  'Decentraland':  '#7c3aed',
  'The Sandbox':   '#db2777',
  'Somnium Space': '#2563eb',
  'Spatial':       '#ea580c',
  'Others':        '#6b7280',
};

// ── Main Component ───────────────────────────────────────────────────────────
const MetaversePage = ({ isDarkMode, toggleTheme, sidebarCollapsed }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [hoveredLegend, setHoveredLegend] = useState(null);

  const resultsPerPage = 4;
  const totalResults = 100;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  // ── Stats ──
  const stats = [
    {
      id: 1,
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M2.97 12.92C2.67 13.1 2.43 13.35 2.26 13.65C2.09 13.95 2 14.29 2 14.63V17.87C2 18.21 2.09 18.55 2.26 18.85C2.43 19.15 2.67 19.4 2.97 19.58L5.97 21.38C6.28 21.57 6.64 21.67 7 21.67C7.36 21.67 7.72 21.57 8.03 21.38L12 19V13.5L7 10.5L2.97 12.92Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 16.5L2.26 13.65" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 16.5L12 13.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 16.5V21.67" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 13.5V19L15.97 21.38C16.28 21.57 16.64 21.67 17 21.67C17.36 21.67 17.72 21.57 18.03 21.38L21.03 19.58C21.33 19.4 21.57 19.15 21.74 18.85C21.91 18.55 22 18.21 22 17.87V14.63C22 14.29 21.91 13.95 21.74 13.65C21.57 13.35 21.33 13.1 21.03 12.92L17 10.5L12 13.5Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 16.5L12 13.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 16.5L21.74 13.65" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 16.5V21.67" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.97 4.42C7.67 4.6 7.43 4.85 7.26 5.15C7.09 5.45 7 5.79 7 6.13V10.5L12 13.5L17 10.5V6.13C17 5.79 16.91 5.45 16.74 5.15C16.57 4.85 16.33 4.6 16.03 4.42L13.03 2.62C12.72 2.43 12.36 2.33 12 2.33C11.64 2.33 11.28 2.43 10.97 2.62L7.97 4.42Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8L7.26 5.15" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8L16.74 5.15" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 13.5V8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      iconBg: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      cardBg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      label: 'Active Platforms', value: '5', subtext: 'Decentraland, Sandbox, more',
      change: 'Active', changeColor: '#15803d', changeBg: '#dcfce7', changeBorder: '#86efac',
    },
    {
      id: 2,
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="3" stroke="white" strokeWidth="1.8" fill="none"/>
          <path d="M8 2v4M16 2v4M3 9h18" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
      iconBg: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',
      cardBg: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
      label: 'Virtual Events', value: '18', subtext: '5 upcoming this month',
      change: '+3 this month', changeColor: '#9d174d', changeBg: '#fce7f3', changeBorder: '#f9a8d4',
    },
    {
      id: 3,
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="8" r="3" stroke="white" strokeWidth="1.8" fill="none"/>
          <circle cx="15" cy="8" r="3" stroke="white" strokeWidth="1.8" fill="none"/>
          <path d="M3 20c0-3.31 2.69-6 6-6h6c3.31 0 6 2.69 6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        </svg>
      ),
      iconBg: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
      cardBg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
      label: 'Total Attendees', value: '2,450', subtext: 'Across last month',
      change: '+18% growth', changeColor: '#1e40af', changeBg: '#dbeafe', changeBorder: '#93c5fd',
    },
    {
      id: 4,
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="white" strokeWidth="1.8" fill="none"/>
          <circle cx="12" cy="9" r="2.5" stroke="white" strokeWidth="1.8" fill="none"/>
        </svg>
      ),
      iconBg: 'linear-gradient(135deg, #c084fc 0%, #7c3aed 100%)',
      cardBg: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)',
      label: 'Virtual Land Parcels', value: '12', subtext: 'Across 4 platforms',
      change: '$420K value', changeColor: '#5b21b6', changeBg: '#ede9fe', changeBorder: '#c4b5fd',
    },
  ];

  // ── Donut data (proportional to Figma: purple=large, pink=medium-large, blue=medium, orange=small, gray=tiny) ──
  const platformData = [
    { label: 'Decentraland',  value: 6, color: '#a855f7' },
    { label: 'The Sandbox',   value: 5, color: '#ec4899' },
    { label: 'Somnium Space', value: 4, color: '#3b82f6' },
    { label: 'Spatial',       value: 2, color: '#f97316' },
    { label: 'Others',        value: 1, color: '#9ca3af' },
  ];

  // ── Table data ──
  const allEvents = [
    { id: 1, name: 'Startup Pitch Day',      platform: 'Decentraland',  date: '2025-08-15', time: '14:00–17:00', attendees: 350, status: 'Confirmed' },
    { id: 2, name: 'Investor Networking',    platform: 'The Sandbox',   date: '2025-08-15', time: '16:00–18:00', attendees: 200, status: 'Scheduled' },
    { id: 3, name: 'Islamic Finance Summit', platform: 'Somnium Space', date: '2025-08-15', time: '10:00–16:00', attendees: 500, status: 'Planning'  },
    { id: 4, name: 'NFT Art Gallery',        platform: 'Spatial',       date: '2025-09-01', time: '11:00–14:00', attendees: 150, status: 'Confirmed' },
    { id: 5, name: 'Web3 Founders Meet',     platform: 'Decentraland',  date: '2025-09-05', time: '09:00–12:00', attendees: 300, status: 'Scheduled' },
    { id: 6, name: 'DeFi Summit',            platform: 'The Sandbox',   date: '2025-09-10', time: '13:00–16:00', attendees: 400, status: 'Planning'  },
  ];

  const filteredEvents = allEvents.filter(e => {
    const matchStatus = statusFilter === 'All' || e.status === statusFilter;
    const q = searchQuery.toLowerCase();
    return matchStatus && (e.name.toLowerCase().includes(q) || e.platform.toLowerCase().includes(q));
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

  return (
    <div className="mv-page" style={{ marginTop: '-40px' }}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />

      {/* ── Page Header ── */}
      <div className="mv-page-header" style={{ marginTop: '15px' }}>
        <h1 className="mv-page-title">Metaverse Initiatives</h1>
        <p className="mv-page-sub">Track metaverse events, platforms, and virtual engagement</p>
      </div>

      {/* ── Stats Grid ── */}
      <div className="mv-stats-grid" style={{ cursor: 'pointer' }}>
        {stats.map(stat => (
          <div key={stat.id} className="mv-stat-card" style={{ background: 'white' }}>
            <div className="mv-stat-top">
              <div className="mv-stat-icon" style={{ background: stat.iconBg }}>{stat.icon}</div>
              <span className="mv-stat-badge" style={{ color: stat.changeColor, background: stat.changeBg, borderColor: stat.changeBorder }}>
                {stat.change}
              </span>
            </div>
            <p className="mv-stat-label">{stat.label}</p>
            <h3 className="mv-stat-value">{stat.value}</h3>
            <p className="mv-stat-sub">{stat.subtext}</p>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="mv-charts-row">

        {/* Donut – Event Distribution */}
        <div className="mv-chart-card">
          <div className="mv-chart-head">
            <div>
              <div className="mv-chart-title-row">
                <h3 className="mv-chart-title">Event Distribution by Platform</h3>
                <InfoIcon />
              </div>
              <p className="mv-chart-sub">Events scheduled across metaverse platforms</p>
            </div>
            <ActionButtons id="donut" />
          </div>

          <div className="mv-donut-wrap">
            <DonutChart data={platformData} hovered={hoveredLegend} onHover={setHoveredLegend} />
          </div>

          <div className="mv-legend">
            {platformData.map(item => (
              <div
                key={item.label}
                className="mv-legend-row"
                onMouseEnter={() => setHoveredLegend(item.label)}
                onMouseLeave={() => setHoveredLegend(null)}
              >
                <span className="mv-legend-dot" style={{ background: item.color }} />
                <span className="mv-legend-name">{item.label}</span>
                <span className="mv-legend-count">{item.value} events</span>
              </div>
            ))}
          </div>
        </div>

        {/* Line Chart – Monthly Attendee Growth */}
        <div className="mv-chart-card">
          <div className="mv-chart-head">
            <div>
              <div className="mv-chart-title-row">
                <h3 className="mv-chart-title">Monthly Attendee Growth</h3>
                <InfoIcon />
              </div>
              <p className="mv-chart-sub">Cumulative attendance trend over time</p>
            </div>
            <ActionButtons id="line" />
          </div>
          <div className="mv-line-wrap" style={{ marginTop: '184px' }}>
            <GradientLineChart />
          </div>
        </div>

      </div>

      {/* ── Table Section ── */}
      <div className="mv-table-section">
        <div className="mv-table-header">
          <div className="mv-table-title-row">
            <h3 className="mv-table-title">Metaverse Events</h3>
            <InfoIcon />
          </div>
          <p className="mv-table-sub">Scheduled virtual events across platforms</p>
        </div>

        {/* Controls */}
        <div className="mv-controls">
          <div className="mv-status-wrap">
            <select className="mv-status-select" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
              <option value="All">Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Planning">Planning</option>
            </select>
            <div className="mv-select-arrow">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M7.5 5.5L10.5 2.5L13.5 5.5" stroke="#374151" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.5 10.5L10.5 13.5L7.5 10.5" stroke="#374151" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="mv-search-wrap">
            <svg className="mv-search-icon" width="15" height="15" viewBox="0 0 16 16" fill="none">
              <circle cx="7.33" cy="7.33" r="5.33" stroke="#9CA3AF" strokeWidth="1.2"/>
              <path d="M14 14L11.1 11.1" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <input
              className="mv-search-input"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="mv-table-wrap">
          <table className="mv-table" style={{ cursor: 'pointer' }}>
            <thead>
              <tr>
                <th>EVENT NAME</th>
                <th>PLATFORM</th>
                <th>DATE</th>
                <th>TIME (UTC)</th>
                <th>EXPECTED ATTENDEES</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length > 0 ? filteredEvents.map((ev, idx) => {
                // Set first row background based on dark mode
                const firstRowStyle = isDarkMode
                  ? { background: '#232336' }
                  : { background: 'white' };
                return (
                  <tr
                    key={ev.id}
                    className={idx === 0 ? 'mv-row-first' : ''}
                    style={idx === 0 ? firstRowStyle : {}}
                  >
                    <td>
                      <span className="mv-event-name">{ev.name}</span>
                    </td>
                    <td className="mv-td-muted">{ev.platform}</td>
                    <td className="mv-td-muted">{ev.date}</td>
                    <td className="mv-td-muted">{ev.time}</td>
                    <td className="mv-td-muted">{ev.attendees}</td>
                    <td>
                      <span className={`mv-badge mv-badge-${ev.status.toLowerCase()}`}>{ev.status}</span>
                    </td>
                  </tr>
                );
              }) : (
                <tr><td colSpan="6" className="mv-no-results">No events found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mv-footer">
          <div className="mv-page-info">
            <span className="mv-page-text">Showing</span>
            <span className="mv-page-box">{String(currentPage * resultsPerPage).padStart(2, '0')}</span>
            <span className="mv-page-text">/ {totalResults} Results</span>
          </div>
          <div className="mv-pagination">
            <button className="mv-page-arrow" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {getPageNumbers().map((page, i) => (
              <button
                key={i}
                className={`mv-page-btn${page === currentPage ? ' active' : ''}${page === '...' ? ' ellipsis' : ''}`}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                disabled={page === '...'}
              >{page}</button>
            ))}
            <button className="mv-page-arrow" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        <div className="mv-disclaimer">
          Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
        </div>
      </div>
    </div>
  );
};

export default MetaversePage;