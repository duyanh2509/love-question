import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ActivityOption from '../components/ActivityOption.jsx'
import { isFirebaseConfigured } from '../firebase/config.js'
import { getFirebaseSetupErrorMessage, saveResponse } from '../services/responseService.js'

const foodOptions = [
  'Ngan cháy tỏi',
  'Cơm gà',
  'Gà tần',
  'Texas',
  'Đồ Hàn đối diện pet shop',
  'Tiệm gà óng ánh',
  'Khác',
]

function SundayPlan() {
  const navigate = useNavigate()
  const [food, setFood] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!food) {
      setError('Chọn một món ăn trước khi lưu nha.')
      return
    }

    setIsSaving(true)

    try {
      const savedResponse = await saveResponse({
        activities: ['Ăn Chủ Nhật'],
        food,
        message,
      })
      navigate('/success', { state: { response: savedResponse } })
    } catch (saveError) {
      setError(getFirebaseSetupErrorMessage(saveError))
      console.error(saveError)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="page">
      <form className="plan-shell fade-in" onSubmit={handleSubmit}>
        <header className="page-header">
          <p className="eyebrow">Kế hoạch làm lành</p>
          <h1>Chủ nhật muốn ăn gì?</h1>
        </header>

        {!isFirebaseConfigured ? (
          <p className="notice-message">
            Firebase chưa được cấu hình, dữ liệu hiện chỉ lưu thử trên trình duyệt này.
          </p>
        ) : null}

        <section className="form-section first-form-section">
          <div className="food-grid">
            {foodOptions.map((foodOption) => (
              <ActivityOption
                key={foodOption}
                checked={food === foodOption}
                icon="🍽️"
                label={foodOption}
                type="radio"
                onChange={() => setFood(foodOption)}
              />
            ))}
          </div>
        </section>

        <section className="form-section">
          <label className="message-label" htmlFor="message">
            Em muốn nói gì với anh không? ❤
          </label>
          <textarea
            id="message"
            value={message}
            placeholder="Viết lời nhắn nhỏ ở đây..."
            rows={5}
            onChange={(event) => setMessage(event.target.value)}
          />
        </section>

        {error ? <p className="error-message">{error}</p> : null}

        <button className="button primary-button save-button" type="submit" disabled={isSaving}>
          {isSaving ? 'Đang lưu...' : 'Lưu lựa chọn ❤'}
        </button>
      </form>
    </main>
  )
}

export default SundayPlan
