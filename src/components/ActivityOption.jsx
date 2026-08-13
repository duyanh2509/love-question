function ActivityOption({ checked, icon, label, onChange, type = 'checkbox' }) {
  return (
    <label className={`option-tile ${checked ? 'is-selected' : ''}`}>
      <input type={type} checked={checked} onChange={onChange} />
      <span className="option-mark" aria-hidden="true">
        {checked ? '✓' : ''}
      </span>
      <span className="option-icon">{icon}</span>
      <span>{label}</span>
    </label>
  )
}

export default ActivityOption
