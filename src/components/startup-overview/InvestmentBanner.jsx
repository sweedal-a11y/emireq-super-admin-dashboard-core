import React from 'react';
import './InvestmentBanner.css';
import bitcoinImg from '../../assets/bitcoin.png';

export default function InvestmentBanner() {
  return (
    <div 
      className="investment-banner" 
      style={{ backgroundImage: `url(${bitcoinImg})` }}
    >
      <div className="banner-overlay"></div>
      <div className="banner-content">
        <h2 className="banner-title">Securely Invest your money</h2>
        <p className="banner-subtitle">You can start your journey here</p>
        <p className="banner-date">20th October, 2025</p>
        <button className="banner-cta">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3V13M13 8H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Create your fund
        </button>
      </div>
    </div>
  );
}
