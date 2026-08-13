import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Loading from '../components/Loading.jsx'
import {
  getFirebaseSetupErrorMessage,
  subscribeToResponses,
} from '../services/responseService.js'

const ADMIN_PASSCODE = 'yeuem'

const formatDate = (value) => {
  if (!value) return 'Chưa có thời gian'

  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function Admin() {
  const location = useLocation()
  const [passcode, setPasscode] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(
    () => location.state?.unlockedByIdentityGate === true,
  )
  const [responses, setResponses] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isUnlocked) return

    console.log('🔥 Admin: Setting up real-time listener')
    setIsLoading(true)
    setError('')

    // Đăng ký lắng nghe real-time updates từ Firestore
    const unsubscribe = subscribeToResponses(
      (newResponses) => {
        console.log('🔥 Admin: Received', newResponses.length, 'responses')
        setResponses(newResponses)
        setIsLoading(false)
      },
      (loadError) => {
        console.error('❌ Admin: Error loading responses', loadError)
        setError(getFirebaseSetupErrorMessage(loadError))
        setIsLoading(false)
      },
    )

    // Cleanup: Hủy đăng ký khi component unmount
    return () => {
      console.log('🔥 Admin: Cleaning up listener')
      unsubscribe()
    }
  }, [isUnlocked])

  const handleLogin = (event) => {
    event.preventDefault()
    setError('')

    if (passcode === ADMIN_PASSCODE) {
      setIsUnlocked(true)
      return
    }

    setError('Mật khẩu admin chưa đúng.')
  }

  if (!isUnlocked) {
    return (
      <main className="page">
        <form className="admin-login fade-in" onSubmit={handleLogin}>
          <p className="eyebrow">Admin</p>
          <h1>Xem câu trả lời</h1>
          <input
            aria-label="Mật khẩu admin"
            placeholder="Nhập mật khẩu admin"
            type="password"
            value={passcode}
            onChange={(event) => setPasscode(event.target.value)}
          />
          {error ? <p className="error-message">{error}</p> : null}
          <button className="button primary-button" type="submit">
            Mở admin
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="page">
      <section className="admin-shell fade-in">
        <header className="page-header">
          <p className="eyebrow">Kết quả ❤</p>
          <h1>Responses: {responses.length}</h1>
        </header>

        {isLoading ? <Loading label="Đang đọc câu trả lời..." /> : null}
        {error ? <p className="error-message">{error}</p> : null}

        {!isLoading && responses.length === 0 ? (
          <p className="empty-state">Chưa có câu trả lời nào.</p>
        ) : null}

        <div className="response-list">
          {responses.map((response, index) => (
            <article className="response-card" key={response.id}>
              <div className="response-card-header">
                <strong>#{index + 1}</strong>
                <span>{formatDate(response.createdAt)}</span>
              </div>
              <p>
                <strong>Hết giận:</strong> Có ❤
              </p>
              <p>
                <strong>Chủ nhật ăn:</strong> {response.food || 'Chưa chọn'}
              </p>
              {response.message ? (
                <p>
                  <strong>Lời nhắn:</strong> “{response.message}”
                </p>
              ) : null}
              <small>Nguồn lưu: {response.storage || 'firebase'}</small>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Admin
