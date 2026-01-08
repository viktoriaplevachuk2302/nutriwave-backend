# NutriWave Backend

Бекенд для фітнес-додатка NutriWave. Використовує Node.js, Express і Firebase для авторизації, бази даних і API.

## Встановлення

1. Клонуй репозиторій: `git clone [url]`
2. Перейди в папку: `cd nutriwave-backend`
3. Встанови залежності: `npm install`
4. Створи `.env` з шаблону `.env.example` (PORT=5000)
5. Запусти: `npm run dev` (для розробки з nodemon) або `npm start`

Сервер на http://localhost:5000
Health-check: http://localhost:5000/health

## Структура

- src/config/firebase.js: Ініціалізація Firebase
- src/middleware/auth.middleware.js: Перевірка токена
- src/controllers/*: Логіка ендпоінтів
- src/routes/*: Роути API
- src/app.js: Express налаштування
- src/server.js: Запуск сервера

## API Ендпоінти

- GET /health: Перевірка сервера
- /api/users/me: Профіль (захищений)
- /api/weight: Прогрес ваги (захищений)
- /api/diary: Щоденник калорій (захищений)
- /api/recipes: Рецепти (публічний, з фільтром за category)

## Firebase

- Проєкт: nutriwave-60a92
- Авторизація: Email/Password + Google
- База: Firestore (users, weights, diary, recipes якщо потрібно динамічні)

## Безпека

- Всі захищені роути вимагають Authorization: Bearer <ID_TOKEN> з Firebase
- Не пушити .env або service account ключі

## Розробка

- Додавай нові роути в src/routes/
- Тестуй з Postman або фронтендом