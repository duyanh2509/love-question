import { useState } from 'react'
import YesNoButtons from '../components/YesNoButtons.jsx'

const randomSafePosition = () => ({
  top: `${Math.floor(Math.random() * 58) + 18}%`,
  left: `${Math.floor(Math.random() * 52) + 24}%`,
})

function Home() {
  const [noPosition, setNoPosition] = useState({ top: '68%', left: '50%' })

  return (
    <main className="page home-page">
      <section className="question-card fade-in">
        <div className="mood" aria-hidden="true">
          🥺
        </div>
        <p className="eyebrow">Có người đang chờ câu trả lời</p>
        <h1>Em có đồng ý hết giận không?</h1>
        <p className="lead">
          Nếu đồng ý thì mình lên kế hoạch Chủ Nhật thật dễ thương nha.
        </p>
        <YesNoButtons
          noPosition={noPosition}
          onNoClick={() => setNoPosition(randomSafePosition())}
        />
      </section>
    </main>
  )
}

export default Home
