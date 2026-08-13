import { Link } from 'react-router-dom'

function YesNoButtons({ noPosition, onNoClick }) {
  return (
    <div className="answer-stage">
      <Link className="button primary-button" to="/sunday">
        Có
        <span aria-hidden="true">❤</span>
      </Link>
      <button
        className="button ghost-button no-button"
        style={noPosition}
        type="button"
        onClick={onNoClick}
        onMouseEnter={onNoClick}
      >
        Không
        <span aria-hidden="true">😭</span>
      </button>
    </div>
  )
}

export default YesNoButtons
