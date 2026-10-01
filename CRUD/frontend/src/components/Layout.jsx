 import { NavLink } from "react-router-dom";
import "./Layout.css";

import codegrameenLogo from "../assets/codegrameen-logo.jpg";

function Layout({ children }) {
  return (
    <div className="app-layout">

      {/* Header */}
      <header className="top-header">

        <div className="brand">
          <img
            src={codegrameenLogo}
            alt="CodeGrameen"
            className="codegrameen-logo"
          />
        </div>

        <div className="page-heading">
          <h1>Automobile Automation</h1>
          <p>
            Customer Engagement & Campaign Management
          </p>
        </div>

        <div className="header-right">
          <div className="status">
            <span className="status-dot"></span>
            Demo
          </div>

          <div className="user-profile">
            <div className="user-avatar">
              AS
            </div>

            <span>Abhijeet Sahu</span>

            <span className="user-arrow">
             ⌄
            </span>
          </div>
        </div>

      </header>

      {/* Main Layout */}
      <div className="main-layout">

        {/* Sidebar */}
        <aside className="sidebar">

          {/* Business Card */}
          <div className="business-card">

            <div className="garage-title">
              <span className="garage-icon">🚗</span>

              <div>
                <h2>CodeGrameen's</h2>
                <h3>Auto Garage</h3>
              </div>
            </div>

            <p className="garage-location">
              📍 Dallas, Texas
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;United States
            </p>

            <p>
              We deal in sales and services
              of old cars.
            </p>

          </div>

          {/* Navigation */}
          <nav className="sidebar-nav">

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <span>👥</span>
              Customers
            </NavLink>

            <NavLink
              to="/running-campaigns"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <span>📣</span>
              Running Campaigns
            </NavLink>

            <NavLink
              to="/video-demos"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <span>▶</span>
              Video Demos
            </NavLink>

            <NavLink
              to="/documentation"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <span>📄</span>
              Documentation
            </NavLink>

          </nav>

        </aside>

        {/* Main Content */}
        <main className="page-content">
          {children}
        </main>

      </div>

    </div>
  );
}

export default Layout;