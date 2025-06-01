import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './GoogleLoginPage.css';

const GoogleLoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: 'YOUR_GOOGLE_CLIENT_ID', // 여기에 클라이언트 ID 입력
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById('google-button'),
      { theme: 'outline', size: 'large' }
    );
  }, []);

  const handleCredentialResponse = async (response) => {
    const credential = response.credential;

    try {
      const res = await fetch('http://localhost:8080/member/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        navigate('/main');
      } else {
        alert('로그인 실패');
      }
    } catch (err) {
      console.error('서버 오류:', err);
    }
  };

  return (
    <div className="google-login-wrapper">
      <div className="google-login-card">
        <h2 className="google-login-title">Google 계정 로그인</h2>
        <div id="google-button"></div>
      </div>
    </div>
  );
};

export default GoogleLoginPage;
