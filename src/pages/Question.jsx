import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveResponse } from '../services/responseService.js'

function Question() {
  const navigate = useNavigate()
  const [choice, setChoice] = useState(null) // 'co' hoặc 'khong'
  const [reason, setReason] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const handleCoClick = async () => {
    setChoice('co')
    setIsSaving(true)

    try {
      await saveResponse({
        question1: 'Em còn giận anh không?',
        answer1: 'Hơi hơi / Không',
        question2: 'Nay trời mưa mát em có muốn ăn lẩu dì tâm không?',
        answer2: 'Có',
        reason: '',
      })
    } catch (err) {
      setError('Lỗi lưu dữ liệu')
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleKhongSubmit = async (e) => {
    e.preventDefault()
    
    if (!reason.trim()) {
      setError('Hãy cho anh biết lý do nha em ❤')
      return
    }

    setIsSaving(true)
    setError('')

    try {
      await saveResponse({
        question1: 'Em còn giận anh không?',
        answer1: 'Hơi hơi / Không',
        question2: 'Nay trời mưa mát em có muốn ăn lẩu dì tâm không?',
        answer2: 'Không',
        reason: reason.trim(),
      })
      navigate('/success')
    } catch (err) {
      setError('Lỗi lưu dữ liệu')
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="page">
      <section className="question-card fade-in">
        <div className="mood" aria-hidden="true">
          🌧️
        </div>
        <p className="eyebrow">Câu hỏi tiếp theo</p>
        <h1>Nay trời mưa mát em có muốn ăn lẩu dì tâm không?</h1>

        {choice === null ? (
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
            <button
              className="button primary-button"
              onClick={handleCoClick}
              disabled={isSaving}
            >
              Có
            </button>
            <button
              className="button secondary-button"
              onClick={() => setChoice('khong')}
            >
              Không
            </button>
          </div>
        ) : choice === 'co' ? (
          <div className="success-message" style={{ marginTop: '40px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>❤️</p>
            <p className="lead">
              <strong>Hãy nhắn tin cho bạn zai đẹp zai để lên kế hoạch!</strong>
            </p>
            {isSaving && <p style={{ marginTop: '20px', color: '#666' }}>Đang lưu...</p>}
            {!isSaving && (
              <button
                className="button ghost-button"
                style={{ marginTop: '30px' }}
                onClick={() => navigate('/success')}
              >
                Xong
              </button>
            )}
          </div>
        ) : (
          <form onSubmit={handleKhongSubmit} style={{ marginTop: '40px' }}>
            <label className="message-label" htmlFor="reason">
              Cho anh biết lý do nha em ❤
            </label>
            <textarea
              id="reason"
              value={reason}
              placeholder="Viết lý do ở đây..."
              rows={5}
              onChange={(e) => setReason(e.target.value)}
              style={{ width: '100%', marginTop: '10px', padding: '10px', fontSize: '1rem' }}
            />
            {error ? <p className="error-message" style={{ marginTop: '10px' }}>{error}</p> : null}
            <button
              className="button primary-button"
              type="submit"
              disabled={isSaving}
              style={{ marginTop: '20px', width: '100%' }}
            >
              {isSaving ? 'Đang gửi...' : 'Gửi'}
            </button>
          </form>
        )}
      </section>
    </main>
  )
}

export default Question
