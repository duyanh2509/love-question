import { Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin.jsx'
import Home from './pages/Home.jsx'
import IdentityGate from './pages/IdentityGate.jsx'
import Success from './pages/Success.jsx'
import SundayPlan from './pages/SundayPlan.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<IdentityGate />} />
      <Route path="/question" element={<Home />} />
      <Route path="/sunday" element={<SundayPlan />} />
      <Route path="/success" element={<Success />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App
