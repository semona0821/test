import React, { useState } from 'react';
import CommonNav  from '../../components/CommonNav.jsx';
import tierBanner from '../../assets/DiamonTier.png';
import './MyPage.css';

const MyPage = () => {
  const [nickname, setNickname] = useState('호서대 님');
  const [editMode, setEditMode] = useState(false);
  const [newNick, setNewNick]   = useState('');
  const [message, setMessage]   = useState('');

  const handleSave = () => {
    if (!newNick) {
      setMessage('닉네임을 입력해주세요!');
      return;
    }
    if (newNick === '중복') {
      setMessage('닉네임이 중복입니다!');
      return;
    }
    setNickname(newNick + ' 님');
    setMessage('닉네임이 변경되었습니다!');
    setEditMode(false);
  };

  return (
    <div className="mypage-wrapper">

      <div className="mypage-container">
        <h2 className="mypage-title">MYPAGE</h2>

        <div className="mypage-content">
          {/* 왼쪽: 통합 배너 이미지 + 닉네임 변경 버튼 */}
          <div className="banner-section">
            <img
              src={tierBanner}
              alt="Tier Banner"
              className="tier-banner-img"
            />
            {editMode ? (
              <div className="nick-edit-inline">
                <input
                  type="text"
                  className="nick-input"
                  placeholder="새 닉네임"
                  value={newNick}
                  onChange={e => setNewNick(e.target.value)}
                />
                <button className="btn-save" onClick={handleSave}>
                  저장
                </button>
              </div>
            ) : (
              <button
                className="btn-edit-inline"
                onClick={() => setEditMode(true)}
              >
                {nickname} ⚙️
              </button>
            )}
            {message && <p className="nick-message">{message}</p>}
          </div>

          {/* 오른쪽: 점수 리스트 */}
          <ul className="score-section">
            <li>소프트웨어 개발:<span>20점</span></li>
            <li>데이터 이해와 활용:<span>20점</span></li>
            <li>시스템 아키텍처 이해와 활용:<span>20점</span></li>
            <li>정보 보안 이해와 활용:<span>20점</span></li>
            <li>IT 비즈니스와 윤리:<span>20점</span></li>
            <li>프로젝트 관리 및 커뮤니케이션:<span>20점</span></li>
          </ul>
        </div>
      </div>
    </div>
);

};

export default MyPage;
