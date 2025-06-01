// src/pages/RankingPage/RankingPage.jsx
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import './RankingPage.css'

import unrankIcon   from '../../assets/RankingTiers/unrank.png'
import bronzeIcon   from '../../assets/RankingTiers/Bronze.png'
import silverIcon   from '../../assets/RankingTiers/Silver.png'
import goldIcon     from '../../assets/RankingTiers/Gold.png'
import platinumIcon from '../../assets/RankingTiers/Platinum.png'
import diamondIcon  from '../../assets/RankingTiers/diamond.png'

const season1 = [
  { name: '김탑싯', ranks: [20, 20, 20, 20, 20, 20] },
  // … 나머지 데이터
]
const empty = { name:'', ranks:['','','','','',''] }
const all = {
  1: [...season1, ...Array(20 - season1.length).fill(empty)],
  2: Array(20).fill(empty),
  3: Array(20).fill(empty),
  4: Array(20).fill(empty),
}

function getIcon(score) {
  if (score <= 20) return unrankIcon
  if (score <= 40) return bronzeIcon
  if (score <= 60) return silverIcon
  if (score <= 80) return goldIcon
  if (score <= 100) return platinumIcon
  return diamondIcon
}

const RankingPage = () => {
  const location = useLocation()
  // '/ranking/history' 일 때만 시즌 탭을 보여줌
  const isHistory = location.pathname === '/ranking/history'

  const [season, setSeason] = useState(1)
  const data = all[season]

  return (
    <div className="ranking-wrapper">
      {isHistory && (
        <div className="season-tabs">
          {[1, 2, 3, 4].map(n => (
            <button
              key={n}
              className={season === n ? 'active' : ''}
              onClick={() => setSeason(n)}
            >
              시즌 {n}
            </button>
          ))}
        </div>
      )}

      <div className="ranking-table-wrapper">
        <table className="ranking-table">
          <thead>
            <tr>
              <th>순위</th>
              <th>이름</th>
              <th>티어</th>
              <th>총점</th>
              {[1,2,3,4,5,6].map(n => (
                <th key={n}>{n}영역</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((u, i) => {
              const total = u.ranks.reduce((a, b) => a + (b || 0), 0)
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{u.name}</td>
                  <td>
                    {u.name
                      ? <img src={getIcon(total)} className="tier-icon" alt="tier" />
                      : <div className="tier-placeholder" />
                    }
                  </td>
                  <td>{total}</td>
                  {u.ranks.map((v, j) => <td key={j}>{v}</td>)}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RankingPage
