import { TonConnectButton } from '@tonconnect/ui-react'
import { useNavigate } from 'react-router-dom'
import kindredLogo from '../assets/kindred-logo.jpg'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-tg-bg text-tg-text flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-6 max-w-md">
        {/* Logo */}
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-2xl ring-4 ring-white/20">
          <img 
            src={kindredLogo} 
            alt="Kindred Logo" 
            className="w-full h-full object-cover"
          />
        </div>

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

