import { Routes, Route, Navigate } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
import AdminPage from './pages/AdminPage'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div className="min-h-screen bg-wa-bg">
      <Navbar />
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}
