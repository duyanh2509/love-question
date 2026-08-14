import { Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin.jsx'
import FirebaseTest from './pages/FirebaseTest.jsx'
import Home from './pages/Home.jsx'
import IdentityGate from './pages/IdentityGate.jsx'
import Question from './pages/Question.jsx'
import Success from './pages/Success.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<IdentityGate />} />
      <Route path="/home" element={<Home />} />
      <Route path="/question" element={<Question />} />
      <Route path="/success" element={<Success />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/firebase-test" element={<FirebaseTest />} />
    </Routes>
  )
}

export default App
