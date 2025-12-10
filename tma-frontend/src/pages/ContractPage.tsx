import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const currencies = ['USD', 'EUR', 'RUB', 'TON']

export function ContractPage() {
  const navigate = useNavigate()
  const [monthlyAmount, setMonthlyAmount] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isFormValid = monthlyAmount && Number(monthlyAmount) > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsSubmitting(true)

    // Имитация отправки в блокчейн
    setTimeout(() => {
      setIsSubmitting(false)
      
      // Создаём JSON контракта (как в PROJECT_CONTEXT.md)
      const contract = {
        metadata: {
          contractId: `kindred-${Date.now()}`,
          createdAt: new Date().toISOString(),
          version: '1.0',
        },
        parties: {
          initiator: {
            tonAddress: '0:abc...', // TODO: получить из TON Connect
            telegramId: '@user',
          },
          counterparty: {
            tonAddress: '0:def...',
            telegramId: '@partner',
          },
        },
        terms: {
          financial: {
            monthlyPayment: Number(monthlyAmount),
            currency: currency,
          },
        },
        signatures: {
          initiatorAgreedAt: new Date().toISOString(),
          counterpartyAgreedAt: null,
        },
      }

      console.log('Contract JSON:', JSON.stringify(contract, null, 2))
      
      alert(
        `✅ Контракт создан!\n\n` +
        `ID: ${contract.metadata.contractId}\n` +
        `Сумма: ${monthlyAmount} ${currency}/мес\n\n` +
        `В реальном приложении:\n` +
        `1. JSON будет канонизирован\n` +
        `2. Загружен в IPFS/TON Storage\n` +
        `3. Хэш записан в блокчейн TON`
      )

      navigate(-1)
    }, 2000)
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
          <h1 className="text-2xl font-bold">Новый контракт</h1>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📝</span>
            <div>
              <h3 className="font-medium text-blue-600">Децентрализованный контракт</h3>
              <p className="text-sm text-tg-hint mt-1">
                Контракт будет сохранён в формате JSON, загружен в IPFS и зафиксирован в блокчейне TON
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Financial Terms Section */}
          <div className="bg-tg-secondary/30 rounded-2xl p-4 space-y-4">
            <h2 className="font-semibold flex items-center gap-2">
              <span>💰</span>
              Финансовые условия
            </h2>

            {/* Monthly Amount */}
            <div className="space-y-2">
              <label htmlFor="amount" className="block text-sm font-medium text-tg-hint">
                Сумма в месяц
              </label>
              <input
                type="number"
                id="amount"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(e.target.value)}
                placeholder="Введите сумму"
                min="1"
                className="w-full px-4 py-3 rounded-xl bg-tg-bg border border-tg-secondary focus:border-tg-button focus:outline-none transition-colors placeholder:text-tg-hint/50"
              />
            </div>

            {/* Currency Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-tg-hint">
                Валюта
              </label>
              <div className="grid grid-cols-4 gap-2">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setCurrency(curr)}
                    className={`py-2 px-3 rounded-xl font-medium transition-all ${
                      currency === curr
                        ? 'bg-tg-button text-tg-button-text'
                        : 'bg-tg-bg border border-tg-secondary hover:border-tg-hint'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contract Preview */}
          {isFormValid && (
            <div className="bg-tg-secondary/30 rounded-2xl p-4 space-y-3">
              <h2 className="font-semibold flex items-center gap-2">
                <span>👁️</span>
                Превью контракта
              </h2>
              <div className="bg-tg-bg rounded-xl p-3 font-mono text-sm overflow-x-auto">
                <pre className="text-tg-hint">
{`{
  "terms": {
    "financial": {
      "monthlyPayment": ${monthlyAmount},
      "currency": "${currency}"
    }
  }
}`}
                </pre>
              </div>
            </div>
          )}

          {/* Blockchain Info */}
          <div className="flex items-center gap-3 text-sm text-tg-hint">
            <span className="text-lg">⛓️</span>
            <span>Будет записано в TON Testnet</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-4 px-6 font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
              isFormValid && !isSubmitting
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90'
                : 'bg-tg-secondary text-tg-hint cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Отправка в блокчейн...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Подписать и отправить в блокчейн</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

