import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './TopcitTestPage.css'

const TopcitTestPage = () => {
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState(null)
  const [showPopup, setShowPopup]       = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const onErrorClick    = () => setShowPopup(true)
  const onNextClick     = () => alert('다음 문제로 이동합니다.')
  const onPreviousClick = () => alert('이전 문제로 이동합니다.')
  const handleOptionClick = idx => setSelectedOption(idx)
  const closePopup      = () => setShowPopup(false)
  const handleSubmitReport = () => {
    alert('신고가 등록되었습니다.')
    setShowPopup(false)
  }

  // (로그아웃만 경고로 대체)
  const onLogoutClick = () => {
    alert('로그아웃 되었습니다.')
    navigate('/')
  }

  return (
    <div className="page-container">
      {/* 문제 풀기 섹션 */}
      <section className="problem-box">
        <div className="button-group">
          <button onClick={onErrorClick}>
            Error <span>!</span>
          </button>
          <button
            onClick={onNextClick}
            disabled={selectedOption === null}
          >
            Next →
          </button>
          <button onClick={onPreviousClick}>← Previous</button>
        </div>

        <h2>
          7. 다음에 대한 원인과 근본적인 해결안을 가장 잘 제시한 의견을 고르시오.
        </h2>
        <div className="problem-content">
          <p>
            (1) A회사는 고객이 회원가입을 하고 첫 주문을 했는데, 고객이 주문을
            취소하는 바람에 고객의 회원가입 정보까지 제거되었다.
          </p>
          <p>
            (2) B회사는 고객이 전화번호를 변경할 경우, 모든 주문 내역의 고객정보를 같이
            수정하여야 한다. 따라서 주기적으로 잘못된 데이터에 대한 데이터 보정작업을
            수행하고 있다
          </p>
        </div>

        <ul className="option-list">
          {[
            '① 최 대리 : 데이터 설계가 잘못되어 이상현상이 발생한 것 같네요. 데이터 모델에 대한 점검이 필요합니다.',
            '② 박 대리 : 프로그램 개발 시 에러처리를 잘못 한 것 같네요. 원하지 않는 데이터에 대한 수정/삭제가 발생하지 않도록 에러처리 단계를 추가해야 합니다.',
            '③ 이 대리 : 트랜잭션 설계가 잘못된 것 같군요. 트랜잭션을 더 작은 단위로 끊어서 주문 변경과 회원정보 변경이 별개로 이루어지도록 해야 할 필요가 있습니다.',
            '④ 김 대리 : 동시성 제어가 안됐군요. 데이터에 대한 락(Lock) 관리 수준을 객체 직렬화(Serializable)로 변경해서 불필요한 데이터 삭제나 변경이 발생하지 않도록 해야 합니다.',
          ].map((option, index) => (
            <li
              key={index}
              className={`option ${
                selectedOption === index ? 'selected' : ''
              }`}
              onClick={() => handleOptionClick(index)}
            >
              {option}
            </li>
          ))}
        </ul>

        <div className="progress">진행률 87%</div>
      </section>

      {/* 팝업 */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-header">
              <span className="popup-icon">❗</span>
              <span className="popup-title">오류 신고</span>
              <button className="popup-close" onClick={closePopup}>
                X
              </button>
            </div>
            <div className="popup-body">
              <label>제목</label>
              <input type="text" className="popup-input" />
              <label>내용</label>
              <textarea className="popup-textarea" rows="5" />
              <button
                className="popup-submit"
                onClick={handleSubmitReport}
              >
                등록하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TopcitTestPage
