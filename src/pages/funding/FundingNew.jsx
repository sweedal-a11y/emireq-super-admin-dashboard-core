import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import "./FundingNew.css";

export default function Funding({ isDarkMode, toggleTheme, sidebarCollapsed }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Per-chart independent menu: null | 'trends' | 'deals'
  const [showMenu, setShowMenu] = useState(null);
  // Per-chart expand: null | 'trends' | 'deals'
  const [expandedChart, setExpandedChart] = useState(null);

  // Tooltip hover state
  const [hoveredDealsPoint, setHoveredDealsPoint] = useState(null);
  const [hoveredTrendsPoint, setHoveredTrendsPoint] = useState(null);

  // Trigger SVG line-draw animation after mount
  const [chartsVisible, setChartsVisible] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setChartsVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Close any open dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fundingData = [
    { id: 1, company: "CureCloud",          initial: "C", investor: "Ahmed Al-Rashid",   amount: "250", stage: "Series A", status: "Completes",   date: "2025-08-15" },
    { id: 2, company: "SukunPay",            initial: "S", investor: "John Doe",          amount: "250", stage: "Seed",     status: "In progress", date: "2025-08-10" },
    { id: 3, company: "AqsaAI",              initial: "A", investor: "Fatima Hassan",     amount: "250", stage: "Series B", status: "Pending",     date: "2025-08-05" },
    { id: 4, company: "HalalFoods INC",      initial: "H", investor: "Sarah",             amount: "250", stage: "Pre-seed", status: "Completes",   date: "2025-07-28" },
    { id: 5, company: "GreenTech Solutions", initial: "G", investor: "Sarah Al-Mansoori", amount: "250", stage: "Seed",     status: "Pending",     date: "2025-07-20" },
  ];

  const filteredData = fundingData.filter(item => {
    const matchesSearch =
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.investor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === "All" || item.stage === stageFilter;
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStage && matchesStatus;
  });

  const getCompanyColor = (id) => {
    const colors = ['#3B5998', '#6B46C1', '#3B5998', '#6B46C1', '#10B981'];
    return colors[(id - 1) % colors.length];
  };

  // ── Chart data points ──────────────────────────────────────────
  const trendsPoints = [
    { month: "Jan", x: 63.9,  y: 149.8, value: 32  },
    { month: "Feb", x: 130.0, y: 139.1, value: 48  },
    { month: "Mar", x: 196.1, y: 117.6, value: 73  },
    { month: "Apr", x: 262.1, y: 101.5, value: 95  },
    { month: "May", x: 328.2, y: 85.4,  value: 118 },
    { month: "Jun", x: 394.2, y: 63.9,  value: 147 },
    { month: "Jul", x: 460.3, y: 42.5,  value: 183 },
    { month: "Aug", x: 526.3, y: 15.7,  value: 220 },
  ];

  const dealsPoints = [
    { month: "Jan", x: 63.9,  y: 152.5, value: 3 },
    { month: "Feb", x: 130.0, y: 123.0, value: 4 },
    { month: "Mar", x: 196.1, y: 93.5,  value: 5 },
    { month: "Apr", x: 262.1, y: 123.0, value: 4 },
    { month: "May", x: 328.2, y: 63.9,  value: 6 },
    { month: "Jun", x: 394.2, y: 93.5,  value: 5 },
    { month: "Jul", x: 460.3, y: 34.4,  value: 7 },
    { month: "Aug", x: 526.3, y: 4.9,   value: 8 },
  ];

  const buildLinePath = (pts) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  const buildAreaPath = (pts) =>
    `${buildLinePath(pts)} L${pts[pts.length - 1].x},241 L${pts[0].x},241 Z`;

  // Export data as CSV
  const exportCSV = useCallback(() => {
    const headers = ["Company","Investor","Amount ($K)","Stage","Status","Date"];
    const rows = filteredData.map(d => [d.company, d.investor, `$${d.amount}`, d.stage, d.status, d.date]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "funding_data.csv"; a.click();
    URL.revokeObjectURL(url);
    setShowMenu(null);
  }, [filteredData]);

  // ── Shared chart action buttons component ──────────────────────
  const ChartActionBar = () => (
    <div className="header-actions">
      <button className="expand-btn" style={{ cursor: 'pointer' }} title="Expand">
        {/* Expand icon */}
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
          <path d="M8.59019 16.3212H4.29507V12.026M12.0263 4.29483H16.3214V8.58994" stroke="#888888" strokeWidth="1.28853" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button className="edit-btn" style={{ cursor: 'pointer' }} title="Edit">
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
          <path d="M12.6866 4.44129C13.2312 3.89915 14.112 3.90017 14.6554 4.44358L16.1735 5.96172C16.7169 6.50505 16.718 7.38562 16.176 7.93033L7.44958 16.7014L3.91558 16.7013L3.91558 13.1716L12.6866 4.44129Z" stroke="#888888" strokeWidth="1.28853" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.5802 5.55095L15.0647 9.03543" stroke="#888888" strokeWidth="1.28853" strokeLinecap="round"/>
        </svg>
      </button>

      <button className="more-options" style={{ cursor: 'pointer' }} title="More options">
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
          <path d="M5.15518 8.71862C5.59317 8.71862 5.96544 8.87361 6.27823 9.18639C6.5908 9.49909 6.74553 9.87036 6.74503 10.3075C6.74503 10.7455 6.59004 11.1177 6.27725 11.4305C5.96448 11.7433 5.59246 11.8979 5.15518 11.8973C4.71739 11.8973 4.3458 11.7422 4.03311 11.4296C3.72033 11.1168 3.56578 10.7448 3.56631 10.3075C3.56638 9.86962 3.72137 9.49814 4.03409 9.18542C4.34683 8.8727 4.71795 8.71812 5.15518 8.71862ZM10.3095 8.71862C10.7475 8.71862 11.1197 8.87361 11.4325 9.18639C11.745 9.49908 11.8988 9.87039 11.8983 10.3075C11.8983 10.7455 11.7443 11.1178 11.4315 11.4305C11.1188 11.7433 10.7468 11.8979 10.3095 11.8973C9.87154 11.8973 9.49919 11.7423 9.18643 11.4296C8.87382 11.1168 8.72008 10.7447 8.72061 10.3075C8.72068 9.86979 8.87492 9.49807 9.18741 9.18542C9.46106 8.91177 9.78005 8.75893 10.1483 8.72546L10.3095 8.71862ZM15.4638 8.71862C15.9017 8.71863 16.274 8.87362 16.5868 9.18639C16.8993 9.49906 17.0531 9.87043 17.0526 10.3075C17.0526 10.7454 16.8986 11.1178 16.5858 11.4305C16.2731 11.7433 15.9011 11.8979 15.4638 11.8973L15.3026 11.8895C14.9337 11.8557 14.6144 11.7033 14.3407 11.4296C14.0281 11.1168 13.8744 10.7447 13.8749 10.3075C13.875 9.86975 14.0292 9.49808 14.3417 9.18542C14.6545 8.87263 15.0265 8.71809 15.4638 8.71862Z" fill="#888888" stroke="white" strokeWidth="0.257707"/>
        </svg>
      </button>
    </div>
  );

  // ── SVG Tooltip helper ─────────────────────────────────────────
  const ChartTooltip = ({ pt, labelPrefix, valueColor }) => {
    if (!pt) return null;
    const px = pt.x;
    const py = pt.y;
    const bx = Math.min(Math.max(px - 38, 4), 452);
    const by = py < 52 ? py + 14 : py - 52;
    return (
      <g className="em-chart-tooltip" style={{ pointerEvents: "none" }}>
        <line x1={px} y1={py} x2={px} y2={241}
          stroke={valueColor} strokeWidth="1"
          strokeDasharray="4 3" strokeOpacity="0.4" />
        <rect x={bx} y={by} width="80" height="36" rx="7"
          fill="#1F2937" fillOpacity="0.96"
          style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.25))" }} />
        <text x={bx + 40} y={by + 13} fontSize="10" fill="#9CA3AF"
          fontFamily="Inter, sans-serif" textAnchor="middle">{pt.month}</text>
        <text x={bx + 40} y={by + 28} fontSize="13" fill={valueColor}
          fontFamily="Inter, sans-serif" fontWeight="700" textAnchor="middle">
          {labelPrefix}{pt.value}
        </text>
      </g>
    );
  };

  return (
    <div className={`em-startup-overview in-page${sidebarCollapsed ? " em-startup-overview--sidebar-collapsed" : ""}${isDarkMode ? " dark" : ""}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />

      <main className="em-funding-main">
        {/* Page Header */}
        <div className="em-funding-page-header">
          <div>
            <h1 className="em-funding-title">Funding Analytics</h1>
            <p className="em-funding-subtitle">Monitor funding activities and investment trends</p>
          </div>
        </div>

        {/* ── Stats Cards ──────────────────────────────────────── */}
        <div className="em-funding-stats">
          <div className="em-funding-stat-card">
            <div className="em-funding-stat-icon em-funding-stat-icon-green">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="em-funding-stat-content">
              <div className="em-funding-stat-meta">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                  <g clipPath="url(#clip0_3_7105)">
                    <path d="M9.33333 4.08331H12.8333V7.58331" stroke="#007A55" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.8333 4.08331L7.87501 9.04165L4.95834 6.12498L1.16667 9.91665" stroke="#007A55" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs><clipPath id="clip0_3_7105"><rect width="14" height="14" fill="white"/></clipPath></defs>
                </svg>
                <span className="em-funding-stat-trend">+7%</span>
              </div>
              <div className="em-funding-stat-label">TOTAL FUNDING RAISED</div>
              <div className="em-funding-stat-value em-funding-stat-value-green">$3.27M</div>
              <div className="em-funding-stat-footer">
                <div className="em-funding-stat-bar em-funding-stat-bar-green-bg">
                  <div className="em-funding-stat-bar-fill em-funding-stat-bar-green" style={{width: '70%'}}></div>
                </div>
                <span className="em-funding-stat-subtext">from last month</span>
              </div>
            </div>
          </div>

          <div className="em-funding-stat-card">
            <div className="em-funding-stat-icon em-funding-stat-icon-blue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11 17L13 19C13.197 19.197 13.4308 19.3532 13.6882 19.4598C13.9456 19.5665 14.2214 19.6213 14.5 19.6213C14.7786 19.6213 15.0544 19.5665 15.3118 19.4598C15.5692 19.3532 15.803 19.197 16 19C16.197 18.803 16.3532 18.5692 16.4598 18.3118C16.5665 18.0544 16.6213 17.7786 16.6213 17.5C16.6213 17.2214 16.5665 16.9456 16.4598 16.6882C16.3532 16.4308 16.197 16.197 16 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 14L16.5 16.5C16.8978 16.8978 17.4374 17.1213 18 17.1213C18.5626 17.1213 19.1022 16.8978 19.5 16.5C19.8978 16.1022 20.1213 15.5626 20.1213 15C20.1213 14.4374 19.8978 13.8978 19.5 13.5L15.62 9.62002C15.0575 9.05821 14.295 8.74265 13.5 8.74265C12.705 8.74265 11.9425 9.05821 11.38 9.62002L10.5 10.5C10.1022 10.8978 9.56261 11.1213 9 11.1213C8.43739 11.1213 7.89782 10.8978 7.5 10.5C7.10217 10.1022 6.87868 9.56262 6.87868 9.00002C6.87868 8.43741 7.10217 7.89784 7.5 7.50002L10.31 4.69002C11.2222 3.78016 12.4119 3.20057 13.6906 3.04299C14.9694 2.88541 16.2642 3.15885 17.37 3.82002L17.84 4.10002C18.2658 4.357 18.772 4.44613 19.26 4.35002L21 4.00002" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 3L22 14H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 3L2 14L8.5 20.5C8.89782 20.8978 9.43739 21.1213 10 21.1213C10.5626 21.1213 11.1022 20.8978 11.5 20.5C11.8978 20.1022 12.1213 19.5626 12.1213 19C12.1213 18.4374 11.8978 17.8978 11.5 17.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 4H11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="em-funding-stat-content">
              <div className="em-funding-stat-meta">
                <span className="em-funding-stat-period">3 this week</span>
              </div>
              <div className="em-funding-stat-label">ACTIVE DEALS</div>
              <div className="em-funding-stat-value em-funding-stat-value-blue">8</div>
              <div className="em-funding-stat-footer">
                <div className="em-funding-stat-bar em-funding-stat-bar-blue-bg">
                  <div className="em-funding-stat-bar-fill em-funding-stat-bar-blue" style={{width: '60%'}}></div>
                </div>
                <span className="em-funding-stat-subtext">ongoing negotiations</span>
              </div>
            </div>
          </div>

          <div className="em-funding-stat-card">
            <div className="em-funding-stat-icon em-funding-stat-icon-purple">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11 17H14V19C14 19.2652 14.1054 19.5196 14.2929 19.7071C14.4804 19.8946 14.7348 20 15 20H17C17.2652 20 17.5196 19.8946 17.7071 19.7071C17.8946 19.5196 18 19.2652 18 19V16C18.4658 15.8449 18.8891 15.5834 19.2363 15.2363C19.5834 14.8891 19.8449 14.4658 20 14H21C21.2652 14 21.5196 13.8946 21.7071 13.7071C21.8946 13.5196 22 13.2652 22 13V11C22 10.7348 21.8946 10.4804 21.7071 10.2929C21.5196 10.1054 21.2652 10 21 10H20C20 9.22377 19.8193 8.45821 19.4721 7.76393C19.125 7.06966 18.621 6.46574 18 6V3C17.379 3 16.7666 3.14458 16.2111 3.42229C15.6557 3.7 15.1726 4.10322 14.8 4.6L14.5 5H11C9.4087 5 7.88258 5.63214 6.75736 6.75736C5.63214 7.88258 5 9.4087 5 11V12C5 12.7762 5.18073 13.5418 5.52786 14.2361C5.875 14.9303 6.37902 15.5343 7 16V19C7 19.2652 7.10536 19.5196 7.29289 19.7071C7.48043 19.8946 7.73478 20 8 20H10C10.2652 20 10.5196 19.8946 10.7071 19.7071C10.8946 19.5196 11 19.2652 11 19V17Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10H16.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 8V9C2 9.53043 2.21071 10.0391 2.58579 10.4142C2.96086 10.7893 3.46957 11 4 11H5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="em-funding-stat-content">
              <div className="em-funding-stat-meta">
                <span className="em-funding-stat-period">Q3 2025</span>
              </div>
              <div className="em-funding-stat-label">AVERAGE DEAL SIZE</div>
              <div className="em-funding-stat-value em-funding-stat-value-purple">$408K</div>
              <div className="em-funding-stat-footer">
                <div className="em-funding-stat-bar em-funding-stat-bar-purple-bg">
                  <div className="em-funding-stat-bar-fill em-funding-stat-bar-purple" style={{width: '75%'}}></div>
                </div>
                <span className="em-funding-stat-subtext">from last quarter</span>
              </div>
            </div>
          </div>

          <div className="em-funding-stat-card">
            <div className="em-funding-stat-icon em-funding-stat-icon-blue2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="em-funding-stat-content">
              <div className="em-funding-stat-meta em-funding-stat-meta-indigo">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <g clipPath="url(#clip0_3_7182)">
                    <path d="M9.33331 4.08331H12.8333V7.58331" stroke="#432DD7" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.8334 4.08331L7.87502 9.04165L4.95835 6.12498L1.16669 9.91665" stroke="#432DD7" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs><clipPath id="clip0_3_7182"><rect width="14" height="14" fill="white"/></clipPath></defs>
                </svg>
                <span className="em-funding-stat-trend em-funding-stat-trend-indigo">+3%</span>
              </div>
              <div className="em-funding-stat-label">SUCCESS RATE</div>
              <div className="em-funding-stat-value em-funding-stat-value-blue2">85%</div>
              <div className="em-funding-stat-footer">
                <div className="em-funding-stat-bar em-funding-stat-bar-blue-bg">
                  <div className="em-funding-stat-bar-fill em-funding-stat-bar-blue" style={{width: '85%'}}></div>
                </div>
                <span className="em-funding-stat-subtext">from last year</span>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════
            CHARTS ROW — fully interactive
        ════════════════════════════════════════════════════════ */}
        <div className={`em-funding-charts${expandedChart ? " em-funding-charts--has-expanded" : ""}`}>

          {/* ── Monthly Funding Trends Chart ────────────────────── */}
          <div className={`em-funding-chart-card${expandedChart === "trends" ? " em-funding-chart-card--expanded" : ""}${expandedChart && expandedChart !== "trends" ? " em-funding-chart-card--hidden" : ""}`}>
            <div className="em-funding-chart-header">
              <div>
                <h3 className="em-funding-chart-title">Monthly Funding Trends ($K)</h3>
                <p className="em-funding-chart-subtitle">Funding growth over time</p>
              </div>
              <ChartActionBar chartKey="trends" />
            </div>

            

            <div className="em-funding-chart-content">
              <svg
                className="em-funding-line-chart"
                viewBox="0 0 532 276"
                preserveAspectRatio="xMidYMid meet"
                style={{ overflow: "visible", cursor: "crosshair" }}
              >
                <defs>
                  <linearGradient id="greenAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.15"/>
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
                  </linearGradient>
                  <filter id="glowGreen" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <clipPath id="clip-trends">
                    <rect width="531.234" height="275.455"/>
                  </clipPath>
                </defs>

                <g clipPath="url(#clip-trends)">
                  {/* Grid lines */}
                  {[241, 182, 123, 64, 5].map((y, i) => (
                    <path key={i}
                      d={`M63.9448 ${y}H526.315`}
                      stroke="#F0F0F0" strokeWidth="0.983767" strokeDasharray="2.95 2.95"
                      className="em-chart-gridline"
                    />
                  ))}

                  {/* X-axis */}
                  <path d="M63.9449 241.023H526.315" stroke="#94A3B8" strokeWidth="0.983767"/>
                  {/* Y-axis */}
                  <path d="M63.9446 4.91887V241.023" stroke="#94A3B8" strokeWidth="0.983767"/>

                  {/* X labels + ticks */}
                  {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"].map((m, i) => (
                    <g key={m}>
                      <path d={`M${63.9 + i * 66.05} 246.926V241.023`} stroke="#94A3B8" strokeWidth="0.983767"/>
                      <text x={63.9 + i * 66.05} y="257.614" fontSize="11" fill="#94A3B8"
                        fontFamily="Inter, sans-serif" textAnchor="middle"
                        className="em-chart-axis-label">{m}</text>
                    </g>
                  ))}

                  {/* Y labels + ticks */}
                  {[["0",241,"52"],["55",182,"45"],["110",123,"42"],["165",64,"39"],["220",5,"34"]].map(([v,y,tx]) => (
                    <g key={v}>
                      <path d={`M58.042 ${y}H63.9446`} stroke="#94A3B8" strokeWidth="0.983767"/>
                      <text x={tx} y={Number(y)+4} fontSize="11" fill="#94A3B8"
                        fontFamily="Inter, sans-serif" textAnchor="end"
                        className="em-chart-axis-label">{v}</text>
                    </g>
                  ))}

                  {/* Area fill */}
                  <path
                    d={buildAreaPath(trendsPoints)}
                    fill="url(#greenAreaGrad)"
                    className={`em-chart-area${chartsVisible ? " em-chart-area--visible" : ""}`}
                  />

                  {/* Line — animated draw */}
                  <path
                    d={buildLinePath(trendsPoints)}
                    stroke="#00B031" strokeWidth="2.9513"
                    fill="none" strokeLinecap="round" strokeLinejoin="round"
                    className={`em-funding-chart-line em-chart-draw-line${chartsVisible ? " em-chart-draw-line--visible" : ""}`}
                    filter={hoveredTrendsPoint ? "url(#glowGreen)" : "none"}
                  />

                  {/* Interactive data points */}
                  {trendsPoints.map((pt) => (
                    <g key={pt.month}
                      onMouseEnter={() => setHoveredTrendsPoint(pt)}
                      onMouseLeave={() => setHoveredTrendsPoint(null)}
                      style={{ cursor: "crosshair" }}
                    >
                      {/* Wide invisible hit area */}
                      <circle cx={pt.x} cy={pt.y} r="14" fill="transparent"/>
                      {/* Pulse ring on hover */}
                      {hoveredTrendsPoint?.month === pt.month && (
                        <circle cx={pt.x} cy={pt.y} r="10"
                          fill="none" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.3"
                          className="em-chart-pulse-ring"/>
                      )}
                      <circle
                        cx={pt.x} cy={pt.y}
                        r={hoveredTrendsPoint?.month === pt.month ? 7 : 4.9}
                        fill="#10B981" stroke="white" strokeWidth="2"
                        className="em-funding-chart-point"
                        style={{
                          transition: "r 0.15s ease, filter 0.15s ease",
                          filter: hoveredTrendsPoint?.month === pt.month
                            ? "drop-shadow(0 0 7px rgba(16,185,129,0.8))"
                            : "none",
                        }}
                      />
                    </g>
                  ))}

                  {/* Tooltip */}
                  <ChartTooltip pt={hoveredTrendsPoint} labelPrefix="$" valueColor="#10B981"/>
                </g>
              </svg>
            </div>
          </div>

          {/* ── Investment Deals Count Chart ────────────────────── */}
          <div className={`em-funding-chart-card em-investment-deals-card${expandedChart === "deals" ? " em-funding-chart-card--expanded" : ""}${expandedChart && expandedChart !== "deals" ? " em-funding-chart-card--hidden" : ""}`}>
            <div className="em-funding-chart-header">
              <div>
                <h3 className="em-funding-chart-title">Investment Deals Count</h3>
                <p className="em-funding-chart-subtitle">Number of deals per month</p>
              </div>
              <ChartActionBar chartKey="deals" />
            </div>

            

            <div className="em-funding-chart-content">
              <svg
                className="em-investment-deals-chart"
                viewBox="0 0 532 276"
                preserveAspectRatio="xMidYMid meet"
                style={{ overflow: "visible", cursor: "crosshair" }}
              >
                <defs>
                  <linearGradient id="paint0_linear_3_7293" x1="63.9448" y1="4.91887" x2="63.9448" y2="241.023" gradientUnits="userSpaceOnUse">
                    <stop offset="0.05" stopColor="#6366F1" stopOpacity="0.28"/>
                    <stop offset="0.95" stopColor="#6366F1" stopOpacity="0"/>
                  </linearGradient>
                  <filter id="glowIndigo" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <clipPath id="clip0_3_7293">
                    <rect width="531.234" height="275.455" fill="white"/>
                  </clipPath>
                </defs>

                <g clipPath="url(#clip0_3_7293)">
                  {/* Grid lines */}
                  {[241, 182, 123, 64, 5].map((y, i) => (
                    <path key={i}
                      d={`M63.9448 ${y}H526.315`}
                      stroke="#F0F0F0" strokeWidth="0.983767" strokeDasharray="2.95 2.95"
                      className="em-chart-gridline"
                    />
                  ))}

                  {/* Axes */}
                  <path d="M63.9449 241.023H526.315" stroke="#94A3B8" strokeWidth="0.983767"/>
                  <path d="M63.9451 4.91887V241.023" stroke="#94A3B8" strokeWidth="0.983767"/>

                  {/* X labels + ticks */}
                  {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"].map((m, i) => (
                    <g key={m}>
                      <path d={`M${63.9 + i * 66.05} 246.926V241.023`} stroke="#94A3B8" strokeWidth="0.983767"/>
                      <text x={63.9 + i * 66.05} y="257.614" fontSize="11" fill="#94A3B8"
                        fontFamily="Inter, sans-serif" textAnchor="middle"
                        className="em-chart-axis-label">{m}</text>
                    </g>
                  ))}

                  {/* Y labels + ticks */}
                  {[["0",241],["2",182],["4",123],["6",64],["8",5]].map(([v,y]) => (
                    <g key={v}>
                      <path d={`M58.0423 ${y}H63.9449`} stroke="#94A3B8" strokeWidth="0.983767"/>
                      <text x="52" y={Number(y)+4} fontSize="11" fill="#94A3B8"
                        fontFamily="Inter, sans-serif" textAnchor="end"
                        className="em-chart-axis-label">{v}</text>
                    </g>
                  ))}

                  {/* Area fill */}
                  <path
                    d={buildAreaPath(dealsPoints)}
                    fill="url(#paint0_linear_3_7293)"
                    fillOpacity="0.6"
                    className={`em-chart-area${chartsVisible ? " em-chart-area--visible" : ""}`}
                  />

                  {/* Line — animated draw */}
                  <path
                    className={`em-investment-line em-chart-draw-line${chartsVisible ? " em-chart-draw-line--visible" : ""}`}
                    d={buildLinePath(dealsPoints)}
                    stroke="#6366F1" strokeWidth="1.96753"
                    fill="none" strokeLinecap="round" strokeLinejoin="round"
                    filter={hoveredDealsPoint ? "url(#glowIndigo)" : "none"}
                  />

                  {/* Interactive data points */}
                  {dealsPoints.map((pt) => (
                    <g key={pt.month}
                      onMouseEnter={() => setHoveredDealsPoint(pt)}
                      onMouseLeave={() => setHoveredDealsPoint(null)}
                      style={{ cursor: "crosshair" }}
                    >
                      <circle cx={pt.x} cy={pt.y} r="14" fill="transparent"/>
                      {hoveredDealsPoint?.month === pt.month && (
                        <circle cx={pt.x} cy={pt.y} r="10"
                          fill="none" stroke="#6366F1" strokeWidth="1.5" strokeOpacity="0.28"
                          className="em-chart-pulse-ring"/>
                      )}
                      <circle
                        cx={pt.x} cy={pt.y}
                        r={hoveredDealsPoint?.month === pt.month ? 7 : 4}
                        fill="#6366F1" stroke="white" strokeWidth="2"
                        className="em-chart-point"
                        style={{
                          transition: "r 0.15s ease, filter 0.15s ease",
                          filter: hoveredDealsPoint?.month === pt.month
                            ? "drop-shadow(0 0 7px rgba(99,102,241,0.8))"
                            : "none",
                        }}
                      />
                    </g>
                  ))}

                  {/* Tooltip */}
                  <ChartTooltip pt={hoveredDealsPoint} labelPrefix="" valueColor="#818CF8"/>
                </g>
              </svg>
            </div>
          </div>

        </div>{/* end .em-funding-charts */}

        {/* ── Recent Funding Deals Table ───────────────────────── */}
        <div className="em-funding-table-section">
          <div className="em-funding-table-header">
            <div>
              <div className="em-funding-table-title-row">
                <h3 className="em-funding-table-title">Recent Funding Deals</h3>
                <svg className="em-funding-info-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7.91351" fill="#C1C1C1" fillOpacity="0.5"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.29 5.7126C9.413 5.4962 9.483 5.2451 9.483 4.9785C9.483 4.1593 8.818 3.4947 7.999 3.4947C7.18 3.4947 6.515 4.1593 6.515 4.9785C6.515 5.7976 7.18 6.4623 7.999 6.4623C8.552 6.4623 9.035 6.1609 9.29 5.7126ZM7.01 7.4514H7.505H8.494C9.04 7.4514 9.483 7.8939 9.483 8.4406V9.4298V13.3866C9.483 13.9333 9.04 14.3758 8.494 14.3758C7.947 14.3758 7.505 13.9333 7.505 13.3866V10.1717C7.505 9.7621 7.172 9.4298 6.763 9.4298C6.353 9.4298 6.021 9.0975 6.021 8.6879V8.4406C6.021 8.0929 6.2 7.7857 6.471 7.6099C6.625 7.5094 6.811 7.4514 7.01 7.4514Z" fill="white"/>
                </svg>
              </div>
              <p className="em-funding-table-subtitle">Latest investment transactions</p>
            </div>
          </div>

          <div className="em-funding-table-controls">
            <div className="em-funding-table-filters">
              <div className="em-funding-filter-dropdown">
                <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value)}
                  className="em-funding-filter-select">
                  <option value="All">Stage</option>
                  <option value="Pre-seed">Pre-seed</option>
                  <option value="Seed">Seed</option>
                  <option value="Series A">Series A</option>
                  <option value="Series B">Series B</option>
                </select>
              </div>
              <div className="em-funding-filter-dropdown">
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                  className="em-funding-filter-select">
                  <option value="All">Status</option>
                  <option value="Completes">Completes</option>
                  <option value="In progress">In progress</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
            <div className="em-funding-search-box">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.59596 12.0957C9.81189 12.0957 12.419 9.48864 12.419 6.27271C12.419 3.05678 9.81189 0.449646 6.59596 0.449646C3.38003 0.449646 0.772903 3.05678 0.772903 6.27271C0.772903 9.48864 3.38003 12.0957 6.59596 12.0957Z" stroke="#121212" strokeWidth="1.12943" strokeLinecap="round" strokeLinejoin="round" className="em-search-icon-path"/>
                <path d="M13.8749 13.5532L10.7078 10.3869" stroke="#121212" strokeWidth="1.12943" strokeLinecap="round" strokeLinejoin="round" className="em-search-icon-path"/>
              </svg>
              <input type="text" placeholder="Search" value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="em-funding-search-input"/>
              {searchTerm && (
                <button className="em-search-clear-btn"
                  onClick={() => setSearchTerm("")}
                  title="Clear search">✕</button>
              )}
            </div>
          </div>

          <div className="em-funding-table-wrapper">
            <table className="em-funding-table">
              <thead>
                <tr>
                  <th>COMPANY NAME</th>
                  <th>INVESTOR</th>
                  <th>AMOUNT ($K)</th>
                  <th>STAGE</th>
                  <th>STATUS</th>
                  <th>DATE</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="em-funding-empty-cell">
                      <div className="em-funding-empty-state">
                        <span>🔍</span>
                        <p>No results match your filters.</p>
                        <button onClick={() => {
                          setSearchTerm(""); setStageFilter("All"); setStatusFilter("All");
                        }}>Reset Filters</button>
                      </div>
                    </td>
                  </tr>
                ) : filteredData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="em-funding-company-cell">
                        <div className="em-funding-company-avatar"
                          style={{ backgroundColor: getCompanyColor(item.id) }}>
                          {item.initial}
                        </div>
                        <span className="em-funding-company-name">{item.company}</span>
                      </div>
                    </td>
                    <td className="em-funding-investor-cell">{item.investor}</td>
                    <td className="em-funding-amount-cell">${item.amount}</td>
                    <td>
                      <span className={`em-funding-stage-badge em-funding-stage-${item.stage.toLowerCase().replace(/\s+/g,"-")}`}>
                        {item.stage}
                      </span>
                    </td>
                    <td>
                      <span className={`em-funding-status-badge em-funding-status-${item.status.toLowerCase().replace(/\s+/g,"-")}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="em-funding-date-cell">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="em-funding-table-footer">
            <div className="em-funding-table-info">
              Showing <span className="em-funding-table-info-number">
                {String(filteredData.length).padStart(2,"0")}
              </span> / 1280 Results
            </div>
            <div className="em-funding-pagination">
              <button className="em-funding-pagination-arrow"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1} aria-label="Previous page">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M11 13L7 9L11 5" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {[1, 2, 3].map(n => (
                <button key={n}
                  className={`em-funding-pagination-number${currentPage === n ? " em-funding-pagination-active" : ""}`}
                  onClick={() => setCurrentPage(n)}>{n}</button>
              ))}
              <span className="em-funding-pagination-ellipsis">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="3" cy="8" r="1.2" fill="#717182"/>
                  <circle cx="8" cy="8" r="1.2" fill="#717182"/>
                  <circle cx="13" cy="8" r="1.2" fill="#717182"/>
                </svg>
              </span>
              <button
                className={`em-funding-pagination-number${currentPage === 20 ? " em-funding-pagination-active" : ""}`}
                onClick={() => setCurrentPage(20)}>20</button>
              <button className="em-funding-pagination-arrow"
                onClick={() => setCurrentPage(Math.min(20, currentPage + 1))}
                disabled={currentPage === 20} aria-label="Next page">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M7 5L11 9L7 13" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="em-funding-disclaimer">
            Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
          </div>
        </div>
      </main>
    </div>
  );
}