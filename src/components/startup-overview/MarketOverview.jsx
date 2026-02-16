import React, { useState } from 'react';
import './MarketOverview.css';

const allMarketData = [
  {
    id: 1,
    name: "Aurivox",
    symbol: "AVX",
    price: "$200,000",
    changePercent: -1.32,
    changeValue: "$0.057",
    marketcap: "$213.8M",
    category: "DeFi",
    status: "Active",
  },
  {
    id: 2,
    name: "Eminar",
    symbol: "EMN",
    price: "$200,000",
    changePercent: 1.32,
    changeValue: "$0.146",
    marketcap: "$245.8M",
    category: "Gaming",
    status: "Active",
  },
  {
    id: 3,
    name: "Xenara",
    symbol: "XNR",
    price: "$200,000",
    changePercent: 1.32,
    changeValue: "$0.450",
    marketcap: "$245.8M",
    category: "NFT",
    status: "Active",
  },
];

const ChartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.49979 2.50063V15.834C2.49979 16.276 2.67538 16.6999 2.98794 17.0125C3.3005 17.325 3.72443 17.5006 4.16645 17.5006H17.4998" stroke="#364153" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.9998 14.1673V7.50063" stroke="#364153" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.8333 14.1666V4.16664" stroke="#364153" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.66632 14.1667V11.6667" stroke="#364153" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowUp = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 4V12M8 12L4 8M8 12L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TokenIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2L3 7V13L10 18L17 13V7L10 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MarketOverview = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [sortBy, setSortBy] = useState('Name');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(false);

  const totalResults = 1280;
  const totalPages = 20;

  // Filter and search logic
  const filteredData = allMarketData.filter((item) => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All Categories' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sort logic
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === 'Name') return a.name.localeCompare(b.name);
    if (sortBy === 'Price') return parseFloat(b.price.replace(/[$,]/g, '')) - parseFloat(a.price.replace(/[$,]/g, ''));
    if (sortBy === 'Change') return b.changePercent - a.changePercent;
    return 0;
  });

  const marketData = sortedData;

  const getTokenColor = (name) => {
    switch(name) {
      case 'Aurivox': return '#F59E0B';
      case 'Eminar': return '#8B5CF6';
      case 'Xenara': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <div className="market-overview-container">
      {/* Header Section */}
      <div className="market-overview-header">
        <div className="market-title-section">
          <div className="market-title-wrapper">
            <div className="market-icon">
              <ChartIcon />
            </div>
            <h2>Market Overview</h2>
          </div>
          <p className="market-subtitle">Comprehensive token statistics trading information</p>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="market-controls">
        <div className="market-filters">
          <div className="filter-dropdown">
            <button 
              className="filter-button"
              onClick={() => {
                setShowDropdown1(!showDropdown1);
                setShowDropdown2(false);
                setShowDropdown3(false);
              }}
            >
              <span>{categoryFilter}</span>
              <ChevronDown />
            </button>
            {showDropdown1 && (
              <div className="dropdown-menu">
                <button onClick={() => { setCategoryFilter('All Categories'); setShowDropdown1(false); }}>All Categories</button>
                <button onClick={() => { setCategoryFilter('DeFi'); setShowDropdown1(false); }}>DeFi</button>
                <button onClick={() => { setCategoryFilter('Gaming'); setShowDropdown1(false); }}>Gaming</button>
                <button onClick={() => { setCategoryFilter('NFT'); setShowDropdown1(false); }}>NFT</button>
              </div>
            )}
          </div>

          <div className="filter-dropdown">
            <button 
              className="filter-button"
              onClick={() => {
                setShowDropdown2(!showDropdown2);
                setShowDropdown1(false);
                setShowDropdown3(false);
              }}
            >
              <span>{statusFilter}</span>
              <ChevronDown />
            </button>
            {showDropdown2 && (
              <div className="dropdown-menu">
                <button onClick={() => { setStatusFilter('All Status'); setShowDropdown2(false); }}>All Status</button>
                <button onClick={() => { setStatusFilter('Active'); setShowDropdown2(false); }}>Active</button>
                <button onClick={() => { setStatusFilter('Trending'); setShowDropdown2(false); }}>Trending</button>
              </div>
            )}
          </div>

          <div className="filter-dropdown">
            <button 
              className="filter-button"
              onClick={() => {
                setShowDropdown3(!showDropdown3);
                setShowDropdown1(false);
                setShowDropdown2(false);
              }}
            >
              <span>Sort: {sortBy}</span>
              <ChevronDown />
            </button>
            {showDropdown3 && (
              <div className="dropdown-menu">
                <button onClick={() => { setSortBy('Name'); setShowDropdown3(false); }}>Sort: Name</button>
                <button onClick={() => { setSortBy('Price'); setShowDropdown3(false); }}>Sort: Price</button>
                <button onClick={() => { setSortBy('Change'); setShowDropdown3(false); }}>Sort: Change</button>
              </div>
            )}
          </div>
        </div>

        <div className="market-search">
          <SearchIcon />
          <input 
            type="text" 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table Container */}
    {/* Table Container */}
<div className="market-table-wrapper">
  {/* Table Header */}
  <div className="market-table-header">
    <div>Name</div>
    <div>Price</div>
    <div>Change(%)</div>
    <div>Change($)</div>
    <div>Marketcap</div>
    <div className="text-right">Trade</div>
  </div>

  {/* Table Rows - Dynamic */}
  {marketData.map((item) => {
    const iconClass = item.name === 'Aurivox' ? 'orange' : item.name === 'Eminar' ? 'purple' : 'green';
    const isPositive = item.changePercent > 0;
    
    return (
      <div key={item.id} className="market-table-row">
        {/* Name Column */}
        <div className="market-name-col">
          <div className={`market-icon ${iconClass}`}>
            {item.name === 'Aurivox' && (
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.3343 6.5L23.8347 11.917L21.6679 20.5842H13.0007L10.8339 11.917L17.3343 6.5Z" fill="#F59E0B" fillOpacity="0.3"/>
                <path d="M17.3343 6.5L23.8347 11.917L21.6679 20.5842H13.0007L10.8339 11.917L17.3343 6.5Z" stroke="#F59E0B" strokeWidth="2.7085" strokeLinejoin="round"/>
                <path d="M13.0007 20.5842L17.3343 28.168L21.6679 20.5842" stroke="#F59E0B" strokeWidth="2.7085" strokeLinejoin="round"/>
              </svg>
            )}
            {item.name === 'Eminar' && (
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10.834C0 4.85056 4.85054 0 10.834 0H32.502C38.4854 0 43.336 4.85054 43.336 10.834V32.502C43.336 38.4854 38.4854 43.336 32.502 43.336H10.834C4.85056 43.336 0 38.4854 0 32.502V10.834Z" fill="#6366F1" fillOpacity="0.082"/>
                <path d="M21.6679 8.66766L13.0007 15.1681V28.1689L21.6679 34.6693L30.3351 28.1689V15.1681L21.6679 8.66766Z" fill="#6366F1" fillOpacity="0.3"/>
                <path d="M21.6679 8.66766L13.0007 15.1681V28.1689L21.6679 34.6693L30.3351 28.1689V15.1681L21.6679 8.66766Z" stroke="#6366F1" strokeWidth="2.7085" strokeLinejoin="round"/>
                <path d="M21.6679 26.002C24.0613 26.002 26.0015 24.0618 26.0015 21.6684C26.0015 19.2751 24.0613 17.3348 21.6679 17.3348C19.2745 17.3348 17.3343 19.2751 17.3343 21.6684C17.3343 24.0618 19.2745 26.002 21.6679 26.002Z" fill="#6366F1"/>
              </svg>
            )}
            {item.name === 'Xenara' && (
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10.834C0 4.85056 4.85054 0 10.834 0H32.502C38.4854 0 43.336 4.85054 43.336 10.834V32.502C43.336 38.4854 38.4854 43.336 32.502 43.336H10.834C4.85056 43.336 0 38.4854 0 32.502V10.834Z" fill="#10B981" fillOpacity="0.082"/>
                <path d="M28.1683 10.8332H15.1675C12.7741 10.8332 10.8339 12.7734 10.8339 15.1668V28.1676C10.8339 30.561 12.7741 32.5012 15.1675 32.5012H28.1683C30.5617 32.5012 32.5019 30.561 32.5019 28.1676V15.1668C32.5019 12.7734 30.5617 10.8332 28.1683 10.8332Z" fill="#10B981" fillOpacity="0.3"/>
                <path d="M28.1683 10.8332H15.1675C12.7741 10.8332 10.8339 12.7734 10.8339 15.1668V28.1676C10.8339 30.561 12.7741 32.5012 15.1675 32.5012H28.1683C30.5617 32.5012 32.5019 30.561 32.5019 28.1676V15.1668C32.5019 12.7734 30.5617 10.8332 28.1683 10.8332Z" stroke="#10B981" strokeWidth="2.7085"/>
                <path d="M17.3343 21.6672L20.5845 24.9174L26.0015 18.417" stroke="#10B981" strokeWidth="3.2502" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>

          <div className="market-name-text">
            <p className="market-name">{item.name}</p>
            <p className="market-symbol">{item.symbol}</p>
          </div>
        </div>

        {/* Price */}
        <div className="market-price">{item.price}</div>

        {/* Change % */}
        <div className={`market-change ${isPositive ? 'positive' : 'negative'}`}>
          <span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              {isPositive ? (
                <>
                  <path d="M11.5559 5.05542H15.8895V9.38902" stroke="#00B031" strokeWidth="1.44453" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.8899 5.05542L9.75063 11.1947L6.1393 7.58335L1.44456 12.2781" stroke="#00B031" strokeWidth="1.44453" strokeLinecap="round" strokeLinejoin="round"/>
                </>
              ) : (
                <>
                  <path d="M11.556 12.2786H15.8896V7.94504" stroke="#E7000B" strokeWidth="1.44453" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.89 12.2772L9.75074 6.13797L6.1394 9.7493L1.44467 5.05457" stroke="#E7000B" strokeWidth="1.44453" strokeLinecap="round" strokeLinejoin="round"/>
                </>
              )}
            </svg>
          </span> {isPositive ? '+' : ''}{item.changePercent}%
        </div>

        {/* Change $ */}
        <div className={`market-change ${isPositive ? 'positive' : 'negative'}`}>
          <span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              {isPositive ? (
                <>
                  <path d="M11.5559 5.05542H15.8895V9.38902" stroke="#00B031" strokeWidth="1.44453" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.8899 5.05542L9.75063 11.1947L6.1393 7.58335L1.44456 12.2781" stroke="#00B031" strokeWidth="1.44453" strokeLinecap="round" strokeLinejoin="round"/>
                </>
              ) : (
                <>
                  <path d="M11.556 12.2786H15.8896V7.94504" stroke="#E7000B" strokeWidth="1.44453" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.89 12.2772L9.75074 6.13797L6.1394 9.7493L1.44467 5.05457" stroke="#E7000B" strokeWidth="1.44453" strokeLinecap="round" strokeLinejoin="round"/>
                </>
              )}
            </svg>
          </span> {isPositive ? '+' : ''}{item.changeValue}
        </div>

        {/* Marketcap */}
        <div className="market-marketcap">{item.marketcap}</div>

        {/* Trade */}
        <div className="market-trade">
          <button className="trade-btn">Trade</button>
        </div>
      </div>
    );
  })}

</div>






      {/* Pagination Section */}
      <div className="market-footer">
        <div className="pagination-info">
          <span>Showing </span>
          <span className="pagination-number-display">03</span>
          <span> / {totalResults} Results</span>
        </div>

        <div className="pagination-controls">
          <button 
            className="pagination-arrow"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>

          <button
            className={`pagination-page ${currentPage === 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>

          <button
            className={`pagination-page ${currentPage === 2 ? 'active' : ''}`}
            onClick={() => setCurrentPage(2)}
          >
            2
          </button>

          <button
            className={`pagination-page ${currentPage === 3 ? 'active' : ''}`}
            onClick={() => setCurrentPage(3)}
          >
            3
          </button>

          <span className="pagination-ellipsis">...</span>

          <button
            className={`pagination-page ${currentPage === 20 ? 'active' : ''}`}
            onClick={() => setCurrentPage(20)}
          >
            20
          </button>

          <button 
            className="pagination-arrow"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Footer Text */}
      <div className="market-disclaimer">
        Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
      </div>
    </div>
  );
};

export default MarketOverview;

