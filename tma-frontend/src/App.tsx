import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { MatchingPage } from './pages/MatchingPage'
import { ChatPage } from './pages/ChatPage'
import { ContractPage } from './pages/ContractPage'

function App() {
  return (
    <BrowserRouter>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '12px',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/contract/new" element={<ContractPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
