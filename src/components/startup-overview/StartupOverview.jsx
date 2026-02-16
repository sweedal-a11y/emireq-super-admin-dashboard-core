import React from 'react';
import Header from '../header/Header';
import DashboardStats from './DashboardStats';
import InvestmentBanner from './InvestmentBanner';
import TotalInvestment from './TotalInvestment';
import MonthlyFundingTrend from './MonthlyFundingTrend';
import TokenizationStatus from './TokenizationStatus';
import MarketOverview from './MarketOverview';
import './StartupOverview.css';

export default function StartupOverview({ isDarkMode, toggleTheme, sidebarCollapsed }) {
  return (
    <div className={`em-startup-overview ${sidebarCollapsed ? 'em-startup-overview--sidebar-collapsed' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className="em-startup-overview-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Overview of your startup acquisition marketplace</p>
        </div>
        
        <DashboardStats />
        
        <div className="dashboard-grid">
          <div className="dashboard-left">
            <InvestmentBanner />
          </div>
          <div className="dashboard-right">
            <TotalInvestment />
          </div>
        </div>
        
        <div className="dashboard-grid">
          <div className="dashboard-left">
            <MonthlyFundingTrend />
          </div>
          <div className="dashboard-right">
            <TokenizationStatus />
          </div>
        </div>

        <MarketOverview />
      </div>
    </div>
  );
}
