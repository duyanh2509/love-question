import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const randomSafePosition = () => ({
  top: `${Math.floor(Math.random() * 58) + 18}%`,
  left: `${Math.floor(Math.random() * 52) + 24}%`,
})

function Home() {
  const navigate = useNavigate()
  const [coPosition, setCoPosition] = useState({ top: '58%', left: '30%' })
  const [hoiHoiClickCount, setHoiHoiClickCount] = useState(0)
  const [hoiHoiPosition, setHoiHoiPosition] = useState({ top: '58%', left: '50%' })

  const handleCoHover = () => {
    setCoPosition(randomSafePosition())
  }

  const handleCoClick = (e) => {
    e.preventDefault()
    setCoPosition(randomSafePosition())
  }

  const handleHoiHoiClick = () => {
    if (hoiHoiClickCount < 2) {
      setHoiHoiClickCount(hoiHoiClickCount + 1)
      setHoiHoiPosition(randomSafePosition())
    } else {
      navigate('/question')
    }
  }

  const handleKhongClick = () => {
    navigate('/question')
  }

  return (
    <main className="page home-page">
      <section className="question-card fade-in">
        <div className="mood" aria-hidden="true">
          🥺
        </div>
        <p className="eyebrow">Có người đang chờ câu trả lời</p>
        <h1>Em còn giận anh không?</h1>
        <p className="lead">Trả lời thật lòng nha em...</p>

        <div style={{ position: 'relative', height: '200px', marginTop: '40px' }}>
          {/* Nút Có - nhảy liên tục */}
          <button
            className="button primary-button"
            style={{
              position: 'absolute',
              top: coPosition.top,
              left: coPosition.left,
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={handleCoHover}
            onClick={handleCoClick}
          >
            Có
          </button>

          {/* Nút Hơi hơi - nhảy 3 lần */}
          <button
            className="button secondary-button"
            style={{
              position: 'absolute',
              top: hoiHoiPosition.top,
              left: hoiHoiPosition.left,
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.3s ease',
            }}
            onClick={handleHoiHoiClick}
          >
            Hơi hơi {hoiHoiClickCount > 0 ? `(${hoiHoiClickCount}/2)` : ''}
          </button>

          {/* Nút Không - bình thường */}
          <button
            className="button primary-button"
            style={{
              position: 'absolute',
              top: '58%',
              left: '70%',
              transform: 'translate(-50%, -50%)',
            }}
            onClick={handleKhongClick}
          >
            Không
          </button>
        </div>
      </section>
    </main>
  )
}

export default Home
