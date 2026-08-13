import { Link, useLocation } from 'react-router-dom'

function Success() {
  const { state } = useLocation()
  const response = state?.response

  return (
    <main className="page success-page">
      <section className="success-card fade-in">
        <div className="success-heart" aria-hidden="true">
          ❤
        </div>
        <p className="eyebrow">Đã lưu rồi</p>
        <h1>Hẹn Chủ Nhật nhé ❤</h1>

        {response ? (
          <div className="summary-list">
            <p>
              <strong>Chủ nhật ăn:</strong> {response.food}
            </p>
            {response.message ? (
              <p>
                <strong>Lời nhắn:</strong> “{response.message}”
              </p>
            ) : null}
          </div>
        ) : (
          <p className="lead">Lựa chọn của em đã được lưu nếu vừa gửi thành công.</p>
        )}

        <Link className="button ghost-button" to="/">
          Quay lại
        </Link>
      </section>
    </main>
  )
}

export default Success
