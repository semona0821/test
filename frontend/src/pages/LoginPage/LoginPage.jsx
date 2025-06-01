import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm.jsx';
import footerLogo from '../../assets/TopcitClearLogo.png';
import './LoginPage.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';  // axios 추가

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const LoginPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  // 로그인 성공 시 호출되는 함수
  const handleLoginSuccess = () => {
    onLoginSuccess();  // App.js 상태 변경
    navigate('/');     // 메인 페이지로 이동
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/member/auth/google-login`, {
        credential: response.credential,
      });

      const data = res.data;
      console.log("로그인 성공: ", data);

      // newUser면 회원가입 페이지로 이동
      if (data.newUser) {
        localStorage.setItem("google_email", data.email);
        navigate("/signup", { state: { email: data.email } }); // 이메일 등 전달
        return;
      } else {
        // 기존 유저면 토큰 저장 후 홈으로 이동
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        navigate("/home");
      }

    } catch (err) {
      console.error("로그인 실패:", err);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <h2 className="login-title">로그인</h2>
        <LoginForm onLoginSuccess={handleLoginSuccess} />

        {/* ✅ Google Login Button */}
        <div className="btn-auth btn-google">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => console.log('Google 로그인 실패')}
          />
        </div>

        <div className="login-footer">
          <img
            src={footerLogo}
            alt="Topcit Clear Logo"
            className="footer-logo"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
