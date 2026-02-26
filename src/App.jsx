import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import LogoutConfirmModal from "./components/logout-modal/LogoutConfirmModal";
import Dashboard from "./pages/Dashboard";
import Startups from "./pages/startups/StartupsNew";
import StartupDetails from "./pages/startups/StartupDetails";
import Investors from "./pages/investors/InvestorsNew";
import InvestorDetails from "./pages/investors/InvestorDetails";
import Funding from "./pages/funding/FundingNew";
import Deal from "./pages/deal/DealNew";
import Compliance from "./pages/compliance/Compliance";
import Reports from "./pages/reports/Reports";
import TokenizationPage from "./pages/tokenization/TokenizationPage";
import MetaversePage from "./pages/metaverse/MetaversePage";
import ZakatPage from "./pages/zakat/ZakatPage";
import InvestorNetworkPage from "./pages/investor-network/InvestorNetworkPage";
import SettingsPage from "./pages/settings/SettingsPage";
import MyProfile from "./pages/MyProfile";
import Login from "./pages/auth/Login";
import ForgotPassword1 from "./pages/auth/ForgotPassword1";
import ForgotPassword2 from "./pages/auth/ForgotPassword2";
import TwoFactorAuth from "./pages/auth/Twofactorauth";
import AccountLocked from "./pages/auth/Accountlocked";
import "./App.css";

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const logoutButtonRef = useRef(null);
  const isInitialMount = useRef(true);

  // Redirect to login if not authenticated and not on auth route
  useEffect(() => {
    const isAuthPage = location.pathname.startsWith("/auth");
    const isLoggedIn = !!localStorage.getItem("authToken");
    if (!isLoggedIn && !isAuthPage) {
      navigate("/auth/login", { replace: true });
    }
  }, [location.pathname, navigate]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply theme to body element
  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  // Sync logout modal with URL query param
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // Check if URL has confirmLogout param on mount
      const hasConfirmLogout = searchParams.get("confirmLogout") === "true";
      if (hasConfirmLogout) {
        setShowLogoutModal(true);
      }
      return;
    }

    const hasConfirmLogout = searchParams.get("confirmLogout") === "true";
    if (hasConfirmLogout && !showLogoutModal) {
      setShowLogoutModal(true);
    } else if (!hasConfirmLogout && showLogoutModal) {
      setShowLogoutModal(false);
    }
  }, [searchParams]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogoutClick = (e) => {
    // Store ref to logout button for focus return
    if (e && e.currentTarget) {
      logoutButtonRef.current = e.currentTarget;
    } else {
      logoutButtonRef.current = document.activeElement;
    }
    
    setShowLogoutModal(true);
    // Update URL with query param
    const params = new URLSearchParams(searchParams);
    params.set("confirmLogout", "true");
    setSearchParams(params, { replace: false });
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
    // Remove query param from URL
    const params = new URLSearchParams(searchParams);
    params.delete("confirmLogout");
    setSearchParams(params, { replace: false });
    
    // Return focus to logout button
    if (logoutButtonRef.current) {
      setTimeout(() => {
        logoutButtonRef.current?.focus();
        logoutButtonRef.current = null;
      }, 100);
    }
  };

  const handleConfirmLogout = () => {
    // Clear auth state (mock logout)
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    
    // Close modal
    setShowLogoutModal(false);
    
    // Remove query param
    const params = new URLSearchParams(searchParams);
    params.delete("confirmLogout");
    setSearchParams(params, { replace: true });
    
    // Navigate to login page
    navigate("/auth/login");
  };

  // Don't show sidebar on auth pages
  const isAuthPage = location.pathname.startsWith("/auth");

  return (
    <div className={`em-app ${isDarkMode ? 'em-app--dark' : ''}`}>
      {!isAuthPage && (
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          onLogoutClick={handleLogoutClick}
        />
      )}

      <main className={`em-main ${sidebarCollapsed ? 'em-main--expanded' : ''} ${isAuthPage ? 'em-main--auth' : ''}`}>
        <Routes>
          <Route path="/" element={<Dashboard isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/overview" element={<Dashboard isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/startups" element={<Startups isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/startups/details" element={<StartupDetails isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/investors" element={<Investors isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/investors/details" element={<InvestorDetails isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/funding" element={<Funding isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/deal" element={<Deal isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/compliance" element={<Compliance isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/reports" element={<Reports isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/tokenization" element={<TokenizationPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/metaverse" element={<MetaversePage isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/zakat" element={<ZakatPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/investor-network" element={<InvestorNetworkPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/settings" element={<SettingsPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/profile" element={<MyProfile toggleTheme={toggleTheme} />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/ForgotPassword1" element={<ForgotPassword1 />} />
          <Route path="/auth/ForgotPassword2" element={<ForgotPassword2 />} />
          <Route path="/auth/Twofactorauth" element={<TwoFactorAuth />} />
          <Route path="/auth/Accountlocked" element={<AccountLocked />} />
        </Routes>
      </main>

      {showLogoutModal && (
        <LogoutConfirmModal
          onClose={handleCloseLogoutModal}
          onConfirm={handleConfirmLogout}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
