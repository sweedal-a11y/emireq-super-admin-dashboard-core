import React, { useState } from 'react';
import './MetaversePage.css';
import Header from '../../components/header/Header';

// Platform avatar colors
const platformColorMap = {
  'Decentraland':  '#7c3aed',
  'The Sandbox':   '#db2777',
  'Somnium Space': '#2563eb',
  'Spatial':       '#ea580c',
  'Others':        '#6b7280',
};

const MetaversePage = ({ isDarkMode, toggleTheme, sidebarCollapsed }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [hoveredLegend, setHoveredLegend] = useState(null);
  const [hoveredBarLegend, setHoveredBarLegend] = useState(null);
  const [lineTooltip, setLineTooltip] = useState(null);

  const resultsPerPage = 4;
  const totalResults = 100;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  // ── Stats ──
  const stats = [
    {
      id: 1,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.97 12.92C2.67476 13.0974 2.43033 13.348 2.26039 13.6476C2.09045 13.9472 2.00075 14.2856 2 14.63V17.87C2.00075 18.2144 2.09045 18.5528 2.26039 18.8524C2.43033 19.152 2.67476 19.4026 2.97 19.58L5.97 21.38C6.28106 21.5669 6.63711 21.6656 7 21.6656C7.36289 21.6656 7.71894 21.5669 8.03 21.38L12 19V13.5L7 10.5L2.97 12.92Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.00001 16.5L2.26001 13.65" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 16.5L12 13.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 16.5V21.67" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 13.5V19L15.97 21.38C16.2811 21.5669 16.6371 21.6656 17 21.6656C17.3629 21.6656 17.7189 21.5669 18.03 21.38L21.03 19.58C21.3252 19.4026 21.5697 19.152 21.7396 18.8524C21.9096 18.5528 21.9992 18.2144 22 17.87V14.63C21.9992 14.2856 21.9096 13.9472 21.7396 13.6476C21.5697 13.348 21.3252 13.0974 21.03 12.92L17 10.5L12 13.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 16.5L12 13.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 16.5L21.74 13.65" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 16.5V21.67" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.97 4.41997C7.67476 4.59735 7.43033 4.84797 7.26039 5.14756C7.09045 5.44714 7.00075 5.78554 7 6.12997V10.5L12 13.5L17 10.5V6.12997C16.9992 5.78554 16.9096 5.44714 16.7396 5.14756C16.5697 4.84797 16.3252 4.59735 16.03 4.41997L13.03 2.61997C12.7189 2.43308 12.3629 2.33435 12 2.33435C11.6371 2.33435 11.2811 2.43308 10.97 2.61997L7.97 4.41997Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8.00002L7.26001 5.15002" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8.00002L16.74 5.15002" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 13.5V8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      iconBg: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      label: 'Active Platforms', value: '5', subtext: 'Decentraland, Sandbox, more',
      change: 'Active', changeColor: '#16a34a', changeBg: '#dcfce7', changeBorder: '#bbf7d0',
    },
    {
      id: 2,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="3" stroke="#fff" strokeWidth="2" fill="none"/>
          <path d="M8 2v4M16 2v4M3 9h18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      iconBg: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
      label: 'Virtual Events', value: '18', subtext: '5 upcoming this month',
      change: '+3 this month', changeColor: '#be185d', changeBg: '#fce7f3', changeBorder: '#fbcfe8',
    },
    {
      id: 3,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="8" r="3" stroke="#fff" strokeWidth="2" fill="none"/>
          <circle cx="15" cy="8" r="3" stroke="#fff" strokeWidth="2" fill="none"/>
          <path d="M3 20c0-3.31 2.69-6 6-6h6c3.31 0 6 2.69 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </svg>
      ),
      iconBg: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      label: 'Total Attendees', value: '2,450', subtext: 'Across last month',
      change: '+18% growth', changeColor: '#1d4ed8', changeBg: '#dbeafe', changeBorder: '#bfdbfe',
    },
    {
      id: 4,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#fff" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="9" r="2.5" stroke="#fff" strokeWidth="2" fill="none"/>
        </svg>
      ),
      iconBg: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
      label: 'Virtual Land Parcels', value: '12', subtext: 'Across 4 platforms',
      change: '$420K value', changeColor: '#6d28d9', changeBg: '#ede9fe', changeBorder: '#ddd6fe',
    },
  ];

  // ── Donut data ──
  const platformData = [
    { label: 'Decentraland',  count: 6, color: '#a855f7' },
    { label: 'The Sandbox',   count: 5, color: '#ec4899' },
    { label: 'Somnium Space', count: 4, color: '#3b82f6' },
    { label: 'Spatial',       count: 2, color: '#f97316' },
    { label: 'Others',        count: 1, color: '#9ca3af' },
  ];

  // ── Line chart ──
  const lineMonths  = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const lineSeries1 = [550, 620, 580, 700, 680, 850, 900];
  const lineSeries2 = [600, 650, 610, 630, 670, 640, 660];
  const svgW = 500, svgH = 220, padL = 44, padR = 16, padT = 16, padB = 32;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;
  const maxVal = 1200;
  const yLines = [0, 300, 600, 900, 1200];
  const px = (i) => padL + (i / (lineMonths.length - 1)) * chartW;
  const py = (v) => padT + chartH - (v / maxVal) * chartH;
  const pathD = (arr) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(' ');
  const areaD = (arr) =>
    `${pathD(arr)} L${px(arr.length - 1).toFixed(1)},${(padT + chartH).toFixed(1)} L${padL},${(padT + chartH).toFixed(1)} Z`;

  // ── Table data ──
  const allEvents = [
    { id: 1, name: 'Startup Pitch Day',      platform: 'Decentraland',  date: '2025-08-15', time: '14:00–17:00', attendees: 350, status: 'Confirmed' },
    { id: 2, name: 'Investor Networking',    platform: 'The Sandbox',   date: '2025-08-15', time: '16:00–18:00', attendees: 200, status: 'Scheduled' },
    { id: 3, name: 'Islamic Finance Summit', platform: 'Somnium Space', date: '2025-08-15', time: '10:00–16:00', attendees: 500, status: 'Planning'  },
    { id: 4, name: 'NFT Art Gallery',        platform: 'Spatial',       date: '2025-09-01', time: '11:00–14:00', attendees: 150, status: 'Confirmed' },
    { id: 5, name: 'Web3 Founders Meet',     platform: 'Decentraland',  date: '2025-09-05', time: '09:00–12:00', attendees: 300, status: 'Scheduled' },
    { id: 6, name: 'DeFi Summit',            platform: 'The Sandbox',   date: '2025-09-10', time: '13:00–16:00', attendees: 400, status: 'Planning'  },
  ];

  const filteredEvents = allEvents.filter(event => {
    const matchesStatus = statusFilter === 'All' || event.status === statusFilter;
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.platform.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // ── Pagination numbers ──
  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (currentPage > 2) pages.push(currentPage - 1);
    if (currentPage !== 1 && currentPage !== totalPages) pages.push(currentPage);
    if (currentPage < totalPages - 1) pages.push(currentPage + 1);
    if (totalPages > 1) {
      if (currentPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    return [...new Set(pages)];
  };

  // ── Reusable action buttons SVG ──
  const ActionButtons = ({ filterId, style }) => (
    <svg
      width="102"
      height="40"
      viewBox="0 0 102 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: 'pointer', flexShrink: 0, ...style }}
      onClick={() => {}}
    >
      <g filter={`url(#${filterId})`}>
        <rect x="2" y="1" width="98" height="36" rx="12" fill="white" shapeRendering="crispEdges"/>
        <rect x="2.5" y="1.5" width="97" height="35" rx="11.5" stroke="#E0E0E0" shapeRendering="crispEdges"/>
        <path d="M20 26H15V21M24 12H29V17" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M54.7697 12.1712C55.4037 11.5401 56.429 11.5413 57.0616 12.1739L58.8289 13.9412C59.4614 14.5737 59.4627 15.5987 58.8318 16.2328L48.6732 26.4433L44.5593 26.4433L44.5593 22.3342L54.7697 12.1712Z" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M53.4805 13.463L57.5368 17.5193" stroke="#888888" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M76 17.1504C76.5099 17.1504 76.9425 17.3302 77.3066 17.6943C77.6708 18.0585 77.8502 18.4909 77.8496 19L77.8418 19.1875C77.8024 19.617 77.6243 19.988 77.3057 20.3066C76.9415 20.6708 76.5091 20.8502 76 20.8496C75.4901 20.8496 75.0575 20.6698 74.6934 20.3057C74.3292 19.9415 74.1498 19.5091 74.1504 19C74.1504 18.4901 74.3302 18.0575 74.6943 17.6934C75.0129 17.3748 75.3837 17.1971 75.8125 17.1582L76 17.1504ZM82 17.1504C82.5099 17.1504 82.9425 17.3302 83.3066 17.6943C83.6708 18.0585 83.8502 18.4909 83.8496 19L83.8418 19.1875C83.8024 19.617 83.6243 19.988 83.3057 20.3066C82.9415 20.6708 82.5091 20.8502 82 20.8496C81.4901 20.8496 81.0575 20.6698 80.6934 20.3057C80.3292 19.9415 80.1498 19.5091 80.1504 19C80.1504 18.4901 80.3302 18.0575 80.6943 17.6934C81.0129 17.3748 81.3837 17.1971 81.8125 17.1582L82 17.1504ZM88 17.1504C88.5099 17.1504 88.9425 17.3302 89.3066 17.6943C89.6708 18.0585 89.8502 18.4909 89.8496 19L89.8418 19.1875C89.8024 19.617 89.6243 19.988 89.3057 20.3066C88.9415 20.6708 88.5091 20.8502 88 20.8496C87.4901 20.8496 87.0575 20.6698 86.6934 20.3057C86.3292 19.9415 86.1498 19.5091 86.1504 19C86.1504 18.4901 86.3302 18.0575 86.6943 17.6934C87.0129 17.3748 87.3837 17.1971 87.8125 17.1582L88 17.1504Z" fill="#888888" stroke="white" strokeWidth="0.3"/>
      </g>
      <defs>
        <filter id={filterId} x="0" y="0" width="102" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
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

  // ── Info icon ──
 const InfoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: 'pointer' }}
  >
    <circle cx="8" cy="8" r="8" fill="#AFAFAF"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M9.30469 5.24219C9.42969 5.02344 9.5 4.76953 9.5 4.5C9.5 3.67188 8.82812 3 8 3C7.17188 3 6.5 3.67188 6.5 4.5C6.5 5.32812 7.17188 6 8 6C8.55859 6 9.04688 5.69531 9.30469 5.24219ZM7 7H7.5H8.5C9.05273 7 9.5 7.44727 9.5 8V9V13C9.5 13.5527 9.05273 14 8.5 14C7.94727 14 7.5 13.5527 7.5 13V9.75C7.5 9.33594 7.16406 9 6.75 9C6.33594 9 6 8.66406 6 8.25V8C6 7.64844 6.18164 7.33789 6.45508 7.16016C6.61133 7.05859 6.79883 7 7 7Z" fill="white"/>
  </svg>
);

  return (
    <div className="metaverse-page">
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        sidebarCollapsed={sidebarCollapsed}
      />

      {/* ── Page Header ── */}
      <div className="metaverse-header">
        <div>
          <h1>Metaverse Initiatives</h1>
          <p className="subtitle">Track metaverse events, platforms, and virtual engagement</p>
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div className="stats-grid">
        {stats.map(stat => (
          <div key={stat.id} className="stat-card">
            <div className="stat-card-header">
              <div className="stat-icon" style={{ background: stat.iconBg }}>
                {stat.icon}
              </div>
              <div
                className="stat-badge"
                style={{ color: stat.changeColor, background: stat.changeBg, borderColor: stat.changeBorder }}
              >
                {stat.change}
              </div>
            </div>
            <div className="stat-content">
              <p className="stat-label">{stat.label}</p>
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-subtext">{stat.subtext}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="charts-row">

        {/* ── Donut – Event Distribution ── */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h3>Event Distribution by Platform</h3>
                <InfoIcon />
              </div>
              <p className="chart-subtitle">Events scheduled across metaverse platforms</p>
            </div>
            <ActionButtons filterId="filter_donut" style={{ transform: 'translateY(-26px)' }} />
          </div>

          <div className="donut-chart-container">
            <svg className="donut-chart" viewBox="0 0 488 346" fill="none">
              <path d="M201.081 38.8856C200.448 36.9408 201.511 34.8466 203.471 34.2643C226.304 27.4819 250.482 26.4638 273.838 31.3284C297.194 36.193 318.955 46.7797 337.181 62.1138C338.746 63.4304 338.884 65.7748 337.528 67.3053L309.422 99.0186C308.066 100.549 305.73 100.684 304.148 99.3888C292.427 89.7965 278.55 83.159 263.687 80.0633C248.824 76.9676 233.452 77.513 218.876 81.6281C216.908 82.1837 214.82 81.1275 214.188 79.1827L201.081 38.8856Z"
                fill="#a855f7"
                className={`donut-segment ${hoveredLegend === 'Decentraland' ? 'highlighted' : hoveredLegend ? 'dimmed' : ''}`}
              />
              <path d="M151.689 277.536C150.337 279.07 147.993 279.221 146.495 277.829C129.118 261.696 115.98 241.506 108.272 219.042C100.162 195.41 98.3409 170.075 102.987 145.526C107.633 120.976 118.586 98.0587 134.771 79.0243C150.155 60.9311 169.762 46.9386 191.832 38.2704C193.736 37.5228 195.862 38.5193 196.561 40.4413L211.033 80.2702C211.732 82.1923 210.736 84.3098 208.843 85.0832C194.888 90.7844 182.486 99.7594 172.697 111.272C162.108 123.726 154.941 138.721 151.901 154.783C148.861 170.845 150.053 187.422 155.359 202.884C160.264 217.177 168.528 230.063 179.436 240.47C180.915 241.882 181.068 244.217 179.715 245.751L151.689 277.536Z"
                fill="#ec4899"
                className={`donut-segment ${hoveredLegend === 'The Sandbox' ? 'highlighted' : hoveredLegend ? 'dimmed' : ''}`}
              />
              <path d="M340.929 70.4209C342.335 68.9359 344.683 68.8685 346.131 70.3121C371.606 95.7018 386.69 129.749 388.327 165.767C390.019 203.021 377.194 239.478 352.549 267.466C327.905 295.454 293.364 312.79 256.196 315.825C220.26 318.76 184.577 308.105 156.168 286.048C154.553 284.794 154.323 282.456 155.618 280.874L182.456 248.081C183.751 246.499 186.081 246.273 187.713 247.505C206.132 261.408 229.058 268.095 252.144 266.21C276.463 264.224 299.063 252.881 315.188 234.568C331.313 216.256 339.705 192.402 338.597 168.027C337.546 144.887 328.012 122.992 311.889 106.48C310.461 105.017 310.39 102.678 311.796 101.193L340.929 70.4209Z"
                fill="#3b82f6"
                className={`donut-segment ${hoveredLegend === 'Somnium Space' ? 'highlighted' : hoveredLegend ? 'dimmed' : ''}`}
              />
              <circle cx="244.475" cy="172.303" r="149.4" stroke="#DFDFF2" strokeWidth="1.2" fill="none" className="donut-border"/>
            </svg>
          </div>

          <div className="chart-legend">
            {platformData.map((item, index) => (
              <div
                key={index}
                className="legend-item"
                onMouseEnter={() => setHoveredLegend(item.label)}
                onMouseLeave={() => setHoveredLegend(null)}
              >
                <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
                <span className="legend-label">{item.label}</span>
                <span className="legend-count">{item.count} events</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Line Chart – Monthly Attendee Growth ── */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h3>Monthly Attendee Growth</h3>
                <InfoIcon />
              </div>
              <p className="chart-subtitle">Cumulative attendance trend over time</p>
            </div>
            <ActionButtons filterId="filter_line" style={{ transform: 'translateY(-26px)' }} />
          </div>

          <div className="bar-chart-wrapper">
            <svg
              className="bar-chart-svg"
              viewBox={`0 0 ${svgW} ${svgH}`}
              onMouseLeave={() => setLineTooltip(null)}
            >
              <defs>
                <linearGradient id="mvGrad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02"/>
                </linearGradient>
                <linearGradient id="mvGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.02"/>
                </linearGradient>
              </defs>
              {yLines.map((v) => (
                <g key={v}>
                  <line x1={padL} y1={py(v)} x2={padL + chartW} y2={py(v)} stroke="#F0F0F0" strokeWidth="1" strokeDasharray="4 3" className="grid-line"/>
                  <text x={padL - 6} y={py(v) + 4} textAnchor="end" fontSize="10" fill="#888888" className="axis-label">{v}</text>
                </g>
              ))}
              <path d={areaD(lineSeries1)} fill="url(#mvGrad1)"/>
              <path d={areaD(lineSeries2)} fill="url(#mvGrad2)"/>
              <path d={pathD(lineSeries1)} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d={pathD(lineSeries2)} fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 3"/>
              {lineSeries1.map((v, i) => (
                <circle
                  key={i} cx={px(i)} cy={py(v)} r="5"
                  fill="#fff" stroke="#3b82f6" strokeWidth="2"
                  style={{ cursor: 'crosshair' }}
                  onMouseEnter={() => setLineTooltip({ x: px(i), y: py(v), month: lineMonths[i], val: v })}
                />
              ))}
              {lineMonths.map((m, i) => (
                <text key={i} x={px(i)} y={svgH - 4} textAnchor="middle" fontSize="10" fill="#888888" className="axis-label">{m}</text>
              ))}
              {lineTooltip && (
                <g>
                  <line x1={lineTooltip.x} y1={padT} x2={lineTooltip.x} y2={padT + chartH} stroke="#374151" strokeWidth="1" strokeDasharray="4 3"/>
                  <rect x={lineTooltip.x - 52} y={lineTooltip.y - 46} width="100" height="38" rx="6" fill="#1f2937"/>
                  <text x={lineTooltip.x - 2} y={lineTooltip.y - 29} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">{lineTooltip.month.toUpperCase()}</text>
                  <text x={lineTooltip.x - 2} y={lineTooltip.y - 14} textAnchor="middle" fontSize="10" fill="#d1d5db">Attendees – {lineTooltip.val}</text>
                </g>
              )}
            </svg>
          </div>

          
        </div>

      </div>
      {/* ── End Charts Row ── */}

      {/* ── Table Section ── */}
      <div className="table-section">
        <div className="table-header">
          <div className="table-title">
            <h3>Metaverse Events</h3>
            <InfoIcon />
          </div>
          <p className="table-subtitle">Scheduled virtual events across platforms</p>
        </div>

        {/* Filters */}
        <div className="tokenization-table-controls-figma">
          <div className="tokenization-status-dropdown-figma">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="tokenization-status-select-figma"
            >
              <option value="All">Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Planning">Planning</option>
            </select>
            <div className="tokenization-status-arrows-figma">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7.5 5.5L10.5 2.5L13.5 5.5" stroke="#121212" strokeWidth="1.13" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.5 10.5L10.5 13.5L7.5 10.5" stroke="#121212" strokeWidth="1.13" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="tokenization-search-container-figma">
            <div className="tokenization-search-icon-figma">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7.33333" cy="7.33333" r="5.33333" stroke="#121212" strokeWidth="1.13" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 14L11.1 11.1" stroke="#121212" strokeWidth="1.13" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="tokenization-search-input-figma"
            />
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="tokenization-table">
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
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <tr key={event.id} className={index === 0 ? 'first-row' : ''}>
                    <td>
                      <div className="company-cell-figma">
                        <div className="company-avatar-figma" style={{ backgroundColor: platformColorMap[event.platform] || '#395698' }}>
                          <span className="avatar-initial-figma">{event.name.charAt(0)}</span>
                        </div>
                        <span className="company-name-figma">{event.name}</span>
                      </div>
                    </td>
                    <td className="total-supply-figma">{event.platform}</td>
                    <td className="total-supply-figma">{event.date}</td>
                    <td className="total-supply-figma">{event.time}</td>
                    <td className="price-figma">{event.attendees}</td>
                    <td>
                      <span className={`status-badge-figma status-${event.status.toLowerCase()}-figma`}>
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-results">No events found matching your criteria</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="table-footer-figma">
          <div className="pagination-info-figma">
            <span className="pagination-showing-text">Showing</span>
            <span className="pagination-current-box">{String(currentPage * resultsPerPage).padStart(2, '0')}</span>
            <span className="pagination-showing-text">/ {totalResults} Results</span>
          </div>
          <div className="pagination-controls-figma">
            <button
              className="pagination-arrow-btn-figma pagination-prev"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <svg width="32" height="34" viewBox="0 0 32 34" fill="none">
                <path d="M17 21L13 17L17 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                className={`pagination-page-btn-figma ${page === currentPage ? 'active' : ''} ${page === '...' ? 'ellipsis' : ''}`}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                disabled={page === '...'}
              >
                {page}
              </button>
            ))}
            <button
              className="pagination-arrow-btn-figma pagination-next"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <svg width="32" height="34" viewBox="0 0 32 34" fill="none">
                <path d="M14 21L18 17L14 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="table-disclaimer">
          Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
        </div>
      </div>
    </div>
  );
};

export default MetaversePage;
