import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import CommonNav       from './components/CommonNav.jsx'
import MainPage        from './pages/MainPage/MainPage.jsx'
import LoginPage       from './pages/LoginPage/LoginPage.jsx'
import GoogleLoginPage from './pages/GoogleLoginPage/GoogleLoginPage.jsx'
import SignupPage      from './pages/SignupPage/SignupPage.jsx'
import TopcitTestPage  from './pages/TopcitTestPage/TopcitTestPage.jsx'
import RankingPage     from './pages/RankingPage/RankingPage.jsx'
import MyPage          from './pages/MyPage/MyPage.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => Boolean(localStorage.getItem('nickname'))
  )

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('nickname')
    localStorage.removeItem('password')
  }

  return (
    <Router>
      <CommonNav isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={<MainPage isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/login"
          element={<LoginPage onLoginSuccess={handleLogin} />}
        />
        <Route path="/google-login" element={<GoogleLoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/topcit-test"
          element={
            isLoggedIn
              ? <TopcitTestPage />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/ranking"
          element={
            isLoggedIn
              ? <RankingPage />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/ranking/history"
          element={
            isLoggedIn
              ? <RankingPage />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/mypage"
          element={
            isLoggedIn
              ? <MyPage />
              : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
