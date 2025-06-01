import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  const [nickname, setNickname]       = useState('');
  const [password, setPassword]       = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showCheckIcon, setShowCheckIcon] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('password', password);
    alert('회원가입 완료! 로그인 페이지로 이동합니다.');
    navigate('/login', { replace: true });
  };

  const handleDuplicateCheck = () => {
    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    const storedNick = localStorage.getItem('nickname');
    if (storedNick && storedNick === nickname) {
      alert('이미 사용 중인 닉네임입니다.');
    } else {
      alert('사용 가능한 닉네임입니다.');
    }
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    setShowCheckIcon(true);
  };

  const handleConfirmChange = e => {
    setPasswordConfirm(e.target.value);
    setShowCheckIcon(true);
  };

  const isMatch =
    showCheckIcon && password && passwordConfirm
      ? password === passwordConfirm
      : null;

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="input-group">
        <input
          type="text"
          placeholder="닉네임 입력"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          required
        />
        <button
          type="button"
          className="btn-dupcheck"
          onClick={handleDuplicateCheck}
        >
          중복 확인
        </button>
      </div>

      <div className="input-group">
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>

      <div className="input-group">
        <input
          type="password"
          placeholder="비밀번호 재입력"
          value={passwordConfirm}
          onChange={handleConfirmChange}
          required
        />
        {isMatch !== null && (
          <span className={`check-icon ${isMatch ? 'match' : 'nomatch'}`}>
            {isMatch ? '✓' : '✕'}
          </span>
        )}
      </div>

      <button type="submit" className="btn-signup">
        가입하기
      </button>
    </form>
  );
};

export default SignupForm;
