import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import googleLogo from '../assets/Google.png'
import SignupModal from './SignupModal.jsx'
import '../pages/LoginPage/LoginPage.css'

const LoginForm = ({ onLoginSuccess }) => {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [showSignupModal, setShowSignupModal] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    const storedNick = localStorage.getItem('nickname')
    const storedPw   = localStorage.getItem('password')

    if (nickname === storedNick && password === storedPw) {
      onLoginSuccess()
      navigate('/', { replace: true })
    } else {
      setShowSignupModal(true)
    }
  }

  const handleGoogleLogin = () => {
    navigate('/google-login')
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form-login">
        <input
          type="text"
          placeholder="닉네임 입력"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <div className="link-row">
          <Link to="/find-password" className="link-find-password">
            비밀번호 찾기
          </Link>
        </div>

        <button type="submit" className="btn-auth">
          로그인
        </button>

        <button
          type="button"
          className="btn-auth btn-google"
          onClick={handleGoogleLogin}
        >
          <img src={googleLogo} alt="Google" className="google-icon" />
          Google 계정으로 로그인
        </button>
      </form>

      {showSignupModal && (
        <SignupModal onClose={() => setShowSignupModal(false)} />
      )}
    </>
  )
}

export default LoginForm
