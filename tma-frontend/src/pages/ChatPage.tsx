import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface Message {
  id: string
  text: string
  sender: 'me' | 'partner'
  timestamp: Date
}

// Моковые данные партнёров (те же что в MatchingPage)
const mockPartners: Record<string, { name: string; photo: string }> = {
  '1': { name: 'Мария', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  '2': { name: 'Анна', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  '3': { name: 'Елена', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
  '4': { name: 'Ольга', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop' },
}

// Моковые начальные сообщения
const initialMessages: Message[] = [
  { id: '1', text: 'Привет! Рада познакомиться 👋', sender: 'partner', timestamp: new Date(Date.now() - 3600000) },
  { id: '2', text: 'Привет! Взаимно! Как дела?', sender: 'me', timestamp: new Date(Date.now() - 3500000) },
  { id: '3', text: 'Всё отлично! Изучаю твой профиль, очень интересные ценности воспитания', sender: 'partner', timestamp: new Date(Date.now() - 3400000) },
]

export function ChatPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const partner = mockPartners[id || '1'] || mockPartners['1']

  // Прокрутка к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!inputText.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'me',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, newMessage])
    setInputText('')

    // Имитация ответа партнёра
    setTimeout(() => {
      const responses = [
        'Интересная мысль! 🤔',
        'Согласна с тобой!',
        'Расскажи подробнее?',
        'Это важно для меня тоже',
        'Давай обсудим детали?',
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'partner',
        timestamp: new Date(),
      }])
    }, 1000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="h-screen bg-tg-bg text-tg-text flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center gap-3 border-b border-tg-secondary/50 bg-tg-bg">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-tg-secondary/50 hover:bg-tg-secondary transition-colors"
        >
          ←
        </button>
        
        <img 
          src={partner.photo} 
          alt={partner.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <h1 className="font-bold">{partner.name}</h1>
          <p className="text-xs text-tg-hint">онлайн</p>
        </div>

        <button
          onClick={() => navigate('/contract/new')}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity"
        >
          📝 Контракт
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                message.sender === 'me'
                  ? 'bg-tg-button text-tg-button-text rounded-br-md'
                  : 'bg-tg-secondary/50 rounded-bl-md'
              }`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'me' ? 'text-white/60' : 'text-tg-hint'
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-tg-secondary/50 bg-tg-bg">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Написать сообщение..."
            className="flex-1 px-4 py-3 rounded-xl bg-tg-secondary/50 border border-tg-secondary focus:border-tg-button focus:outline-none transition-colors placeholder:text-tg-hint/50"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all ${
              inputText.trim()
                ? 'bg-tg-button text-tg-button-text hover:opacity-90'
                : 'bg-tg-secondary text-tg-hint'
            }`}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  )
}

