#!/bin/bash

# Скрипт инициализации фронтенда Kindred TMA
# Vite + React + TypeScript + все зависимости из PROJECT_CONTEXT.md

set -e  # Остановиться при ошибке

echo "🚀 Инициализация Kindred TMA Frontend..."
echo ""

# Переходим в папку проекта
cd "$(dirname "$0")"

# Удаляем старую папку tma-frontend если есть содержимое
if [ -d "tma-frontend" ] && [ "$(ls -A tma-frontend 2>/dev/null)" ]; then
    echo "⚠️  Папка tma-frontend не пустая. Очищаем..."
    rm -rf tma-frontend
    mkdir -p tma-frontend
fi

# Создаём Vite проект с React + TypeScript
echo "📦 Создаём Vite + React + TypeScript проект..."
npm create vite@latest tma-frontend -- --template react-ts

# Переходим в папку фронтенда
cd tma-frontend

# Устанавливаем базовые зависимости
echo ""
echo "📦 Устанавливаем базовые зависимости..."
npm install

# Устанавливаем зависимости из PROJECT_CONTEXT.md
echo ""
echo "📦 Устанавливаем дополнительные пакеты..."

# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# TON Connect
npm install @tonconnect/ui-react

# Роутинг
npm install react-router-dom

# Состояние
npm install zustand

# Валидация
npm install zod

# Telegram Mini App SDK
npm install @telegram-apps/sdk-react

echo ""
echo "✅ Все зависимости установлены!"
echo ""

# Настраиваем Tailwind CSS
echo "⚙️  Настраиваем Tailwind CSS..."

cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Цвета Telegram
        'tg-theme-bg': 'var(--tg-theme-bg-color)',
        'tg-theme-text': 'var(--tg-theme-text-color)',
        'tg-theme-hint': 'var(--tg-theme-hint-color)',
        'tg-theme-link': 'var(--tg-theme-link-color)',
        'tg-theme-button': 'var(--tg-theme-button-color)',
        'tg-theme-button-text': 'var(--tg-theme-button-text-color)',
      },
    },
  },
  plugins: [],
}
EOF

# Обновляем src/index.css для Tailwind
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --tg-theme-bg-color: #ffffff;
  --tg-theme-text-color: #000000;
  --tg-theme-hint-color: #999999;
  --tg-theme-link-color: #2481cc;
  --tg-theme-button-color: #2481cc;
  --tg-theme-button-text-color: #ffffff;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
}
EOF

echo "✅ Tailwind CSS настроен!"
echo ""
echo "🎉 Фронтенд успешно инициализирован!"
echo ""
echo "📋 Команды для работы:"
echo "   cd tma-frontend"
echo "   npm run dev      # Запуск dev-сервера"
echo "   npm run build    # Сборка для продакшена"
echo ""

