// src/components/CommonNav.jsx
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './CommonNav.css'
import logoIcon   from '../assets/TopcitLogo.png'
import logoutIcon from '../assets/logout-Icon.png'

const CommonNav = ({ isLoggedIn, onLogout }) => (
  <header className="header">
    <Link to="/" className="logo">
      <img src={logoIcon} alt="Topcit Logo" className="logo-icon" />
      <div className="logo-text">
        <span className="logo-text-bold">Topcit</span>
        <span className="logo-text-regular"> on the</span>
        <div><span className="logo-sub">HOSEO</span></div>
      </div>
    </Link>

    <nav className="nav-menu">
      <NavLink to="/topcit-test" className={({isActive})=>isActive?'active':''}>
        TOPCIT TEST
      </NavLink>

      <div className="dropdown-wrapper">
        <NavLink
          to="/ranking"
          className={({isActive})=> isActive ? 'active ranking-button' : 'ranking-button'}
        >
          RANKING
        </NavLink>
        <div className="dropdown-menu">
          <NavLink to="/ranking" className="dropdown-item">ranking</NavLink>
          <NavLink to="/ranking/history" className="dropdown-item">history</NavLink>
        </div>
      </div>

      <NavLink to="/mypage" className={({isActive})=>isActive?'active':''}>
        MY PAGE
      </NavLink>

      {isLoggedIn
        ? <button className="logout" onClick={onLogout}>
            LOGOUT <img src={logoutIcon} alt="Logout" className="logout-icon" />
          </button>
        : <NavLink to="/login" className="logout">
            LOGIN <img src={logoutIcon} alt="Login" className="logout-icon" />
          </NavLink>
      }
    </nav>
  </header>
)

export default CommonNav
