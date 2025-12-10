#!/bin/bash

# Скрипт для создания структуры проекта Kindred
# Telegram Mini App на TON

echo "🚀 Создаём структуру проекта Kindred..."

# Создаём папки
mkdir -p tma-frontend
mkdir -p backend-api
mkdir -p contracts

# Создаём файл PROJECT_CONTEXT.md с базовым содержимым
cat > PROJECT_CONTEXT.md << 'EOF'
# Kindred — Telegram Mini App на TON

## Описание проекта
Kindred — это Telegram Mini App, работающий на блокчейне TON.

## Структура проекта

```
kindred-app/
├── PROJECT_CONTEXT.md    # Контекст и документация проекта
├── tma-frontend/         # Frontend часть (Telegram Mini App)
├── backend-api/          # Backend API сервер
└── contracts/            # Смарт-контракты TON
```

## Технологии
- **Frontend**: Telegram Mini App (TMA)
- **Backend**: (будет определено)
- **Blockchain**: TON (The Open Network)

## Статус
🟡 В разработке

---
*Последнее обновление: $(date +%Y-%m-%d)*
EOF

echo "✅ Структура проекта успешно создана!"
echo ""
echo "📁 Созданные папки и файлы:"
ls -la


