import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Candidate {
  id: string
  name: string
  age: number
  city: string
  role: 'mom' | 'dad'
  compatibility: number
  photo: string
  values: string[]
}

// Моковые данные кандидатов
const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Мария',
    age: 32,
    city: 'Москва',
    role: 'mom',
    compatibility: 94,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
    values: ['Образование', 'Здоровье', 'Творчество'],
  },
  {
    id: '2',
    name: 'Анна',
    age: 29,
    city: 'Санкт-Петербург',
    role: 'mom',
    compatibility: 87,
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
    values: ['Спорт', 'Путешествия', 'Семья'],
  },
  {
    id: '3',
    name: 'Елена',
    age: 35,
    city: 'Москва',
    role: 'mom',
    compatibility: 82,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
    values: ['Карьера', 'Образование', 'Культура'],
  },
  {
    id: '4',
    name: 'Ольга',
    age: 31,
    city: 'Казань',
    role: 'mom',
    compatibility: 79,
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop',
    values: ['Природа', 'Здоровье', 'Семья'],
  },
]

export function MatchingPage() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)
  const [matches, setMatches] = useState<string[]>([])

  const currentCandidate = mockCandidates[currentIndex]
  const isFinished = currentIndex >= mockCandidates.length

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isFinished) return

    setSwipeDirection(direction)
    
    if (direction === 'right') {
      setMatches(prev => [...prev, currentCandidate.id])
      // При лайке — переходим в чат с этим кандидатом
      setTimeout(() => {
        navigate(`/chat/${currentCandidate.id}`)
      }, 400)
      return
    }

    // Анимация и переход к следующей карточке
    setTimeout(() => {
      setSwipeDirection(null)
      setCurrentIndex(prev => prev + 1)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-tg-bg text-tg-text flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-tg-secondary/50 hover:bg-tg-secondary transition-colors"
        >
          ←
        </button>
        <h1 className="text-xl font-bold">Поиск партнера</h1>
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-tg-secondary/50 text-sm">
          {matches.length} ❤️
        </div>
      </div>

      {/* Card Container */}
      <div className="flex-1 flex items-center justify-center p-4">
        {isFinished ? (
          <div className="text-center space-y-6 p-8">
            <div className="text-6xl">🎉</div>
            <h2 className="text-2xl font-bold">Вы просмотрели всех!</h2>
            <p className="text-tg-hint">
              У вас {matches.length} совпадений
            </p>
            <button
              onClick={() => {
                setCurrentIndex(0)
                setMatches([])
              }}
              className="px-6 py-3 bg-tg-button text-tg-button-text rounded-xl font-medium"
            >
              Начать заново
            </button>
          </div>
        ) : (
          <div 
            className={`relative w-full max-w-sm transition-all duration-300 ${
              swipeDirection === 'left' ? '-translate-x-full rotate-[-20deg] opacity-0' : ''
            } ${
              swipeDirection === 'right' ? 'translate-x-full rotate-[20deg] opacity-0' : ''
            }`}
          >
            {/* Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Photo */}
              <div className="relative h-96">
                <img 
                  src={currentCandidate.photo} 
                  alt={currentCandidate.name}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Compatibility Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-green-500 text-white rounded-full font-bold text-sm flex items-center gap-1">
                  <span>💚</span>
                  <span>{currentCandidate.compatibility}%</span>
                </div>

                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-3xl font-bold">
                    {currentCandidate.name}, {currentCandidate.age}
                  </h2>
                  <p className="text-white/80 flex items-center gap-1 mt-1">
                    <span>📍</span> {currentCandidate.city}
                  </p>
                </div>
              </div>

              {/* Values */}
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-2">Ценности воспитания:</p>
                <div className="flex flex-wrap gap-2">
                  {currentCandidate.values.map((value) => (
                    <span 
                      key={value}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Swipe Indicators */}
            {swipeDirection === 'left' && (
              <div className="absolute top-1/2 left-8 -translate-y-1/2 text-6xl animate-pulse">
                ❌
              </div>
            )}
            {swipeDirection === 'right' && (
              <div className="absolute top-1/2 right-8 -translate-y-1/2 text-6xl animate-pulse">
                ❤️
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {!isFinished && (
        <div className="p-6 flex justify-center gap-8">
          <button
            onClick={() => handleSwipe('left')}
            className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-lg border-2 border-red-200 hover:border-red-400 hover:scale-110 transition-all active:scale-95"
          >
            <span className="text-3xl">❌</span>
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-red-500 shadow-lg hover:scale-110 transition-all active:scale-95"
          >
            <span className="text-3xl">❤️</span>
          </button>
        </div>
      )}

      {/* Progress */}
      {!isFinished && (
        <div className="px-6 pb-6">
          <div className="h-1 bg-tg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / mockCandidates.length) * 100}%` }}
            />
          </div>
          <p className="text-center text-tg-hint text-sm mt-2">
            {currentIndex + 1} из {mockCandidates.length}
          </p>
        </div>
      )}
    </div>
  )
}

