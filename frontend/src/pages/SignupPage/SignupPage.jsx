// SignupPage.jsx
import React, { useEffect } from 'react';
import SignupForm from '../../components/SignupForm';
import './SignupPage.css';

const SignupPage = () => {
  useEffect(() => {
    // 이메일이 localStorage에 없으면 로그인 페이지로 강제 이동
    const email = localStorage.getItem('google_email');
    if (!email) {
      window.location.href = '/';
    }
  }, []);

  return (
    <div className="signup-page-wrapper">
      <div className="signup-card">
        <h2 className="signup-title">회원가입</h2>

        {/* 회원가입 입력 폼 */}
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
