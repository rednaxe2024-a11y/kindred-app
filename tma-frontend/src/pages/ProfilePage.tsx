import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Role = 'mom' | 'dad' | null

export function ProfilePage() {
  const navigate = useNavigate()
  const [role, setRole] = useState<Role>(null)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [city, setCity] = useState('')

  const isFormValid = role && name.trim() && age && city.trim()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    
    // TODO: Сохранить профиль в Zustand store и отправить на backend
    console.log('Profile saved:', { role, name, age, city })
    alert('Профиль сохранён!')
  }

  return (
    <div className="min-h-screen bg-tg-bg text-tg-text p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-tg-secondary/50 hover:bg-tg-secondary transition-colors"
          >
            ←
          </button>
          <h1 className="text-2xl font-bold">Создание профиля</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-tg-hint">
              Выберите вашу роль
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('mom')}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  role === 'mom'
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-tg-secondary bg-tg-secondary/30 hover:border-tg-hint'
                }`}
              >
                <div className="text-3xl mb-2">👩</div>
                <div className="font-medium">Я мама</div>
              </button>
              <button
                type="button"
                onClick={() => setRole('dad')}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  role === 'dad'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-tg-secondary bg-tg-secondary/30 hover:border-tg-hint'
                }`}
              >
                <div className="text-3xl mb-2">👨</div>
                <div className="font-medium">Я папа</div>
              </button>
            </div>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-tg-hint">
              Имя
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите ваше имя"
              className="w-full px-4 py-3 rounded-xl bg-tg-secondary/50 border border-tg-secondary focus:border-tg-button focus:outline-none transition-colors placeholder:text-tg-hint/50"
            />
          </div>

          {/* Age Input */}
          <div className="space-y-2">
            <label htmlFor="age" className="block text-sm font-medium text-tg-hint">
              Возраст
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Введите ваш возраст"
              min="18"
              max="99"
              className="w-full px-4 py-3 rounded-xl bg-tg-secondary/50 border border-tg-secondary focus:border-tg-button focus:outline-none transition-colors placeholder:text-tg-hint/50"
            />
          </div>

          {/* City Input */}
          <div className="space-y-2">
            <label htmlFor="city" className="block text-sm font-medium text-tg-hint">
              Город
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Введите ваш город"
              className="w-full px-4 py-3 rounded-xl bg-tg-secondary/50 border border-tg-secondary focus:border-tg-button focus:outline-none transition-colors placeholder:text-tg-hint/50"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-4 px-6 font-semibold rounded-xl shadow-md transition-all ${
              isFormValid
                ? 'bg-tg-button text-tg-button-text hover:opacity-90'
                : 'bg-tg-secondary text-tg-hint cursor-not-allowed'
            }`}
          >
            Сохранить
          </button>

          {/* Find Partner Button */}
          <button
            type="button"
            onClick={() => navigate('/matching')}
            className="w-full py-4 px-6 font-semibold rounded-xl shadow-md transition-all bg-gradient-to-r from-pink-500 to-red-500 text-white hover:opacity-90 flex items-center justify-center gap-2"
          >
            <span>❤️</span>
            <span>Искать партнера</span>
          </button>
        </form>
      </div>
    </div>
  )
}

