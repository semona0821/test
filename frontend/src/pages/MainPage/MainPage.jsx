import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SelectionModal from '../../components/SelectionModal.jsx'
import HeroImg    from '../../assets/MainPage.png'
import FooterLogo from '../../assets/TopcitClearLogo.png'
import './MainPage.css'

const MainPage = ({ isLoggedIn }) => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const handleStart = () => {
    if (!isLoggedIn) {
      navigate('/login')
    } else {
      setShowModal(true)
    }
  }

  const handleSelect = (areaKey) => {
    setShowModal(false)
    // areaKey 를 필요하면 query나 state 로 넘길 수 있습니다:
    // navigate('/topcit-test', { state: { area: areaKey } })
    navigate('/topcit-test')
  }

  return (
    <div className="main-page">
      <div className="hero-container">
        <div className="tagline-card">
          <span className="tagline-icon">⭐</span>
          <div className="tagline-text">
            <div className="tagline-title">Topcit</div>
            <div className="tagline-subtitle">
              Test Of Practical Competency in IT
            </div>
          </div>
        </div>

        <div className="hero">
          <div className="hero-text">
            <h1 className="hero-title">
              Are you <br /> a Competent Developer?
            </h1>
            <p className="hero-subtitle">
              Improve your Practical Competency with Topcit on the HOSEO
            </p>
          </div>

          <div className="hero-media">
            <img src={HeroImg} alt="Hero Target" className="hero-img" />
            <button className="hero-button" onClick={handleStart}>
              START
            </button>
          </div>
        </div>
      </div>

      <footer className="hero-footer">
        <img src={FooterLogo} alt="Footer Logo" />
      </footer>

      {showModal && (
        <SelectionModal
          onClose={() => setShowModal(false)}
          onSelect={handleSelect}
        />
      )}
    </div>
  )
}

export default MainPage
