import { TonConnectButton } from '@tonconnect/ui-react'
import { useNavigate } from 'react-router-dom'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-tg-bg text-tg-text flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-6 max-w-md">
        {/* Logo */}
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg">
          <span className="text-4xl">💜</span>
        </div>
        
        {/* Title */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Kindred
        </h1>

        {/* TON Connect Button */}
        <div className="flex justify-center">
          <TonConnectButton />
        </div>
        
        {/* Subtitle */}
        <p className="text-tg-hint text-lg">
          Платформа для осознанного совместного родительства
        </p>
        
        {/* Features */}
        <div className="space-y-3 text-left bg-tg-secondary/50 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">🔗</span>
            <span>TON Connect авторизация</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">📝</span>
            <span>Децентрализованные контракты</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">💬</span>
            <span>Безопасное общение</span>
          </div>
        </div>
        
        {/* CTA Button */}
        <button 
          onClick={() => navigate('/profile')}
          className="w-full py-4 px-6 bg-tg-button text-tg-button-text font-semibold rounded-xl shadow-md hover:opacity-90 transition-opacity"
        >
          Начать
        </button>
        
        {/* Version */}
        <p className="text-tg-hint text-sm">
          v0.1.0 • MVP
        </p>
      </div>
    </div>
  )
}

