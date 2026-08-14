import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DUY_PASSCODE = 'yeuhachi2212'

function IdentityGate() {
  const navigate = useNavigate()
  const [selectedPerson, setSelectedPerson] = useState('')
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')

  const chooseChi = () => {
    setError('')
    navigate('/home')
  }

  const chooseDuy = () => {
    setError('')
    setSelectedPerson('duy')
  }

  const handleDuyLogin = (event) => {
    event.preventDefault()
    setError('')

    if (passcode === DUY_PASSCODE) {
      navigate('/admin', { state: { unlockedByIdentityGate: true } })
      return
    }

    setError('Mật khẩu chưa đúng.')
  }

  return (
    <main className="page identity-page">
      <section className="identity-card fade-in">
        <p className="eyebrow">Trước khi vào</p>
        <h1>Bạn là ai?</h1>

        <div className="identity-actions">
          <button className="button ghost-button identity-button" type="button" onClick={chooseDuy}>
            Duy Anh Bi
          </button>
          <button className="button primary-button identity-button" type="button" onClick={chooseChi}>
            Chi thối
          </button>
        </div>

        {selectedPerson === 'duy' ? (
          <form className="duy-passcode fade-in" onSubmit={handleDuyLogin}>
            <label className="message-label" htmlFor="duy-passcode">
              Nhập mật khẩu của Duy Anh Bi
            </label>
            <input
              id="duy-passcode"
              autoFocus
              type="password"
              value={passcode}
              placeholder="Mật khẩu"
              onChange={(event) => setPasscode(event.target.value)}
            />
            {error ? <p className="error-message">{error}</p> : null}
            <button className="button primary-button save-button" type="submit">
              Xem kết quả
            </button>
          </form>
        ) : null}
      </section>
    </main>
  )
}

export default IdentityGate
