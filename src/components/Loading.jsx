function Loading({ label = 'Đang tải...' }) {
  return (
    <div className="loading" role="status">
      <span className="loader-dot" />
      {label}
    </div>
  )
}

export default Loading
